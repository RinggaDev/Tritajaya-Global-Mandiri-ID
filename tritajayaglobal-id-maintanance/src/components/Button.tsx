import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type ButtonVariant = 'primary' | 'secondary' | 'text' | 'inverse'

interface ButtonProps {
  variant?: ButtonVariant
  to?: string
  href?: string
  children: ReactNode
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit'
  className?: string
  onClick?: () => void
}

// Error state is not applicable to a button; errors belong to the form or page.
export function Button({
  variant = 'primary',
  to,
  href,
  children,
  loading = false,
  disabled = false,
  type = 'button',
  className = '',
  onClick,
}: ButtonProps) {
  const classes = `btn btn-${variant} ${className}`.trim()
  const content = loading ? (
    <>
      <span className="spinner" aria-hidden="true" />
      Sending…
    </>
  ) : (
    children
  )

  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        aria-disabled={disabled || loading || undefined}
        tabIndex={disabled || loading ? -1 : undefined}
        onClick={onClick}
      >
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-disabled={disabled || loading || undefined}
        tabIndex={disabled || loading ? -1 : undefined}
        onClick={onClick}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      onClick={onClick}
    >
      {content}
    </button>
  )
}
