export default function ErrorMessage({ message, onRetry }) {
  if (!message) return null
  return (
    <div className="rounded-md border border-red-200 bg-red-50 p-4">
      <p className="text-sm text-red-600">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 text-sm font-medium text-red-600 underline hover:no-underline"
        >
          Try again
        </button>
      )}
    </div>
  )
}