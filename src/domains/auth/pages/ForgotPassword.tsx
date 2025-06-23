<<<<<<< Updated upstream
import Image from 'next/image'
import ForgotPasswordComponent from '../components/ForgotPasswordComponent/ForgotPasswordComponent'

export default function ForgotPassword() {
  return (
    <main className="min-h-screen flex">
        <div className="w-1/2 relative hidden md:block">
            <Image
                src="/login-background.png"
                alt="Imagem de fundo login"
                fill
                style={{ objectFit: 'cover' }}
                className="brightness-95"
            />
        </div>

      <section className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 bg-gray-50">
        <div className="w-full max-w-2xl">
          <div className="mb-8 text-center">
            <Image
              src="/logo-casae.png"
              alt="Casaé logo"
              width={410}
              height={100}
              className="mx-auto mb-4 object-contain"
              priority
            />
          </div>
          <ForgotPasswordComponent />
        </div>
      </section>
    </main>
  )
}
=======

import ForgotPassword from '@domains/auth/pages/ForgotPassword'
import React from 'react'


export default function ForgotPasswordPage() {
  return <ForgotPassword />
}

>>>>>>> Stashed changes
