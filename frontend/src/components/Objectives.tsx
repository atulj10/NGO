import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "../data/content";

const ROTATION_MS = 1000;

export default function Objectives() {
  const objectives = siteConfig.objectives;
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotationKey, setRotationKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % objectives.length);
    }, ROTATION_MS);

    return () => clearInterval(interval);
  }, [rotationKey, objectives.length]);

  const selectObjective = (index: number) => {
    setActiveIndex(index);
    setRotationKey((key) => key + 1);
  };

  return (
    <section id="objectives" className="bg-orange px-4 py-28 sm:px-6 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14 flex items-end justify-between gap-6"
        >
          <h2 className="font-display text-5xl tracking-wide text-white sm:text-6xl md:text-7xl">
            MAIN OBJECTIVES
          </h2>
          <p className="hidden pb-2 font-display text-2xl tracking-widest text-white/60 sm:block">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(objectives.length).padStart(2, "0")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
          {objectives.map((objective, index) => {
            const isActive = index === activeIndex;

            return (
              <motion.button
                key={objective.title}
                type="button"
                aria-pressed={isActive}
                onClick={() => selectObjective(index)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                className={`relative h-64 overflow-hidden rounded-3xl text-left transition-colors duration-500 md:h-[30rem] ${
                  isActive
                    ? "bg-black"
                    : "border border-white/60 bg-transparent"
                }`}
              >
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key={objective.image}
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className="absolute inset-0"
                    >
                      <img
                        src={objective.image}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <span
                  className={`relative z-10 flex h-full w-full items-end p-7 font-display text-3xl leading-none tracking-wide transition-colors duration-500 md:text-4xl lg:p-9 ${
                    isActive ? "text-white" : "text-white/90"
                  }`}
                >
                  {objective.title}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
