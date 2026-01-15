
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Play } from 'lucide-react';
import { getProjects } from '../data';
import { getYoutubeId, getYoutubeThumbnail } from '../utils';

const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const project = getProjects().find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl serif mb-4 font-bold">Project not found</h1>
        <Link to="/portfolio" className="text-gray-500 hover:text-black transition-colors uppercase tracking-widest text-xs font-bold underline">Back to Portfolio</Link>
      </div>
    );
  }

  const youtubeId = getYoutubeId(project.link);
  const youtubeThumbnail = project.link ? getYoutubeThumbnail(project.link) : null;
  // 상단 헤더는 항상 프로젝트의 원본 메인 썸네일을 사용하도록 설정
  const headerImage = project.thumbnail;

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section - Always show original thumbnail for visual consistency */}
      <section className="h-[70vh] relative overflow-hidden bg-black">
        <img 
          src={headerImage} 
          alt={project.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="absolute bottom-12 left-6 right-6 pointer-events-none">
          <div className="max-w-7xl mx-auto">
            <Link to="/portfolio" className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors uppercase tracking-widest text-xs font-bold pointer-events-auto">
              <ArrowLeft size={16} className="mr-2" /> Back to works
            </Link>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-4xl">
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/60 mb-4 font-bold">{project.category}</p>
                <h1 className="text-5xl md:text-7xl text-white font-light serif leading-tight">{project.title}</h1>
              </div>
              
              {/* 비디오 카테고리인 경우 상단 버튼을 삭제 (Watch Video 삭제 요청 반영) */}
              {project.link && project.category !== 'Video' && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-soft shadow-xl pointer-events-auto"
                >
                  Visit Link <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Basic Info Bar - Conditional Layout */}
      <section className="border-b border-gray-100 py-12 px-6 bg-white sticky top-0 z-10 shadow-sm/5">
        <div className="max-w-7xl mx-auto">
          {project.category === 'Video' ? (
            /* Video Category: Simple 2-column layout (Name & Period) */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-2 font-bold">Project Name</p>
                <p className="text-sm font-medium">{project.title}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-2 font-bold">Period</p>
                <p className="text-sm font-medium">{project.period}</p>
              </div>
            </div>
          ) : (
            /* Other Categories: Standard 4-column layout */
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-2 font-bold">Category</p>
                <p className="text-sm font-medium">{project.category}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-2 font-bold">Role</p>
                <p className="text-sm font-medium">{project.role}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-2 font-bold">Period</p>
                <p className="text-sm font-medium">{project.period}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-2 font-bold">Skills</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {project.skills.map(s => (
                    <span key={s} className="text-[8px] font-bold uppercase tracking-tighter bg-gray-50 border border-gray-100 px-2 py-1 rounded-sm">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Visual Gallery - Only show if images exist */}
      {project.images && project.images.length > 0 && (
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto space-y-20">
            <div className="space-y-16">
              {project.images.map((img, idx) => (
                <div key={idx} className="group overflow-hidden rounded-sm bg-gray-50 shadow-sm">
                  <img 
                    src={img} 
                    alt={`${project.title} gallery ${idx}`} 
                    className="w-full grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out cursor-default block"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Video Preview Image Section - Link to YouTube */}
      {project.category === 'Video' && project.link && (
        <section className={`px-6 ${project.images && project.images.length > 0 ? 'pb-32' : 'py-32'}`}>
          <div className="max-w-6xl mx-auto">
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block relative aspect-video bg-black rounded-sm overflow-hidden shadow-2xl group cursor-pointer"
            >
              <img 
                src={youtubeThumbnail || project.thumbnail} 
                alt="Watch Video on YouTube" 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-soft group-hover:scale-105 duration-700"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 group-hover:bg-transparent transition-soft">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-soft">
                  <Play size={32} className="text-white fill-white ml-1" />
                </div>
                <p className="mt-6 text-white text-[10px] uppercase tracking-[0.4em] font-bold opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-500">
                  Watch on YouTube
                </p>
              </div>
            </a>
          </div>
        </section>
      )}

      {/* No content message for non-video projects with no images */}
      {project.category !== 'Video' && (!project.images || project.images.length === 0) && (
        <section className="py-32 px-6 text-center border-b border-gray-50">
          <p className="text-gray-400 serif italic">No additional images uploaded for this project.</p>
        </section>
      )}

      {/* Footer Navigation (END OF PROJECT VISUAL) */}
      <section className="py-32 border-t border-gray-100 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400 mb-10 font-bold">End of project visual</p>
          <h2 className="text-4xl md:text-5xl font-light serif mb-16 italic">Experience that matters.</h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-10">
            <Link to="/portfolio" className="text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-2 hover:text-gray-400 hover:border-gray-200 transition-soft">
              Explore More Works
            </Link>
            <Link to="/contact" className="bg-black text-white px-12 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-soft shadow-lg shadow-black/10">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
