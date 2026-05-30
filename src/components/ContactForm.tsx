import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { sendLeadEmails } from '../lib/emailjs';
import { trackEvent } from '../lib/analytics';
import type { LeadInput } from '../types';

const initial: LeadInput = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  profile_type: 'entreprise',
  need_type: 'conseil RH',
  preferred_contact: 'email',
  message: '',
  consent: false,
  source: 'site web'
};

export function ContactForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!form.consent) return setStatus('error');
    setStatus('loading');
    try {
      if (supabase) {
        const { error } = await supabase.from('leads').insert(form);
        if (error) throw error;
      }
      await sendLeadEmails(form);
      trackEvent('contact_submit', { need_type: form.need_type, profile_type: form.profile_type });
      if (form.need_type.includes('bilan')) trackEvent('bilan_request');
      if (['entreprise', 'dirigeant', 'manager'].includes(form.profile_type)) trackEvent('company_request');
      setStatus('success');
      setForm(initial);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  }

  const input = 'focus-ring w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm transition focus:border-sage-dark';
  return (
    <form onSubmit={submit} className="grid gap-4 rounded-2xl border border-ink/10 bg-white p-6 shadow-[0_18px_44px_rgba(31,51,71,0.06)]">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Prénom"><input required className={input} value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} /></Field>
        <Field label="Nom"><input required className={input} value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} /></Field>
        <Field label="Email"><input required type="email" className={input} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
        <Field label="Téléphone"><input className={input} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Profil"><Select value={form.profile_type} onChange={(v) => setForm({ ...form, profile_type: v })} options={['entreprise', 'dirigeant', 'manager', 'salarié', 'entrepreneur', 'étudiant', 'particulier', 'autre']} /></Field>
        <Field label="Besoin"><Select value={form.need_type} onChange={(v) => setForm({ ...form, need_type: v })} options={['conseil RH', 'accompagnement du changement', 'accompagnement individuel', 'bilan de compétences', 'formation / atelier', 'autre']} /></Field>
        <Field label="Préférence"><Select value={form.preferred_contact} onChange={(v) => setForm({ ...form, preferred_contact: v })} options={['téléphone', 'email', 'visioconférence']} /></Field>
      </div>
      <Field label="Message"><textarea required className={`${input} min-h-36`} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></Field>
      <label className="flex gap-3 text-sm leading-6 text-anthracite/75">
        <input required type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} />
        J’accepte que les informations transmises soient utilisées pour répondre à ma demande.
      </label>
      <button disabled={status === 'loading'} className="focus-ring rounded-full bg-ink px-6 py-3 font-semibold text-white shadow-[0_12px_28px_rgba(31,51,71,0.18)] transition hover:bg-sage-dark disabled:opacity-60">
        {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma demande'}
      </button>
      {status === 'success' ? <p className="rounded-lg bg-sage/25 p-4 text-sm text-ink">Merci pour votre message. Caroline Tillou Maratuech reviendra vers vous prochainement afin d’échanger sur votre situation et vos besoins.</p> : null}
      {status === 'error' ? <p className="rounded-lg bg-red-50 p-4 text-sm text-red-700">Le message n’a pas pu être transmis. Vous pouvez aussi écrire directement à contact@equinoxe-rh.fr.</p> : null}
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="grid gap-2 text-sm font-semibold text-ink">{label}{children}</label>;
}

function Select({ value, onChange, options }: { value: string; onChange: (value: string) => void; options: string[] }) {
  return <select className="focus-ring w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm transition focus:border-sage-dark" value={value} onChange={(e) => onChange(e.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select>;
}
