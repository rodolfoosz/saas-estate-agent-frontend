import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CreateAccountComponent from '@domains/auth/components/CreateAccountComponent/CreateAccountComponent'
import { useCreateAccount } from '@domains/auth/hooks/useCreateAccount'

// Mock do hook e componentes usados
jest.mock('@domains/auth/hooks/useCreateAccount')
jest.mock('@shared/components/DelayedLoader', () => ({
  __esModule: true,
  default: () => <div data-testid="delayed-loader" />,
}));

jest.mock('@shared/components/Form/TextInput', () => ({ label, ...props }: any) => (
  <input aria-label={label} {...props} />
))

const mockUseCreateAccount = useCreateAccount as jest.Mock

describe('CreateAccountComponent', () => {
  const handleSubmitMock = jest.fn((e: any) => e.preventDefault())

  beforeEach(() => {
    mockUseCreateAccount.mockReturnValue({
      formData: {
        fullName: '',
        email: '',
        cpf: '',
        birthDate: '',
        phone: '',
        cep: '',
        address: '',
        addressNumber: '',
        password: '',
        confirmPassword: '',
      },
      errors: {},
      loading: false,
      handleChange: jest.fn(),
      handleCepChange: jest.fn(),
      handleSubmit: handleSubmitMock,
      showPassword: false,
      setShowPassword: jest.fn(),
      showConfirmPassword: false,
      setShowConfirmPassword: jest.fn(),
    })
  })

  it('renderiza todos os campos corretamente', () => {
    render(<CreateAccountComponent />)

    const labels = [
      'Nome completo',
      'Email',
      'CPF',
      'Data de nascimento',
      'Telefone',
      'CEP',
      'Endereço',
      'Número',
      'Senha',
      'Confirmar Senha',
    ]

    for (const label of labels) {
      expect(screen.getByLabelText(label)).toBeInTheDocument()
    }
  })

  it('submete o formulário ao clicar no botão', () => {
    render(<CreateAccountComponent />)

    const submitButton = screen.getByRole('button', { name: /criar conta/i })
    fireEvent.click(submitButton)

    expect(handleSubmitMock).toHaveBeenCalled()
  })

  it('mostra loading quando loading=true', () => {
    mockUseCreateAccount.mockReturnValueOnce({
      ...mockUseCreateAccount(),
      loading: true,
    })

    render(<CreateAccountComponent />)

    expect(screen.getByTestId('delayed-loader')).toBeInTheDocument()
    expect(screen.getByText(/criando conta/i)).toBeInTheDocument()
  })
})
