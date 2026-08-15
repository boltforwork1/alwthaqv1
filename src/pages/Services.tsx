import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  Building2,
  Car,
  Check,
  IdCard,
  Landmark,
  Signature as FileSignature,
  X,
} from 'lucide-react';
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
type ServiceItem = {
  icon: typeof Building2;
  title: string;
  desc: string;
  details: string[];
};

const mainServices: ServiceItem[] = [
  {
    icon: Building2,
    title: 'Company Setup & Licensing',
    desc: 'Trade name reservation, commercial license issuance & renewal, contract amendments, and company liquidation.',
    details: [
      'Trade Name Reservation & Initial Approvals',
      'Commercial License Issuance & Annual Renewal',
      'Amending Contracts & Commercial Registers (Adding/Removing partners, changing activities)',
      'Cancellation & Liquidation of Licenses according to official requirements.',
    ],
  },
  {
    icon: IdCard,
    title: 'Visas & Immigration',
    desc: 'Employee & family residency issuance, visit visas, golden/green visas, and sponsorship transfers.',
    details: [
      'Issuance & Renewal of Employee/Family Residencies',
      'Work Visas & Tourist/Visit Visas processing',
      'Visa Cancellation & Sponsorship/Service Transfer',
      'Golden & Green Visa Applications for investors and talents.',
    ],
  },
  {
    icon: Briefcase,
    title: 'Ministry of Human Resources',
    desc: 'Establishment card opening, labor contract processing, and salary/profession updates.',
    details: [
      'Opening Establishment Cards & Company Registration',
      'Issuing & Renewing Labor Contracts/Permits',
      'Amending Professions & Updating Employee Salaries',
      'Filing Absconding Reports & Resolving Labor Disputes.',
    ],
  },
  {
    icon: Landmark,
    title: 'Municipalities & Approvals',
    desc: 'Signage permits, structural modifications, health certificates, and civil defense approvals.',
    details: [
      'Shop & Building Permits (Signage, Structural Modifications)',
      'Health Certificates for the Food & Restaurant Sector',
      'Civil Defense Approvals & Safety Licenses.',
    ],
  },
  {
    icon: Car,
    title: 'Traffic & Vehicle Services',
    desc: 'Vehicle ownership transfer, registration renewal, driving licenses, and traffic fines settlement.',
    details: [
      'Transfer of Vehicle Ownership & Plate Issuance',
      'Renewal of Driving & Vehicle Licenses',
      'Vehicle Inspection Procedures',
      'Traffic Fines Settlement & Official Objections.',
    ],
  },
  {
    icon: FileSignature,
    title: 'Judicial & Notarization',
    desc: 'Attestation of certificates, agency notarizations, commercial and residential lease agreements.',
    details: [
      'Attestation of Agencies & Certificates (Ministry of Foreign Affairs, Notary Public)',
      'Notarization of Contracts (Commercial, Residential, Company MOAs).',
    ],
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
  onView,
}: {
  icon: typeof Building2;
  title: string;
  desc: string;
  onView: () => void;
}) {
  return (
    <motion.div
      variants={blurReveal}
      className="group flex flex-col rounded-2xl border border-black/5 bg-white p-8 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#1B753C]/30 hover:shadow-[0_20px_40px_-15px_rgba(27,117,60,0.15)]"
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
      <button
        onClick={onView}
        className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-ink/50 transition-colors duration-300 hover:text-primary"
      >
        View Details
        <ArrowRight className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

/* ---------- Service Modal ---------- */
function ServiceModal({
  service,
  onClose,
}: {
  service: ServiceItem;
  onClose: () => void;
}) {
  const Icon = service.icon;
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
        className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 text-ink/50 transition-colors duration-300 hover:bg-ink/10 hover:text-ink"
          aria-label="Close"
        >
          <X className="h-5 w-5" strokeWidth={2} />
        </button>

        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
        </div>
        <h3 className="mt-6 text-2xl font-bold tracking-tight text-ink">{service.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/55">{service.desc}</p>

        <div className="mt-4 h-px w-full bg-ink/10" />

        <ul className="mt-6 flex flex-col gap-4">
          {service.details.map((point) => (
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
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

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
                onView={() => setSelectedService(service)}
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

      {/* ===== Service Detail Modal ===== */}
      <AnimatePresence>
        {selectedService && (
          <ServiceModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
