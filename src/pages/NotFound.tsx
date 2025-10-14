// /src/pages/NotFound.tsx
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('notFound.title')}</title>
      </Helmet>
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-9xl font-black text-primary">404</h1>
        <p className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl">
          {t('notFound.heading')}
        </p>
        <p className="mt-6 text-base leading-7 text-foreground/70">
          {t('notFound.message')}
        </p>
        <div className="mt-10">
          <Link
            to="/"
            className="rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {t('notFound.goHome')}
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
