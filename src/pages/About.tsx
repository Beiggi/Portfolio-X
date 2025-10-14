// /src/pages/About.tsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import HorizontalScrollCarousel from '@/components/domain/projects/HorizontalScrollCarousel';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0.8, 1], ['-20%', '20%']);

  return (
    <motion.div ref={containerRef}>
      <div className="relative h-[150vh]">
        <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
          <div className="container mx-auto grid grid-cols-1 items-center px-4 lg:grid-cols-2">
            <div className="max-w-md">
              <h1 className="text-5xl font-black md:text-7xl">Sobre Mí</h1>
              <p className="mt-4 text-lg text-foreground/80">
                Soy un arquitecto de software y desarrollador frontend con una
                década de experiencia creando productos digitales de alto
                impacto.
              </p>
            </div>
          </div>
        </div>
      </div>

      <HorizontalScrollCarousel />

      <div className="relative h-screen overflow-hidden">
        <motion.h2
          style={{ y: parallaxY }}
          className="flex h-full items-center justify-center text-center text-6xl font-black text-foreground/10 md:text-9xl"
        >
          HABLEMOS.
        </motion.h2>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="max-w-lg text-center text-xl">
            Siempre estoy abierto a nuevas colaboraciones y proyectos
            desafiantes.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
