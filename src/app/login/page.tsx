'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import AuthLogo from '@/components/Login/AuthLogo'
import AuthInput from '@/components/Login/AuthInput'
import AuthLinks from '@/components/Login/AuthLinks'
import { useRouter } from 'next/navigation'
import { LoginPayload } from '@/types/loginPayload'
import { loginUser } from '@/services/login.service'
import Image from 'next/image'
import ScrollToTop from '../utils/ScrollTop'

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha obrigatória'),
  remember: z.boolean().optional(),
})

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const router = useRouter();

  const onSubmit = async (data: LoginPayload) => {
    try {
      const response = await loginUser({ email: data.email, password: data.password });
      localStorage.setItem('token', response.access_token);
      router.push('/dashboard');
    } catch (err) {
      console.error('Erro ao fazer login:', err);
    }
  }

  return (
    <>
      <ScrollToTop />
      <main className="min-h-screen flex">
        <div className="hidden md:flex md:w-1/2 relative">
          <Image
            src="/login-background.png"
            alt="Imagem de fundo login"
            fill
            className="object-cover brightness-95"
            priority
          />
        </div>

        <section className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 bg-white">
          <div className="w-full max-w-sm">
            <AuthLogo />
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <AuthInput
                label="Usuário"
                icon="user"
                error={errors.email?.message}
                {...register('email')}
              />
              <AuthInput
                label="Senha"
                icon="lock"
                type="password"
                error={errors.password?.message}
                {...register('password')}
              />
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  {...register('remember')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                  Lembrar-me
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700"
              >
                ENTRAR
              </button>
              <AuthLinks />
            </form>
          </div>
        </section>
      </main>
    </>
  )
}
