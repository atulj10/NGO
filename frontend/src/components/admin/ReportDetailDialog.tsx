import * as Dialog from "@radix-ui/react-dialog";
import { X, Link as LinkIcon, Image } from "lucide-react";
import { motion } from "framer-motion";
import type { Report } from "../../data/adminData";
import StatusBadge from "./StatusBadge";

interface ReportDetailDialogProps {
  report: Report | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ReportDetailDialog({
  report,
  open,
  onOpenChange,
}: ReportDetailDialogProps) {
  if (!report) return null;

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
            className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-gray-100 bg-white p-6 shadow-xl focus:outline-none"
          >
            <div className="flex items-start justify-between">
              <div className="pr-8">
                <Dialog.Title className="font-display text-xl font-bold text-black">
                  {report.eventName}
                </Dialog.Title>
                <p className="mt-1 text-sm text-gray-500">
                  Report · {formatDate(report.createdAt)}
                </p>
              </div>
              <Dialog.Close asChild>
                <button
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                  aria-label="Close dialog"
                >
                  <X size={18} />
                </button>
              </Dialog.Close>
            </div>

            <div className="mt-4">
              <StatusBadge status={report.status} />
            </div>

            <div className="mt-5 border-t border-gray-100 pt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Overview
              </p>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {report.summary}
              </p>
            </div>

            {report.media.length > 0 && (
              <div className="mt-5 border-t border-gray-100 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Media
                </p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {report.media.map((item, i) => (
                    <div
                      key={i}
                      className="overflow-hidden rounded-xl border border-gray-100"
                    >
                      {item.type.startsWith("image/") ? (
                        <img
                          src={item.data}
                          alt={item.name}
                          className="h-24 w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-24 w-full items-center justify-center bg-gray-100">
                          <Image size={20} className="text-gray-400" />
                        </div>
                      )}
                      <p className="truncate px-2 py-1 text-[10px] text-gray-500">
                        {item.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {report.socialLinks.length > 0 && (
              <div className="mt-5 border-t border-gray-100 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Social Media Posts
                </p>
                <div className="mt-2 space-y-2">
                  {report.socialLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2 text-sm text-orange transition hover:bg-orange/5"
                    >
                      <LinkIcon size={14} className="shrink-0" />
                      <span className="truncate">{link}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
