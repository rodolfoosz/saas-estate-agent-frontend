import { LoginPayload } from '@domains/auth/types/loginPayload'

jest.mock('@shared/services/api', () => ({
  post: jest.fn(),
}))

import api from '@shared/services/api'
import { loginUser } from '@domains/auth/services/login.service'

describe('loginUser', () => {
  const mockData: LoginPayload = {
    email: 'teste@exemplo.com',
    password: '123456',
  }

  it('deve chamar a API com os dados corretos e retornar os dados da resposta', async () => {
    const mockResponse = { token: 'fake-token' }
    ;(api.post as jest.Mock).mockResolvedValue({ data: mockResponse })

    const result = await loginUser(mockData)

    expect(api.post).toHaveBeenCalledWith('/auth/login', mockData)
    expect(result).toEqual(mockResponse)
  })

  it('deve lançar erro em caso de falha na requisição', async () => {
    const mockError = new Error('Request failed')
    ;(api.post as jest.Mock).mockRejectedValue(mockError)

    await expect(loginUser(mockData)).rejects.toThrow('Request failed')
  })
})
