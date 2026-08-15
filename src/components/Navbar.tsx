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
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        <Link to="/" aria-label="Al Wthaq Group home" className="shrink-0">
          <img
            src="/logo.png"
            alt="Al Wthaq Group"
            className="h-16 w-auto object-contain scale-110 origin-center md:h-20 md:scale-110"
          />
        </Link>

        <ul className="flex items-center gap-6 sm:gap-9 lg:gap-12">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `group relative inline-block text-lg font-medium tracking-wide transition-colors duration-300 ${
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
          className="hidden shrink-0 rounded-full bg-primary px-6 py-2.5 text-base font-medium text-white shadow-sm shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-md hover:shadow-primary/25 sm:inline-flex"
        >
          Get in Touch
        </Link>
      </nav>
    </header>
  );
}
