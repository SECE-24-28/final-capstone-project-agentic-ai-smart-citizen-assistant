export default function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${
        hover ? 'transition hover:border-primary-200 hover:shadow-md' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
