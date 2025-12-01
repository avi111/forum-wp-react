

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

export interface ArticleAttachment {
  name: string;
  url: string;
  type: 'pdf' | 'doc' | 'other';
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
  colorTheme: 'teal' | 'indigo' | 'purple';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
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
  return r.firstName + ' ' + r.lastName;
};