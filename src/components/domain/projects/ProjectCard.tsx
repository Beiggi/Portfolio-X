// /src/components/domain/projects/ProjectCard.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { i18n } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  const currentLang = i18n.language as 'es' | 'en' | 'it';
  const details = project.details[currentLang];

  return (
    <Link to={`/projects/${project.slug}`}>
      <motion.div
        className="group overflow-hidden rounded-lg bg-secondary shadow-lg"
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 300 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-video overflow-hidden">
          <motion.img
            layoutId={`project-image-${project.slug}`}
            src={project.imageUrl}
            alt={details.title}
            className="h-full w-full object-cover"
            width="600"
            height="338"
          />
          <AnimatePresence>
            {isHovered && project.videoUrl && (
              <motion.video
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 z-10 h-full w-full object-cover"
              >
                <source src={project.videoUrl} type="video/mp4" />
              </motion.video>
            )}
          </AnimatePresence>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold">{details.title}</h3>
          <p className="mt-2 text-sm text-foreground/70">{project.category}</p>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;
