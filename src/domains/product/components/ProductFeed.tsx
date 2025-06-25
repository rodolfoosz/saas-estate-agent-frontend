'use client'

import ProductCard from '../components/ProductCard'
import { useProducts } from '../hooks/useProducts'

export default function ProductFeed() {
  const { products, loading, error } = useProducts()

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] space-y-4">
        <p className="text-gray-600 text-lg">Carregando produtos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] text-red-500">
        <p>Erro ao carregar produtos: {error}</p>
      </div>
    )
  }

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] text-gray-600">
        <p>Nenhum produto encontrado.</p>
      </div>
    )
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}
