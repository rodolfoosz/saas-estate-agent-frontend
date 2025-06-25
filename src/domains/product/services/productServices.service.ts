import api from '@shared/services/api'
import { Product } from '../types/types'

export async function fetchProducts(): Promise<Product[]> {
  const response = await api.get('/products')
  return response.data
}

export async function getProductById(id: string): Promise<Product> {
  const response = await api.get(`/products/${id}`)
  return response.data
}

export async function searchProductsByTerm(term: string): Promise<Product[]> {
  const response = await api.get(`/products/search?term=${encodeURIComponent(term)}`)
  return response.data
}