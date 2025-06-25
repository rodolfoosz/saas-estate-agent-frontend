'use client';

import Link from 'next/link';
import { LuMenu } from 'react-icons/lu';
import { FaSearch, FaClock } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useAuthUser } from '@domains/auth/hooks/useAuthUser';
import DropDownMenu from '@shared/components/DropDownMenu';
import { useSearchProducts } from '@domains/product/hooks/useSearchProducts';

interface PublicHeaderProps {
  toggleMenu: () => void;
}

export default function PublicHeader({ toggleMenu }: PublicHeaderProps) {
  const user = useAuthUser();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const { results } = useSearchProducts(debouncedSearch);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setShowDropdown(true);
  };

  const handleSelect = (term: string) => {
    setShowDropdown(false);
    setSearch('');
    if (term && !searchHistory.includes(term)) {
      setSearchHistory([term, ...searchHistory.slice(0, 4)]); // máximo 5 termos
    }
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  return (
    <header className="w-full bg-white shadow-md px-4 py-3 flex items-center justify-between sticky top-0 z-50 transition-colors duration-300">
      <div className="flex items-center gap-3">
        <button onClick={toggleMenu} className="text-xl p-2 rounded">
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

      <div className="relative flex-1 mx-4 max-w-md" ref={dropdownRef}>
        <input
          type="text"
          placeholder="Buscar imóveis, bairros, corretores..."
          value={search}
          onChange={handleInputChange}
          className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        {showDropdown && (results.length > 0 || searchHistory.length > 0) && (
          <div className="absolute mt-2 w-full bg-white border rounded-2xl shadow-xl z-50 max-h-72 overflow-y-auto text-gray-800">
            {results.length > 0 && (
              <>
                <div className="px-4 py-2 text-sm text-gray-500">Resultados</div>
                {results.map((item) => (
                  <Link
                    key={item.id}
                    href={`/produtos/${item.id}`}
                    onClick={() => handleSelect(item.title)}
                  >
                    <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <FaSearch className="text-gray-400" />
                      <span>{item.title}</span>
                    </div>
                  </Link>
                ))}
              </>
            )}

            {searchHistory.length > 0 && (
              <>
                <hr className="my-1 border-gray-200" />
                <div className="px-4 py-2 text-sm text-gray-500 flex justify-between items-center">
                  Buscas recentes
                  <button onClick={clearSearchHistory} className="text-xs text-blue-500 hover:underline">
                    Limpar
                  </button>
                </div>
                {searchHistory.map((term, index) => (
                  <div
                    key={index}
                    onClick={() => setSearch(term)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <FaClock className="text-gray-400" />
                    <span>{term}</span>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {user ? (
        <DropDownMenu
          buttonClassName="text-gray-700"
          labelClassName="text-gray-700"
          align="right"
        />
      ) : (
        <Link
          href="/auth/login"
          className="flex flex-col items-center text-sm text-gray-700 hover:text-gray-700"
        >
          <LuMenu className="text-xl" />
          <span className="hidden sm:inline">Entrar</span>
        </Link>
      )}
    </header>
  );
}
