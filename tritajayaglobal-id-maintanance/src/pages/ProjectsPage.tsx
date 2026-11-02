import { Button } from '../components/Button'
import { FinalCtaBand } from '../components/FinalCtaBand'
import { PageHeader } from '../components/PageHeader'
import { RuledList } from '../components/RuledList'
import { Section } from '../components/Section'
import { home, projects } from '../lib/content'
import { useMeta } from '../lib/seo'

export function ProjectsPage() {
  useMeta({
    title: 'VRF and HVAC case stories',
    description:
      'Case stories from VRF and HVAC maintenance work: the problem, the fix, and the measured result.',
    path: '/projects',
  })

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Work we can stand behind."
        lead="Each case story shows the problem, what we changed, and the result."
      />

      <Section labelledBy="projects-heading">
        <h2 id="projects-heading" className="measure">
          Case stories
        </h2>

        {projects.length === 0 ? (
          <div className="ruled-list mt-10 py-8">
            <p className="text-lead measure">
              Our case stories are being prepared. Request a site survey to
              discuss your building.
            </p>
            <div className="mt-6">
              <Button to="/contact">Request a site survey</Button>
            </div>
          </div>
        ) : (
          <RuledList
            className="mt-10"
            items={projects.map((project) => ({
              title: project.title,
              description: (
                <div className="grid gap-3">
                  {project.client ? (
                    <p className="text-small">{project.client}</p>
                  ) : null}
                  <p>
                    <strong>Problem.</strong> {project.problem}
                  </p>
                  <p>
                    <strong>Fix.</strong> {project.fix}
                  </p>
                  <p>
                    <strong>Result.</strong> {project.result}
                  </p>
                  <p className="numeral numeral-blue mt-2">
                    {project.metric}
                    <span className="text-small ml-2">{project.metricLabel}</span>
                  </p>
                </div>
              ),
            }))}
          />
        )}
      </Section>

      <FinalCtaBand cta={home.finalCta} />
    </>
  )
}
