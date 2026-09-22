// Thin wrapper over the gtag.js snippet in index.html (GA4 G-KMN5LKE0LD).
// Safe to call when the tag hasn't loaded (ad blockers, dev) — it just no-ops.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/** Fired after an enquiry / sign-up is stored. Marked as a key event in GA4. */
export function trackEnquirySubmit(type: string, extra: Record<string, string | number | undefined> = {}) {
  try {
    window.gtag?.('event', 'enquiry_submit', { enquiry_type: type, page_path: window.location.pathname, ...extra })
  } catch {
    // analytics must never break the form
  }
}
