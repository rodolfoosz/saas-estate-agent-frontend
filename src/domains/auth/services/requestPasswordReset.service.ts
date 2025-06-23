import api from "@shared/services/api"

export const requestPasswordReset = async (email: string) => {
  const response = await api.post('/password-reset/request', { email })
  return response.data
}