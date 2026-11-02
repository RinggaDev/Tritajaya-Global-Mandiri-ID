import { Button } from '../components/Button'
import { PageHeader } from '../components/PageHeader'
import { TextLink } from '../components/TextLink'
import { useMeta } from '../lib/seo'

export function NotFoundPage() {
  useMeta({
    title: 'Page not found',
    description:
      'This page does not exist. Return to the home page or request a site survey.',
  })

  return (
    <>
      <PageHeader
        title="This page doesn't exist"
        lead="The link may be old, or the address may have a typo."
      />
      <div className="container-page flex flex-wrap items-center gap-6 pb-16 lg:pb-24">
        <Button to="/contact">Request a site survey</Button>
        <TextLink to="/">Back to home</TextLink>
      </div>
    </>
  )
}
