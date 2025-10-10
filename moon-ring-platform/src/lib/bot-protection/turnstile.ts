/**
 * Cloudflare Turnstile verification helper
 */

export type TurnstileVerifyResult = {
  success: boolean
  action?: string
  cdata?: string
  errorCodes?: string[]
}

export async function verifyTurnstileToken(token: string, remoteIp?: string): Promise<TurnstileVerifyResult> {
  // Feature flags / env checks
  const enabled = (process.env.BOT_PROTECTION_ENABLED ?? 'true') !== 'false'
  const secret = process.env.TURNSTILE_SECRET_KEY

  if (!enabled) {
    return { success: true }
  }

  if (!secret) {
    // Fail safe in dev/preview if not configured
    if (process.env.NODE_ENV !== 'production') {
      return { success: true }
    }
    return { success: false, errorCodes: ['missing-secret'] }
  }

  try {
    const form = new URLSearchParams()
    form.append('secret', secret)
    form.append('response', token)
    if (remoteIp) form.append('remoteip', remoteIp)

    const resp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: form,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })

    const data = (await resp.json()) as TurnstileVerifyResult
    if (!data.success) {
      return { success: false, errorCodes: data.errorCodes }
    }
    return data
  } catch {
    // Be lenient in non-prod to avoid local DX blockers
    if (process.env.NODE_ENV !== 'production') {
      return { success: true }
    }
    return { success: false, errorCodes: ['verification-failed'] }
  }
}
