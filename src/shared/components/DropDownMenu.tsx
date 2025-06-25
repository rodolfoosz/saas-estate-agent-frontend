'use client'

import { useState, useRef, useEffect } from 'react'
import { LuUser, LuLogOut } from 'react-icons/lu'
import { useAuthUser } from '@domains/auth/hooks/useAuthUser'
import { useRouter } from 'next/navigation'

interface DropDownMenuProps {
  buttonClassName?: string
  labelClassName?: string
  align?: 'left' | 'right'
}

export default function DropDownMenu({
  buttonClassName = '',
  labelClassName = '',
  align = 'right',
}: DropDownMenuProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const user = useAuthUser()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/auth/login')
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!user) return null

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`flex flex-col items-center text-sm hover:text-blue-800 transition ${buttonClassName}`}
      >
        <LuUser className="text-xl" />
        <span className={`text-xs sm:text-sm font-medium tracking-wider ${labelClassName}`}>
          {user.fullName.split(' ')[0].toUpperCase()}
        </span>
      </button>

      {open && (
        <div
          className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} mt-3 w-36 bg-white rounded-md border border-gray-200 shadow-xl z-50 transition-all duration-150 ease-out animate-fade-in`}
        >
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            <LuLogOut className="text-base text-gray-500" />
            <span>Sair</span>
          </button>
        </div>
      )}
    </div>
  )
}
