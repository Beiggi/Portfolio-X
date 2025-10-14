import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

interface StaggeredMenuProps {
  items: { label: string; link: string; ariaLabel: string }[];
  socialItems: {
    label: string;
    link: string;
    ariaLabel: string;
    icon: React.FC<any>;
  }[];
  position?: 'left' | 'right';
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
}

const StaggeredMenu = ({
  items,
  socialItems,
  position = 'right',
  logoUrl,
  menuButtonColor = '#000',
  openMenuButtonColor = '#FFF',
  accentColor = '#FF00E5',
}: StaggeredMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    gsap.set('.menu-item', { y: 50, opacity: 0 });
    gsap.set('.social-item', { y: 30, opacity: 0 });

    tl.current = gsap
      .timeline({ paused: true })
      .to(menuRef.current, {
        [position]: 0,
        duration: 0.8,
        ease: 'power4.inOut',
      })
      .to(
        '.menu-item',
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.5',
      )
      .to(
        '.social-item',
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power3.out',
        },
        '-=0.3',
      );
  }, [position]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      tl.current?.reverse();
    } else {
      tl.current?.play();
    }
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        className={`fixed top-8 z-50 transition-transform duration-300 ease-in-out ${
          position === 'left' ? 'left-8' : 'right-8'
        } ${isOpen ? 'rotate-180' : ''}`}
        aria-label="Toggle Menu"
        style={{ color: isOpen ? openMenuButtonColor : menuButtonColor }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={isOpen ? 'M18 6L6 18' : 'M4 6h16'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d={isOpen ? 'M6 6l12 12' : 'M4 12h16'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d={!isOpen ? 'M4 18h16' : ''}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div
        ref={menuRef}
        className={`fixed top-0 z-40 h-screen w-full bg-foreground text-background md:w-1/3 ${
          position === 'left' ? 'left-[-100%]' : 'right-[-100%]'
        }`}
      >
        <div className="flex h-full flex-col justify-between p-8 md:p-16">
          {logoUrl && (
            <div className="absolute left-8 top-8 md:left-16 md:top-16">
              <Link to="/" onClick={toggleMenu}>
                <img src={logoUrl} alt="Logo" className="h-8 w-auto" />
              </Link>
            </div>
          )}

          <nav className="mt-24">
            <ul>
              {items.map((item, index) => (
                <li key={index} className="menu-item my-2 overflow-hidden">
                  <Link
                    to={item.link}
                    onClick={toggleMenu}
                    className="group relative inline-block text-4xl font-bold"
                  >
                    {item.label}
                    <span
                      className="absolute bottom-0 left-0 h-1 origin-left scale-x-0 transform bg-current transition-transform duration-300 group-hover:scale-x-100"
                      style={{ backgroundColor: accentColor }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex space-x-6">
            {socialItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="social-item"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.ariaLabel}
              >
                <item.icon
                  className="transition-colors hover:text-gray-500"
                  style={{ '--hover-color': accentColor }}
                  onMouseOver={(e: any) =>
                    (e.currentTarget.style.color = accentColor)
                  }
                  onMouseOut={(e: any) =>
                    (e.currentTarget.style.color = 'currentColor')
                  }
                  size={24}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default StaggeredMenu;
