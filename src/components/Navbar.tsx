import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, MessageCircle, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const links = [
    { label: t.nav.home, to: '/' },
    { label: t.nav.about, to: '/about' },
    { label: t.nav.services, to: '/services' },
    { label: t.nav.contact, to: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 md:h-16 md:px-8 lg:px-10">
        <Link to="/" aria-label="Al Wthaq Group home" className="shrink-0">
          <img
            src="/logo.png"
            alt="Al Wthaq Group"
            className="h-10 w-auto object-contain md:h-16 lg:h-20"
          />
        </Link>

        <ul className="hidden items-center gap-6 md:flex lg:gap-12">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `group relative inline-block text-base font-medium tracking-wide transition-colors duration-300 lg:text-lg ${
                    isActive ? 'text-primary' : 'text-ink/70 hover:text-primary'
                  }`
                }
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#B32025] opacity-0 transition-all duration-300 ease-out group-hover:scale-x-100 group-hover:opacity-100" />
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="inline-flex shrink-0 items-center rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary/10"
            aria-label="Toggle language"
          >
            {language === 'en' ? 'عربي' : 'EN'}
          </button>

          <a
            href="https://wa.me/971555276288"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#1B753C] transition-colors duration-300 hover:bg-[#1B753C]/10"
          >
            <MessageCircle className="h-5 w-5" strokeWidth={1.8} />
          </a>

          <Link
            to="/contact"
            className="hidden shrink-0 items-center rounded-full bg-primary px-6 py-2.5 text-base font-medium text-white shadow-sm shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-md hover:shadow-primary/25 md:inline-flex"
          >
            {t.nav.getInTouch}
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300 hover:bg-primary/20 md:hidden"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileMenuOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2, ease }}
                >
                  <X className="h-5 w-5" strokeWidth={2} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2, ease }}
                >
                  <Menu className="h-5 w-5" strokeWidth={2} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* ===== Mobile Dropdown ===== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease }}
            className="absolute inset-x-0 top-full border-t border-white/10 bg-[#111111]/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col items-center gap-2 px-4 py-8">
              {links.map((link) => (
                <li key={link.to} className="w-full">
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block w-full rounded-xl px-6 py-4 text-center text-lg font-medium tracking-wide transition-colors duration-300 ${
                        isActive
                          ? 'bg-white/10 text-primary'
                          : 'text-white/80 hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li className="mt-4 w-full">
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full rounded-full bg-primary px-6 py-4 text-center text-base font-semibold text-white shadow-lg shadow-primary/25 transition-colors duration-300 hover:bg-primary-600"
                >
                  {t.nav.getInTouch}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
