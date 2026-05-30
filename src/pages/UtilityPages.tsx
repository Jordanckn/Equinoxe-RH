import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { BarChart3, CheckCircle2, Lock, MessageCircleQuestion, Phone, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { TestimonialCard } from '../components/Cards';
import { FAQAccordion } from '../components/FAQAccordion';
import { SEOHead } from '../components/SEOHead';
import { ButtonLink, Container, PageHeader, Section } from '../components/ui';
import { faqs, services, testimonials, contactInfo } from '../data/content';
import { faqSchema } from '../lib/schemaMarkup';
import { useSupabaseRows } from '../hooks/useSupabaseRows';
import type { FAQ, Testimonial } from '../types';

const COOKIE_CONSENT_KEY = 'equinoxe_cookie_consent';
const COOKIE_PREFERENCES_KEY = 'equinoxe_cookie_preferences';

export function FAQPage() {
  const liveFaqs = useSupabaseRows<FAQ>('faqs', faqs, 'display_order');
  return (
    <>
      <SEOHead
        title="FAQ Conseil RH & Coaching à Toulouse | Equinoxe Conseil RH"
        description="Questions fréquentes sur Equinoxe Conseil RH : accompagnements RH, coaching, bilan de compétences, modalités et prise de contact."
        schema={faqSchema(liveFaqs)}
      />
      <PageHeader
        eyebrow="Questions fréquentes"
        title="Tout ce que vous voulez savoir"
        text="Retrouvez ici des réponses claires sur les accompagnements proposés, les publics concernés, les modalités et les façons de prendre contact."
      />
      <Section className="bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.4fr] items-start">
            <FAQAccordion items={liveFaqs} grouped />
            <aside className="space-y-6 lg:sticky lg:top-24">
              <div className="rounded-2xl border border-sand bg-white p-6 shadow-soft">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-sage px-2.5 py-2.5 text-sage-dark">
                  <MessageCircleQuestion size={22} />
                </div>
                <h2 className="font-serif text-xl font-semibold text-ink">Vous ne trouvez pas la réponse ?</h2>
                <p className="mt-3 text-sm leading-6 text-anthracite/75">Caroline répond personnellement à chaque demande. Un premier échange permet de clarifier le cadre et le besoin.</p>
                <div className="mt-5 space-y-3">
                  <ButtonLink to="/contact" className="w-full justify-center">Envoyer un message</ButtonLink>
                  <a
                    href={`tel:${contactInfo.phoneHref}`}
                    className="flex items-center justify-center gap-2 rounded-full border border-sand px-5 py-2.5 text-sm font-bold text-ink hover:border-sage-dark hover:text-sage-dark transition-all duration-200"
                  >
                    <Phone size={15} />
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
              <div className="rounded-2xl border border-sand bg-sage/20 p-6">
                <p className="text-sm font-bold uppercase tracking-[0.15em] text-sage-dark mb-3">Accompagnements</p>
                <div className="space-y-2">
                  {services.map((s) => (
                    <a key={s.slug} href={`/services/${s.slug}`} className="block text-sm text-anthracite/80 hover:text-sage-dark transition-colors py-1 border-b border-sand last:border-0">
                      {s.title}
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}

export function TestimonialsPage() {
  const liveTestimonials = useSupabaseRows<Testimonial>('testimonials', testimonials, 'display_order');
  return <><SEOHead title="Témoignages | Equinoxe Conseil RH" description="Avis et témoignages administrables concernant les accompagnements Equinoxe Conseil RH." /><PageHeader eyebrow="Témoignages" title="Retours d’accompagnement" text="Les témoignages placeholders peuvent être remplacés ou masqués depuis l’administration Supabase." /><Section className="bg-white"><Container><div className="grid gap-6 md:grid-cols-2">{liveTestimonials.map((item) => <TestimonialCard key={item.id} testimonial={item} />)}</div></Container></Section></>;
}

export function LocalSeoPage({ kind }: { kind: 'rh-toulouse' | 'coaching-toulouse' | 'bilan-toulouse' | 'changement-occitanie' | 'distance' }) {
  const map = {
    'rh-toulouse': ['Conseil RH Toulouse', 'Conseil RH à Toulouse pour dirigeants, managers, TPE, PME et structures en transformation.', 'conseil RH à Toulouse'],
    'coaching-toulouse': ['Coaching professionnel Toulouse', 'Coaching professionnel et accompagnement individuel à Toulouse pour clarifier posture, décisions et transitions.', 'coaching professionnel à Toulouse'],
    'bilan-toulouse': ['Bilan de compétences Toulouse', 'Bilan de compétences à Toulouse pour clarifier un projet professionnel dans un cadre confidentiel.', 'bilan de compétences à Toulouse'],
    'changement-occitanie': ['Accompagnement du changement Occitanie', 'Accompagnement du changement en Occitanie pour les organisations et collectifs en transformation.', 'accompagnement du changement en Occitanie'],
    distance: ['Conseil RH à distance', 'Conseil RH à distance en visioconférence pour dirigeants, managers et professionnels partout en France.', 'conseil RH à distance']
  }[kind];
  return (
    <>
      <SEOHead title={`${map[0]} | Equinoxe Conseil RH`} description={map[1]} />
      <PageHeader eyebrow="Page locale" title={map[0]} text={map[1]} />
      <Section className="bg-white">
        <Container className="prose-equinoxe max-w-4xl">
          <p><strong>Réponse courte :</strong> Equinoxe Conseil RH propose un {map[2]} avec Caroline Tillou Maratuech, consultante RH, coach professionnelle et docteure en gestion des ressources humaines.</p>
          <p>L’accompagnement s’adresse aux entreprises, dirigeants, managers, salariés, entrepreneurs, étudiants et particuliers qui souhaitent clarifier une situation RH, managériale ou professionnelle.</p>
          <h2>Accompagnements liés</h2>
          <ul>{services.map((service) => <li key={service.slug}>{service.title}</li>)}</ul>
          <div className="not-prose mt-8"><ButtonLink to="/contact">Échanger sur votre besoin</ButtonLink></div>
        </Container>
      </Section>
    </>
  );
}

export function LegalPage({ type }: { type: 'mentions' | 'privacy' | 'cookies' | 'cgv' }) {
  if (type === 'cookies') return <CookiesPage />;
  if (type === 'privacy') return <PrivacyPage />;
  if (type === 'cgv') return <TermsPage />;

  const title = { mentions: 'Mentions légales', privacy: 'Politique de confidentialité', cookies: 'Cookies', cgv: 'CGV / CGU' }[type];
  return (
    <>
      <SEOHead title={`${title} | Equinoxe Conseil RH`} description={`${title} du site Equinoxe Conseil RH.`} />
      <PageHeader eyebrow="Informations légales" title={title} text="Ces contenus constituent une base propre et doivent être validés par un professionnel du droit avant publication définitive." />
      <Section className="bg-white"><Container className="prose-equinoxe max-w-4xl">
        <p>Éditeur : Caroline Tillou Maratuech, Equinoxe Conseil RH. SIRET : 788 556 488 00039. Adresse : 35 chemin de Buissaison, 31180 Lapeyrouse-Fossat, France. Contact : contact@equinoxe-rh.fr, 06 87 02 25 08.</p>
        <p>Hébergement : Netlify. Base de données et authentification : Supabase. Les demandes envoyées via le formulaire sont utilisées uniquement pour répondre aux personnes concernées et peuvent être conservées à titre indicatif pendant une durée proportionnée au suivi de la relation.</p>
        <p>Vous pouvez demander l’accès, la rectification ou la suppression de vos données en écrivant à contact@equinoxe-rh.fr. Aucun outil de tracking n’est imposé par défaut. Des cookies techniques peuvent être nécessaires au bon fonctionnement du site.</p>
      </Container></Section>
    </>
  );
}

function PrivacyPage() {
  return (
    <>
      <SEOHead
        title="Politique de confidentialité | Equinoxe Conseil RH"
        description="Politique de confidentialité du site Equinoxe Conseil RH : données collectées, finalités, durées de conservation et droits RGPD."
      />
      <PageHeader
        eyebrow="Données personnelles"
        title="Politique de confidentialité"
        text="Cette politique explique comment Equinoxe Conseil RH collecte, utilise et protège les données personnelles transmises via le site."
      />
      <Section className="bg-ivory">
        <Container className="grid gap-8 lg:grid-cols-[0.72fr_0.28fr] lg:items-start">
          <div className="prose-equinoxe max-w-none rounded-2xl border border-sand bg-white p-7 shadow-[0_22px_70px_rgba(14,27,41,0.06)] md:p-10">
            <p><strong>Dernière mise à jour :</strong> 30 mai 2026.</p>
            <h2>1. Responsable du traitement</h2>
            <p>Le responsable du traitement est Caroline Tillou Maratuech, Equinoxe Conseil RH, SIRET 788 556 488 00039, située 35 chemin de Buissaison, 31180 Lapeyrouse-Fossat, France.</p>
            <p>Contact : <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a> - {contactInfo.phone}.</p>

            <h2>2. Données collectées</h2>
            <p>Les données susceptibles d’être collectées sont celles transmises volontairement via le formulaire de contact ou les échanges directs : identité, coordonnées, profil professionnel, nature du besoin, message libre et préférences de contact.</p>
            <p>Le site peut également traiter des données techniques nécessaires à son fonctionnement : adresse IP, logs techniques, navigateur, terminal utilisé et préférences cookies.</p>

            <h2>3. Finalités</h2>
            <p>Les données sont utilisées pour répondre aux demandes, préparer un premier échange, assurer le suivi de la relation, gérer les obligations administratives et améliorer le fonctionnement du site lorsque l’utilisateur y consent.</p>

            <h2>4. Bases légales</h2>
            <p>Les traitements reposent selon les cas sur le consentement de la personne, l’exécution de mesures précontractuelles, l’intérêt légitime à répondre aux sollicitations reçues et les obligations légales applicables à l’activité.</p>

            <h2>5. Destinataires</h2>
            <p>Les données sont destinées à Equinoxe Conseil RH. Elles peuvent être techniquement hébergées ou traitées par des prestataires nécessaires au fonctionnement du site et des outils associés, notamment Netlify pour l’hébergement et Supabase pour certaines données applicatives.</p>
            <p>Les données ne sont pas vendues, louées ou transmises à des tiers à des fins commerciales.</p>

            <h2>6. Durées de conservation</h2>
            <p>Les demandes de contact sont conservées pendant une durée proportionnée au suivi de la relation, puis supprimées ou archivées lorsque leur conservation n’est plus nécessaire. Les données liées à une relation contractuelle peuvent être conservées pendant les durées légales applicables.</p>

            <h2>7. Droits des personnes</h2>
            <p>Conformément au RGPD, vous pouvez demander l’accès, la rectification, l’effacement, la limitation ou l’opposition au traitement de vos données. Lorsque le traitement repose sur votre consentement, vous pouvez le retirer à tout moment.</p>
            <p>Pour exercer vos droits : <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>. En cas de difficulté, vous pouvez saisir la CNIL.</p>

            <h2>8. Sécurité</h2>
            <p>Equinoxe Conseil RH met en œuvre des mesures raisonnables pour protéger les données contre l’accès non autorisé, la perte, l’altération ou la divulgation. Aucun système n’étant infaillible, seules les données nécessaires doivent être transmises via les formulaires.</p>

            <h2>9. Cookies</h2>
            <p>Les cookies et préférences de traceurs sont détaillés sur la page dédiée. Vous pouvez modifier vos choix à tout moment depuis la page Cookies.</p>
          </div>

          <aside className="rounded-2xl border border-sand bg-white p-6 shadow-[0_18px_50px_rgba(14,27,41,0.05)] lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-sage-dark">Vos droits</p>
            <p className="mt-3 text-sm leading-6 text-anthracite/75">Pour toute demande concernant vos données personnelles, écrivez directement à Equinoxe Conseil RH.</p>
            <a href={`mailto:${contactInfo.email}`} className="mt-5 inline-flex w-full justify-center rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-sage-dark">
              Contacter le responsable
            </a>
          </aside>
        </Container>
      </Section>
    </>
  );
}

function TermsPage() {
  return (
    <>
      <SEOHead
        title="CGV / CGU | Equinoxe Conseil RH"
        description="Conditions générales d’utilisation et de vente du site Equinoxe Conseil RH."
      />
      <PageHeader
        eyebrow="Cadre contractuel"
        title="CGV / CGU"
        text="Ces conditions encadrent l’utilisation du site et les principes généraux applicables aux accompagnements proposés par Equinoxe Conseil RH."
      />
      <Section className="bg-ivory">
        <Container className="prose-equinoxe max-w-5xl rounded-2xl border border-sand bg-white p-7 shadow-[0_22px_70px_rgba(14,27,41,0.06)] md:p-10">
          <p><strong>Dernière mise à jour :</strong> 30 mai 2026.</p>
          <h2>1. Identification</h2>
          <p>Le présent site est édité par Caroline Tillou Maratuech, Equinoxe Conseil RH, SIRET 788 556 488 00039, 35 chemin de Buissaison, 31180 Lapeyrouse-Fossat, France.</p>

          <h2>2. Objet du site</h2>
          <p>Le site présente les activités de conseil RH, coaching professionnel, accompagnement du changement, ateliers, formations et bilan de compétences proposés par Equinoxe Conseil RH.</p>
          <p>Les informations publiées ont une vocation informative. Elles ne constituent pas un engagement contractuel automatique ni un conseil personnalisé sans échange préalable.</p>

          <h2>3. Accès et utilisation</h2>
          <p>L’utilisateur s’engage à utiliser le site de manière loyale, à ne pas perturber son fonctionnement et à ne pas transmettre de contenu illicite, injurieux, frauduleux ou contraire aux droits de tiers.</p>

          <h2>4. Demandes de contact</h2>
          <p>L’envoi d’un formulaire de contact ne vaut pas acceptation automatique d’une mission. Un premier échange permet de clarifier le besoin, le cadre d’intervention, les modalités, les délais et les conditions financières.</p>

          <h2>5. Conditions de vente</h2>
          <p>Les prestations font l’objet d’une proposition commerciale, d’un devis, d’une convention ou d’un contrat adapté à la situation du client. Les prix, calendriers, livrables, modalités de paiement, conditions d’annulation et responsabilités sont précisés dans ces documents contractuels.</p>
          <p>Sauf mention contraire dans le document contractuel applicable, les prix sont exprimés en euros. Les factures sont payables selon les modalités indiquées sur le devis ou la facture.</p>

          <h2>6. Annulation et report</h2>
          <p>Les conditions de report ou d’annulation d’un rendez-vous, d’un atelier, d’une formation ou d’une mission sont précisées dans les documents contractuels. En l’absence de précision, les parties recherchent une solution raisonnable tenant compte du calendrier, des frais engagés et du travail déjà réalisé.</p>

          <h2>7. Responsabilité</h2>
          <p>Equinoxe Conseil RH intervient dans une logique d’accompagnement, de conseil et de clarification. Les décisions prises par les clients, dirigeants, managers ou bénéficiaires restent sous leur responsabilité.</p>
          <p>Equinoxe Conseil RH ne saurait être tenue responsable d’une mauvaise utilisation des informations présentes sur le site ou d’une interruption technique indépendante de sa volonté.</p>

          <h2>8. Propriété intellectuelle</h2>
          <p>Les textes, contenus, éléments graphiques, structure du site, marques, logos et supports présentés sont protégés. Toute reproduction, adaptation ou diffusion non autorisée est interdite, sauf accord écrit préalable.</p>

          <h2>9. Confidentialité</h2>
          <p>Les informations échangées dans le cadre d’une demande ou d’un accompagnement sont traitées avec confidentialité, sous réserve des obligations légales et des limites propres à chaque cadre d’intervention.</p>

          <h2>10. Droit applicable</h2>
          <p>Les présentes conditions sont soumises au droit français. En cas de difficulté, les parties privilégient une résolution amiable avant toute procédure.</p>
        </Container>
      </Section>
    </>
  );
}

function CookiesPage() {
  const [analytics, setAnalytics] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const preferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    if (preferences) {
      try {
        const parsed = JSON.parse(preferences) as { analytics?: boolean };
        setAnalytics(Boolean(parsed.analytics));
      } catch {
        setAnalytics(localStorage.getItem(COOKIE_CONSENT_KEY) === 'accepted');
      }
    } else {
      setAnalytics(localStorage.getItem(COOKIE_CONSENT_KEY) === 'accepted');
    }
  }, []);

  const savePreferences = (analyticsValue: boolean) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, analyticsValue ? 'accepted' : 'refused');
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify({ necessary: true, analytics: analyticsValue }));
    setAnalytics(analyticsValue);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2800);
  };

  return (
    <>
      <SEOHead
        title="Gestion des cookies | Equinoxe Conseil RH"
        description="Informations et préférences cookies du site Equinoxe Conseil RH : cookies nécessaires, mesure d’audience et choix RGPD."
      />
      <section className="relative overflow-hidden border-b border-sand bg-rosé">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full border-[42px] border-white opacity-35" />
        <div className="absolute -left-16 bottom-0 h-72 w-72 rounded-full border-[30px] border-white opacity-25" />
        <Container className="relative z-10 py-16">
          <p className="inline-flex rounded-full border border-sage-dark/20 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-sage-dark">
            Préférences RGPD
          </p>
          <h1 className="mt-6 max-w-4xl font-serif text-4xl font-semibold leading-tight text-ink md:text-6xl">
            Cookies et confidentialité
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-anthracite/75">
            Cette page vous permet de comprendre les cookies utilisés sur le site et de gérer vos préférences à tout moment.
          </p>
        </Container>
      </section>

      <Section className="bg-ivory">
        <Container className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-start">
          <div className="space-y-6">
            <div className="rounded-2xl border border-sand bg-white p-7 shadow-[0_22px_70px_rgba(14,27,41,0.06)]">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-rosé text-sage-dark">
                <ShieldCheck size={23} />
              </div>
              <h2 className="font-serif text-3xl font-semibold text-ink">Une utilisation limitée et transparente</h2>
              <p className="mt-4 leading-8 text-anthracite/75">
                Equinoxe Conseil RH limite l’usage des cookies à ce qui est nécessaire au bon fonctionnement du site. Les cookies de mesure d’audience, lorsqu’ils sont activés, servent uniquement à comprendre les usages de manière globale.
              </p>
              <div className="mt-6 grid gap-4 border-t border-sand pt-6 md:grid-cols-2">
                <div>
                  <p className="font-bold text-ink">Durée de conservation</p>
                  <p className="mt-2 text-sm leading-6 text-anthracite/72">Vos préférences sont conservées localement dans votre navigateur. Vous pouvez les modifier ou les supprimer à tout moment.</p>
                </div>
                <div>
                  <p className="font-bold text-ink">Retrait du consentement</p>
                  <p className="mt-2 text-sm leading-6 text-anthracite/72">Le refus est aussi simple que l’acceptation : utilisez les boutons de préférences sur cette page pour changer d’avis.</p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <CookieInfoCard
                icon={<Lock size={22} />}
                title="Cookies nécessaires"
                text="Ils permettent le fonctionnement technique du site, la navigation, la sécurité de base et la mémorisation de vos préférences cookies."
                status="Toujours actifs"
              />
              <CookieInfoCard
                icon={<BarChart3 size={22} />}
                title="Mesure d’audience"
                text="Ils peuvent aider à mesurer les pages consultées et améliorer l’expérience, uniquement si vous les acceptez explicitement."
                status="Optionnels"
              />
            </div>
            <div className="rounded-2xl border border-sand bg-white p-6 text-sm leading-7 text-anthracite/75 shadow-[0_18px_50px_rgba(14,27,41,0.05)]">
              <p className="font-bold text-ink">Référence réglementaire</p>
              <p className="mt-2">Les cookies non nécessaires au fonctionnement du site ne sont déposés qu’après consentement. Cette page permet de gérer ce choix de façon permanente.</p>
              <a href="https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies" target="_blank" rel="noreferrer" className="mt-3 inline-flex font-bold text-sage-dark hover:text-ink">
                Voir les règles CNIL sur les cookies
              </a>
            </div>
          </div>

          <aside className="rounded-2xl border border-sand bg-white p-7 shadow-[0_22px_70px_rgba(14,27,41,0.06)] lg:sticky lg:top-28">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-rosé text-sage-dark">
              <SlidersHorizontal size={23} />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-ink">Préférences</h2>
            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-sand bg-ivory p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-ink">Cookies nécessaires</p>
                    <p className="mt-1 text-sm leading-6 text-anthracite/65">Indispensables au fonctionnement du site.</p>
                  </div>
                  <span className="rounded-full bg-sage-dark px-3 py-1 text-xs font-bold text-white">Actif</span>
                </div>
              </div>
              <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-sand bg-white p-4">
                <span>
                  <span className="block font-bold text-ink">Mesure d’audience</span>
                  <span className="mt-1 block text-sm leading-6 text-anthracite/65">Autoriser les statistiques anonymisées.</span>
                </span>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(event) => setAnalytics(event.target.checked)}
                  className="h-5 w-5 accent-sage-dark"
                />
              </label>
            </div>

            {saved ? (
              <p className="mt-5 flex items-center gap-2 rounded-xl bg-rosé px-4 py-3 text-sm font-bold text-sage-dark">
                <CheckCircle2 size={17} />
                Vos préférences ont été enregistrées.
              </p>
            ) : null}

            <div className="mt-6 grid gap-3">
              <button
                type="button"
                onClick={() => savePreferences(analytics)}
                className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-sage-dark"
              >
                Enregistrer mes choix
              </button>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => savePreferences(false)}
                  className="rounded-full border border-ink/15 bg-white px-5 py-2.5 text-sm font-bold text-ink transition hover:border-sage-dark hover:text-sage-dark"
                >
                  Tout refuser
                </button>
                <button
                  type="button"
                  onClick={() => savePreferences(true)}
                  className="rounded-full border border-sage-dark bg-rosé px-5 py-2.5 text-sm font-bold text-sage-dark transition hover:bg-sage-dark hover:text-white"
                >
                  Tout accepter
                </button>
              </div>
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}

function CookieInfoCard({ icon, title, text, status }: { icon: ReactNode; title: string; text: string; status: string }) {
  return (
    <div className="rounded-2xl border border-sand bg-white p-6 shadow-[0_18px_50px_rgba(14,27,41,0.05)]">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-rosé text-sage-dark">
        {icon}
      </div>
      <p className="font-serif text-xl font-semibold text-ink">{title}</p>
      <p className="mt-3 text-sm leading-6 text-anthracite/72">{text}</p>
      <p className="mt-4 text-xs font-bold uppercase tracking-[0.15em] text-sage-dark">{status}</p>
    </div>
  );
}
