import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AboutPage } from './pages/AboutPage';
import { AdminPage } from './pages/AdminPage';
import { ArticlePage, BlogPage } from './pages/BlogPages';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { ServiceDetailPage, ServicesIndexPage } from './pages/ServicesPages';
import { FAQPage, LegalPage, LocalSeoPage, TestimonialsPage } from './pages/UtilityPages';

export default function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<Layout><PublicRoutes /></Layout>} />
    </Routes>
  );
}

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/a-propos" element={<AboutPage />} />
      <Route path="/services" element={<ServicesIndexPage />} />
      <Route path="/services/:slug" element={<ServiceDetailPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<ArticlePage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/temoignages" element={<TestimonialsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/conseil-rh-toulouse" element={<LocalSeoPage kind="rh-toulouse" />} />
      <Route path="/coaching-professionnel-toulouse" element={<LocalSeoPage kind="coaching-toulouse" />} />
      <Route path="/bilan-de-competences-toulouse" element={<LocalSeoPage kind="bilan-toulouse" />} />
      <Route path="/accompagnement-changement-occitanie" element={<LocalSeoPage kind="changement-occitanie" />} />
      <Route path="/conseil-rh-a-distance" element={<LocalSeoPage kind="distance" />} />
      <Route path="/mentions-legales" element={<LegalPage type="mentions" />} />
      <Route path="/politique-confidentialite" element={<LegalPage type="privacy" />} />
      <Route path="/cookies" element={<LegalPage type="cookies" />} />
      <Route path="/cgv-cgu" element={<LegalPage type="cgv" />} />
    </Routes>
  );
}
