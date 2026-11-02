import { FinalCtaBand } from '../components/FinalCtaBand'
import { LifecycleFlow } from '../components/LifecycleFlow'
import { PageHeader } from '../components/PageHeader'
import { RuledList } from '../components/RuledList'
import { Section } from '../components/Section'
import { home, services } from '../lib/content'
import { useMeta } from '../lib/seo'

export function ServicesPage() {
  useMeta({
    title: 'VRF and HVAC maintenance services',
    description:
      'Preventive maintenance, emergency repair, installation, and retrofit for VRF and HVAC systems in offices, apartments, and factories.',
    path: '/services',
  })

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={services.heading}
        lead={services.lead}
      />

      <Section labelledBy="lifecycle-heading">
        <h2 id="lifecycle-heading" className="measure">
          Every stage, documented.
        </h2>
        <div className="mt-10">
          <LifecycleFlow />
        </div>
      </Section>

      <Section background="alt" labelledBy="service-list-heading">
        <h2 id="service-list-heading" className="measure">
          What we do
        </h2>
        <RuledList
          className="mt-10"
          items={services.services.map((service) => ({
            title: service.title,
            description: (
              <div className="grid gap-3">
                <p>
                  <strong>Problem.</strong> {service.problem}
                </p>
                <p>
                  <strong>Solution.</strong> {service.solution}
                </p>
                <p>
                  <strong>Outcome.</strong> {service.outcome}
                </p>
              </div>
            ),
          }))}
        />
      </Section>

      <FinalCtaBand cta={home.finalCta} />
    </>
  )
}
