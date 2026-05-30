import { MessageCircleQuestion, Phone } from 'lucide-react';
import { TestimonialCard } from '../components/Cards';
import { FAQAccordion } from '../components/FAQAccordion';
import { SEOHead } from '../components/SEOHead';
import { ButtonLink, Container, PageHeader, Section } from '../components/ui';
import { faqs, services, testimonials, contactInfo } from '../data/content';
import { faqSchema } from '../lib/schemaMarkup';
import { useSupabaseRows } from '../hooks/useSupabaseRows';
import type { FAQ, Testimonial } from '../types';

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
