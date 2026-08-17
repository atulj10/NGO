import { motion } from "framer-motion";

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle: string;
  index?: number;
}

export default function StatCard({ label, value, subtitle, index = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
    >
      <p className="text-xs font-semibold tracking-wider text-gray-500">{label}</p>
      <p className="mt-3 font-display text-4xl font-bold text-black">{value}</p>
      <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
    </motion.div>
  );
}
