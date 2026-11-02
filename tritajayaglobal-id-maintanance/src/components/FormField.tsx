import type { ChangeEvent } from 'react'

interface FormFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  type?: 'text' | 'email' | 'tel'
  as?: 'input' | 'textarea' | 'select'
  options?: { value: string; label: string }[]
  required?: boolean
  disabled?: boolean
  error?: string
  hint?: string
  placeholder?: string
  autoComplete?: string
}

// Loading state is not applicable to an individual field; the form owns it.
export function FormField({
  id,
  label,
  value,
  onChange,
  onBlur,
  type = 'text',
  as = 'input',
  options = [],
  required = false,
  disabled = false,
  error,
  hint,
  placeholder,
  autoComplete,
}: FormFieldProps) {
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const describedBy =
    [hint ? hintId : '', error ? errorId : ''].filter(Boolean).join(' ') ||
    undefined

  const shared = {
    id,
    name: id,
    value,
    required,
    disabled,
    placeholder,
    autoComplete,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
    className: 'field-control',
    onBlur,
    onChange: (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => onChange(event.target.value),
  }

  return (
    <div>
      <label className="field-label" htmlFor={id}>
        {label}
        {required ? <span className="field-required"> (required)</span> : null}
      </label>

      {as === 'textarea' ? (
        <textarea {...shared} />
      ) : as === 'select' ? (
        <select {...shared}>
          <option value="" disabled>
            Select one
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input {...shared} type={type} />
      )}

      {hint ? (
        <p className="field-hint" id={hintId}>
          {hint}
        </p>
      ) : null}

      {error ? (
        <p className="field-error" id={errorId}>
          <span aria-hidden="true">!</span>
          {error}
        </p>
      ) : null}
    </div>
  )
}
