const colors = {
  blue: 'bg-primary-50 text-primary-800 ring-primary-100',
  amber: 'bg-amber-50 text-amber-800 ring-amber-100',
  emerald: 'bg-emerald-50 text-emerald-800 ring-emerald-100',
  slate: 'bg-slate-100 text-slate-700 ring-slate-200',
  violet: 'bg-violet-50 text-violet-800 ring-violet-100',
}

export default function Badge({ children, color = 'blue', className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${colors[color]} ${className}`}
    >
      {children}
    </span>
  )
}
