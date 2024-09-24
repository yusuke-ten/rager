import { EventEmitter } from 'events'
import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

const emitter = new EventEmitter()

export async function GET(
  request: Request,
  { params }: { params: { statusId: string } },
) {
  const { statusId } = params

  const processStatus = await prisma.processStatus.findUnique({
    where: { id: statusId },
  })

  if (!processStatus) {
    return NextResponse.json({ error: 'Processing status not found' }, { status: 404 })
  }

  const stream = new ReadableStream({
    start(controller) {
      const listener = async () => {
        const updatedStatus = await prisma.processStatus.findUnique({
          where: { id: statusId },
        })
        if (updatedStatus) {
          controller.enqueue(
            `data: ${JSON.stringify({
              status: updatedStatus.status,
              progress: updatedStatus.progress,
              currentStep: updatedStatus.currentStep,
              totalSteps: updatedStatus.totalSteps,
            })}\n\n`,
          )
          if (updatedStatus.status === 'COMPLETED') {
            clearInterval(intervalId)
            emitter.off(statusId, listener)
          }
        }
      }

      listener()

      const intervalId = setInterval(listener, 1000)

      emitter.on(statusId, listener)

      request.signal.addEventListener('abort', () => {
        clearInterval(intervalId)
        emitter.off(statusId, listener)
        controller.close()
      })
    },
  })

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
