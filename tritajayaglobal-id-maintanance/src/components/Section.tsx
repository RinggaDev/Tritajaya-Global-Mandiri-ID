import type { ReactNode } from 'react'

interface SectionProps {
  id?: string
  labelledBy?: string
  background?: 'base' | 'alt' | 'blue'
  className?: string
  children: ReactNode
}

export function Section({
  id,
  labelledBy,
  background = 'base',
  className = '',
  children,
}: SectionProps) {
  const backgroundClass =
    background === 'alt'
      ? 'bg-alt'
      : background === 'blue'
        ? 'bg-blue-band'
        : ''

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-reveal
      className={`section ${backgroundClass} ${className}`.trim()}
    >
      <div className="container-page">{children}</div>
    </section>
  )
}
