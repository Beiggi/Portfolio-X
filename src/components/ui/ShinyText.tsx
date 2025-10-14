interface ShinyTextProps {
  text: string;
  className?: string;
}

const ShinyText = ({ text, className = '' }: ShinyTextProps) => {
  return (
    <span
      className={`animate-shine bg-[linear-gradient(110deg,transparent,45%,var(--foreground),55%,transparent)] bg-[length:250%_100%] bg-clip-text text-transparent ${className}`}
    >
      {text}
    </span>
  );
};

export default ShinyText;
