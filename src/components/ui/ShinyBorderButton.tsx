import { motion } from 'framer-motion';
import isPropValid from '@emotion/is-prop-valid';
import { Link } from 'react-router-dom';

interface ButtonProps {
  text: string;
  isLink?: boolean;
  href?: string;
  className?: string;
  [key: string]: any; // Allow other props
}

const ShinyBorderButton = ({
  text,
  isLink = false,
  href = '#',
  className = '',
  ...rest
}: ButtonProps) => {
  const motionProps = {
    initial: { '--x': '100%', scale: 1 },
    animate: { '--x': '-100%' },
    whileTap: { scale: 0.97 },
    transition: {
      repeat: Infinity,
      repeatType: 'loop',
      repeatDelay: 1,
      type: 'spring',
      stiffness: 20,
      damping: 15,
      mass: 2,
      scale: {
        type: 'spring',
        stiffness: 10,
        damping: 5,
        mass: 0.1,
      },
    },
  };

  const commonClasses = `relative rounded-md px-6 py-3 font-light text-foreground transition-colors before:absolute before:inset-0 before:z-[-1] before:rounded-[inherit] before:bg-gradient-to-br before:from-primary before:to-primary/30 before:p-px before:[mask:linear-gradient(black,black)_content-box,linear-gradient(black,black)] before:[mask-composite:exclude] after:absolute after:inset-0 after:z-[-2] after:rounded-[inherit] after:bg-secondary after:opacity-70 after:backdrop-blur-xl ${className}`;

  if (isLink) {
    const MotionLink = motion(Link, { forwardMotionProps: true });
    return (
      <MotionLink to={href} className={commonClasses} {...motionProps} {...rest}>
        <span className="relative z-10">{text}</span>
      </MotionLink>
    );
  }

  const MotionButton = motion.button;
  return (
    <MotionButton className={commonClasses} {...motionProps} {...rest}>
      <span className="relative z-10">{text}</span>
    </MotionButton>
  );
};

export default ShinyBorderButton;
