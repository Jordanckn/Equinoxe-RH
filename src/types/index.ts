export type Status = 'draft' | 'published';

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url?: string | null;
  category: string;
  tags: string[];
  seo_title?: string | null;
  seo_description?: string | null;
  status: Status;
  featured: boolean;
  published_at?: string | null;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
  related_page?: string | null;
  status: Status;
  display_order: number;
};

export type Testimonial = {
  id: string;
  client_name: string;
  client_role: string;
  client_type: string;
  content: string;
  rating: number;
  is_placeholder: boolean;
  status: Status;
  display_order: number;
};

export type Service = {
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  targetAudience: string[];
  issues: string[];
  benefits: string[];
  method: string[];
  examples: string[];
  faqs: FAQ[];
  seoTitle: string;
  seoDescription: string;
};

export type LeadInput = {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  profile_type: string;
  need_type: string;
  preferred_contact: string;
  message: string;
  consent: boolean;
  source: string;
};
