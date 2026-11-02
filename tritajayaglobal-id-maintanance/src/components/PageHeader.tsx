interface PageHeaderProps {
  eyebrow?: string
  title: string
  lead?: string
}

export function PageHeader({ eyebrow, title, lead }: PageHeaderProps) {
  return (
    <div
      className="container-page pb-12 pt-16 lg:pb-16 lg:pt-24"
      data-reveal
    >
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <h1 className="measure">{title}</h1>
      {lead ? <p className="text-lead measure mt-6">{lead}</p> : null}
    </div>
  )
}
