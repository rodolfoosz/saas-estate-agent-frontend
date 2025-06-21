'use client'
import Image from 'next/image'

export default function AuthImage() {
  return (
    <div className="relative h-full w-full">
      <Image
        src="/login-background.png"
        alt="Imagem de fundo login"
        fill
        className="object-cover brightness-95"
      />
    </div>
  )
}
