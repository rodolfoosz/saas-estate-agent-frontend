// ThemeLayout.tsx
'use client'

import { useEffect, useState } from 'react'
import SideBar from '@shared/components/SideBar'
import PublicHeader from '@shared/components/PublicHeader'

export default function ThemeLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    setDarkMode(saved === 'dark')
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <div className="text-black min-h-screen transition-colors duration-300">
      <PublicHeader toggleMenu={() => setMenuOpen(!menuOpen)} />
      <SideBar 
        isOpen={menuOpen} 
        onClose={() => setMenuOpen(false)} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        isAuthenticated={false}
        />
      {children}
    </div>
  )
}
