import api from './api'
import { CreateAccountFormData } from '@/types/user'

export const createAccount = async (data: CreateAccountFormData) => {
  return api.post('/users', data);
};
