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

        <Link
          to="/contact"
          className="inline-flex shrink-0 items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-md hover:shadow-primary/25 md:px-6 md:py-2.5 md:text-base"
        >
          Get in Touch
        </Link>
      </nav>
    </header>
  );
}
