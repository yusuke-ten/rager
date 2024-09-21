import { cn } from '@/lib/utils'
import { Markdown } from '@/components/markdown/markdown'

type Props = {
  message: string
  className?: string
}

export const Question = ({ message, className }: Props) => {
  return (
    <div
      className={cn(
        'inline-block max-w-md rounded-3xl bg-gray-100 px-4 py-2 text-gray-800',
        className,
      )}
    >
      <Markdown>{String(message)}</Markdown>
    </div>
  )
}
