
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Monitor, Megaphone, Video } from 'lucide-react';
import { getSiteSettings } from '../data';
import { SiteSettings } from '../types';

const Home: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    setSettings(getSiteSettings());
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Banner Image */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Banner Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={settings?.homeBanner || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069'} 
            alt="Main Banner" 
            className="w-full h-full object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/80"></div>
        </div>

        <div className="z-10 text-center px-6">
          <p className="text-sm tracking-[0.4em] uppercase mb-8 text-gray-500 animate-in fade-in duration-1000">
            Experience Designer
          </p>
          
          <h1 className="text-6xl md:text-9xl font-light serif mb-12 leading-tight tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            KIM GIL SEOP
          </h1>

          <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto font-light tracking-wide animate-in fade-in duration-1000 delay-500">
            "노력과 열정 그리고 디자인은 하나다."
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 animate-in fade-in duration-1000 delay-700">
            <Link to="/portfolio" className="group flex items-center bg-black text-white px-10 py-4 rounded-full hover:bg-gray-800 transition-soft shadow-lg shadow-black/5">
              View Works <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Link>
            <Link to="/contact" className="text-sm font-medium uppercase tracking-[0.2em] hover:text-gray-400 transition-colors py-4">
              Get in touch
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30 z-10">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* Expertise Summary */}
      <section className="py-32 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400 mb-4">Core Expertise</p>
            <h2 className="text-4xl md:text-5xl font-light serif">Creating Value Through Design</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-12 bg-gray-50 rounded-sm hover:shadow-xl hover:-translate-y-2 transition-soft group">
              <div className="flex justify-center mb-10 text-gray-300 group-hover:text-black transition-colors">
                <Monitor size={48} strokeWidth={1} />
              </div>
              <h4 className="font-semibold mb-6 text-sm uppercase tracking-widest text-center">Web Design</h4>
              <p className="text-gray-500 text-sm leading-relaxed text-center font-light">트렌디하고 감각적인 레이아웃으로 최적의 사용자 경험을 설계합니다.</p>
            </div>
            
            <div className="p-12 bg-gray-50 rounded-sm hover:shadow-xl hover:-translate-y-2 transition-soft group">
              <div className="flex justify-center mb-10 text-gray-300 group-hover:text-black transition-colors">
                <Megaphone size={48} strokeWidth={1} />
              </div>
              <h4 className="font-semibold mb-6 text-sm uppercase tracking-widest text-center">Marketing</h4>
              <p className="text-gray-500 text-sm leading-relaxed text-center font-light">데이터를 기반으로 고객의 시선을 사로잡는 콘텐츠를 제작합니다.</p>
            </div>
            
            <div className="p-12 bg-gray-50 rounded-sm hover:shadow-xl hover:-translate-y-2 transition-soft group">
              <div className="flex justify-center mb-10 text-gray-300 group-hover:text-black transition-colors">
                <Video size={48} strokeWidth={1} />
              </div>
              <h4 className="font-semibold mb-6 text-sm uppercase tracking-widest text-center">Video Production</h4>
              <p className="text-gray-500 text-sm leading-relaxed text-center font-light">생동감 넘치는 영상으로 브랜드의 스토리를 강렬하게 전달합니다.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
