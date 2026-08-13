import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { siteConfig } from "../data/content";

const MASK_ID = "wave-mask";

export default function JoinUs() {
  const { eyebrow, heading, description, image, waveBars, newsletter } =
    siteConfig.joinUs;
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section id="join" className="bg-orange px-4 py-28 sm:px-6 lg:px-10 lg:py-36">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs font-bold tracking-[0.28em] text-white/70"
        >
          {eyebrow}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mt-8 h-56 w-full max-w-2xl overflow-hidden rounded-3xl sm:h-72 lg:h-80"
        >
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid slice"
            className="h-full w-full"
          >
            <defs>
              <mask id={MASK_ID}>
                <rect width="100" height="100" fill="black" />
                {waveBars.map((bar) => (
                  <rect
                    key={bar.x}
                    x={bar.x}
                    y={bar.y}
                    width={bar.width}
                    height={bar.height}
                    rx={bar.rx}
                    fill="white"
                  />
                ))}
              </mask>
            </defs>
            <image
              href={image}
              x="0"
              y="0"
              width="100"
              height="100"
              preserveAspectRatio="xMidYMid slice"
              mask={`url(#${MASK_ID})`}
            />
          </svg>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="mt-14 text-center font-display text-5xl leading-[0.95] tracking-wide text-white sm:text-7xl md:text-8xl"
        >
          {heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-6 max-w-md text-center text-sm leading-relaxed text-white/75 md:text-base"
        >
          {description}
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="mt-10 flex w-full max-w-2xl flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={newsletter.placeholder}
            className="h-14 flex-1 rounded-full border border-white/40 bg-black/10 px-6 text-sm text-white placeholder-white/60 outline-none transition-colors focus:border-white"
          />
          <button
            type="submit"
            className="h-14 rounded-full bg-white px-10 text-sm font-bold tracking-[0.18em] text-black transition-transform hover:scale-[1.03] active:scale-95"
          >
            {newsletter.button}
          </button>
        </motion.form>

        <AnimatePresence>
          {submitted && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 flex items-center gap-2 text-sm font-medium text-white"
            >
              <Check className="size-4" aria-hidden="true" />
              {newsletter.success}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
