import { Link, useParams } from 'react-router-dom';
import { ServiceCard } from '../components/Cards';
import { FAQAccordion } from '../components/FAQAccordion';
import { SEOHead } from '../components/SEOHead';
import { ButtonLink, Card, Container, PageHeader, Section } from '../components/ui';
import { services } from '../data/content';
import { faqSchema, serviceSchema } from '../lib/schemaMarkup';

const serviceImages: Record<string, string> = {
  'conseil-rh-entreprises': '/images/service_conseil_rh.png',
  'accompagnement-changement': '/images/service_accompagnement_changement.png',
  'accompagnement-individuel': '/images/service_accompagnement_individuel.png',
  'bilan-de-competences': '/images/service_bilan_competences.png',
  'formations-ateliers-codeveloppement': '/images/service_formations_ateliers.png',
};

export function ServicesIndexPage() {
  return (
    <>
      <SEOHead title="Services RH, coaching et bilan de compétences | Equinoxe Conseil RH" description="Conseil RH, accompagnement du changement, accompagnement individuel, bilan de compétences, formations et co-développement." />
      
      {/* Section 1: Hero (With background) */}
      <div className="relative overflow-hidden border-b border-sand bg-rosé pt-14">
        {/* Decorative background elements - enhanced visibility and explicit styling */}
        <div className="absolute -right-20 -top-20 z-0 h-[450px] w-[450px] rounded-full border-[55px] border-white opacity-40" />
        <div className="absolute -left-10 -bottom-10 z-0 h-72 w-72 rounded-full border-[35px] border-white opacity-25" />
        <div className="absolute right-[20%] top-1/3 z-0 h-40 w-40 rounded-full border-[15px] border-white opacity-20" />
        
        <Container className="relative z-10 pb-12 pt-10 sm:pb-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-sage-dark/20 bg-sage px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-sage-dark">Services</p>
            <h1 className="font-serif text-4xl font-semibold leading-[1.05] text-ink sm:text-6xl animate-fade-in-up">Des accompagnements RH et coaching sur mesure</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-anthracite/80 animate-fade-in-up delay-100">Equinoxe Conseil RH accompagne les entreprises, collectifs et personnes dans leurs transitions avec une approche structurée, humaine et confidentielle.</p>
          </div>
          <div className="mx-auto aspect-[4/3] w-full max-w-[480px] overflow-hidden rounded-[2rem] border border-sand bg-white p-3.5 shadow-soft lg:max-w-none animate-float">
            <img 
              src="/images/coaching_collaboration.png" 
              alt="Séance de coaching et conseil RH" 
              className="h-full w-full rounded-[1.5rem] object-cover"
            />
          </div>
        </Container>
      </div>

      {/* Section 2: Services List (Without background) */}
      <Section className="bg-white">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

export function ServiceDetailPage() {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug) ?? services[0];
  
  return (
    <>
      <SEOHead title={service.seoTitle} description={service.seoDescription} schema={[serviceSchema(service), faqSchema(service.faqs)]} />
      
      {/* Section 1: PageHeader (With background, handled by default PageHeader styling) */}
      <PageHeader eyebrow="Accompagnement" title={service.title} text={service.shortDescription} />
      
      {/* Section 2: Content columns (Without background) */}
      <Section className="bg-white">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="prose-equinoxe max-w-none">
            <p className="text-lg leading-8">{service.longDescription}</p>
            
            <h2 className="font-serif text-2xl text-ink mt-8">Publics concernés</h2>
            <List items={service.targetAudience} />
            
            <h2 className="font-serif text-2xl text-ink mt-8">Problématiques traitées</h2>
            <List items={service.issues} />
            
            <h2 className="font-serif text-2xl text-ink mt-8">Bénéfices attendus</h2>
            <List items={service.benefits} />
            
            <h2 className="font-serif text-2xl text-ink mt-8">Méthode d’accompagnement</h2>
            <List items={service.method} ordered />
            
            <h2 className="font-serif text-2xl text-ink mt-8">Exemples de situations</h2>
            <List items={service.examples} />
          </div>
          
          <aside className="space-y-6 lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-[2rem] border border-sand bg-white p-3.5 shadow-soft">
              <img 
                src={serviceImages[service.slug] || '/images/meeting_collaboration.png'} 
                alt={service.title} 
                className="aspect-[4/3] w-full rounded-[1.5rem] object-cover"
              />
            </div>
            
            <Card className="border border-sand bg-white">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage-dark">Réponse courte</p>
              <p className="mt-3 leading-7 text-anthracite/80">Equinoxe Conseil RH accompagne à Toulouse, en Occitanie et à distance les enjeux liés à : {service.title.toLowerCase()}.</p>
            </Card>
            
            <Card className="bg-rosé border border-sand">
              <h2 className="font-serif text-2xl text-ink">Échanger sur ce besoin</h2>
              <p className="mt-3 leading-7 text-anthracite/75">Un premier échange permet de qualifier la situation et le cadre adapté.</p>
              <div className="mt-5">
                <ButtonLink to="/contact">Contacter Caroline</ButtonLink>
              </div>
            </Card>
          </aside>
        </Container>
      </Section>
      
      {/* Section 3: FAQ (With background) */}
      <Section className="border-y border-sand bg-sage/20">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="font-serif text-4xl text-ink">FAQ spécifique</h2>
            <p className="mt-4 text-anthracite/75">Questions fréquentes sur cet accompagnement.</p>
          </div>
          <FAQAccordion items={service.faqs} />
        </Container>
      </Section>
      
      {/* Section 4: Other services (Without background) */}
      <Section className="bg-white">
        <Container>
          <h2 className="font-serif text-4xl text-ink">Autres accompagnements</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {services.filter((s) => s.slug !== service.slug).map((s) => (
              <Link 
                key={s.slug} 
                to={`/services/${s.slug}`} 
                className="rounded-full border border-sand px-4 py-2 text-sm font-bold text-ink hover:text-sage-dark hover:border-sage-dark transition-all duration-300 bg-white"
              >
                {s.title}
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

function List({ items, ordered = false }: { items: string[]; ordered?: boolean }) {
  if (ordered) {
    return (
      <ol className="space-y-3 mt-4 list-none pl-0">
        {items.map((item, idx) => (
          <li key={item} className="flex gap-4 items-start text-anthracite/85">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage font-serif text-sm font-bold text-sage-dark">
              {idx + 1}
            </span>
            <span className="leading-7">{item}</span>
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ul className="space-y-3 mt-4 list-none pl-0">
      {items.map((item) => (
        <li key={item} className="flex gap-4 items-start text-anthracite/85">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-champagne" />
          <span className="leading-7">{item}</span>
        </li>
      ))}
    </ul>
  );
}
