// Data Types for Mohamed Saad Portfolio Admin CMS

export interface ThemeColors {
  background: string;
  surface: string;
  card: string;
  border: string;
  primary: string;
  primaryHover: string;
  textPrimary: string;
  textSecondary: string;
  success: string;
  danger: string;
}

export interface ThemeTypography {
  displayFont: string;
  bodyFont: string;
  arabicFont: string;
  baseSize: number;
}

export interface ThemeButtonStyle {
  style: 'sharp' | 'rounded' | 'pill';
}

export interface ThemeSpacing {
  scale: 'compact' | 'normal' | 'spacious';
}

export interface Theme {
  colors: ThemeColors;
  typography: ThemeTypography;
  buttonStyle: ThemeButtonStyle;
  spacing: ThemeSpacing;
}

export interface BilingualText {
  en: string;
  ar: string;
}

export interface HeroData {
  fullName: BilingualText;
  tagline: BilingualText;
  subline: BilingualText;
  cta1: BilingualText;
  cta2: BilingualText;
  floatingTags: {
    en: string[];
    ar: string[];
  };
  visible: boolean;
}

export interface Stat {
  value: string;
  label: BilingualText;
}

export interface AboutData {
  headline: BilingualText;
  body: BilingualText;
  photoUrl: string;
  stats: Stat[];
  visible: boolean;
}

export interface Project {
  id: string;
  title: BilingualText;
  category: BilingualText;
  summary: BilingualText;
  problem: BilingualText;
  process: BilingualText;
  solution: BilingualText;
  outcome: BilingualText;
  coverImage: string;
  tags: string[];
  caseStudyLink: string;
  featured: boolean;
  hidden: boolean;
  order: number;
}

export interface Article {
  id: string;
  title: BilingualText;
  category: BilingualText;
  date: string;
  excerpt: BilingualText;
  content: BilingualText;
  externalUrl: string;
  isExternal: boolean;
  published: boolean;
  order: number;
}

export interface Book {
  id: string;
  title: BilingualText;
  category: BilingualText;
  year: number;
  coverImage: string;
  description: BilingualText;
  purchaseLink: string;
  visible: boolean;
  order: number;
}

export interface AITool {
  id: string;
  name: string;
  useCase: BilingualText;
  icon: string;
  visible: boolean;
  order: number;
}

export interface Service {
  id: string;
  icon: string;
  title: BilingualText;
  description: BilingualText;
  visible: boolean;
  order: number;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: BilingualText;
  linkedin: string;
  behance: string;
  cvUrl: string;
  available: boolean;
  availabilityLabel: BilingualText;
  formSubmissionEmail: string;
}

export interface AdminSettings {
  pin: string;
  defaultLanguage: 'en' | 'ar';
  maintenanceMode: boolean;
}

export interface ActivityLog {
  id: string;
  action: string;
  timestamp: string;
}

export interface PortfolioData {
  theme: Theme;
  hero: HeroData;
  about: AboutData;
  projects: Project[];
  articles: Article[];
  books: Book[];
  aiTools: AITool[];
  services: Service[];
  contact: ContactInfo;
  settings: AdminSettings;
  activityLog: ActivityLog[];
  lastUpdated: string;
}

export type PageType = 
  | 'dashboard'
  | 'theme'
  | 'hero'
  | 'projects'
  | 'articles'
  | 'books'
  | 'aiTools'
  | 'services'
  | 'contact'
  | 'settings';

export interface NavItem {
  id: PageType;
  label: string;
  icon: string;
}
