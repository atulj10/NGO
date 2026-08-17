import { useState } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { login, isAuthenticated } from "../../utils/auth";
import { adminCredentials } from "../../data/adminData";
import { siteConfig } from "../../data/content";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated()) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (
        email === adminCredentials.email &&
        password === adminCredentials.password
      ) {
        login();
        window.location.href = "/admin/dashboard";
      } else {
        setError("Invalid email or password. Please try again.");
        setLoading(false);
      }
    }, 500);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <img
            src="/assets/Logo.png"
            alt=""
            className="mx-auto h-16 w-16 rounded-2xl object-cover"
          />
          <h1 className="mt-6 font-display text-2xl font-bold tracking-wider text-black">
            {siteConfig.organizationName}
          </h1>
          <p className="mt-1 text-sm font-medium uppercase tracking-widest text-gray-400">
            Admin Portal
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm"
        >
          <h2 className="font-display text-xl font-bold text-black">
            Admin Login
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-black outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
                placeholder="admin@voicesunited.org"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 text-sm text-black outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-xl bg-orange py-3 text-sm font-semibold text-white transition hover:bg-orange-dark disabled:opacity-60"
            >
              {loading ? "Signing in..." : "LOGIN"}
            </motion.button>
          </form>
        </motion.div>

        <p className="mt-6 text-center text-xs text-gray-400">
          © 2026 {siteConfig.organizationName}. All rights reserved.
        </p>
      </div>
    </div>
  );
}
