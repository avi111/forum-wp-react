export enum UserStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  ADMIN = "ADMIN",
}

export interface Researcher {
  id: string;
  email: string;
  institution: string;
  specialization: string;
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
  studentYear?: string;
  newsletter?: boolean;
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
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  link: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  day: string;
  month: string;
  location: string;
  type: string;
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
}

export interface NavItem {
  label: string;
  view: PageView;
}

export const getResearcherName = (r: Researcher): string => {
  return r.firstName + ' ' + r.lastName;
};
