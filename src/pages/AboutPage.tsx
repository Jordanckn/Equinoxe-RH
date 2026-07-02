import { useEffect, useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { ButtonLink, Container, PageHeader, Section, Card } from '../components/ui';
import { personSchema } from '../lib/schemaMarkup';
import { Award, GraduationCap, Users, Heart, Lightbulb, ShieldCheck, Target } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export function AboutPage() {
  const [cabinetImg, setCabinetImg] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase.from('site_settings').select('value').eq('key', 'cabinet_image_url').single()
      .then(({ data }) => { if (data?.value) setCabinetImg(data.value); });
  }, []);

  const photoSrc = cabinetImg
    ?? '/images/Professeur TILLOU Caroline - TBS Education.webp';

  return (
    <>
      <SEOHead
        title="ACT&RH — Conseil RH & Coaching à Toulouse | Caroline Tillou Maratuech"
        description="ACT&RH est une structure indépendante fondée par Caroline Tillou Maratuech, docteure en GRH et coach certifiée RNCP 7. Accompagnement des transitions humaines, managériales et organisationnelles à Toulouse et à distance."
        schema={personSchema}
      />
      <PageHeader
        eyebrow="À Propos"
        title="ACT&RH"
        text="ACT&RH accompagne les transitions humaines avec une conviction : elles se traversent mieux quand elles sont comprises, nommées et accompagnées avec justesse."
      />

      {/* Valeurs & identité */}
      <Section className="bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <div className="space-y-10">

              {/* Bloc valeurs */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D8C3B5]">Notre identité</p>
                <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight text-ink">
                  L'exigence académique au service du terrain
                </h2>
                <p className="mt-5 text-lg leading-8 text-anthracite/80">
                  ACT&RH conjugue une rigueur scientifique issue de la recherche en GRH, une expérience de conseil RH et une pratique de l’accompagnement individuel, forgées sur plus de 20 ans auprès d'entreprises, de dirigeants et de professionnels en transition.
                </p>
                <p className="mt-4 text-base leading-7 text-anthracite/75">
                  Cette double compétence n'est pas un argument de vente — c'est une méthode de travail. Elle permet de poser un regard à la fois analytique et humain sur chaque situation, de ne pas plaquer de solutions standardisées, et d'aller au fond des enjeux pour construire des réponses qui tiennent.
                </p>
              </div>

              {/* Valeurs cartes */}
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { Icon: Target, titre: 'Clarté', texte: 'Nommer les choses avec précision pour ne pas tourner autour du problème.' },
                  { Icon: ShieldCheck, titre: 'Confidentialité', texte: 'Un cadre de travail sécurisé, sans jugement, avec une déontologie rigoureuse.' },
                  { Icon: Lightbulb, titre: 'Utilité réelle', texte: 'Des accompagnements concrets, ajustés à ce que vous vivez — pas à un modèle.' },
                ].map(({ Icon, titre, texte }) => (
                  <div key={titre} className="rounded-2xl border border-sand bg-ivory p-5">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#D8C3B5] shadow-sm">
                      <Icon size={20} />
                    </span>
                    <p className="mt-4 font-serif text-lg font-semibold text-ink">{titre}</p>
                    <p className="mt-2 text-sm leading-6 text-anthracite/70">{texte}</p>
                  </div>
                ))}
              </div>

              {/* Bloc cabinet */}
              <div className="border-t border-sand pt-8">
                <h2 className="font-serif text-3xl font-semibold text-ink">Caroline Tillou Maratuech</h2>
                <p className="mt-1 text-sm font-bold uppercase tracking-[0.14em] text-[#D8C3B5]">Fondatrice & dirigeante d'ACT&RH</p>
                <p className="mt-5 text-lg leading-8 text-anthracite/80">
                  Docteure en Gestion des Ressources Humaines et certifiée Coach Consultante RNCP Niveau 7, Caroline Tillou Maratuech réunit une double expertise rare : celle de la chercheuse qui comprend les dynamiques organisationnelles en profondeur, et celle de la praticienne qui sait agir dans le réel, avec les personnes, dans leurs contextes.
                </p>
                <p className="mt-4 text-base leading-7 text-anthracite/75">
                  Ses travaux de recherche ont porté sur la santé au travail, l'organisation et le management. Sa pratique terrain couvre le conseil RH aux TPE et PME, le coaching de dirigeants et de managers, l'accompagnement du changement, le bilan de compétences et les formations. Interlocutrice unique de ses clients, elle apporte une écoute fine et une présence constante — sans intermédiaire, sans sous-traitance.
                </p>
                <p className="mt-4 text-base leading-7 text-anthracite/75">
                  Son approche part toujours du même point : comprendre avant d'agir. Comprendre la situation, les personnes, les contraintes et les ressources disponibles — pour construire ensemble un chemin qui a du sens.
                </p>
                <div className="mt-8">
                  <ButtonLink to="/contact">Échanger avec Caroline</ButtonLink>
                </div>
              </div>
            </div>

            {/* Colonne droite : photo + points forts */}
            <div className="space-y-6 lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white p-3 shadow-[0_24px_60px_rgba(31,51,71,0.1)]">
                <img
                  src={photoSrc}
                  alt="Caroline Tillou Maratuech — ACT&RH"
                  onError={(e) => { e.currentTarget.src = '/images/caroline_portrait.webp'; }}
                  className="aspect-[4/5] w-full rounded-[1.25rem] object-cover object-center"
                />
              </div>

              <Card className="bg-rosé border border-sand">
                <h3 className="font-serif text-xl font-semibold text-ink mb-4">Parcours & certifications</h3>
                <div className="grid gap-3.5">
                  {([
                    ['Doctorat en Gestion des Ressources Humaines', GraduationCap, true],
                    ['Coach Consultante certifiée RNCP Niveau 7', Users, false],
                    ['+ 20 ans de pratique terrain', Award, true],
                    ['Approche centrée sur l\'humain', Heart, false],
                  ] as const).map(([title, Icon, isGold]) => (
                    <div key={String(title)} className="flex items-center gap-3.5">
                      <span className={`rounded-full p-2 ${isGold ? 'bg-[#D8C3B5]/15 text-[#D8C3B5]' : 'bg-sage/20 text-sage-dark'}`}>
                        <Icon size={16} />
                      </span>
                      <span className="text-sm font-semibold text-ink">{String(title)}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="border border-sand bg-white">
                <h3 className="font-serif text-xl font-semibold text-ink mb-3">Toulouse & à distance</h3>
                <p className="text-sm leading-6 text-anthracite/70">
                  Les accompagnements se déroulent en présentiel à Toulouse, en Occitanie ou en visioconférence selon votre contexte et vos besoins.
                </p>
                <div className="mt-4">
                  <ButtonLink to="/services" variant="secondary" className="w-full justify-center">
                    Voir les accompagnements
                  </ButtonLink>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
