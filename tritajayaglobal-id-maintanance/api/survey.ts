import type { VercelRequest, VercelResponse } from '@vercel/node'
import { readSurveyInput, validateSurvey } from '../src/lib/validate'

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  response.setHeader('Cache-Control', 'no-store')

  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed.' })
    return
  }

  let body: unknown = request.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      body = null
    }
  }

  const payload = readSurveyInput(body)

  // Honeypot check: silently accept bot submissions
  if (payload.website !== '') {
    response.status(200).json({ ok: true })
    return
  }

  const errors = validateSurvey(payload)
  if (Object.keys(errors).length > 0) {
    response.status(400).json({ errors })
    return
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
  const secret = process.env.GOOGLE_SHEETS_SECRET

  if (!webhookUrl) {
    console.error(
      'Google Sheets webhook is not configured. Missing GOOGLE_SHEETS_WEBHOOK_URL in environment variables.',
    )
    response.status(500).json({
      error:
        'Server configuration error: GOOGLE_SHEETS_WEBHOOK_URL is not set in Vercel environment variables.',
    })
    return
  }

  try {
    const sheetResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify({
        secret: secret ?? '',
        submittedAt: new Date().toISOString(),
        name: payload.name,
        company: payload.company,
        buildingType: payload.buildingType,
        concern: payload.concern,
        email: payload.email,
        phone: payload.phone,
        message: payload.message,
      }),
    })

    const responseText = await sheetResponse.text().catch(() => '')
    let result: { ok?: boolean; error?: string } | null = null
    try {
      result = JSON.parse(responseText)
    } catch {
      result = null
    }

    if (!sheetResponse.ok) {
      console.error(
        'Google Apps Script returned non-OK status:',
        sheetResponse.status,
        responseText,
      )
      response.status(500).json({
        error: `Google Sheets returned HTTP ${sheetResponse.status}.`,
        details: responseText.slice(0, 200),
      })
      return
    }

    if (result && result.ok === false) {
      console.error('Google Apps Script rejected payload:', result.error)
      response.status(500).json({
        error: `Google Apps Script error: ${result.error || 'Unknown rejection'}`,
      })
      return
    }

    response.status(200).json({ ok: true })
  } catch (error) {
    console.error('Survey submission to Google Sheets failed:', error)
    response.status(500).json({
      error: `Failed to connect to Google Sheets: ${error instanceof Error ? error.message : String(error)}`,
    })
  }
}
