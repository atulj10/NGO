export const adminCredentials = {
  email: "admin@voicesunited.org",
  password: "admin123",
};

export const dashboardStats = [
  { label: "TOTAL PROGRAMS", value: 24, subtitle: "+3 this month" },
  { label: "UPCOMING EVENTS", value: 8, subtitle: "Next: Workshop" },
  { label: "REPORTS PENDING", value: 5, subtitle: "2 due this week" },
];

export const programActivityData = [
  { month: "Jan", value: 32 },
  { month: "Feb", value: 45 },
  { month: "Mar", value: 38 },
  { month: "Apr", value: 61 },
  { month: "May", value: 55 },
  { month: "Jun", value: 72 },
  { month: "Jul", value: 68 },
  { month: "Aug", value: 84 },
];

export const dashboardUpcomingEvents = [
  { id: 1, name: "Community Health Workshop", date: "18 Aug 2026", time: "10:00 AM", location: "Bengaluru" },
  { id: 2, name: "Women Leadership Program", date: "21 Aug 2026", time: "2:00 PM", location: "Ranchi" },
  { id: 3, name: "Climate Awareness Session", date: "25 Aug 2026", time: "11:30 AM", location: "Delhi" },
];

export const dashboardRecentReports = [
  { id: 1, name: "Monthly Impact Report", status: "Pending" as const, date: "12 Aug 2026" },
  { id: 2, name: "Community Program Report", status: "Completed" as const, date: "10 Aug 2026" },
  { id: 3, name: "Volunteer Activity Report", status: "Pending" as const, date: "08 Aug 2026" },
];

export const eventCategories = [
  "Workshop",
  "Campaign",
  "Community",
  "Education",
  "Fundraising",
  "Other",
] as const;

export type EventCategory = (typeof eventCategories)[number];

export interface ScheduleEvent {
  id: number;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  category: EventCategory;
  description: string;
}

export const defaultScheduleEvents: ScheduleEvent[] = [
  { id: 1, name: "Community Health Workshop", date: "2026-08-18", startTime: "10:00", endTime: "12:00", location: "Bengaluru", category: "Workshop", description: "Health awareness and preventive care workshop for local communities." },
  { id: 2, name: "Women Leadership Program", date: "2026-08-21", startTime: "14:00", endTime: "16:00", location: "Ranchi", category: "Education", description: "Leadership development program for women in rural areas." },
  { id: 3, name: "Climate Awareness Session", date: "2026-08-25", startTime: "11:30", endTime: "13:00", location: "Delhi", category: "Campaign", description: "Interactive session on climate change and community action." },
  { id: 4, name: "Child Rights Workshop", date: "2026-08-28", startTime: "09:00", endTime: "11:00", location: "Mumbai", category: "Workshop", description: "Workshop on children's rights and protection mechanisms." },
  { id: 5, name: "Fundraising Gala", date: "2026-09-01", startTime: "18:00", endTime: "21:00", location: "Delhi", category: "Fundraising", description: "Annual fundraising gala to support education programs." },
  { id: 6, name: "Community Clean-Up Drive", date: "2026-09-03", startTime: "07:00", endTime: "10:00", location: "Chennai", category: "Community", description: "Neighborhood clean-up and waste management awareness." },
  { id: 7, name: "Digital Literacy Camp", date: "2026-09-05", startTime: "10:00", endTime: "14:00", location: "Hyderabad", category: "Education", description: "Teaching basic computer and internet skills to underprivileged youth." },
  { id: 8, name: "Mental Health Awareness", date: "2026-09-08", startTime: "11:00", endTime: "13:00", location: "Pune", category: "Workshop", description: "Community workshop on mental health awareness and support." },
  { id: 9, name: "Tree Plantation Drive", date: "2026-09-10", startTime: "08:00", endTime: "11:00", location: "Jaipur", category: "Campaign", description: "Large-scale tree plantation event in partnership with local schools." },
  { id: 10, name: "Women's Safety Workshop", date: "2026-09-12", startTime: "14:00", endTime: "16:00", location: "Lucknow", category: "Workshop", description: "Self-defense and safety awareness workshop for women." },
  { id: 11, name: "Voter Awareness Campaign", date: "2026-09-15", startTime: "10:00", endTime: "13:00", location: "Kolkata", category: "Campaign", description: "Encouraging voter participation in upcoming elections." },
  { id: 12, name: "Youth Skill Development", date: "2026-09-18", startTime: "09:00", endTime: "15:00", location: "Ahmedabad", category: "Education", description: "Vocational training and skill development for unemployed youth." },
  { id: 13, name: "Senior Citizens Meet", date: "2026-09-20", startTime: "16:00", endTime: "18:00", location: "Bengaluru", category: "Community", description: "Community gathering for senior citizens with health check-ups." },
  { id: 14, name: "Water Conservation Talk", date: "2026-09-22", startTime: "11:00", endTime: "12:30", location: "Chennai", category: "Campaign", description: "Public talk on water conservation and sustainable practices." },
  { id: 15, name: "Art Therapy Session", date: "2026-09-25", startTime: "14:00", endTime: "16:30", location: "Mumbai", category: "Workshop", description: "Therapeutic art sessions for children from underserved communities." },
  { id: 16, name: "Annual General Meeting", date: "2026-09-28", startTime: "10:00", endTime: "13:00", location: "Delhi", category: "Other", description: "Annual review and planning meeting for stakeholders." },
  { id: 17, name: "Blood Donation Camp", date: "2026-10-01", startTime: "09:00", endTime: "17:00", location: "Hyderabad", category: "Community", description: "Community blood donation drive in collaboration with local hospitals." },
  { id: 18, name: "Education Scholarship Drive", date: "2026-10-05", startTime: "10:00", endTime: "14:00", location: "Ranchi", category: "Fundraising", description: "Fundraising event for educational scholarships." },
  { id: 19, name: "Eco-Friendly Living Workshop", date: "2026-10-08", startTime: "15:00", endTime: "17:00", location: "Pune", category: "Education", description: "Workshop on sustainable living and reducing carbon footprint." },
  { id: 20, name: "Cultural Heritage Festival", date: "2026-10-12", startTime: "16:00", endTime: "20:00", location: "Jaipur", category: "Community", description: "Celebrating local cultural heritage through art, music, and dance." },
];

export interface MediaItem {
  name: string;
  type: string;
  data: string;
}

export interface Report {
  id: number;
  eventId: number;
  eventName: string;
  summary: string;
  media: MediaItem[];
  socialLinks: string[];
  status: ReportStatus;
  createdAt: string;
}

export type ReportStatus = "Completed" | "Pending" | "Draft";

export const defaultReports: Report[] = [
  {
    id: 1,
    eventId: 1,
    eventName: "Community Health Workshop",
    summary: "Successfully conducted a health awareness workshop for 120 participants in Bengaluru. Covered topics on preventive care, nutrition, and hygiene. Received positive feedback from community leaders.",
    media: [],
    socialLinks: ["https://instagram.com/p/abc123", "https://twitter.com/voicesunited/status/123"],
    status: "Completed",
    createdAt: "2026-08-19",
  },
  {
    id: 2,
    eventId: 2,
    eventName: "Women Leadership Program",
    summary: "Launched the first session of the women leadership program in Ranchi with 45 participants. Sessions covered public speaking, community organizing, and negotiation skills.",
    media: [],
    socialLinks: ["https://instagram.com/p/def456"],
    status: "Completed",
    createdAt: "2026-08-22",
  },
  {
    id: 3,
    eventId: 3,
    eventName: "Climate Awareness Session",
    summary: "Organized an interactive climate change session in Delhi. Engaged 80+ youth in discussions about local environmental challenges and actionable solutions.",
    media: [],
    socialLinks: [],
    status: "Draft",
    createdAt: "2026-08-26",
  },
  {
    id: 4,
    eventId: 5,
    eventName: "Fundraising Gala",
    summary: "Annual fundraising gala organized in Delhi. Raised funds for education programs. 200+ attendees including corporate sponsors and community members.",
    media: [],
    socialLinks: ["https://facebook.com/events/ghi789", "https://instagram.com/p/jkl012"],
    status: "Pending",
    createdAt: "2026-09-02",
  },
  {
    id: 5,
    eventId: 6,
    eventName: "Community Clean-Up Drive",
    summary: "Led a neighborhood clean-up in Chennai with 60 volunteers. Collected over 200kg of waste. Partnered with local municipal body for proper disposal.",
    media: [],
    socialLinks: [],
    status: "Completed",
    createdAt: "2026-09-04",
  },
];


