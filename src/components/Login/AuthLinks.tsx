import Link from 'next/link'

export default function AuthLinks() {
  return (
    <div className="flex justify-between mt-3 text-sm text-gray-500">
      <Link href="/forgot-password" className="hover:underline">
        Esqueci minha senha
      </Link>
      <Link href="/create-account" className="hover:underline">
        Criar conta
      </Link>
    </div>
  )
}
