import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Hero from '@/components/layout/Hero';
import HorizontalScrollCarousel from '@/components/domain/projects/HorizontalScrollCarousel';
import { projects } from '@/data/projects';
import ContactForm from '@/components/ui/ContactForm';

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('home.metaTitle')}</title>
        <meta name="description" content={t('home.metaDescription')} />
      </Helmet>
      <div>
        <Hero />
        <div id="projects">
          <HorizontalScrollCarousel projects={projects} />
        </div>
        <div className="container mx-auto px-4 py-16">
          <ContactForm />
        </div>
      </div>
    </>
  );
};

export default Home;
