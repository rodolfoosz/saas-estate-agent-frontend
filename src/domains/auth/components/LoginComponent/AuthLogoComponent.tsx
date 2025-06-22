import Image from "next/image";

export default function AuthLogoComponent() {
  return (
    <div className="relative block text-center mb-6">
      <Image
        src="/logo-casae.png"
        alt="Logo Casaé"
        width={400}
        height={80}
      />
    </div>
  )
}
