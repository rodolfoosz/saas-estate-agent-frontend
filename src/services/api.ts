import { LoginPayload } from '@/types/loginpayload';
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/',
  timeout: 10000,
});

export async function loginUser(data: LoginPayload) {
  const response = await api.post('/auth/login', data)
  return response.data
};

export default api
