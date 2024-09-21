export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='flex-1 overflow-y-auto overflow-x-hidden bg-gray-100'>
      {children}
    </main>
  )
}
