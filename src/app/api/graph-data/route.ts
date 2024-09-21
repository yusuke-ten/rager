import type { Document } from '@langchain/core/documents'

import fs from 'fs'
import 'neo4j-driver'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'
import { ChatOpenAI } from '@langchain/openai'
import { Neo4jGraph } from '@langchain/community/graphs/neo4j_graph'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { LLMGraphTransformer } from '@langchain/community/experimental/graph_transformers/llm'

import prisma from '@/lib/prisma'

const url = `bolt://localhost:${process.env.EXPOSE_NEO4J_BOLT_PORT}`
const username = 'neo4j'
const password = 'password'

const directoryPath = './repositories/Spoon-Knife'

export function generateVectorStoreId(id: string): string {
  return `Vector_index_${id.replace(/-/g, '_')}`
}

const model = new ChatOpenAI({
  temperature: 0,
  model: 'gpt-4-turbo-preview',
})

const llmGraphTransformer = new LLMGraphTransformer({
  llm: model,
})

export async function POST() {
  try {
    const files = fs.readdirSync(directoryPath)

    const id = uuidv4()

    const vectorStoreId = generateVectorStoreId(id)
    const knowledgeBase = await prisma.knowledgeBase.create({
      data: {
        id: id,
        name: 'Spoon-Knife',
        vectorStoreId: vectorStoreId,
      },
    })

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    })

    const chunkedDocs: Document[] = []

    const graph = await Neo4jGraph.initialize({ url, username, password })

    for (const file of files) {
      const filePath = path.join(directoryPath, file)
      const fileStat = fs.statSync(filePath)
      if (fileStat.isFile()) {
        const content = fs.readFileSync(filePath, 'utf-8')
        const chunks = await textSplitter.splitText(content)
        chunks.forEach((chunk) => {
          chunkedDocs.push({
            pageContent: chunk,
            metadata: {
              fileName: file,
              filePath,
              fileSize: fileStat.size,
              extension: path.extname(file),
              knowledgeBaseId: knowledgeBase.id,
            },
          })
        })

        const graphDocuments =
          await llmGraphTransformer.convertToGraphDocuments(chunkedDocs)
        await graph.addGraphDocuments(graphDocuments, {
          baseEntityLabel: true,
          includeSource: true,
        })
      }
    }

    console.log('ベクターストアに保存しました。')
    return NextResponse.json({ message: chunkedDocs })
  } catch (error) {
    console.error('Error fetching graph data:', error)
    return NextResponse.json({ error: 'Error fetching graph data' }, { status: 500 })
  }
}
