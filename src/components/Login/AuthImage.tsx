'use client'
import Image from 'next/image'

export default function AuthImage() {
  return (
    <div className="hidden md:block md:w-1/2 relative">
      <Image
        src="/login-background.png"
        alt="Imagem de fundo login"
        fill
        style={{ objectFit: 'cover' }}
        className="brightness-95"
      />
    </div>
  )
}
