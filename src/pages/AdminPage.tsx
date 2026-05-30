import { useEffect, useState } from 'react';
import { LogOut, Save } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { slugify } from '../lib/slugify';
import type { BlogPost, FAQ, Testimonial } from '../types';

type Tab = 'dashboard' | 'articles' | 'leads' | 'testimonials' | 'faqs' | 'settings';

export function AdminPage() {
  const [session, setSession] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState<Tab>('dashboard');

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(Boolean(data.session)));
    const { data } = supabase.auth.onAuthStateChange((_event, current) => setSession(Boolean(current)));
    return () => data.subscription.unsubscribe();
  }, []);

  if (!supabase) return <AdminShell><p>Configurez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY pour activer l’administration.</p></AdminShell>;
  const client = supabase;

  if (!session) {
    return (
      <AdminShell>
        <form className="mx-auto mt-20 grid max-w-md gap-4 rounded-lg bg-white p-8 shadow-soft" onSubmit={async (e) => { e.preventDefault(); await client.auth.signInWithPassword({ email, password }); }}>
          <h1 className="font-serif text-3xl text-ink">Administration</h1>
          <input className="rounded-lg border p-3" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="rounded-lg border p-3" type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="rounded-full bg-ink px-5 py-3 font-semibold text-white">Connexion</button>
        </form>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="grid min-h-screen md:grid-cols-[260px_1fr]">
        <aside className="border-r border-ink/10 bg-white p-5">
          <p className="font-serif text-2xl text-ink">Equinoxe Admin</p>
          <nav className="mt-8 grid gap-2">
            {(['dashboard', 'articles', 'leads', 'testimonials', 'faqs', 'settings'] as Tab[]).map((item) => <button key={item} onClick={() => setTab(item)} className={`rounded-lg px-4 py-3 text-left text-sm font-semibold ${tab === item ? 'bg-sage/25 text-ink' : 'text-anthracite/70'}`}>{labels[item]}</button>)}
          </nav>
          <button onClick={() => client.auth.signOut()} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink"><LogOut size={16} /> Déconnexion</button>
        </aside>
        <main className="p-6 md:p-10">
          {tab === 'dashboard' && <Dashboard />}
          {tab === 'articles' && <BlogAdmin />}
          {tab === 'leads' && <TableAdmin table="leads" title="Leads entrants" />}
          {tab === 'testimonials' && <TestimonialsAdmin />}
          {tab === 'faqs' && <FaqAdmin />}
          {tab === 'settings' && <SettingsAdmin />}
        </main>
      </div>
    </AdminShell>
  );
}

const labels: Record<Tab, string> = { dashboard: 'Tableau de bord', articles: 'Articles', leads: 'Leads', testimonials: 'Témoignages', faqs: 'FAQ', settings: 'Paramètres' };

function AdminShell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-rosé text-anthracite">{children}</div>;
}

function Dashboard() {
  return <div><h1 className="font-serif text-4xl text-ink">Tableau de bord</h1><div className="mt-8 grid gap-4 md:grid-cols-4">{['Leads', 'Articles', 'Avis publiés', 'FAQ'].map((k) => <div key={k} className="rounded-lg bg-white p-6 shadow-soft"><p className="text-sm text-anthracite/60">{k}</p><p className="mt-3 text-3xl font-semibold text-ink">-</p></div>)}</div></div>;
}

function BlogAdmin() {
  const [rows, setRows] = useState<BlogPost[]>([]);
  const [form, setForm] = useState<Partial<BlogPost>>({ title: '', slug: '', excerpt: '', content: '', category: 'Conseil RH', tags: [], status: 'draft', featured: false });
  useEffect(() => { supabase?.from('blog_posts').select('*').order('created_at', { ascending: false }).then(({ data }) => setRows((data ?? []) as BlogPost[])); }, []);
  async function save() {
    if (!supabase || !form.title) return;
    const payload = { ...form, slug: form.slug || slugify(form.title), tags: Array.isArray(form.tags) ? form.tags : [], updated_at: new Date().toISOString() };
    await supabase.from('blog_posts').upsert(payload);
    location.reload();
  }
  return <Crud title="Articles de blog" onSave={save}><Input label="Titre" value={form.title} onChange={(v) => setForm({ ...form, title: v, slug: slugify(v) })} /><Input label="Slug" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} /><Input label="Extrait" value={form.excerpt} onChange={(v) => setForm({ ...form, excerpt: v })} /><Textarea label="Contenu" value={form.content} onChange={(v) => setForm({ ...form, content: v })} /><Rows rows={rows} /></Crud>;
}

function TestimonialsAdmin() {
  const [rows, setRows] = useState<Testimonial[]>([]);
  const [form, setForm] = useState<Partial<Testimonial>>({ client_name: '', client_role: '', client_type: '', content: '', rating: 5, status: 'draft', is_placeholder: false, display_order: 1 });
  useEffect(() => { supabase?.from('testimonials').select('*').order('display_order').then(({ data }) => setRows((data ?? []) as Testimonial[])); }, []);
  async function save() { if (supabase) { await supabase.from('testimonials').insert(form); location.reload(); } }
  return <Crud title="Témoignages" onSave={save}><Input label="Nom" value={form.client_name} onChange={(v) => setForm({ ...form, client_name: v })} /><Input label="Fonction" value={form.client_role} onChange={(v) => setForm({ ...form, client_role: v })} /><Textarea label="Texte" value={form.content} onChange={(v) => setForm({ ...form, content: v })} /><Rows rows={rows} /></Crud>;
}

function FaqAdmin() {
  const [rows, setRows] = useState<FAQ[]>([]);
  const [form, setForm] = useState<Partial<FAQ>>({ question: '', answer: '', category: 'Général', status: 'published', display_order: 1 });
  useEffect(() => { supabase?.from('faqs').select('*').order('display_order').then(({ data }) => setRows((data ?? []) as FAQ[])); }, []);
  async function save() { if (supabase) { await supabase.from('faqs').insert(form); location.reload(); } }
  return <Crud title="FAQ" onSave={save}><Input label="Question" value={form.question} onChange={(v) => setForm({ ...form, question: v })} /><Textarea label="Réponse" value={form.answer} onChange={(v) => setForm({ ...form, answer: v })} /><Rows rows={rows} /></Crud>;
}

function SettingsAdmin() {
  return <div><h1 className="font-serif text-4xl text-ink">Paramètres du site</h1><p className="mt-4 text-anthracite/70">Table site_settings prête pour téléphone, email, horaires, LinkedIn, adresse, CTA principal et activation de sections.</p></div>;
}

function TableAdmin({ table, title }: { table: string; title: string }) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  useEffect(() => { supabase?.from(table).select('*').order('created_at', { ascending: false }).then(({ data }) => setRows((data ?? []) as Record<string, unknown>[])); }, [table]);
  return <div><h1 className="font-serif text-4xl text-ink">{title}</h1><Rows rows={rows} /></div>;
}

function Crud({ title, children, onSave }: { title: string; children: React.ReactNode; onSave: () => void }) {
  return <div><div className="flex items-center justify-between gap-4"><h1 className="font-serif text-4xl text-ink">{title}</h1><button onClick={onSave} className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-semibold text-white"><Save size={16} /> Enregistrer</button></div><div className="mt-8 grid gap-4 rounded-lg bg-white p-6 shadow-soft">{children}</div></div>;
}

function Input({ label, value, onChange }: { label: string; value?: string; onChange: (v: string) => void }) {
  return <label className="grid gap-2 text-sm font-semibold text-ink">{label}<input className="rounded-lg border p-3" value={value ?? ''} onChange={(e) => onChange(e.target.value)} /></label>;
}

function Textarea({ label, value, onChange }: { label: string; value?: string; onChange: (v: string) => void }) {
  return <label className="grid gap-2 text-sm font-semibold text-ink">{label}<textarea className="min-h-32 rounded-lg border p-3" value={value ?? ''} onChange={(e) => onChange(e.target.value)} /></label>;
}

function Rows({ rows }: { rows: Record<string, unknown>[] }) {
  return <div className="mt-6 overflow-auto rounded-lg border"><table className="w-full min-w-[720px] text-left text-sm"><tbody>{rows.map((row, i) => <tr key={String(row.id ?? i)} className="border-b"><td className="p-3 font-semibold text-ink">{String(row.title ?? row.question ?? row.client_name ?? row.email ?? row.key ?? row.id)}</td><td className="p-3 text-anthracite/60">{String(row.status ?? row.need_type ?? '')}</td></tr>)}</tbody></table></div>;
}
