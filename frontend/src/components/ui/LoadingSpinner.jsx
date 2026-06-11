export default function LoadingSpinner({ size = 'md', className = '' }) {
  const sizeClass = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-8 w-8' : 'h-6 w-6'

  return (
    <div
      className={`inline-block animate-spin rounded-full border-2 border-slate-200 border-t-primary-700 ${sizeClass} ${className}`}
      role="status"
      aria-label="Loading"
    />
  )
}
