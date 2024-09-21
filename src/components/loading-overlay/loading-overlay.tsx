import React from 'react'
import { Loader2 } from 'lucide-react'

type Props = {
  isLoading: boolean
}

const LoadingOverlay = ({ isLoading }: Props) => {
  if (!isLoading) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm'>
      <div className='flex flex-col items-center space-y-2'>
        <Loader2 className='h-8 w-8 animate-spin text-primary' />
        <p className='text-sm font-medium text-muted-foreground'>Loading...</p>
      </div>
    </div>
  )
}

LoadingOverlay.displayName = 'LoadingOverlay'

export { LoadingOverlay }
