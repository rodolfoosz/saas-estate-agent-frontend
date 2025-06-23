'use client'

import FeedbackHttpModal from '@shared/components/Modal/FeedbackHttpModal'
import { Feedback, FeedbackContextData } from '@shared/types/props/FeedbackModalProps'
import { createContext, useContext, useState } from 'react'

const FeedbackContext = createContext<FeedbackContextData>({ showFeedback: () => {} })

export const useFeedback = () => useContext(FeedbackContext)

export function FeedbackProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<Feedback | null>(null)

  const showFeedback = (feedback: Feedback) => {
    setModal(feedback)
  }

  const close = () => setModal(null)

  return (
    <FeedbackContext.Provider value={{ showFeedback }}>
      {children}
      {modal && (
        <FeedbackHttpModal
          type={modal.type}
          title={modal.title}
          message={modal.message}
          onClose={close}
        />
      )}
    </FeedbackContext.Provider>
  )
}
