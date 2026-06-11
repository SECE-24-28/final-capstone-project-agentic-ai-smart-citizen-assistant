const variants = {
  primary:
    'bg-primary-800 text-white hover:bg-primary-700 focus-visible:ring-primary-600 shadow-sm',
  secondary:
    'bg-white text-primary-800 border border-slate-200 hover:bg-slate-50 focus-visible:ring-primary-600',
  ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  amber: 'bg-amber-500 text-white hover:bg-amber-600 focus-visible:ring-amber-500 shadow-sm',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
