import Link from 'next/link'

export default function AuthLinksComponent() {
  return (
    <div className="flex justify-between mt-3 text-sm text-gray-500">
      <Link href="/auth/forgot-password" className="hover:underline">
        Esqueci minha senha
      </Link>
      <Link href="/auth/create-account" className="hover:underline">
        Criar conta
      </Link>
    </div>
  )
}
