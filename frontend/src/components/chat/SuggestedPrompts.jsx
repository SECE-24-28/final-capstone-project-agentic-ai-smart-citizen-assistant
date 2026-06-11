import { MessageCircleQuestion } from 'lucide-react'

export default function SuggestedPrompts({ prompts, onSelect, disabled = false }) {
  if (!prompts?.length) return null

  return (
    <div aria-label="Suggested questions">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
        <MessageCircleQuestion className="h-4 w-4 text-primary-700" aria-hidden="true" />
        Suggested questions
      </h3>
      <div className="flex flex-col gap-2">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(prompt)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-700 transition hover:border-primary-200 hover:bg-primary-50 hover:text-primary-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  )
}
