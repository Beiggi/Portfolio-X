import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, Suspense, lazy } from 'react';
import ShinyBorderButton from '@/components/ui/ShinyBorderButton';

const Galaxy = lazy(() => import('@/components/effects/backgrounds/Galaxy'));

const Hero = () => {
  const { t } = useTranslation();
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const position = useTransform(scrollYProgress, (pos) =>
    pos >= 1 ? 'relative' : 'fixed',
  );

  const title = t('hero.title');
  const titleWords = title.split(' ');
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, damping: 12, stiffness: 100 },
    },
  };

  return (
    <section ref={targetRef} className="relative h-[200vh] w-full">
      <motion.div
        style={{ opacity, scale, position }}
        className="sticky top-0 h-screen w-full"
      >
        <div className="absolute inset-0 z-0 bg-background">
          <Suspense fallback={<div className="h-full w-full bg-black" />}>
            <Galaxy
              mouseRepulsion={true}
              mouseInteraction={true}
              density={1.5}
              glowIntensity={0.3}
              saturation={0}
              hueShift={240}
            />
          </Suspense>
        </div>
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-20 max-w-4xl text-center text-white">
            <motion.h1
              className="text-5xl font-black tracking-tight sm:text-7xl md:text-8xl"
              variants={titleContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {titleWords.map((word, index) => (
                <motion.span
                  key={index}
                  variants={wordVariants}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.h1>
            <motion.p
              className="mt-6 max-w-2xl text-lg text-foreground/80 sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {t('hero.subtitle')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="pointer-events-auto mt-10"
            >
              <ShinyBorderButton isLink href="#projects" text={t('hero.cta')} />
            </motion.div>
          </div>
          <div className="pointer-events-auto absolute bottom-10 z-20 text-center text-white">
            <a
              href="#projects"
              className="animate-bounce text-sm uppercase tracking-widest"
            >
              {t('hero.scroll')}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
