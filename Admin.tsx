
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Save, X, LogOut, HelpCircle, Upload, Image as ImageIcon, Link as LinkIcon, Filter, Video as VideoIcon, PlayCircle, Maximize, Info, UserRound, Monitor, PenTool, Tv, Megaphone, Pause } from 'lucide-react';
import { Project, SiteSettings } from '../types';
import { getProjects, saveProjects, getSiteSettings, saveSiteSettings } from '../data';
import { getYoutubeId, getYoutubeThumbnail } from '../utils';

// Helper to get image dimensions
const getImageDimensions = (base64: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.src = base64;
  });
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  // Fix: Remove webCategoryImage, brandingCategoryImage, videoCategoryImage, marketingCategoryImage from initial state
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({ 
    homeBanner: '', 
    homeVideoLink: '',
    profilePicture: '', 
    homeTagline: '', 
    homeMotto: '',
    homeCategoryTagline: '',
    homeCategoryTitle: '',
  }); 
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Project>>({});
  const [showManual, setShowManual] = useState(false);
  const [adminFilter, setAdminFilter] = useState<'All' | 'Web' | 'Branding' | 'Video' | 'Marketing'>('All');
  
  // State to store dimensions of images in the current edit form
  const [dimensions, setDimensions] = useState<{ [key: string]: { width: number, height: number } }>({});

  const categories: ('All' | 'Web' | 'Branding' | 'Video' | 'Marketing')[] = ['All', 'Web', 'Branding', 'Video', 'Marketing'];

  useEffect(() => {
    if (isLoggedIn) {
      setProjects(getProjects());
      setSiteSettings(getSiteSettings()); // SiteSettings 로드
    }
  }, [isLoggedIn]);

  // Update dimensions when editing starts or images change
  useEffect(() => {
    const updateAllDimensions = async () => {
      const newDims: { [key: string]: { width: number, height: number } } = {};
      
      if (editForm.thumbnail) {
        newDims['thumb'] = await getImageDimensions(editForm.thumbnail);
      }
      
      if (editForm.images) {
        for (let i = 0; i < editForm.images.length; i++) {
          newDims[`img_${i}`] = await getImageDimensions(editForm.images[i]);
        }
      }

      if (siteSettings.profilePicture) {
        newDims['profile'] = await getImageDimensions(siteSettings.profilePicture);
      }
      // Fix: Remove references to deprecated category image properties
      // if (siteSettings.webCategoryImage) {
      //   newDims['webCategory'] = await getImageDimensions(siteSettings.webCategoryImage);
      // }
      // if (siteSettings.brandingCategoryImage) {
      //   newDims['brandingCategory'] = await getImageDimensions(siteSettings.brandingCategoryImage);
      // }
      // if (siteSettings.videoCategoryImage) {
      //   newDims['videoCategory'] = await getImageDimensions(siteSettings.videoCategoryImage);
      // }
      // if (siteSettings.marketingCategoryImage) {
      //   newDims['marketingCategory'] = await getImageDimensions(siteSettings.marketingCategoryImage);
      // }
      
      setDimensions(newDims);
    };

    if (editingId || isLoggedIn) { // isLoggedIn 조건 추가하여 SiteSettings 로드 시에도 dimensions 업데이트
      updateAllDimensions();
    }
  }, [
    editingId, 
    editForm.thumbnail, 
    editForm.images?.length, 
    siteSettings.profilePicture, 
    // Fix: Remove deprecated category image properties from dependency array
    // siteSettings.webCategoryImage,
    // siteSettings.brandingCategoryImage,
    // siteSettings.videoCategoryImage,
    // siteSettings.marketingCategoryImage,
    isLoggedIn
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1111') {
      setIsLoggedIn(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword('');
  };

  const startEdit = (p: Project) => {
    setEditingId(p.id);
    setEditForm(p);
  };

  const saveEdit = () => {
    const updated = projects.map(p => p.id === editingId ? { ...p, ...editForm } as Project : p);
    setProjects(updated);
    saveProjects(updated);
    setEditingId(null);
  };

  const deleteProject = (id: string) => {
    if (window.confirm('정말로 이 프로젝트를 삭제하시겠습니까?')) {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      saveProjects(updated);
    }
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setEditForm({ ...editForm, thumbnail: base64 });
    }
  };

  const handleMultipleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = [...(editForm.images || [])];
      for (let i = 0; i < files.length; i++) {
        const base64 = await fileToBase64(files[i]);
        newImages.push(base64);
      }
      setEditForm({ ...editForm, images: newImages });
    }
  };

  const removeProjectImage = (index: number) => {
    const newImages = [...(editForm.images || [])];
    newImages.splice(index, 1);
    setEditForm({ ...editForm, images: newImages });
  };

  const addNew = () => {
    const initialCategory = adminFilter === 'All' ? 'Web' : adminFilter;
    const newProject: Project = {
      id: Date.now().toString(),
      title: `${initialCategory} 신규 프로젝트`,
      category: initialCategory as any,
      thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=400&h=400', // Default placeholder thumbnail
      period: '2024.01 - 2024.02',
      role: '역할을 입력하세요',
      skills: ['Skill'],
      problem: '',
      process: '',
      solution: '',
      results: '',
      images: [],
      featured: false,
      link: ''
    };
    const updated = [...projects, newProject];
    setProjects(updated);
    saveProjects(updated);
    startEdit(newProject);
  };

  const handleProfilePictureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setSiteSettings({ ...siteSettings, profilePicture: base64 });
    }
  };

  // Fix: Remove handleCategoryPictureUpload function as category images are no longer used
  // const handleCategoryPictureUpload = (categoryKey: keyof SiteSettings) => async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const base64 = await fileToBase64(file);
  //     setSiteSettings({ ...siteSettings, [categoryKey]: base64 });
  //   }
  // };

  const saveSiteConfig = () => {
    saveSiteSettings(siteSettings);
    alert('사이트 설정이 저장되었습니다!');
  };

  const filteredProjects = adminFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === adminFilter);

  const youtubeId = editForm.link ? getYoutubeId(editForm.link) : null;
  const homeVideoYoutubeId = siteSettings.homeVideoLink ? getYoutubeId(siteSettings.homeVideoLink) : null;
  const homeVideoYoutubeThumbnail = homeVideoYoutubeId ? getYoutubeThumbnail(siteSettings.homeVideoLink!) : null;

  // Placeholder thumbnail used for new projects or when thumbnail is cleared
  const defaultThumbnailPlaceholder = 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=400&h=400';

  // Fix: Remove Reusable component for category image upload fields as they are no longer part of SiteSettings
  // const CategoryImageUploader = ({ label, imageKey, icon, recommendedSize }: { label: string, imageKey: keyof SiteSettings, icon: React.ReactNode, recommendedSize: string }) => (
  //   <div>
  //     <div className="flex justify-between items-center mb-3">
  //       <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
  //         {label} <span title={`홈페이지 ${label} 섹션에 표시되는 대표 이미지입니다.`}><Info size={10} className="text-gray-300" /></span>
  //       </label>
  //     </div>
  //   </div>
  // );

  if (!isLoggedIn) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="max-w-md w-full bg-white p-12 rounded-sm shadow-sm text-center">
          <h1 className="text-3xl serif mb-8 font-bold">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              className="w-full border-b border-gray-300 py-3 text-center focus:outline-none focus:border-black font-bold tracking-widest" 
              placeholder="Enter Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="w-full bg-black text-white py-4 rounded-sm uppercase tracking-widest text-xs font-bold hover:bg-gray-800 transition-soft">
              Login
            </button>
          </form>
          <p className="mt-8 text-xs text-gray-400">Restricted Area (PW: 1111)</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-4xl serif mb-2 font-bold">Portfolio Console</h1>
            <p className="text-sm text-gray-500 font-light">각 카테고리별 프로젝트를 효율적으로 관리하세요.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setShowManual(!showManual)}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 border border-gray-300 px-6 py-3 rounded-sm hover:bg-white transition-soft"
            >
              <HelpCircle size={14} /> Manual
            </button>
            <button 
              onClick={addNew}
              className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-sm uppercase tracking-widest text-xs font-bold hover:bg-gray-800 transition-soft"
            >
              <Plus size={16} /> Add {adminFilter === 'All' ? 'Project' : adminFilter}
            </button>
            <button onClick={handleLogout} className="p-3 text-gray-400 hover:text-black transition-colors">
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {showManual && (
          <div className="bg-white p-8 rounded-sm mb-12 shadow-sm border-l-4 border-black animate-in fade-in slide-in-from-top-4">
            <h2 className="text-xl serif mb-6 italic font-bold">관리자 매뉴얼 (User Manual)</h2>
            <div className="grid md:grid-cols-2 gap-8 text-sm text-gray-600 font-light leading-relaxed">
              <div className="space-y-4">
                <h4 className="font-bold text-black flex items-center gap-2 uppercase tracking-widest text-[10px]"><ImageIcon size={14}/> 이미지 권장 해상도 가이드</h4>
                <ul className="space-y-2 pl-4 border-l border-gray-100">
                  <li>• <strong>메인 썸네일:</strong> 가로 800px 이상 (최적 비율 16:9)</li>
                  <li>• <strong>상세 갤러리:</strong> 가로 1920px 이상 (고화질 디스플레이 대응)</li>
                  <li>• <strong>프로필 사진:</strong> 가로 400px 이상 (정사각형 권장)</li>
                  <li>• <strong>파일 형식:</strong> JPG, PNG, WebP 지원</li>
                  <li>• <strong>주의사항:</strong> 너무 큰 파일(5MB 이상)은 로딩 속도를 저하시킵니다.</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-black flex items-center gap-2 uppercase tracking-widest text-[10px]"><VideoIcon size={14}/> 비디오 및 링크 가이드</h4>
                <ul className="space-y-2 pl-4 border-l border-gray-100">
                  <li>• <strong>유튜브:</strong> Shorts, Live, 일반 영상 모두 ID 자동 추출을 지원합니다.</li>
                  <li>• <strong>업데이트:</strong> 모든 정보 입력 후 하단 'Save Project' 버튼을 눌러야 저장됩니다.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Site Settings Section */}
        <div className="mb-16 bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden p-8 animate-in fade-in slide-in-from-top-2">
          <h2 className="text-xl serif mb-8 italic font-bold flex items-center gap-3"><Info size={20} className="text-gray-400" /> Site Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Profile Picture Setting */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                  Profile Picture <span title="About 페이지에 표시되는 프로필 사진입니다."><Info size={10} className="text-gray-300" /></span>
                </label>
                {dimensions['profile'] && (
                  <span className={`text-[9px] font-mono font-bold flex items-center gap-1 ${dimensions['profile'].width < 800 ? 'text-orange-500' : 'text-gray-400'}`}>
                    <Maximize size={10} /> {dimensions['profile'].width} x {dimensions['profile'].height}px
                  </span>
                )}
              </div>
              <div className="relative group w-96 h-96 bg-gray-50 rounded-full mx-auto overflow-hidden border border-gray-100 mb-4 shadow-sm">
                <img 
                  src={siteSettings.profilePicture || 'https://via.placeholder.com/160/E0E7FF/4F46E5?text=PROFILE'} 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                />
                <input 
                  type="file" accept="image/*" onChange={handleProfilePictureUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity text-white pointer-events-none">
                  <Upload size={20} className="mb-2" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Change Image</span>
                </div>
              </div>
              <div className="mt-3 p-3 bg-blue-50/50 rounded-sm border border-blue-100/50 text-center">
                <p className="text-[9px] text-blue-600 font-bold uppercase tracking-widest leading-relaxed">
                  💡 권장 사양: <span className="font-normal opacity-90">가로 800px 이상의 정사각형 이미지</span><br/>
                  <span className="font-normal opacity-70">파일 형식: JPG, PNG | 용량: 최대 1MB</span><br/>
                  <span className="font-normal opacity-70">이 이미지는 About 페이지 프로필 섹션에 사용됩니다.</span>
                </p>
              </div>
            </div>

            {/* Home Tagline Setting */}
            <div>
              <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-3">
                Home Tagline <span title="홈페이지 상단 'Experience Designer' 문구입니다."><Info size={10} className="text-gray-300" /></span>
              </label>
              <input 
                type="text" 
                className="w-full border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-black font-medium" 
                value={siteSettings.homeTagline || ''} 
                onChange={e => setSiteSettings({...siteSettings, homeTagline: e.target.value})}
                placeholder="Experience Designer"
              />
              <p className="mt-3 text-[9px] text-gray-500 font-light">
                * 홈 페이지 상단에 나타나는 직업/경험 문구를 수정합니다.
              </p>
            </div>

            {/* Home Motto Setting */}
            <div>
              <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-3">
                Home Motto <span title="홈페이지 하단 '노력과 열정 그리고 디자인은 하나다.' 문구입니다."><Info size={10} className="text-gray-300" /></span>
              </label>
              <input 
                type="text" 
                className="w-full border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-black font-medium" 
                value={siteSettings.homeMotto || ''} 
                onChange={e => setSiteSettings({...siteSettings, homeMotto: e.target.value})}
                placeholder="&quot;노력과 열정 그리고 디자인은 하나다.&quot;"
              />
              <p className="mt-3 text-[9px] text-gray-500 font-light">
                * 홈 페이지 중앙에 나타나는 개인 모토/문구를 수정합니다.
              </p>
            </div>
          </div>

          <div className="pt-12 mt-12 border-t border-gray-50">
            <h3 className="text-lg serif mb-8 italic font-bold flex items-center gap-3">Homepage Category Section Text</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Home Category Tagline Setting */}
              <div>
                <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-3">
                  Category Section Tagline <span title="홈페이지 카테고리 섹션 상단 'Explore Our Expertise' 문구입니다."><Info size={10} className="text-gray-300" /></span>
                </label>
                <input 
                  type="text" 
                  className="w-full border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-black font-medium" 
                  value={siteSettings.homeCategoryTagline || ''} 
                  onChange={e => setSiteSettings({...siteSettings, homeCategoryTagline: e.target.value})}
                  placeholder="Explore Our Expertise"
                />
                <p className="mt-3 text-[9px] text-gray-500 font-light">
                  * 홈 페이지 카테고리 섹션 상단의 작은 문구를 수정합니다.
                </p>
              </div>

              {/* Home Category Title Setting */}
              <div>
                <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-3">
                  Category Section Title <span title="홈페이지 카테고리 섹션 제목 'Creating Value Through Diverse Design' 문구입니다."><Info size={10} className="text-gray-300" /></span>
                </label>
                <input 
                  type="text" 
                  className="w-full border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-black font-medium" 
                  value={siteSettings.homeCategoryTitle || ''} 
                  onChange={e => setSiteSettings({...siteSettings, homeCategoryTitle: e.target.value})}
                  placeholder="Design a memory of one's thoughts"
                />
                <p className="mt-3 text-[9px] text-gray-500 font-light">
                  * 홈 페이지 카테고리 섹션의 주요 제목 문구를 수정합니다.
                </p>
              </div>
            </div>
          </div>

          {/* Fix: Removed Homepage Category Showcase Images section as category images are no longer part of SiteSettings */}
          {/*
          <div className="pt-12 mt-12 border-t border-gray-50">
            <h3 className="text-lg serif mb-8 italic font-bold flex items-center gap-3">Category Showcase Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <CategoryImageUploader 
                label="Web Category Image" 
                imageKey="webCategoryImage" 
                icon={<Monitor size={20} />}
                recommendedSize="600px"
              />
              <CategoryImageUploader 
                label="Branding Category Image" 
                imageKey="brandingCategoryImage" 
                icon={<PenTool size={20} />}
                recommendedSize="600px"
              />
              <CategoryImageUploader 
                label="Video Category Image" 
                imageKey="videoCategoryImage" 
                icon={<Tv size={20} />}
                recommendedSize="600px"
              />
              <CategoryImageUploader 
                label="Marketing Category Image" 
                imageKey="marketingCategoryImage" 
                icon={<Megaphone size={20} />}
                recommendedSize="600px"
              />
            </div>
          </div>
          */}

          {/* Home Page Video Section */}
          <div className="pt-12 mt-12 border-t border-gray-50">
            <h3 className="text-lg serif mb-8 italic font-bold flex items-center gap-3"><VideoIcon size={20} className="text-gray-400" /> Home Page Video</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-3">
                  YouTube Video URL <span title="홈페이지 배경에 표시될 YouTube 비디오 링크입니다."><Info size={10} className="text-gray-300" /></span>
                </label>
                <div className="flex items-center gap-3 bg-gray-50 p-3 border border-gray-100 rounded-sm mb-4">
                  <LinkIcon size={14} className="text-gray-400" />
                  <input 
                    type="text" 
                    className="flex-grow bg-transparent text-sm focus:outline-none font-medium" 
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={siteSettings.homeVideoLink || ''} 
                    onChange={e => setSiteSettings({...siteSettings, homeVideoLink: e.target.value})}
                  />
                  {siteSettings.homeVideoLink && (
                    <button 
                      onClick={() => setSiteSettings({...siteSettings, homeVideoLink: ''})}
                      className="p-1 text-gray-400 hover:text-red-500 rounded-full transition-colors"
                      title="Clear Video Link"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
                {homeVideoYoutubeId ? (
                  <div className="space-y-3">
                    <label className="block text-[9px] uppercase tracking-widest text-gray-400 font-bold">Live Preview</label>
                    <div className="aspect-video w-full max-w-md bg-black rounded-sm overflow-hidden shadow-lg relative">
                      <img src={homeVideoYoutubeThumbnail || ''} className="w-full h-full object-cover opacity-50" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlayCircle size={48} className="text-white" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video w-full max-w-md bg-gray-100 border-2 border-dashed border-gray-200 rounded-sm flex flex-col items-center justify-center text-gray-400 gap-2">
                    <VideoIcon size={32} strokeWidth={1} />
                    <p className="text-[10px] uppercase tracking-widest font-bold">Enter a YouTube link to see preview</p>
                  </div>
                )}
              </div>
              <div className="p-3 bg-blue-50/50 rounded-sm border border-blue-100/50 self-start mt-8 md:mt-0">
                <p className="text-[9px] text-blue-600 font-bold uppercase tracking-widest leading-relaxed">
                  💡 비디오 배경 가이드:<br/>
                  <span className="font-normal opacity-90">유튜브 링크 입력 시 홈 페이지 배경에 자동 재생(음소거)됩니다.</span><br/>
                  <span className="font-normal opacity-90">모바일 환경에서는 데이터 사용량 및 성능 문제로 비디오 대신 '메인 배너' 이미지가 표시됩니다.</span><br/>
                  <span className="font-normal opacity-90">최적의 시각적 경험을 위해 고품질의 비디오를 사용하고, 비디오가 없는 경우 '메인 배너' 이미지가 중요합니다.</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-10 border-t border-gray-50 mt-12">
            <button onClick={saveSiteConfig} className="flex items-center gap-2 bg-black text-white px-12 py-5 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-soft shadow-lg shadow-black/10">
              <Save size={16} /> Update Site Settings
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setAdminFilter(cat)}
              className={`px-8 py-4 text-xs font-bold uppercase tracking-widest transition-soft border-b-2 ${
                adminFilter === cat 
                ? 'border-black text-black' 
                : 'border-transparent text-gray-400 hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredProjects.map(project => (
            <div key={project.id} className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
              {editingId === project.id ? (
                <div className="p-8 space-y-10 animate-in fade-in slide-in-from-top-2">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="space-y-8">
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                            Main Thumbnail <span title="목록 페이지에서 보여지는 대표 이미지입니다."><Info size={10} className="text-gray-300" /></span>
                          </label>
                          {dimensions['thumb'] && (
                            <span className={`text-[9px] font-mono font-bold flex items-center gap-1 ${dimensions['thumb'].width < 800 ? 'text-orange-500' : 'text-gray-400'}`}>
                              <Maximize size={10} /> {dimensions['thumb'].width} x {dimensions['thumb'].height}px
                            </span>
                          )}
                        </div>
                        <div className="relative group aspect-square bg-gray-50 rounded-sm overflow-hidden border border-gray-100">
                          <img src={editForm.thumbnail} className="w-full h-full object-cover" />
                          <input 
                            type="file" accept="image/*" onChange={handleThumbnailUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity text-white pointer-events-none">
                            <Upload size={20} className="mb-2" />
                            <span className="text-[10px] uppercase tracking-widest font-bold">Change Image</span>
                          </div>
                          {/* Main Thumbnail Delete Button */}
                          {editForm.thumbnail && editForm.thumbnail !== defaultThumbnailPlaceholder && (
                            <button 
                              onClick={(e) => {
                                e.preventDefault(); // Prevent accidental form submission
                                setEditForm({...editForm, thumbnail: ''}); // Clear the thumbnail
                              }}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
                              title="Clear Thumbnail"
                            >
                              <X size={14} />
                            </button>
                          )}
                        </div>
                        <div className="mt-3 p-3 bg-blue-50/50 rounded-sm border border-blue-100/50">
                          <p className="text-[9px] text-blue-600 font-bold uppercase tracking-widest leading-relaxed">
                            💡 권장 사양: 가로 800px 이상<br/>
                            <span className="font-normal opacity-70">모바일 및 태블릿 대응을 위한 최소 기준입니다.</span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold">Project Title</label>
                          <input 
                            type="text" className="w-full border-b border-gray-200 py-2 text-xl serif font-bold focus:outline-none focus:border-black" 
                            value={editForm.title} 
                            onChange={e => setEditForm({...editForm, title: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold">Category</label>
                          <select 
                            className="w-full border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-black font-medium"
                            value={editForm.category}
                            onChange={e => setEditForm({...editForm, category: e.target.value as any})}
                          >
                            <option>Web</option>
                            <option>Branding</option>
                            <option>Video</option>
                            <option>Marketing</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-2 space-y-8">
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold">Project Period</label>
                          <input 
                            type="text" className="w-full border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-black" 
                            value={editForm.period} 
                            onChange={e => setEditForm({...editForm, period: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold">Role / Contribution</label>
                          <input 
                            type="text" className="w-full border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-black" 
                            value={editForm.role} 
                            onChange={e => setEditForm({...editForm, role: e.target.value})}
                          />
                        </div>
                      </div>

                      {editForm.category === 'Video' ? (
                        <div className="bg-gray-50 p-8 rounded-sm border border-gray-100 space-y-6">
                          <div className="flex items-center gap-3 mb-2">
                            <VideoIcon size={18} className="text-black" />
                            <h4 className="text-xs font-bold uppercase tracking-widest">YouTube Video Configuration</h4>
                          </div>
                          <div>
                            <label className="block text-[9px] uppercase tracking-widest text-gray-400 mb-2 font-bold">YouTube URL</label>
                            <div className="flex items-center gap-3 bg-white p-3 border border-gray-200 rounded-sm">
                              <LinkIcon size={14} className="text-gray-400" />
                              <input 
                                type="text" className="flex-grow bg-transparent text-sm focus:outline-none" 
                                placeholder="https://www.youtube.com/watch?v=..."
                                value={editForm.link || ''} 
                                onChange={e => setEditForm({...editForm, link: e.target.value})}
                              />
                            </div>
                          </div>
                          
                          {youtubeId ? (
                            <div className="space-y-3">
                              <label className="block text-[9px] uppercase tracking-widest text-gray-400 font-bold">Live Preview</label>
                              <div className="aspect-video w-full max-w-md bg-black rounded-sm overflow-hidden shadow-lg relative">
                                <img src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`} className="w-full h-full object-cover opacity-50" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <PlayCircle size={48} className="text-white" />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="aspect-video w-full max-w-md bg-gray-100 border-2 border-dashed border-gray-200 rounded-sm flex flex-col items-center justify-center text-gray-400 gap-2">
                              <PlayCircle size={32} strokeWidth={1} />
                              <p className="text-[10px] uppercase tracking-widest font-bold">Enter a link to see preview</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                              Project Gallery <span title="상세 페이지에서 세로로 길게 나열되는 이미지들입니다."><Info size={10} className="text-gray-300" /></span>
                            </label>
                            <span className="text-[9px] text-gray-400 font-bold uppercase">Recommended: 1920px+ width</span>
                          </div>
                          <div className="relative group border-2 border-dashed border-gray-100 p-8 rounded-sm mb-6 bg-gray-50/30 hover:bg-gray-50 transition-colors">
                            <input 
                              type="file" multiple accept="image/*" onChange={handleMultipleImagesUpload}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="text-center">
                              <Upload className="mx-auto mb-2 text-gray-300" size={24} />
                              <p className="text-xs text-gray-500 font-medium">여러 장의 고해상도 이미지 선택</p>
                              <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">Full HD (1920px) 이상 권장</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                            {editForm.images?.map((img, idx) => (
                              <div key={idx} className="space-y-2">
                                <div className="relative aspect-square rounded-sm overflow-hidden group/img border border-gray-100">
                                  <img src={img} className="w-full h-full object-cover" />
                                  <button 
                                    onClick={() => removeProjectImage(idx)}
                                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity"
                                  >
                                    <X size={10} />
                                  </button>
                                </div>
                                {dimensions[`img_${idx}`] && (
                                  <p className={`text-[8px] font-mono text-center font-bold ${dimensions[`img_${idx}`].width < 1200 ? 'text-orange-500' : 'text-gray-400'}`}>
                                    {dimensions[`img_${idx}`].width} x {dimensions[`img_${idx}`].height}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-6 pt-10 border-t border-gray-50">
                    <button onClick={() => setEditingId(null)} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                      <X size={14} /> Cancel
                    </button>
                    <button onClick={saveEdit} className="flex items-center gap-2 bg-black text-white px-12 py-5 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-soft shadow-lg shadow-black/10">
                      <Save size={16} /> Save Project
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6 flex items-center justify-between group">
                  <div className="flex items-center gap-8">
                    <div className="w-24 h-24 bg-gray-50 rounded-sm overflow-hidden border border-gray-100 shadow-sm">
                      <img src={project.thumbnail} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-soft duration-700" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="px-2 py-0.5 bg-gray-100 text-[8px] font-bold uppercase tracking-widest text-gray-500 rounded-full">{project.category}</span>
                        {project.link && (
                          <span title={project.category === 'Video' ? "YouTube Video" : "External Link"}>
                            {project.category === 'Video' ? <VideoIcon size={12} className="text-black" /> : <LinkIcon size={12} className="text-gray-300" />}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl serif font-bold group-hover:text-black transition-colors">{project.title}</h3>
                      <p className="text-xs text-gray-400 mt-2 font-light flex items-center gap-4">
                        <span>{project.period}</span>
                        <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                        <span>{project.category === 'Video' ? 'Video Project' : `${project.images.length} Images`}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => startEdit(project)} 
                      className="p-4 text-gray-400 hover:text-black hover:bg-gray-50 rounded-full transition-all"
                      title="Edit Project"
                    >
                      <Edit size={20} />
                    </button>
                    <button 
                      onClick={() => deleteProject(project.id)} 
                      className="p-4 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                      title="Delete Project"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {filteredProjects.length === 0 && (
            <div className="bg-white py-32 text-center border-2 border-dashed border-gray-100 rounded-sm">
              <div className="flex justify-center mb-6 text-gray-200">
                <Filter size={48} strokeWidth={1} />
              </div>
              <p className="text-gray-400 serif text-xl mb-6 font-light italic">No projects found in this category.</p>
              <button onClick={addNew} className="text-xs font-bold uppercase tracking-widest text-black underline hover:text-gray-500 transition-colors">
                Create a new {adminFilter === 'All' ? 'item' : adminFilter} project
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
