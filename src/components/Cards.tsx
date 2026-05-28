import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Star, 
  Building2, 
  TrendingUp, 
  User, 
  Award, 
  Users,
  LucideIcon
} from 'lucide-react';
import type { BlogPost, Service, Testimonial } from '../types';
import { Card } from './ui';

const serviceIcons: Record<string, LucideIcon> = {
  'conseil-rh-entreprises': Building2,
  'accompagnement-changement': TrendingUp,
  'accompagnement-individuel': User,
  'bilan-de-competences': Award,
  'formations-ateliers-codeveloppement': Users,
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon = serviceIcons[service.slug] || Award;
  return (
    <Card className="flex h-full flex-col group hover:-translate-y-1 hover:shadow-md transition-all duration-300">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-sage/20 text-sage-dark group-hover:bg-sage-dark group-hover:text-white transition-all duration-300">
        <Icon size={22} />
      </div>
      <h3 className="font-serif text-2xl font-semibold text-ink group-hover:text-sage-dark transition-colors duration-300">{service.title}</h3>
      <p className="mt-4 flex-1 leading-7 text-anthracite/75">{service.shortDescription}</p>
      <Link className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sage-dark hover:text-ink transition-colors duration-300" to={`/services/${service.slug}`}>
        Découvrir <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
      </Link>
    </Card>
  );
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="flex h-full flex-col group hover:-translate-y-1 hover:shadow-md transition-all duration-300">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage-dark">{post.category}</p>
      <h3 className="mt-3 font-serif text-2xl font-semibold text-ink group-hover:text-sage-dark transition-colors duration-300">{post.title}</h3>
      <p className="mt-4 flex-1 leading-7 text-anthracite/75">{post.excerpt}</p>
      <Link className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sage-dark hover:text-ink transition-colors duration-300" to={`/blog/${post.slug}`}>
        Lire l’article <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
      </Link>
    </Card>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="group hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
      <div className="flex gap-1 text-champagne" aria-label={`${testimonial.rating} sur 5`}>
        {Array.from({ length: testimonial.rating }).map((_, index) => <Star key={index} size={17} fill="currentColor" />)}
      </div>
      <p className="mt-5 leading-7 text-anthracite/80 italic">“{testimonial.content}”</p>
      <p className="mt-5 font-semibold text-ink">{testimonial.client_name}</p>
      <p className="text-sm text-anthracite/60">{testimonial.client_role}</p>
      {testimonial.is_placeholder ? <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-sage-dark">Placeholder administrable</p> : null}
    </Card>
  );
}

