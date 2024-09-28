'use client'

import { useState } from 'react'
import { DocumentSegment } from '@prisma/client'
import { HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardTitle, CardHeader, CardContent } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip'
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from '@/components/ui/select'

type Props = {
  knowledgeBaseId: string
  handleRetrievalTesting: (query: string) => Promise<DocumentSegment[]>
}

const RetrievalTesting = ({ knowledgeBaseId, handleRetrievalTesting }: Props) => {
  const [query, setQuery] = useState('REMARKS OF DEPUTY ASSISTANT ATTORNEY GENERAL')
  const [retrievalTestingResults, setRetrievalTestingResults] = useState<
    DocumentSegment[]
  >([])

  const onSubmit = async () => {
    const result = await handleRetrievalTesting(query)
    setRetrievalTestingResults(result)
  }

  return (
    <>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        <div className='md:col-span-1'>
          <Card>
            <CardHeader>
              <CardTitle>検索テスト</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center space-x-2'>
                <label className='text-sm font-medium'>類似度しきい値</label>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant='ghost' size='icon' className='h-4 w-4 p-0'>
                        <HelpCircle className='h-4 w-4 text-gray-400' />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side='top' align='center' sideOffset={5}>
                      <p className='max-w-xs'>
                        類似度しきい値は、検索結果の関連性を判断するための基準値です。高い値を設定すると、より厳密な一致が要求されます。
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Slider defaultValue={[20]} max={100} step={1} />

              <div className='flex items-center space-x-2'>
                <label className='text-sm font-medium'>キーワード類似度の重み</label>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant='ghost' size='icon' className='h-4 w-4 p-0'>
                        <HelpCircle className='h-4 w-4 text-gray-400' />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side='top' align='center' sideOffset={5}>
                      <p className='max-w-xs'>
                        類似度しきい値は、検索結果の関連性を判断するための基準値です。高い値を設定すると、より厳密な一致が要求されます。
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Slider defaultValue={[50]} max={100} step={1} />

              <div className='space-y-2'>
                <div className='flex items-center space-x-2'>
                  <label className='text-sm font-medium'>再ランク付けモデル</label>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant='ghost' size='icon' className='h-4 w-4 p-0'>
                          <HelpCircle className='h-4 w-4 text-gray-400' />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side='top' align='center' sideOffset={5}>
                        <p className='max-w-xs'>
                          類似度しきい値は、検索結果の関連性を判断するための基準値です。高い値を設定すると、より厳密な一致が要求されます。
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder='選択してください' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='model1'>モデル1</SelectItem>
                    <SelectItem value='model2'>モデル2</SelectItem>
                    <SelectItem value='model3'>モデル3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium'>テストテキスト</label>
                <Textarea
                  placeholder='ここにテストテキストを入力してください'
                  rows={6}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <Button onClick={onSubmit}>テスト実行</Button>
            </CardContent>
          </Card>
        </div>

        <div className='md:col-span-2'>
          <Card>
            <CardContent className='p-4'>
              <div className='flex flex-col gap-4'>
                {retrievalTestingResults.map((result) => (
                  <ScrollArea key={result.id} className='h-[200px] rounded-md border p-4'>
                    <div className='space-y-4'>
                      <p className='text-sm'>{result.chunkContent}</p>
                    </div>
                  </ScrollArea>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className='mt-4 flex items-center justify-between'>
        <div className='text-sm text-gray-600'>合計 0</div>
        <div className='flex items-center space-x-2'>
          <Button variant='outline' size='icon'>
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <Input className='w-12 text-center' value='1' readOnly />
          <Button variant='outline' size='icon'>
            <ChevronRight className='h-4 w-4' />
          </Button>
          <Select defaultValue='10'>
            <SelectTrigger className='w-[120px]'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='10'>10 / ページ</SelectItem>
              <SelectItem value='20'>20 / ページ</SelectItem>
              <SelectItem value='50'>50 / ページ</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  )
}

RetrievalTesting.displayName = 'RetrievalTesting'

export { RetrievalTesting }
