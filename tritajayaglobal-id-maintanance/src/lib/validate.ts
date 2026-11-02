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

export function readSurveyInput(input: unknown): SurveyPayload {
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

export function validateSurvey(input: SurveyPayload): SurveyErrors {
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
