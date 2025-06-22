import { ButtonHTMLAttributes } from 'react'
import { ImSpinner2 } from 'react-icons/im'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  loading?: boolean
}

export default function ButtonComponent({ children, loading = false, ...rest }: Props) {
  return (
    <button
      disabled={loading}
      className={`w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 ${
        loading ? 'opacity-60 cursor-not-allowed' : ''
      }`}
      {...rest}
    >
      {loading && <ImSpinner2 className="animate-spin" />}
      {children}
    </button>
  )
}
