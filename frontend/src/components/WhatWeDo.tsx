import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "../data/content";

export default function WhatWeDo() {
  const { heading, description, cards } = siteConfig.whatWeDo;

  return (
    <section
      id="what-we-do"
      className="bg-orange px-4 py-28 sm:px-6 lg:px-10 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="font-display text-6xl tracking-wide text-white sm:text-7xl md:text-8xl">
            {heading}
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            {description}
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-20 lg:gap-8">
          {cards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group relative flex min-h-[30rem] flex-col justify-end overflow-hidden rounded-3xl bg-black md:min-h-[34rem]"
            >
              <img
                src={card.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/20 transition-opacity duration-500 group-hover:opacity-90" />

              <span className="absolute right-5 top-5 z-10 grid size-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur-[2px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                <ArrowUpRight className="size-5" />
              </span>

              <div className="relative z-10 p-7 lg:p-9">
                <h3 className="font-display text-4xl leading-none tracking-wide text-white lg:text-[2.6rem]">
                  {card.title}
                </h3>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/80">
                  {card.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
