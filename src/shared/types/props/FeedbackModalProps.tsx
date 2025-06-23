type FeedbackType = 'success' | 'error'

export interface FeedbackModalProps {
  type: 'success' | 'error'
  title: string
  message: string
  onClose: () => void
}

export interface Feedback {
  type: FeedbackType
  title: string
  message: string
}

export interface FeedbackContextData {
  showFeedback: (feedback: Feedback) => void
}