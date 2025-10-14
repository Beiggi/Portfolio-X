// /src/components/layout/Footer.tsx
import { useTranslation } from 'react-i18next';
import ContactForm from '@/components/ui/ContactForm'; // Actualizado a la nueva ruta

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/derek-lizana' },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/derek-lizana-fullstack-developer/',
  },
  { name: 'Twitter', url: 'https://twitter.com/derek_lizana' },
];

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-secondary text-foreground/70">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              {t('footer.contact.title')}
            </h2>
            <p className="mb-6">{t('footer.contact.description')}</p>
            <ContactForm />
          </div>
          <div className="md:text-center lg:col-span-1 lg:text-left">
            <h3 className="text-lg font-semibold text-foreground">
              {t('footer.social.title')}
            </h3>
            <ul className="mt-4 space-y-2">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-primary"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:text-center lg:col-span-1 lg:text-left">
            <h3 className="text-lg font-semibold text-foreground">
              {t('footer.newsletter.title')}
            </h3>
            <p className="mt-4">{t('footer.newsletter.description')}</p>
            {/* Aquí iría el formulario de newsletter */}
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Dereck Lizana.{' '}
            {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
