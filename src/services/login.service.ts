import { LoginPayload } from "@/types/loginpayload"
import api from "./api"

export async function loginUser(data: LoginPayload) {
  const response = await api.post('/auth/login', data);
  return response.data;
};