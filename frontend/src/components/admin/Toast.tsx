import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-green-200 bg-white px-5 py-3 shadow-lg"
    >
      <CheckCircle size={18} className="text-green-500" />
      <span className="text-sm font-medium text-gray-700">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-gray-400 transition hover:text-gray-600"
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}
