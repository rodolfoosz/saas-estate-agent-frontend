'use client'

import { formatCpf, formatPhone } from "@/app/utils/formatters"
import { createAccount } from "@/services/user.service"
import { CreateAccountFormData } from "@/types/user"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"


const initialFormData: CreateAccountFormData = {
  fullName: "",
  email: "",
  cpf: "",
  birthDate: "",
  phone: "",
  password: "",
  confirmPassword: "",
  address: "",
}

export default function CreateAccount() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
    const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validate = () => {
    if (!formData.fullName) errors.fullName = "Nome completo é obrigatório"
    if (!formData.email) errors.email = "Email é obrigatório"
    if (!formData.cpf) errors.cpf = "CPF é obrigatório"
    if (!formData.birthDate) errors.birthDate = "Data de nascimento é obrigatória"
    if (!formData.phone) errors.phone = "Telefone é obrigatório"
    if (!formData.address) errors.address = "Endereço é obrigatório"
    if (!formData.password) errors.password = "Senha é obrigatória"
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "As senhas não coincidem"

    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      await createAccount(formData)
      toast.success('Conta criada com sucesso!')
      router.push('/sucesso')
    } catch (err: unknown) {
      let msg = 'Erro ao criar conta.'

      if (axios.isAxiosError(err) && err.response?.data?.message) {
        msg = err.response.data.message
      }

      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-8">
      <div className="flex flex-wrap gap-x-4 gap-y-6">
        <div className="flex-1 min-w-[220px]">
          <label className="block text-sm font-medium text-gray-900">Nome completo</label>
          <input
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white text-gray-800 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="flex-1 min-w-[220px]">
          <label className="block text-sm font-medium text-gray-900">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white text-gray-800 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="flex-1 min-w-[220px]">
          <label className="block text-sm font-medium text-gray-900">CPF</label>
          <input
            name="cpf"
            type="text"
            maxLength={14}
            placeholder="000.000.000-00"
            value={formatCpf(formData.cpf)}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white text-gray-800 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="flex-1 min-w-[220px]">
          <label className="block text-sm font-medium text-gray-900">Data de nascimento</label>
          <input
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="flex-1 min-w-[220px]">
          <label className="block text-sm font-medium text-gray-900">Telefone</label>
          <input
            name="phone"
            type="tel"
            placeholder="(99) 99999-9999"
            value={formatPhone(formData.phone)}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white text-gray-800 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="flex-1 min-w-[220px]">
          <label className="block text-sm font-medium text-gray-900">Endereço</label>
          <input
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white text-gray-800 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="relative flex-1 min-w-[220px]">
          <label className="block text-sm font-medium text-gray-900">Senha</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-4 pr-12 py-2 bg-white text-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-900"
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>

        <div className="relative flex-1 min-w-[220px]">
          <label className="block text-sm font-medium text-gray-900">Confirmar Senha</label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full pl-4 pr-12 py-2 bg-white text-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-900"
          >
            {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 disabled:opacity-50"
        >
          {loading ? 'Criando conta...' : 'Criar Conta'}
        </button>
      </div>
    </form>
  )
}
