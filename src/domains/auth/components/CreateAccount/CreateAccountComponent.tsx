'use client'

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { ImSpinner2 } from 'react-icons/im'
import DelayedLoader from '../../../../shared/components/DelayedLoader'
import { useCreateAccount } from '@domains/auth/hooks/useCreateAccount'
import TextInput from '@shared/components/Form/TextInput'
import { formatCpf, formatPhone } from '@shared/types/formatters'

export default function CreateAccountComponent() {
  const {
    formData,
    errors,
    loading,
    handleChange,
    handleCepChange,
    handleSubmit,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  } = useCreateAccount()

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-8">
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        
        {/* Nome / Email */}
        <div className="flex-1 min-w-[220px]">
          <TextInput
            label="Nome completo"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
          />
        </div>

        <div className="flex-1 min-w-[220px]">
          <TextInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
        </div>

        {/* CPF / Data de nascimento */}
        <div className="flex-1 min-w-[220px]">
          <TextInput
            label="CPF"
            name="cpf"
            maxLength={14}
            placeholder="000.000.000-00"
            value={formatCpf(formData.cpf)}
            onChange={handleChange}
            error={errors.cpf}
          />
        </div>

        <div className="flex-1 min-w-[220px]">
          <TextInput
            label="Data de nascimento"
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
            error={errors.birthDate}
          />
        </div>

        {/* Telefone / CEP */}
        <div className="flex-1 min-w-[220px]">
          <TextInput
            label="Telefone"
            name="phone"
            placeholder="(99) 99999-9999"
            value={formatPhone(formData.phone)}
            onChange={handleChange}
            error={errors.phone}
          />
        </div>

        <div className="flex-1 min-w-[220px]">
          <TextInput
            label="CEP"
            name="cep"
            value={formData.cep}
            onChange={handleCepChange}
            error={errors.cep}
          />
        </div>

        {/* Número / Endereço */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 w-full">
          <div className="flex-1 min-w-[220px]">
            <TextInput
              label="Endereço"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
            />
          </div>

          <div className="w-36">
            <TextInput
              label="Número"
              name="addressNumber"
              value={formData.addressNumber}
              onChange={handleChange}
              error={errors.addressNumber}
            />
          </div>
        </div>

        {/* Senha / Confirmar senha */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 w-full">
          <div className="relative flex-1 min-w-[220px]">
            <TextInput
              label="Senha"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
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
            <TextInput
              label="Confirmar Senha"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
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
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 disabled:opacity-50 flex justify-center items-center gap-2"
        >
          {loading ? (
            <>
              <ImSpinner2 className="animate-spin" size={18} />
              Criando conta...
            </>
          ) : (
            'Criar Conta'
          )}
        </button>
      </div>

      <DelayedLoader loading={loading} />

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Já possui conta?{' '}
          <a href="/auth/login" className="text-yellow-500 hover:underline font-semibold">
            Faça login
          </a>
        </p>
      </div>
    </form>
  )
}
