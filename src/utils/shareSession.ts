import type { Question, Feedback } from '../types'

export interface SharePayload {
  type: string
  difficulty: string
  date: string
  overallScore: number
  questions: Pick<Question, 'id' | 'question' | 'category'>[]
  feedback: Feedback[]
}

export function encodeShare(payload: SharePayload): string {
  return btoa(encodeURIComponent(JSON.stringify(payload)))
}

export function decodeShare(encoded: string): SharePayload | null {
  try {
    return JSON.parse(decodeURIComponent(atob(encoded)))
  } catch {
    return null
  }
}

export function buildShareUrl(payload: SharePayload): string {
  return `${window.location.origin}/feedback?share=${encodeShare(payload)}`
}
