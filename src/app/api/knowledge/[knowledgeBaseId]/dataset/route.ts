import fs from 'fs'
import path from 'path'
import cuid from 'cuid'
import { Queue } from 'bullmq'
import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

const pdfProcessingQueue = new Queue('pdfProcessing', {
  connection: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD,
  },
})

export async function POST(
  request: Request,
  { params }: { params: { knowledgeBaseId: string } },
) {
  try {
    const supabase = createClient()
    const { knowledgeBaseId } = params
    const {
      data: { user: supabaseUser },
    } = await supabase.auth.getUser()
    if (!supabaseUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const user = await prisma.user.findUnique({
      where: {
        supabaseId: supabaseUser.id,
      },
    })
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const tenant = await prisma.tenant.findUnique({
      where: {
        id: user.tenantId,
      },
    })
    if (!tenant) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    // PDFファイルを受け取る
    const formData = await request.formData()
    const file = formData.get('files') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const storageDir = path.join(process.cwd(), 'storage')

    if (!fs.existsSync(storageDir)) {
      fs.mkdirSync(storageDir)
    }

    const extension = path.extname(file.name).replace('.', '')
    const filePath = path.join(storageDir, tenant.id, `${cuid()}.${extension}`)
    const dirPath = path.dirname(filePath)
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }
    fs.writeFileSync(filePath, Buffer.from(await file.arrayBuffer()))

    await prisma.uploadFile.create({
      data: {
        name: file.name,
        storageType: 'local',
        key: filePath,
        size: file.size,
        extension: extension,
        mimeType: file.type,
        createdBy: user.id,
        tenant: {
          connect: {
            id: tenant.id,
          },
        },
      },
    })

    const document = await prisma.document.create({
      data: {
        knowledgeBaseId: knowledgeBaseId,
        name: file.name,
        status: 'PENDING',
        enabled: false,
        metadata: {
          knowledgeBaseId,
        },
        mimeType: file.type,
        chunkSize: 0,
      },
    })

    const job = await pdfProcessingQueue.add('processPDF', {
      filePath: filePath,
      documentId: document.id,
    })

    const processStatus = await prisma.processStatus.create({
      data: {
        id: job.id,
        status: 'PENDING',
      },
    })

    if (!job.id) {
      throw new Error('Failed to start PDF processing')
    }

    return NextResponse.json({
      message: 'PDF processing started',
      statusId: processStatus.id,
      document: document,
    })
  } catch (error: unknown) {
    console.error('Error processing PDF:', error)
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Internal Server Error', details: error.message },
        { status: 500 },
      )
    } else {
      return NextResponse.json(
        { error: 'Internal Server Error', details: 'Unknown error occurred' },
        { status: 500 },
      )
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
