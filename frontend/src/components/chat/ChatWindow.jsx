import { useEffect, useRef } from 'react'
import { Bot, Sparkles } from 'lucide-react'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import SuggestedPrompts from './SuggestedPrompts'
import { SUGGESTED_QUESTIONS } from '../../utils/constants'

export default function ChatWindow({
  messages,
  isLoading,
  onSend,
  onRetry,
  suggestedPrompts = SUGGESTED_QUESTIONS,
}) {
  const bottomRef = useRef(null)
  const liveRegionRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  useEffect(() => {
    const last = messages[messages.length - 1]
    if (last?.role === 'assistant' && last.content && !last.isStreaming) {
      liveRegionRef.current.textContent = 'New assistant response received.'
    }
  }, [messages])

  const showWelcome = messages.length === 0

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col bg-slate-50 lg:h-[calc(100vh-5rem)]">
      <div className="sr-only" ref={liveRegionRef} aria-live="polite" aria-atomic="true" />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="mx-auto max-w-4xl space-y-6">
              {showWelcome && (
                <div className="flex flex-col items-center py-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-800 text-white shadow-lg">
                    <Bot className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    How can I help you today?
                  </h2>
                  <p className="mt-2 max-w-lg text-sm text-slate-600">
                    Ask about Tamil Nadu e-Sevai services — documents, fees, processing times,
                    eligibility, and step-by-step application guidance.
                  </p>
                  <div className="mt-4 flex items-center gap-2 rounded-full bg-amber-50 px-4 py-1.5 text-xs font-medium text-amber-800 ring-1 ring-amber-100">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    AI guidance only — verify on official portals
                  </div>
                </div>
              )}

              {messages.map((message) => {
                if (message.isStreaming && !message.content && !message.error) {
                  return <ChatMessage key={message.id} message={message} />
                }
                if (!message.content && !message.error) return null
                return (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    onRetry={onRetry}
                  />
                )
              })}

              <div ref={bottomRef} />
            </div>
          </div>

          <ChatInput onSend={onSend} disabled={isLoading} />
        </div>

        <aside className="hidden w-80 shrink-0 overflow-y-auto border-l border-slate-200 bg-white p-5 lg:block">
          <SuggestedPrompts
            prompts={suggestedPrompts.slice(0, 6)}
            onSelect={onSend}
            disabled={isLoading}
          />
        </aside>
      </div>

      <div className="border-t border-slate-200 bg-white p-4 lg:hidden">
        <SuggestedPrompts
          prompts={suggestedPrompts.slice(0, 3)}
          onSelect={onSend}
          disabled={isLoading}
        />
      </div>
    </div>
  )
}
