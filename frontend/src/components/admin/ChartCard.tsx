import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function ChartCard({ title, children, className = "" }: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`rounded-3xl border border-gray-100 bg-white p-6 shadow-sm ${className}`}
    >
      <h3 className="mb-4 text-sm font-semibold tracking-wider text-gray-500">{title}</h3>
      {children}
    </motion.div>
  );
}
