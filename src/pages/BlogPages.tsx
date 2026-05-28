import { useParams } from 'react-router-dom';
import { BlogCard } from '../components/Cards';
import { SEOHead } from '../components/SEOHead';
import { Container, PageHeader, Section } from '../components/ui';
import { posts } from '../data/content';
import { articleSchema } from '../lib/schemaMarkup';
import { useSupabaseRows } from '../hooks/useSupabaseRows';
import type { BlogPost } from '../types';

export function BlogPage() {
  const livePosts = useSupabaseRows<BlogPost>('blog_posts', posts, 'published_at');
  return (
    <>
      <SEOHead title="Blog RH, management et transitions professionnelles | Equinoxe Conseil RH" description="Articles sur le conseil RH, le management, l’accompagnement du changement, le bilan de compétences et les transitions professionnelles." />
      <PageHeader eyebrow="Blog" title="Ressources RH, management et accompagnement professionnel" text="Des articles structurés pour Google, Bing, les moteurs IA et les lecteurs qui cherchent des repères utiles." />
      <Section><Container><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{livePosts.map((post) => <BlogCard key={post.id} post={post} />)}</div></Container></Section>
    </>
  );
}

export function ArticlePage() {
  const { slug } = useParams();
  const livePosts = useSupabaseRows<BlogPost>('blog_posts', posts, 'published_at');
  const post = livePosts.find((item) => item.slug === slug) ?? posts.find((item) => item.slug === slug) ?? posts[0];
  return (
    <>
      <SEOHead title={post.seo_title ?? post.title} description={post.seo_description ?? post.excerpt} schema={articleSchema(post)} />
      <PageHeader eyebrow={post.category} title={post.title} text={post.excerpt} />
      <Section className="bg-white">
        <Container className="prose-equinoxe max-w-3xl">
          {post.content.split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </Container>
      </Section>
    </>
  );
}
