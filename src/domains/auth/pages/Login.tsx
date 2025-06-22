
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { LoginPayload } from '@domains/auth/types/loginPayload'
import { loginUser } from '@domains/auth/services/login.service'
import ScrollToTop from '@shared/types/ScrollTop'
import AuthLogoComponent from '../components/Login/AuthLogoComponent'
import AuthInputComponent from '../components/Login/AuthInputComponent'
import AuthLinksComponent from '../components/Login/AuthLinksComponent'

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha obrigatória'),
  remember: z.boolean().optional(),
})

export default function Login() {
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
            <AuthLogoComponent />
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <AuthInputComponent
                label="Usuário"
                icon="user"
                error={errors.email?.message}
                {...register('email')}
              />
              <AuthInputComponent
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
              <AuthLinksComponent />
            </form>
          </div>
        </section>
      </main>
    </>
  )
}
