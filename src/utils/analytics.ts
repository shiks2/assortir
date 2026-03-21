declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const GA_MEASUREMENT_ID = 'G-DZSVKYP6J4'

function canTrack(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function'
}

export function trackPageView(path: string) {
  if (!canTrack()) return

  window.gtag?.('event', 'page_view', {
    send_to: GA_MEASUREMENT_ID,
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
    debug_mode: window.location.hostname === 'localhost',
  })
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (!canTrack()) return

  window.gtag?.('event', eventName, {
    send_to: GA_MEASUREMENT_ID,
    debug_mode: window.location.hostname === 'localhost',
    ...params,
  })
}
