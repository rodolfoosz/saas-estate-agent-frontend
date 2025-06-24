// domains/product/hooks/useProducts.ts
'use client'

import { useEffect, useState } from 'react'
import { Product } from '../types/types'
import { fetchProducts, getProductById } from '../services/productServices.service'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts()
        setProducts(data)
      } catch (err) {
        setError('Erro ao buscar produtos')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return { products, loading, error }
}

export function useProductById(id: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const load = async () => {
      try {
        const data = await getProductById(id)
        setProduct(data)
      } catch (err) {
        setError('Produto não encontrado')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [id])

  return { product, loading, error }
}
