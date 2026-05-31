import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Award, 
  MapPin, 
  GraduationCap, 
  Users, 
  Building2, 
  ChevronDown,
  Compass, 
  ClipboardCheck,
  HeartHandshake,
  LineChart,
  MonitorCheck,
  Phone,
  Route,
  Shuffle, 
  Lightbulb, 
  ShieldCheck,
  Target,
  CheckCircle2 
} from 'lucide-react';
import { BlogCard, ServiceCard, TestimonialCard } from '../components/Cards';
import { CookieConsent } from '../components/CookieConsent';
import { FAQAccordion } from '../components/FAQAccordion';
import { SEOHead } from '../components/SEOHead';
import { ScrollReveal } from '../components/ScrollReveal';
import { ButtonLink, Card, Container, Section } from '../components/ui';
import { contactInfo, faqs, posts, services, testimonials } from '../data/content';
import { organizationSchema, personSchema, faqSchema } from '../lib/schemaMarkup';
import { useSupabaseRows } from '../hooks/useSupabaseRows';
import type { BlogPost, FAQ, Testimonial } from '../types';

const trustedLogos = [
  { name: 'Harmonie Mutuelle', src: '/Logo/Harmonie Mutuelle logo.webp' },
  { name: 'Prévaly', src: '/Logo/Prevaly logo.webp' },
  { name: 'HEC Montréal', src: '/Logo/Logo de HEC Montréal.webp' },
  { name: 'Toulouse School of Management', src: '/Logo/Logo de Toulouse School of Management.webp' },
  { name: 'Kedge Business School', src: '/Logo/File-Kedgebs-logo.png.webp' },
  { name: 'Conseil Formation SIRH', src: '/Logo/Conseil, Formation, SIRH - 15 ans dexpertise en Gestion des Compétences.webp' },
  { name: 'Cornell University', src: '/Logo/Cornell University Logo PNG Vectors Free Download.webp' },
  { name: 'La REF Toulouse', src: '/Logo/La REF Toulouse, mercredi 20 octobre 2021.webp' },
  { name: 'Toulouse Métropole', src: '/Logo/Réf - Toulouse Métropole.webp' },
  { name: 'Pharmabest, Pharmacie Lafayette, Pharmactiv', src: '/Logo/Annuaire des groupements Pharmabest, Pharmacie Lafayette, Pharmactiv....webp' },
  { name: 'Partenaire professionnel', src: '/Logo/posts.webp' },
  { name: 'Partenaire RH', src: '/Logo/posts 2.webp' }
];

export function HomePage() {
  const livePosts = useSupabaseRows<BlogPost>('blog_posts', posts, 'published_at');
  const liveFaqs = useSupabaseRows<FAQ>('faqs', faqs, 'display_order');
  const liveTestimonials = useSupabaseRows<Testimonial>('testimonials', testimonials, 'display_order');

  return (
    <>
      <SEOHead title="Conseil RH, coaching et accompagnement du changement à Toulouse | Equinoxe Conseil RH" description="Caroline Tillou Maratuech accompagne entreprises, dirigeants, managers et particuliers à Toulouse, en Occitanie et à distance." schema={[organizationSchema, personSchema, faqSchema(liveFaqs.slice(0, 5))]} />
      <CookieConsent />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-sand bg-rosé py-10 sm:py-16">
        {/* Decorative background elements - enhanced visibility and explicit styling */}
        <div className="absolute -right-20 -top-20 z-0 h-[500px] w-[500px] rounded-full border-[60px] border-white opacity-40" />
        <div className="absolute -left-10 -bottom-10 z-0 h-80 w-80 rounded-full border-[40px] border-white opacity-25" />
        <div className="absolute right-[10%] bottom-[15%] z-0 h-48 w-48 rounded-full border-[20px] border-white opacity-20" />
        
        <Container className="relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <p className="animate-fade-in inline-flex rounded-full border border-sage-dark/20 bg-sage px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-sage-dark">
                Toulouse, Occitanie et à distance
              </p>
              <h1 className="animate-fade-in-up max-w-4xl text-balance font-serif text-4xl font-semibold leading-[1.06] text-ink sm:text-6xl xl:text-7xl">
                Clarifier les transitions humaines, RH et managériales
              </h1>
              <p className="animate-fade-in-up delay-100 max-w-2xl text-lg leading-8 text-anthracite/80">
                Equinoxe Conseil RH accompagne les entreprises, dirigeants, managers et particuliers avec une approche structurée, confidentielle et ancrée dans le réel du travail.
              </p>
              <div className="animate-fade-in-up delay-150 flex flex-wrap gap-3 pt-2">
                <ButtonLink to="/contact">Échanger sur votre besoin</ButtonLink>
                <ButtonLink to="/services" variant="secondary">Découvrir les accompagnements</ButtonLink>
              </div>
              <div className="animate-fade-in-up delay-200 flex flex-wrap gap-x-6 gap-y-3 pt-4 text-sm font-bold text-ink/75">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-champagne" /> Conseil RH
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sage-dark" /> Coaching professionnel
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-champagne-dark" /> Bilan de compétences
                </span>
              </div>
            </div>
            
            <div className="animate-fade-in delay-100 relative flex justify-center lg:justify-end">
              <div className="animate-float relative w-full max-w-[480px] overflow-hidden rounded-[2rem] border border-sand bg-white p-3.5 shadow-[0_28px_80px_rgba(14,27,41,0.08)] lg:max-w-full">
                <img 
                  src="/images/Professeur TILLOU Caroline - TBS Education.webp" 
                  alt="Portrait de Caroline Tillou Maratuech" 
                  onError={(event) => { event.currentTarget.src = '/images/caroline_portrait.png'; }}
                  className="aspect-[4/5] h-full w-full rounded-[1.5rem] object-cover object-center sm:aspect-square"
                />
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/70 bg-white/90 p-5 shadow-[0_18px_40px_rgba(14,27,41,0.06)] backdrop-blur">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-sage-dark">Cabinet indépendant</p>
                  <p className="mt-1.5 font-serif text-lg font-semibold leading-snug text-ink">Une interlocutrice unique pour cadrer, accompagner et transmettre.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in-up delay-300 mt-16 rounded-2xl border border-sand bg-white p-4 shadow-soft md:p-5">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ['20 ans d’expérience', Award, 'Pratique terrain consolidée'], 
                ['Doctorat en GRH', GraduationCap, 'Rigueur scientifique et enseignement'], 
                ['Coach Consultant RNCP 7', Users, 'Accompagnement certifié de haut niveau'], 
                ['Proximité & Distance', MapPin, 'Toulouse, Occitanie et France entière']
              ].map(([label, Icon, desc]) => (
                <div key={String(label)} className="flex items-center gap-4 rounded-xl p-4 transition-colors hover:bg-sage/20">
                  <span className="rounded-full bg-sage px-2.5 py-2.5 text-sage-dark"><Icon size={18} /></span>
                  <div>
                    <h4 className="text-sm font-bold leading-tight text-ink sm:text-base">{String(label)}</h4>
                    <p className="text-xs text-anthracite/60 mt-1">{String(desc)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Logos Section */}
      <section className="border-b border-sand bg-white py-10">
        <Container>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-sage-dark">Ils nous font confiance</p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-ink">Références et collaborations</h2>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-sand bg-ivory py-5">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-ivory to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-ivory to-transparent" />
            <div className="logo-marquee flex w-max items-center gap-6">
              {[...trustedLogos, ...trustedLogos].map((logo, index) => (
                <div key={`${logo.name}-${index}`} className="flex h-20 w-44 shrink-0 items-center justify-center rounded-xl border border-ink/5 bg-white px-5 shadow-[0_10px_30px_rgba(14,27,41,0.04)]">
                  <img src={logo.src} alt={logo.name} onError={(event) => { event.currentTarget.src = '/images/equinoxe-RH-logo.webp'; }} className="max-h-12 max-w-full object-contain" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Pour qui ? Section */}
      <Section className="bg-white">
        <Container>
          <ScrollReveal>
            <GridTitle title="Pour qui ?" text="Equinoxe Conseil RH s’adresse aux organisations comme aux personnes, avec un cadre clair et adapté à chaque situation." />
          </ScrollReveal>
          
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: 'Entreprises et dirigeants', slug: 'entreprises-dirigeants', icon: Building2, desc: 'TPE, PME et grandes structures cherchant à structurer leurs RH et accompagner leurs transformations.' },
              { label: 'Managers', slug: 'managers', icon: Compass, desc: 'Dirigeants et encadrants souhaitant développer leur posture, clarifier leur communication et gérer les tensions.' },
              { label: 'Salariés et professionnels en transition', slug: 'salaries-transitions', icon: Shuffle, desc: 'Professionnels en reconversion ou désireux de faire un bilan complet de leur parcours.' },
              { label: 'Entrepreneurs', slug: 'entrepreneurs', icon: Lightbulb, desc: 'Créateurs de structures cherchant à poser les bonnes bases RH pour accompagner leur croissance.' },
              { label: 'Étudiants', slug: 'etudiants', icon: GraduationCap, desc: 'Jeunes diplômés ou en cours d’études souhaitant s’orienter et préparer leur entrée sur le marché.' },
              { label: 'Collectifs et équipes', slug: 'collectifs-equipes', icon: Users, desc: 'Groupes de travail ayant besoin de cohésion, d’ateliers ou de cercles de co-développement.' }
            ].map(({ label, slug, icon: Icon, desc }, index) => (
              <ScrollReveal key={label} delay={index * 75}>
                <Link to={`/pour-qui/${slug}`} className="block h-full">
                  <Card className="group hover:-translate-y-2 hover:border-champagne/30 hover:shadow-[0_24px_50px_rgba(14,27,41,0.06)] transition-all duration-500 flex flex-col justify-between h-full border border-sand">
                    <div>
                      <div className="mb-4 text-sage-dark group-hover:text-champagne transition-colors duration-500">
                        <Icon size={26} />
                      </div>
                      <h3 className="font-serif text-2xl font-semibold text-ink group-hover:text-sage-dark transition-colors duration-500">{label}</h3>
                      <p className="mt-3 text-sm leading-6 text-anthracite/75">{desc}</p>
                    </div>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Accompagnements Section */}
      <Section className="border-y border-sand bg-sage/20">
        <Container>
          <ScrollReveal>
            <GridTitle title="Accompagnements" text="Des services structurés pour clarifier les enjeux, sécuriser les transitions et soutenir les personnes comme les collectifs." />
          </ScrollReveal>
          
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ScrollReveal key={service.slug} delay={index * 100}>
                <ServiceCard service={service} />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* SEO Editorial Section */}
      <Section className="bg-white">
        <Container>
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <p className="inline-flex rounded-full border border-sage-dark/20 bg-rosé px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-sage-dark">
              Conseil RH, coaching et transitions
            </p>
            <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Des accompagnements RH lisibles, utiles et adaptés au terrain
            </h2>
            <p className="mt-5 text-lg leading-8 text-anthracite/75">
              À Toulouse, en Occitanie ou à distance, Equinoxe Conseil RH aide les organisations et les personnes à clarifier les situations humaines sensibles : structuration RH, posture managériale, transition professionnelle, bilan de compétences, cohésion d’équipe et accompagnement du changement.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mt-12 grid overflow-hidden rounded-[2rem] border border-sand bg-ivory shadow-[0_22px_60px_rgba(14,27,41,0.07)] lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[260px] lg:min-h-full">
                <img
                  src="/images/toulouse-garonne.jpg"
                  alt="Vue de Toulouse et des bords de Garonne"
                  onError={(event) => { event.currentTarget.src = '/images/meeting_collaboration.png'; }}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-ink/35 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 rounded-full border border-white/50 bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-ink backdrop-blur">
                  Ancrage toulousain
                </div>
              </div>

              <div className="p-6 sm:p-8 lg:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-sage-dark">Toulouse, Occitanie et France entière</p>
                <h3 className="mt-3 font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                  Une présence locale, avec des formats souples selon la mission
                </h3>
                <p className="mt-4 text-sm leading-7 text-anthracite/75 sm:text-base">
                  Caroline Tillou Maratuech travaille depuis Toulouse avec des entreprises, dirigeants, managers et professionnels en transition. Les accompagnements peuvent se dérouler en visio, en présentiel à Toulouse ou sur site lorsque la mission le justifie, notamment pour les diagnostics RH, ateliers collectifs, accompagnements du changement et interventions auprès des équipes.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    { icon: MapPin, label: 'Toulouse', text: 'Ancrage local' },
                    { icon: MonitorCheck, label: 'Visio', text: 'Suivi à distance' },
                    { icon: Route, label: 'Déplacement', text: 'Selon la mission' }
                  ].map(({ icon: Icon, label, text }) => (
                    <div key={label} className="rounded-2xl border border-sand bg-white p-4">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-rosé text-sage-dark">
                        <Icon size={18} />
                      </span>
                      <p className="mt-3 text-sm font-bold text-ink">{label}</p>
                      <p className="mt-1 text-xs leading-5 text-anthracite/65">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Target,
                title: 'Clarifier',
                text: 'Comprendre les enjeux, nommer les tensions et poser les bons repères avant d’agir.'
              },
              {
                icon: ShieldCheck,
                title: 'Sécuriser',
                text: 'Créer un cadre confidentiel, structuré et fiable pour les décisions RH ou professionnelles.'
              },
              {
                icon: LineChart,
                title: 'Faire évoluer',
                text: 'Transformer les pratiques, renforcer la coopération et soutenir les trajectoires durables.'
              }
            ].map(({ icon: Icon, title, text }, index) => (
              <ScrollReveal key={title} delay={index * 100}>
                <Card className="h-full border border-sand bg-ivory transition-all duration-500 hover:-translate-y-1 hover:border-sage-dark/25 hover:bg-white hover:shadow-soft">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-sage-dark shadow-sm">
                    <Icon size={21} />
                  </span>
                  <h3 className="mt-5 font-serif text-2xl font-semibold text-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-anthracite/75">{text}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.68fr_0.32fr] lg:items-start">
            <ScrollReveal className="space-y-4">
              {[
                {
                  icon: Building2,
                  title: 'Conseil RH pour TPE, PME et organisations',
                  text: 'Le conseil RH permet de structurer les pratiques, clarifier les rôles, accompagner une réorganisation ou traiter une situation humaine devenue complexe. Equinoxe Conseil RH intervient auprès des dirigeants, responsables RH et managers pour analyser le fonctionnement réel, repérer les points de fragilité et construire des réponses adaptées : diagnostic RH, accompagnement de transformation, ateliers collectifs, régulation des tensions, fidélisation des talents, qualité de vie au travail et soutien au management.'
                },
                {
                  icon: HeartHandshake,
                  title: 'Coaching professionnel et posture managériale',
                  text: 'Le coaching professionnel aide les dirigeants, managers, salariés et professionnels en transition à prendre du recul sur leurs décisions, leur communication et leur posture. Il peut soutenir une prise de poste, une évolution de carrière, une difficulté relationnelle, une surcharge, une perte de confiance ou un besoin de repositionnement. L’accompagnement reste concret : clarifier la situation, identifier les ressources, travailler les marges de manoeuvre et retrouver une manière d’agir plus alignée.'
                },
                {
                  icon: ClipboardCheck,
                  title: 'Bilan de compétences et transitions professionnelles',
                  text: 'Le bilan de compétences s’adresse aux personnes qui souhaitent faire le point sur leur parcours, leurs motivations, leurs compétences et leurs pistes d’évolution. Il ne concerne pas uniquement la reconversion : il peut aider à préparer une mobilité, retrouver du sens, sécuriser une décision ou construire un projet professionnel réaliste. L’approche articule réflexion personnelle, réalité du marché, conditions de faisabilité et équilibre de vie.'
                },
                {
                  icon: Shuffle,
                  title: 'Accompagnement du changement et cohésion d’équipe',
                  text: 'Une transformation RH, une croissance rapide, une fusion, une évolution de métier ou une nouvelle organisation se vit d’abord dans le quotidien des équipes. L’accompagnement du changement aide à rendre les transitions plus lisibles : clarification des objectifs, analyse des impacts humains, communication, ateliers d’équipe, soutien des managers et suivi dans la durée. L’enjeu est de préserver l’engagement, la coopération et la santé du collectif.'
                }
              ].map(({ icon: Icon, title, text }) => (
                <details key={title} className="group rounded-2xl border border-sand bg-white p-0 shadow-sm transition-all duration-300 open:border-sage-dark/25 open:shadow-soft">
                  <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-5 [&::-webkit-details-marker]:hidden">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rosé text-sage-dark">
                      <Icon size={20} />
                    </span>
                    <h3 className="flex-1 font-serif text-xl font-semibold leading-snug text-ink sm:text-2xl">{title}</h3>
                    <ChevronDown size={20} className="shrink-0 text-sage-dark transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <div className="px-5 pb-6 pl-[4.25rem] text-sm leading-7 text-anthracite/75 sm:text-base">
                    <p>{text}</p>
                  </div>
                </details>
              ))}

              <Card className="overflow-hidden border border-sand bg-white p-0 shadow-sm">
                <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative min-h-[260px] overflow-hidden bg-ivory">
                    <iframe
                      title="Carte Google Maps - Equinoxe Conseil RH"
                      src="https://www.google.com/maps?q=35%20chemin%20de%20Buissaison%2C%2031180%20Lapeyrouse-Fossat&output=embed"
                      className="absolute inset-0 h-full w-full grayscale-[15%]"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/5" />
                  </div>

                  <div className="p-6 sm:p-7">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-sage-dark">Adresse professionnelle</p>
                    <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight text-ink">
                      Un point d’ancrage près de Toulouse
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-anthracite/75">
                      Les rendez-vous peuvent être organisés en visioconférence, à Toulouse ou en déplacement après cadrage de l’accompagnement, notamment pour les missions en entreprise.
                    </p>

                    <div className="mt-5 grid gap-3">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-start gap-3 rounded-2xl border border-sand bg-ivory px-4 py-3 text-sm font-semibold text-ink transition-all hover:border-sage-dark/25 hover:bg-white"
                      >
                        <MapPin size={18} className="mt-0.5 shrink-0 text-sage-dark" />
                        <span>{contactInfo.address}</span>
                      </a>
                      <a
                        href={`tel:${contactInfo.phoneHref}`}
                        className="group flex items-center gap-3 rounded-2xl border border-sand bg-ivory px-4 py-3 text-sm font-semibold text-ink transition-all hover:border-sage-dark/25 hover:bg-white"
                      >
                        <Phone size={18} className="shrink-0 text-sage-dark" />
                        <span>{contactInfo.phone}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal className="space-y-5 lg:sticky lg:top-28">
              <Card className="border border-sand bg-rosé">
                <h3 className="font-serif text-2xl font-semibold text-ink">Recherches fréquentes</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Conseil RH Toulouse', 'Coaching professionnel', 'Bilan de compétences', 'Accompagnement du changement', 'Management', 'Transitions professionnelles', 'PME', 'Dirigeants'].map((keyword) => (
                    <span key={keyword} className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-sage-dark">{keyword}</span>
                  ))}
                </div>
              </Card>

              <Card className="border border-sand bg-white">
                <h3 className="font-serif text-2xl font-semibold text-ink">Trouver le bon accompagnement</h3>
                <div className="mt-5 grid gap-3">
                  {[
                    ['Conseil RH', '/services/conseil-rh-entreprises'],
                    ['Coaching professionnel', '/services/accompagnement-individuel'],
                    ['Bilan de compétences', '/services/bilan-de-competences'],
                    ['Changement', '/services/accompagnement-changement']
                  ].map(([label, to]) => (
                    <Link key={label} to={to} className="group flex items-center justify-between rounded-xl border border-sand bg-ivory px-4 py-3 text-sm font-bold text-ink transition-all hover:border-sage-dark/25 hover:bg-white">
                      {label}
                      <ArrowRight size={15} className="text-sage-dark transition-transform group-hover:translate-x-1" />
                    </Link>
                  ))}
                </div>
              </Card>

              <Card className="border border-sand bg-white">
                <h3 className="font-serif text-2xl font-semibold text-ink">Zones d’intervention</h3>
                <p className="mt-3 text-sm leading-7 text-anthracite/75">
                  Toulouse, Haute-Garonne, Occitanie et accompagnements à distance partout en France.
                </p>
                <div className="mt-5">
                  <ButtonLink to="/contact" className="w-full justify-center">Prendre contact</ButtonLink>
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* Méthode Section */}
      <Section className="bg-white">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] items-center">
          <ScrollReveal className="space-y-6">
            <GridTitle title="Une méthode sobre et ajustée" text="Écouter, comprendre, clarifier, accompagner, ajuster, transmettre et sécuriser les transitions." />
            <div className="overflow-hidden rounded-[2rem] border border-sand bg-white p-3 shadow-[0_20px_50px_rgba(14,27,41,0.06)] hover:shadow-soft transition-all duration-500">
              <img 
                src="/images/transition_professionnelle.png" 
                alt="Méthode de planification de transition" 
                onError={(event) => { event.currentTarget.src = '/images/meeting_collaboration.png'; }}
                className="aspect-[4/3] w-full rounded-[1.5rem] object-cover"
              />
            </div>
          </ScrollReveal>
          
          <div className="grid gap-4 sm:grid-cols-1">
            {[
              'Expertise académique et terrain', 
              'Approche sur mesure', 
              'Structure à taille humaine', 
              'Contact direct avec Caroline', 
              'Accompagnement individuel et collectif', 
              'Approche centrée sur l’humain'
            ].map((item, index) => (
              <ScrollReveal key={item} delay={index * 100}>
                <div className="flex items-center gap-4 rounded-2xl border border-sand bg-white p-5 shadow-sm transition-all duration-500 hover:border-sage-dark/20 hover:shadow-[0_18px_44px_rgba(14,27,41,0.06)]">
                  <span className="rounded-full bg-sage p-2 text-sage-dark">
                    <CheckCircle2 size={18} />
                  </span>
                  <span className="font-semibold text-ink text-sm sm:text-base">{item}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Témoignages Section */}
      <Section className="border-y border-sand bg-rosé">
        <Container>
          <ScrollReveal>
            <GridTitle title="Témoignages" text="Découvrez les retours d'expérience sur les accompagnements d'Equinoxe Conseil RH." />
          </ScrollReveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {liveTestimonials.map((t, index) => (
              <ScrollReveal key={t.id} delay={index * 150}>
                <TestimonialCard testimonial={t} />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Ressources RH Section */}
      <Section className="bg-white">
        <Container>
          <ScrollReveal className="flex flex-wrap items-end justify-between gap-5">
            <GridTitle title="Ressources RH" text="Articles de fond pour éclairer les transitions humaines, managériales et professionnelles." />
            <Link className="inline-flex items-center gap-2 font-bold text-sage-dark hover:text-ink transition-colors group" to="/blog">
              Voir le blog <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </ScrollReveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {livePosts.slice(0, 3).map((post, index) => (
              <ScrollReveal key={post.id} delay={index * 100}>
                <BlogCard post={post} />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="border-y border-sand bg-sage/20">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <ScrollReveal>
            <GridTitle title="Questions fréquentes" text="Des réponses courtes pour comprendre le cadre d’intervention." />
          </ScrollReveal>
          <ScrollReveal>
            <FAQAccordion items={liveFaqs.slice(2, 8)} />
          </ScrollReveal>
        </Container>
      </Section>

      {/* CTA Banner Section */}
      <Section className="bg-white">
        <Container>
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-ink via-[#132233] to-[#0A121A] px-8 py-14 shadow-soft text-white sm:px-12 sm:py-20 border border-ink/20">
              {/* Soft decorative glow */}
              <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-champagne/10 blur-3xl" />
              <div className="absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-sage/10 blur-3xl" />
              
              <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                <div className="max-w-3xl">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-champagne">Échange gratuit & confidentiel</p>
                  <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-5xl">Vous traversez une transition humaine, managériale ou professionnelle ?</h2>
                  <p className="mt-4 text-lg text-white/75 leading-relaxed">Un échange permet de poser les premiers repères, sans pression commerciale.</p>
                </div>
                <Link className="focus-ring shrink-0 rounded-full bg-champagne px-8 py-4 font-bold text-ink transition-all duration-300 hover:bg-white hover:text-ink hover:scale-105 shadow-[0_12px_28px_rgba(197,168,114,0.2)]" to="/contact">
                  Parler de votre situation
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  );
}

function GridTitle({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h2 className="font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">{title}</h2>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-anthracite/70">{text}</p>
    </div>
  );
}
