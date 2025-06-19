'use client'
import { forwardRef, InputHTMLAttributes } from 'react'
import { FaUser, FaLock } from 'react-icons/fa'
import { AiOutlineEyeInvisible } from 'react-icons/ai'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon: 'user' | 'lock'
  error?: string
}

const AuthInput = forwardRef<HTMLInputElement, Props>(
  ({ label, icon, error, type = 'text', ...rest }, ref) => {
    const Icon = icon === 'user' ? FaUser : FaLock

    return (
      <div className="relative mb-4 w-full">
        <input
          ref={ref}
          type={type}
          placeholder={label}
          className="w-full pl-10 pr-12 py-2 bg-white text-gray-800 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          {...rest}
        />
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        {type === 'password' && (
          <AiOutlineEyeInvisible className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        )}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    )
  }
)

AuthInput.displayName = 'AuthInput'
export default AuthInput
