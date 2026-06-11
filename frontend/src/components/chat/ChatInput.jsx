import { useState } from 'react'
import { Send } from 'lucide-react'
import Button from '../ui/Button'

export default function ChatInput({ onSend, disabled = false, placeholder }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setInput('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-slate-200 bg-white p-4"
      aria-label="Send a message"
    >
      <div className="mx-auto flex max-w-4xl items-end gap-3">
        <label htmlFor="chat-input" className="sr-only">
          Type your question
        </label>
        <textarea
          id="chat-input"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSubmit(e)
            }
          }}
          placeholder={placeholder || 'Ask about documents, fees, eligibility, or procedures...'}
          disabled={disabled}
          className="max-h-32 min-h-[44px] flex-1 resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 disabled:opacity-60"
        />
        <Button type="submit" disabled={disabled || !input.trim()} aria-label="Send message">
          <Send className="h-4 w-4" />
          <span className="hidden sm:inline">Send</span>
        </Button>
      </div>
    </form>
  )
}
