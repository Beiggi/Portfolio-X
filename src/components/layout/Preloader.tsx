// /src/components/layout/Preloader.tsx
import { motion } from 'framer-motion';

const Preloader = () => {
  const text = 'LOADING...';
  const chars = text.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeInOut' as const },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-background"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h1
        className="text-2xl font-bold tracking-widest text-foreground"
        aria-label={text}
      >
        {chars.map((char, index) => (
          <motion.span key={index} variants={charVariants}>
            {char}
          </motion.span>
        ))}
      </motion.h1>
    </motion.div>
  );
};

export default Preloader;
