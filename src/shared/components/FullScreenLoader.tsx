import { ImSpinner2 } from 'react-icons/im'

export default function FullScreenLoader() {
  return (
    <div
      data-testid="full-screen-loader"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 m-0 p-0"
    >
      <ImSpinner2 size={48} className="text-white animate-spin m-0 p-0" />
    </div>
  )
}
