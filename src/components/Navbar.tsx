import { motion } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        <Link to="/" aria-label="Al Wthaq Group home" className="shrink-0">
          <img
            src="/logo.png"
            alt="Al Wthaq Group"
            className="h-16 w-auto object-contain"
          />
        </Link>

        <ul className="flex items-center gap-4 sm:gap-7 lg:gap-10">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `relative text-xs font-medium tracking-wide transition-colors duration-300 sm:text-sm ${
                    isActive ? 'text-primary' : 'text-ink/70 hover:text-primary'
                  }`
                }
              >
                {({ isActive }) => (
                  <motion.span
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="inline-block"
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-primary"
                      />
                    )}
                  </motion.span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link
          to="/contact"
          className="hidden shrink-0 rounded-full bg-primary px-5 py-2.5 text-xs font-medium text-white shadow-sm shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-md hover:shadow-primary/25 sm:inline-flex sm:text-sm"
        >
          Get in Touch
        </Link>
      </nav>
    </header>
  );
}
