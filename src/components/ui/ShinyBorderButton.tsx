// /src/components/ui/ShinyBorderButton.tsx
import React from 'react';
import StarBorder from './StarBorder';
import ShinyText from './ShinyText';

interface ShinyBorderButtonProps {
  text: string;
  onClick?: () => void;
  isLink?: boolean;
  href?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const ShinyBorderButton: React.FC<ShinyBorderButtonProps> = ({
  text,
  onClick,
  isLink = false,
  href = '#',
  className = '',
  type = 'button',
}) => {
  return (
    <StarBorder
      as={isLink ? 'a' : 'button'}
      type={!isLink ? type : undefined}
      href={isLink ? href : undefined}
      onClick={onClick}
      className={`group ${className}`}
    >
      <ShinyText
        text={text}
        className="transition-opacity group-hover:opacity-80"
      />
    </StarBorder>
  );
};

export default ShinyBorderButton;
