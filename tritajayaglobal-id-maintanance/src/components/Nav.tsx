import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { siteName } from '../lib/content'
import { Button } from './Button'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return

    const panel = panelRef.current
    const firstLink = panel?.querySelector<HTMLElement>('a[href]')
    firstLink?.focus()

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        triggerRef.current?.focus()
        return
      }

      if (event.key !== 'Tab' || !panel) return
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return (
    <header className="site-header" data-scrolled={scrolled || undefined}>
      <div className="container-page flex min-h-[72px] items-center justify-between gap-6">
        <Link to="/" className="inline-flex items-center" aria-label={siteName}>
          <img
            src="/TGM_primary_logo_transparent.svg"
            alt=""
            width={46}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className="nav-link"
            >
              {link.label}
            </NavLink>
          ))}
          <Button to="/contact">Request a site survey</Button>
        </nav>

        <button
          ref={triggerRef}
          type="button"
          className="btn btn-secondary lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          Menu
        </button>
      </div>

      {open ? (
        <div ref={panelRef} id="mobile-menu" className="mobile-panel lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col gap-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className="nav-link"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-6">
            <Button to="/contact" onClick={() => setOpen(false)}>
              Request a site survey
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  )
}
