'use client';

import React, { useState } from 'react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitted(false);

    if (!email) {
      setError('Por favor, informe seu e-mail.');
      return;
    }

    try {
      // await api.post('/forgot-password', { email });
      setSubmitted(true);
    } catch (err) {
      setError('Erro ao enviar solicitação. Tente novamente.');
      console.log(err);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-center text-gray-800 mb-4">
        Esqueci minha senha
      </h2>

      {submitted ? (
        <p className="text-center text-gray-600">
          Se o e-mail informado estiver cadastrado, você receberá as instruções para redefinir sua senha.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full pl-4 pr-12 py-2 bg-white text-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700"
          >
            Enviar
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
