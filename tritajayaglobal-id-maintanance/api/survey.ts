import type { VercelRequest, VercelResponse } from '@vercel/node'

export const buildingTypes = [
  'Office',
  'Apartment',
  'Factory',
  'Commercial',
  'Other',
] as const

export const concerns = [
  'Preventive maintenance',
  'Emergency repair',
  'Installation',
  'Retrofit',
  'Not sure',
] as const

export interface SurveyPayload {
  name: string
  company: string
  buildingType: string
  concern: string
  email: string
  phone: string
  message: string
  website: string
}

export type SurveyErrors = Partial<Record<keyof SurveyPayload, string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[\d\s+-]+$/

function readSurveyInput(input: unknown): SurveyPayload {
  const source =
    input && typeof input === 'object'
      ? (input as Record<string, unknown>)
      : {}

  const read = (key: keyof SurveyPayload) =>
    typeof source[key] === 'string' ? (source[key] as string).trim() : ''

  return {
    name: read('name'),
    company: read('company'),
    buildingType: read('buildingType'),
    concern: read('concern'),
    email: read('email'),
    phone: read('phone'),
    message: read('message'),
    website: read('website'),
  }
}

function validateSurvey(input: SurveyPayload): SurveyErrors {
  const errors: SurveyErrors = {}

  if (input.name.length < 2 || input.name.length > 100) {
    errors.name = 'Enter your name (2–100 characters).'
  }

  if (input.company.length < 2 || input.company.length > 150) {
    errors.company = 'Enter your company name (2–150 characters).'
  }

  if (!buildingTypes.includes(input.buildingType as (typeof buildingTypes)[number])) {
    errors.buildingType = 'Select a building type.'
  }

  if (!concerns.includes(input.concern as (typeof concerns)[number])) {
    errors.concern = 'Select your main concern.'
  }

  if (!input.email && !input.phone) {
    errors.email = 'Enter an email or a phone number.'
    errors.phone = 'Enter an email or a phone number.'
  }

  if (input.email && !emailPattern.test(input.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (input.phone) {
    const digits = input.phone.replace(/\D/g, '')
    if (!phonePattern.test(input.phone) || digits.length < 7 || digits.length > 20) {
      errors.phone = 'Enter a valid phone number (7–20 digits).'
    }
  }

  if (input.message.length > 500) {
    errors.message = 'Keep the message under 500 characters.'
  }

  return errors
}

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
