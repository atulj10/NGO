import { eventService } from "./event.service.js";
import { reportService } from "./report.service.js";

export interface DashboardData {
  statistics: {
    upcomingEvents: number;
    pendingReports: number;
    eventsThisMonth: number;
  };
  monthlyEvents: { month: string; count: number }[];
  recentReports: Awaited<ReturnType<typeof reportService.findRecent>>;
  upcomingEvents: Awaited<ReturnType<typeof eventService.findUpcoming>>;
}

export class DashboardService {
  async getDashboard(): Promise<DashboardData> {
    const [
      upcomingEvents,
      pendingReports,
      eventsThisMonth,
      monthlyEvents,
      recentReports,
      upcomingEventsList,
    ] = await Promise.all([
      eventService.countUpcoming(),
      eventService.countPending(),
      eventService.countThisMonth(),
      eventService.countByMonth(),
      reportService.findRecent(3),
      eventService.findUpcoming(3),
    ]);

    return {
      statistics: {
        upcomingEvents,
        pendingReports,
        eventsThisMonth,
      },
      monthlyEvents,
      recentReports,
      upcomingEvents: upcomingEventsList,
    };
  }
}

export const dashboardService = new DashboardService();
