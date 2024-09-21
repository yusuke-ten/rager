import type { Options } from 'react-markdown'

import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

import './code-highlight-block.css'

type Props = Options

const rehypePlugins: import('unified').PluggableList = [rehypeRaw, rehypeHighlight]

const remarkPlugins: import('unified').PluggableList = [remarkGfm]

export const Markdown = ({ children, ...props }: Props) => {
  return (
    <div className='prose'>
      <ReactMarkdown
        {...props}
        rehypePlugins={rehypePlugins}
        remarkPlugins={remarkPlugins}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
