import { useEffect, useState, type SVGProps } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { siteConfig } from "../data/content";
import Logo from "./Logo";

type IconProps = SVGProps<SVGSVGElement>;

const InstagramIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const XIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const socialIcons = {
  instagram: InstagramIcon,
  twitter: XIcon,
  facebook: FacebookIcon,
  linkedin: LinkedinIcon,
} as const;

export default function Footer() {
  const navigate = useNavigate();
  const { tagline, statement, columns, copyright, socials } = siteConfig.footer;
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer id="contact" className="relative bg-orange px-4 pb-24 pt-28 sm:px-6 lg:px-10 lg:pt-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <Logo className="text-white" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/75">
              {tagline}
            </p>
            <div className="mt-7 flex gap-3">
              {socials.map((social) => {
                const Icon = socialIcons[social.icon as keyof typeof socialIcons];
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                    className="grid size-11 place-items-center rounded-full border border-white/40 text-white transition-colors hover:bg-white hover:text-orange"
                  >
                    <Icon className="size-[18px]" />
                  </a>
                );
              })}
            </div>
          </div>

          {columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <p className="text-xs font-bold tracking-[0.22em] text-white/55">
                {column.heading}
              </p>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.url.startsWith("/") ? (
                      <button
                        type="button"
                        onClick={() => navigate(link.url)}
                        className="text-sm text-white/85 transition-colors hover:text-white"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href={link.url}
                        className="text-sm text-white/85 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className="footer-statement mt-24 text-center lg:mt-32" aria-hidden="true">
          {statement}
        </p>

        <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-white/25 pt-8 sm:flex-row">
          <p className="text-xs tracking-wide text-white/70">
            © {new Date().getFullYear()} {siteConfig.organizationName}. {copyright}
          </p>
          <p className="text-xs tracking-[0.18em] text-white/55">
            STORIES THAT SPEAK. ACTIONS THAT COUNT.
          </p>
        </div>
      </div>

      <AnimatePresence>
        {showTop && (
          <motion.button
            key="back-to-top"
            type="button"
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.6, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 16 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() =>
              document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })
            }
            className="fixed bottom-6 right-6 z-40 grid size-12 place-items-center rounded-full bg-black text-white shadow-lg shadow-black/20"
          >
            <ArrowUp className="size-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
