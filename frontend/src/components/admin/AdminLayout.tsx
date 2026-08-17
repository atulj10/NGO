import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import MobileAdminHeader from "./MobileAdminHeader";
import MobileAdminDrawer from "./MobileAdminDrawer";

export default function AdminLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen bg-off-white">
      <AdminSidebar />

      <MobileAdminDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <div className="flex flex-1 flex-col pt-16 lg:pt-0 lg:pl-64">
        <MobileAdminHeader onMenuToggle={() => setDrawerOpen(true)} />

        <AdminHeader />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
