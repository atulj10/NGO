export interface ApiAdmin {
  id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  admin: ApiAdmin;
  token: string;
}

export interface ApiEvent {
  id: string;
  name: string;
  category: string;
  description: string | null;
  location: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  report?: {
    id: string;
    status: string;
  } | null;
}

export interface ApiReport {
  id: string;
  eventId: string;
  overview: string;
  status: "DRAFT" | "COMPLETED";
  createdAt: string;
  updatedAt: string;
  event?: {
    id: string;
    name: string;
    category: string;
    location: string;
    date: string;
  };
  attachments?: ApiAttachment[];
}

export interface ApiAttachment {
  id: string;
  reportId: string;
  url: string;
  type: "MEDIA" | "SOCIAL_LINK";
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface DashboardData {
  statistics: {
    upcomingEvents: number;
    pendingReports: number;
    eventsThisMonth: number;
  };
  monthlyEvents: { month: string; count: number }[];
  recentReports: ApiReport[];
  upcomingEvents: ApiEvent[];
}
