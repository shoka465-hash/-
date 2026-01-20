
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getProjects } from '../data';
import { getYoutubeThumbnail } from '../utils';

const Portfolio: React.FC = () => {
  const projects = getProjects();
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = ['All', 'Web', 'Marketing', 'Branding', 'Video']; // Changed order

  // URL에서 'filter' 파라미터 값을 읽어오거나, 없으면 'All'을 기본값으로 사용
  const currentFilter = searchParams.get('filter') || 'All';

  const filteredProjects = currentFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === currentFilter);

  const handleFilterChange = (cat: string) => {
    if (cat === 'All') {
      setSearchParams({}); // 'All' 선택 시 필터 파라미터 제거
    } else {
      setSearchParams({ filter: cat }); // 특정 카테고리 선택 시 필터 파라미터 설정
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        {/* "Selected Works" 섹션이 제거됨 */}
          
        <div className="flex flex-wrap gap-x-8 gap-y-4 mb-20"> {/* 필터 버튼 위에 margin-bottom 추가 */}
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`text-sm uppercase tracking-widest transition-soft relative pb-1
                ${currentFilter === cat ? 'text-black font-bold' : 'text-gray-400 hover:text-black'}
              `}
            >
              {cat}
              {currentFilter === cat && <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black"></span>}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {filteredProjects.map((project) => {
            // Video 카테고리고 유튜브 링크가 있으면 유튜브 썸네일 우선 사용
            const ytThumb = project.category === 'Video' && project.link ? getYoutubeThumbnail(project.link) : null;
            const displayThumb = ytThumb || project.thumbnail;

            return (
              <Link 
                key={project.id} 
                to={`/portfolio/${project.id}`}
                className="group block"
              >
                <div className="relative aspect-video overflow-hidden bg-gray-50 mb-6">
                  <img 
                    src={displayThumb} 
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-soft group-hover:scale-105"
                  />
                  {project.category === 'Video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2">{project.category}</span>
                  <h3 className="text-xl font-light serif group-hover:text-gray-600 transition-colors">{project.title}</h3>
                  <p className="text-sm text-gray-400 mt-2 font-light">{project.period}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;