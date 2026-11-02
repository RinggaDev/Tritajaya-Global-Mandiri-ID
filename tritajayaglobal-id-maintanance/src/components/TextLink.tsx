import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface TextLinkProps {
  to?: string
  href?: string
  children: ReactNode
  className?: string
}

// Disabled, loading, and error states are not applicable to a text link.
export function TextLink({ to, href, children, className = '' }: TextLinkProps) {
  const classes = `text-link ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} className={classes}>
      {children}
    </a>
  )
}
