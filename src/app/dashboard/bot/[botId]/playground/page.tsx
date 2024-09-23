import { Playground } from '@/components/bot/playground'

export default async function PlaygroundPage({ params }: { params: { botId: string } }) {
  return <Playground botId={params.botId} />
}
