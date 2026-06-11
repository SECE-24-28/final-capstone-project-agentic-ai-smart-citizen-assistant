export default function ApplicationSteps({ steps = [] }) {
  return (
    <div>
      <h3 className="mb-5 text-base font-semibold text-slate-900">Application Procedure</h3>
      <ol className="relative space-y-0">
        {steps.map((step, index) => (
          <li key={step} className="relative flex gap-4 pb-8 last:pb-0">
            {index < steps.length - 1 && (
              <span
                className="absolute left-[15px] top-8 h-full w-0.5 bg-slate-200"
                aria-hidden="true"
              />
            )}
            <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-800 text-xs font-bold text-white shadow-sm">
              {index + 1}
            </span>
            <div className="pt-1">
              <p className="text-sm leading-relaxed text-slate-700">{step}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
