import { siteConfig } from "../data/content";

interface LogoProps {
  className?: string;
  compact?: boolean;
}

export default function Logo({ className = "", compact = false }: LogoProps) {
  return (
    <a
      href="#home"
      aria-label={`${siteConfig.organizationName} — back to top`}
      className={`inline-flex items-center gap-2.5 ${className}`}
    >
      <img
        src="/assets/Logo.png"
        alt=""
        className="size-9 rounded-full object-cover"
      />
      {!compact && (
        <span className="hidden font-display text-lg tracking-[0.14em] sm:inline">
          {siteConfig.organizationName}
        </span>
      )}
    </a>
  );
}
