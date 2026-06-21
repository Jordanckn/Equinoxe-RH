import { supabase } from './supabaseClient';

type EventName =
  | 'page_view'
  | 'phone_click'
  | 'email_click'
  | 'contact_submit'
  | 'cta_click'
  | 'article_read'
  | 'bilan_request'
  | 'company_request'
  | 'individual_request'
  | 'scroll_depth'
  | 'section_open'
  | 'blog_card_click'
  | 'service_card_click';

function currentPath() {
  return window.location.pathname;
}

export function initAnalytics() {
  // no-op — tracking handled by Supabase directly
}

export function trackPageView(path: string) {
  trackEvent('page_view', { path });
}

export function trackEvent(name: EventName, payload: Record<string, unknown> = {}) {
  if (!supabase) return;
  supabase.from('page_events').insert({ name, path: currentPath(), payload }).then(() => {});
}

const depthSent = new Set<number>();

export function initScrollDepth() {
  depthSent.clear();
  const thresholds = [25, 50, 75, 90];

  const handler = () => {
    const scrolled = window.scrollY + window.innerHeight;
    const total = document.documentElement.scrollHeight;
    const pct = Math.round((scrolled / total) * 100);
    for (const t of thresholds) {
      if (pct >= t && !depthSent.has(t)) {
        depthSent.add(t);
        trackEvent('scroll_depth', { depth: t });
      }
    }
  };

  window.addEventListener('scroll', handler, { passive: true });
  return () => window.removeEventListener('scroll', handler);
}
