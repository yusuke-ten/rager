'use client'

import * as React from 'react'
import { PopoverProps } from '@radix-ui/react-popover'
import { CheckIcon, CaretSortIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import {
  Command,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from '@/components/ui/command'

import { Model, ModelType } from '../data/models'

interface Props extends PopoverProps {
  types: readonly ModelType[]
  models: Model[]
}

interface ModelItemProps {
  model: Model
  isSelected: boolean
  onSelect: () => void
}

function ModelItem({ model, isSelected, onSelect }: ModelItemProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  return (
    <CommandItem
      key={model.id}
      onSelect={onSelect}
      ref={ref}
      className='data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground'
    >
      {model.name}
      <CheckIcon
        className={cn('ml-auto h-4 w-4', isSelected ? 'opacity-100' : 'opacity-0')}
      />
    </CommandItem>
  )
}

export const ModelSelector = ({ models, types, ...props }: Props) => {
  const [open, setOpen] = React.useState(false)
  const [selectedModel, setSelectedModel] = React.useState<Model>(models[0])

  return (
    <div className='grid gap-2'>
      <HoverCard openDelay={50}>
        <HoverCardTrigger asChild>
          <Label htmlFor='model'>Model</Label>
        </HoverCardTrigger>
        <HoverCardContent align='start' className='w-[260px] text-sm' side='left'>
          モデルを生成するためのモデル。一部のモデルは自然言語タスクに適しており、他のモデルはコードに特化しています。詳細を学ぶ。
        </HoverCardContent>
      </HoverCard>
      <Popover open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            aria-label='Select a model'
            className='w-full justify-between'
          >
            {selectedModel ? selectedModel.name : 'Select a model...'}
            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent align='start' className='w-[250px] p-0' side='top'>
          <HoverCard>
            <Command loop>
              <CommandList className='h-[var(--cmdk-list-height)] max-h-[400px]'>
                <CommandInput placeholder='モデルを検索...' />
                <CommandEmpty>No Models found.</CommandEmpty>
                <HoverCardTrigger />
                {types.map((type) => (
                  <CommandGroup key={type} heading={type}>
                    {models
                      .filter((model) => model.type === type)
                      .map((model) => (
                        <ModelItem
                          key={model.id}
                          model={model}
                          isSelected={selectedModel?.id === model.id}
                          onSelect={() => {
                            setSelectedModel(model)
                            setOpen(false)
                          }}
                        />
                      ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </HoverCard>
        </PopoverContent>
      </Popover>
    </div>
  )
}
