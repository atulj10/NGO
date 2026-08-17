import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  FileBarChart,
  LogOut,
  X,
} from "lucide-react";
import { logout } from "../../utils/auth";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/schedule", label: "Schedule", icon: CalendarDays },
  { to: "/admin/reports", label: "Reports", icon: FileBarChart },
];

interface MobileAdminDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileAdminDrawer({
  open,
  onClose,
}: MobileAdminDrawerProps) {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/admin/login");
  }

  function handleNav() {
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          />
          <motion.div
            initial={{ x: -288 }}
            animate={{ x: 0 }}
            exit={{ x: -288 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-gray-200 bg-off-white lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange font-display text-lg font-bold text-white">
                  VU
                </div>
                <div>
                  <p className="font-display text-sm font-bold tracking-wider text-black">
                    VOICES UNITED
                  </p>
                  <p className="text-xs text-gray-500">Admin Portal</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-200 hover:text-black"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="mt-2 flex-1 space-y-1 px-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={handleNav}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-orange text-white"
                        : "text-gray-600 hover:bg-orange/5 hover:text-orange"
                    }`
                  }
                >
                  <item.icon size={18} />
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="px-3 pb-6">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 transition hover:bg-red-50 hover:text-red-600"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
