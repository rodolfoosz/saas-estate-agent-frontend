'use client';
import Link from 'next/link';
import { LuMenu, LuUser } from 'react-icons/lu';
import { useState } from 'react';
import Image from 'next/image';
import { useAuthUser } from '@domains/auth/hooks/useAuthUser';

interface PublicHeaderProps {
  toggleMenu: () => void;
}

export default function PublicHeader({ toggleMenu }: PublicHeaderProps) {
  const [search, setSearch] = useState('');
  const user = useAuthUser();

  return (
    <header className="w-full bg-white shadow-md px-4 py-3 flex items-center justify-between sticky top-0 z-50 transition-colors duration-300">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleMenu}
          className="text-xl p-2 rounded"
        >
          <LuMenu />
        </button>

        <Link href="/" className="text-xl font-bold text-blue-900">
          <Image
            src="/logo-casae-2.png"
            alt="Logo Casaé"
            width={80}
            height={60}
          />
        </Link>
      </div>

      <form className="flex-1 mx-4 max-w-md">
        <input
          type="text"
          placeholder="Buscar imóveis, bairros, corretores..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>

      <Link href="/auth/login" className="flex flex-col items-center gap-0 text-sm text-gray-700 hover:text-blue-700">
        <LuUser className="text-xl" />
        {user ? (
          <span className="text-xs">{user.fullName.split(' ')[0]}</span>
        ) : (
          <span  className="hidden sm:inline">
            Entrar
          </span>
        )}
      </Link>
    </header>
  );
}
