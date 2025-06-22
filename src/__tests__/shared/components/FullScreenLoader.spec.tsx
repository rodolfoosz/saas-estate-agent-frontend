import { render, screen } from '@testing-library/react'
import FullScreenLoader from '@shared/components/FullScreenLoader'
import React from 'react'

describe('FullScreenLoader', () => {
  it('deve renderizar o componente com texto de carregamento', () => {
    render(<FullScreenLoader />)

    const loader = screen.getByTestId('full-screen-loader')
    expect(loader).toBeInTheDocument()
    expect(loader).toHaveTextContent(/carregando/i)
  })

  it('deve ter classes de estilo de tela cheia', () => {
    render(<FullScreenLoader />)

    const loader = screen.getByTestId('full-screen-loader')
    expect(loader).toHaveClass('fixed', 'inset-0', 'flex', 'items-center', 'justify-center')
  })
})
