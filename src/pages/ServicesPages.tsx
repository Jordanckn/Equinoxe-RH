import { Link, useParams } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  FileText,
  HeartHandshake,
  Lightbulb,
  MapPin,
  MessageCircle,
  MonitorCheck,
  Route,
  ShieldCheck,
  Target,
  Users
} from 'lucide-react';
import { ServiceCard } from '../components/Cards';
import { FAQAccordion } from '../components/FAQAccordion';
import { SEOHead } from '../components/SEOHead';
import { ButtonLink, Card, Container, PageHeader, Section } from '../components/ui';
import { services } from '../data/content';
import { faqSchema, serviceSchema } from '../lib/schemaMarkup';

const serviceImages: Record<string, string> = {
  'conseil-rh-entreprises': '/images/service_conseil_rh.png',
  'accompagnement-changement': '/images/transition_professionnelle.png',
  'accompagnement-individuel': '/images/coaching_collaboration.png',
  'bilan-de-competences': '/images/service_conseil_rh.png',
  'formations-ateliers-codeveloppement': '/images/meeting_collaboration.png',
};

const iconMap = {
  target: Target,
  shield: ShieldCheck,
  users: Users,
  compass: Compass,
  heart: HeartHandshake,
  clipboard: ClipboardCheck,
  lightbulb: Lightbulb,
  map: MapPin,
  message: MessageCircle,
  monitor: MonitorCheck,
  file: FileText,
  route: Route,
  check: CheckCircle2
};

type DetailIcon = keyof typeof iconMap;

const serviceEditorialContent: Record<string, {
  introTitle: string;
  introParagraphs: string[];
  sideNote: { eyebrow: string; title: string; text: string };
  keyCards: { icon: DetailIcon; title: string; text: string }[];
  sections: { icon: DetailIcon; title: string; text: string }[];
  formats: { icon: DetailIcon; title: string; text: string }[];
}> = {
  'conseil-rh-entreprises': {
    introTitle: 'Un appui RH externe pour décider avec plus de recul',
    introParagraphs: [
      'Le conseil RH pour entreprises s’adresse aux dirigeants, DRH, RRH, managers et structures qui ont besoin de clarifier une situation humaine, managériale ou organisationnelle. Dans une TPE, une PME ou une organisation en transformation, les sujets RH sont rarement isolés : ils touchent à la stratégie, à la qualité du travail, à la communication interne, à la fidélisation des équipes et à la posture des responsables.',
      'Equinoxe Conseil RH intervient comme partenaire de recul. L’objectif est de comprendre le fonctionnement réel de l’organisation, d’identifier les priorités et de construire des réponses concrètes, proportionnées et applicables. L’accompagnement peut se faire à Toulouse, en Occitanie, à distance en visioconférence ou sur site lorsque la mission d’entreprise le nécessite.'
    ],
    sideNote: {
      eyebrow: 'Enjeu entreprise',
      title: 'Un regard externe pour clarifier les décisions RH',
      text: 'L’accompagnement aide les dirigeants, managers et équipes RH à prendre du recul sur les situations sensibles, structurer les priorités et construire des réponses concrètes adaptées à leur organisation.'
    },
    keyCards: [
      { icon: 'target', title: 'Cadrer les priorités RH', text: 'Identifier les urgences, distinguer les symptômes des causes et poser une feuille de route claire.' },
      { icon: 'users', title: 'Soutenir les managers', text: 'Aider les responsables à clarifier leur posture, leurs messages et leurs marges de manœuvre.' },
      { icon: 'shield', title: 'Sécuriser les décisions', text: 'Apporter un regard externe avant une réorganisation, une évolution de rôle ou une situation sensible.' }
    ],
    sections: [
      { icon: 'clipboard', title: 'Diagnostic RH et compréhension du contexte', text: 'L’accompagnement commence par une analyse de la situation : organisation du travail, pratiques RH existantes, attentes des dirigeants, vécu des équipes, points de tension, enjeux de fidélisation ou de communication. Cette étape permet de formuler un diagnostic clair et de prioriser les actions utiles.' },
      { icon: 'message', title: 'Management, communication et relations de travail', text: 'Les difficultés RH naissent souvent dans les zones grises : rôles mal définis, messages contradictoires, absence de cadre, tensions non traitées, perte de confiance. Le travail consiste à restaurer de la lisibilité et à soutenir les managers dans une communication plus juste et plus structurée.' },
      { icon: 'check', title: 'Mise en œuvre et suivi opérationnel', text: 'Le conseil RH ne reste pas au niveau de l’intention. Il peut se traduire par des ateliers, des temps de régulation, des supports de décision, des repères managériaux ou un accompagnement progressif de la transformation. Les actions sont ajustées au rythme, à la taille et à la maturité RH de l’organisation.' }
    ],
    formats: [
      { icon: 'compass', title: 'Diagnostic court', text: 'Pour clarifier rapidement une situation RH ou managériale.' },
      { icon: 'users', title: 'Ateliers dirigeants ou managers', text: 'Pour aligner les pratiques et partager un cadre commun.' },
      { icon: 'route', title: 'Mission sur mesure', text: 'Pour accompagner une transformation dans la durée.' }
    ]
  },
  'accompagnement-changement': {
    introTitle: 'Préparer les transitions sans perdre le sens ni l’engagement',
    introParagraphs: [
      'L’accompagnement du changement concerne les entreprises, équipes et managers confrontés à une transformation : réorganisation, croissance, évolution de métier, nouvelle gouvernance, changement d’outils, fusion, repositionnement stratégique ou évolution des pratiques RH. Un changement réussi ne dépend pas seulement d’un calendrier ou d’un plan de communication. Il dépend aussi de la manière dont les personnes comprennent, vivent et s’approprient la transition.',
      'Equinoxe Conseil RH aide à rendre le changement plus lisible. L’intervention permet d’anticiper les impacts humains, de structurer les messages, de soutenir les managers de proximité et de créer des espaces de dialogue. Selon le contexte, l’accompagnement peut combiner diagnostic, ateliers collectifs, coaching de managers, temps de régulation et suivi après déploiement.'
    ],
    sideNote: {
      eyebrow: 'Transformation',
      title: 'Préparer le changement avec les personnes concernées',
      text: 'L’enjeu est de rendre la transformation compréhensible, d’anticiper ses impacts humains et de soutenir les managers comme les équipes dans les moments de transition.'
    },
    keyCards: [
      { icon: 'compass', title: 'Donner du sens', text: 'Clarifier le pourquoi du changement et le rendre compréhensible pour les équipes.' },
      { icon: 'shield', title: 'Réduire l’incertitude', text: 'Identifier les impacts humains, les zones de risque et les besoins d’accompagnement.' },
      { icon: 'users', title: 'Mobiliser le collectif', text: 'Créer les conditions d’une coopération durable autour de la transformation.' }
    ],
    sections: [
      { icon: 'target', title: 'Analyser les impacts humains', text: 'Avant d’agir, il est nécessaire de comprendre ce que le changement modifie concrètement : responsabilités, repères, charge de travail, relations, compétences attendues, autonomie ou sentiment de reconnaissance. Cette analyse permet de traiter les résistances comme des informations utiles plutôt que comme de simples freins.' },
      { icon: 'message', title: 'Préparer la communication du changement', text: 'Les équipes ont besoin d’un récit clair, cohérent et incarné. L’accompagnement aide les dirigeants et managers à choisir les bons messages, à assumer les zones d’incertitude et à organiser des temps d’échange qui ne soient pas uniquement descendants.' },
      { icon: 'heart', title: 'Soutenir les managers et les équipes', text: 'Les managers portent souvent le changement au quotidien, parfois sans disposer de repères suffisants. Le travail peut porter sur leur posture, la régulation des tensions, la conduite d’ateliers, l’écoute des signaux faibles et le maintien de la qualité du travail pendant la transition.' }
    ],
    formats: [
      { icon: 'clipboard', title: 'Cartographie des impacts', text: 'Pour repérer ce que la transformation change réellement.' },
      { icon: 'message', title: 'Ateliers d’appropriation', text: 'Pour ouvrir le dialogue et construire des repères communs.' },
      { icon: 'check', title: 'Suivi post-déploiement', text: 'Pour ajuster après les premières mises en pratique.' }
    ]
  },
  'accompagnement-individuel': {
    introTitle: 'Un espace confidentiel pour clarifier sa posture et ses décisions',
    introParagraphs: [
      'L’accompagnement individuel s’adresse aux managers, dirigeants, salariés, entrepreneurs, étudiants et professionnels en transition qui souhaitent prendre du recul sur une situation professionnelle. Il peut s’agir d’une prise de poste, d’un questionnement de carrière, d’une difficulté relationnelle, d’un besoin de confiance, d’une surcharge, d’une décision importante ou d’un repositionnement.',
      'L’approche proposée par Equinoxe Conseil RH n’est pas standardisée. Elle part de la situation vécue, du contexte de travail, des ressources de la personne et de ses contraintes réelles. Les séances permettent de clarifier ce qui se joue, d’identifier les marges de manœuvre et de construire une manière d’agir plus alignée.'
    ],
    sideNote: {
      eyebrow: 'Accompagnement individuel',
      title: 'Un espace pour retrouver de la clarté',
      text: 'Le travail permet de poser les faits, comprendre ce qui se joue, clarifier sa posture et avancer avec des décisions plus justes dans un cadre confidentiel.'
    },
    keyCards: [
      { icon: 'compass', title: 'Prendre du recul', text: 'Sortir de l’urgence pour comprendre les enjeux professionnels et relationnels.' },
      { icon: 'heart', title: 'Renforcer sa posture', text: 'Travailler la confiance, la communication, le cadre et la prise de décision.' },
      { icon: 'target', title: 'Avancer concrètement', text: 'Définir des actions réalistes entre les séances et mesurer les avancées.' }
    ],
    sections: [
      { icon: 'message', title: 'Clarifier une situation professionnelle sensible', text: 'Une difficulté relationnelle, une prise de poste ou un conflit latent peut brouiller la lecture de la situation. L’accompagnement aide à distinguer les faits, les émotions, les enjeux de rôle et les choix possibles pour retrouver de la clarté.' },
      { icon: 'shield', title: 'Travailler dans un cadre confidentiel', text: 'La confidentialité permet de déposer les sujets sans jugement : doutes, fatigue, perte de sens, hésitation, peur de se tromper ou besoin de poser des limites. Ce cadre est essentiel pour élaborer des décisions plus solides.' },
      { icon: 'lightbulb', title: 'Transformer la réflexion en action', text: 'Chaque accompagnement vise des effets concrets : mieux préparer un échange, clarifier ses priorités, ajuster sa communication, reprendre sa place, sécuriser une décision ou construire une prochaine étape professionnelle.' }
    ],
    formats: [
      { icon: 'monitor', title: 'Séances en visio', text: 'Pour un accompagnement souple, régulier et confidentiel.' },
      { icon: 'map', title: 'Présentiel à Toulouse', text: 'Lorsque le cadre local est préférable.' },
      { icon: 'route', title: 'Parcours ajusté', text: 'Rythme et durée définis selon l’objectif travaillé.' }
    ]
  },
  'bilan-de-competences': {
    introTitle: 'Faire le point pour construire une trajectoire professionnelle cohérente',
    introParagraphs: [
      'Le bilan de compétences permet d’analyser son parcours, ses compétences, ses motivations, ses valeurs et ses conditions d’équilibre au travail. Il s’adresse aux salariés, professionnels en transition, entrepreneurs, étudiants ou particuliers qui souhaitent clarifier une évolution, préparer une mobilité, envisager une reconversion ou simplement mieux comprendre ce qui fait sens dans leur vie professionnelle.',
      'Chez Equinoxe Conseil RH, le bilan de compétences est conçu comme un travail sérieux, progressif et concret. Il ne s’agit pas de produire une idée de projet en surface, mais de relier l’histoire professionnelle, les ressources personnelles, la réalité du marché, les contraintes de vie et les conditions de faisabilité.'
    ],
    sideNote: {
      eyebrow: 'Projet professionnel',
      title: 'Faire le point sans repartir de zéro',
      text: 'Le bilan aide à relire son parcours, identifier ses ressources, explorer des pistes réalistes et construire une trajectoire professionnelle cohérente.'
    },
    keyCards: [
      { icon: 'file', title: 'Analyser son parcours', text: 'Relire les expériences, compétences, réussites, choix et moments de rupture.' },
      { icon: 'compass', title: 'Explorer les pistes', text: 'Identifier des options cohérentes avec ses motivations et le marché.' },
      { icon: 'check', title: 'Décider avec méthode', text: 'Construire un plan d’action réaliste, progressif et sécurisant.' }
    ],
    sections: [
      { icon: 'target', title: 'Comprendre ses moteurs professionnels', text: 'Le bilan explore ce qui donne de l’énergie, ce qui épuise, ce qui motive, ce qui bloque et ce qui devient nécessaire pour la suite. Cette étape permet de dépasser les réponses trop rapides et d’identifier des critères de choix solides.' },
      { icon: 'clipboard', title: 'Mettre en valeur ses compétences', text: 'Les compétences ne se résument pas à une fiche de poste. Le travail porte sur les savoir-faire, savoir-être, expériences transférables, appétences, modes de fonctionnement et ressources développées dans différents contextes.' },
      { icon: 'route', title: 'Construire un projet réalisable', text: 'La phase de projection confronte les pistes aux contraintes réelles : marché, formation, rythme, ressources financières, environnement personnel et étapes nécessaires. Le résultat attendu est une trajectoire plus claire, pas une promesse artificielle.' }
    ],
    formats: [
      { icon: 'shield', title: 'Cadre confidentiel', text: 'Un espace pour poser les questions de fond sans pression.' },
      { icon: 'monitor', title: 'À distance ou Toulouse', text: 'Des rendez-vous organisés selon les contraintes de chacun.' },
      { icon: 'file', title: 'Synthèse structurée', text: 'Un document de fin de parcours pour garder des repères.' }
    ]
  },
  'formations-ateliers-codeveloppement': {
    introTitle: 'Des formats collectifs pour apprendre, coopérer et transformer les pratiques',
    introParagraphs: [
      'Les formations, ateliers et groupes de co-développement permettent de travailler les pratiques RH, managériales et relationnelles dans un cadre collectif. Ils s’adressent aux entreprises, managers, équipes RH, collectifs de travail et réseaux professionnels qui souhaitent créer un espace de recul, partager les expériences et construire des repères communs.',
      'Equinoxe Conseil RH conçoit des formats sur mesure : ateliers de posture managériale, temps de co-développement, webinaires, formations courtes, tables rondes ou dispositifs collectifs autour de l’engagement, du sens au travail, de la coopération, de la communication, de la prévention des tensions ou de l’accompagnement du changement.'
    ],
    sideNote: {
      eyebrow: 'Collectif',
      title: 'Apprendre à partir des situations réelles',
      text: 'Les ateliers et le co-développement créent un cadre vivant pour partager les pratiques, analyser les situations de terrain et installer des repères communs.'
    },
    keyCards: [
      { icon: 'users', title: 'Faire collectif', text: 'Créer un espace de dialogue où les participants peuvent apprendre les uns des autres.' },
      { icon: 'lightbulb', title: 'Outiller les pratiques', text: 'Transformer les échanges en repères concrets pour le quotidien professionnel.' },
      { icon: 'message', title: 'Installer le dialogue', text: 'Favoriser la parole utile, la régulation et l’intelligence collective.' }
    ],
    sections: [
      { icon: 'clipboard', title: 'Concevoir un format adapté au besoin', text: 'Chaque intervention commence par un cadrage : public concerné, objectifs, niveau de maturité, contraintes de temps, sujets sensibles et livrables attendus. Le format est construit pour rester utile, vivant et directement relié au terrain.' },
      { icon: 'users', title: 'Animer des ateliers participatifs', text: 'Les ateliers alternent apports, échanges, mises en situation, analyse de cas et temps de formalisation. L’enjeu est d’éviter une formation descendante et de permettre aux participants de repartir avec des repères actionnables.' },
      { icon: 'heart', title: 'Développer la coopération et le co-développement', text: 'Le co-développement aide les professionnels à analyser collectivement des situations réelles, à bénéficier du regard des pairs et à renforcer leurs capacités de décision. C’est un format particulièrement pertinent pour les managers et équipes RH.' }
    ],
    formats: [
      { icon: 'users', title: 'Ateliers collectifs', text: 'Pour travailler un enjeu managérial ou RH précis.' },
      { icon: 'message', title: 'Co-développement', text: 'Pour analyser des situations réelles entre pairs.' },
      { icon: 'monitor', title: 'Webinaires', text: 'Pour sensibiliser un public plus large à distance.' }
    ]
  }
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
              onError={(event) => { event.currentTarget.src = '/images/meeting_collaboration.png'; }}
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
  const editorial = serviceEditorialContent[service.slug] ?? serviceEditorialContent['conseil-rh-entreprises'];
  
  return (
    <>
      <SEOHead title={service.seoTitle} description={service.seoDescription} schema={[serviceSchema(service), faqSchema(service.faqs)]} />
      
      {/* Section 1: PageHeader (With background, handled by default PageHeader styling) */}
      <PageHeader eyebrow="Accompagnement" title={service.title} text={service.shortDescription} />
      
      {/* Section 2: Content columns (Without background) */}
      <Section className="bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.95fr_0.62fr] lg:items-start">
            <div>
              <div className="prose-equinoxe max-w-none">
                <p className="text-lg leading-8"><HighlightedText text={service.longDescription} /></p>
                <h2 className="mt-8 font-serif text-3xl text-ink">{editorial.introTitle}</h2>
                {editorial.introParagraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-5"><HighlightedText text={paragraph} /></p>
                ))}
              </div>

              <div className="mt-7 rounded-[2rem] border border-sand bg-ivory p-5 sm:p-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-sage-dark">Repères pratiques</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {[
                    {
                      icon: MapPin,
                      label: 'Toulouse',
                      text: 'Présentiel possible selon le cadre.'
                    },
                    {
                      icon: MonitorCheck,
                      label: 'Visio',
                      text: 'Accompagnement à distance structuré.'
                    },
                    {
                      icon: ShieldCheck,
                      label: 'Cadre clair',
                      text: 'Confidentialité, méthode et objectifs.'
                    }
                  ].map(({ icon: Icon, label, text }) => (
                    <div key={label} className="rounded-2xl border border-sand bg-white p-4">
                      <Icon size={19} className="text-sage-dark" />
                      <p className="mt-3 text-sm font-bold text-ink">{label}</p>
                      <p className="mt-2 text-xs leading-5 text-anthracite/65"><HighlightedText text={text} /></p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="overflow-hidden rounded-[2rem] border border-sand bg-white p-3.5 shadow-soft">
                <img 
                  src={serviceImages[service.slug] || '/images/meeting_collaboration.png'} 
                  alt={service.title} 
                  onError={(event) => { event.currentTarget.src = '/images/meeting_collaboration.png'; }}
                  className="aspect-[4/3] w-full rounded-[1.5rem] object-cover"
                />
              </div>
              
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                <Card className="border border-sand bg-rosé">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage-dark">{editorial.sideNote.eyebrow}</p>
                  <h2 className="mt-3 font-serif text-2xl font-semibold leading-tight text-ink">{editorial.sideNote.title}</h2>
                  <p className="mt-5 leading-7 text-anthracite/80">
                    <HighlightedText text={editorial.sideNote.text} />
                  </p>
                </Card>
                
                <Card className="bg-white border border-sand">
                  <h2 className="font-serif text-2xl text-ink">Échanger sur ce besoin</h2>
                  <p className="mt-5 leading-7 text-anthracite/75">
                    Un premier échange permet de qualifier la situation et le cadre adapté, en visio, à Toulouse ou sur site selon la mission.
                  </p>
                  <div className="mt-5">
                    <ButtonLink to="/contact">Contacter Caroline</ButtonLink>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {editorial.keyCards.map(({ icon, title, text }) => {
              const Icon = iconMap[icon];
              return (
                <Card key={title} className="h-full border border-sand bg-ivory transition-all duration-500 hover:-translate-y-1 hover:border-sage-dark/25 hover:bg-white hover:shadow-soft">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-sage-dark shadow-sm">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-5 font-serif text-xl font-semibold leading-tight text-ink">{title}</h3>
                  <p className="mt-5 text-sm leading-7 text-anthracite/75"><HighlightedText text={text} /></p>
                </Card>
              );
            })}
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {editorial.sections.map(({ icon, title, text }) => {
              const Icon = iconMap[icon];
              return (
                <article key={title} className="h-full rounded-2xl border border-sand bg-white p-6 shadow-sm transition-all duration-500 hover:border-sage-dark/20 hover:shadow-soft">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-rosé text-sage-dark">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-5 font-serif text-2xl font-semibold leading-tight text-ink">{title}</h3>
                  <p className="mt-5 text-sm leading-7 text-anthracite/75 sm:text-base"><HighlightedText text={text} /></p>
                </article>
              );
            })}
          </div>

          <div className="mt-10 rounded-[2rem] border border-sand bg-rosé p-6 sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-sage-dark">Formats possibles</p>
                <h2 className="mt-2 font-serif text-3xl font-semibold text-ink">Un cadre ajusté à la situation</h2>
              </div>
              <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-sage-dark transition hover:text-ink">
                Demander un échange <ArrowRight size={16} />
              </Link>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {editorial.formats.map(({ icon, title, text }) => {
                const Icon = iconMap[icon];
                return (
                  <div key={title} className="rounded-2xl border border-sand bg-white p-5">
                    <Icon size={22} className="text-sage-dark" />
                    <h3 className="mt-4 font-serif text-xl font-semibold text-ink">{title}</h3>
                    <p className="mt-4 text-sm leading-6 text-anthracite/70"><HighlightedText text={text} /></p>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* Section 3: Practical details */}
      <Section className="border-y border-sand bg-sage/20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <Card className="border border-sand bg-white">
              <h2 className="font-serif text-2xl text-ink">Publics concernés</h2>
              <List items={service.targetAudience} compact highlight />
            </Card>
            <Card className="border border-sand bg-white">
              <h2 className="font-serif text-2xl text-ink">Problématiques traitées</h2>
              <List items={service.issues} compact highlight />
            </Card>
            <Card className="border border-sand bg-white">
              <h2 className="font-serif text-2xl text-ink">Bénéfices attendus</h2>
              <List items={service.benefits} compact highlight />
            </Card>
            <Card className="border border-sand bg-white">
              <h2 className="font-serif text-2xl text-ink">Exemples de situations</h2>
              <List items={service.examples} compact highlight />
            </Card>
          </div>

          <div className="mt-8 rounded-[2rem] border border-sand bg-white p-6 shadow-sm sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.35fr_0.65fr] lg:items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-sage-dark">Déroulé</p>
                <h2 className="mt-2 font-serif text-3xl font-semibold text-ink">Méthode d’accompagnement</h2>
                <p className="mt-5 text-sm leading-7 text-anthracite/75">
                  Chaque étape est ajustée au contexte : besoin individuel, équipe, dirigeant, entreprise ou collectif en transformation.
                </p>
              </div>
              <List items={service.method} ordered highlight />
            </div>
          </div>
        </Container>
      </Section>
      
      {/* Section 4: FAQ */}
      <Section className="bg-white">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="font-serif text-4xl text-ink">FAQ spécifique</h2>
            <p className="mt-4 text-anthracite/75">Questions fréquentes sur cet accompagnement.</p>
          </div>
          <FAQAccordion items={service.faqs} />
        </Container>
      </Section>
      
      {/* Section 5: Other services (Without background) */}
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

const highlightedKeywords = [
  'professionnels en transition',
  'transition professionnelle',
  'bilan de compétences',
  'accompagnement du changement',
  'Conseil RH',
  'Equinoxe Conseil RH',
  'Toulouse',
  'Occitanie',
  'distance',
  'visioconférence',
  'visio',
  'sur site',
  'entreprises',
  'entreprise',
  'dirigeants',
  'managers',
  'salariés',
  'entrepreneurs',
  'étudiants',
  'etudiants',
  'DRH',
  'RRH',
  'TPE',
  'PME',
  'RH',
  'accompagnement',
  'transition',
  'transformation',
  'management',
  'posture',
  'communication',
  'compétences',
  'co-développement',
  'équipes',
  'collectif',
  'confidentiel'
];

const sortedHighlightedKeywords = [...highlightedKeywords].sort((a, b) => b.length - a.length);
const highlightedPattern = new RegExp(`(${sortedHighlightedKeywords.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');

function HighlightedText({ text }: { text: string }) {
  return (
    <>
      {text.split(highlightedPattern).map((part, index) => {
        const isKeyword = sortedHighlightedKeywords.some((keyword) => keyword.toLowerCase() === part.toLowerCase());
        return isKeyword ? <strong key={`${part}-${index}`}>{part}</strong> : <span key={`${part}-${index}`}>{part}</span>;
      })}
    </>
  );
}

function List({ items, ordered = false, compact = false, highlight = false }: { items: string[]; ordered?: boolean; compact?: boolean; highlight?: boolean }) {
  if (ordered) {
    return (
      <ol className={`${compact ? 'space-y-2' : 'space-y-3'} mt-4 list-none pl-0`}>
        {items.map((item, idx) => (
          <li key={item} className={`flex items-start text-anthracite/85 ${compact ? 'gap-3 text-sm' : 'gap-4'}`}>
            <span className={`${compact ? 'h-5 w-5 text-xs' : 'h-6 w-6 text-sm'} flex shrink-0 items-center justify-center rounded-full bg-sage font-serif font-bold text-sage-dark`}>
              {idx + 1}
            </span>
            <span className="leading-7">{highlight ? <HighlightedText text={item} /> : item}</span>
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ul className={`${compact ? 'space-y-2' : 'space-y-3'} mt-4 list-none pl-0`}>
      {items.map((item) => (
        <li key={item} className={`flex items-start text-anthracite/85 ${compact ? 'gap-3 text-sm' : 'gap-4'}`}>
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-champagne" />
          <span className="leading-7">{highlight ? <HighlightedText text={item} /> : item}</span>
        </li>
      ))}
    </ul>
  );
}
