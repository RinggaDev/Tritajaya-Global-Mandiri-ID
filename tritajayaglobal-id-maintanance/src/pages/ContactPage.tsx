import { PageHeader } from '../components/PageHeader'
import { SurveyForm } from '../components/SurveyForm'
import {
  realEmail,
  realHqLines,
  realPhone,
} from '../lib/content'
import { LocalBusinessJsonLd } from '../components/JsonLd'
import { useMeta } from '../lib/seo'

export function ContactPage() {
  useMeta({
    title: 'Request a site survey',
    description:
      'Request a VRF or HVAC site survey. Tell us about your building and main concern, and we will contact you to schedule.',
    path: '/contact',
  })

  const hasContact = realPhone || realEmail || realHqLines.length > 0

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Request a site survey."
        lead="Tell us about the building and what is going wrong. We will contact you to schedule a visit."
      />

      <div className="container-page pb-16 lg:pb-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <h2 id="survey-heading" className="mb-8">
              Site survey request
            </h2>
            <SurveyForm />
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <h2 className="mb-6">Contact</h2>
            {hasContact ? (
              <div className="border-t border-line">
                {realPhone ? (
                  <div className="border-b border-line py-4">
                    <p className="text-small">Phone</p>
                    <a
                      href={`tel:${realPhone.replace(/[^\d+]/g, '')}`}
                      className="text-link mt-1 inline-block"
                    >
                      {realPhone}
                    </a>
                  </div>
                ) : null}
                {realEmail ? (
                  <div className="border-b border-line py-4">
                    <p className="text-small">Email</p>
                    <a
                      href={`mailto:${realEmail}`}
                      className="text-link mt-1 inline-block break-all"
                    >
                      {realEmail}
                    </a>
                  </div>
                ) : null}
                {realHqLines.length > 0 ? (
                  <div className="border-b border-line py-4">
                    <p className="text-small">Head office</p>
                    <address className="mt-1 not-italic">
                      {realHqLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </div>
                ) : null}
              </div>
            ) : (
              <p className="text-lead measure">
                Send the form and we will reply with the right contact details.
              </p>
            )}
          </div>
        </div>
      </div>

      <LocalBusinessJsonLd />
    </>
  )
}
