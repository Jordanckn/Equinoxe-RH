import type { BlogPost, FAQ, Service, Testimonial } from '../types';

export const contactInfo = {
  name: 'Caroline Tillou Maratuech',
  company: 'Equinoxe Conseil RH',
  phone: '06 87 02 25 08',
  phoneHref: '+33687022508',
  email: 'contact@equinoxe-rh.fr',
  address: '35 chemin de Buissaison, 31180 Lapeyrouse-Fossat',
  hours: '9h à 18h, sauf samedi',
  linkedin: 'https://www.linkedin.com/'
};
export const navItems = [
  { label: 'Accueil', href: '/' },
  { label: 'Le Cabinet', href: '/a-propos' },
  { label: 'Conseil & Coaching', href: '/services' },
  { label: 'Ressources RH', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' }
];

const serviceFaq = (related_page: string): FAQ[] => [
  {
    id: `${related_page}-1`,
    question: 'Un premier échange est-il possible avant de s’engager ?',
    answer: 'Oui. Un premier échange permet de comprendre la situation, de clarifier le besoin et de vérifier le cadre d’accompagnement pertinent.',
    category: 'Modalités',
    related_page,
    status: 'published',
    display_order: 1
  },
  {
    id: `${related_page}-2`,
    question: 'L’accompagnement peut-il se faire à distance ?',
    answer: 'Oui. Les accompagnements peuvent être organisés à Toulouse, en Occitanie ou à distance en visioconférence selon les besoins.',
    category: 'Modalités',
    related_page,
    status: 'published',
    display_order: 2
  }
];

export const services: Service[] = [
  {
    title: 'Conseil RH pour entreprises',
    slug: 'conseil-rh-entreprises',
    shortDescription: 'Un appui RH sur mesure pour les dirigeants, managers, DRH, RRH, TPE et PME confrontés à des enjeux humains, managériaux ou organisationnels.',
    longDescription: 'Equinoxe Conseil RH accompagne les organisations dans la clarification de leurs enjeux RH, l’évolution des pratiques managériales, la prévention des tensions et le soutien des collectifs de travail.',
    targetAudience: ['Dirigeants', 'Managers', 'DRH et RRH', 'TPE et PME', 'Structures en transformation'],
    issues: ['Organisation RH', 'Engagement et fidélisation', 'Posture managériale', 'Communication interne', 'Prévention des tensions', 'Soutien organisationnel'],
    benefits: ['Clarifier les priorités RH', 'Renforcer la confiance', 'Sécuriser les transformations', 'Outiller les managers', 'Préserver l’engagement des équipes'],
    method: ['Analyse du contexte', 'Identification des enjeux', 'Co-construction des solutions', 'Accompagnement de la mise en œuvre', 'Ajustements progressifs'],
    examples: ['Prise de recul sur une situation managériale complexe', 'Accompagnement d’une évolution d’organisation', 'Soutien à une politique de fidélisation', 'Animation de temps collectifs'],
    faqs: serviceFaq('conseil-rh-entreprises'),
    seoTitle: 'Cabinet Conseil RH Toulouse - Accompagnement Entreprises & Dirigeants',
    seoDescription: 'Conseil RH à Toulouse et à distance pour dirigeants, managers, DRH, TPE et PME. Accompagnement humain, sur mesure et structuré.'
  },
  {
    title: 'Accompagnement du changement',
    slug: 'accompagnement-changement',
    shortDescription: 'Un cadre d’accompagnement pour préparer, traverser et ancrer les transitions individuelles, collectives et organisationnelles.',
    longDescription: 'Le changement ne se décrète pas. Il se comprend, se prépare, se partage et s’ajuste. Caroline Tillou Maratuech accompagne les organisations avant, pendant et après les transformations.',
    targetAudience: ['Entreprises', 'Collectifs', 'Managers', 'Dirigeants', 'Professionnels en transition'],
    issues: ['Transformation organisationnelle', 'Évolution des métiers', 'Résistances', 'Charge émotionnelle', 'Communication du changement'],
    benefits: ['Donner du sens', 'Réduire les zones d’incertitude', 'Mobiliser les parties prenantes', 'Préserver la qualité du travail', 'Installer des repères durables'],
    method: ['Diagnostic humain', 'Cartographie des impacts', 'Préparation des messages', 'Ateliers collectifs', 'Suivi après déploiement'],
    examples: ['Réorganisation d’équipe', 'Changement de pratiques RH', 'Transition managériale', 'Accompagnement post-transformation'],
    faqs: serviceFaq('accompagnement-changement'),
    seoTitle: 'Conseil en Accompagnement du Changement & Transitions | Toulouse',
    seoDescription: 'Accompagnement du changement individuel, collectif et organisationnel à Toulouse, en Occitanie et à distance.'
  },
  {
    title: 'Accompagnement individuel',
    slug: 'accompagnement-individuel',
    shortDescription: 'Un accompagnement personnalisé pour clarifier sa posture, ses décisions, ses priorités et ses transitions professionnelles.',
    longDescription: 'L’accompagnement individuel aide les managers, dirigeants, salariés, entrepreneurs, étudiants et particuliers à prendre du recul, structurer leur réflexion et avancer avec plus de clarté.',
    targetAudience: ['Managers', 'Dirigeants', 'Salariés', 'Entrepreneurs', 'Étudiants', 'Particuliers'],
    issues: ['Prise de poste', 'Posture professionnelle', 'Communication', 'Stress', 'Confiance', 'Décision professionnelle', 'Évolution de carrière'],
    benefits: ['Clarifier les enjeux', 'Retrouver des marges de manœuvre', 'Poser des priorités', 'Renforcer sa posture', 'Avancer dans un cadre confidentiel'],
    method: ['Écoute de la situation', 'Clarification des objectifs', 'Séances régulières', 'Travail sur les ressources', 'Bilan des avancées'],
    examples: ['Prise de fonction manager', 'Transition professionnelle', 'Difficulté relationnelle', 'Besoin de clarification avant une décision'],
    faqs: serviceFaq('accompagnement-individuel'),
    seoTitle: 'Coaching Professionnel & Accompagnement Individuel | Toulouse',
    seoDescription: 'Accompagnement individuel pour managers, dirigeants, salariés, entrepreneurs, étudiants et particuliers à Toulouse ou à distance.'
  },
  {
    title: 'Bilan de compétences',
    slug: 'bilan-de-competences',
    shortDescription: 'Un bilan de compétences pour analyser son parcours, identifier ses ressources et construire un projet professionnel cohérent.',
    longDescription: 'Le bilan de compétences proposé par Equinoxe Conseil RH offre un cadre confidentiel et structuré pour faire le point, explorer des options et clarifier un projet réaliste.',
    targetAudience: ['Salariés', 'Professionnels en transition', 'Entrepreneurs', 'Étudiants', 'Particuliers'],
    issues: ['Perte de sens', 'Envie d’évolution', 'Reconversion', 'Questionnement professionnel', 'Besoin de projection'],
    benefits: ['Mieux comprendre son parcours', 'Identifier compétences et motivations', 'Explorer des pistes', 'Construire un plan d’action', 'Décider avec plus de recul'],
    method: ['Phase préliminaire', 'Investigation du parcours', 'Exploration des pistes', 'Synthèse', 'Plan d’action'],
    examples: ['Reconversion', 'Évolution interne', 'Retour à l’emploi', 'Clarification après une période de doute'],
    faqs: serviceFaq('bilan-de-competences'),
    seoTitle: 'Bilan de Compétences Toulouse - Cabinet Conseil RH',
    seoDescription: 'Bilan de compétences à Toulouse et à distance pour clarifier son projet professionnel dans un cadre confidentiel et personnalisé.'
  },
  {
    title: 'Formations, ateliers et co-développement',
    slug: 'formations-ateliers-codeveloppement',
    shortDescription: 'Des formats collectifs pour travailler les pratiques RH, managériales et relationnelles avec méthode et participation.',
    longDescription: 'Equinoxe Conseil RH conçoit et anime des formations, webinaires, tables rondes, ateliers et groupes de co-développement adaptés aux enjeux des équipes.',
    targetAudience: ['Entreprises', 'Managers', 'Équipes RH', 'Collectifs de travail', 'Réseaux professionnels'],
    issues: ['Engagement', 'Fidélisation', 'Sécurité psychologique', 'Télétravail', 'Management', 'Communication'],
    benefits: ['Créer un espace de recul', 'Partager les pratiques', 'Renforcer l’intelligence collective', 'Outiller les équipes', 'Installer des repères communs'],
    method: ['Cadrage du besoin', 'Conception du format', 'Animation participative', 'Synthèse opérationnelle', 'Suivi si nécessaire'],
    examples: ['Atelier posture managériale', 'Webinaire engagement', 'Groupe de co-développement', 'Table ronde RH'],
    faqs: serviceFaq('formations-ateliers-codeveloppement'),
    seoTitle: 'Formations RH, Ateliers & Co-développement à Toulouse | Equinoxe',
    seoDescription: 'Formations RH, ateliers collectifs, webinaires et co-développement pour managers, équipes RH et collectifs de travail.'
  }
];

export const faqs: FAQ[] = [
  { id: 'faq-1', question: 'Qui est Caroline Tillou Maratuech ?', answer: 'Caroline Tillou Maratuech est consultante RH, coach professionnelle, docteure en gestion des ressources humaines et fondatrice d’Equinoxe Conseil RH.', category: 'Général', status: 'published', display_order: 1 },
  { id: 'faq-2', question: 'Qu’est-ce qu’Equinoxe Conseil RH ?', answer: 'Equinoxe Conseil RH accompagne les entreprises, dirigeants, managers et particuliers dans leurs enjeux RH, managériaux et professionnels.', category: 'Général', status: 'published', display_order: 2 },
  { id: 'faq-3', question: 'Intervenez-vous à Toulouse uniquement ?', answer: 'Non. Les interventions ont lieu à Toulouse, en Haute-Garonne, en Occitanie et partout en France à distance.', category: 'Modalités', status: 'published', display_order: 3 },
  { id: 'faq-4', question: 'Proposez-vous des accompagnements à distance ?', answer: 'Oui. La visioconférence permet d’organiser des accompagnements individuels ou collectifs avec un cadre clair et souple.', category: 'Modalités', status: 'published', display_order: 4 },
  { id: 'faq-5', question: 'Travaillez-vous avec les particuliers ?', answer: 'Oui. Caroline accompagne salariés, managers, entrepreneurs, étudiants et particuliers en transition professionnelle.', category: 'Publics', status: 'published', display_order: 5 },
  { id: 'faq-6', question: 'Travaillez-vous avec les entreprises ?', answer: 'Oui. Equinoxe Conseil RH intervient auprès de dirigeants, managers, équipes RH, TPE, PME et structures en transformation.', category: 'Publics', status: 'published', display_order: 6 },
  { id: 'faq-7', question: 'Comment se déroule un premier rendez-vous ?', answer: 'Le premier échange sert à comprendre votre situation, préciser votre besoin et identifier le type d’accompagnement adapté.', category: 'Modalités', status: 'published', display_order: 7 },
  { id: 'faq-8', question: 'Quelle est la différence entre conseil RH, coaching et bilan de compétences ?', answer: 'Le conseil RH porte sur les enjeux d’organisation et de pratiques RH. Le coaching accompagne une personne ou un collectif dans sa posture et ses décisions. Le bilan de compétences clarifie un projet professionnel.', category: 'Services', status: 'published', display_order: 8 },
  { id: 'faq-9', question: 'Proposez-vous des accompagnements collectifs ?', answer: 'Oui. Des ateliers, formations, webinaires, tables rondes et groupes de co-développement peuvent être conçus selon les besoins.', category: 'Services', status: 'published', display_order: 9 },
  { id: 'faq-10', question: 'Comment prendre contact ?', answer: 'Vous pouvez utiliser le formulaire de contact, appeler le 06 87 02 25 08 ou écrire à contact@equinoxe-rh.fr.', category: 'Contact', status: 'published', display_order: 10 }
];

export const testimonials: Testimonial[] = [
  { id: 't-1', client_name: 'Témoignage à remplacer', client_role: 'Direction de PME', client_type: 'Entreprise', content: 'Avis placeholder administrable depuis Supabase. Remplacer par un témoignage réel ou masquer la section depuis l’admin.', rating: 5, is_placeholder: true, status: 'published', display_order: 1 },
  { id: 't-2', client_name: 'Témoignage à remplacer', client_role: 'Manager accompagné', client_type: 'Individuel', content: 'Avis placeholder administrable depuis Supabase. Il permet de valider la mise en page avant publication de retours clients réels.', rating: 5, is_placeholder: true, status: 'published', display_order: 2 }
];

export const posts: BlogPost[] = [
  {
    id: 'p-1',
    title: 'Comment accompagner le changement en entreprise sans épuiser les équipes ?',
    slug: 'accompagner-changement-entreprise-sans-epuiser-equipes',
    excerpt: 'Un changement réussi repose autant sur la méthode que sur l’attention portée aux personnes qui le traversent.',
    content: 'Le changement en entreprise ne se limite pas à un calendrier de déploiement. Il transforme les repères, les habitudes, les responsabilités et parfois l’identité professionnelle des équipes.\n\nPour éviter l’épuisement, il est essentiel de clarifier le sens du changement, d’identifier les impacts concrets, de prévoir des espaces d’écoute et de donner aux managers des repères pour accompagner les situations sensibles.\n\nUn accompagnement structuré permet de distinguer ce qui relève de l’organisation, de la communication, du management et du vécu individuel.',
    category: 'Accompagnement du changement',
    tags: ['changement', 'management', 'équipes'],
    seo_title: 'Accompagner le changement en entreprise sans épuiser les équipes',
    seo_description: 'Repères RH et managériaux pour accompagner le changement en entreprise avec méthode et attention aux équipes.',
    status: 'published',
    featured: true,
    published_at: '2026-01-12'
  },
  {
    id: 'p-2',
    title: 'Pourquoi faire appel à une consultante RH à Toulouse ?',
    slug: 'pourquoi-faire-appel-consultante-rh-toulouse',
    excerpt: 'Une consultante RH externe aide les dirigeants et managers à prendre du recul sur leurs enjeux humains et organisationnels.',
    content: 'Faire appel à une consultante RH à Toulouse permet de bénéficier d’un regard extérieur, ancré dans la réalité du territoire et suffisamment distancié pour clarifier les situations.\n\nLes entreprises sollicitent souvent un appui RH lorsqu’elles traversent une transformation, une tension d’équipe, une difficulté de fidélisation ou un besoin de structuration managériale.',
    category: 'Conseil RH',
    tags: ['Toulouse', 'conseil RH', 'PME'],
    seo_title: 'Consultante RH à Toulouse : pourquoi se faire accompagner ?',
    seo_description: 'Comprendre l’intérêt d’un accompagnement RH externe à Toulouse pour les dirigeants, managers, TPE et PME.',
    status: 'published',
    featured: false,
    published_at: '2026-01-20'
  },
  {
    id: 'p-3',
    title: 'Bilan de compétences : à quel moment se poser les bonnes questions ?',
    slug: 'bilan-de-competences-moment-se-poser-bonnes-questions',
    excerpt: 'Le bilan de compétences aide à clarifier une trajectoire professionnelle lorsque les repères deviennent moins évidents.',
    content: 'Un bilan de compétences peut être utile lorsqu’une personne ressent une perte de sens, envisage une reconversion, souhaite évoluer ou a besoin de prendre du recul sur son parcours.\n\nIl ne s’agit pas uniquement de changer de métier. Il s’agit d’identifier ses ressources, ses contraintes, ses motivations et les conditions d’un projet professionnel réaliste.',
    category: 'Bilan de compétences',
    tags: ['bilan de compétences', 'transition professionnelle'],
    seo_title: 'Bilan de compétences : quand se poser les bonnes questions ?',
    seo_description: 'Identifier les moments où un bilan de compétences peut aider à clarifier son avenir professionnel.',
    status: 'published',
    featured: false,
    published_at: '2026-02-02'
  },
  {
    id: 'p-4',
    title: 'Management, confiance et engagement : les leviers d’une relation durable',
    slug: 'management-confiance-engagement-leviers-relation-durable',
    excerpt: 'La confiance managériale se construit dans la cohérence, l’écoute et la clarté du cadre.',
    content: 'L’engagement au travail ne dépend pas uniquement des dispositifs RH. Il se nourrit de relations professionnelles cohérentes, d’un cadre compréhensible et d’une reconnaissance du travail réel.\n\nLe management a un rôle central : clarifier les attentes, réguler les tensions, soutenir l’autonomie et maintenir un dialogue exigeant mais respectueux.',
    category: 'Management',
    tags: ['management', 'confiance', 'engagement'],
    status: 'published',
    featured: false,
    published_at: '2026-02-14'
  },
  {
    id: 'p-5',
    title: 'Accompagnement individuel : clarifier sa posture professionnelle',
    slug: 'accompagnement-individuel-clarifier-posture-professionnelle',
    excerpt: 'Prendre du recul sur sa posture permet d’agir avec davantage de justesse dans les situations professionnelles sensibles.',
    content: 'Clarifier sa posture professionnelle signifie comprendre ce qui se joue dans une situation, identifier ses marges de manœuvre et choisir une manière d’agir cohérente.\n\nL’accompagnement individuel offre un cadre confidentiel pour travailler les décisions, la communication, la confiance et la relation aux autres.',
    category: 'Coaching professionnel',
    tags: ['coaching', 'posture', 'transition'],
    status: 'published',
    featured: false,
    published_at: '2026-03-01'
  },
  {
    id: 'p-6',
    title: 'Conseil RH à distance : une solution souple pour les dirigeants et managers',
    slug: 'conseil-rh-distance-solution-souple-dirigeants-managers',
    excerpt: 'L’accompagnement RH à distance permet de maintenir un cadre exigeant tout en facilitant l’accès au conseil.',
    content: 'Le conseil RH à distance est particulièrement adapté aux dirigeants et managers qui ont besoin d’un regard externe sans contrainte géographique.\n\nLa visioconférence permet de travailler les situations, préparer les décisions, structurer les démarches RH et accompagner les transformations avec souplesse.',
    category: 'Conseil RH',
    tags: ['à distance', 'dirigeants', 'managers'],
    status: 'published',
    featured: false,
    published_at: '2026-03-18'
  }
];
