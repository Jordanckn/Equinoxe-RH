import { Linkedin, Mail, Phone } from 'lucide-react';
import { ContactForm } from '../components/ContactForm';
import { SEOHead } from '../components/SEOHead';
import { Card, Container, PageHeader, Section } from '../components/ui';
import { contactInfo } from '../data/content';
import { organizationSchema } from '../lib/schemaMarkup';

export function ContactPage() {
  return (
    <>
      <SEOHead title="Contact | Equinoxe Conseil RH Toulouse" description="Contacter Caroline Tillou Maratuech pour un besoin de conseil RH, coaching, accompagnement du changement ou bilan de compétences." schema={organizationSchema} />
      <PageHeader eyebrow="Contact" title="Échanger sur votre situation et vos besoins" text="Le formulaire permet de qualifier votre demande. Caroline Tillou Maratuech reviendra vers vous prochainement." />
      <Section className="bg-white">
        <Container className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <Card className="h-fit">
            <h2 className="font-serif text-3xl text-ink">Coordonnées</h2>
            <div className="mt-6 grid gap-4 text-anthracite/75">
              <a href={`tel:${contactInfo.phoneHref}`} className="flex items-center gap-3 transition hover:text-sage-dark"><Phone size={18} /> {contactInfo.phone}</a>
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 transition hover:text-sage-dark"><Mail size={18} /> {contactInfo.email}</a>
              <a href={contactInfo.linkedin} className="flex items-center gap-3 transition hover:text-sage-dark"><Linkedin size={18} /> LinkedIn</a>
              <p>{contactInfo.address}</p>
              <p>{contactInfo.hours}</p>
            </div>
          </Card>
          <ContactForm />
        </Container>
      </Section>
    </>
  );
}
