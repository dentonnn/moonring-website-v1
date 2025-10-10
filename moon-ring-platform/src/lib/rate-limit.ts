/**
 * In-memory rate limiter (dev scaffolding)
 *
 * Production: replace with Upstash Redis + @upstash/ratelimit.
 */

type Counter = { count: number; resetAt: number }
const buckets = new Map<string, Counter>()

export type RateLimitResult = {
  success: boolean
  remaining: number
  reset: number // epoch ms
}

export async function rateLimit(params: {
  key: string
  limit: number
  windowMs: number
}): Promise<RateLimitResult> {
  const { key, limit, windowMs } = params
  const now = Date.now()
  const current = buckets.get(key)

  if (!current || now >= current.resetAt) {
    const resetAt = now + windowMs
    buckets.set(key, { count: 1, resetAt })
    return { success: true, remaining: limit - 1, reset: resetAt }
  }

  if (current.count < limit) {
    current.count += 1
    return { success: true, remaining: limit - current.count, reset: current.resetAt }
  }

  return { success: false, remaining: 0, reset: current.resetAt }
}

// Named helpers
export function contactLimiter(ip: string) {
  return rateLimit({ key: `contact:${ip}`, limit: 5, windowMs: 60 * 60 * 1000 })
}

export function newsletterSubscribeLimiter(ip: string) {
  return rateLimit({ key: `nl:sub:${ip}`, limit: 3, windowMs: 60 * 60 * 1000 })
}

export function newsletterUnsubscribeLimiter(ip: string) {
  return rateLimit({ key: `nl:unsub:${ip}`, limit: 10, windowMs: 60 * 60 * 1000 })
}

