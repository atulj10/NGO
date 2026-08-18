import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "../data/content";

const ROTATION_MS = 1500;

export default function Objectives() {
  const objectives = siteConfig.objectives;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % objectives.length);
    }, ROTATION_MS);

    return () => clearInterval(interval);
  }, [objectives.length]);

  const active = objectives[activeIndex];

  return (
    <section id="objectives" className="relative h-svh w-full overflow-hidden bg-black">
      <AnimatePresence>
        <motion.img
          key={active.image}
          src={active.image}
          alt=""
          decoding="async"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 px-6 pb-6 sm:pb-8 lg:pb-10">
        {objectives.map((objective, index) => (
          <span
            key={objective.title}
            className={`font-display text-7xl leading-none  tracking-wide transition-colors duration-500 sm:text-5xl lg:text-9xl ${
              index === activeIndex ? "text-white" : "text-outline-white"
            }`}
          >
            {objective.title}
          </span>
        ))}
      </div>
    </section>
  );
}
