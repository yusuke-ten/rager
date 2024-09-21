import { Header } from '@/components/header/header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex h-screen bg-gray-100'>
      <div className='flex flex-1 flex-col overflow-hidden'>
        <Header />
        {/* Page content */}
        {children}
      </div>
    </div>
  )
}
