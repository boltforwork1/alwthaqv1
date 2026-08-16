import { Clock3, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const navigation = [
    { label: t.nav.home, to: '/' },
    { label: t.nav.about, to: '/about' },
    { label: t.nav.services, to: '/services' },
    { label: t.nav.contact, to: '/contact' },
  ];

  return (
    <footer className="bg-[#FAFAFA] text-ink">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-12 md:px-8 lg:grid-cols-[1.4fr_0.8fr_1fr] lg:gap-20 lg:px-10 lg:py-16">
        <div className="flex flex-col items-center text-center md:items-start md:text-start">
          <Link to="/" aria-label="Al Wthaq Group home" className="inline-block">
            <img
              src="/logo.png"
              alt="Al Wthaq Group"
              className="h-28 w-auto object-contain sm:h-32 lg:h-36"
            />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-7 text-ink/60">
            {t.footer.desc}
          </p>
          <div className="mt-7 h-px w-full max-w-sm bg-ink/10" />
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-xs font-semibold tracking-[0.2em] text-ink/50">{t.footer.navigation}</h2>
          <nav className="mt-6 flex flex-col items-center gap-4 md:items-start">
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

        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-xs font-semibold tracking-[0.2em] text-ink/50">{t.footer.contact}</h2>
          <div className="mt-6 flex flex-col gap-4">
            {/* Phone 1 */}
            <a href="tel:+971526684071" className="group flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary transition-colors duration-300 group-hover:text-primary-600" strokeWidth={1.8} />
              <div className="text-sm">
                <p className="text-xs text-ink/45">{t.footer.phone1}</p>
                <p className="mt-0.5 text-ink/75 transition-colors duration-300 group-hover:text-primary">+971 52 668 4071</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a href="https://wa.me/971555276288" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3">
              <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary transition-colors duration-300 group-hover:text-primary-600" strokeWidth={1.8} />
              <div className="text-sm">
                <p className="text-xs text-ink/45">{t.footer.whatsapp}</p>
                <p className="mt-0.5 text-ink/75 transition-colors duration-300 group-hover:text-primary">+971 55 527 6288</p>
              </div>
            </a>

            {/* Email */}
            <a href="mailto:alwethaqgroup@gmail.com" className="group flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary transition-colors duration-300 group-hover:text-primary-600" strokeWidth={1.8} />
              <div className="text-sm">
                <p className="text-xs text-ink/45">{t.footer.email}</p>
                <p className="mt-0.5 text-ink/75 transition-colors duration-300 group-hover:text-primary">alwethaqgroup@gmail.com</p>
              </div>
            </a>

            {/* Address */}
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={1.8} />
              <div className="text-sm">
                <p className="text-xs text-ink/45">{t.footer.address}</p>
                <p className="mt-0.5 text-ink/75">{t.footer.addressValue}</p>
              </div>
            </div>

            {/* Working hours */}
            <div className="flex items-start gap-3">
              <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={1.8} />
              <div className="text-sm">
                <p className="text-xs text-ink/45">{t.footer.workingHours}</p>
                <p className="mt-0.5 text-ink/75">{t.footer.workingHoursValue}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-ink/10">
        <div className="mx-auto max-w-7xl px-4 py-5 md:px-8 lg:px-10">
          <p className="text-center text-xs text-ink/45 md:text-start">{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
