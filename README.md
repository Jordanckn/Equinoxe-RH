# Equinoxe Conseil RH

Site vitrine full-stack pour Caroline Tillou Maratuech et Equinoxe Conseil RH.

## Stack

- React, Vite, TypeScript
- Tailwind CSS
- React Router
- Supabase Auth, PostgreSQL, RLS
- EmailJS
- Netlify

## Installation

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Variables d’environnement

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_CONTACT_ID=
VITE_EMAILJS_TEMPLATE_CONFIRMATION_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

Sans Supabase, le site public fonctionne avec les contenus statiques. Le formulaire tente l’envoi EmailJS si les variables sont configurées.

## Supabase

1. Créer un projet Supabase.
2. Exécuter `supabase/schema.sql` dans le SQL editor.
3. Créer un utilisateur dans Supabase Auth.
4. Ajouter son profil admin :

```sql
insert into public.profiles (id, email, role)
values ('USER_UUID_ICI', 'email@exemple.fr', 'admin');
```

RLS est activé :

- lecture publique uniquement pour les contenus publiés ;
- insertion publique des leads avec consentement ;
- lecture, modification et suppression réservées aux admins authentifiés.

## EmailJS

Créer deux templates :

- `VITE_EMAILJS_TEMPLATE_CONTACT_ID` : notification à Caroline, objet “Nouvelle demande depuis le site Equinoxe Conseil RH”.
- `VITE_EMAILJS_TEMPLATE_CONFIRMATION_ID` : confirmation visiteur, objet “Votre demande a bien été transmise à Equinoxe Conseil RH”.

Variables disponibles dans les templates :

- `first_name`
- `last_name`
- `email`
- `phone`
- `profile_type`
- `need_type`
- `preferred_contact`
- `message`
- `date`

## Déploiement Netlify

Configuration incluse dans `netlify.toml` :

- build command : `npm run build`
- publish directory : `dist`
- redirects SPA vers `/index.html`
- headers sécurité de base
- cache long pour `/assets/*`

Ajouter les variables d’environnement dans Netlify avant le build.

## SEO / GEO

Le projet inclut :

- titres et meta descriptions dynamiques ;
- Open Graph et Twitter cards ;
- JSON-LD Organization, Person, ProfessionalService, Service, FAQPage et Article ;
- pages piliers services ;
- pages locales Toulouse, Occitanie et distance ;
- sitemap.xml ;
- robots.txt ;
- blocs “Réponse courte” pour les moteurs génératifs.

## Recommandations post-livraison

- Remplacer les témoignages placeholders par des avis réels validés.
- Renseigner le vrai lien LinkedIn.
- Faire valider les pages légales par un professionnel du droit.
- Ajouter Google Search Console et Bing Webmaster Tools.
- Prévoir une génération automatique du sitemap si le blog devient très actif.
- Ajouter Plausible, Google Analytics ou GTM uniquement après arbitrage RGPD.
