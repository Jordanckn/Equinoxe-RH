import { useEffect } from 'react';

type SEOHeadProps = {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  schema?: object | object[];
};

export function SEOHead({ title, description, canonical, image, type = 'website', schema }: SEOHeadProps) {
  useEffect(() => {
    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', type);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    if (image) {
      const absoluteImage = image.startsWith('http') ? image : `${window.location.origin}${image}`;
      upsertMeta('property', 'og:image', absoluteImage);
      upsertMeta('name', 'twitter:image', absoluteImage);
    }
    upsertLink('canonical', canonical ?? window.location.href);

    const id = 'schema-jsonld';
    document.getElementById(id)?.remove();
    if (schema) {
      const script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(Array.isArray(schema) ? schema : [schema]);
      document.head.appendChild(script);
    }
  }, [title, description, canonical, image, type, schema]);

  return null;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
}
