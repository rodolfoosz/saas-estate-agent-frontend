'use client'

import { forwardRef, InputHTMLAttributes } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FaUser, FaLock } from 'react-icons/fa'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon?: 'user' | 'lock'
  error?: string
  className?: string
}

const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ label, icon, error, type = 'text', className = '', ...rest }, ref) => {
    const isPassword = type === 'password'
    const IconComponent = icon === 'user' ? FaUser : icon === 'lock' ? FaLock : null

    return (
      <div className={`w-full ${className}`}>
        <label className="text-sm font-medium text-gray-700 mb-1 block">{label}</label>
        <div className="relative">
          <input
            ref={ref}
            type={type}
            placeholder={label}
            className={`w-full px-4 py-2 rounded-md bg-white text-gray-800 placeholder-gray-400 border ${
              error ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-yellow-400'
            } focus:outline-none focus:ring-2 pr-12`}
            {...rest}
          />

          {IconComponent && (
            <IconComponent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          )}
        </div>

        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    )
  }
)

TextInput.displayName = 'TextInput'
export default TextInput
