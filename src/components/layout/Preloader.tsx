import { motion } from 'framer-motion';

const Preloader = () => {
  const text = 'Renacimiento Digital';
  const letters = Array.from(text);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <motion.h1 className="text-4xl font-bold tracking-wider text-foreground md:text-6xl">
        {letters.map((letter, index) => (
          <motion.span key={index} variants={letterVariants} className="inline-block">
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </motion.h1>
    </motion.div>
  );
};

export default Preloader;
