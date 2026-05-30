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
    <div className="border-b border-ink/10 bg-white pt-14">
      <Container className="pb-12 pt-10 sm:pb-16">
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
