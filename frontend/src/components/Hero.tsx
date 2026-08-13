import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "../data/content";

const heroStyle = {
  "--hero-image": `url("${siteConfig.hero.image}")`,
} as CSSProperties;

export default function Hero() {
  const { titleLines, primaryCta, secondaryCta } = siteConfig.hero;

  return (
    <section
      id="home"
      className="flex min-h-svh flex-col items-center justify-center bg-off-white px-4 pb-16 pt-28 sm:px-6 lg:px-10"
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hero-title select-none text-center"
        style={heroStyle}
      >
        {titleLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:gap-5"
      >
        <button
          type="button"
          onClick={() =>
            document.getElementById(primaryCta.target)?.scrollIntoView({ behavior: "smooth" })
          }
          className="w-full rounded-full bg-orange px-10 py-4 text-sm font-bold tracking-[0.18em] text-white transition-transform hover:scale-[1.04] active:scale-95 sm:w-auto"
        >
          {primaryCta.label}
        </button>

        <button
          type="button"
          onClick={() =>
            document.getElementById(secondaryCta.target)?.scrollIntoView({ behavior: "smooth" })
          }
          className="w-full rounded-full border border-black px-10 py-4 text-sm font-bold tracking-[0.18em] text-black transition-all hover:bg-black hover:text-white active:scale-95 sm:w-auto"
        >
          {secondaryCta.label}
        </button>
      </motion.div>
    </section>
  );
}
