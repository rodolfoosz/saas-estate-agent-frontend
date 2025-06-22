import api from "@shared/services/api"
import { ResetPasswordPayload } from "../types/resetPasswordPayload"


export async function resetPassword({ password, confirmPassword, token }: ResetPasswordPayload) {
  if (!token) {
    throw new Error('Token de redefinição inválido ou ausente.')
  }

  const response = await api.post('/password-reset', {
    password,
    confirmPassword,
    token,
  })

  return response.data
}
