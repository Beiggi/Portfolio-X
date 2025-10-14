import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'EN' },
  { code: 'es', name: 'ES' },
  { code: 'it', name: 'IT' },
];

export const GooeyNav = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (lng: string) => i18n.changeLanguage(lng);

  return (
    <nav className="relative">
      <svg className="absolute h-0 w-0">
        <defs>
          <filter id="gooey-nav-filter">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <motion.div
        className="flex items-center gap-2"
        style={{ filter: 'url(#gooey-nav-filter)' }}
      >
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`text-sm font-semibold transition-colors ${
              i18n.language.startsWith(lang.code)
                ? 'text-primary'
                : 'text-foreground/70 hover:text-foreground'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {lang.name}
          </motion.button>
        ))}
      </motion.div>
    </nav>
  );
};
