import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Login from '@domains/auth/pages/Login'
import { useRouter } from 'next/navigation'
import { loginUser } from '@domains/auth/services/login.service'
import React from 'react'


jest.mock('@domains/auth/services/login.service', () => ({
  loginUser: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@shared/components/ScrollTop', () => () => null)
jest.mock('next/image', () => (props: any) => <img {...props} alt={props.alt || 'image'} />)

jest.mock('@domains/auth/components/LoginComponent/AuthLogoComponent', () => () => (
  <div data-testid="auth-logo" />
))
jest.mock('@domains/auth/components/LoginComponent/AuthInputComponent', () => {
  return ({ label, type = 'text', ...rest }: any) => (
    <div>
      <label htmlFor={label}>{label}</label>
      <input id={label} type={type} {...rest} />
    </div>
  )
})
jest.mock('@domains/auth/components/LoginComponent/AuthLinksComponent', () => () => (
  <div data-testid="auth-links" />
))

describe('Login page', () => {
  const pushMock = jest.fn()

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({ push: pushMock })
    localStorage.clear()
    jest.clearAllMocks()
  })

  it('deve renderizar os campos de e-mail e senha', () => {
    render(<Login />)

    expect(screen.getByLabelText('Usuário')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
    expect(screen.getByLabelText('Lembrar-me')).toBeInTheDocument()
  })

  it('deve exibir erros de validação se os campos forem vazios', async () => {
    render(<Login />)

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }))

    await waitFor(() => {
      expect(screen.getByText('E-mail inválido')).toBeInTheDocument()
      expect(screen.getByText('Senha obrigatória')).toBeInTheDocument()
    })
  })

  it('deve chamar loginUser e redirecionar ao dashboard em caso de sucesso', async () => {
    (loginUser as jest.Mock).mockResolvedValueOnce({ access_token: 'fake-token' })

    render(<Login />)

    fireEvent.change(screen.getByLabelText('Usuário'), { target: { value: 'user@email.com' } })
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: '123456' } })

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }))

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith({
        email: 'user@email.com',
        password: '123456',
      })
      expect(localStorage.getItem('token')).toBe('fake-token')
      expect(pushMock).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('deve exibir erro no console se login falhar', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    ;(loginUser as jest.Mock).mockRejectedValueOnce(new Error('Login falhou'))

    render(<Login />)

    fireEvent.change(screen.getByLabelText('Usuário'), { target: { value: 'user@email.com' } })
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: '123456' } })
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }))

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalled()
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao fazer login:', expect.any(Error))
    })

    consoleSpy.mockRestore()
  })
})
