import Image from 'next/image'
import CreateAccountComponent from '../components/CreateAccountComponent/CreateAccountComponent'
import ScrollTop from '@shared/components/ScrollTop'

export default function CreateAccount() {
  return (
    <>
      <ScrollTop />
      <main className="min-h-screen flex">
          <div className="w-1/2 relative hidden md:block">
              <Image
                src="/login-background.png"
                alt="Imagem de fundo login"
                fill
                style={{ objectFit: 'cover' }}
                className="brightness-95"
              />
          </div>

        <section className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 bg-gray-50">
          <div className="w-full max-w-2xl">
            <div className="mb-8 text-center">
              <Image
                src="/logo-casae.png"
                alt="Casaé logo"
                width={410}
                height={100}
                className="mx-auto mb-4 object-contain"
                priority
              />
              <h1 className="text-3xl font-semibold text-gray-800">Criar Conta</h1>
              <p className="text-sm text-gray-500 mt-1">
                Preencha os campos para começar sua jornada no <strong>Casaé</strong>
              </p>
            </div>
            <CreateAccountComponent />
          </div>
        </section>
      </main>
    </>
  )
}
