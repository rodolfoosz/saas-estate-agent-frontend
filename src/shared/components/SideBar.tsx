'use client'

import { LuSettings, LuHouse, LuUser, LuLogOut, LuX, LuMoon, LuSun } from 'react-icons/lu'
import { Switch } from '@headlessui/react'

interface SideBarProps {
  isOpen: boolean
  onClose: () => void
  darkMode: boolean
  setDarkMode: (val: boolean) => void
  isAuthenticated: boolean
}

export default function SideBar({
  isOpen,
  onClose,
  darkMode,
  setDarkMode,
  isAuthenticated,
}: SideBarProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Overlay translúcido clicável */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-50 z-40 bg-white text-black shadow-xl flex flex-col justify-between">
        <div className="p-6">
          {/* Topo com título e botão fechar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <LuSettings size={20} />
              <h2 className="text-xl font-semibold">Configurações</h2>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-black">
              <LuX size={24} />
            </button>
          </div>

          {/* Navegação condicional */}
          {isAuthenticated && (
            <nav className="flex flex-col gap-4 text-sm font-medium">
              <a href="#" className="flex items-center gap-3 hover:text-blue-600 transition">
                <LuHouse size={18} /> Início
              </a>
              <a href="#" className="flex items-center gap-3 hover:text-blue-600 transition">
                <LuUser size={18} /> Minha conta
              </a>
              <a href="#" className="flex items-center gap-3 hover:text-blue-600 transition">
                <LuLogOut size={18} /> Sair
              </a>
            </nav>
          )}
        </div>

        {/* Rodapé com switch de tema */}
        <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
          <span className="flex items-center gap-2">
            {darkMode ? <LuSun size={18} /> : <LuMoon size={18} />}
            Modo escuro
          </span>
          <Switch
            checked={darkMode}
            onChange={setDarkMode}
            className={`${
              darkMode ? 'bg-blue-600' : 'bg-gray-300'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span
              className={`${
                darkMode ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
      </aside>
    </>
  )
}
