import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Banner } from './Banner'
import { Button } from './Button'
import { FormField } from './FormField'
import { realEmail, realPhone } from '../lib/content'
import { buildingTypes, concerns, validateSurvey } from '../lib/validate'
import type { SurveyErrors, SurveyPayload } from '../lib/validate'

const initialValues: SurveyPayload = {
  name: '',
  company: '',
  buildingType: '',
  concern: '',
  email: '',
  phone: '',
  message: '',
  website: '',
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export function SurveyForm() {
  const [values, setValues] = useState<SurveyPayload>(initialValues)
  const [errors, setErrors] = useState<SurveyErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverError, setServerError] = useState('')
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      bannerRef.current?.focus()
    }
  }, [status])

  function update<K extends keyof SurveyPayload>(
    key: K,
    value: SurveyPayload[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  function focusFirstError(nextErrors: SurveyErrors) {
    const firstKey = Object.keys(nextErrors)[0]
    if (firstKey) document.getElementById(firstKey)?.focus()
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setServerError('')

    const nextErrors = validateSurvey(values)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      focusFirstError(nextErrors)
      return
    }

    setStatus('loading')

    try {
      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        setStatus('success')
        setValues(initialValues)
        setErrors({})
        return
      }

      if (response.status === 400) {
        const data = (await response.json().catch(() => null)) as {
          errors?: SurveyErrors
        } | null
        if (data?.errors) {
          setErrors(data.errors)
          setStatus('idle')
          focusFirstError(data.errors)
          return
        }
      }

      setStatus('error')
      setServerError(
        realPhone
          ? `Please try again or call us at ${realPhone}.`
          : realEmail
            ? `Please try again or email us at ${realEmail}.`
            : 'Please try again.',
      )
    } catch {
      setStatus('error')
      setServerError(
        realPhone
          ? `Please try again or call us at ${realPhone}.`
          : realEmail
            ? `Please try again or email us at ${realEmail}.`
            : 'Please try again.',
      )
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-busy={status === 'loading'} noValidate>
      {status === 'success' ? (
        <div className="mb-6">
          <Banner variant="success" bannerRef={bannerRef}>
            We received your request and will contact you to schedule the site
            survey.
          </Banner>
        </div>
      ) : null}

      {status === 'error' ? (
        <div className="mb-6">
          <Banner variant="error" bannerRef={bannerRef}>
            We couldn&apos;t send your request. {serverError}
          </Banner>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="name"
          label="Name"
          value={values.name}
          onChange={(value) => update('name', value)}
          required
          autoComplete="name"
          error={errors.name}
        />
        <FormField
          id="company"
          label="Company"
          value={values.company}
          onChange={(value) => update('company', value)}
          required
          autoComplete="organization"
          error={errors.company}
        />
        <FormField
          id="buildingType"
          label="Building type"
          as="select"
          value={values.buildingType}
          onChange={(value) => update('buildingType', value)}
          options={buildingTypes.map((value) => ({ value, label: value }))}
          required
          error={errors.buildingType}
        />
        <FormField
          id="concern"
          label="Main concern"
          as="select"
          value={values.concern}
          onChange={(value) => update('concern', value)}
          options={concerns.map((value) => ({ value, label: value }))}
          required
          error={errors.concern}
        />
        <FormField
          id="email"
          label="Email"
          type="email"
          value={values.email}
          onChange={(value) => update('email', value)}
          autoComplete="email"
          hint="One of email or phone is required."
          error={errors.email}
        />
        <FormField
          id="phone"
          label="Phone"
          type="tel"
          value={values.phone}
          onChange={(value) => update('phone', value)}
          autoComplete="tel"
          hint="7–20 digits. Spaces, +, and - are allowed."
          error={errors.phone}
        />
        <div className="sm:col-span-2">
          <FormField
            id="message"
            label="Message"
            as="textarea"
            value={values.message}
            onChange={(value) => update('message', value)}
            hint="Optional. Up to 500 characters."
            error={errors.message}
          />
        </div>
      </div>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => update('website', event.target.value)}
        />
      </div>

      <div className="mt-8">
        <Button type="submit" loading={status === 'loading'}>
          Request a site survey
        </Button>
      </div>
    </form>
  )
}
