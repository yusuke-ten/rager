'use client'

import * as z from 'zod'
import React from 'react'
import { useState } from 'react'
import { Bot } from '@prisma/client'
import { HelpCircle } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs'
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
  bot: Bot
  knowledgeBases: {
    id: string
    name: string
  }[]
  handleUpdateBot: (data: FormData) => Promise<void>
}

type FormFieldProps = {
  label: string
  htmlFor: string
  required?: boolean
  helpText?: string
  children: React.ReactNode
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  required,
  helpText,
  children,
}) => (
  <div className='grid grid-cols-3 items-start gap-4'>
    <Label htmlFor={htmlFor} className='flex items-center justify-end pt-2 text-right'>
      {label}
      {required && <span className='text-red-500'>*</span>}
      {helpText && (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className='ml-1 h-4 w-4 cursor-pointer text-gray-400' />
            </TooltipTrigger>
            <TooltipContent className='max-h-[200px] max-w-[300px] overflow-y-auto text-left'>
              <p className='text-sm'>{helpText}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </Label>
    <div className='col-span-2'>{children}</div>
  </div>
)

export const formSchema = z.object({
  botName: z.string().min(1, '名前は必須です'),
  description: z.string().optional(),
  emptyResponse: z.string().optional(),
  openStatement: z.string().optional(),
  showQuote: z.boolean(),
  knowledgeBase: z.string().min(1, 'ナレッジベースは必須です'),
  systemPrompt: z.string().min(1, '入力は必須です'),
  similarityThreshold: z.number().min(0).max(1),
  keywordSimilarityWeight: z.number().min(0).max(1),
  temperature: z.number().min(0).max(1),
  topP: z.number().min(0).max(1),
  presencePenalty: z.number().min(0).max(2),
  frequencyPenalty: z.number().min(0).max(2),
  maxTokens: z.number().int().positive(),
})

export type FormData = z.infer<typeof formSchema>

export const Configuration = ({ bot, knowledgeBases, handleUpdateBot }: Props) => {
  const [activeTab, setActiveTab] = useState('general')
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      botName: bot.name,
      description: bot.description ?? '',
      emptyResponse: bot.emptyResponse ?? '',
      openStatement: bot.openStatement ?? '',
      showQuote: bot.showQuote,
      knowledgeBase: '',
      systemPrompt: bot.systemPrompt,
      similarityThreshold: bot.similarityThreshold,
      keywordSimilarityWeight: bot.keywordSimilarityWeight,
      temperature: bot.temperature,
      topP: bot.topP,
      presencePenalty: bot.presencePenalty,
      frequencyPenalty: bot.frequencyPenalty,
      maxTokens: bot.maxTokens,
    },
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
    handleUpdateBot(data)
  }

  const onError = () => {
    if (
      errors.botName ||
      errors.emptyResponse ||
      errors.openStatement ||
      errors.showQuote ||
      errors.knowledgeBase
    ) {
      setActiveTab('general')
    } else if (
      errors.systemPrompt ||
      errors.similarityThreshold ||
      errors.keywordSimilarityWeight
    ) {
      setActiveTab('prompt')
    } else if (
      errors.temperature ||
      errors.topP ||
      errors.presencePenalty ||
      errors.frequencyPenalty ||
      errors.maxTokens
    ) {
      setActiveTab('model')
    }
  }

  return (
    <div className='container mx-auto p-6'>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
          <TabsList className='mb-6 grid w-full grid-cols-3'>
            <TabsTrigger value='general'>アシスタント設定</TabsTrigger>
            <TabsTrigger value='prompt'>プロンプトエンジン</TabsTrigger>
            <TabsTrigger value='model'>モデル設定</TabsTrigger>
          </TabsList>

          <TabsContent value='general'>
            <Separator className='my-6' />
            <div className='flex flex-col space-y-8'>
              <FormField label='ボット名' htmlFor='bot-name' required>
                <Controller
                  name='botName'
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Input
                        {...field}
                        id='bot-name'
                        placeholder='テスト'
                        className='col-span-2'
                      />
                      {errors.botName && (
                        <p className='ml-2 mt-2 text-sm text-red-500'>
                          {errors.botName.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </FormField>
              <FormField label='説明' htmlFor='description'>
                <Controller
                  name='description'
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Textarea
                        {...field}
                        id='description'
                        placeholder='ボットの説明を入力してください'
                        className='col-span-2'
                        rows={5}
                      />
                      {errors.description && (
                        <p className='ml-2 mt-2 text-sm text-red-500'>
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </FormField>
              <FormField
                label='空の応答'
                htmlFor='empty-response'
                helpText={`ナレッジベースに関連情報がない場合の回答です。空欄の場合、AIが独自に回答を生成します。`}
              >
                <Controller
                  name='emptyResponse'
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      id='empty-response'
                      placeholder='こんにちは！アシスタントです。何かお手伝いできることはありますか？'
                      rows={5}
                    />
                  )}
                />
              </FormField>
              <FormField
                label='オープナーを設定'
                htmlFor='openStatement'
                helpText='クライアントをどのように歓迎しますか？'
              >
                <Controller
                  name='openStatement'
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      id='openStatement'
                      placeholder='こんにちは！アシスタントです。何かお手伝いできることはありますか？'
                      rows={5}
                    />
                  )}
                />
              </FormField>
              <FormField
                label='引用を表示'
                htmlFor='show-quote'
                helpText='元のテキストの出典を表示すべきですか？'
              >
                <Controller
                  name='showQuote'
                  control={control}
                  render={({ field: { value, onChange, ...rest } }) => (
                    <div className='pt-1.5'>
                      <Switch
                        checked={value}
                        onCheckedChange={onChange}
                        {...rest}
                        id='show-quote'
                      />
                    </div>
                  )}
                />
              </FormField>
              <FormField
                label='ナレッジベース'
                htmlFor='knowledgebases'
                required
                helpText='関連するナレッジベースを選択してください。'
              >
                <Controller
                  name='knowledgeBase'
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder='ナレッジベースを選択' />
                        </SelectTrigger>
                        <SelectContent>
                          {knowledgeBases.map((knowledgeBase) => (
                            <SelectItem key={knowledgeBase.id} value={knowledgeBase.id}>
                              {knowledgeBase.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.knowledgeBase && (
                        <p className='ml-2 mt-2 text-sm text-red-500'>
                          {errors.knowledgeBase.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </FormField>
            </div>
          </TabsContent>

          <TabsContent value='prompt'>
            <Separator className='my-6' />
            <div className='flex flex-col space-y-8'>
              <FormField
                label='システム'
                htmlFor='system-prompt'
                required
                helpText='システムプロンプトを入力してください'
              >
                <Controller
                  name='systemPrompt'
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Textarea
                        {...field}
                        id='system-prompt'
                        placeholder='こんにちは！アシスタントです。何かお手伝いできることはありますか？'
                        rows={5}
                      />
                      {errors.systemPrompt && (
                        <p className='ml-2 mt-2 text-sm text-red-500'>
                          {errors.systemPrompt.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </FormField>

              <FormField
                label='類似度しきい値'
                htmlFor='similarityThreshold'
                helpText='類似度のしきい値を設定してください'
              >
                <Controller
                  name='similarityThreshold'
                  control={control}
                  render={({ field: { value, onChange, ...rest } }) => (
                    <div className='mb-4 pt-3'>
                      <Slider
                        {...rest}
                        value={[value]}
                        onValueChange={(newValue) => onChange(newValue[0])}
                        id='similarityThreshold'
                        min={0}
                        max={1}
                        step={0.01}
                      />
                    </div>
                  )}
                />
              </FormField>

              <FormField
                label='キーワード類似度の重み'
                htmlFor='keywordSimilarityWeight'
                helpText='キーワード類似度の重みを設定してください'
              >
                <Controller
                  name='keywordSimilarityWeight'
                  control={control}
                  render={({ field: { value, onChange, ...rest } }) => (
                    <div className='mb-4 pt-3'>
                      <Slider
                        {...rest}
                        value={[value]}
                        onValueChange={(newValue) => onChange(newValue[0])}
                        id='keywordSimilarityWeight'
                        min={0}
                        max={1}
                        step={0.01}
                      />
                    </div>
                  )}
                />
              </FormField>
            </div>
          </TabsContent>

          <TabsContent value='model'>
            <Separator className='my-6' />
            <div className='flex flex-col space-y-8'>
              <FormField
                label='Temperature'
                htmlFor='temperature'
                helpText='モデルの出力のランダム性を制御します'
              >
                <Controller
                  name='temperature'
                  control={control}
                  render={({ field: { value, onChange, ...rest } }) => (
                    <div className='flex items-center space-x-4'>
                      <Switch
                        checked={value !== 0}
                        onCheckedChange={(checked) => onChange(checked ? 0.1 : 0)}
                      />
                      <Slider
                        {...rest}
                        disabled={value === 0}
                        value={[value]}
                        onValueChange={(newValue) => onChange(newValue[0])}
                        min={0}
                        max={1}
                        step={0.01}
                        className='flex-grow'
                      />
                      <Input
                        type='number'
                        value={value}
                        onChange={(e) => onChange(parseFloat(e.target.value))}
                        className='w-20'
                      />
                    </div>
                  )}
                />
              </FormField>

              <FormField
                label='Top P'
                htmlFor='topP'
                helpText='生成時に考慮する確率の高いトークンの割合を設定します'
              >
                <Controller
                  name='topP'
                  control={control}
                  render={({ field: { value, onChange, ...rest } }) => (
                    <div className='flex items-center space-x-4'>
                      <Switch
                        checked={value !== 0}
                        onCheckedChange={(checked) => onChange(checked ? 0.1 : 0)}
                      />
                      <Slider
                        {...rest}
                        disabled={value === 0}
                        value={[value]}
                        onValueChange={(newValue) => onChange(newValue[0])}
                        min={0}
                        max={1}
                        step={0.01}
                        className='flex-grow'
                      />
                      <Input
                        type='number'
                        value={value}
                        onChange={(e) => onChange(parseFloat(e.target.value))}
                        className='w-20'
                      />
                    </div>
                  )}
                />
              </FormField>

              <FormField
                label='Presence Penalty'
                htmlFor='presencePenalty'
                helpText='新しいトピックの導入を促進します'
              >
                <Controller
                  name='presencePenalty'
                  control={control}
                  render={({ field: { value, onChange, ...rest } }) => (
                    <div className='flex items-center space-x-4'>
                      <Switch
                        checked={value !== 0}
                        onCheckedChange={(checked) => onChange(checked ? 0.1 : 0)}
                      />
                      <Slider
                        {...rest}
                        disabled={value === 0}
                        value={[value]}
                        onValueChange={(newValue) => onChange(newValue[0])}
                        min={0}
                        max={2}
                        step={0.01}
                        className='flex-grow'
                      />
                      <Input
                        type='number'
                        value={value}
                        onChange={(e) => onChange(parseFloat(e.target.value))}
                        className='w-20'
                      />
                    </div>
                  )}
                />
              </FormField>

              <FormField
                label='Frequency Penalty'
                htmlFor='frequencyPenalty'
                helpText='同じフレーズの繰り返しを減らします'
              >
                <Controller
                  name='frequencyPenalty'
                  control={control}
                  render={({ field: { value, onChange, ...rest } }) => (
                    <div className='flex items-center space-x-4'>
                      <Switch
                        checked={value !== 0}
                        onCheckedChange={(checked) => onChange(checked ? 0.1 : 0)}
                      />
                      <Slider
                        {...rest}
                        disabled={value === 0}
                        value={[value]}
                        onValueChange={(newValue) => onChange(newValue[0])}
                        min={0}
                        max={2}
                        step={0.01}
                        className='flex-grow'
                      />
                      <Input
                        type='number'
                        value={value}
                        onChange={(e) => onChange(parseFloat(e.target.value))}
                        className='w-20'
                      />
                    </div>
                  )}
                />
              </FormField>

              <FormField
                label='Max Tokens'
                htmlFor='maxTokens'
                helpText='生成される最大トークン数を設定します'
              >
                <Controller
                  name='maxTokens'
                  control={control}
                  render={({ field: { value, onChange, ...rest } }) => (
                    <div className='flex items-center space-x-4'>
                      <Switch
                        checked={value !== 0}
                        onCheckedChange={(checked) => onChange(checked ? 512 : 0)}
                      />
                      <Slider
                        {...rest}
                        disabled={value === 0}
                        value={[value]}
                        onValueChange={(newValue) => onChange(newValue[0])}
                        min={1}
                        max={4096}
                        step={1}
                        className='flex-grow'
                      />
                      <Input
                        type='number'
                        value={value}
                        onChange={(e) => onChange(parseInt(e.target.value))}
                        className='w-20'
                      />
                    </div>
                  )}
                />
              </FormField>
            </div>
          </TabsContent>

          <div className='flex justify-end space-x-4 pt-10'>
            <Button variant='outline' size='lg' type='button'>
              キャンセル
            </Button>
            <Button size='lg' type='submit'>
              OK
            </Button>
          </div>
        </Tabs>
      </form>
    </div>
  )
}
