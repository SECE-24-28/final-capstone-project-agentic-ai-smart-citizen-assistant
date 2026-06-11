import { useState } from 'react'
import { Check, Circle } from 'lucide-react'
import { loadChecklist, saveChecklist } from '../../utils/storage'

export default function DocumentChecklist({ serviceId, documents = [] }) {
  const [checked, setChecked] = useState(() => loadChecklist(serviceId))

  const toggle = (doc) => {
    const next = { ...checked, [doc]: !checked[doc] }
    setChecked(next)
    saveChecklist(serviceId, next)
  }

  const completedCount = documents.filter((d) => checked[d]).length

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">Required Documents</h3>
        <span className="text-sm text-slate-500">
          {completedCount}/{documents.length} ready
        </span>
      </div>

      <ul className="space-y-2" role="list">
        {documents.map((doc) => {
          const isChecked = Boolean(checked[doc])
          return (
            <li key={doc}>
              <button
                type="button"
                onClick={() => toggle(doc)}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${
                  isChecked
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-primary-200 hover:bg-primary-50'
                }`}
                aria-pressed={isChecked}
              >
                {isChecked ? (
                  <Check className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                ) : (
                  <Circle className="h-5 w-5 shrink-0 text-slate-300" aria-hidden="true" />
                )}
                <span className={isChecked ? 'line-through opacity-80' : ''}>{doc}</span>
              </button>
            </li>
          )
        })}
      </ul>

      {completedCount === documents.length && documents.length > 0 && (
        <p className="mt-4 rounded-lg bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 ring-1 ring-emerald-100">
          All documents marked ready. Visit your nearest e-Sevai centre to apply.
        </p>
      )}
    </div>
  )
}
