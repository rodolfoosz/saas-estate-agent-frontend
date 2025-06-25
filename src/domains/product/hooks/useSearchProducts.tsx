import { useState, useEffect } from 'react'
import { Product } from '../types/types'
import { searchProductsByTerm } from '../services/productServices.service'

export function useSearchProducts(search: string) {
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (search.trim()) {
        setLoading(true)
        try {
          const res = await searchProductsByTerm(search)
          setResults(res)
        } finally {
          setLoading(false)
        }
      } else {
        setResults([])
      }
    }, 400)

    return () => clearTimeout(delayDebounce)
  }, [search])

  return { results, loading }
}
