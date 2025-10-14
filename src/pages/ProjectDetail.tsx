// /src/pages/ProjectDetail.tsx
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import NotFound from './NotFound';
import { Helmet } from 'react-helmet-async';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return <NotFound />;
  }

  const currentLang = i18n.language as 'es' | 'en' | 'it';
  const details = project.details[currentLang];

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const textItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-background">
      <Helmet>
        <title>{`${details.title} - ${t('meta.project.titleSuffix')}`}</title>
        <meta name="description" content={details.challenge} />
      </Helmet>

      <div className="container mx-auto max-w-4xl px-4 py-16">
        <motion.img
          layoutId={`project-image-${project.slug}`}
          src={project.imageUrl}
          alt={details.title}
          className="mb-12 aspect-video w-full rounded-lg object-cover"
        />

        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={textItemVariants} className="mb-8">
            <Link to="/projects" className="text-primary hover:underline">
              &larr; {t('project.back')}
            </Link>
          </motion.div>

          <motion.h1
            variants={textItemVariants}
            className="mb-4 text-4xl font-black tracking-tight sm:text-6xl"
          >
            {details.title}
          </motion.h1>
          <motion.p
            variants={textItemVariants}
            className="mb-8 text-lg text-foreground/80"
          >
            {details.description}
          </motion.p>

          <div className="prose prose-invert prose-h2:text-2xl prose-h2:font-bold prose-p:text-gray-300 max-w-none">
            <motion.h2 variants={textItemVariants}>
              {t('project.challenge')}
            </motion.h2>
            <motion.p variants={textItemVariants}>{details.challenge}</motion.p>
            <motion.h2 variants={textItemVariants}>
              {t('project.solution')}
            </motion.h2>
            <motion.p variants={textItemVariants}>{details.solution}</motion.p>
          </div>

          <motion.div
            variants={textItemVariants}
            className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {/* ... */}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
