type EventName =
  | 'phone_click'
  | 'email_click'
  | 'contact_submit'
  | 'cta_click'
  | 'article_read'
  | 'bilan_request'
  | 'company_request'
  | 'individual_request';

export function trackEvent(name: EventName, payload: Record<string, unknown> = {}) {
  window.dispatchEvent(new CustomEvent('equinoxe:event', { detail: { name, payload } }));
}
