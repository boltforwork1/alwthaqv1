import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Briefcase, Building2, Car, Check, IdCard, Landmark, Signature as FileSignature, X } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { useLanguage } from '@/context/LanguageContext';

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

/* ---------- Service icons ---------- */
const serviceIcons = [Building2, IdCard, Briefcase, Landmark, Car, FileSignature];

/* ---------- Service images ---------- */
const serviceImages = [
  '/images/service-setup.jpg',
  '/images/service-visa.jpg',
  '/images/service-mohre.jpg',
  '/images/service-municipality.jpg',
  '/images/service-traffic.jpg',
  '/images/service-notary.jpg',
];

/* ---------- Service card ---------- */
function ServiceCard({
  icon: Icon,
  title,
  desc,
  image,
  onView,
  viewLabel,
}: {
  icon: typeof Building2;
  title: string;
  desc: string;
  image: string;
  onView: () => void;
  viewLabel: string;
}) {
  return (
    <motion.div
      variants={blurReveal}
      className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#1B753C]/30 hover:shadow-[0_20px_40px_-15px_rgba(27,117,60,0.15)]"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary">
          <motion.div whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Icon
              className="h-7 w-7 text-primary transition-colors duration-300 group-hover:text-white"
              strokeWidth={1.5}
            />
          </motion.div>
        </div>
        <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink/55">{desc}</p>
        <button
          onClick={onView}
          className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-ink/50 transition-colors duration-300 hover:text-primary"
        >
          {viewLabel}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" />
        </button>
      </div>
    </motion.div>
  );
}

/* ---------- Service Modal ---------- */
function ServiceModal({
  icon: Icon,
  title,
  desc,
  details,
  onClose,
}: {
  icon: typeof Building2;
  title: string;
  desc: string;
  details: readonly string[];
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl md:p-8"
      >
        <button
          onClick={onClose}
          className="absolute end-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 text-ink/50 transition-colors duration-300 hover:bg-ink/10 hover:text-ink"
          aria-label="Close"
        >
          <X className="h-5 w-5" strokeWidth={2} />
        </button>

        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
        </div>
        <h3 className="mt-6 text-xl font-bold tracking-tight text-ink md:text-2xl">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/55">{desc}</p>

        <div className="mt-4 h-px w-full bg-ink/10" />

        <ul className="mt-6 flex flex-col gap-4">
          {details.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/15">
                <Check className="h-3.5 w-3.5 text-secondary" strokeWidth={2.5} />
              </span>
              <span className="text-sm leading-relaxed text-ink/70">{point}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

/* ---------- Page ---------- */
export default function Services() {
  const { t } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <PageTransition>
      {/* ===== Hero Header ===== */}
      <section className="relative w-full min-h-[40vh] overflow-hidden bg-[url('/images/services-header-bg.jpg')] bg-cover bg-center bg-no-repeat py-16 md:py-24 lg:py-28">
        <div className="absolute inset-0 bg-[#111111]/70" />
        <div className="pointer-events-none absolute -start-24 top-1/4 h-72 w-72 rounded-full bg-[#1B753C]/25 blur-[120px]" />
        <div className="pointer-events-none absolute -end-16 bottom-0 h-80 w-80 rounded-full bg-[#B32025]/20 blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {t.services.heroTitle}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg">
              {t.services.heroDesc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== Main Services Grid ===== */}
      <section className="bg-off-white py-12 md:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {t.services.mainServices.map((service, i) => (
              <ServiceCard
                key={service.title}
                icon={serviceIcons[i]}
                title={service.title}
                desc={service.desc}
                image={serviceImages[i]}
                onView={() => setSelectedIndex(i)}
                viewLabel={t.services.viewDetails}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== Quick Services Tags ===== */}
      <section className="bg-white py-12 md:py-24 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 md:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl">
              {t.services.alsoTitle}
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-primary" />
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="mt-10 flex flex-wrap justify-center gap-3 md:mt-14 md:gap-4"
          >
            {t.services.quickServices.map((tag) => (
              <motion.span
                key={tag}
                variants={blurReveal}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="cursor-default rounded-full border border-black/5 bg-off-white px-4 py-2.5 text-sm font-medium text-ink/70 transition-colors duration-300 hover:border-primary/30 hover:text-primary md:px-6 md:py-3"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== Service Detail Modal ===== */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <ServiceModal
            icon={serviceIcons[selectedIndex]}
            title={t.services.mainServices[selectedIndex].title}
            desc={t.services.mainServices[selectedIndex].desc}
            details={t.services.mainServices[selectedIndex].details}
            onClose={() => setSelectedIndex(null)}
          />
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
