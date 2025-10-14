// /src/pages/Projects.tsx
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/domain/projects/ProjectCard';
import ScrollReveal from '@/components/effects/interactions/ScrollReveal';

const Projects = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Helmet>
        <title>{t('header.projects')} | Dereck Lizana</title>
        <meta
          name="description"
          content="A collection of projects by Dereck Lizana."
        />
      </Helmet>
      <section className="container mx-auto px-4 py-24 sm:py-32">
        <ScrollReveal>
          <h1 className="mb-12 text-center text-5xl font-black tracking-tight sm:text-7xl">
            {t('home.projectsTitle')}
          </h1>
        </ScrollReveal>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ScrollReveal key={project.slug} delay={index * 0.1}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;
