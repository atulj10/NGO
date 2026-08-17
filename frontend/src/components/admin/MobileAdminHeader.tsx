import { Menu, User } from "lucide-react";

interface MobileAdminHeaderProps {
  onMenuToggle: () => void;
}

export default function MobileAdminHeader({
  onMenuToggle,
}: MobileAdminHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex h-16 items-center justify-between border-b border-gray-100 bg-white px-4 lg:hidden">
      <button
        onClick={onMenuToggle}
        className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition hover:bg-gray-100"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>
      <p className="font-display text-sm font-bold tracking-wider text-black">
        VOICES UNITED
      </p>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange/10 text-orange">
        <User size={18} />
      </div>
    </header>
  );
}
