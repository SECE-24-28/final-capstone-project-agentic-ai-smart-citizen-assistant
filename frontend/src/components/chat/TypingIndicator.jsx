import { Bot } from 'lucide-react'

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 opacity-100 transition-opacity duration-300" aria-live="polite">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-800">
        <Bot className="h-4 w-4" aria-hidden="true" />
      </div>
      <div className="rounded-2xl rounded-tl-md bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
        <div className="flex items-center gap-1.5" aria-label="Assistant is typing">
          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:0ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  )
}
