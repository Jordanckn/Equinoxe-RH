create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text default 'admin',
  created_at timestamptz default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  cover_image_url text,
  category text,
  tags text[] default '{}',
  seo_title text,
  seo_description text,
  status text default 'draft' check (status in ('draft', 'published')),
  featured boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  first_name text,
  last_name text,
  email text not null,
  phone text,
  profile_type text,
  need_type text,
  preferred_contact text,
  message text,
  consent boolean default false,
  source text,
  status text default 'new',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text,
  client_role text,
  client_type text,
  content text,
  rating integer check (rating between 1 and 5),
  is_placeholder boolean default true,
  status text default 'draft' check (status in ('draft', 'published')),
  display_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text,
  related_page text,
  status text default 'published' check (status in ('draft', 'published')),
  display_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value jsonb,
  is_public boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text,
  slug text unique,
  short_description text,
  long_description text,
  target_audience text,
  benefits text[] default '{}',
  status text default 'published' check (status in ('draft', 'published')),
  display_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists blog_posts_updated_at on public.blog_posts;
create trigger blog_posts_updated_at before update on public.blog_posts for each row execute function public.touch_updated_at();
drop trigger if exists leads_updated_at on public.leads;
create trigger leads_updated_at before update on public.leads for each row execute function public.touch_updated_at();
drop trigger if exists testimonials_updated_at on public.testimonials;
create trigger testimonials_updated_at before update on public.testimonials for each row execute function public.touch_updated_at();
drop trigger if exists faqs_updated_at on public.faqs;
create trigger faqs_updated_at before update on public.faqs for each row execute function public.touch_updated_at();
drop trigger if exists site_settings_updated_at on public.site_settings;
create trigger site_settings_updated_at before update on public.site_settings for each row execute function public.touch_updated_at();
drop trigger if exists services_updated_at on public.services;
create trigger services_updated_at before update on public.services for each row execute function public.touch_updated_at();

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.blog_posts enable row level security;
alter table public.leads enable row level security;
alter table public.testimonials enable row level security;
alter table public.faqs enable row level security;
alter table public.site_settings enable row level security;
alter table public.services enable row level security;

create policy "profiles_admin_all" on public.profiles for all using (public.is_admin()) with check (public.is_admin());

create policy "blog_public_read_published" on public.blog_posts for select using (status = 'published');
create policy "blog_admin_all" on public.blog_posts for all using (public.is_admin()) with check (public.is_admin());

create policy "leads_public_insert" on public.leads for insert with check (consent = true);
create policy "leads_admin_all" on public.leads for all using (public.is_admin()) with check (public.is_admin());

create policy "testimonials_public_read_published" on public.testimonials for select using (status = 'published');
create policy "testimonials_admin_all" on public.testimonials for all using (public.is_admin()) with check (public.is_admin());

create policy "faqs_public_read_published" on public.faqs for select using (status = 'published');
create policy "faqs_admin_all" on public.faqs for all using (public.is_admin()) with check (public.is_admin());

create policy "settings_public_read_public" on public.site_settings for select using (is_public = true);
create policy "settings_admin_all" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

create policy "services_public_read_published" on public.services for select using (status = 'published');
create policy "services_admin_all" on public.services for all using (public.is_admin()) with check (public.is_admin());

insert into public.site_settings (key, value, is_public) values
('phone', '"06 87 02 25 08"', true),
('email', '"contact@equinoxe-rh.fr"', true),
('hours', '"9h à 18h sauf samedi"', true),
('linkedin', '"https://www.linkedin.com/"', true),
('address', '"35 chemin de Buissaison, 31180 Lapeyrouse-Fossat"', true),
('main_cta', '"Échanger sur votre besoin"', true)
on conflict (key) do nothing;

insert into public.blog_posts (title, slug, excerpt, content, category, tags, seo_title, seo_description, status, featured, published_at) values
('Comment accompagner le changement en entreprise sans épuiser les équipes ?', 'accompagner-changement-entreprise-sans-epuiser-equipes', 'Un changement réussi repose autant sur la méthode que sur l’attention portée aux personnes.', 'Le changement en entreprise ne se limite pas à un calendrier de déploiement. Il transforme les repères, les habitudes et les responsabilités.', 'Accompagnement du changement', array['changement','management','équipes'], 'Accompagner le changement en entreprise sans épuiser les équipes', 'Repères RH et managériaux pour accompagner le changement.', 'published', true, now()),
('Pourquoi faire appel à une consultante RH à Toulouse ?', 'pourquoi-faire-appel-consultante-rh-toulouse', 'Une consultante RH externe aide à prendre du recul.', 'Faire appel à une consultante RH à Toulouse permet de bénéficier d’un regard extérieur et contextualisé.', 'Conseil RH', array['Toulouse','conseil RH'], 'Consultante RH à Toulouse', 'Comprendre l’intérêt d’un accompagnement RH externe à Toulouse.', 'published', false, now()),
('Bilan de compétences : à quel moment se poser les bonnes questions ?', 'bilan-de-competences-moment-se-poser-bonnes-questions', 'Le bilan de compétences aide à clarifier une trajectoire professionnelle.', 'Un bilan de compétences peut être utile lors d’une perte de sens, d’une envie d’évolution ou d’une reconversion.', 'Bilan de compétences', array['bilan de compétences','transition'], 'Bilan de compétences : quand se poser les bonnes questions ?', 'Identifier les moments où un bilan de compétences peut aider.', 'published', false, now())
on conflict (slug) do nothing;

insert into public.testimonials (client_name, client_role, client_type, content, rating, is_placeholder, status, display_order) values
('Témoignage à remplacer', 'Direction de PME', 'Entreprise', 'Avis placeholder administrable depuis Supabase. Remplacer par un témoignage réel ou masquer la section.', 5, true, 'published', 1),
('Témoignage à remplacer', 'Manager accompagné', 'Individuel', 'Avis placeholder administrable depuis Supabase. Il permet de valider la mise en page avant publication.', 5, true, 'published', 2);

insert into public.faqs (question, answer, category, related_page, status, display_order) values
('Qui est Caroline Tillou Maratuech ?', 'Caroline Tillou Maratuech est consultante RH, coach professionnelle, docteure en gestion des ressources humaines et fondatrice d’Equinoxe Conseil RH.', 'Général', null, 'published', 1),
('Qu’est-ce qu’Equinoxe Conseil RH ?', 'Equinoxe Conseil RH accompagne les entreprises, dirigeants, managers et particuliers dans leurs enjeux RH, managériaux et professionnels.', 'Général', null, 'published', 2),
('Intervenez-vous à Toulouse uniquement ?', 'Non. Les interventions ont lieu à Toulouse, en Occitanie et partout en France à distance.', 'Modalités', null, 'published', 3),
('Comment prendre contact ?', 'Vous pouvez utiliser le formulaire de contact, appeler le 06 87 02 25 08 ou écrire à contact@equinoxe-rh.fr.', 'Contact', null, 'published', 10);
