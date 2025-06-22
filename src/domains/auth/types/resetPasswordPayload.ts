
export interface ResetPasswordPayload {
  password: string
  confirmPassword: string
  token: string | null
}