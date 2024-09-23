import { AuthLayout } from '@/components/layout/auth-layout'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <AuthLayout>{children}</AuthLayout>
}
