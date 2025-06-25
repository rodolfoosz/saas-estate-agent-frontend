'use client'

import DelayedLoader from '@shared/components/DelayedLoader'
import ProductCard from '../components/ProductCard'
import { useProducts } from '../hooks/useProducts'
import { ImSpinner2 } from 'react-icons/im'

export default function ProductFeed() {
  const { products, loading, error } = useProducts()

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] space-y-4">
        <ImSpinner2 className="animate-spin text-4xl text-gray-600" />
        <p className="text-gray-600 text-lg">Carregando produtos...</p>
        <DelayedLoader loading={loading} />
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
