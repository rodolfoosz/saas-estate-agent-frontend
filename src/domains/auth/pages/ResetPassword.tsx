'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import TextInput from '@shared/components/Form/TextInput'
import ButtonComponent from '@shared/components/Form/ButtonComponent'
import { resetPassword } from '../services/resetPassword.service'
import FeedbackHttpModal from '@shared/components/Modal/FeedbackHttpModal'

export function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'success' | 'error'>('success')
  const [modalTitle, setModalTitle] = useState('')
  const [modalMessage, setModalMessage] = useState('')

  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await resetPassword({ password, confirmPassword, token })
      setModalType('success')
      setModalTitle('Sucesso!')
      setModalMessage('Senha redefinida com sucesso!')
      setShowModal(true)
    } catch (err: any) {
      setModalType('error')
      setModalTitle('Erro')
      setModalMessage(
        Array.isArray(err?.response?.data?.message)
            ? err.response.data.message.join(', ')
            : err?.response?.data?.message || 'Erro ao redefinir senha.'
      )
      setShowModal(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-6 bg-white p-8 rounded-xl shadow"
        >
          <h1 className="text-2xl font-bold text-center">Redefinir senha</h1>
          <TextInput
            type="password"
            label="Nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextInput
            type="password"
            label="Confirmar nova senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <ButtonComponent type="submit" loading={isLoading}>
            Redefinir senha
          </ButtonComponent>
        </form>
      </div>

      {showModal && (
        <FeedbackHttpModal
          type={modalType}
          title={modalTitle}
          message={modalMessage}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
