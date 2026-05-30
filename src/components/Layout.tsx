import { Menu, X, Linkedin, Mail, Phone, ChevronDown, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { contactInfo, navItems, services } from '../data/content';
import { trackEvent } from '../lib/analytics';
import { Container } from './ui';

export function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();

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
                const isServicesActive = location.pathname.startsWith('/services');
                return (
                  <div key={item.href} className="relative">
                    <button 
                      onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
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
          <div className="border-t border-ink/10 bg-white lg:hidden">
            <Container className="grid gap-3 py-5">
              {navItems.map((item) => {
                if (item.href === '/services') {
                  return (
                    <div key={item.href} className="grid gap-2">
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
                              className="py-1 text-base text-ink/80 hover:text-sage-dark transition-colors"
                            >
                              {s.title}
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
        <Container className="grid gap-10 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
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
          </div>
          <div className="space-y-3 text-sm text-white/80">
            <p>{contactInfo.address}</p>
            <p>SIRET : 788 556 488 00039</p>
            <p>{contactInfo.hours}</p>
            <a className="flex items-center gap-2 transition-colors hover:text-sand" href={`mailto:${contactInfo.email}`} onClick={() => trackEvent('email_click')}><Mail size={16} /> {contactInfo.email}</a>
            <a className="flex items-center gap-2 transition-colors hover:text-sand" href={`tel:${contactInfo.phoneHref}`} onClick={() => trackEvent('phone_click')}><Phone size={16} /> {contactInfo.phone}</a>
            <a className="flex items-center gap-2 transition-colors hover:text-sand" href={contactInfo.linkedin}><Linkedin size={16} /> LinkedIn</a>
          </div>
          <div className="grid gap-2 text-sm text-white/80">
            <Link to="/mentions-legales">Mentions légales</Link>
            <Link to="/politique-confidentialite">Politique de confidentialité</Link>
            <Link to="/cookies">Cookies</Link>
            <Link to="/cgv-cgu">CGV / CGU</Link>
            <Link to="/admin">Administration</Link>
          </div>
        </Container>
      </footer>
    </div>
  );
}
