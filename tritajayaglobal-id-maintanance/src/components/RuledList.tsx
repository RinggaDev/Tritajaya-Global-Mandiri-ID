import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export interface RuledListItem {
  title: string
  description: ReactNode
  to?: string
}

interface RuledListProps {
  items: RuledListItem[]
  empty?: ReactNode
  className?: string
}

// Empty state replaces the list. Hover and focus belong to the optional row link.
export function RuledList({ items, empty, className = '' }: RuledListProps) {
  if (items.length === 0) {
    return (
      <div className={`ruled-list py-6 ${className}`.trim()}>{empty}</div>
    )
  }

  return (
    <ul className={`ruled-list ${className}`.trim()}>
      {items.map((item) => (
        <li key={item.title}>
          {item.to ? (
            <Link to={item.to} className="ruled-item ruled-link">
              <span className="ruled-title">{item.title}</span>
              <span className="ruled-desc">{item.description}</span>
              <span className="ruled-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          ) : (
            <div className="ruled-item">
              <h3 className="ruled-title">{item.title}</h3>
              <div className="ruled-desc">{item.description}</div>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}
