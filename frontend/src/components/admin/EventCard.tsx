import { Calendar, MapPin } from "lucide-react";
import type { UIEvent } from "../../pages/admin/Schedule";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function EventCard({ event }: { event: UIEvent }) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
      <h4 className="font-semibold text-black">{event.name}</h4>
      <div className="mt-3 space-y-1.5 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Calendar size={14} className="shrink-0 text-orange" />
          <span>{formatDate(event.date)}</span>
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
