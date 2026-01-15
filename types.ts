
export interface Project {
  id: string;
  title: string;
  category: 'Web' | 'Marketing' | 'Video' | 'Branding';
  thumbnail: string;
  period: string;
  role: string;
  skills: string[];
  problem: string;
  process: string;
  solution: string;
  results: string;
  metrics?: { label: string; value: string }[];
  images: string[];
  featured: boolean;
  link?: string; // 외부 링크 (웹사이트 URL 또는 유튜브 링크)
}

export interface SiteSettings {
  homeBanner: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
}

export interface AdminSettings {
  passwordHash: string;
}
