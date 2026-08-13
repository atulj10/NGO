import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, Menu, X } from "lucide-react";
import { siteConfig } from "../data/content";
import Logo from "./Logo";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNavClick = (target: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(target), open ? 300 : 0);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "bg-off-white/90" : "bg-transparent"
      } ${scrolled && !open ? "border-b border-black/10" : "border-b border-transparent"}`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-10"
      >
        <Logo />

        <ul className="hidden items-center gap-8 lg:flex">
          {siteConfig.navigation.map((item) => (
            <li key={item.label}>
              <a
                href={`#${item.target}`}
                className="text-[0.72rem] font-semibold tracking-[0.18em] text-black/80 transition-colors hover:text-black"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Select language"
            className="grid size-10 place-items-center rounded-full text-black transition-colors hover:bg-black/5"
          >
            <Globe className="size-5" />
          </button>

          <button
            type="button"
            onClick={() => scrollToId(siteConfig.hero.primaryCta.target)}
            className="hidden rounded-full bg-orange px-6 py-2.5 text-[0.72rem] font-bold tracking-[0.18em] text-white transition-transform hover:scale-[1.03] active:scale-95 lg:inline-block"
          >
            DONATE
          </button>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="grid size-10 place-items-center rounded-full border border-black/15 text-black lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-black/10 bg-off-white lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 pb-8 pt-4">
              {siteConfig.navigation.map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.25 }}
                >
                  <a
                    href={`#${item.target}`}
                    onClick={() => handleNavClick(item.target)}
                    className="block py-3 font-display text-4xl tracking-wide text-black/85 transition-colors hover:text-orange"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * siteConfig.navigation.length, duration: 0.25 }}
                className="pt-4"
              >
                <button
                  type="button"
                  onClick={() => handleNavClick(siteConfig.hero.primaryCta.target)}
                  className="w-full rounded-full bg-orange px-8 py-3.5 text-sm font-bold tracking-[0.18em] text-white"
                >
                  DONATE
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
