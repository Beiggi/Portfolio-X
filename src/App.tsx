// /src/App.tsx
import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Layout & Global Components
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/layout/Preloader';
import StaggeredMenu from '@/components/layout/StaggeredMenu';

// Effects
import TargetCursor from '@/components/effects/cursors/TargetCursor';
import ClickSpark from '@/components/effects/interactions/ClickSpark';

// Data
import { navItems, socialLinks } from '@/data/navigation';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflowY = 'auto';
    }, 2500);
    document.body.style.overflowY = 'hidden';
    return () => clearTimeout(timer);
  }, []);

  const menuItems = navItems.map((item) => ({
    label: t(item.key),
    ariaLabel: t(item.key),
    link: item.key === 'header.cv' ? `/cv/${i18n.language}_cv.pdf` : item.link,
  }));

  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <AnimatePresence>
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          key="main-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex min-h-screen flex-col"
        >
          <TargetCursor hideDefaultCursor={true} />
          <ClickSpark />

          <StaggeredMenu
            position="right"
            items={menuItems}
            socialItems={socialLinks}
            logoUrl="/placeholder/logo.svg"
            menuButtonColor="var(--foreground)"
            openMenuButtonColor="var(--background)"
            accentColor="var(--primary)"
          />
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              {/* El componente Outlet renderiza la ruta hija actual (Home, About, etc.) */}
              <Outlet />
            </AnimatePresence>
          </main>
          <Footer />
        </motion.div>
      )}
    </div>
  );
}

export default App;
