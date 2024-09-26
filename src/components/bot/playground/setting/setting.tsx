import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from '@/components/ui/select'

import { types, models } from '../data/models'
import { ModelSelector } from '../model-selector'
import { SliderSelector } from '../slider-selector'

type Props = {
  systemPrompt: string
  setSystemPrompt: (prompt: string) => void
  temperature: number
  setTemperature: (temperature: number) => void
  maxTokens: number
  setMaxTokens: (maxTokens: number) => void
  topP: number
  setTopP: (topP: number) => void
  topK: number
  setTopK: (topK: number) => void
}

export const Setting = ({
  systemPrompt,
  setSystemPrompt,
  temperature,
  setTemperature,
  maxTokens,
  setMaxTokens,
  topP,
  setTopP,
  topK,
  setTopK,
}: Props) => {
  return (
    <div
      className='relative hidden flex-col items-start gap-8 overflow-y-scroll px-4 md:flex'
      x-chunk='dashboard-03-chunk-0'
    >
      <form className='grid w-full items-start gap-6'>
        <fieldset className='grid gap-6 rounded-lg border p-4'>
          <legend className='-ml-1 px-1 text-sm font-medium'>設定</legend>
          <div className='grid gap-3'>
            <ModelSelector types={types} models={models} />
          </div>
          <div className='grid gap-3'>
            <SliderSelector
              label='Temperature'
              defaultValue={[temperature]}
              max={1}
              step={0.1}
              description='ランダム性を制御します：値を下げると、結果がより少なくランダムになります。Temperatureがゼロに近づくと、モデルは決定論的で繰り返しのあるものになります。'
              onCommit={(value) => setTemperature(value)}
            />
          </div>
          <div className='grid gap-3'>
            <SliderSelector
              label='Maximum Length'
              defaultValue={[maxTokens]}
              max={8192}
              step={10}
              description='生成するトークンの最大数です。リクエストは最大2,048または4,000トークンを使用でき、プロンプトと完了の間で共有されます。正確な制限はモデルによって異なります。'
              onCommit={(value) => setMaxTokens(value)}
            />
          </div>
          <div className='grid gap-3'>
            <SliderSelector
              label='Top P'
              defaultValue={[topP]}
              max={1}
              step={0.1}
              description='トークンの選択に使用される確率のしきい値です。0.5より大きい値を設定すると、より多様な出力が生成されます。'
              onCommit={(value) => setTopP(value)}
            />
          </div>
          <div className='mb-4 grid gap-3'>
            <SliderSelector
              label='Top K'
              defaultValue={[topK]}
              max={10}
              step={1}
              description='トークンの選択に使用される確率のしきい値です。0.5より大きい値を設定すると、より多様な出力が生成されます。'
              onCommit={(value) => setTopK(value)}
            />
          </div>
        </fieldset>
        <fieldset className='grid gap-6 rounded-lg border p-4'>
          <legend className='-ml-1 px-1 text-sm font-medium'>メッセージ</legend>
          <div className='grid gap-3'>
            <Label htmlFor='role'>役割</Label>
            <Select defaultValue='system'>
              <SelectTrigger>
                <SelectValue placeholder='役割を選択' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='system'>システム</SelectItem>
                <SelectItem value='user'>ユーザー</SelectItem>
                <SelectItem value='assistant'>アシスタント</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='content'>システムプロンプト</Label>
            <Textarea
              id='content'
              placeholder='LLMに渡すシステムプロンプトを入力してください。'
              className='min-h-[9.5rem]'
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
            />
          </div>
        </fieldset>
      </form>
    </div>
  )
}
