import Image from "next/image";

export default function AuthLogo() {
  return (
    <div className="relative hidden md:block">
      <Image
        src="/logo-casae.png"
        alt="Logo Casaé"
        width={400}
        height={80}
      />
    </div>
  )
}
