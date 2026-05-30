import { Menu, X, Linkedin, Mail, Phone, ChevronDown, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { contactInfo, navItems, services } from '../data/content';
import { trackEvent } from '../lib/analytics';
import { Container } from './ui';

export function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [audienceDropdownOpen, setAudienceDropdownOpen] = useState(false);
  const [plusDropdownOpen, setPlusDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAudienceOpen, setMobileAudienceOpen] = useState(false);
  const [mobilePlusOpen, setMobilePlusOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const audienceItems = [
    {
      label: 'Entreprises et dirigeants',
      href: '/pour-qui/entreprises-dirigeants',
      desc: 'Structurer les RH et accompagner les transformations.'
    },
    {
      label: 'Managers',
      href: '/pour-qui/managers',
      desc: 'Développer sa posture et gérer les tensions.'
    },
    {
      label: 'Salariés et professionnels en transition',
      href: '/pour-qui/salaries-transitions',
      desc: 'Clarifier un parcours, une évolution ou une reconversion.'
    },
    {
      label: 'Entrepreneurs',
      href: '/pour-qui/entrepreneurs',
      desc: 'Poser des bases RH solides dès la croissance.'
    },
    {
      label: 'Étudiants',
      href: '/pour-qui/etudiants',
      desc: 'Préparer son orientation et son entrée sur le marché.'
    },
    {
      label: 'Collectifs et équipes',
      href: '/pour-qui/collectifs-equipes',
      desc: 'Renforcer la cohésion et l’intelligence collective.'
    }
  ];
  const plusItems = [
    { label: 'On parle de nous', href: '/on-parle-de-nous', desc: 'Articles, publications et interventions médias.' },
    { label: 'Ressources RH', href: '/blog', desc: 'Articles et repères sur les transitions RH.' },
    { label: 'FAQ', href: '/faq', desc: 'Réponses aux questions fréquentes.' }
  ];

  return (
    <div className="min-h-screen bg-white text-anthracite">
      <a href="#main" className="focus-ring sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:p-3">
        Aller au contenu
      </a>
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/90 backdrop-blur-xl">
        <Container className="flex h-20 items-center justify-between gap-5">
          <Link to="/" className="focus-ring flex items-center gap-3 rounded-full" aria-label="Equinoxe Conseil RH">
            <span className="h-12 w-12 overflow-hidden rounded-full bg-white shadow-sm">
              <img src="/images/equinoxe-RH-logo.webp" alt="" className="h-full w-full scale-[2.15] object-cover" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-serif text-2xl font-semibold text-ink">Equinoxe</span>
              <span className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-sage-dark">Conseil RH</span>
            </span>
          </Link>
          <nav className="hidden items-center rounded-full border border-ink/10 bg-white px-2 py-2 shadow-[0_12px_32px_rgba(31,51,71,0.06)] lg:flex" aria-label="Navigation principale">
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
                              to="/services" 
                              onClick={() => setServicesDropdownOpen(false)}
                              className="flex items-center justify-between rounded-xl bg-rosé px-4 py-3 text-sm font-semibold text-ink transition-colors hover:text-sage-dark"
                            >
                              <span>Tous les accompagnements</span>
                              <ArrowRight size={15} />
                            </Link>
                            <div className="my-2 h-px bg-ink/10" />
                            {services.map((s) => (
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
                        <span>Vos situations</span>
                        <ChevronDown size={14} className={`transition-transform duration-200 ${audienceDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {audienceDropdownOpen && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setAudienceDropdownOpen(false)} />
                          <div className="absolute left-1/2 z-20 mt-4 w-[22rem] -translate-x-1/2 rounded-2xl border border-ink/10 bg-white p-3 shadow-[0_22px_70px_rgba(31,51,71,0.14)]">
                            <div className="flex items-center justify-between rounded-xl bg-rosé px-4 py-3 text-sm font-semibold text-ink">
                              <span>Choisir selon votre situation</span>
                              <ChevronDown size={15} />
                            </div>
                            <div className="my-2 h-px bg-ink/10" />
                            {audienceItems.map((audience) => (
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
              if (item.href === '/contact') {
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
                      <span>Plus</span>
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
            <a onClick={() => trackEvent('phone_click')} className="focus-ring rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-sage-dark hover:text-sage-dark" href={`tel:${contactInfo.phoneHref}`}>
              {contactInfo.phone}
            </a>
            <Link className="focus-ring inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(31,51,71,0.18)] transition hover:bg-sage-dark" to="/contact">
              Contact <ArrowRight size={15} />
            </Link>
          </div>
          <button className="focus-ring rounded-full border border-ink/10 bg-white p-2.5 shadow-sm lg:hidden" onClick={() => setOpen(!open)} aria-label="Ouvrir le menu">
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
                          className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-lg font-semibold text-ink"
                        >
                          <span>{item.label}</span>
                          <ChevronDown size={18} className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {mobileServicesOpen && (
                          <div className="ml-3 grid gap-2.5 border-l border-sage/40 pb-2 pl-4">
                            <Link 
                              to="/services" 
                              onClick={() => { setOpen(false); setMobileServicesOpen(false); }}
                              className="py-1 text-sm font-semibold uppercase tracking-[0.15em] text-sage-dark"
                            >
                              Tous les services
                            </Link>
                            {services.map((s) => (
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
                          className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-lg font-semibold text-ink"
                        >
                          <span>Vos situations</span>
                          <ChevronDown size={18} className={`transition-transform duration-200 ${mobileAudienceOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {mobileAudienceOpen && (
                          <div className="ml-3 grid gap-2.5 border-l border-sage/40 pb-2 pl-4">
                            <div
                              className="py-1 text-sm font-semibold uppercase tracking-[0.15em] text-sage-dark"
                            >
                              Selon votre profil
                            </div>
                            {audienceItems.map((audience) => (
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
                if (item.href === '/contact') {
                  return (
                    <div key="plus-mobile" className="grid gap-2">
                      <button
                        onClick={() => setMobilePlusOpen(!mobilePlusOpen)}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-lg font-semibold text-ink"
                      >
                        <span>Plus</span>
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
              <Link className="mt-2 inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white" to="/contact" onClick={() => setOpen(false)}>
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
            <Link to="/" className="inline-flex items-center gap-4" aria-label="Equinoxe Conseil RH">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
                <span className="h-14 w-14 overflow-hidden rounded-full">
                  <img src="/images/equinoxe-RH-logo.webp" alt="" className="h-full w-full scale-[2.15] object-cover" />
                </span>
              </span>
              <span className="font-serif text-3xl">Equinoxe Conseil RH</span>
            </Link>
            <p className="mt-4 max-w-md text-white/75">Conseil RH, coaching professionnel, accompagnement du changement et bilan de compétences à Toulouse, en Occitanie et à distance.</p>
            <div className="mt-6 flex items-center gap-3" aria-label="Réseaux sociaux">
              <a
                href={contactInfo.linkedin}
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition hover:border-sand hover:text-sand"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                onClick={() => trackEvent('email_click')}
                aria-label="Envoyer un email"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition hover:border-sand hover:text-sand"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
          <div className="space-y-3 text-sm text-white/80">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white">Contact</p>
            <p>{contactInfo.address}</p>
            <p>SIRET : 788 556 488 00039</p>
            <p>{contactInfo.hours}</p>
            <a className="flex items-center gap-2 transition-colors hover:text-sand" href={`mailto:${contactInfo.email}`} onClick={() => trackEvent('email_click')}><Mail size={16} /> {contactInfo.email}</a>
            <a className="flex items-center gap-2 transition-colors hover:text-sand" href={`tel:${contactInfo.phoneHref}`} onClick={() => trackEvent('phone_click')}><Phone size={16} /> {contactInfo.phone}</a>
            <a className="flex items-center gap-2 transition-colors hover:text-sand" href={contactInfo.linkedin}><Linkedin size={16} /> LinkedIn</a>
          </div>
          <div className="grid gap-2 text-sm text-white/80">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-white">Plan du site</p>
            <Link className="transition-colors hover:text-sand" to="/">Accueil</Link>
            <Link className="transition-colors hover:text-sand" to="/a-propos">Le Cabinet</Link>
            <Link className="transition-colors hover:text-sand" to="/services">Conseil & Coaching</Link>
            <Link className="transition-colors hover:text-sand" to="/blog">Ressources RH</Link>
            <Link className="transition-colors hover:text-sand" to="/on-parle-de-nous">On parle de nous</Link>
            <Link className="transition-colors hover:text-sand" to="/faq">FAQ</Link>
            <Link className="transition-colors hover:text-sand" to="/contact">Contact</Link>
          </div>
          <div className="grid gap-2 text-sm text-white/80">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-white">Informations</p>
            <Link className="transition-colors hover:text-sand" to="/mentions-legales">Mentions légales</Link>
            <Link className="transition-colors hover:text-sand" to="/politique-confidentialite">Politique de confidentialité</Link>
            <Link className="transition-colors hover:text-sand" to="/cookies">Cookies</Link>
            <Link className="transition-colors hover:text-sand" to="/cgv-cgu">CGV / CGU</Link>
            <Link className="transition-colors hover:text-sand" to="/admin">Administration</Link>
          </div>
        </Container>
        <div className="border-t border-white/10 py-4 text-center text-sm text-white/65">
          site réalisé par{' '}
          <a href="https://webfityou.com" target="_blank" rel="noreferrer" className="font-bold underline decoration-white/45 underline-offset-4 transition hover:text-sand">
            WebFitYou
          </a>
        </div>
      </footer>
    </div>
  );
}
