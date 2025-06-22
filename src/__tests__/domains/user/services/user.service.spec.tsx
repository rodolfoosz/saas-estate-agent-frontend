import { createAccount } from '@domains/user/services/user.service';
import { CreateAccountFormData } from '@domains/user/types/user';
import api from '@shared/services/api';
import React from 'react'


jest.mock('@shared/services/api');

describe('createAccount', () => {
  it('deve chamar api.post com os dados corretos', async () => {
    const mockData: CreateAccountFormData = {
      fullName: 'João Silva',
      email: 'joao@example.com',
      cpf: '123.456.789-00',
      birthDate: '1990-01-01',
      phone: '(11) 91234-5678',
      cep: '12345-678',
      address: 'Rua Exemplo',
      addressNumber: '123',
      password: 'senha123',
      confirmPassword: 'senha123',
    };

    const postMock = api.post as jest.Mock;
    postMock.mockResolvedValueOnce({ data: { success: true } });

    const response = await createAccount(mockData);

    expect(api.post).toHaveBeenCalledWith('/users', mockData);
    expect(response.data).toEqual({ success: true });
  });

  it('deve propagar erro se a requisição falhar', async () => {
    const error = new Error('Erro na API');
    (api.post as jest.Mock).mockRejectedValueOnce(error);

    await expect(createAccount({} as any)).rejects.toThrow('Erro na API');
  });
});
