import { Clock3, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
];

const contactDetails = [
  { icon: MapPin, label: 'Address', value: 'Riyadh, Saudi Arabia' },
  { icon: Phone, label: 'Phone', value: '+966 00 000 0000' },
  { icon: Mail, label: 'Email', value: 'info@alwthaqgroup.com' },
  { icon: Clock3, label: 'Working Hours', value: 'Sun – Thu, 8:00 – 17:00' },
];

export default function Footer() {
  return (
    <footer className="bg-[#FAFAFA] text-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.4fr_0.8fr_1fr] lg:gap-20 lg:px-10 lg:py-16">
        <div>
          <Link to="/" aria-label="Al Wthaq Group home" className="inline-block">
            <img
              src="/logo.png"
              alt="Al Wthaq Group"
              className="h-24 w-auto object-contain sm:h-24 lg:h-[100px]"
            />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-7 text-ink/60">
            Clearing government transactions with care, clarity, and less time spent waiting.
          </p>
          <div className="mt-7 h-px w-full max-w-sm bg-ink/10" />
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.2em] text-ink/50">NAVIGATION</h2>
          <nav className="mt-6 flex flex-col items-start gap-4">
            {navigation.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm text-ink/70 transition-colors duration-300 hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.2em] text-ink/50">CONTACT</h2>
          <div className="mt-6 flex flex-col gap-4">
            {contactDetails.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={1.8} />
                <div className="text-sm">
                  <p className="text-xs text-ink/45">{label}</p>
                  <p className="mt-0.5 text-ink/75">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-ink/10">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8 lg:px-10">
          <p className="text-xs text-ink/45">© 2026 Al Wthaq Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
