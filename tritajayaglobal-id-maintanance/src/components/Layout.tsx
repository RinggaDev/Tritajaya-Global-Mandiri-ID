import { Analytics } from '@vercel/analytics/react'
import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Nav } from './Nav'

export function Layout() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const previousPath = useRef(pathname)

  useEffect(() => {
    window.scrollTo(0, 0)

    if (previousPath.current !== pathname) {
      previousPath.current = pathname
      mainRef.current?.focus({ preventScroll: true })
    }

    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]'),
    )
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (reduced) {
      nodes.forEach((node) => node.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [pathname])

  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <Nav />
      <main id="content" ref={mainRef} tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <Analytics />
    </>
  )
}
