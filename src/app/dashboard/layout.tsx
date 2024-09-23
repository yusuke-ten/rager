import { AuthProvider } from '@/hooks/use-auth'
import { Header } from '@/components/layout/dashboard-layout/header/header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthProvider>
      <div className='flex min-h-screen w-full flex-col'>
        <Header />
        <div className='mt-[64px] flex h-[calc(100vh-64px)] flex-col'>{children}</div>
      </div>
    </AuthProvider>
  )
}
