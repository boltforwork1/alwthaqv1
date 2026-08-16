import { motion } from 'framer-motion';
import { ArrowRight, Clock3, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
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
  show: { transition: { staggerChildren: 0.1 } },
};

/* ---------- Data ---------- */
const contactInfo = [
  { icon: Phone, label: 'Phone 1', value: '+971 52 668 4071', href: 'tel:+971526684071' },
  { icon: Phone, label: 'Phone 2', value: '+971 55 527 6288', href: 'tel:+971555276288' },
  { icon: MessageCircle, label: 'WHATSAPP', value: '+971 50 665 9694', href: 'https://wa.me/971506659694' },
  { icon: Mail, label: 'Email', value: 'alwethaqgroup@gmail.com', href: 'mailto:alwethaqgroup@gmail.com' },
  { icon: MapPin, label: 'Address', value: 'Al Nuaimiya 1, Ajman, UAE, P.O Box: 067049022' },
];

/* ---------- Page ---------- */
export default function Contact() {
  return (
    <PageTransition>
      {/* ===== Hero Header ===== */}
      <section className="relative w-full overflow-hidden bg-[url('/images/image.png')] bg-cover bg-center bg-no-repeat py-24 lg:py-28">
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
              Get in Touch
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
              We're here to help with all your government transaction needs. Reach out and our team will respond promptly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== Contact Section ===== */}
      <section className="bg-off-white py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left — Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease }}
            >
              <span className="mb-4 inline-block text-sm font-semibold tracking-[0.2em] text-primary">
                CONTACT INFORMATION
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Let's Talk
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-ink/55">
                Reach us through any of the channels below, or fill out the form and we'll get back to you shortly.
              </p>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-100px' }}
                className="mt-10 flex flex-col gap-5"
              >
                {contactInfo.map(({ icon: Icon, label, value, href }) => {
                  const inner = (
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary">
                        <Icon className="h-5 w-5 text-primary transition-colors duration-300 group-hover:text-white" strokeWidth={1.8} />
                      </div>
                      <div className="text-sm">
                        <p className="text-xs font-medium tracking-wide text-ink/45">{label}</p>
                        <p className="mt-1 text-ink/75">{value}</p>
                      </div>
                    </div>
                  );
                  return (
                    <motion.div variants={blurReveal} key={label}>
                      {href ? (
                        <a href={href} className="group block" target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                          {inner}
                        </a>
                      ) : (
                        <div className="group">{inner}</div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>

              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-5">
                <Clock3 className="h-5 w-5 shrink-0 text-secondary" strokeWidth={1.8} />
                <p className="text-sm text-ink/60">
                  <span className="font-semibold text-ink">Working Hours:</span> Sunday – Thursday, 8:00 AM – 5:00 PM
                </p>
              </div>
            </motion.div>

            {/* Right — Glassmorphism form */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease, delay: 0.15 }}
            >
              <form
                onSubmit={(e) => e.preventDefault()}
                className="rounded-2xl border border-white/40 bg-white/60 p-8 shadow-xl backdrop-blur-md lg:p-10"
              >
                <h3 className="text-2xl font-bold tracking-tight text-ink">Send Us a Message</h3>
                <p className="mt-1 text-sm text-ink/50">Fill in the form below and we'll be in touch.</p>

                <div className="mt-8 flex flex-col gap-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-ink/70">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full rounded-lg border border-black/10 bg-white/80 p-3.5 text-sm text-ink placeholder-ink/30 transition-colors duration-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-ink/70">Email</label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full rounded-lg border border-black/10 bg-white/80 p-3.5 text-sm text-ink placeholder-ink/30 transition-colors duration-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-ink/70">Phone</label>
                      <input
                        type="tel"
                        placeholder="+971 50 000 0000"
                        className="w-full rounded-lg border border-black/10 bg-white/80 p-3.5 text-sm text-ink placeholder-ink/30 transition-colors duration-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-ink/70">Subject</label>
                    <input
                      type="text"
                      placeholder="How can we help?"
                      className="w-full rounded-lg border border-black/10 bg-white/80 p-3.5 text-sm text-ink placeholder-ink/30 transition-colors duration-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-ink/70">Message</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your requirements..."
                      className="w-full resize-none rounded-lg border border-black/10 bg-white/80 p-3.5 text-sm text-ink placeholder-ink/30 transition-colors duration-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-600"
                  >
                    Send Message
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
