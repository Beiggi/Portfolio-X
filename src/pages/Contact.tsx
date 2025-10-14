// /src/pages/Contact.tsx
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import ContactForm from '@/components/ui/ContactForm';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Helmet>
        <title>{t('header.contact')} | Dereck Lizana</title>
      </Helmet>
      <div className="container mx-auto max-w-2xl px-4 py-24 sm:py-32">
        <h1 className="mb-4 text-center text-5xl font-black tracking-tight sm:text-7xl">
          {t('footer.contact.title')}
        </h1>
        <p className="mb-12 text-center text-lg text-foreground/80">
          {t('footer.contact.description')}
        </p>
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
