import { useTranslation } from 'react-i18next';
import { socialLinks } from '@/data/navigation';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 py-8">
      <div className="container mx-auto px-4 text-center text-foreground/70">
        <div className="mb-4 flex justify-center space-x-6">
          {socialLinks.map((item) => (
            <a
              key={item.label}
              href={item.link}
              aria-label={item.ariaLabel}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary"
            >
              <item.icon size={24} />
            </a>
          ))}
        </div>
        <p>
          &copy; {currentYear} {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
