import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";

const addresses = [
  {
    label: "Head Office",
    lines: [
      "A/8 ROAD NO–4, PROFESSORS COLONY,",
      "LAL BAHADUR SHASTRI NAGAR,",
      "PATNA, PIN – 800023",
    ],
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.714116871584!2d85.07698367608465!3d25.614414314674242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed57bb421e14a5%3A0xe776d13fe37d783b!2sJ37G%2BMQM%2C%20A%2F8%2C%20Road%20No.%204%2C%20Guru%20Sahay%20Lal%20Nagar%2C%20Magistrate%20Colony%2C%20Rukanpura%2C%20Patna%2C%20Bihar%20800025!5e0!3m2!1sen!2sin!4v1786984372973!5m2!1sen!2sin",
  },
  {
    label: "Sheohar Office",
    lines: ["NARAYANPUR, BAIRIYA,", "SHEOHAR (BIHAR)"],
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7137.872422287687!2d85.34210663124185!3d26.554317065961623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ece8b5a4907b89%3A0xf9303dbfcff04b03!2sNarayanpur%2C%20Bihar%20843334!5e0!3m2!1sen!2sin!4v1786984485180!5m2!1sen!2sin",
  },
];

export default function Contact() {
  const [active, setActive] = useState(0);
  const selected = addresses[active];

  return (
    <div className="min-h-screen bg-off-white px-4 py-28 sm:px-6 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-6xl font-bold tracking-wider text-black sm:text-7xl md:text-8xl">
              GET IN TOUCH
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-gray-500">
              We'd love to hear from you. Reach out to us at any of our offices
              or send us an email.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <a
                href="mailto:helpsocietybih@gmail.com"
                className="flex items-center gap-3 text-xl font-bold text-black transition-colors hover:text-orange"
              >
                <Mail size={20} />
                helpsocietybih@gmail.com
              </a>
              <a
                href="tel:9431456753"
                className="flex items-center gap-3 text-xl font-bold text-black transition-colors hover:text-orange"
              >
                <Phone size={20} />
                9431456753
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex gap-3">
              {addresses.map((addr, i) => (
                <button
                  key={addr.label}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    active === i
                      ? "bg-orange text-white"
                      : "border border-gray-200 bg-white text-gray-600 hover:border-orange hover:text-orange"
                  }`}
                >
                  <MapPin size={14} />
                  {addr.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-6 overflow-hidden rounded-3xl border border-white/20 bg-white/30 shadow-lg backdrop-blur-xl"
              >
                <div className="h-80">
                  <iframe
                    src={selected.mapSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="h-full w-full"
                  />
                </div>
                <div className="px-8 py-6">
                  <p className="text-sm font-semibold text-black">
                    {selected.label}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-500">
                    {selected.lines.join(", ")}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
