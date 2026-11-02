import { company, isReal, siteName } from '../lib/content'

export function LocalBusinessJsonLd() {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteName,
    description:
      'VRF and HVAC maintenance for offices, apartments, and factories.',
    url: window.location.origin,
  }

  if (isReal(company.phone)) data.telephone = company.phone
  if (isReal(company.email)) data.email = company.email

  const address: Record<string, string> = {}
  if (isReal(company.hq.line1)) address.streetAddress = company.hq.line1
  if (isReal(company.hq.city)) address.addressLocality = company.hq.city
  if (isReal(company.hq.region)) address.addressRegion = company.hq.region
  if (isReal(company.hq.country)) address.addressCountry = company.hq.country
  if (Object.keys(address).length > 0) {
    data.address = { '@type': 'PostalAddress', ...address }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
