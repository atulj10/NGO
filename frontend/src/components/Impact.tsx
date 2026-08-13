import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "../data/content";

interface CounterProps {
  value: number;
  suffix: string;
}

function Counter({ value, suffix }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const [display, setDisplay] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? value : 0
  );

  useEffect(() => {
    if (!inView) return;

    let frame = 0;
    const duration = 1600;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {new Intl.NumberFormat("en-US").format(display)}
      <span className="text-orange">{suffix}</span>
    </span>
  );
}

export default function Impact() {
  const { heading, accentWord, description, stats } = siteConfig.impact;

  const beforeAccent = heading.slice(0, heading.indexOf(accentWord));
  const afterAccent = heading.slice(heading.indexOf(accentWord) + accentWord.length);

  return (
    <section id="impact" className="bg-off-white px-4 py-28 sm:px-6 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="font-display text-6xl tracking-wide text-black sm:text-7xl md:text-8xl">
            {beforeAccent}
            <span className="text-orange">{accentWord}</span>
            {afterAccent}
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-black/60 md:text-lg">
            {description}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3 lg:mt-20 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.article
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
              className="rounded-3xl bg-white p-8 lg:p-10"
            >
              <p className="text-xs font-bold tracking-[0.22em] text-black/50">
                {stat.label}
              </p>
              <p className="mt-6 font-display text-7xl leading-none tracking-wide text-black lg:text-8xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-6 text-sm leading-relaxed text-black/55">
                {stat.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
