import { Routes, Route, Navigate } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Impact from "./components/Impact";
import Objectives from "./components/Objectives";
import WhatWeDo from "./components/WhatWeDo";
import JoinUs from "./components/JoinUs";
import Footer from "./components/Footer";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Schedule from "./pages/admin/Schedule";
import Reports from "./pages/admin/Reports";

function PublicPage() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero />
        <Impact />
        <Objectives />
        <WhatWeDo />
        <JoinUs />
      </main>
      <Footer />
    </MotionConfig>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicPage />} />

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
