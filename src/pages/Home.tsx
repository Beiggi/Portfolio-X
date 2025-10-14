// /src/pages/Home.tsx
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Hero from '@/components/layout/Hero';
import ProjectCard from '@/components/domain/projects/ProjectCard';
import ScrollReveal from '@/components/effects/interactions/ScrollReveal';
import ShinyBorderButton from '@/components/ui/ShinyBorderButton';
import { projects } from '@/data/projects';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <motion.div>
      <Helmet>
        <title>{t('meta.home.title')}</title>
        <meta name="description" content={t('meta.home.description')} />
      </Helmet>
      <Hero />
      <div className="relative z-10 -mt-[100vh] flex h-[100vh] flex-col items-center justify-center bg-background">
        <ScrollReveal>
          <ShinyBorderButton
            text="About Me"
            onClick={() => navigate('/about')}
          />
        </ScrollReveal>
      </div>
      <section
        id="projects"
        className="container relative z-10 mx-auto bg-background px-4 py-16 sm:py-24"
      >
        <ScrollReveal>
          <h2 className="mb-12 text-center text-4xl font-bold tracking-tight sm:text-5xl">
            {t('home.projectsTitle')}
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 8).map((project, index) => (
            <ScrollReveal key={project.slug} delay={index * 0.1}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-16 text-center">
          <ShinyBorderButton
            text="See All Projects"
            onClick={() => navigate('/projects')}
          />
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
