export interface Company {
  brand: string
  phone: string
  email: string
  hq: {
    line1: string
    city: string
    region: string
    country: string
  }
  years: string
  projectCount: string
  certificateIssuer: string
}

export interface Hero {
  eyebrow: string
  headline: string
  lead: string
  primaryCta: string
  secondaryCta: string
  mediaAlt: string
}

export interface RuledItem {
  title: string
  description: string
}

export interface Problem {
  heading: string
  items: RuledItem[]
  closing: string
}

export interface ServicesSummary {
  heading: string
  summary: string
}

export interface Numeral {
  value: string
  label: string
}

export interface Proof {
  heading: string
  numerals: Numeral[]
}

export interface CaseStory {
  title: string
  client?: string
  problem: string
  fix: string
  result: string
  metric: string
  metricLabel: string
}

export interface Audience {
  heading: string
  items: RuledItem[]
}

export interface FinalCta {
  heading: string
  text: string
  button: string
}

export interface HomeContent {
  hero: Hero
  problem: Problem
  services: ServicesSummary
  proof: Proof
  caseStory: CaseStory
  audience: Audience
  finalCta: FinalCta
}

export interface Service {
  title: string
  problem: string
  solution: string
  outcome: string
}

export interface ServicesContent {
  heading: string
  lead: string
  services: Service[]
}

export interface Project {
  title: string
  client?: string
  problem: string
  fix: string
  result: string
  metric: string
  metricLabel: string
}

export interface AboutContent {
  heading: string
  lead: string
  story: string[]
  certificate: {
    issuer: string
    label: string
  }
  finalCta: FinalCta
}
