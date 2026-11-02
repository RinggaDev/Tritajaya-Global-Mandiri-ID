import type { ReactNode, Ref } from 'react'

interface BannerProps {
  variant: 'success' | 'error'
  children: ReactNode
  bannerRef?: Ref<HTMLDivElement>
}

// Disabled, loading, and hover states are not applicable to a static banner.
export function Banner({ variant, children, bannerRef }: BannerProps) {
  const success = variant === 'success'

  return (
    <div
      ref={bannerRef}
      tabIndex={-1}
      role={success ? 'status' : 'alert'}
      aria-live={success ? 'polite' : 'assertive'}
      className={`banner ${success ? 'banner-success' : 'banner-error'}`}
    >
      <span className="banner-icon" aria-hidden="true">
        {success ? '✓' : '!'}
      </span>
      <div>
        <strong>{success ? 'Request sent.' : 'Something went wrong.'}</strong>{' '}
        {children}
      </div>
    </div>
  )
}
