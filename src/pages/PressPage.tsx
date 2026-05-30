import { BadgeCheck, BookOpenText, ExternalLink, Mic2 } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Card, Container, PageHeader, Section } from '../components/ui';

type PressItem = {
  title: string;
  date: string;
  themes: string;
  text: string;
  link?: string;
  cta?: string;
};

type PressSection = {
  title: string;
  intro: string;
  icon: typeof BookOpenText;
  items: PressItem[];
};

const pressSections: PressSection[] = [
  {
    title: 'Articles et recherches scientifiques',
    intro: 'Des publications académiques sur les pratiques RH, le sens au travail, l’engagement et la fidélisation des talents.',
    icon: BookOpenText,
    items: [
      {
        title: 'Rester ou partir ? - Management international',
        date: '2022',
        themes: 'Fidélisation des talents, cabinets de conseil, pratiques RH, travailleurs du savoir',
        text: 'Dans cet article publié dans la revue Management international, Caroline Tillou Maratuech analyse, avec Al Ariss, ce qui fait vraiment rester ou partir les consultants en management dans 17 cabinets français. En décortiquant les pratiques RH au prisme du modèle AMO, elle montre à quel point les relations interpersonnelles et la qualité du lien consultant-client peuvent être un levier ou un risque de départ.',
        link: 'https://www.erudit.org/en/journals/mi/2022-v26-n1-mi06945/1088434ar/',
        cta: 'En savoir plus'
      },
      {
        title: 'Soutien organisationnel, sens au travail et stress en France - European Management Journal',
        date: '2023',
        themes: 'Soutien organisationnel perçu, sens au travail, engagement, stress, salariés en France',
        text: 'Publiée dans European Management Journal, cette étude menée sur 1 111 salariés français montre comment le soutien perçu de l’organisation renforce le sens au travail, l’engagement et réduit le stress. Les résultats confirment que lorsque les collaborateurs se sentent soutenus, ils trouvent plus de sens dans ce qu’ils font, s’engagent davantage et résistent mieux à la pression.',
        link: 'https://www.sciencedirect.com/science/article/abs/pii/S0263237321001808',
        cta: 'En savoir plus'
      },
      {
        title: 'Le rôle des RH dans la fidélisation des consultants - Management & Avenir',
        date: '2018',
        themes: 'Rôles des professionnels RH, fidélisation des consultants, cabinets de conseil en management',
        text: 'Dans Management & Avenir, Caroline Tillou met en lumière le rôle pivot des professionnels RH pour fidéliser les consultants, ces travailleurs du savoir très convoités. En s’appuyant sur une typologie des rôles RH, elle montre comment la fonction RH peut devenir un véritable moteur de rétention, au-delà des seuls discours sur le talent management.',
        link: 'https://ouci.dntb.gov.ua/en/works/9GNm3g3l/',
        cta: 'En savoir plus'
      },
      {
        title: 'Pourquoi les consultants français veulent-ils quitter leurs employeurs ? - Revue GRH',
        date: '2012',
        themes: 'Intention de départ, pratiques de GRH, formation, rémunération, conditions de travail',
        text: 'Cet article de la Revue de Gestion des Ressources Humaines décortique les raisons pour lesquelles les consultants envisagent de quitter leur cabinet. Caroline Tillou y montre l’impact très concret des pratiques RH - formation, rémunération, conditions de travail, soutien ressenti - sur l’envie de rester ou de partir.',
        link: 'https://fr.scribd.com/document/1009568441/GRHU-22-Pourquoi-les-consultants-francais-veulent-ils',
        cta: 'En savoir plus'
      },
      {
        title: 'Le mentorat des consultants : fidélisation ou tremplin ? - Management international',
        date: '2015',
        themes: 'Mentorat, fidélisation, consultants salariés, carrières externes',
        text: 'Dans cet article de Management international, Caroline Tillou interroge le mentorat des consultants : est-ce un outil de fidélisation ou un moyen de mieux partir ? En analysant les effets du mentorat sur les trajectoires de carrière, elle montre que ce dispositif peut à la fois renforcer l’attachement à l’entreprise et ouvrir la porte à de nouvelles opportunités externes.'
      }
    ]
  },
  {
    title: 'Interventions & médias',
    intro: 'Des interventions dans des événements professionnels sur le sens au travail, l’engagement et le rôle du management.',
    icon: Mic2,
    items: [
      {
        title: 'Table ronde MEDEF 31 - Entrepreneurs, collaborateurs, en quête de sens au travail',
        date: '7 décembre 2022',
        themes: 'Quête de sens au travail, engagement, burnout, grande démission, rôle du manager',
        text: 'Invitée par le MEDEF 31, Caroline Tillou Maratuech intervient comme chercheuse en GRH à TBS Education et gérante d’Equinoxe RH dans une table ronde sur la quête de sens au travail. Face à un dirigeant, un représentant d’Harmonie Mutuelle et un médecin du travail, elle décrypte les nouvelles attentes des collaborateurs, les risques de désengagement et les leviers concrets pour redonner du sens au quotidien.',
        link: 'https://www.youtube.com/watch?v=F-eDjnBROAc',
        cta: 'Voir la vidéo'
      }
    ]
  },
  {
    title: 'Présence professionnelle & expertise',
    intro: 'Une présence professionnelle qui relie recherche académique, enseignement, conseil RH et accompagnement des organisations.',
    icon: BadgeCheck,
    items: [
      {
        title: 'Fiche experte - Au Cœur du Management',
        date: 'Page institutionnelle',
        themes: 'Enseignement supérieur, management des ressources humaines, expérience professionnelle',
        text: 'Sur le site Au Cœur du Management, Caroline Tillou Maratuech est présentée comme enseignante-chercheuse en management des ressources humaines, avec plus de 15 ans d’expérience en GRH. Sa fiche met en avant ses domaines d’expertise : engagement, innovations managériales, santé et bien-être au travail, sens, fidélisation, ainsi que son double rôle de chercheuse et de consultante.',
        link: 'https://www.aucoeurdumanagement.com/l-equipe/',
        cta: 'En savoir plus'
      },
      {
        title: 'EQINOX - Conseil RH & coaching professionnel',
        date: 'Site de cabinet',
        themes: 'Conseil RH, coaching individuel, coaching d’équipe, leadership, accompagnement du changement',
        text: 'Avec EQINOX, Caroline accompagne dirigeants, managers et équipes dans les moments clés de leur évolution professionnelle. Le site présente une offre sur-mesure de conseil RH et de coaching individuel et collectif pour travailler le leadership, la performance, l’alignement avec le sens et l’équilibre vie professionnelle / vie personnelle.',
        link: 'https://www.eqinoxcoaching.com',
        cta: 'Découvrir EQINOX'
      },
      {
        title: 'Equinoxe - Notre expertise',
        date: 'Site de cabinet',
        themes: 'Raison d’être, RSE, évolution des modèles managériaux et organisationnels, capital humain',
        text: 'Sur le site Equinoxe, l’expertise mise en avant vise à aider les organisations à révéler leur raison d’être, structurer leur démarche RSE et faire évoluer leurs modèles managériaux autour du capital humain. On y retrouve la conviction que la performance durable passe par des pratiques managériales alignées avec le sens, la santé et l’engagement des équipes.',
        link: 'https://equinoxe-management.com/notre-expertise/',
        cta: 'Découvrir notre expertise'
      },
      {
        title: 'Profil LinkedIn',
        date: 'Profil professionnel',
        themes: 'Enseignante-chercheuse TBS Education, consultante RH, coach en entreprise',
        text: 'Sur LinkedIn, Caroline Tillou Maratuech se présente comme consultante coach en entreprise, enseignante-chercheuse en management des ressources humaines à TBS Education et consultante RH pour Equinoxe Conseil RH. Son profil illustre la continuité entre ses recherches académiques et ses interventions de terrain auprès des dirigeants et de leurs équipes.',
        link: 'https://www.linkedin.com/in/caroline-tillou-maratuech-2b30372a',
        cta: 'Voir le profil'
      }
    ]
  }
];

export function PressPage() {
  return (
    <>
      <SEOHead
        title="On parle de nous | Publications, médias et expertise | Equinoxe Conseil RH"
        description="Publications scientifiques, interventions médias et présence professionnelle de Caroline Tillou Maratuech, consultante RH, coach et enseignante-chercheuse."
      />
      <PageHeader
        eyebrow="On parle de nous"
        title="Publications, médias et expertise"
        text="Chercheuse en management des ressources humaines, consultante RH et coach, Caroline Tillou Maratuech est régulièrement publiée dans des revues scientifiques et intervient sur le sens au travail, l’engagement et la santé au travail."
      />

      <Section className="bg-white">
        <Container className="space-y-16">
          {pressSections.map((section, index) => (
            <section key={section.title} className="scroll-mt-24">
              <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sage text-sage-dark">
                    <section.icon size={24} />
                  </div>
                  <h2 className="font-serif text-3xl font-semibold leading-tight text-ink sm:text-5xl">{section.title}</h2>
                  <p className="mt-4 max-w-3xl text-lg leading-8 text-anthracite/70">{section.intro}</p>
                </div>
                <span className="text-sm font-bold uppercase tracking-[0.18em] text-sage-dark">{String(index + 1).padStart(2, '0')}</span>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                {section.items.map((item) => (
                  <ArticleCard key={item.title} item={item} />
                ))}
              </div>
            </section>
          ))}
        </Container>
      </Section>
    </>
  );
}

function ArticleCard({ item }: { item: PressItem }) {
  return (
    <Card className="flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:border-sage-dark/25 hover:shadow-[0_24px_60px_rgba(31,51,71,0.1)]">
      <div className="mb-5 flex flex-wrap gap-3">
        <span className="rounded-full bg-[#EAF3FF] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-ink">{item.date}</span>
      </div>
      <h3 className="font-serif text-2xl font-semibold leading-tight text-ink">{item.title}</h3>
      <p className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-sage-dark">{item.themes}</p>
      <p className="mt-4 flex-1 leading-7 text-anthracite/75">{item.text}</p>
      {item.link ? (
        <a
          href={item.link}
          target="_blank"
          rel="noreferrer"
          className="focus-ring mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition hover:bg-sage-dark"
        >
          {item.cta ?? 'En savoir plus'} <ExternalLink size={15} />
        </a>
      ) : null}
    </Card>
  );
}
