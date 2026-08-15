import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';
import {
  BookUser,
  Briefcase,
  Building2,
  Car,
  CheckCircle2,
  Clock,
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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
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
    <div className="text-center">
      <div className="text-4xl font-bold tracking-tight text-secondary sm:text-5xl lg:text-6xl">
        {display}
        {suffix}
      </div>
      <div className="mt-3 text-sm font-medium tracking-wide text-white/60 sm:text-base">
        {label}
      </div>
    </div>
  );
}

/* ---------- Page ---------- */
export default function Home() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  return (
    <PageTransition>
      {/* ===== Hero ===== */}
      <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden px-6 py-24">
        {/* abstract shapes */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/5 blur-2xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium tracking-wide text-primary"
          >
            Government Transaction Clearance
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="mt-7 text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            Clear Your Government Transactions
            <br />
            with Ease and Speed
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink/60 sm:text-lg"
          >
            Our comprehensive services cover all individual and corporate needs with official
            authorities. We save your time and effort while avoiding common errors and violations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="/contact"
              className="rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-xl hover:shadow-primary/30"
            >
              Contact Us Now
            </a>
            <a
              href="/services"
              className="rounded-full border border-secondary/40 bg-white/50 px-8 py-3.5 text-sm font-semibold text-secondary backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary hover:bg-secondary hover:text-white hover:shadow-lg hover:shadow-secondary/20"
            >
              Explore Services
            </a>
          </motion.div>
        </div>
      </section>

      {/* ===== Statistics (dark) ===== */}
      <section className="bg-ink py-20 lg:py-24">
        <div
          ref={statsRef}
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
        </div>
      </section>

      {/* ===== Core Services Grid ===== */}
      <section className="bg-off-white py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease }}
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
            viewport={{ once: true, amount: 0.2 }}
            className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3, ease }}
                  className="group rounded-2xl border border-black/5 bg-white/70 p-8 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:shadow-black/5"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary">
                    <Icon className="h-7 w-7 text-primary transition-colors duration-300 group-hover:text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/55">
                    {service.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== Why Us ===== */}
      <section className="bg-white py-24 lg:py-28">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-6xl px-6 lg:px-10"
        >
          <motion.div
            variants={fadeUp}
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
                  variants={fadeUp}
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
