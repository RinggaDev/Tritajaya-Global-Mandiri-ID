import { Link } from 'react-router-dom'
import {
  realEmail,
  realHqLines,
  realPhone,
  siteName,
} from '../lib/content'

const pageLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export function Footer() {
  const year = new Date().getFullYear()
  const hasContact = realPhone || realEmail || realHqLines.length > 0

  return (
    <footer className="border-t border-line bg-alt">
      <div className="container-page grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link
            to="/"
            className="font-heading text-h3 font-semibold text-[var(--color-text)] no-underline"
          >
            {siteName}
          </Link>
          <p className="text-small mt-4 max-w-[28ch]">
            VRF and HVAC maintenance for offices, apartments, and factories.
          </p>
        </div>

        <nav aria-label="Footer pages">
          <h2 className="text-small mb-4 font-semibold text-[var(--color-text)]">
            Pages
          </h2>
          <ul className="flex flex-col gap-2">
            {pageLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="footer-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-small mb-4 font-semibold text-[var(--color-text)]">
            Services
          </h2>
          <ul className="flex flex-col gap-2">
            <li>
              <Link to="/services" className="footer-link">
                Preventive maintenance
              </Link>
            </li>
            <li>
              <Link to="/services" className="footer-link">
                Emergency repair
              </Link>
            </li>
            <li>
              <Link to="/services" className="footer-link">
                Installation
              </Link>
            </li>
            <li>
              <Link to="/services" className="footer-link">
                Retrofit
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-small mb-4 font-semibold text-[var(--color-text)]">
            Contact
          </h2>
          {hasContact ? (
            <address className="flex flex-col gap-2 not-italic">
              {realPhone ? (
                <a href={`tel:${realPhone.replace(/[^\d+]/g, '')}`} className="footer-link">
                  Call us: {realPhone}
                </a>
              ) : null}
              {realEmail ? (
                <a href={`mailto:${realEmail}`} className="footer-link">
                  Email us: {realEmail}
                </a>
              ) : null}
              {realHqLines.length > 0 ? (
                <span className="text-small">
                  {realHqLines.join(', ')}
                </span>
              ) : null}
            </address>
          ) : (
            <Link to="/contact" className="footer-link">
              Request a site survey
            </Link>
          )}
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page py-6">
          <p className="text-small">
            © {year} {siteName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
