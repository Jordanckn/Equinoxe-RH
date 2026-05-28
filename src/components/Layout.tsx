import { Menu, X, Linkedin, Mail, Phone, ChevronDown } from 'lucide-react';
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
    <div className="min-h-screen bg-ivory text-anthracite">
      <a href="#main" className="focus-ring sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:p-3">
        Aller au contenu
      </a>
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-ivory/95 backdrop-blur">
        <Container className="flex h-20 items-center justify-between">
          <Link to="/" className="focus-ring flex flex-col leading-none" aria-label="Equinoxe Conseil RH">
            <span className="font-serif text-2xl font-semibold text-ink">Equinoxe</span>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-sage-dark">Conseil RH</span>
          </Link>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
            {navItems.map((item) => {
              if (item.href === '/services') {
                const isServicesActive = location.pathname.startsWith('/services');
                return (
                  <div key={item.href} className="relative">
                    <button 
                      onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                      className={`flex items-center gap-1 text-sm font-medium transition hover:text-sage-dark focus-ring rounded-lg px-2 py-1 ${isServicesActive ? 'text-sage-dark' : 'text-ink'}`}
                      aria-expanded={servicesDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>
                      <ChevronDown size={14} className={`transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {servicesDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setServicesDropdownOpen(false)} />
                        <div className="absolute left-0 mt-2 w-64 rounded-xl border border-ink/10 bg-white p-2 shadow-soft z-20">
                          <Link 
                            to="/services" 
                            onClick={() => setServicesDropdownOpen(false)}
                            className="block rounded-lg px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-sage-dark hover:bg-ivory/50 transition-colors"
                          >
                            Tous les services
                          </Link>
                          <div className="h-px bg-ink/10 my-1" />
                          {services.map((s) => (
                            <Link 
                              key={s.slug} 
                              to={`/services/${s.slug}`}
                              onClick={() => setServicesDropdownOpen(false)}
                              className="block rounded-lg px-4 py-2 text-sm text-ink hover:bg-ivory/60 hover:text-sage-dark transition-all"
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
                <NavLink key={item.href} to={item.href} className={({ isActive }) => `text-sm font-medium transition hover:text-sage-dark ${isActive ? 'text-sage-dark' : 'text-ink'}`}>
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <a onClick={() => trackEvent('phone_click')} className="focus-ring rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink" href={`tel:${contactInfo.phoneHref}`}>
              {contactInfo.phone}
            </a>
            <Link className="focus-ring rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sage-dark" to="/contact">
              Contact
            </Link>
          </div>
          <button className="focus-ring rounded-full border border-ink/15 p-2 lg:hidden" onClick={() => setOpen(!open)} aria-label="Ouvrir le menu">
            {open ? <X /> : <Menu />}
          </button>
        </Container>
        {open ? (
          <div className="border-t border-ink/10 bg-ivory lg:hidden">
            <Container className="grid gap-3 py-5">
              {navItems.map((item) => {
                if (item.href === '/services') {
                  return (
                    <div key={item.href} className="grid gap-2">
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="flex items-center justify-between py-2 text-lg font-medium text-ink w-full text-left"
                      >
                        <span>{item.label}</span>
                        <ChevronDown size={18} className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {mobileServicesOpen && (
                        <div className="pl-4 border-l-2 border-sage/30 grid gap-2.5 pb-2">
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
                  <Link key={item.href} to={item.href} onClick={() => setOpen(false)} className="py-2 text-lg font-medium text-ink">
                    {item.label}
                  </Link>
                );
              })}
            </Container>
          </div>
        ) : null}
      </header>
      <main id="main">{children}</main>
      <footer className="border-t border-ink/10 bg-ink text-white">
        <Container className="grid gap-10 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="font-serif text-3xl">Equinoxe Conseil RH</p>
            <p className="mt-4 max-w-md text-white/75">Conseil RH, coaching professionnel, accompagnement du changement et bilan de compétences à Toulouse, en Occitanie et à distance.</p>
          </div>
          <div className="space-y-3 text-sm text-white/80">
            <p>{contactInfo.address}</p>
            <p>SIRET : 788 556 488 00039</p>
            <p>{contactInfo.hours}</p>
            <a className="flex items-center gap-2 hover:text-champagne" href={`mailto:${contactInfo.email}`} onClick={() => trackEvent('email_click')}><Mail size={16} /> {contactInfo.email}</a>
            <a className="flex items-center gap-2 hover:text-champagne" href={`tel:${contactInfo.phoneHref}`} onClick={() => trackEvent('phone_click')}><Phone size={16} /> {contactInfo.phone}</a>
            <a className="flex items-center gap-2 hover:text-champagne" href={contactInfo.linkedin}><Linkedin size={16} /> LinkedIn</a>
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
