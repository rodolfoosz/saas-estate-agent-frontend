// __tests__/hooks/useCreateAccount.spec.tsx
import { FeedbackProvider } from '@context/FeedbackProvider'
import { useCreateAccount } from '@domains/auth/hooks/useCreateAccount'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

function HookWrapper() {
  const {
    formData,
    handleChange,
    handleSubmit,
    loading,
    errors,
  } = useCreateAccount()

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Nome completo"
      />
      <button type="submit" disabled={loading}>Criar Conta</button>
      {errors.fullName && <span>{errors.fullName}</span>}
    </form>
  )
}

describe('useCreateAccount', () => {
  it('valida campos obrigatórios', async () => {
    render(
      <FeedbackProvider>
        <HookWrapper />
      </FeedbackProvider>
    )

    fireEvent.click(screen.getByRole('button', { name: /criar conta/i }))

    await waitFor(() => {
      expect(screen.getByText(/Nome completo é obrigatório/i)).toBeInTheDocument()
    })
  })
})
