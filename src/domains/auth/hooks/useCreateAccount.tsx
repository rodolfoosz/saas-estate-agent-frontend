'use client'

import { useState } from 'react'
import { isAxiosError } from 'axios'
import { CreateAccountFormData } from '@domains/user/types/user'
import { useFeedback } from '@context/FeedbackProvider'
import { createAccount } from '@domains/user/services/user.service'

const initialFormData: CreateAccountFormData = {
  fullName: '',
  email: '',
  cpf: '',
  birthDate: '',
  phone: '',
  cep: '',
  addressNumber: '',
  address: '',
  password: '',
  confirmPassword: '',
}

export const useCreateAccount = () => {
  const [formData, setFormData] = useState(initialFormData)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { showFeedback } = useFeedback()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const setCep = (value: string) => {
    setFormData((prev) => ({ ...prev, cep: value }))
  }

  const setAddress = (value: string) => {
    setFormData((prev) => ({ ...prev, address: value }))
  }

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawCep = e.target.value.replace(/\D/g, '')
    const formattedCep = rawCep.replace(/(\d{5})(\d{3})/, '$1-$2')
    setCep(formattedCep)

    if (rawCep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${rawCep}/json/`)
        const data = await res.json()

        if (data.erro) {
          showFeedback({
            type: 'error',
            title: 'Erro no CEP',
            message: 'CEP não encontrado.',
          })
          return
        }

        const enderecoFormatado = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`
        setAddress(enderecoFormatado)
      } catch {
        showFeedback({
          type: 'error',
          title: 'Erro no CEP',
          message: 'Erro ao buscar endereço.',
        })
      }
    }
  }

    const validate = () => {
        const newErrors: { [key: string]: string } = {}

        if (!formData.fullName) newErrors.fullName = 'Nome completo é obrigatório'
        if (!formData.email) newErrors.email = 'Email é obrigatório'
        if (!formData.cpf) newErrors.cpf = 'CPF é obrigatório'
        if (!formData.birthDate) newErrors.birthDate = 'Data de nascimento é obrigatória'
        if (!formData.phone) newErrors.phone = 'Telefone é obrigatório'
        if (!formData.address) newErrors.address = 'Endereço é obrigatório'
        if (!formData.password) newErrors.password = 'Senha é obrigatória'
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'As senhas não coincidem'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      await createAccount(formData)
      showFeedback({
        type: 'success',
        title: 'Conta criada com sucesso!',
        message: 'Você já pode fazer login com seus dados.',
      })
    } catch (err) {
      let msg = 'Erro ao criar conta.'
      if (isAxiosError(err) && err.response?.data?.message) {
        msg = err.response.data.message
      }
      showFeedback({
        type: 'error',
        title: 'Erro ao criar conta',
        message: msg,
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    formData,
    setFormData,
    handleChange,
    handleCepChange,
    setCep,
    setAddress,
    handleSubmit,
    loading,
    errors,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  }
}
