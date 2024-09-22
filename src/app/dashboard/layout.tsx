import { AuthProvider } from '@/hooks/use-auth'
import { Header } from '@/components/header/header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthProvider>
      <div className='flex h-screen'>
        <div className='flex flex-1 flex-col overflow-hidden'>
          <Header />
          {/* Page content */}
          {children}
        </div>
      </div>
    </AuthProvider>
  )
}
