// /src/components/effects/backgrounds/AnimatedGradientBackground.tsx
import React from 'react';

interface AnimatedGradientBackgroundProps {
  children: React.ReactNode;
}

const AnimatedGradientBackground: React.FC<AnimatedGradientBackgroundProps> = ({
  children,
}) => {
  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(90deg, 
            theme('colors.background'), 
            theme('colors.secondary'),
            theme('colors.primary / 20%'),
            theme('colors.secondary'),
            theme('colors.background')
          )`,
          backgroundSize: '400% 400%',
          animation: 'gradient-move 15s ease infinite',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AnimatedGradientBackground;
