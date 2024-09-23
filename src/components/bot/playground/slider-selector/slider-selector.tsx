'use client'

import { useId, useState } from 'react'
import { SliderProps } from '@radix-ui/react-slider'

import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

interface SliderSelectorProps {
  label: string
  defaultValue: SliderProps['defaultValue']
  max: number
  step: number
  description: string
  onCommit?: (value: number) => void
}

export const SliderSelector = ({
  label,
  defaultValue,
  max,
  step,
  description,
  onCommit = () => {},
}: SliderSelectorProps) => {
  const [value, setValue] = useState(defaultValue)
  const id = useId()

  return (
    <div className='w-full'>
      <HoverCard openDelay={50}>
        <HoverCardTrigger asChild>
          <div className='grid gap-4'>
            <div className='flex items-center justify-between'>
              <Label htmlFor={id}>{label}</Label>
              <span className='w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border'>
                {value}
              </span>
            </div>
            <Slider
              id={id}
              max={max}
              defaultValue={value}
              step={step}
              onValueChange={setValue}
              onValueCommit={(value) => {
                onCommit(value[0])
              }}
              className='[&_[role=slider]]:h-4 [&_[role=slider]]:w-4'
              aria-label={label}
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent align='start' className='w-[260px] text-sm' side='left'>
          {description}
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}
