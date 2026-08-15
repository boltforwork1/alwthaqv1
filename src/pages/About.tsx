import { motion } from 'framer-motion';
import { ArrowRight, Eye, Lock, ShieldCheck, Target, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';

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
const values = [
  { icon: Zap, title: 'Speed & Efficiency', desc: 'Fast turnaround on every transaction.' },
  { icon: ShieldCheck, title: '100% Compliance', desc: 'Full adherence to UAE regulations.' },
  { icon: Users, title: 'Expert Consultants', desc: 'A seasoned team at your service.' },
  { icon: Lock, title: 'Total Confidentiality', desc: 'Your data and documents stay private.' },
];

/* ---------- Value card ---------- */
function ValueCard({ icon: Icon, title, desc }: { icon: typeof Zap; title: string; desc: string }) {
  return (
    <motion.div
      variants={blurReveal}
      className="group flex flex-col items-center text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary">
        <Icon className="h-8 w-8 text-primary transition-colors duration-300 group-hover:text-white" strokeWidth={1.5} />
      </div>
      <h3 className="mt-6 text-base font-semibold tracking-tight text-ink">{title}</h3>
      <p className="mt-2 max-w-[12rem] text-sm leading-relaxed text-ink/55">{desc}</p>
    </motion.div>
  );
}

/* ---------- Page ---------- */
export default function About() {
  return (
    <PageTransition>
      {/* ===== Hero Header ===== */}
      <section className="relative w-full overflow-hidden bg-ink py-24 lg:py-28">
        <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[#1B753C]/25 blur-[120px]" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-[#B32025]/20 blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              About Al Wthaq Group
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
              Your trusted partner in navigating UAE's government and corporate landscape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== Who We Are ===== */}
      <section className="bg-white py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease }}
            >
              <span className="mb-4 inline-block text-sm font-semibold tracking-[0.2em] text-primary">
                WHO WE ARE
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Excellence in Government Services
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/55">
                Al Wthaq Group is a leading documents clearance and corporate services provider
                in the UAE. We specialize in simplifying complex governmental procedures for
                investors, entrepreneurs, and individuals. Our expert team ensures that your
                transactions are processed with maximum efficiency, zero errors, and absolute
                compliance with local regulations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease, delay: 0.15 }}
              className="relative"
            >
              <div className="overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="/images/about.jpg"
                  alt="Modern Dubai office"
                  className="h-[400px] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 left-6 rounded-2xl border border-white/40 bg-white/70 px-6 py-4 shadow-xl backdrop-blur-md">
                <p className="text-2xl font-bold text-primary">12+</p>
                <p className="mt-0.5 text-xs font-medium text-ink/60">Years of Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Mission & Vision ===== */}
      <section className="bg-off-white py-24 lg:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="grid gap-6 sm:grid-cols-2"
          >
            <motion.div
              variants={blurReveal}
              className="group rounded-2xl border border-black/5 bg-white p-8 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#1B753C]/30 hover:shadow-[0_20px_40px_-15px_rgba(27,117,60,0.15)]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10 transition-colors duration-300 group-hover:bg-secondary">
                <Target className="h-7 w-7 text-secondary transition-colors duration-300 group-hover:text-white" strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight text-ink">Our Mission</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/55">
                To provide seamless, transparent, and rapid government transaction services that
                empower businesses to launch and grow in the UAE without administrative hurdles.
              </p>
            </motion.div>

            <motion.div
              variants={blurReveal}
              className="group rounded-2xl border border-black/5 bg-white p-8 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#B32025]/30 hover:shadow-[0_20px_40px_-15px_rgba(179,32,37,0.15)]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary">
                <Eye className="h-7 w-7 text-primary transition-colors duration-300 group-hover:text-white" strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight text-ink">Our Vision</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/55">
                To be the most recognized and trusted corporate services agency in the Middle East,
                setting the standard for efficiency and client satisfaction.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== Core Values ===== */}
      <section className="bg-white py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Why Choose Us
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-primary" />
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((value) => (
              <ValueCard
                key={value.title}
                icon={value.icon}
                title={value.title}
                desc={value.desc}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CTA Banner ===== */}
      <section className="bg-primary px-6 py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease }}
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Start Your Business Journey?
          </h2>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 inline-flex"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-ink shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              Contact Us Today
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </PageTransition>
  );
}
