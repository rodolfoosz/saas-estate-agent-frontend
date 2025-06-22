import { render, screen } from '@testing-library/react'
import ForgotPassword from '@domains/auth/pages/ForgotPassword'
import React from 'react'


// mocks
jest.mock('next/image', () => (props: any) => <img {...props} alt={props.alt || 'mocked image'} />)
jest.mock('@domains/auth/components/ForgotPasswordComponent/ForgotPasswordComponent', () => () => (
  <div data-testid="forgot-password-component" />
))

describe('ForgotPassword page', () => {
  it('deve renderizar o componente ForgotPasswordComponent', () => {
    render(<ForgotPassword />)
    screen.debug()
    expect(screen.getByTestId('forgot-password-component')).toBeInTheDocument()
  })

  it('deve renderizar a imagem de fundo', () => {
    render(<ForgotPassword />)

    const bgImage = screen.getAllByRole('img').find(img =>
      img.getAttribute('src')?.includes('login-background.png')
    )

    expect(bgImage).toBeDefined()
  })

  it('deve renderizar a logo do Casaé', () => {
    render(<ForgotPassword />)

    const logo = screen.getAllByRole('img').find(img =>
      img.getAttribute('src')?.includes('logo-casae.png')
    )

    expect(logo).toBeDefined()
  })
})
