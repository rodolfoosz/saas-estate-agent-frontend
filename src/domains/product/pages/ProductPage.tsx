'use client'

import { useParams } from 'next/navigation'
import { useProductById } from '../hooks/useProducts'

export default function ProductPage() {
  const { id } = useParams()
  const { product, loading, error } = useProductById(id as string)

  if (loading) return <p>Carregando...</p>
  if (error) return <p>{error}</p>
  if (!product) return <p>Produto não encontrado.</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="text-gray-700">{product.description}</p>
      {/* outros campos aqui */}
    </div>
  )
}
