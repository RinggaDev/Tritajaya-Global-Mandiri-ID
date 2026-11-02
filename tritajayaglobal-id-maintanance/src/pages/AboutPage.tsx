import { FinalCtaBand } from '../components/FinalCtaBand'
import { PageHeader } from '../components/PageHeader'
import { Section } from '../components/Section'
import { about, isReal } from '../lib/content'
import { useMeta } from '../lib/seo'

export function AboutPage() {
  useMeta({
    title: 'About our VRF and HVAC team',
    description:
      'A VRF and HVAC maintenance team serving building managers, offices, apartments, and factories across the full system lifecycle.',
    path: '/about',
  })

  const hasCertificate = isReal(about.certificate.issuer)

  return (
    <>
      <PageHeader
        eyebrow="About"
        title={about.heading}
        lead={about.lead}
      />

      <Section labelledBy="story-heading">
        <h2 id="story-heading" className="measure">
          How we work
        </h2>
        <div className="measure mt-8 grid gap-5">
          {about.story.map((paragraph) => (
            <p key={paragraph} className="text-lead">
              {paragraph}
            </p>
          ))}
        </div>

        {hasCertificate ? (
          <div className="numeral-block mt-12 max-w-[360px]">
            <p className="text-small">{about.certificate.label}</p>
            <p className="text-h3 mt-2 font-semibold">
              {about.certificate.issuer}
            </p>
          </div>
        ) : null}
      </Section>

      <FinalCtaBand cta={about.finalCta} />
    </>
  )
}
