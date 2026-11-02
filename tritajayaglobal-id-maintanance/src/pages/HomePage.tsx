import { FinalCtaBand } from '../components/FinalCtaBand'
import { Button } from '../components/Button'
import { LifecycleFlow } from '../components/LifecycleFlow'
import { NumeralBlock } from '../components/NumeralBlock'
import { RuledList } from '../components/RuledList'
import { Section } from '../components/Section'
import { TextLink } from '../components/TextLink'
import {
  home,
  realNumerals,
  services,
  showCaseStory,
} from '../lib/content'
import { LocalBusinessJsonLd } from '../components/JsonLd'
import { useMeta } from '../lib/seo'

export function HomePage() {
  useMeta({
    title: 'VRF and HVAC maintenance for offices, apartments, and factories',
    description:
      'Planned VRF and HVAC maintenance, emergency repair, installation, and retrofit for offices, apartments, and factories. Request a site survey.',
    path: '/',
  })

  const { hero, problem, services: servicesSummary, proof, caseStory, audience } =
    home

  return (
    <>
      <section aria-labelledby="hero-heading" data-reveal>
        <div className="container-page grid gap-10 py-16 lg:grid-cols-12 lg:items-center lg:gap-6 lg:py-24">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-4">{hero.eyebrow}</p>
            <h1
              id="hero-heading"
              className="text-display font-bold tracking-[var(--tracking-display)]"
            >
              {hero.headline}
            </h1>
            <p className="text-lead measure mt-6">{hero.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/contact">{hero.primaryCta}</Button>
              <Button variant="secondary" to="/services">
                {hero.secondaryCta}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <figure className="hero-media">
              <img
                src="/hero_banner.webp"
                alt={hero.mediaAlt}
                width={1355}
                height={509}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="h-auto w-full rounded-media object-cover"
              />
            </figure>
          </div>
        </div>
      </section>

      <Section labelledBy="problem-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <h2 id="problem-heading" className="measure">
              {problem.heading}
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <RuledList
              items={problem.items.map((item) => ({
                title: item.title,
                description: item.description,
              }))}
            />
            <p className="text-lead mt-8">{problem.closing}</p>
          </div>
        </div>
      </Section>

      <Section background="alt" labelledBy="services-heading">
        <h2 id="services-heading">{servicesSummary.heading}</h2>
        <p className="text-lead measure mt-4">{servicesSummary.summary}</p>

        <div className="mt-12">
          <LifecycleFlow />
        </div>

        <RuledList
          className="mt-12 grid gap-x-6 lg:grid-cols-2"
          items={services.services.map((service) => ({
            title: service.title,
            description: service.outcome,
          }))}
        />

        <div className="mt-8">
          <TextLink to="/services">See all services</TextLink>
        </div>
      </Section>

      {realNumerals.length >= 2 ? (
        <Section labelledBy="proof-heading">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-5">
              <h2 id="proof-heading">{proof.heading}</h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7">
              {realNumerals.map((numeral, index) => (
                <NumeralBlock
                  key={numeral.label}
                  value={numeral.value}
                  label={numeral.label}
                  highlight={index === 0}
                />
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      {showCaseStory ? (
        <Section background="alt" labelledBy="case-heading">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-5">
              <h2 id="case-heading">{caseStory.title}</h2>
              {caseStory.client ? (
                <p className="text-small mt-4">{caseStory.client}</p>
              ) : null}
            </div>
            <div className="lg:col-span-7">
              <div className="numeral numeral-blue">{caseStory.metric}</div>
              <p className="text-small mt-2">{caseStory.metricLabel}</p>
              <dl className="mt-8 border-t border-line">
                <div className="grid gap-2 border-b border-line py-4 lg:grid-cols-12">
                  <dt className="text-small font-semibold lg:col-span-3">
                    Problem
                  </dt>
                  <dd className="lg:col-span-9">{caseStory.problem}</dd>
                </div>
                <div className="grid gap-2 border-b border-line py-4 lg:grid-cols-12">
                  <dt className="text-small font-semibold lg:col-span-3">
                    Fix
                  </dt>
                  <dd className="lg:col-span-9">{caseStory.fix}</dd>
                </div>
                <div className="grid gap-2 border-b border-line py-4 lg:grid-cols-12">
                  <dt className="text-small font-semibold lg:col-span-3">
                    Result
                  </dt>
                  <dd className="lg:col-span-9">{caseStory.result}</dd>
                </div>
              </dl>
            </div>
          </div>
        </Section>
      ) : null}

      <Section labelledBy="audience-heading">
        <h2 id="audience-heading" className="measure">
          {audience.heading}
        </h2>
        <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2">
          {audience.items.map((item) => (
            <li key={item.title} className="border-t border-line pt-4">
              <h3>{item.title}</h3>
              <p className="text-lead mt-3">{item.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <FinalCtaBand cta={home.finalCta} />
      <LocalBusinessJsonLd />
    </>
  )
}
