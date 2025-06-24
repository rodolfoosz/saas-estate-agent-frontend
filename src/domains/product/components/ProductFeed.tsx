'use client'

import ProductCard from '../components/ProductCard'
import { useProducts } from '../hooks/useProducts'

export default function ProductFeed() {
  const { products, loading, error } = useProducts()

  if (loading) return <p>Carregando produtos...</p>
  if (error) return <p>Erro ao carregar produtos: {error}</p>
  if (!products.length) return <p>Nenhum produto encontrado.</p>

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}
