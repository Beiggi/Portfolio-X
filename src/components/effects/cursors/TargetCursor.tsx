import { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

interface TargetCursorProps {
  hideDefaultCursor?: boolean;
}

const TargetCursor = ({ hideDefaultCursor = false }: TargetCursorProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    const handleMouseOver = (ev: MouseEvent) => {
      if ((ev.target as Element).closest('a, button')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (ev: MouseEvent) => {
      if ((ev.target as Element).closest('a, button')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    if (hideDefaultCursor) {
      document.body.style.cursor = 'none';
    }

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      if (hideDefaultCursor) {
        document.body.style.cursor = 'auto';
      }
    };
  }, [hideDefaultCursor]);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 };
  const smoothMouse = {
    x: useSpring(mousePosition.x, springConfig),
    y: useSpring(mousePosition.y, springConfig),
  };

  const cursorSize = isHovering ? 40 : 24;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-50 rounded-full border-2 border-primary"
      style={{
        translateX: smoothMouse.x,
        translateY: smoothMouse.y,
        x: '-50%',
        y: '-50%',
      }}
      animate={{
        width: cursorSize,
        height: cursorSize,
        backgroundColor: isHovering ? 'rgba(255, 0, 229, 0.2)' : 'transparent',
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    />
  );
};

export default TargetCursor;
