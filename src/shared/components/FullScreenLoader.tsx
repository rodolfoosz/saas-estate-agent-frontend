import { ImSpinner2 } from 'react-icons/im'

export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <ImSpinner2 size={48} className="text-white animate-spin" />
    </div>
  )
}
