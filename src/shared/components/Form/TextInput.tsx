'use client'

import { forwardRef, InputHTMLAttributes, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FaUser, FaLock } from 'react-icons/fa'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon?: 'user' | 'lock' // Agora é opcional
  error?: string
}

const InputComponent = forwardRef<HTMLInputElement, Props>(
  ({ label, icon, error, type = 'text', ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

    const IconComponent = icon === 'user' ? FaUser : icon === 'lock' ? FaLock : null

    return (
      <div className="w-full mb-6">
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            placeholder={label}
            className={`w-full pl-${IconComponent ? '10' : '4'} ${isPassword ? 'pr-12' : 'pr-4'} py-2 bg-white text-gray-800 placeholder-gray-500 border ${
              error ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-2 ${
              error ? 'focus:ring-red-400' : 'focus:ring-yellow-400'
            }`}
            {...rest}
          />
          {IconComponent && (
            <IconComponent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          )}

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              tabIndex={-1}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          )}
        </div>

        <div className="h-[20px] mt-1">
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </div>
    )
  }
)

InputComponent.displayName = 'InputComponent'
export default InputComponent
