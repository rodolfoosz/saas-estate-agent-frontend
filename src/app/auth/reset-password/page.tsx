'use client'

import { Suspense } from 'react'
import { ResetPasswordPage } from '@domains/auth/pages/ResetPassword'

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ResetPasswordPage />
    </Suspense>
  )
}
