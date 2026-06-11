import { useMutation } from '@tanstack/react-query'
import { askQuestion } from '../api/assistant'

export function useAskAssistant() {
  return useMutation({
    mutationFn: askQuestion,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 5000),
  })
}
