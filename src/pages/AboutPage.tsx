import { SEOHead } from '../components/SEOHead';
import { ButtonLink, Container, PageHeader, Section, Card } from '../components/ui';
import { personSchema } from '../lib/schemaMarkup';
import { Award, GraduationCap, Users, Heart } from 'lucide-react';

export function AboutPage() {
  return (
    <>
      <SEOHead title="Le Cabinet de Conseil RH & Coaching à Toulouse | Equinoxe" description="Parcours, vision et approche de Caroline Tillou Maratuech, consultante RH, coach professionnelle et docteure en gestion des ressources humaines." schema={personSchema} />
      <PageHeader eyebrow="À propos" title="Caroline Tillou Maratuech" text="Fondatrice d’Equinoxe Conseil RH, Caroline accompagne les transitions humaines, professionnelles et organisationnelles avec méthode, écoute et justesse." />
      <Section className="bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <div className="prose-equinoxe max-w-none space-y-10">
              <div>
                <h2 className="font-serif text-3xl font-semibold text-ink border-b border-sage/20 pb-2 mb-4">Le cabinet Equinoxe Conseil RH</h2>
                <p className="text-lg leading-8 text-anthracite/80">
                  Equinoxe Conseil RH est un cabinet indépendant d'accompagnement et de conseil RH. 
                  Il a été fondé pour répondre à un besoin précis : <strong>sécuriser les transitions humaines, organisationnelles et managériales</strong> 
                  au sein des entreprises et accompagner les parcours professionnels des particuliers.
                </p>
                <p className="mt-4 text-base leading-7 text-anthracite/75">
                  Intervenant principalement à Toulouse, en région Occitanie et à distance, le cabinet se distingue par une approche sobre, 
                  ajustée et respectueuse de la réalité de chaque structure. Qu'il s'agisse de conseil en ressources humaines, de prévention des tensions, 
                  d'accompagnement du changement ou de bilans de compétences, Equinoxe place la clarté du cadre, la confiance réciproque et le respect 
                  du travail réel au cœur de toutes ses interventions.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-3xl font-semibold text-ink border-b border-sage/20 pb-2 mb-4">Caroline Tillou Maratuech, fondatrice & dirigeante</h2>
                <p className="text-lg leading-8 text-anthracite/80">
                  À la tête d'Equinoxe Conseil RH, Caroline Tillou Maratuech réunit une double expertise rare, 
                  croisant une <strong>solide expérience de terrain</strong> et une <strong>rigueur académique reconnue</strong>.
                </p>
                <p className="mt-4 text-base leading-7 text-anthracite/75">
                  Docteure en Gestion des Ressources Humaines (chercheuse sur les thématiques de santé au travail, d'organisation et de management) 
                  et certifiée Coach Consultante RNCP Niveau 7, elle totalise plus de 20 ans d'exercice. En tant qu'interlocutrice unique de ses clients, 
                  elle apporte aux dirigeants, managers et collaborateurs une écoute active d'une grande finesse, exempte de solutions toutes faites, 
                  pour dénouer les situations complexes et redonner de la marge de manœuvre.
                </p>
              </div>
              
              <div className="not-prose pt-4">
                <ButtonLink to="/contact">Échanger sur votre projet</ButtonLink>
              </div>
            </div>
            
            <div className="space-y-6 lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white p-3 shadow-[0_24px_60px_rgba(31,51,71,0.1)]">
                <img 
                  src="/images/Professeur TILLOU Caroline - TBS Education.webp" 
                  alt="Portrait de Caroline Tillou Maratuech" 
                  className="aspect-[4/5] w-full rounded-[1.25rem] object-cover object-center"
                />
              </div>
              
              <Card className="bg-[#EAF3FF]">
                <h3 className="font-serif text-xl font-semibold text-ink mb-4">Points forts</h3>
                <div className="grid gap-3.5">
                  {[
                    ['Dr. en Gestion des Ressources Humaines', GraduationCap, 'sage-dark'],
                    ['Coach Certifiée RNCP Niveau 7', Users, 'champagne'],
                    ['Pratique déontologique de haut niveau', Award, 'sage-dark'],
                    ['Écoute active & Centrée humain', Heart, 'champagne']
                  ].map(([title, Icon, colorClass]) => {
                    const cl = colorClass === 'champagne' ? 'text-champagne bg-champagne/10' : 'text-sage-dark bg-sage/20';
                    return (
                      <div key={String(title)} className="flex items-center gap-3.5">
                        <span className={`rounded-full p-2 ${cl}`}>
                          <Icon size={16} />
                        </span>
                        <span className="text-sm font-semibold text-ink">{String(title)}</span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
