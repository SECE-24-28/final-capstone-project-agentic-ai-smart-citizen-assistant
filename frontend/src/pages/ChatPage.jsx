import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { ArrowLeft, RotateCcw } from 'lucide-react'
import ChatWindow from '../components/chat/ChatWindow'
import Button from '../components/ui/Button'
import { useChat } from '../context/ChatContext'

export default function ChatPage() {
  const {
    messages,
    isLoading,
    pendingQuestion,
    sendMessage,
    clearChat,
    clearPendingQuestion,
    retryMessage,
  } = useChat()

  const processedRef = useRef(null)

  useEffect(() => {
    if (!pendingQuestion || isLoading) return
    if (processedRef.current === pendingQuestion) return

    processedRef.current = pendingQuestion
    const question = pendingQuestion
    clearPendingQuestion()
    sendMessage(question)
  }, [pendingQuestion, isLoading, sendMessage, clearPendingQuestion])

  useEffect(() => {
    if (!pendingQuestion) {
      processedRef.current = null
    }
  }, [pendingQuestion])

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-base font-semibold text-slate-900">AI Assistant</h1>
            <p className="text-xs text-slate-500">Tamil Nadu e-Sevai Government Services</p>
          </div>
        </div>

        {messages.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearChat}>
            <RotateCcw className="h-4 w-4" />
            New Chat
          </Button>
        )}
      </div>

      <ChatWindow
        messages={messages}
        isLoading={isLoading}
        onSend={sendMessage}
        onRetry={retryMessage}
      />
    </div>
  )
}
