import { siteConfig } from "../data/content";

interface LogoProps {
  className?: string;
  compact?: boolean;
}

function LogoMark({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle
        cx="16"
        cy="16"
        r="13.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M13 12v8" />
        <path d="M16 9v14" />
        <path d="M19 12.5v7" />
      </g>
    </svg>
  );
}

export default function Logo({ className = "", compact = false }: LogoProps) {
  return (
    <a
      href="#home"
      aria-label={`${siteConfig.organizationName} — back to top`}
      className={`inline-flex items-center gap-2.5 ${className}`}
    >
      <span className="grid size-9 place-items-center rounded-full border border-current">
        <LogoMark />
      </span>
      {!compact && (
        <span className="font-display text-lg tracking-[0.14em]">
          {siteConfig.organizationName}
        </span>
      )}
    </a>
  );
}
