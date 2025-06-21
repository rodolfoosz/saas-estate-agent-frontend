export default function SucessoPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white shadow rounded-md">
        <h1 className="text-2xl font-bold mb-4 text-green-600">Conta criada com sucesso!</h1>
        <p className="mb-4 text-gray-700">Você já pode fazer login na sua conta.</p>
        <a
          href="/login"
          className="inline-block bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700"
        >
          Ir para login
        </a>
      </div>
    </main>
  )
}
