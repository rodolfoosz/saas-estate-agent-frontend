import FeedbackHttpModal from '@shared/components/Modal/FeedbackHttpModal'
import { render, screen, fireEvent } from '@testing-library/react'

describe('FeedbackHttpModal', () => {
  const mockClose = jest.fn()

  it('renderiza corretamente o modal de sucesso', () => {
    render(
      <FeedbackHttpModal
        type="success"
        title="Sucesso!"
        message="Conta criada com sucesso."
        onClose={mockClose}
      />
    )

    expect(screen.getByText('Sucesso!')).toBeInTheDocument()
    expect(screen.getByText('Conta criada com sucesso.')).toBeInTheDocument()
    expect(screen.getByText('Fechar')).toBeInTheDocument()

    const titleElement = screen.getByText('Sucesso!')
    expect(titleElement).toHaveClass('text-green-600')
  })

  it('renderiza corretamente o modal de erro', () => {
    render(
      <FeedbackHttpModal
        type="error"
        title="Erro!"
        message="Não foi possível criar a conta."
        onClose={mockClose}
      />
    )

    expect(screen.getByText('Erro!')).toBeInTheDocument()
    expect(screen.getByText('Não foi possível criar a conta.')).toBeInTheDocument()
    expect(screen.getByText('Fechar')).toBeInTheDocument()

    const titleElement = screen.getByText('Erro!')
    expect(titleElement).toHaveClass('text-red-500')
  })

  it('chama onClose ao clicar no botão Fechar', () => {
    render(
      <FeedbackHttpModal
        type="error"
        title="Erro!"
        message="Algo deu errado."
        onClose={mockClose}
      />
    )

    fireEvent.click(screen.getByText('Fechar'))
    expect(mockClose).toHaveBeenCalled()
  })

  it('chama onClose ao clicar no fundo escuro', () => {
    render(
      <FeedbackHttpModal
        type="success"
        title="Sucesso!"
        message="Tudo certo!"
        onClose={mockClose}
      />
    )

    const backdrop = screen.getByRole('presentation', { hidden: true })
    fireEvent.click(backdrop)
    expect(mockClose).toHaveBeenCalled()
  })
})
