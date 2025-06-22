import api from "@shared/services/api";
import { LoginPayload } from "../types/loginPayload";

export async function loginUser(data: LoginPayload) {
  const response = await api.post('/auth/login', data);
  return response.data;
};