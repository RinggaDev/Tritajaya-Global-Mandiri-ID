import { useEffect } from 'react'
import { siteName } from './content'

interface MetaOptions {
  title: string
  description: string
  path?: string
}

function setTag(
  selector: string,
  create: () => HTMLMetaElement | HTMLLinkElement,
  set: (element: HTMLMetaElement | HTMLLinkElement) => void,
) {
  let element = document.head.querySelector<
    HTMLMetaElement | HTMLLinkElement
  >(selector)
  if (!element) {
    element = create()
    document.head.appendChild(element)
  }
  set(element)
}

export function useMeta({ title, description, path }: MetaOptions) {
  useEffect(() => {
    const fullTitle = title.includes(siteName)
      ? title
      : `${title} | ${siteName}`
    const url = new URL(path ?? window.location.pathname, window.location.origin)
    const image = new URL('/og-image.png', window.location.origin).toString()

    document.title = fullTitle

    setTag(
      'meta[name="description"]',
      () => {
        const tag = document.createElement('meta')
        tag.name = 'description'
        return tag
      },
      (tag) => {
        tag.setAttribute('content', description)
      },
    )

    const properties: Record<string, string> = {
      'og:title': fullTitle,
      'og:description': description,
      'og:type': 'website',
      'og:url': url.toString(),
      'og:image': image,
      'og:site_name': siteName,
    }

    Object.entries(properties).forEach(([property, content]) => {
      setTag(
        `meta[property="${property}"]`,
        () => {
          const tag = document.createElement('meta')
          tag.setAttribute('property', property)
          return tag
        },
        (tag) => tag.setAttribute('content', content),
      )
    })

    setTag(
      'meta[name="twitter:card"]',
      () => {
        const tag = document.createElement('meta')
        tag.name = 'twitter:card'
        return tag
      },
      (tag) => tag.setAttribute('content', 'summary_large_image'),
    )

    setTag(
      'link[rel="canonical"]',
      () => {
        const link = document.createElement('link')
        link.rel = 'canonical'
        return link
      },
      (tag) => tag.setAttribute('href', url.toString()),
    )
  }, [title, description, path])
}

