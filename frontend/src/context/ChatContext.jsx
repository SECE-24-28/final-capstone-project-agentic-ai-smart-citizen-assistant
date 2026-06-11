import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import { useAskAssistant } from '../hooks/useAskAssistant'
import { CHAT_STORAGE_KEY } from '../utils/constants'
import { loadFromStorage, saveToStorage, removeFromStorage } from '../utils/storage'

const ChatContext = createContext(null)

const initialState = {
  messages: [],
  isLoading: false,
  error: null,
  pendingQuestion: null,
}

function createMessage(role, content, extra = {}) {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    timestamp: new Date().toISOString(),
    ...extra,
  }
}

function chatReducer(state, action) {
  switch (action.type) {
    case 'RESTORE':
      return {
        ...state,
        messages: action.payload.messages ?? [],
        pendingQuestion: action.payload.pendingQuestion ?? null,
      }
    case 'SET_PENDING_QUESTION':
      return { ...state, pendingQuestion: action.payload }
    case 'CLEAR_PENDING_QUESTION':
      return { ...state, pendingQuestion: null }
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
        error: null,
      }
    case 'UPDATE_MESSAGE':
      return {
        ...state,
        messages: state.messages.map((msg) =>
          msg.id === action.payload.id ? { ...msg, ...action.payload.updates } : msg,
        ),
      }
    case 'REMOVE_MESSAGE':
      return {
        ...state,
        messages: state.messages.filter((msg) => msg.id !== action.payload),
      }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'CLEAR_CHAT':
      return { ...initialState }
    default:
      return state
  }
}

export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialState)
  const { mutateAsync } = useAskAssistant()
  const stateRef = useRef(state)

  useEffect(() => {
    stateRef.current = state
  }, [state])

  useEffect(() => {
    const saved = loadFromStorage(CHAT_STORAGE_KEY, null)
    if (saved?.messages?.length) {
      dispatch({ type: 'RESTORE', payload: saved })
    } else if (saved?.pendingQuestion) {
      dispatch({ type: 'RESTORE', payload: saved })
    }
  }, [])

  useEffect(() => {
    if (state.messages.length > 0 || state.pendingQuestion) {
      saveToStorage(CHAT_STORAGE_KEY, {
        messages: state.messages,
        pendingQuestion: state.pendingQuestion,
      })
    }
  }, [state.messages, state.pendingQuestion])

  const sendMessage = useCallback(
    async (question) => {
      const trimmed = question?.trim()
      if (!trimmed || stateRef.current.isLoading) return

      dispatch({ type: 'SET_ERROR', payload: null })
      dispatch({ type: 'ADD_MESSAGE', payload: createMessage('user', trimmed) })
      dispatch({ type: 'SET_LOADING', payload: true })

      const assistantId = crypto.randomUUID()
      dispatch({
        type: 'ADD_MESSAGE',
        payload: {
          id: assistantId,
          role: 'assistant',
          content: '',
          timestamp: new Date().toISOString(),
          isStreaming: true,
        },
      })

      try {
        const response = await mutateAsync(trimmed)
        dispatch({
          type: 'UPDATE_MESSAGE',
          payload: {
            id: assistantId,
            updates: { content: response.answer, isStreaming: false },
          },
        })
        dispatch({ type: 'CLEAR_PENDING_QUESTION' })
      } catch (err) {
        const errorMessage = err.message || 'Something went wrong. Please try again.'
        dispatch({
          type: 'UPDATE_MESSAGE',
          payload: {
            id: assistantId,
            updates: {
              content: '',
              isStreaming: false,
              error: errorMessage,
              failedQuestion: trimmed,
            },
          },
        })
        dispatch({ type: 'SET_ERROR', payload: errorMessage })
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    },
    [mutateAsync],
  )

  const clearChat = useCallback(() => {
    dispatch({ type: 'CLEAR_CHAT' })
    removeFromStorage(CHAT_STORAGE_KEY)
  }, [])

  const setPendingQuestion = useCallback((question) => {
    dispatch({ type: 'SET_PENDING_QUESTION', payload: question })
  }, [])

  const clearPendingQuestion = useCallback(() => {
    dispatch({ type: 'CLEAR_PENDING_QUESTION' })
  }, [])

  const retryMessage = useCallback(
    async (failedQuestion, errorMessageId) => {
      if (!failedQuestion) return
      if (errorMessageId) {
        dispatch({ type: 'REMOVE_MESSAGE', payload: errorMessageId })
      }
      const lastUser = [...stateRef.current.messages]
        .reverse()
        .find((m) => m.role === 'user' && m.content === failedQuestion)
      if (lastUser) {
        dispatch({ type: 'REMOVE_MESSAGE', payload: lastUser.id })
      }
      await sendMessage(failedQuestion)
    },
    [sendMessage],
  )

  const value = useMemo(
    () => ({
      messages: state.messages,
      isLoading: state.isLoading,
      error: state.error,
      pendingQuestion: state.pendingQuestion,
      sendMessage,
      clearChat,
      setPendingQuestion,
      clearPendingQuestion,
      retryMessage,
    }),
    [
      state.messages,
      state.isLoading,
      state.error,
      state.pendingQuestion,
      sendMessage,
      clearChat,
      setPendingQuestion,
      clearPendingQuestion,
      retryMessage,
    ],
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useChat() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}
