import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { getEvents } from "../../services/event.service";
import type { ApiEvent } from "../../services/types";
import { useEffect } from "react";

interface EventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (event: {
    name: string;
    date: string;
    location: string;
    category: string;
    description: string;
  }) => void;
}

interface FormErrors {
  name?: string;
  date?: string;
  location?: string;
  category?: string;
}

const eventCategories = [
  "Workshop",
  "Campaign",
  "Community",
  "Education",
  "Healthcare",
  "Environment",
  "Fundraising",
  "Other",
];

const emptyForm = {
  name: "",
  date: "",
  location: "",
  category: "",
  description: "",
};

export default function EventDialog({
  open,
  onOpenChange,
  onSubmit,
}: EventDialogProps) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [events, setEvents] = useState<ApiEvent[]>([]);

  useEffect(() => {
    if (open) {
      getEvents({ limit: 100 }).then((res) => setEvents(res.data));
    }
  }, [open]);

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Event name is required";
    if (!form.date) newErrors.date = "Date is required";
    if (!form.location.trim()) newErrors.location = "Location is required";
    if (!form.category) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      name: form.name.trim(),
      date: form.date,
      location: form.location.trim(),
      category: form.category,
      description: form.description.trim(),
    });
    setForm(emptyForm);
    setErrors({});
  }

  function handleClose() {
    setForm(emptyForm);
    setErrors({});
    onOpenChange(false);
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
            className="font-admin fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-gray-100 bg-white p-6 shadow-xl focus:outline-none"
          >
            <div className="flex items-center justify-between">
              <Dialog.Title className="font-display text-xl font-bold text-black">
                Add New Event
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
                  Event Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-black outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
                  placeholder="Enter event name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-black outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
                />
                {errors.date && (
                  <p className="mt-1 text-xs text-red-500">{errors.date}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-black outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
                  placeholder="Enter location"
                />
                {errors.location && (
                  <p className="mt-1 text-xs text-red-500">{errors.location}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-black outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
                >
                  <option value="">Select category</option>
                  {eventCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-xs text-red-500">{errors.category}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={3}
                  className="mt-1 w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-black outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
                  placeholder="Optional description"
                />
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
                  Create Event
                </button>
              </div>
            </form>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
