import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Award, 
  MapPin, 
  GraduationCap, 
  Users, 
  Building2, 
  Compass, 
  Shuffle, 
  Lightbulb, 
  CheckCircle2 
} from 'lucide-react';
import { BlogCard, ServiceCard, TestimonialCard } from '../components/Cards';
import { FAQAccordion } from '../components/FAQAccordion';
import { SEOHead } from '../components/SEOHead';
import { ButtonLink, Card, Container, Section } from '../components/ui';
import { faqs, posts, services, testimonials } from '../data/content';
import { organizationSchema, personSchema, faqSchema } from '../lib/schemaMarkup';
import { useSupabaseRows } from '../hooks/useSupabaseRows';
import type { BlogPost, FAQ, Testimonial } from '../types';

export function HomePage() {
  const livePosts = useSupabaseRows<BlogPost>('blog_posts', posts, 'published_at');
  const liveFaqs = useSupabaseRows<FAQ>('faqs', faqs, 'display_order');
  const liveTestimonials = useSupabaseRows<Testimonial>('testimonials', testimonials, 'display_order');
  return (
    <>
      <SEOHead title="Conseil RH, coaching et accompagnement du changement à Toulouse | Equinoxe Conseil RH" description="Caroline Tillou Maratuech accompagne entreprises, dirigeants, managers et particuliers à Toulouse, en Occitanie et à distance." schema={[organizationSchema, personSchema, faqSchema(liveFaqs.slice(0, 5))]} />
      <section className="overflow-hidden border-b border-ink/5 bg-white">
        <Container className="pb-14 pt-16">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="mb-5 inline-flex rounded-full border border-sage/35 bg-sage/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-sage-dark">Toulouse, Occitanie et à distance</p>
              <h1 className="max-w-4xl text-balance font-serif text-4xl font-semibold leading-[1.06] text-ink sm:text-6xl xl:text-7xl">Clarifier les transitions humaines, RH et managériales</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-anthracite/80">Equinoxe Conseil RH accompagne les entreprises, dirigeants, managers et particuliers avec une approche structurée, confidentielle et ancrée dans le réel du travail.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink to="/contact">Échanger sur votre besoin</ButtonLink>
                <ButtonLink to="/services" variant="secondary">Découvrir les accompagnements</ButtonLink>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-ink/70">
                <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-champagne" /> Conseil RH</span>
                <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-sage-dark" /> Coaching professionnel</span>
                <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-ink" /> Bilan de compétences</span>
              </div>
            </div>
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[480px] overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white p-3 shadow-[0_28px_80px_rgba(31,51,71,0.12)] lg:max-w-full">
                <img 
                  src="/images/Professeur TILLOU Caroline - TBS Education.webp" 
                  alt="Portrait de Caroline Tillou Maratuech" 
                  className="aspect-[4/5] h-full w-full rounded-[1.25rem] object-cover object-center sm:aspect-square"
                />
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-[0_18px_40px_rgba(31,51,71,0.12)] backdrop-blur">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-sage-dark">Cabinet indépendant</p>
                  <p className="mt-1 font-serif text-xl font-semibold text-ink">Une interlocutrice unique pour cadrer, accompagner et transmettre.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 rounded-2xl border border-ink/10 bg-white p-4 shadow-[0_18px_44px_rgba(31,51,71,0.06)] md:p-5">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ['20 ans d’expérience', Award, 'Pratique terrain consolidée'], 
                ['Doctorat en GRH', GraduationCap, 'Rigueur scientifique et enseignement'], 
                ['Coach Consultant RNCP 7', Users, 'Accompagnement certifié de haut niveau'], 
                ['Proximité & Distance', MapPin, 'Toulouse, Occitanie et France entière']
              ].map(([label, Icon, desc]) => (
                <div key={String(label)} className="flex items-start gap-4 rounded-xl p-4 transition-colors hover:bg-[#EAF3FF]">
                  <span className="mt-0.5 rounded-full bg-sage/15 p-2.5 text-sage-dark"><Icon size={18} /></span>
                  <div>
                    <h4 className="text-sm font-semibold leading-tight text-ink sm:text-base">{String(label)}</h4>
                    <p className="text-xs text-anthracite/60 mt-1">{String(desc)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Section className="border-y border-ink/5 bg-[#EAF3FF]">
        <Container>
          <GridTitle title="Pour qui ?" text="Equinoxe Conseil RH s’adresse aux organisations comme aux personnes, avec un cadre clair et adapté à chaque situation." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: 'Entreprises et dirigeants', icon: Building2, desc: 'TPE, PME et grandes structures cherchant à structurer leurs RH et accompagner leurs transformations.' },
              { label: 'Managers', icon: Compass, desc: 'Dirigeants et encadrants souhaitant développer leur posture, clarifier leur communication et gérer les tensions.' },
              { label: 'Salariés et professionnels en transition', icon: Shuffle, desc: 'Professionnels en reconversion ou désireux de faire un bilan complet de leur parcours.' },
              { label: 'Entrepreneurs', icon: Lightbulb, desc: 'Créateurs de structures cherchant à poser les bonnes bases RH pour accompagner leur croissance.' },
              { label: 'Étudiants', icon: GraduationCap, desc: 'Jeunes diplômés ou en cours d’études souhaitant s’orienter et préparer leur entrée sur le marché.' },
              { label: 'Collectifs et équipes', icon: Users, desc: 'Groupes de travail ayant besoin de cohésion, d’ateliers ou de cercles de co-développement.' }
            ].map(({ label, icon: Icon, desc }) => (
              <Card key={label} className="group hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="mb-4 text-sage-dark group-hover:text-champagne transition-colors duration-300">
                    <Icon size={26} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-ink group-hover:text-sage-dark transition-colors duration-300">{label}</h3>
                  <p className="mt-3 text-sm leading-6 text-anthracite/75">{desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <GridTitle title="Accompagnements" text="Des services structurés pour clarifier les enjeux, sécuriser les transitions et soutenir les personnes comme les collectifs." />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => <ServiceCard key={service.slug} service={service} />)}
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] items-center">
          <GridTitle title="Une méthode sobre et ajustée" text="Écouter, comprendre, clarifier, accompagner, ajuster, transmettre et sécuriser les transitions." />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              'Expertise académique et terrain', 
              'Approche sur mesure', 
              'Structure à taille humaine', 
              'Contact direct avec Caroline', 
              'Accompagnement individuel et collectif', 
              'Approche centrée sur l’humain'
            ].map((item) => (
              <div key={item} className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-white p-5 shadow-sm transition-all duration-300 hover:border-sage-dark/20 hover:shadow-[0_18px_44px_rgba(31,51,71,0.08)]">
                <span className="rounded-full bg-sage/15 p-2 text-sage-dark">
                  <CheckCircle2 size={18} />
                </span>
                <span className="font-semibold text-ink text-sm sm:text-base">{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-ink/5 bg-[#EAF3FF]">
        <Container>
          <GridTitle title="Témoignages" text="Les avis ci-dessous sont des placeholders administrables. Ils peuvent être remplacés ou masqués depuis Supabase." />
          <div className="mt-10 grid gap-6 md:grid-cols-2">{liveTestimonials.map((t) => <TestimonialCard key={t.id} testimonial={t} />)}</div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <GridTitle title="Ressources RH" text="Articles de fond pour éclairer les transitions humaines, managériales et professionnelles." />
            <Link className="inline-flex items-center gap-2 font-semibold text-sage-dark hover:text-ink transition-colors" to="/blog">Voir le blog <ArrowRight size={16} /></Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">{livePosts.slice(0, 3).map((post) => <BlogCard key={post.id} post={post} />)}</div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <GridTitle title="Questions fréquentes" text="Des réponses courtes pour comprendre le cadre d’intervention." />
          <FAQAccordion items={liveFaqs.slice(2, 8)} />
        </Container>
      </Section>

      <Section className="bg-ink text-white">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-serif text-4xl font-semibold">Vous traversez une transition humaine, managériale ou professionnelle ?</h2>
            <p className="mt-4 text-white/75">Un échange permet de poser les premiers repères, sans pression commerciale.</p>
          </div>
          <Link className="focus-ring rounded-full bg-white px-6 py-3 font-semibold text-ink transition-colors duration-300 hover:bg-sage-dark hover:text-white" to="/contact">Parler de votre situation</Link>
        </Container>
      </Section>
    </>
  );
}

function GridTitle({ title, text }: { title: string; text: string }) {
  return <div><h2 className="font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">{title}</h2><p className="mt-4 max-w-2xl text-lg leading-8 text-anthracite/70">{text}</p></div>;
}
