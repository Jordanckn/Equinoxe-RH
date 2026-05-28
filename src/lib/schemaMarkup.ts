import type { BlogPost, FAQ, Service } from '../types';

const baseUrl = 'https://www.equinoxe-rh.fr';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'ProfessionalService'],
  name: 'Equinoxe Conseil RH',
  founder: 'Caroline Tillou Maratuech',
  url: baseUrl,
  email: 'contact@equinoxe-rh.fr',
  telephone: '+33687022508',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '35 chemin de Buissaison',
    postalCode: '31180',
    addressLocality: 'Lapeyrouse-Fossat',
    addressRegion: 'Occitanie',
    addressCountry: 'FR'
  },
  areaServed: ['Toulouse', 'Haute-Garonne', 'Occitanie', 'France', 'Visioconférence'],
  sameAs: ['https://www.linkedin.com/']
};

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Caroline Tillou Maratuech',
  jobTitle: 'Consultante RH, coach professionnelle et docteure en gestion des ressources humaines',
  worksFor: { '@type': 'Organization', name: 'Equinoxe Conseil RH' },
  knowsAbout: ['Conseil RH', 'Accompagnement du changement', 'Coaching professionnel', 'Bilan de compétences']
};

export function faqSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer }
    }))
  };
}

export function serviceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    provider: organizationSchema,
    areaServed: ['Toulouse', 'Occitanie', 'France à distance'],
    audience: service.targetAudience.join(', '),
    description: service.shortDescription,
    url: `${baseUrl}/services/${service.slug}`
  };
}

export function articleSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: personSchema,
    publisher: organizationSchema,
    datePublished: post.published_at,
    mainEntityOfPage: `${baseUrl}/blog/${post.slug}`
  };
}
