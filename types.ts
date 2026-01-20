
export interface Project {
  id: string;
  title: string;
  category: 'Web' | 'Marketing' | 'Branding' | 'Video'; // Changed order
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
  homeVideoLink?: string; // 홈 페이지 배경 비디오 링크 (YouTube URL) - 다시 추가됨
  homeVideoFileBase64?: string; // 홈 페이지 배경 비디오 파일 (Base64) - 다시 추가됨
  profilePicture?: string; // 프로필 이미지 URL (base64)
  homeTagline?: string; // 홈 페이지 상단 태그라인 (e.g., "Experience Designer")
  homeMotto?: string; // 홈 페이지 하단 모토 (e.g., "노력과 열정 그리고 디자인은 하나다.")
  // webCategoryImage?: string; // 제거됨
  // brandingCategoryImage?: string; // 제거됨
  // videoCategoryImage?: string; // 제거됨
  // marketingCategoryImage?: string; // 제거됨
  homeCategoryTagline?: string; // 홈 페이지 카테고리 섹션 상단 태그라인
  homeCategoryTitle?: string; // 홈 페이지 카테고리 섹션 제목
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
