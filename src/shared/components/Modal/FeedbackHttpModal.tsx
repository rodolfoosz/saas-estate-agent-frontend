'use client'

import { FeedbackModalProps } from "@shared/types/props/FeedbackModalProps"

export default function FeedbackHttpModal({ type, title, message, onClose }: FeedbackModalProps) {
  const isSuccess = type === 'success'
  const textColor = isSuccess ? 'text-green-600' : 'text-red-500'
  const bgColor = isSuccess ? 'bg-gray-800' : 'bg-red-300'
  const bgHover = isSuccess ? 'hover:bg-gray-700' : 'hover:bg-red-700'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fundo escuro translúcido */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Conteúdo do modal */}
      <div className="relative z-10 bg-white rounded-lg shadow-xl w-[90%] max-w-md px-6 py-8 text-center animate-fade-in">
        <h2 className={`text-xl font-bold mb-2 ${textColor}`}>{title}</h2>
        <p className="text-gray-700 mb-6">{message}</p>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className={`px-6 py-2 rounded-md text-white transition ${bgColor} ${bgHover}`}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
