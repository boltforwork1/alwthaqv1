import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, animate, motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  BookUser,
  Briefcase,
  Building2,
  Car,
  CheckCircle2,
  Clock,
  Minus,
  Phone,
  Plus,
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

const faqs = [
  {
    q: 'How long does it take to set up a company in the UAE?',
    a: 'The timeline varies depending on the jurisdiction (Mainland vs. Free Zone). Generally, it can take anywhere from 3 to 10 working days once all required documents are accurately submitted.',
  },
  {
    q: 'Do I need a local sponsor to start a business?',
    a: 'Recent legal updates allow 100% foreign ownership for most commercial and industrial activities in the UAE Mainland, eliminating the need for a local sponsor in many cases.',
  },
  {
    q: 'Can you assist with Golden Visa applications?',
    a: 'Yes, we handle the entire end-to-end process for Golden Visa applications for real estate investors, entrepreneurs, and highly skilled professionals.',
  },
  {
    q: 'Are your services limited to Dubai?',
    a: 'While we have a strong presence in Dubai, our services cover all Emirates across the UAE, handling federal and local municipal transactions.',
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

/* ---------- FAQ accordion item ---------- */
function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      variants={blurReveal}
      className={`overflow-hidden rounded-2xl border bg-white transition-colors duration-300 ${
        isOpen ? 'border-[#1B753C]/30 shadow-[0_12px_30px_-12px_rgba(27,117,60,0.18)]' : 'border-black/5'
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
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
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
              <span
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm text-white"
              >
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8], filter: ['blur(2px)', 'blur(0px)', 'blur(2px)'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="h-2 w-2 rounded-full bg-[#2EE6A6]"
                />
                Your Trusted Government Services Partner
              </span>

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
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex"
                >
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 rounded-full bg-secondary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-secondary/25 transition-all duration-300 hover:bg-[#155f30] hover:shadow-[0_0_20px_rgba(27,117,60,0.4)]"
                  >
                    Explore Services
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex"
                >
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-transparent px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10"
                  >
                    <Phone className="h-4 w-4" />
                    Contact Us Now
                  </Link>
                </motion.div>
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

      {/* ===== About Us Teaser ===== */}
      <section className="bg-white py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* Left — text */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease }}
            >
              <span className="mb-4 inline-block text-sm font-semibold tracking-[0.2em] text-primary">
                ABOUT US
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Your Trusted Partner for Government Transactions
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/55">
                With years of expertise in the UAE, Al Wthaq Group simplifies complex governmental
                procedures. Whether you are an individual seeking residency or a corporation
                expanding in Dubai, our dedicated consultants ensure seamless, error-free, and
                timely processing of all your official documents.
              </p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="mt-8 inline-flex"
              >
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-7 py-3.5 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-white"
                >
                  Learn More About Us
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right — abstract shape with glassmorphism card */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease, delay: 0.15 }}
              className="relative h-[420px]"
            >
              {/* Abstract gradient blob */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl bg-[url('/images/about.jpg')] bg-cover bg-center">
                <div className="absolute -left-10 top-10 h-48 w-48 rounded-full bg-secondary/30 blur-[60px]" />
                <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-primary/20 blur-[70px]" />
                <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30" />
                <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
              </div>

              {/* Overlapping glass card */}
              <div className="absolute -bottom-6 left-1/2 w-[85%] -translate-x-1/2 rounded-2xl border border-white/40 bg-white/60 p-6 shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/15">
                    <ShieldCheck className="h-6 w-6 text-secondary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">Trusted by 2,500+ Clients</p>
                    <p className="mt-0.5 text-xs text-ink/50">
                      Across all Emirates in the UAE
                    </p>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-2xl font-bold text-primary">12+</p>
                    <p className="mt-1 text-xs text-ink/50">Years</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">25+</p>
                    <p className="mt-1 text-xs text-ink/50">Experts</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">97%</p>
                    <p className="mt-1 text-xs text-ink/50">Satisfaction</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
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

          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease }}
            className="mt-14 text-center"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex"
            >
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-secondary/25 transition-all duration-300 hover:bg-[#155f30] hover:shadow-[0_0_20px_rgba(27,117,60,0.4)]"
              >
                View All Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
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

      {/* ===== FAQ ===== */}
      <section className="bg-off-white py-24 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-primary" />
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="mt-14 flex flex-col gap-4"
          >
            {faqs.map((faq, i) => (
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
