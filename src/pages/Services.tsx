import { motion } from 'framer-motion';
import { Building2, Briefcase, Car, Signature as FileSignature, IdCard, Landmark } from 'lucide-react';
import PageTransition from '@/components/PageTransition';

/* ---------- Shared animation helpers (matched to Home page) ---------- */
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
const mainServices = [
  {
    icon: Building2,
    title: 'Company Setup & Licensing',
    desc: 'Trade name reservation, commercial license issuance & renewal, contract amendments, and company liquidation.',
  },
  {
    icon: IdCard,
    title: 'Visas & Immigration',
    desc: 'Employee & family residency issuance, visit visas, golden/green visas, and sponsorship transfers.',
  },
  {
    icon: Briefcase,
    title: 'Ministry of Human Resources',
    desc: 'Establishment card opening, labor contract processing, and salary/profession updates.',
  },
  {
    icon: Landmark,
    title: 'Municipalities & Approvals',
    desc: 'Signage permits, structural modifications, health certificates, and civil defense approvals.',
  },
  {
    icon: Car,
    title: 'Traffic & Vehicle Services',
    desc: 'Vehicle ownership transfer, registration renewal, driving licenses, and traffic fines settlement.',
  },
  {
    icon: FileSignature,
    title: 'Judicial & Notarization',
    desc: 'Attestation of certificates, agency notarizations, commercial and residential lease agreements.',
  },
];

const quickServices = [
  'Visas & Residencies',
  'Flight Tickets',
  'Family Sponsorship',
  'Bank Account Opening',
  'Ejari (Tenancy Contracts)',
  'Amer Center Services',
  'Tasheel',
  'Tadbeer',
  'Tawjeeh',
  'ICA Services',
  'Police & Interior Ministry',
];

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
      className="group rounded-2xl border border-black/5 bg-white p-8 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#1B753C]/30 hover:shadow-[0_20px_40px_-15px_rgba(27,117,60,0.15)]"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Icon
            className="h-7 w-7 text-primary transition-colors duration-300 group-hover:text-white"
            strokeWidth={1.5}
          />
        </motion.div>
      </div>
      <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink/55">{desc}</p>
    </motion.div>
  );
}

/* ---------- Page ---------- */
export default function Services() {
  return (
    <PageTransition>
      {/* ===== Hero Header ===== */}
      <section className="relative w-full overflow-hidden bg-ink py-24 lg:py-28">
        {/* glowing orbs */}
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
              Our Premium Services
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
              Comprehensive government transaction clearance for individuals and corporations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== Main Services Grid ===== */}
      <section className="bg-off-white py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {mainServices.map((service) => (
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

      {/* ===== Quick Services Tags ===== */}
      <section className="bg-white py-24 lg:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              We Also Facilitate
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-primary" />
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="mt-14 flex flex-wrap justify-center gap-4"
          >
            {quickServices.map((tag) => (
              <motion.span
                key={tag}
                variants={blurReveal}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="cursor-default rounded-full border border-black/5 bg-off-white px-6 py-3 text-sm font-medium text-ink/70 transition-colors duration-300 hover:border-primary/30 hover:text-primary"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
