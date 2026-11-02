import { hasPlaceholder } from '../lib/content'

interface NumeralBlockProps {
  value: string
  label: string
  highlight?: boolean
}

// Hidden entirely when the value is still a placeholder.
export function NumeralBlock({ value, label, highlight }: NumeralBlockProps) {
  if (hasPlaceholder(value)) return null

  return (
    <div className="numeral-block">
      <div className={highlight ? 'numeral numeral-blue' : 'numeral'}>
        {value}
      </div>
      <div className="text-small mt-2">{label}</div>
    </div>
  )
}
