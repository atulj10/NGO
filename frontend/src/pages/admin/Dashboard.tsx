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
import {
  dashboardStats,
  programActivityData,
  dashboardUpcomingEvents,
  dashboardRecentReports,
} from "../../data/adminData";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dashboardStats.map((stat, i) => (
          <StatCard key={stat.label} {...stat} index={i} />
        ))}
      </div>

      <div className="mt-8">
        <ChartCard title="Program Activity">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={programActivityData}>
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
            {dashboardUpcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange/10 text-orange">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-black">{event.name}</p>
                  <p className="text-xs text-gray-500">
                    {event.date} · {event.time}
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
            {dashboardRecentReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-black">{report.name}</p>
                  <p className="text-xs text-gray-500">{report.date}</p>
                </div>
                <StatusBadge status={report.status} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
