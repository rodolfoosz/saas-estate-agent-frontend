'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function PublicHeader() {
  const [search, setSearch] = useState('');

  return (
    <header className="w-full bg-white shadow-md px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold text-blue-900">
        Casaé
      </Link>

      {/* Campo de busca */}
      <form className="flex-1 mx-4 max-w-md">
        <input
          type="text"
          placeholder="Buscar imóveis, bairros, corretores..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>

      {/* Ações futuras */}
      <div className="flex gap-4">
        {/* Redirecionamento para login */}
        <Link href="/auth/login" className="hidden sm:block text-sm text-gray-700 hover:text-blue-700">
          Entrar
        </Link>

        {/* Carrinho (reservado para futuro) */}
        {/* <button className="hidden sm:block opacity-30 cursor-not-allowed" disabled>
          🛒
        </button> */}
      </div>
    </header>
  );
}
