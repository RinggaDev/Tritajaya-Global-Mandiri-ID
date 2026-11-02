import aboutJson from '../content/about.json'
import companyJson from '../content/company.json'
import homeJson from '../content/home.json'
import projectsJson from '../content/projects.json'
import servicesJson from '../content/services.json'
import type {
  AboutContent,
  Company,
  HomeContent,
  Project,
  ServicesContent,
} from '../content/types'

const placeholderPattern = /\[[^\]]+\]/

export function hasPlaceholder(value: unknown): boolean {
  if (typeof value === 'string') return placeholderPattern.test(value)
  if (Array.isArray(value)) return value.some(hasPlaceholder)
  if (value && typeof value === 'object') {
    return Object.values(value).some(hasPlaceholder)
  }
  return false
}

export function isReal(value: unknown): boolean {
  return !hasPlaceholder(value)
}

export const company = companyJson as Company
export const home = homeJson as HomeContent
export const services = servicesJson as ServicesContent
export const projects = (projectsJson as Project[]).filter(isReal)
export const about = aboutJson as AboutContent

export const siteName = isReal(company.brand)
  ? company.brand
  : 'VRF & HVAC Maintenance'

export const realPhone = isReal(company.phone) ? company.phone : ''
export const realEmail = isReal(company.email) ? company.email : ''

export const realHqLines = [
  company.hq.line1,
  company.hq.city,
  company.hq.region,
  company.hq.country,
].filter(isReal)

export const realNumerals = home.proof.numerals.filter(isReal)
export const showCaseStory = isReal(home.caseStory)
