import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Section({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`py-16 sm:py-24 ${className}`}>{children}</section>;
}

export function ButtonLink({ to, children, variant = 'primary', className = '' }: { to: string; children: ReactNode; variant?: 'primary' | 'secondary'; className?: string }) {
  const cls =
    variant === 'primary'
      ? 'bg-ink text-white shadow-[0_12px_28px_rgba(31,51,71,0.18)] hover:bg-sage-dark'
      : 'border border-ink/15 bg-white text-ink hover:border-sage-dark hover:text-sage-dark hover:shadow-sm';
  return (
    <Link to={to} className={`focus-ring inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${cls} ${className}`}>
      {children}
    </Link>
  );
}

export function PageHeader({ eyebrow, title, text }: { eyebrow?: string; title: string; text: string }) {
  return (
    <div className="relative overflow-hidden border-b border-sand bg-rosé pt-14">
      {/* Decorative background elements - enhanced visibility and explicit styling */}
      <div className="absolute -right-16 -top-16 z-0 h-96 w-96 rounded-full border-[32px] border-white opacity-40" />
      <div className="absolute -left-12 -bottom-12 z-0 h-64 w-64 rounded-full border-[24px] border-white opacity-25" />
      <div className="absolute right-[15%] top-1/4 z-0 h-32 w-32 rounded-full border-[12px] border-white opacity-20" />
      
      <Container className="relative z-10 pb-12 pt-10 sm:pb-16">
        {eyebrow ? <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-sage-dark">{eyebrow}</p> : null}
        <div className="max-w-5xl">
          <h1 className="font-serif text-4xl font-semibold leading-[1.05] text-ink sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-anthracite/70">{text}</p>
        </div>
      </Container>
    </div>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-ink/10 bg-white p-6 shadow-[0_18px_44px_rgba(31,51,71,0.06)] ${className}`}>{children}</div>;
}
