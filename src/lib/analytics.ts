// ─── Analytics — GA4 + Microsoft Clarity ────────────────────────────────────
// GA4  : set VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX in .env
// Clarity : set VITE_CLARITY_ID=xxxxxxxxxx in .env

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
    clarity: (...args: unknown[]) => void;
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID as string | undefined;

let initialized = false;

function injectScript(src: string, id: string) {
  if (document.getElementById(id)) return;
  const s = document.createElement('script');
  s.id = id;
  s.src = src;
  s.async = true;
  document.head.appendChild(s);
}

function injectInlineScript(code: string, id: string) {
  if (document.getElementById(id)) return;
  const s = document.createElement('script');
  s.id = id;
  s.textContent = code;
  document.head.appendChild(s);
}

export function initAnalytics() {
  if (initialized) return;
  initialized = true;

  // ── Google Analytics 4 ──────────────────────────────────────────────────
  if (GA_ID) {
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = function (...args: unknown[]) { window.dataLayer.push(args); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, {
      send_page_view: false, // we send manually for SPA
      anonymize_ip: true,
    });
    injectScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`, 'ga4-script');
  }

  // ── Microsoft Clarity ───────────────────────────────────────────────────
  if (CLARITY_ID) {
    injectInlineScript(
      `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${CLARITY_ID}");`,
      'clarity-script'
    );
  }
}

// ── Page view (call on route change) ──────────────────────────────────────
export function trackPageView(path: string, title?: string) {
  if (!initialized) return;
  if (GA_ID && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title ?? document.title,
    });
  }
}

// ── Custom events ──────────────────────────────────────────────────────────
type EventName =
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

export function trackEvent(name: EventName, payload: Record<string, unknown> = {}) {
  if (!initialized) return;
  if (GA_ID && window.gtag) {
    window.gtag('event', name, payload);
  }
  if (CLARITY_ID && window.clarity) {
    window.clarity('set', name, JSON.stringify(payload));
  }
}

// ── Scroll depth tracker (call once per page) ──────────────────────────────
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
