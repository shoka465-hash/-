
import { Project, SiteSettings } from './types';

const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Minimalist E-Commerce Redesign',
    category: 'Web',
    thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800&h=800',
    period: '2023.08 - 2023.11',
    role: 'Lead UX/UI Designer',
    skills: ['React', 'Tailwind', 'Figma'],
    problem: '기존 사이트는 복잡한 네비게이션과 낙후된 모바일 UI로 인해 이탈률(65%)이 매우 높았습니다.',
    process: '사용자 인터뷰를 통해 핵심 고충을 파악하고, 반복적인 와이어프레임 제작 및 프로토타이핑을 진행했습니다. 특히 "3-클릭" 규칙에 집중했습니다.',
    solution: '콘텐츠 우선 레이아웃과 체크아웃으로 유도하는 미세한 인터랙션을 갖춘 깨끗한 디자인을 구현했습니다.',
    results: '사용자 만족도 점수가 40% 향상되었습니다.',
    metrics: [
      { label: 'Bounce Rate', value: '-25%' },
      { label: 'Conversion', value: '+15%' }
    ],
    images: [
      'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=1200&h=800',
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=1200&h=800'
    ],
    featured: true
  },
  {
    id: '2',
    title: 'Modern Brand Identity for Tech Startup',
    category: 'Branding',
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800&h=800',
    period: '2023.12 - 2024.02',
    role: 'Brand Identity Designer',
    skills: ['Illustrator', 'Motion Design', 'Concept Art'],
    problem: '포화된 AI 시장에서 해당 스타트업만의 차별화된 시각적 언어가 부족했습니다.',
    process: '연결성과 속도의 은유를 탐구하여 역동적인 유체 로고 시스템을 개발했습니다.',
    solution: '컬러 팔레트, 타이포그래피, 모션 가이드라인을 포함한 포괄적인 디자인 시스템을 구축했습니다.',
    results: '전문적인 브랜드 아이덴티티를 통해 클라이언트가 200만 달러의 시드 투자를 유치하는 데 기여했습니다.',
    metrics: [
      { label: 'Brand Recognition', value: 'High' },
      { label: 'Stakeholder Approval', value: '100%' }
    ],
    images: [
      'https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&q=80&w=1200&h=800'
    ],
    featured: true
  }
];

const DEFAULT_SETTINGS: SiteSettings = {
  homeBanner: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069'
};

export const getProjects = (): Project[] => {
  const stored = localStorage.getItem('portfolio_projects');
  if (stored) return JSON.parse(stored);
  localStorage.setItem('portfolio_projects', JSON.stringify(INITIAL_PROJECTS));
  return INITIAL_PROJECTS;
};

export const saveProjects = (projects: Project[]) => {
  localStorage.setItem('portfolio_projects', JSON.stringify(projects));
};

export const getSiteSettings = (): SiteSettings => {
  const stored = localStorage.getItem('site_settings');
  if (stored) return JSON.parse(stored);
  localStorage.setItem('site_settings', JSON.stringify(DEFAULT_SETTINGS));
  return DEFAULT_SETTINGS;
};

export const saveSiteSettings = (settings: SiteSettings) => {
  localStorage.setItem('site_settings', JSON.stringify(settings));
};
