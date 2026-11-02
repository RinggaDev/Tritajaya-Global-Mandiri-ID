import { useId } from 'react'
import type { FinalCta } from '../content/types'
import { Button } from './Button'
import { Section } from './Section'

interface FinalCtaBandProps {
  cta: FinalCta
}

export function FinalCtaBand({ cta }: FinalCtaBandProps) {
  const headingId = useId()

  return (
    <Section background="blue" labelledBy={headingId}>
      <div className="grid items-center gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h2 id={headingId}>{cta.heading}</h2>
          <p className="text-lead mt-4 text-[var(--color-action-text)]">
            {cta.text}
          </p>
        </div>
        <div className="lg:col-span-4 lg:text-right">
          <Button variant="inverse" to="/contact">
            {cta.button}
          </Button>
        </div>
      </div>
    </Section>
  )
}
