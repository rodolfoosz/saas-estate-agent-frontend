import { render, screen } from '@testing-library/react'
import CreateAccount from '@domains/auth/pages/CreateAccount'
import React from 'react'


// mocks necessários
jest.mock('@shared/utils/ScrollTop', () => () => <div data-testid="scroll-to-top" />)
jest.mock('next/image', () => 'img');

jest.mock('@domains/auth/components/CreateAccountComponent/CreateAccountComponent', () => () => (
  <div data-testid="create-account-component" />
))

describe('CreateAccount page', () => {
  it('deve renderizar o título e subtítulo corretamente', () => {
    render(<CreateAccount />)

    expect(screen.getByText('Criar Conta')).toBeInTheDocument()
    expect(screen.getByText(/Preencha os campos para começar/)).toBeInTheDocument()
  })

  it('deve renderizar o ScrollToTop', () => {
    render(<CreateAccount />)
    expect(screen.getByTestId('scroll-to-top')).toBeInTheDocument()
  })

  it('deve renderizar o CreateAccountComponent', () => {
    render(<CreateAccount />)
    expect(screen.getByTestId('create-account-component')).toBeInTheDocument()
  })

  it('deve renderizar as imagens corretamente', () => {
    render(<CreateAccount />)

    const images = screen.getAllByRole('img')
    expect(images.length).toBeGreaterThanOrEqual(1)

    expect(images.some(img => img.getAttribute('src')?.includes('logo-casae.png'))).toBe(true)
    expect(images.some(img => img.getAttribute('src')?.includes('login-background.png'))).toBe(true)
  })
})
