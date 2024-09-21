'use client'

import React, { useState, useContext, createContext } from 'react'

import { LoadingOverlay } from '@/components/loading-overlay/loading-overlay'

type LoadingContextType = {
  startLoading: () => void
  stopLoading: () => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const startLoading = () => {
    setIsLoading(true)
  }

  const stopLoading = () => {
    setIsLoading(false)
  }

  return (
    <LoadingContext.Provider value={{ startLoading, stopLoading }}>
      {children}
      <LoadingOverlay isLoading={isLoading} />
    </LoadingContext.Provider>
  )
}

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}
