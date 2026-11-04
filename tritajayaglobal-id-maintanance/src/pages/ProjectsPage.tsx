import { Button } from '../components/Button'
import { FinalCtaBand } from '../components/FinalCtaBand'
import { PageHeader } from '../components/PageHeader'
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
          <div className="project-cards mt-10">
            {projects.map((project, index) => (
              <article key={project.title} className="project-card">
                <div className="project-card-media">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={`${project.client ?? project.title} — ${project.buildingType ?? 'project'} in ${project.location ?? 'Indonesia'}`}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      width="1200"
                      height="612"
                    />
                  ) : null}
                  <div className="project-card-overlay">
                    {project.serviceType ? (
                      <span className="project-tag">
                        {project.serviceType}
                      </span>
                    ) : null}
                    {project.client ? (
                      <span className="text-small project-card-client">
                        {project.client}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="project-card-body">
                  <div className="project-card-head">
                    <h3 className="project-card-title">{project.title}</h3>
                    {project.location ? (
                      <span className="text-small">{project.location}</span>
                    ) : null}
                  </div>
                  <dl className="project-card-facts">
                    <div>
                      <dt>Problem</dt>
                      <dd>{project.problem}</dd>
                    </div>
                    <div>
                      <dt>Fix</dt>
                      <dd>{project.fix}</dd>
                    </div>
                    <div>
                      <dt>Result</dt>
                      <dd>{project.result}</dd>
                    </div>
                  </dl>
                  <aside className="project-card-callout">
                    <p className="numeral numeral-blue">{project.metric}</p>
                    <p className="text-small">
                      {project.metricLabel}
                    </p>
                  </aside>
                  {project.tags?.length ? (
                    <ul className="project-tags" aria-label="Project tags">
                      {project.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </Section>

      <FinalCtaBand cta={home.finalCta} />
    </>
  )
}
