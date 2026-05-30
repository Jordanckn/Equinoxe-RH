import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FAQ } from '../types';

export function FAQAccordion({ items, grouped = false }: { items: FAQ[]; grouped?: boolean }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);

  if (grouped) {
    const categories = Array.from(new Set(items.map((f) => f.category).filter(Boolean)));
    return (
      <div className="space-y-8">
        {categories.map((cat) => (
          <div key={cat}>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-sage-dark">{cat}</p>
            <FAQList items={items.filter((f) => f.category === cat)} open={open} setOpen={setOpen} />
          </div>
        ))}
      </div>
    );
  }

  return <FAQList items={items} open={open} setOpen={setOpen} />;
}

function FAQList({
  items,
  open,
  setOpen,
}: {
  items: FAQ[];
  open: string | null;
  setOpen: (id: string | null) => void;
}) {
  return (
    <div className="divide-y divide-ink/10 overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_18px_44px_rgba(31,51,71,0.06)]">
      {items.map((faq) => {
        const isOpen = open === faq.id;
        return (
          <div key={faq.id} className={`transition-colors duration-200 ${isOpen ? 'bg-sage/25' : 'bg-white hover:bg-sage/10'}`}>
            <button
              className="focus-ring flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
              onClick={() => setOpen(isOpen ? null : faq.id)}
              aria-expanded={isOpen}
            >
              <span className="font-semibold leading-snug text-ink">{faq.question}</span>
              <span className={`mt-0.5 shrink-0 rounded-full p-1 transition-all duration-300 ${
                isOpen ? 'bg-ink text-white' : 'bg-sage/40 text-sage-dark'
              }`}>
                <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="px-6 pb-6 leading-7 text-anthracite/75">{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
