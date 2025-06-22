'use client'

import { requestPasswordReset } from '@domains/auth/services/requestPasswordReset.service'
import FeedbackHttpModal from '@shared/components/Modal/FeedbackHttpModal'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const ForgotPasswordComponent: React.FC = () => {
  const [email, setEmail] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'success' | 'error'>('success')
  const [modalTitle, setModalTitle] = useState('')
  const [modalMessage, setModalMessage] = useState('')
  const router = useRouter()

  const handleCloseModal = () => {
    setShowModal(false)
    router.push('/auth/login')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setModalType('error')
      setModalTitle('Erro')
      setModalMessage('Por favor, informe seu e-mail.')
      setShowModal(true)
      return
    }

    try {
      await requestPasswordReset(email)
      setModalType('success')
      setModalTitle('E-mail enviado')
      setModalMessage(
        'Se o e-mail informado estiver cadastrado, você receberá as instruções para redefinir sua senha.'
      )
    } catch (err: any) {
      setModalType('error')
      setModalTitle('Erro ao enviar')
      setModalMessage(err?.response?.data?.message || 'Erro ao enviar solicitação. Tente novamente.')
    } finally {
      setShowModal(true)
    }
  }

  return (
    <>
      <div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-center text-gray-800 mb-4">
          Esqueci minha senha
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-4 pr-12 py-2 bg-white text-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700"
          >
            Enviar
          </button>

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">Lembrou sua senha? </span>
            <a href="/auth/login" className="text-yellow-500 text-sm hover:underline font-semibold">
              Voltar para o login
            </a>
          </div>
        </form>
      </div>

      {showModal && (
        <FeedbackHttpModal
          type={modalType}
          title={modalTitle}
          message={modalMessage}
          onClose={handleCloseModal}
        />
      )}
    </>
  )
}

export default ForgotPasswordComponent
