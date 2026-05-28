import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Section({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`py-16 sm:py-24 ${className}`}>{children}</section>;
}

export function ButtonLink({ to, children, variant = 'primary' }: { to: string; children: ReactNode; variant?: 'primary' | 'secondary' }) {
  const cls =
    variant === 'primary'
      ? 'bg-ink text-white hover:bg-sage-dark'
      : 'border border-ink/20 bg-white/40 text-ink hover:border-sage-dark hover:text-sage-dark';
  return (
    <Link to={to} className={`focus-ring inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition ${cls}`}>
      {children}
    </Link>
  );
}

export function PageHeader({ eyebrow, title, text }: { eyebrow?: string; title: string; text: string }) {
  return (
    <div className="bg-ivory pt-14">
      <Container className="pb-12 pt-10 sm:pb-16">
        {eyebrow ? <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-sage-dark">{eyebrow}</p> : null}
        <h1 className="max-w-4xl font-serif text-4xl font-semibold leading-tight text-ink sm:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-anthracite/80">{text}</p>
      </Container>
    </div>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-lg border border-ink/10 bg-white/70 p-6 shadow-soft ${className}`}>{children}</div>;
}
