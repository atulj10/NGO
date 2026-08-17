import { useNavigate, useLocation } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { User } from "lucide-react";
import { logout } from "../../utils/auth";

const pageTitles: Record<string, { title: string; description: string }> = {
  "/admin/dashboard": {
    title: "Dashboard",
    description: "Welcome back, Admin.",
  },
  "/admin/schedule": {
    title: "Schedule",
    description: "Manage upcoming NGO programs, workshops, and events.",
  },
  "/admin/reports": {
    title: "Reports",
    description: "Track programs, participation, and organizational impact.",
  },
};

export default function AdminHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const page = pageTitles[location.pathname] || {
    title: "Admin",
    description: "",
  };

  function handleLogout() {
    logout();
    navigate("/admin/login");
  }

  return (
    <header className="hidden items-center justify-between border-b border-gray-100 bg-white px-8 py-5 lg:flex">
      <div>
        <h1 className="font-display text-2xl  text-black">
          {page.title}
        </h1>
        {/* <p className="mt-0.5 text-sm text-gray-500">{page.description}</p> */}
      </div>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange/10 text-orange">
              <User size={14} />
            </div>
            <span>Admin</span>
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="end"
            className="z-50 min-w-[200px] rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg"
          >
            <div className="px-3 py-2">
              <p className="text-sm font-medium text-black">Admin</p>
              <p className="text-xs text-gray-500">
                admin@voicesunited.org
              </p>
            </div>
            <DropdownMenu.Separator className="my-1 h-px bg-gray-100" />
            <DropdownMenu.Item
              onClick={handleLogout}
              className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 outline-none transition hover:bg-red-50"
            >
              Logout
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </header>
  );
}
