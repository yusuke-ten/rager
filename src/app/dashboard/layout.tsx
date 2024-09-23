import { AuthProvider } from '@/hooks/use-auth'
import { DashboardLayout } from '@/components/layout/dashboard-layout'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthProvider>
  )
}
