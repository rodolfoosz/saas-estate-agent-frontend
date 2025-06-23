'use client'

import Image from 'next/image';
import { Imovel } from '../types/types';
import { FaBed, FaBath } from 'react-icons/fa';
import { LuRuler } from 'react-icons/lu';
import { FiHeart } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa6';
import { IoLocationOutline } from 'react-icons/io5';

export default function ImovelCard({ imovel }: { imovel: Imovel }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 group cursor-pointer">
      {/* Imagem com efeito de zoom */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={imovel.image}
          alt={imovel.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Tipo de imóvel */}
        <span className="absolute top-3 left-3 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow">
          {imovel.type}
        </span>

        {/* Botão curtir */}
        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100">
          <FiHeart className="text-gray-600" />
        </button>

        {/* Estrela de avaliação */}
        <div className="absolute bottom-3 left-3 bg-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow">
          <FaStar className="text-yellow-400 text-sm" />
          <span>{imovel.rating}</span>
        </div>
      </div>

      {/* Conteúdo do card */}
      <div className="p-4 flex flex-col gap-2">
        <h2 className="font-semibold text-lg text-gray-800">{imovel.title}</h2>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <IoLocationOutline className="text-base" />
          {imovel.location}
        </div>

        <div className="flex items-center justify-start gap-4 text-sm text-gray-600 mt-1">
          <div className="flex items-center gap-1">
            <FaBed /> {imovel.bedrooms}
          </div>
          <div className="flex items-center gap-1">
            <FaBath /> {imovel.bathrooms}
          </div>
          <div className="flex items-center gap-1">
            <LuRuler /> {imovel.area}m²
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-3 mt-3">
          <div>
            <p className="text-lg font-bold text-gray-900">{imovel.price}</p>
            <span className="text-xs text-gray-500">Total</span>
          </div>
          <button className="bg-gray-800 text-white text-sm px-4 py-2 rounded-md hover:bg-gray-700 transition">
            Ver detalhes
          </button>
        </div>
      </div>
    </div>
  );
}
