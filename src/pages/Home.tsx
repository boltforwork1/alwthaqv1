import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, animate, motion, useInView } from 'framer-motion';
import { ArrowRight, BookUser, Briefcase, Building2, Car, CircleCheck as CheckCircle2, Clock, Minus, Phone, Plus, ShieldCheck } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { useLanguage } from '@/context/LanguageContext';

/* ---------- Count-up hook ---------- */
function useCountUp(target: number, inView: boolean, duration = 2) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, target, duration]);
  return value;
}

/* ---------- Shared animation helpers ---------- */
const ease = [0.22, 1, 0.36, 1] as const;

const blurReveal = {
  hidden: { opacity: 0, y: 30, filter: 'blur(12px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

/* ---------- Service icons (kept in code, titles come from translations) ---------- */
const serviceIcons = [Building2, BookUser, Briefcase, Car];
const featureIcons = [CheckCircle2, Clock, ShieldCheck];

/* ---------- Stat item ---------- */
function StatItem({
  value,
  suffix,
  label,
  inView,
}: {
  value: number;
  suffix: string;
  label: string;
  inView: boolean;
}) {
  const count = useCountUp(value, inView);
  const display = value >= 1000 ? Math.round(count).toLocaleString() : Math.round(count);
  return (
    <motion.div variants={blurReveal} className="text-center">
      <div className="min-w-[120px] text-3xl font-bold tabular-nums tracking-tight text-secondary md:min-w-[150px] md:text-4xl sm:text-5xl lg:text-6xl">
        {display}
        {suffix}
      </div>
      <div className="mt-3 text-sm font-medium tracking-wide text-white/60 sm:text-base">
        {label}
      </div>
    </motion.div>
  );
}

/* ---------- Service card ---------- */
function ServiceCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: typeof Building2;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      variants={blurReveal}
      className="group rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#1B753C]/30 hover:shadow-[0_20px_40px_-15px_rgba(27,117,60,0.15)] md:p-8"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary">
        <motion.div whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
          <Icon className="h-7 w-7 text-primary transition-colors duration-300 group-hover:text-white" strokeWidth={1.5} />
        </motion.div>
      </div>
      <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink/55">{desc}</p>
    </motion.div>
  );
}

/* ---------- FAQ accordion item ---------- */
function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      variants={blurReveal}
      className={`overflow-hidden rounded-2xl border bg-white transition-colors duration-300 ${
        isOpen ? 'border-[#1B753C]/30 shadow-[0_12px_30px_-12px_rgba(27,117,60,0.18)]' : 'border-black/5'
      }`}
    >
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start">
        <span className="text-base font-semibold tracking-tight text-ink">{q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10"
        >
          {isOpen ? (
            <Minus className="h-4 w-4 text-primary" strokeWidth={2} />
          ) : (
            <Plus className="h-4 w-4 text-primary" strokeWidth={2} />
          )}
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-sm leading-relaxed text-ink/55">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------- Page ---------- */
export default function Home() {
  const { t } = useLanguage();
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const stats = [
    { value: 2500, suffix: '+', label: t.home.stats.clients },
    { value: 12, suffix: '+', label: t.home.stats.exp },
    { value: 25, suffix: '+', label: t.home.stats.experts },
    { value: 97, suffix: '%', label: t.home.stats.satisfaction },
  ];

  return (
    <PageTransition>
      {/* ===== Hero ===== */}
      <section className="relative w-full min-h-screen overflow-hidden bg-[url('/images/hero.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10 flex min-h-screen items-center">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24 lg:px-12">
            <div className="grid grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-2">
              {/* Left column — text wrapped in a glass card for readability */}
              <div className="flex flex-col gap-6 bg-white/75 backdrop-blur-md p-8 md:p-10 rounded-[2rem] shadow-2xl border border-white/60">
                <span className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white/50 px-4 py-1 text-sm font-medium text-gray-800 shadow-sm drop-shadow-sm backdrop-blur-sm">
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8], filter: ['blur(2px)', 'blur(0px)', 'blur(2px)'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="h-2 w-2 rounded-full bg-[#1B753C]"
                  />
                  {t.home.badge}
                </span>

                {/* Mobile-only floating logo */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="block md:hidden w-3/4 max-w-[250px] mx-auto"
                >
                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex items-center justify-center w-full"
                  >
                    <img
                      src="/logo.png"
                      alt="Al Wthaq Group"
                      className="w-full h-auto object-contain drop-shadow-xl"
                    />
                  </motion.div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease, delay: 0.1 }}
                  className="text-3xl font-bold leading-tight tracking-tight text-gray-900 drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)] sm:text-4xl md:text-5xl lg:text-6xl"
                >
                  {t.home.heroTitle.split(' ').slice(0, -3).join(' ')}{' '}
                  <span className="text-secondary">{t.home.heroTitle.split(' ').slice(-3).join(' ')}</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease, delay: 0.2 }}
                  className="max-w-xl text-base leading-relaxed text-gray-700 drop-shadow-md md:text-lg"
                >
                  {t.home.heroDesc}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease, delay: 0.3 }}
                  className="flex flex-col gap-4 sm:flex-row sm:items-center"
                >
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="inline-flex">
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-2 rounded-full bg-secondary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-secondary/25 transition-all duration-300 hover:bg-[#155f30] hover:shadow-[0_0_20px_rgba(27,117,60,0.4)]"
                    >
                      {t.home.exploreBtn}
                      <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="inline-flex">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white/60 px-7 py-3.5 text-sm font-semibold text-gray-800 backdrop-blur-sm transition-all duration-300 hover:border-gray-900 hover:bg-white"
                    >
                      <Phone className="h-4 w-4" />
                      {t.home.contactBtn}
                    </Link>
                  </motion.div>
                </motion.div>
              </div>

              {/* Right column — animated logo (desktop only) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="hidden md:flex items-center justify-center"
              >
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex items-center justify-center w-full"
                >
                  <img
                    src="/logo.png"
                    alt="Al Wthaq Group"
                    className="w-[85%] sm:w-[90%] md:w-full max-w-[500px] lg:max-w-[600px] mx-auto h-auto object-contain drop-shadow-xl"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Statistics ===== */}
      <section className="w-full bg-ink py-12 md:py-20 lg:py-24">
        <motion.div
          ref={statsRef}
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 md:gap-12 md:px-8 lg:grid-cols-4 lg:gap-8 lg:px-10"
        >
          {stats.map((stat) => (
            <StatItem key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} inView={statsInView} />
          ))}
        </motion.div>
      </section>

      {/* ===== About Us Teaser ===== */}
      <section className="bg-white py-12 md:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 items-center gap-10 md:gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease }}
            >
              <span className="mb-4 inline-block text-sm font-semibold tracking-[0.2em] text-primary">
                {t.home.aboutBadge}
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl">
                {t.home.aboutTitle}
              </h2>
              <p className="mt-6 max-w-lg text-sm leading-relaxed text-ink/55 md:text-base">
                {t.home.aboutDesc}
              </p>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="mt-8 inline-flex">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-7 py-3.5 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-white"
                >
                  {t.home.aboutBtn}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease, delay: 0.15 }}
              className="relative h-[320px] md:h-[420px]"
            >
              <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="/images/home-about.jpg"
                  alt="Al Wthaq Group consultants at work"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-110"
                />
              </div>

              <div className="absolute -bottom-6 left-1/2 w-[85%] -translate-x-1/2 rounded-2xl border border-white/40 bg-white/60 p-6 shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/15">
                    <ShieldCheck className="h-6 w-6 text-secondary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">{t.home.trustedBy}</p>
                    <p className="mt-0.5 text-xs text-ink/50">{t.home.trustedAcross}</p>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-2xl font-bold text-primary">12+</p>
                    <p className="mt-1 text-xs text-ink/50">{t.home.years}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">25+</p>
                    <p className="mt-1 text-xs text-ink/50">{t.home.experts}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">97%</p>
                    <p className="mt-1 text-xs text-ink/50">{t.home.satisfaction}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Core Services Grid ===== */}
      <section className="bg-off-white py-12 md:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl">
              {t.home.servicesTitle}
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-primary" />
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-16 lg:grid-cols-4"
          >
            {t.home.services.map((service, i) => (
              <ServiceCard
                key={service.title}
                icon={serviceIcons[i]}
                title={service.title}
                desc={service.desc}
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease }}
            className="mt-14 text-center"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-secondary/25 transition-all duration-300 hover:bg-[#155f30] hover:shadow-[0_0_20px_rgba(27,117,60,0.4)]"
              >
                {t.home.servicesBtn}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== Why Us ===== */}
      <section className="bg-white py-12 md:py-24 lg:py-28">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto max-w-6xl px-4 md:px-8 lg:px-10"
        >
          <motion.div variants={blurReveal} className="mb-14 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl">
              {t.home.whyTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-ink/55 md:text-base">
              {t.home.whyDesc}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {t.home.features.map((feature, i) => {
              const Icon = featureIcons[i];
              return (
                <motion.div key={feature.title} variants={blurReveal} className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10">
                    <Icon className="h-8 w-8 text-secondary" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink">{feature.title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink/55">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-off-white py-12 md:py-24 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 md:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl">
              {t.home.faqTitle}
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-primary" />
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="mt-10 flex flex-col gap-4 md:mt-14"
          >
            {t.home.faqs.map((faq, i) => (
              <FaqItem
                key={faq.q}
                q={faq.q}
                a={faq.a}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
