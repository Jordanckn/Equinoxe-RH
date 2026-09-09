import { Menu, X, Linkedin, Mail, Phone, ChevronDown, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { contactInfo, navItems, services } from '../data/content';
import { trackEvent } from '../lib/analytics';
import { supabase } from '../lib/supabaseClient';
import { Container } from './ui';

const DEFAULT_SITE_LOGO = '/images/equinoxe-RH-logo.webp';
const FALLBACK_SITE_LOGO = '/images/logo-equinoxe-rh.svg';

export function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [audienceDropdownOpen, setAudienceDropdownOpen] = useState(false);
  const [plusDropdownOpen, setPlusDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAudienceOpen, setMobileAudienceOpen] = useState(false);
  const [mobilePlusOpen, setMobilePlusOpen] = useState(false);
  const [siteLogo, setSiteLogo] = useState(DEFAULT_SITE_LOGO);
  const location = useLocation();

  useEffect(() => {
    if (!supabase) return;
    supabase.from('site_settings').select('value').eq('key', 'site_logo_url').single()
      .then(({ data }) => {
        if (typeof data?.value === 'string' && data.value.trim()) setSiteLogo(data.value);
      });
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const pourVousItems = [
    {
      label: 'Bilan de compétences',
      href: '/services/bilan-de-competences',
      desc: 'Analyser son parcours et construire un projet cohérent.'
    },
    {
      label: 'Accompagnement individuel',
      href: '/services/accompagnement-individuel',
      desc: 'Prendre du recul, décider, traverser une période de changement.'
    },
    {
      label: 'Transitions et évolutions',
      href: '/pour-qui/salaries-transitions',
      desc: 'Reconversion, mobilité, seconde partie de carrière.'
    }
  ];
  const plusItems = [
    { label: 'Ressources RH', href: '/blog', desc: 'Recherches, analyses et repères sur les transitions RH.' },
    { label: 'On parle de nous', href: '/on-parle-de-nous', desc: 'Articles, publications et interventions médias.' },
    { label: 'FAQ', href: '/faq', desc: 'Réponses aux questions fréquentes.' }
  ];

  return (
    <div className="min-h-screen bg-white text-anthracite">
      <a href="#main" className="focus-ring sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:p-3">
        Aller au contenu
      </a>
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/90 backdrop-blur-xl">
        <Container className="flex h-20 items-center justify-between gap-5">
          <Link to="/" className="focus-ring rounded-lg" aria-label="ACT&RH">
            <img
              src={siteLogo}
              alt="ACT&RH – Conseil RH & accompagnement individuel"
              onError={(event) => { event.currentTarget.src = FALLBACK_SITE_LOGO; }}
              className="h-10 w-auto object-contain sm:h-11"
            />
          </Link>
          <nav className="hidden items-center gap-1 rounded-full border border-ink/10 bg-white px-2 py-2 shadow-[0_12px_32px_rgba(31,51,71,0.06)] lg:flex" aria-label="Navigation principale">
            {navItems.map((item) => {
              if (item.href === '/services') {
                const isAudienceActive = location.pathname.startsWith('/pour-qui');
                const isServicesActive = location.pathname.startsWith('/services');
                return (
                  <div key="services-nav-group" className="contents">
                    <div className="relative">
                      <button 
                        onClick={() => {
                          setServicesDropdownOpen(!servicesDropdownOpen);
                          setAudienceDropdownOpen(false);
                          setPlusDropdownOpen(false);
                        }}
                        className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all hover:bg-sage/35 hover:text-sage-dark focus-ring ${isServicesActive ? 'bg-sage/35 text-sage-dark' : 'text-ink/80'}`}
                        aria-expanded={servicesDropdownOpen}
                        aria-haspopup="true"
                      >
                        <span>{item.label}</span>
                        <ChevronDown size={14} className={`transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {servicesDropdownOpen && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setServicesDropdownOpen(false)} />
                          <div className="absolute left-1/2 z-20 mt-4 w-[22rem] -translate-x-1/2 rounded-2xl border border-ink/10 bg-white p-3 shadow-[0_22px_70px_rgba(31,51,71,0.14)]">
                            <Link
                              to="/services#organisations"
                              onClick={() => setServicesDropdownOpen(false)}
                              className="flex items-center justify-between rounded-xl bg-rosé px-4 py-3 text-sm font-semibold text-ink transition-colors hover:text-sage-dark"
                            >
                              <span>Tous les accompagnements</span>
                              <ArrowRight size={15} />
                            </Link>
                            <div className="my-2 h-px bg-ink/10" />
                            {services.filter((s) => ['conseil-rh-entreprises', 'accompagnement-changement', 'formations-ateliers-codeveloppement'].includes(s.slug)).map((s) => (
                              <Link
                                key={s.slug}
                                to={`/services/${s.slug}`}
                                onClick={() => setServicesDropdownOpen(false)}
                                className="block rounded-xl px-4 py-3 text-sm font-medium text-ink/80 transition-all hover:bg-sage/15 hover:text-ink"
                              >
                                {s.title}
                              </Link>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => {
                          setAudienceDropdownOpen(!audienceDropdownOpen);
                          setServicesDropdownOpen(false);
                          setPlusDropdownOpen(false);
                        }}
                        className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all hover:bg-sage/35 hover:text-sage-dark focus-ring ${isAudienceActive ? 'bg-sage/35 text-sage-dark' : 'text-ink/80'}`}
                        aria-expanded={audienceDropdownOpen}
                        aria-haspopup="true"
                      >
                        <span>Pour vous</span>
                        <ChevronDown size={14} className={`transition-transform duration-200 ${audienceDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {audienceDropdownOpen && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setAudienceDropdownOpen(false)} />
                          <div className="absolute left-1/2 z-20 mt-4 w-[22rem] -translate-x-1/2 rounded-2xl border border-ink/10 bg-white p-3 shadow-[0_22px_70px_rgba(31,51,71,0.14)]">
                            <div className="flex items-center justify-between rounded-xl bg-rosé px-4 py-3 text-sm font-semibold text-ink">
                              <span>Prendre du recul, décider, avancer</span>
                              <ChevronDown size={15} />
                            </div>
                            <div className="my-2 h-px bg-ink/10" />
                            {pourVousItems.map((audience) => (
                              <Link
                                key={audience.href}
                                to={audience.href}
                                onClick={() => setAudienceDropdownOpen(false)}
                                className="block rounded-xl px-4 py-3 text-sm font-medium text-ink/80 transition-all hover:bg-sage/15 hover:text-ink"
                              >
                                {audience.label}
                              </Link>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              }
              if (item.href === '/blog') {
                const isPlusActive = location.pathname.startsWith('/on-parle-de-nous') || location.pathname.startsWith('/blog') || location.pathname.startsWith('/faq');
                return (
                  <div key="plus" className="relative">
                    <button
                      onClick={() => {
                        setPlusDropdownOpen(!plusDropdownOpen);
                        setServicesDropdownOpen(false);
                        setAudienceDropdownOpen(false);
                      }}
                      className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all hover:bg-sage/35 hover:text-sage-dark focus-ring ${isPlusActive ? 'bg-sage/35 text-sage-dark' : 'text-ink/80'}`}
                      aria-expanded={plusDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>
                      <ChevronDown size={14} className={`transition-transform duration-200 ${plusDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {plusDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setPlusDropdownOpen(false)} />
                        <div className="absolute left-1/2 z-20 mt-4 w-[22rem] -translate-x-1/2 rounded-2xl border border-ink/10 bg-white p-3 shadow-[0_22px_70px_rgba(31,51,71,0.14)]">
                          {plusItems.map((plus) => (
                            <Link
                              key={plus.href}
                              to={plus.href}
                              onClick={() => setPlusDropdownOpen(false)}
                              className="block rounded-xl px-4 py-3 text-sm font-medium text-ink/80 transition-all hover:bg-sage/15 hover:text-ink"
                            >
                              {plus.label}
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                );
              }
              return (
                <NavLink key={item.href} to={item.href} className={({ isActive }) => `rounded-full px-4 py-2 text-sm font-semibold transition-all hover:bg-sage/35 hover:text-sage-dark ${isActive ? 'bg-sage/35 text-sage-dark' : 'text-ink/80'}`}>
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <a onClick={() => trackEvent('phone_click')} className="focus-ring rounded-lg border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-sage-dark hover:text-sage-dark" href={`tel:${contactInfo.phoneHref}`}>
              {contactInfo.phone}
            </a>
            <Link className="focus-ring inline-flex items-center gap-2 rounded-lg bg-sage px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(111,143,130,0.22)] transition hover:bg-sage-dark" to="/contact">
              Contact <ArrowRight size={15} />
            </Link>
          </div>
          <button className="focus-ring rounded-full border border-ink/10 bg-white p-2.5 shadow-sm lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </Container>
        {open ? (
          <div className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-ink/10 bg-white overscroll-contain lg:hidden">
            <Container className="grid gap-3 py-5 pb-8">
              {navItems.map((item) => {
                if (item.href === '/services') {
                  return (
                    <div key="services-area-mobile" className="grid gap-2">
                      <div className="grid gap-2">
                        <button
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          aria-expanded={mobileServicesOpen}
                          className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-lg font-semibold text-ink"
                        >
                          <span>{item.label}</span>
                          <ChevronDown size={18} className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {mobileServicesOpen && (
                          <div className="ml-3 grid gap-2.5 border-l border-sage/40 pb-2 pl-4">
                            <Link
                              to="/services#organisations"
                              onClick={() => { setOpen(false); setMobileServicesOpen(false); }}
                              className="py-1 text-sm font-semibold uppercase tracking-[0.15em] text-sage-dark"
                            >
                              Tous les accompagnements
                            </Link>
                            {services.filter((s) => ['conseil-rh-entreprises', 'accompagnement-changement', 'formations-ateliers-codeveloppement'].includes(s.slug)).map((s) => (
                              <Link
                                key={s.slug}
                                to={`/services/${s.slug}`}
                                onClick={() => { setOpen(false); setMobileServicesOpen(false); }}
                                className="py-1 text-base text-ink/80 transition-colors hover:text-sage-dark"
                              >
                                {s.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="grid gap-2">
                        <button
                          onClick={() => setMobileAudienceOpen(!mobileAudienceOpen)}
                          aria-expanded={mobileAudienceOpen}
                          className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-lg font-semibold text-ink"
                        >
                          <span>Pour vous</span>
                          <ChevronDown size={18} className={`transition-transform duration-200 ${mobileAudienceOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {mobileAudienceOpen && (
                          <div className="ml-3 grid gap-2.5 border-l border-sage/40 pb-2 pl-4">
                            <div
                              className="py-1 text-sm font-semibold uppercase tracking-[0.15em] text-sage-dark"
                            >
                              Prendre du recul, décider, avancer
                            </div>
                            {pourVousItems.map((audience) => (
                              <Link
                                key={audience.href}
                                to={audience.href}
                                onClick={() => { setOpen(false); setMobileAudienceOpen(false); }}
                                className="py-1 text-base text-ink/80 transition-colors hover:text-sage-dark"
                              >
                                {audience.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }
                if (item.href === '/blog') {
                  return (
                    <div key="plus-mobile" className="grid gap-2">
                      <button
                        onClick={() => setMobilePlusOpen(!mobilePlusOpen)}
                        aria-expanded={mobilePlusOpen}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-lg font-semibold text-ink"
                      >
                        <span>{item.label}</span>
                        <ChevronDown size={18} className={`transition-transform duration-200 ${mobilePlusOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {mobilePlusOpen && (
                        <div className="ml-3 grid gap-2.5 border-l border-sage/40 pb-2 pl-4">
                          <Link
                            to={plusItems[0].href}
                            onClick={() => { setOpen(false); setMobilePlusOpen(false); }}
                            className="py-1 text-sm font-semibold uppercase tracking-[0.15em] text-sage-dark"
                          >
                            {plusItems[0].label}
                          </Link>
                          {plusItems.slice(1).map((plus) => (
                            <Link
                              key={plus.href}
                              to={plus.href}
                              onClick={() => { setOpen(false); setMobilePlusOpen(false); }}
                              className="py-1 text-base text-ink/80 transition-colors hover:text-sage-dark"
                            >
                              {plus.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link key={item.href} to={item.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-lg font-semibold text-ink">
                    {item.label}
                  </Link>
                );
              })}
              <Link className="mt-2 inline-flex items-center justify-center rounded-lg bg-sage px-5 py-3 text-sm font-semibold text-white transition hover:bg-sage-dark" to="/contact" onClick={() => setOpen(false)}>
                Échanger sur votre besoin
              </Link>
            </Container>
          </div>
        ) : null}
      </header>
      <main id="main">{children}</main>
      <footer className="border-t border-ink/10 bg-ink text-white">
        <Container className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_0.9fr_0.8fr]">
          <div>
            <Link to="/" className="inline-flex items-center" aria-label="ACT&RH">
              <span className="inline-flex items-center rounded-2xl bg-white px-5 py-3 shadow-sm">
                <img
                  src={siteLogo}
                  alt="ACT&RH – Conseil RH & accompagnement individuel"
                  onError={(event) => { event.currentTarget.src = FALLBACK_SITE_LOGO; }}
                  className="h-12 w-auto object-contain"
                />
              </span>
            </Link>
            <p className="mt-4 max-w-md text-white/75">Conseil RH et accompagnement individuel. Comprendre ce qui se joue, clarifier les choix, construire la suite. Toulouse · Occitanie · France · À distance.</p>
            <div className="mt-6 flex items-center gap-3" aria-label="Réseaux sociaux">
              <a
                href={contactInfo.linkedin}
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition hover:border-sand hover:text-champagne"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                onClick={() => trackEvent('email_click')}
                aria-label="Envoyer un email"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition hover:border-sand hover:text-champagne"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
          <div className="space-y-3 text-sm text-white/80">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-champagne">Contact</p>
            <p>{contactInfo.address}</p>
            <p>SIRET : 788 556 488 00039</p>
            <p>{contactInfo.hours}</p>
            <a className="flex items-center gap-2 transition-colors hover:text-champagne" href={`mailto:${contactInfo.email}`} onClick={() => trackEvent('email_click')}><Mail size={16} /> {contactInfo.email}</a>
            <a className="flex items-center gap-2 transition-colors hover:text-champagne" href={`tel:${contactInfo.phoneHref}`} onClick={() => trackEvent('phone_click')}><Phone size={16} /> {contactInfo.phone}</a>
            <a className="flex items-center gap-2 transition-colors hover:text-champagne" href={contactInfo.linkedin}><Linkedin size={16} /> LinkedIn</a>
          </div>
          <div className="grid gap-2 text-sm text-white/80">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-champagne">Plan du site</p>
            <Link className="transition-colors hover:text-champagne" to="/">Accueil</Link>
            <Link className="transition-colors hover:text-champagne" to="/a-propos">Ma démarche</Link>
            <Link className="transition-colors hover:text-champagne" to="/services">Pour les organisations</Link>
            <Link className="transition-colors hover:text-champagne" to="/services#vous">Pour vous</Link>
            <Link className="transition-colors hover:text-champagne" to="/blog">Ressources RH</Link>
            <Link className="transition-colors hover:text-champagne" to="/on-parle-de-nous">On parle de nous</Link>
            <Link className="transition-colors hover:text-champagne" to="/faq">FAQ</Link>
            <Link className="transition-colors hover:text-champagne" to="/contact">Contact</Link>
          </div>
          <div className="grid gap-2 text-sm text-white/80">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-champagne">Informations</p>
            <Link className="transition-colors hover:text-champagne" to="/mentions-legales">Mentions légales</Link>
            <Link className="transition-colors hover:text-champagne" to="/politique-confidentialite">Politique de confidentialité</Link>
            <Link className="transition-colors hover:text-champagne" to="/cookies">Cookies</Link>
            <Link className="transition-colors hover:text-champagne" to="/cgv-cgu">CGV / CGU</Link>
            <Link className="transition-colors hover:text-champagne" to="/admin">Administration</Link>
          </div>
        </Container>
        <div className="border-t border-white/10 py-4 text-center text-sm text-white/65">
          site réalisé par{' '}
          <a href="https://webfityou.com" target="_blank" rel="noreferrer" className="font-bold underline decoration-white/45 underline-offset-4 transition hover:text-champagne">
            WebFitYou
          </a>
        </div>
      </footer>
    </div>
  );
}
