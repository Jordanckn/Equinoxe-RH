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
    <Card className="group flex h-full flex-col transition-all duration-500 hover:-translate-y-2 hover:border-champagne/30 hover:shadow-[0_30px_70px_rgba(14,27,41,0.08)] bg-white border border-sand">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-sage/40 text-sage-dark transition-all duration-500 group-hover:scale-110 group-hover:bg-sage-dark group-hover:text-white">
        <Icon size={22} className="transition-transform duration-500" />
      </div>
      <h3 className="font-serif text-2xl font-semibold text-ink transition-colors duration-500 group-hover:text-sage-dark">{service.title}</h3>
      <p className="mt-4 flex-1 leading-7 text-anthracite/75 group-hover:text-anthracite/90 transition-colors duration-500">{service.shortDescription}</p>
      <Link className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-sage-dark transition-colors duration-500 hover:text-ink group-hover:translate-x-1" to={`/services/${service.slug}`}>
        Découvrir <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1.5" />
      </Link>
    </Card>
  );
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="group flex h-full flex-col transition-all duration-500 hover:-translate-y-2 hover:border-champagne/30 hover:shadow-[0_30px_70px_rgba(14,27,41,0.08)] bg-white border border-sand">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-sage-dark">{post.category}</p>
      <h3 className="mt-3 font-serif text-2xl font-semibold text-ink transition-colors duration-500 group-hover:text-sage-dark">{post.title}</h3>
      <p className="mt-4 flex-1 leading-7 text-anthracite/75 group-hover:text-anthracite/90 transition-colors duration-500">{post.excerpt}</p>
      <Link className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-sage-dark transition-colors duration-500 hover:text-ink group-hover:translate-x-1" to={`/blog/${post.slug}`}>
        Lire l’article <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1.5" />
      </Link>
    </Card>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="group transition-all duration-500 hover:-translate-y-1 hover:border-champagne/30 hover:shadow-[0_30px_70px_rgba(14,27,41,0.08)] bg-white border border-sand">
      <div className="flex gap-1 text-champagne transition-transform duration-500 group-hover:scale-105" aria-label={`${testimonial.rating} sur 5`}>
        {Array.from({ length: testimonial.rating }).map((_, index) => <Star key={index} size={17} fill="currentColor" />)}
      </div>
      <p className="mt-5 leading-7 text-anthracite/80 italic">"{testimonial.content}"</p>
      <p className="mt-5 font-semibold text-ink">{testimonial.client_name}</p>
      <p className="text-sm text-anthracite/60">{testimonial.client_role}</p>
      {testimonial.is_placeholder ? <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-sage-dark">Placeholder administrable</p> : null}
    </Card>
  );
}
