import * as Dialog from "@radix-ui/react-dialog";
import { X, Calendar, MapPin, Tag } from "lucide-react";
import { motion } from "framer-motion";
import type { UIEvent } from "../../pages/admin/Schedule";

interface EventDetailDialogProps {
  event: UIEvent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function EventDetailDialog({
  event,
  open,
  onOpenChange,
}: EventDetailDialogProps) {
  if (!event) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
          />
        </Dialog.Overlay>
        <Dialog.Content asChild>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="font-admin fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-gray-100 bg-white p-6 shadow-xl focus:outline-none"
          >
            <div className="flex items-start justify-between">
              <Dialog.Title className="pr-8 font-display text-xl font-bold text-black">
                {event.name}
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                  aria-label="Close dialog"
                >
                  <X size={18} />
                </button>
              </Dialog.Close>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Calendar size={16} className="shrink-0 text-orange" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <MapPin size={16} className="shrink-0 text-orange" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Tag size={16} className="shrink-0 text-orange" />
                <span className="inline-flex items-center rounded-full bg-orange/10 px-2.5 py-0.5 text-xs font-medium text-orange">
                  {event.category}
                </span>
              </div>
            </div>

            {event.description && (
              <div className="mt-5 border-t border-gray-100 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Description
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {event.description}
                </p>
              </div>
            )}
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
