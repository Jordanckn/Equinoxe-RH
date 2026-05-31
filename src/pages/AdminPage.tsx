import { useEffect, useState } from 'react';
import { LogOut, Save } from 'lucide-react';
import { hasSupabaseConfig, supabase } from '../lib/supabaseClient';
import { slugify } from '../lib/slugify';
import { faqs, posts, testimonials } from '../data/content';
import type { BlogPost, FAQ, Testimonial } from '../types';

type Tab = 'dashboard' | 'articles' | 'leads' | 'testimonials' | 'faqs' | 'settings';

export function AdminPage() {
  const [session, setSession] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState<Tab>('dashboard');
  const localMode = !hasSupabaseConfig || !supabase;

  useEffect(() => {
    if (!supabase) {
      setSession(true);
      return;
    }
    supabase.auth.getSession().then(({ data }) => setSession(Boolean(data.session)));
    const { data } = supabase.auth.onAuthStateChange((_event, current) => setSession(Boolean(current)));
    return () => data.subscription.unsubscribe();
  }, []);

  const client = supabase;

  if (!localMode && client && !session) {
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
          <p className={`mt-3 rounded-full px-3 py-1.5 text-xs font-bold ${localMode ? 'bg-rosé text-sage-dark' : 'bg-sage/25 text-ink'}`}>
            {localMode ? 'Mode local - Supabase à configurer' : 'Connecté à Supabase'}
          </p>
          <nav className="mt-8 grid gap-2">
            {(['dashboard', 'articles', 'leads', 'testimonials', 'faqs', 'settings'] as Tab[]).map((item) => <button key={item} onClick={() => setTab(item)} className={`rounded-lg px-4 py-3 text-left text-sm font-semibold ${tab === item ? 'bg-sage/25 text-ink' : 'text-anthracite/70'}`}>{labels[item]}</button>)}
          </nav>
          {!localMode && client ? <button onClick={() => client.auth.signOut()} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink"><LogOut size={16} /> Déconnexion</button> : null}
        </aside>
        <main className="p-6 md:p-10">
          {localMode ? <LocalModeNotice /> : null}
          {tab === 'dashboard' && <Dashboard localMode={localMode} />}
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

function LocalModeNotice() {
  return (
    <div className="mb-6 rounded-2xl border border-sage-dark/15 bg-white p-5 shadow-soft">
      <p className="font-serif text-xl font-semibold text-ink">Administration prête pour Supabase</p>
      <p className="mt-2 text-sm leading-6 text-anthracite/75">
        Les clés Supabase ne sont pas encore configurées. Vous pouvez entrer dans l’admin, préparer des contenus en local et vérifier l’interface. Dès que <code>VITE_SUPABASE_URL</code> et <code>VITE_SUPABASE_ANON_KEY</code> seront ajoutées, cette page utilisera l’authentification et synchronisera les tables Supabase.
      </p>
    </div>
  );
}

function Dashboard({ localMode }: { localMode: boolean }) {
  const stats = [
    ['Leads', localMode ? 'local' : '-'],
    ['Articles', String(loadLocalRows<BlogPost>('admin_blog_posts', posts).length)],
    ['Avis publiés', String(loadLocalRows<Testimonial>('admin_testimonials', testimonials).filter((item) => item.status === 'published').length)],
    ['FAQ', String(loadLocalRows<FAQ>('admin_faqs', faqs).length)]
  ];
  return <div><h1 className="font-serif text-4xl text-ink">Tableau de bord</h1><div className="mt-8 grid gap-4 md:grid-cols-4">{stats.map(([k, value]) => <div key={k} className="rounded-lg bg-white p-6 shadow-soft"><p className="text-sm text-anthracite/60">{k}</p><p className="mt-3 text-3xl font-semibold text-ink">{value}</p></div>)}</div></div>;
}

function BlogAdmin() {
  const [rows, setRows] = useState<BlogPost[]>(() => loadLocalRows('admin_blog_posts', posts));
  const [form, setForm] = useState<Partial<BlogPost>>({ title: '', slug: '', excerpt: '', content: '', category: 'Conseil RH', tags: [], status: 'draft', featured: false });
  useEffect(() => { supabase?.from('blog_posts').select('*').order('created_at', { ascending: false }).then(({ data }) => data?.length ? setRows(data as BlogPost[]) : null); }, []);
  async function save() {
    if (!form.title) return;
    const payload = { ...form, id: form.id ?? `local-${Date.now()}`, slug: form.slug || slugify(form.title), tags: Array.isArray(form.tags) ? form.tags : [], updated_at: new Date().toISOString() } as BlogPost;
    if (supabase) {
      await supabase.from('blog_posts').upsert(payload);
      const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      setRows((data ?? []) as BlogPost[]);
      return;
    }
    const nextRows = [payload, ...rows.filter((row) => row.id !== payload.id)];
    setRows(nextRows);
    saveLocalRows('admin_blog_posts', nextRows);
  }
  return <Crud title="Articles de blog" onSave={save}><Input label="Titre" value={form.title} onChange={(v) => setForm({ ...form, title: v, slug: slugify(v) })} /><Input label="Slug" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} /><Input label="Extrait" value={form.excerpt} onChange={(v) => setForm({ ...form, excerpt: v })} /><Textarea label="Contenu" value={form.content} onChange={(v) => setForm({ ...form, content: v })} /><Rows rows={rows} /></Crud>;
}

function TestimonialsAdmin() {
  const [rows, setRows] = useState<Testimonial[]>(() => loadLocalRows('admin_testimonials', testimonials));
  const [form, setForm] = useState<Partial<Testimonial>>({ client_name: '', client_role: '', client_type: '', content: '', rating: 5, status: 'draft', is_placeholder: false, display_order: 1 });
  useEffect(() => { supabase?.from('testimonials').select('*').order('display_order').then(({ data }) => data?.length ? setRows(data as Testimonial[]) : null); }, []);
  async function save() {
    if (!form.client_name) return;
    const payload = { ...form, id: form.id ?? `local-${Date.now()}` } as Testimonial;
    if (supabase) {
      await supabase.from('testimonials').insert(payload);
      const { data } = await supabase.from('testimonials').select('*').order('display_order');
      setRows((data ?? []) as Testimonial[]);
      return;
    }
    const nextRows = [payload, ...rows];
    setRows(nextRows);
    saveLocalRows('admin_testimonials', nextRows);
  }
  return <Crud title="Témoignages" onSave={save}><Input label="Nom" value={form.client_name} onChange={(v) => setForm({ ...form, client_name: v })} /><Input label="Fonction" value={form.client_role} onChange={(v) => setForm({ ...form, client_role: v })} /><Textarea label="Texte" value={form.content} onChange={(v) => setForm({ ...form, content: v })} /><Rows rows={rows} /></Crud>;
}

function FaqAdmin() {
  const [rows, setRows] = useState<FAQ[]>(() => loadLocalRows('admin_faqs', faqs));
  const [form, setForm] = useState<Partial<FAQ>>({ question: '', answer: '', category: 'Général', status: 'published', display_order: 1 });
  useEffect(() => { supabase?.from('faqs').select('*').order('display_order').then(({ data }) => data?.length ? setRows(data as FAQ[]) : null); }, []);
  async function save() {
    if (!form.question || !form.answer) return;
    const payload = { ...form, id: form.id ?? `local-${Date.now()}` } as FAQ;
    if (supabase) {
      await supabase.from('faqs').insert(payload);
      const { data } = await supabase.from('faqs').select('*').order('display_order');
      setRows((data ?? []) as FAQ[]);
      return;
    }
    const nextRows = [payload, ...rows];
    setRows(nextRows);
    saveLocalRows('admin_faqs', nextRows);
  }
  return <Crud title="FAQ" onSave={save}><Input label="Question" value={form.question} onChange={(v) => setForm({ ...form, question: v })} /><Textarea label="Réponse" value={form.answer} onChange={(v) => setForm({ ...form, answer: v })} /><Rows rows={rows} /></Crud>;
}

function SettingsAdmin() {
  return <div><h1 className="font-serif text-4xl text-ink">Paramètres du site</h1><div className="mt-6 rounded-2xl bg-white p-6 shadow-soft"><p className="text-anthracite/70">Table <code>site_settings</code> prête pour téléphone, email, horaires, LinkedIn, adresse, CTA principal et activation de sections.</p><div className="mt-5 grid gap-2 text-sm text-anthracite/75"><p><strong>Tables prévues :</strong> blog_posts, testimonials, faqs, leads, site_settings.</p><p><strong>Variables à ajouter :</strong> VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.</p><p><strong>Comportement attendu :</strong> sans variables, l’admin fonctionne en local ; avec variables, les données sont lues et écrites dans Supabase.</p></div></div></div>;
}

function TableAdmin({ table, title }: { table: string; title: string }) {
  const [rows, setRows] = useState<Record<string, unknown>[]>(() => loadLocalRows(`admin_${table}`, []));
  useEffect(() => { supabase?.from(table).select('*').order('created_at', { ascending: false }).then(({ data }) => setRows((data ?? []) as Record<string, unknown>[])); }, [table]);
  return <div><h1 className="font-serif text-4xl text-ink">{title}</h1>{!supabase ? <p className="mt-4 rounded-2xl bg-white p-5 text-sm leading-6 text-anthracite/75 shadow-soft">Les leads seront synchronisés ici dès que Supabase sera configuré. Le formulaire de contact est déjà prêt à insérer dans la table <code>leads</code>.</p> : null}<Rows rows={rows} /></div>;
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
  if (!rows.length) return <p className="mt-6 rounded-lg border bg-white p-4 text-sm text-anthracite/65">Aucune donnée pour le moment.</p>;
  return <div className="mt-6 overflow-auto rounded-lg border"><table className="w-full min-w-[720px] text-left text-sm"><tbody>{rows.map((row, i) => <tr key={String(row.id ?? i)} className="border-b"><td className="p-3 font-semibold text-ink">{String(row.title ?? row.question ?? row.client_name ?? row.email ?? row.key ?? row.id)}</td><td className="p-3 text-anthracite/60">{String(row.status ?? row.need_type ?? '')}</td></tr>)}</tbody></table></div>;
}

function loadLocalRows<T>(key: string, fallback: T[]): T[] {
  if (typeof localStorage === 'undefined') return fallback;
  const saved = localStorage.getItem(key);
  if (!saved) return fallback;
  try {
    return JSON.parse(saved) as T[];
  } catch {
    return fallback;
  }
}

function saveLocalRows<T>(key: string, rows: T[]) {
  localStorage.setItem(key, JSON.stringify(rows));
}
