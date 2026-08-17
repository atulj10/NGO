import { Calendar, Clock, MapPin } from "lucide-react";
import type { ScheduleEvent } from "../../data/adminData";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(timeStr: string): string {
  const [hours, minutes] = timeStr.split(":");
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${minutes} ${ampm}`;
}

export default function EventCard({ event }: { event: ScheduleEvent }) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
      <h4 className="font-semibold text-black">{event.name}</h4>
      <div className="mt-3 space-y-1.5 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Calendar size={14} className="shrink-0 text-orange" />
          <span>{formatDate(event.date)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={14} className="shrink-0 text-orange" />
          <span>
            {formatTime(event.startTime)} – {formatTime(event.endTime)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={14} className="shrink-0 text-orange" />
          <span>{event.location}</span>
        </div>
      </div>
      <div className="mt-3">
        <span className="inline-flex items-center rounded-full bg-orange/10 px-2.5 py-0.5 text-xs font-medium text-orange">
          {event.category}
        </span>
      </div>
    </div>
  );
}
