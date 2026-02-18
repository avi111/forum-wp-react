export enum UserStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  ADMIN = "ADMIN",
}

export interface Researcher {
  id: string;
  email: string;
  institution: string;
  bio: string;
  status: UserStatus;
  imageUrl?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  gender?: string;
  title?: string;
  idNumber?: string;
  faculty?: string;
  subSpecializations?: string[];
  newsletter?: boolean;
  websites?: string[];
}

export interface ArticleAttachment {
  name: string;
  url: string;
  type: "pdf" | "doc" | "other";
  size?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  authorId: string;
  authorName: string;
  date: string;
  isEditorial: boolean; // True if it's a general site article (WP Post), False if researcher paper (Custom Post Type)
  tags: string[];
  imageUrl?: string;
  attachments?: ArticleAttachment[];
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  link: string;
  content?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  day: string;
  month: string;
  location: string;
  type: string;
  // New fields for detailed view
  description?: string;
  fullContent?: string;
  imageUrl?: string;
  startTime?: string;
  endTime?: string;
  registrationLink?: string;
  price?: string;
  speakers?: string[];
}

export interface Meeting {
  id: string;
  date: string;
  day: string;
  month: string;
  title: string;
  description: string;
  buttonText: string;
}

export interface TrainingModule {
  title: string;
  topics: string[];
}

export interface Training {
  id: string;
  category: string;
  title: string;
  description: string; // Short excerpt
  fullDescription?: string;
  date: string;
  location?: string;
  price?: string;
  syllabus?: TrainingModule[];
  instructors?: string[];
  registrationLink?: string;
  imageUrl?: string;
  colorTheme: "teal" | "indigo" | "purple";
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface AppSettings {
  institutions: string[];
  mainSpecializations: string[];
  subSpecializations: string[];
  titles: SelectOption[];
  genders: SelectOption[];
  studentYears: SelectOption[];
  researcherIndexItemsPerPage: number;
  editorialItemsPerPage: number;
  researcherItemsPerPage: number;
  eventsItemsPerPage: number;
  latestEditorialLimit: number;
  latestResearchLimit: number;
  titleMap: Record<string, string>;
  strings: Record<string, string>;
}

export enum PageView {
  HOME = "HOME",
  RESEARCHERS = "RESEARCHERS",
  TRAINING = "TRAINING",
  EVENTS = "EVENTS",
  ARTICLES = "ARTICLES",
  CONTACT = "CONTACT",
  JOIN = "JOIN",
  DASHBOARD = "DASHBOARD",
  LOGIN = "LOGIN",
  MEETINGS = "MEETINGS",
}

export interface NavItem {
  label: string;
  view: PageView;
}

export const getResearcherName = (r: Researcher): string => {
  const first = r.firstName || "";
  const last = r.lastName || "";
  return `${first} ${last}`.trim();
};

export type OnJoin = (
  data: Omit<Researcher, "id" | "bio" | "status">,
  callback: () => void,
) => void;

export type ContactProps = {
  fullName: string;
  email: string;
  message: string;
};

export type SiteOptions = {
  site_name: string; // Site title
  site_description: string; // Site tagline/description
  site_url: string; // WordPress Address (URL)
  rest_url: string;
  home_url: string; // Site Address (URL)
  admin_email: string; // Admin email address
  charset: string; // Site charset (e.g., UTF-8)
  timezone: string; // Timezone string
  date_format: string; // Date format
  time_format: string; // Time format
  start_of_week: string; // Starting day of the week (0 = Sunday, 1 = Monday, etc.)
  language: string; // Site language
  admin_ajax_url: string; // Admin AJAX URL
};

export type InjectedProps = {
  site: SiteOptions;
};
