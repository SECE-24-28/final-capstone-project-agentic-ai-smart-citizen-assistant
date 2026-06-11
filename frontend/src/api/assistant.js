import apiClient from './client'

/**
 * Send a question to the Smart Citizen Assistant RAG backend.
 * @param {string} question
 * @returns {Promise<{ question: string, answer: string }>}
 */
export async function askQuestion(question) {
  const { data } = await apiClient.post('/ask', { question })
  return data
}
