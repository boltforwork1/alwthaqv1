import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  BookUser,
  Briefcase,
  Building2,
  Car,
  CheckCircle2,
  Clock,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import PageTransition from '@/components/PageTransition';

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

/* ---------- Data ---------- */
const stats = [
  { value: 2500, suffix: '+', label: 'Clients Helped' },
  { value: 12, suffix: '+', label: 'Years Experience' },
  { value: 25, suffix: '+', label: 'Expert Consultants' },
  { value: 97, suffix: '%', label: 'Client Satisfaction' },
];

const services = [
  {
    icon: Building2,
    title: 'Company Setup & Licensing',
    desc: 'Booking trade names, issuing licenses, and amending commercial contracts.',
  },
  {
    icon: BookUser,
    title: 'Visas & Residency',
    desc: 'Residency issuance, work visas, and golden visa applications.',
  },
  {
    icon: Briefcase,
    title: 'Ministry of Human Resources',
    desc: 'Establishment cards, labor contracts, and employee data updates.',
  },
  {
    icon: Car,
    title: 'Traffic & Municipalities',
    desc: 'Vehicle ownership transfer, driving licenses, and health permits.',
  },
];

const features = [
  {
    icon: CheckCircle2,
    title: 'High Accuracy & Reliability',
    desc: 'Every transaction is handled with meticulous attention to detail.',
  },
  {
    icon: Clock,
    title: 'Time & Effort Saving',
    desc: 'We handle the queues and paperwork so you never have to.',
  },
  {
    icon: ShieldCheck,
    title: 'Comprehensive Coverage',
    desc: 'From individuals to corporations, we cover every authority.',
  },
];

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
    <motion.div
      variants={blurReveal}
      className="text-center"
    >
      <div className="min-w-[150px] text-4xl font-bold tabular-nums tracking-tight text-secondary sm:text-5xl lg:text-6xl">
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
      className="group rounded-2xl border border-black/5 bg-white/70 p-8 shadow-sm backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#1B753C]/30 hover:shadow-[0_20px_40px_-15px_rgba(27,117,60,0.15)]"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Icon className="h-7 w-7 text-primary transition-colors duration-300 group-hover:text-white" strokeWidth={1.5} />
        </motion.div>
      </div>
      <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-ink/55">
        {desc}
      </p>
    </motion.div>
  );
}

/* ---------- Lead form card ---------- */
function LeadFormCard() {
  return (
    <motion.form
      initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 1, ease, delay: 0.35 }}
      onSubmit={(e) => e.preventDefault()}
      className="rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-md"
    >
      <h3 className="text-2xl font-bold text-white">Request a Free Quote</h3>
      <p className="mb-6 mt-1 text-gray-300">Tell us a little about your business goals.</p>

      <div className="mb-4">
        <label className="mb-2 block text-sm text-gray-200">Full Name</label>
        <input
          type="text"
          placeholder="John Doe"
          className="w-full rounded-lg border border-white/20 bg-black/20 p-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm text-gray-200">Email / Phone</label>
        <input
          type="text"
          placeholder="you@example.com"
          className="w-full rounded-lg border border-white/20 bg-black/20 p-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
        />
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-secondary px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#155f30]"
      >
        Request A Free Quote
        <ArrowRight className="h-4 w-4" />
      </motion.button>
    </motion.form>
  );
}

/* ---------- Page ---------- */
export default function Home() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  return (
    <PageTransition>
      {/* ===== Hero ===== */}
      <section className="relative w-full min-h-screen overflow-hidden bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center bg-no-repeat">
        {/* dark overlay */}
        <div className="absolute inset-0 bg-[#111111]/80" />

        <div className="relative z-10 flex min-h-screen items-center">
          <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-12">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              {/* Left column — text */}
              <div>
              <motion.span
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm text-white"
              >
                <span className="h-2 w-2 rounded-full bg-green-400" />
                Your Trusted Government Services Partner
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.1 }}
                className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                Business Setup &amp;{' '}
                <span className="text-secondary">Government Transactions</span> in UAE
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.2 }}
                className="mb-8 mt-6 max-w-xl text-lg leading-relaxed text-gray-300"
              >
                Our comprehensive services cover all individual and corporate needs with
                official authorities. We save your time and effort while avoiding common errors.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.3 }}
                className="flex flex-col gap-4 sm:flex-row sm:items-center"
              >
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-full bg-secondary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-secondary/25 transition-shadow duration-300 hover:bg-[#155f30] hover:shadow-[0_0_20px_rgba(179,32,37,0.4)]"
                >
                  Contact Us Now
                  <ArrowRight className="h-4 w-4" />
                </motion.a>
                <motion.a
                  href="tel:+97142388381"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-transparent px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10"
                >
                  <Phone className="h-4 w-4" />
                  +971 4 238 8381
                </motion.a>
              </motion.div>
            </div>

              {/* Right column — lead form */}
              <LeadFormCard />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Statistics (full-width dark band) ===== */}
      <section className="w-full bg-ink py-20 lg:py-24">
        <motion.div
          ref={statsRef}
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto grid max-w-7xl grid-cols-2 gap-12 px-6 lg:grid-cols-4 lg:gap-8 lg:px-10"
        >
          {stats.map((stat) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              inView={statsInView}
            />
          ))}
        </motion.div>
      </section>

      {/* ===== Core Services Grid ===== */}
      <section className="bg-off-white py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Our Top Services
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-primary" />
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                desc={service.desc}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== Why Us ===== */}
      <section className="bg-white py-24 lg:py-28">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto max-w-6xl px-6 lg:px-10"
        >
          <motion.div
            variants={blurReveal}
            className="mb-14 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Why Choose Al Wthaq
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-ink/55">
              A trusted partner for every transaction — built on precision, speed, and complete coverage.
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={blurReveal}
                  className="flex flex-col items-center text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10">
                    <Icon className="h-8 w-8 text-secondary" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink/55">
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>
    </PageTransition>
  );
}
