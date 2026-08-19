import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowRight, Calendar } from "lucide-react";
import StatCard from "../../components/admin/StatCard";
import ChartCard from "../../components/admin/ChartCard";
import StatusBadge from "../../components/admin/StatusBadge";
import { getDashboard } from "../../services/dashboard.service";
import type { DashboardData } from "../../services/types";

function mapStatus(status: string): "Completed" | "Pending" | "Draft" {
  const s = status.toUpperCase();
  if (s === "COMPLETED") return "Completed";
  if (s === "DRAFT") return "Draft";
  return "Pending";
}

function formatEventDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatEventTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatReportDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getDashboard()
      .then((res) => {
        setDashboard(res.data);
      })
      .catch(() => {
        setError("Failed to load dashboard data");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-sm text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-sm text-red-500">{error || "No data available"}</div>
      </div>
    );
  }

  const stats = [
    {
      label: "EVENTS THIS MONTH",
      value: dashboard.statistics.eventsThisMonth,
      subtitle: "This month",
    },
    {
      label: "UPCOMING EVENTS",
      value: dashboard.statistics.upcomingEvents,
      subtitle: "Total upcoming",
    },
    {
      label: "PENDING REPORTS",
      value: dashboard.statistics.pendingReports,
      subtitle: "Need attention",
    },
  ];

  const chartData = dashboard.monthlyEvents.map((m) => ({
    month: m.month,
    value: m.count,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} {...stat} index={i} />
        ))}
      </div>

      <div className="mt-8">
        <ChartCard title="Program Activity">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                />
                <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#ff6845"
                  fill="#ff6845"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold tracking-wider text-gray-500">
              Upcoming Events
            </h3>
            <button
              onClick={() => navigate("/admin/schedule")}
              className="flex items-center gap-1 text-xs font-medium text-orange transition hover:text-orange-dark"
            >
              View Schedule <ArrowRight size={14} />
            </button>
          </div>
          <div className="mt-4 space-y-4">
            {dashboard.upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange/10 text-orange">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-black">{event.name}</p>
                  <p className="text-xs text-gray-500">
                    {formatEventDate(event.date)} · {formatEventTime(event.date)}
                  </p>
                  <p className="text-xs text-gray-400">{event.location}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
        >
          <h3 className="text-sm font-semibold tracking-wider text-gray-500">
            Recent Reports
          </h3>
          <div className="mt-4 space-y-4">
            {dashboard.recentReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-black">
                    {report.event?.name || "Report"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatReportDate(report.createdAt)}
                  </p>
                </div>
                <StatusBadge status={mapStatus(report.status)} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
