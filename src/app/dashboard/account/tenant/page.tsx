import { revalidatePath } from 'next/cache'

import prisma from '@/lib/prisma'
import { Account } from '@/components/account'
import { TenantForm, TenantFormValues } from '@/components/account/tenant-form'

export default async function TenantPage() {
  const handleSubmit = async (formData: TenantFormValues) => {
    'use server'
    await prisma.tenant.update({
      where: {
        id: formData.tenantId,
      },
      data: {
        name: formData.tenantName,
      },
    })

    revalidatePath('/dashboard/account/tenant')
  }

  return (
    <Account>
      <TenantForm handleSubmit={handleSubmit} />
    </Account>
  )
}
