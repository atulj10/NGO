import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Plus, Search } from "lucide-react";
import EventDialog from "../../components/admin/EventDialog";
import EventDetailDialog from "../../components/admin/EventDetailDialog";
import EventCard from "../../components/admin/EventCard";
import Pagination from "../../components/admin/Pagination";
import Toast from "../../components/admin/Toast";
import {
  defaultScheduleEvents,
  eventCategories,
  type ScheduleEvent,
} from "../../data/adminData";

const EVENTS_PER_PAGE = 8;
const EVENTS_KEY = "ngo_admin_events";

function loadEvents(): ScheduleEvent[] {
  try {
    const stored = localStorage.getItem(EVENTS_KEY);
    if (stored) return JSON.parse(stored) as ScheduleEvent[];
  } catch {
    // ignore
  }
  return [...defaultScheduleEvents];
}

function saveEvents(events: ScheduleEvent[]) {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Schedule() {
  const [events, setEvents] = useState<ScheduleEvent[]>(loadEvents);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailEvent, setDetailEvent] = useState<ScheduleEvent | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    saveEvents(events);
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !search ||
        event.name.toLowerCase().includes(q) ||
        event.location.toLowerCase().includes(q);
      const matchesCategory =
        categoryFilter === "all" || event.category === categoryFilter;
      const matchesDate = !dateFilter || event.date >= dateFilter;
      return matchesSearch && matchesCategory && matchesDate;
    });
  }, [events, search, categoryFilter, dateFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredEvents.length / EVENTS_PER_PAGE)
  );
  const safePage = Math.min(currentPage, totalPages);
  const paginatedEvents = filteredEvents.slice(
    (safePage - 1) * EVENTS_PER_PAGE,
    safePage * EVENTS_PER_PAGE
  );

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

  function handleCreateEvent(newEvent: Omit<ScheduleEvent, "id">) {
    const id = Math.max(0, ...events.map((e) => e.id)) + 1;
    setEvents((prev) => [{ ...newEvent, id }, ...prev]);
    setDialogOpen(false);
    setToast("Event created successfully.");
  }

  function openDetail(event: ScheduleEvent) {
    setDetailEvent(event);
    setDetailOpen(true);
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
          {eventCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
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
        {paginatedEvents.length === 0 ? (
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {paginatedEvents.map((event, i) => (
                    <motion.tr
                      key={event.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="cursor-pointer transition hover:bg-gray-50/50"
                      onClick={() => openDetail(event)}
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
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-4 md:hidden">
              {paginatedEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => openDetail(event)}
                  className="cursor-pointer"
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </div>

            <div className="mt-6">
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredEvents.length}
                itemsPerPage={EVENTS_PER_PAGE}
              />
            </div>
          </>
        )}
      </div>

      <EventDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleCreateEvent}
      />

      <EventDetailDialog
        event={detailEvent}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
