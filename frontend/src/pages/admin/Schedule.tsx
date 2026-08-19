import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Pencil, Trash2, X } from "lucide-react";
import EventDialog from "../../components/admin/EventDialog";
import EventCard from "../../components/admin/EventCard";
import Pagination from "../../components/admin/Pagination";
import Toast from "../../components/admin/Toast";
import { getEvents, createEvent, updateEvent, deleteEvent } from "../../services/event.service";
import type { ApiEvent } from "../../services/types";

const EVENTS_PER_PAGE = 8;

export interface UIEvent {
  id: string;
  name: string;
  date: string;
  location: string;
  category: string;
  description: string;
}

function apiEventToUI(e: ApiEvent): UIEvent {
  return {
    id: e.id,
    name: e.name,
    date: e.date,
    location: e.location,
    category: e.category,
    description: e.description ?? "",
  };
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Schedule() {
  const [events, setEvents] = useState<UIEvent[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editEvent, setEditEvent] = useState<UIEvent | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<UIEvent | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string | number> = {
        page: currentPage,
        limit: EVENTS_PER_PAGE,
      };
      if (search) params.search = search;
      if (categoryFilter !== "all") params.search = search || categoryFilter;
      if (dateFilter) params.fromDate = dateFilter;

      const res = await getEvents(params as Parameters<typeof getEvents>[0]);
      setEvents(res.data.map(apiEventToUI));
      setTotalPages(res.pagination.totalPages);
      setTotalItems(res.pagination.total);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, categoryFilter, dateFilter]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  }, []);

  const handleDateChange = useCallback((value: string) => {
    setDateFilter(value);
    setCurrentPage(1);
  }, []);

  async function handleCreateEvent(newEvent: {
    name: string;
    date: string;
    location: string;
    category: string;
    description: string;
  }) {
    try {
      await createEvent({
        name: newEvent.name,
        category: newEvent.category,
        description: newEvent.description || undefined,
        location: newEvent.location,
        date: new Date(newEvent.date).toISOString(),
      });
      setDialogOpen(false);
      setToast("Event created successfully.");
      fetchEvents();
    } catch {
      setToast("Failed to create event.");
    }
  }

  async function handleUpdateEvent(newEvent: {
    name: string;
    date: string;
    location: string;
    category: string;
    description: string;
  }) {
    if (!editEvent) return;
    try {
      await updateEvent(editEvent.id, {
        name: newEvent.name,
        category: newEvent.category,
        description: newEvent.description || undefined,
        location: newEvent.location,
        date: new Date(newEvent.date).toISOString(),
      });
      setEditEvent(null);
      setDialogOpen(false);
      setToast("Event updated successfully.");
      fetchEvents();
    } catch {
      setToast("Failed to update event.");
    }
  }

  async function handleDeleteEvent() {
    if (!deleteConfirm) return;
    try {
      await deleteEvent(deleteConfirm.id);
      setDeleteConfirm(null);
      setToast("Event deleted successfully.");
      fetchEvents();
    } catch {
      setToast("Failed to delete event.");
    }
  }

  function openEdit(event: UIEvent) {
    setEditEvent(event);
    setDialogOpen(true);
  }

  function handleDialogClose(open: boolean) {
    if (!open) {
      setEditEvent(null);
    }
    setDialogOpen(open);
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-black">
            Schedule
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage upcoming NGO programs, workshops, and events.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setDialogOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-orange px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-dark"
        >
          <Plus size={16} />
          Add Event
        </motion.button>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search events..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-black outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
        >
          <option value="all">All Categories</option>
          <option value="Workshop">Workshop</option>
          <option value="Campaign">Campaign</option>
          <option value="Community">Community</option>
          <option value="Education">Education</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Environment">Environment</option>
          <option value="Fundraising">Fundraising</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => handleDateChange(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
          title="Filter by date"
        />
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-sm text-gray-500">Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-3xl border border-gray-100 bg-white p-12 text-center shadow-sm"
          >
            <p className="font-display text-xl font-bold text-black">
              No events scheduled
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Create your first event to start building the organization&apos;s
              schedule.
            </p>
            <button
              onClick={() => setDialogOpen(true)}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-orange px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-dark"
            >
              <Plus size={16} />
              Add Event
            </button>
          </motion.div>
        ) : (
          <>
            <div className="hidden overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    <th className="px-6 py-4">Event</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {events.map((event, i) => (
                    <motion.tr
                      key={event.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="transition hover:bg-gray-50/50"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-black">
                        {event.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(event.date)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {event.location}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full bg-orange/10 px-2.5 py-0.5 text-xs font-medium text-orange">
                          {event.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openEdit(event);
                            }}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                            title="Edit event"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteConfirm(event);
                            }}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                            title="Delete event"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-4 md:hidden">
              {events.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="cursor-pointer"
                >
                  <EventCard event={event} />
                  <div className="mt-2 flex justify-end gap-2 px-2">
                    <button
                      onClick={() => openEdit(event)}
                      className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
                    >
                      <Pencil size={12} />
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(event)}
                      className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50"
                    >
                      <Trash2 size={12} />
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={totalItems}
                itemsPerPage={EVENTS_PER_PAGE}
              />
            </div>
          </>
        )}
      </div>

      <EventDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        onSubmit={editEvent ? handleUpdateEvent : handleCreateEvent}
        editEvent={editEvent}
      />

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-3xl border border-gray-100 bg-white p-6 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-black">
                  Delete Event
                </h3>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              </div>
              <p className="mt-3 text-sm text-gray-500">
                Are you sure you want to delete{" "}
                <span className="font-medium text-black">
                  {deleteConfirm.name}
                </span>
                ? This action cannot be undone.
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteEvent}
                  className="rounded-xl bg-red-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-600 active:scale-[0.98]"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
