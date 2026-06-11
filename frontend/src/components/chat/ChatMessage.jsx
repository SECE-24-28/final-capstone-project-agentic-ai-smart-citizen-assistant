import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { AlertCircle, Bot, RefreshCw, User } from 'lucide-react'
import Button from '../ui/Button'
import TypingIndicator from './TypingIndicator'

export default function ChatMessage({ message, onRetry }) {
  const isUser = message.role === 'user'
  const isAssistant = message.role === 'assistant'

  if (isAssistant && message.isStreaming && !message.content) {
    return <TypingIndicator />
  }

  if (isAssistant && message.error) {
    return (
      <div className="flex items-start gap-3 transition-all duration-300">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
        </div>
        <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-red-50 px-4 py-3 ring-1 ring-red-100 sm:max-w-[75%]">
          <p className="text-sm font-medium text-red-800">Unable to get a response</p>
          <p className="mt-1 text-sm text-red-700">{message.error}</p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-3"
            onClick={() => onRetry?.(message.failedQuestion, message.id)}
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`flex items-start gap-3 transition-all duration-300 ${
        isUser ? 'flex-row-reverse' : ''
      }`}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
          isUser ? 'bg-primary-800 text-white' : 'bg-primary-100 text-primary-800'
        }`}
        aria-hidden="true"
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm sm:max-w-[75%] ${
          isUser
            ? 'rounded-tr-md bg-primary-800 text-white'
            : 'rounded-tl-md bg-white ring-1 ring-slate-200'
        }`}
        role={isAssistant ? 'article' : undefined}
        aria-label={isAssistant ? 'Assistant response' : 'Your message'}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed">{message.content}</p>
        ) : (
          <div className="prose-chat">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}
