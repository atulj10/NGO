import * as Dialog from "@radix-ui/react-dialog";
import { X, Upload, Link as LinkIcon, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import type { ApiEvent } from "../../services/types";

interface ReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (report: {
    eventId: string;
    summary: string;
    files: File[];
    socialLinks: string[];
    status: "DRAFT" | "COMPLETED";
  }) => void;
  events: ApiEvent[];
}

interface FormErrors {
  eventId?: string;
  summary?: string;
}

interface MediaPreview {
  file: File;
  preview: string;
}

export default function ReportDialog({
  open,
  onOpenChange,
  onSubmit,
  events,
}: ReportDialogProps) {
  const [eventId, setEventId] = useState("");
  const [summary, setSummary] = useState("");
  const [media, setMedia] = useState<MediaPreview[]>([]);
  const [socialLinks, setSocialLinks] = useState<string[]>([""]);
  const [status, setStatus] = useState<"DRAFT" | "COMPLETED">("DRAFT");
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!eventId) newErrors.eventId = "Please select an event";
    if (!summary.trim()) newErrors.summary = "Summary is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      eventId,
      summary: summary.trim(),
      files: media.map((m) => m.file),
      socialLinks: socialLinks.filter((l) => l.trim()),
      status,
    });
    resetForm();
  }

  function resetForm() {
    setEventId("");
    setSummary("");
    media.forEach((m) => URL.revokeObjectURL(m.preview));
    setMedia([]);
    setSocialLinks([""]);
    setStatus("DRAFT");
    setErrors({});
  }

  function handleClose() {
    resetForm();
    onOpenChange(false);
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const preview = URL.createObjectURL(file);
      setMedia((prev) => [...prev, { file, preview }]);
    });
    e.target.value = "";
  }

  function removeMedia(index: number) {
    setMedia((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  }

  function addSocialLink() {
    setSocialLinks((prev) => [...prev, ""]);
  }

  function updateSocialLink(index: number, value: string) {
    setSocialLinks((prev) => prev.map((l, i) => (i === index ? value : l)));
  }

  function removeSocialLink(index: number) {
    setSocialLinks((prev) => prev.filter((_, i) => i !== index));
  }

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
            className="font-admin fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-gray-100 bg-white p-6 shadow-xl focus:outline-none"
          >
            <div className="flex items-center justify-between">
              <Dialog.Title className="font-display text-xl font-bold text-black">
                Add New Report
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  onClick={handleClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                  aria-label="Close dialog"
                >
                  <X size={18} />
                </button>
              </Dialog.Close>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Event
                </label>
                <select
                  value={eventId}
                  onChange={(e) => setEventId(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-black outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
                >
                  <option value="">Select an event</option>
                  {events.map((ev) => (
                    <option key={ev.id} value={ev.id}>
                      {ev.name} ({new Date(ev.date).toLocaleDateString()})
                    </option>
                  ))}
                </select>
                {errors.eventId && (
                  <p className="mt-1 text-xs text-red-500">{errors.eventId}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Summary
                </label>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={4}
                  className="mt-1 w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-black outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
                  placeholder="Describe the event outcomes, key highlights, and impact..."
                />
                {errors.summary && (
                  <p className="mt-1 text-xs text-red-500">{errors.summary}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Media
                </label>
                <label className="mt-1 flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 px-4 py-6 text-sm text-gray-500 transition hover:border-orange hover:text-orange">
                  <Upload size={18} />
                  <span>Click to upload photos or videos</span>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
                {media.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {media.map((item, i) => (
                      <div
                        key={i}
                        className="group relative overflow-hidden rounded-xl border border-gray-100"
                      >
                        {item.file.type.startsWith("image/") ? (
                          <img
                            src={item.preview}
                            alt={item.file.name}
                            className="h-20 w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-20 w-full items-center justify-center bg-gray-100 text-xs text-gray-500">
                            Video
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removeMedia(i)}
                          className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100"
                          aria-label={`Remove ${item.file.name}`}
                        >
                          <X size={10} />
                        </button>
                        <p className="truncate px-1.5 py-1 text-[10px] text-gray-500">
                          {item.file.name}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Social Media Posts
                </label>
                <div className="mt-1 space-y-2">
                  {socialLinks.map((link, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <LinkIcon size={14} className="shrink-0 text-gray-400" />
                      <input
                        type="url"
                        value={link}
                        onChange={(e) => updateSocialLink(i, e.target.value)}
                        className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm text-black outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
                        placeholder="https://instagram.com/p/..."
                      />
                      {socialLinks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSocialLink(i)}
                          className="shrink-0 text-gray-400 transition hover:text-red-500"
                          aria-label="Remove link"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addSocialLink}
                  className="mt-2 flex items-center gap-1 text-xs font-medium text-orange transition hover:text-orange-dark"
                >
                  <Plus size={12} />
                  Add another link
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as "DRAFT" | "COMPLETED")
                  }
                  className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-black outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-orange px-5 py-2.5 text-sm font-medium text-white transition hover:bg-orange-dark active:scale-[0.98]"
                >
                  Create Report
                </button>
              </div>
            </form>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
