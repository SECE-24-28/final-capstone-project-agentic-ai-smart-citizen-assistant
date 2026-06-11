import { Search } from 'lucide-react'

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search...',
  label,
  id = 'search',
  size = 'md',
  className = '',
}) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(value)
  }

  const sizeClasses = size === 'lg' ? 'py-4 text-base' : 'py-2.5 text-sm'

  return (
    <form onSubmit={handleSubmit} className={className} role="search">
      {label && (
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <Search
          className="pointer-events-none absolute left-4 h-5 w-5 text-slate-400"
          aria-hidden="true"
        />
        <input
          id={id}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-slate-800 shadow-sm placeholder:text-slate-400 transition focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 ${sizeClasses}`}
          autoComplete="off"
        />
      </div>
    </form>
  )
}
