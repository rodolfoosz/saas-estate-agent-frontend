import axios from 'axios'
import api from '@shared/services/api'

describe('API instance', () => {
  it('deve ter os métodos básicos do axios', () => {
    expect(typeof api.get).toBe('function')
    expect(typeof api.post).toBe('function')
    expect(typeof api.interceptors).toBe('object')
  })
})
