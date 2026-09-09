import { useEffect, useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { ButtonLink, Container, PageHeader, Section, Card } from '../components/ui';
import { breadcrumbSchema, personSchema } from '../lib/schemaMarkup';
import { Award, GraduationCap, Users, Heart, Lightbulb, ShieldCheck, Target, BookOpen, Building2, HeartHandshake, ChevronDown } from 'lucide-react';
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
        title="Ma démarche | Caroline Tillou Maratuech — Docteure en GRH, conseil RH & accompagnement individuel | ACT&RH"
        description="Recherche en gestion des ressources humaines, enseignement, conseil RH et accompagnement individuel : la démarche de Caroline Tillou Maratuech, fondatrice d'ACT&RH, à Toulouse, en Occitanie, en France et à distance."
        schema={[personSchema, breadcrumbSchema([{ name: 'Accueil', url: '/' }, { name: 'Ma démarche', url: '/a-propos' }])]}
      />
      <PageHeader
        eyebrow="Ma démarche"
        title="Ce qui nourrit ma pratique"
        text="Recherche, enseignement, conseil RH et accompagnement individuel : quatre dimensions complémentaires, réunies dans une même manière de travailler."
      />

      {/* Valeurs & identité */}
      <Section className="bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <div className="space-y-10">

              {/* Bloc valeurs */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-champagne-dark">Notre identité</p>
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
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-champagne-dark shadow-sm">
                      <Icon size={20} />
                    </span>
                    <p className="mt-4 font-serif text-lg font-semibold text-ink">{titre}</p>
                    <p className="mt-2 text-sm leading-6 text-anthracite/70">{texte}</p>
                  </div>
                ))}
              </div>

              {/* Les quatre dimensions */}
              <div className="border-t border-sand pt-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-champagne-dark">Quatre dimensions complémentaires</p>
                <h2 className="mt-3 font-serif text-3xl font-semibold text-ink">Recherche, enseignement, conseil RH, accompagnement</h2>
                <div className="mt-6 space-y-4">
                  {[
                    {
                      icon: BookOpen,
                      title: 'La recherche',
                      text: "Caroline est titulaire d'un doctorat en gestion des ressources humaines. Elle mène depuis plus de 20 ans des recherches en sciences de gestion autour notamment de l'engagement au travail, du sens au travail, des relations professionnelles, de la gestion du changement et des transformations organisationnelles. Sa recherche est appliquée et part de problématiques réelles d'entreprises et d'organisations. Sa thèse a notamment été menée en collaboration avec le SYNTEC Conseil en Management auprès d'acteurs du secteur en France."
                    },
                    {
                      icon: GraduationCap,
                      title: "L'enseignement",
                      text: "Caroline est enseignante-chercheuse à TBS Education. Enseigner, transmettre et confronter ses travaux à la réflexion des étudiants et des professionnels qu'elle forme nourrit directement sa pratique de conseil et d'accompagnement : c'est un point de passage constant entre la recherche et le terrain."
                    },
                    {
                      icon: Building2,
                      title: 'Le conseil RH',
                      text: "Le conseil RH confronte les concepts issus de la recherche aux réalités quotidiennes des organisations : structuration des pratiques, posture managériale, situations individuelles ou collectives, accompagnement des transformations. C'est là que les cadres de lecture rencontrent les contraintes réelles d'une équipe, d'un dirigeant ou d'une organisation."
                    },
                    {
                      icon: HeartHandshake,
                      title: "L'accompagnement individuel",
                      text: "L'accompagnement individuel s'adresse aux personnes confrontées à une évolution professionnelle, une prise de responsabilité, un questionnement ou une transition. Il permet de prendre du recul sur une difficulté ponctuelle, d'identifier ses marges de manœuvre et d'avancer avec plus de clarté."
                    }
                  ].map(({ icon: Icon, title, text }) => (
                    <details key={title} className="group rounded-2xl border border-sand bg-ivory p-0 shadow-sm transition-all duration-300 open:border-sage-dark/25 open:bg-white open:shadow-soft">
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
                </div>
              </div>

              {/* Pourquoi ces dimensions sont réunies */}
              <div className="border-t border-sand pt-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-champagne-dark">Pourquoi ces dimensions sont réunies</p>
                <h2 className="mt-3 font-serif text-3xl font-semibold text-ink">Recherche → Terrain → Transmission → Accompagnement</h2>
                <p className="mt-5 text-base leading-7 text-anthracite/75">
                  La recherche apporte des clés de lecture. Le terrain confronte ces clés à la réalité. L'enseignement permet de prendre du recul et de transmettre. L'accompagnement permet de mobiliser tout cela au service d'une situation singulière.
                </p>
                <div className="relative mt-6 grid gap-4 sm:grid-cols-4">
                  {[
                    { label: 'Recherche', icon: BookOpen },
                    { label: 'Terrain', icon: Building2 },
                    { label: 'Transmission', icon: GraduationCap },
                    { label: 'Accompagnement', icon: HeartHandshake }
                  ].map(({ label, icon: Icon }, index) => (
                    <div key={label} className="relative flex items-center gap-3 rounded-2xl border border-sand bg-ivory px-3 py-4 shadow-[0_10px_24px_rgba(14,27,41,0.035)] sm:flex-col sm:items-center sm:gap-0 sm:text-center">
                      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink bg-ink text-champagne sm:mx-auto">
                        <Icon size={18} />
                      </span>
                      <p className="min-w-0 flex-1 font-serif text-sm font-semibold leading-tight text-ink sm:mt-3 sm:w-full sm:flex-none sm:text-base">{label}</p>
                      <span className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-ink sm:mx-auto sm:mt-3">
                        {index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Positionnement personnel */}
              <div className="border-t border-sand pt-8">
                <h2 className="font-serif text-3xl font-semibold text-ink">Une même question, des réponses différentes</h2>
                <p className="mt-5 text-base leading-7 text-anthracite/75">
                  Caroline ne cherche pas à appliquer des réponses toutes faites. Une même question peut appeler des réponses différentes selon la personne, l'organisation, son histoire, ses ressources et son contexte.
                </p>
                <p className="mt-4 text-base leading-7 text-anthracite/75">
                  Son rôle n'est pas de décider à la place du client. Il consiste à apporter un regard extérieur, structurer la réflexion, mettre la situation en perspective et identifier ce qui peut réellement être fait.
                </p>
              </div>

              {/* Présentation ACT&RH */}
              <div className="border-t border-sand pt-8">
                <h2 className="font-serif text-3xl font-semibold text-ink">ACT&RH</h2>
                <p className="mt-5 text-lg leading-8 text-anthracite/80">
                  ACT&RH a été créé pour réunir deux formes d'intervention : le conseil en ressources humaines pour les organisations, et l'accompagnement individuel pour les personnes. Une même manière de travailler : partir du réel, regarder ce qui se joue, mobiliser des connaissances solides et construire une réponse adaptée.
                </p>
                <div className="mt-6 rounded-2xl border border-sand bg-ivory p-6">
                  <p className="font-serif text-lg font-semibold text-ink">Caroline Tillou Maratuech</p>
                  <p className="mt-1 text-sm font-semibold text-sage-dark">Docteure en Gestion des Ressources Humaines · Enseignante-chercheuse · Consultante RH · Professionnelle de l'accompagnement individuel</p>
                  <p className="mt-3 text-sm leading-6 text-anthracite/70">Plus de 20 ans de recherche et de pratique autour des ressources humaines, du management et des relations au travail.</p>
                </div>
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
                      <span className={`rounded-full p-2 ${isGold ? 'bg-champagne/15 text-champagne-dark' : 'bg-sage/20 text-sage-dark'}`}>
                        <Icon size={16} />
                      </span>
                      <span className="text-sm font-semibold text-ink">{String(title)}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="border border-sand bg-white">
                <h3 className="font-serif text-xl font-semibold text-ink mb-3">Toulouse · Occitanie · France · À distance</h3>
                <p className="text-sm leading-6 text-anthracite/70">
                  Les accompagnements se déroulent en présentiel à Toulouse, en Occitanie, partout en France ou en visioconférence selon votre contexte et vos besoins.
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
