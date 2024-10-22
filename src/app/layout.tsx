import type { Metadata } from 'next'

import { Noto_Sans_JP } from 'next/font/google'

import '@/assets/styles/globals.css'
import { Toaster } from '@/components/ui/toaster'
import { LoadingProvider } from '@/hooks/use-loading'
import { TooltipProvider } from '@/components/ui/tooltip'

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
})

export const metadata: Metadata = {
  title: 'RAGER',
  description: 'RAGER',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja' className={`${notoSansJP.variable}`}>
      <body className={`font-sans antialiased`}>
        <LoadingProvider>
          <TooltipProvider delayDuration={0}>
            {children}
            <Toaster />
          </TooltipProvider>
        </LoadingProvider>
      </body>
    </html>
  )
}
