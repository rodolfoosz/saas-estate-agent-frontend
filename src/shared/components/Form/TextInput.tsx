import { TextInputProps } from "@shared/types/props/textInputProps";

export default function TextInput({ label, error, ...props }: TextInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          className={`block mb-1 font-medium ${
            error ? 'text-red-600' : 'text-gray-700'
          }`}
        >
          {label}
        </label>
      )}

      <input
        {...props}
        className={`w-full px-4 py-2 border rounded-md shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-500 focus:ring-red-400 focus:border-red-400'
            : 'border-gray-300 focus:ring-orange-400 focus:border-orange-400'
        }`}
      />

      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
}
