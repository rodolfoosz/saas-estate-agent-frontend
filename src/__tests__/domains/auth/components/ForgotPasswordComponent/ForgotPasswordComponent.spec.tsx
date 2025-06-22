import { render, screen, fireEvent } from '@testing-library/react'
import ForgotPasswordComponent from '@domains/auth/components/ForgotPasswordComponent/ForgotPasswordComponent'
import React from 'react'


describe('ForgotPasswordComponent', () => {
  it('renderiza o formulário corretamente', () => {
    render(<ForgotPasswordComponent />)

    expect(screen.getByText('Esqueci minha senha')).toBeInTheDocument()
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument()
  })

  it('exibe mensagem de erro se o email não for preenchido', () => {
    render(<ForgotPasswordComponent />)

    const button = screen.getByRole('button', { name: /enviar/i })
    fireEvent.click(button)

    expect(screen.getByText(/informe seu e-mail/i)).toBeInTheDocument()
  })

  it('exibe mensagem de sucesso após envio válido', () => {
    render(<ForgotPasswordComponent />)

    const input = screen.getByLabelText(/e-mail/i)
    const button = screen.getByRole('button', { name: /enviar/i })

    fireEvent.change(input, { target: { value: 'teste@exemplo.com' } })
    fireEvent.click(button)

    expect(
      screen.getByText(/Se o e-mail informado estiver cadastrado/)
    ).toBeInTheDocument()
  })
})
