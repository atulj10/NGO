import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Plus, Search } from "lucide-react";
import ReportDialog from "../../components/admin/ReportDialog";
import ReportDetailDialog from "../../components/admin/ReportDetailDialog";
import StatusBadge from "../../components/admin/StatusBadge";
import Pagination from "../../components/admin/Pagination";
import Toast from "../../components/admin/Toast";
import {
  defaultReports,
  defaultScheduleEvents,
  type Report,
  type ScheduleEvent,
} from "../../data/adminData";

const REPORTS_PER_PAGE = 8;
const REPORTS_KEY = "ngo_admin_reports";
const EVENTS_KEY = "ngo_admin_events";

function loadReports(): Report[] {
  try {
    const stored = localStorage.getItem(REPORTS_KEY);
    if (stored) return JSON.parse(stored) as Report[];
  } catch {
    // ignore
  }
  return [...defaultReports];
}

function loadEvents(): ScheduleEvent[] {
  try {
    const stored = localStorage.getItem(EVENTS_KEY);
    if (stored) return JSON.parse(stored) as ScheduleEvent[];
  } catch {
    // ignore
  }
  return [...defaultScheduleEvents];
}

function saveReports(reports: Report[]) {
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Reports() {
  const [reports, setReports] = useState<Report[]>(loadReports);
  const [events] = useState<ScheduleEvent[]>(loadEvents);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailReport, setDetailReport] = useState<Report | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    saveReports(reports);
  }, [reports]);

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !search ||
        report.eventName.toLowerCase().includes(q) ||
        report.summary.toLowerCase().includes(q);
      const matchesStatus =
        statusFilter === "all" || report.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [reports, search, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredReports.length / REPORTS_PER_PAGE)
  );
  const safePage = Math.min(currentPage, totalPages);
  const paginatedReports = filteredReports.slice(
    (safePage - 1) * REPORTS_PER_PAGE,
    safePage * REPORTS_PER_PAGE
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1);
  }, []);

  const handleStatusChange = useCallback((value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  }, []);

  function handleCreateReport(newReport: Omit<Report, "id" | "createdAt">) {
    const id = Math.max(0, ...reports.map((r) => r.id)) + 1;
    const today = new Date().toISOString().split("T")[0];
    setReports((prev) => [
      { ...newReport, id, createdAt: today },
      ...prev,
    ]);
    setDialogOpen(false);
    setToast("Report created successfully.");
  }

  function openDetail(report: Report) {
    setDetailReport(report);
    setDetailOpen(true);
  }

  function handleExport() {
    const headers = ["Report", "Event", "Status", "Created"];
    const rows = filteredReports.map((r) => [
      r.eventName,
      r.eventName,
      r.status,
      r.createdAt,
    ]);
    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reports.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-black">
            Reports
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Track programs, participation, and organizational impact.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setDialogOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-orange px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-dark"
        >
          <Plus size={16} />
          Add Report
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
            placeholder="Search reports..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-black outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
        >
          <option value="all">All Status</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Draft">Draft</option>
        </select>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleExport}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
        >
          Export
        </motion.button>
      </div>

      <div className="mt-6">
        {paginatedReports.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-3xl border border-gray-100 bg-white p-12 text-center shadow-sm"
          >
            <p className="font-display text-xl font-bold text-black">
              No reports found
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Create a report for a completed event to start tracking impact.
            </p>
            <button
              onClick={() => setDialogOpen(true)}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-orange px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-dark"
            >
              <Plus size={16} />
              Add Report
            </button>
          </motion.div>
        ) : (
          <>
            <div className="hidden overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    <th className="px-6 py-4">Event</th>
                    <th className="px-6 py-4">Summary</th>
                    <th className="px-6 py-4">Media</th>
                    <th className="px-6 py-4">Social</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {paginatedReports.map((report, i) => (
                    <motion.tr
                      key={report.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="cursor-pointer transition hover:bg-gray-50/50"
                      onClick={() => openDetail(report)}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-black">
                        {report.eventName}
                      </td>
                      <td className="max-w-[200px] truncate px-6 py-4 text-sm text-gray-500">
                        {report.summary}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {report.media.length} file{report.media.length !== 1 ? "s" : ""}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {report.socialLinks.filter((l) => l).length} link{report.socialLinks.filter((l) => l).length !== 1 ? "s" : ""}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={report.status} />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(report.createdAt)}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 md:hidden">
              {paginatedReports.map((report, i) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => openDetail(report)}
                  className="cursor-pointer rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-black">
                        {report.eventName}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                        {report.summary}
                      </p>
                      <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
                        <span>
                          {report.media.length} media
                        </span>
                        <span>
                          {report.socialLinks.filter((l) => l).length} links
                        </span>
                        <span>{formatDate(report.createdAt)}</span>
                      </div>
                    </div>
                    <StatusBadge status={report.status} />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6">
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredReports.length}
                itemsPerPage={REPORTS_PER_PAGE}
              />
            </div>
          </>
        )}
      </div>

      <ReportDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleCreateReport}
        events={events}
      />

      <ReportDetailDialog
        report={detailReport}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
