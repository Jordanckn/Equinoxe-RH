import { Link, useParams } from 'react-router-dom';
import { ServiceCard } from '../components/Cards';
import { FAQAccordion } from '../components/FAQAccordion';
import { SEOHead } from '../components/SEOHead';
import { ButtonLink, Card, Container, PageHeader, Section } from '../components/ui';
import { services } from '../data/content';
import { faqSchema, serviceSchema } from '../lib/schemaMarkup';

export function ServicesIndexPage() {
  return (
    <>
      <SEOHead title="Services RH, coaching et bilan de compétences | Equinoxe Conseil RH" description="Conseil RH, accompagnement du changement, accompagnement individuel, bilan de compétences, formations et co-développement." />
      <div className="bg-ivory pt-14 border-b border-ink/5">
        <Container className="pb-12 pt-10 sm:pb-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-sage-dark">Services</p>
            <h1 className="font-serif text-4xl font-semibold leading-tight text-ink sm:text-6xl">Des accompagnements RH et coaching sur mesure</h1>
            <p className="mt-6 text-lg leading-8 text-anthracite/80">Equinoxe Conseil RH accompagne les entreprises, collectifs et personnes dans leurs transitions avec une approche structurée, humaine et confidentielle.</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-ink/5 bg-white p-3 shadow-soft aspect-[4/3] max-w-[480px] lg:max-w-none mx-auto w-full">
            <img 
              src="/images/coaching_collaboration.png" 
              alt="Séance de coaching et conseil RH" 
              className="h-full w-full rounded-xl object-cover"
            />
          </div>
        </Container>
      </div>
      <Section><Container><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{services.map((service) => <ServiceCard key={service.slug} service={service} />)}</div></Container></Section>
    </>
  );
}

export function ServiceDetailPage() {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug) ?? services[0];
  return (
    <>
      <SEOHead title={service.seoTitle} description={service.seoDescription} schema={[serviceSchema(service), faqSchema(service.faqs)]} />
      <PageHeader eyebrow="Service" title={service.title} text={service.shortDescription} />
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
          
          <aside className="space-y-5 lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-2xl border border-ink/5 bg-white p-3 shadow-soft">
              <img 
                src="/images/coaching_collaboration.png" 
                alt="Accompagnement et Coaching" 
                className="w-full aspect-[4/3] rounded-xl object-cover"
              />
            </div>
            
            <Card>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage-dark">Réponse courte</p>
              <p className="mt-3 leading-7 text-anthracite/80">Equinoxe Conseil RH accompagne à Toulouse, en Occitanie et à distance les enjeux liés à : {service.title.toLowerCase()}.</p>
            </Card>
            
            <Card className="bg-ivory/30">
              <h2 className="font-serif text-2xl text-ink">Échanger sur ce besoin</h2>
              <p className="mt-3 leading-7 text-anthracite/75">Un premier échange permet de qualifier la situation et le cadre adapté.</p>
              <div className="mt-5">
                <ButtonLink to="/contact">Contacter Caroline</ButtonLink>
              </div>
            </Card>
          </aside>
        </Container>
      </Section>
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div><h2 className="font-serif text-4xl text-ink">FAQ spécifique</h2><p className="mt-4 text-anthracite/75">Questions fréquentes sur cet accompagnement.</p></div>
          <FAQAccordion items={service.faqs} />
        </Container>
      </Section>
      <Section className="bg-white">
        <Container>
          <h2 className="font-serif text-4xl text-ink">Autres accompagnements</h2>
          <div className="mt-8 flex flex-wrap gap-3">{services.filter((s) => s.slug !== service.slug).map((s) => <Link key={s.slug} to={`/services/${s.slug}`} className="rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink hover:text-sage-dark hover:border-sage-dark transition-all duration-300">{s.title}</Link>)}</div>
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
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage/20 font-serif text-sm font-semibold text-sage-dark">
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
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-champagne" />
          <span className="leading-7">{item}</span>
        </li>
      ))}
    </ul>
  );
}
