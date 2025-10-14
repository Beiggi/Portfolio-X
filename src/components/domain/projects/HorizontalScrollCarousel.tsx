// /src/components/domain/projects/HorizontalScrollCarousel.tsx
import { motion, useTransform, useScroll } from 'framer-motion';
import { useRef } from 'react';

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ['1%', '-65%']);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-secondary">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          <div className="group relative h-[450px] w-[450px] overflow-hidden bg-background">
            <div className="absolute inset-0 z-10 grid place-content-center">
              <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
                Card 1
              </p>
            </div>
          </div>
          <div className="group relative h-[450px] w-[450px] overflow-hidden bg-background">
            <div className="absolute inset-0 z-10 grid place-content-center">
              <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
                Card 2
              </p>
            </div>
          </div>
          <div className="group relative h-[450px] w-[450px] overflow-hidden bg-background">
            <div className="absolute inset-0 z-10 grid place-content-center">
              <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
                Card 3
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScrollCarousel;
