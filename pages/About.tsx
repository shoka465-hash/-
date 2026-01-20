
import React, { useState, useEffect } from 'react';
import { Paintbrush, PenTool, Film, Layers, Video, Code, Figma } from 'lucide-react'; // 필요한 아이콘 임포트
import { getSiteSettings } from '../data'; // getSiteSettings 임포트
import { SiteSettings } from '../types'; // SiteSettings 타입 임포트

const About: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    setSettings(getSiteSettings());
  }, []);

  return (
    <div className="pt-20 pb-16 px-6 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* PROFILE Section (Top Intro) */}
        <section className="mb-16 text-center"> {/* Added text-center for centering profile image/info */}
          {settings?.profilePicture && (
            <div className="w-40 h-40 md:w-56 md:h-56 bg-gray-100 rounded-full mx-auto overflow-hidden border-2 border-white shadow-md mb-8 group"> {/* Added group here */}
              <img 
                src={settings.profilePicture || 'https://via.placeholder.com/160/E0E7FF/4F46E5?text=PROFILE'} 
                alt="Profile Picture" 
                className="w-full h-full object-cover group-hover:scale-105 group-hover:rotate-1 transition-transform duration-300 ease-in-out" 
              />
            </div>
          )}
          <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500 mb-6">PROFILE</p>
          <h1 className="text-5xl md:text-6xl font-semibold serif leading-tight text-gray-900 mb-2">
            Kim Gil Seop
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-600 mb-2">
            1986.08.02 ㅣ Tiger
          </p>
          <p className="text-lg md::text-xl font-light text-gray-600">
            010 . 8860 . 6581
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-16">
          {/* Left Column */}
          <div>
            {/* Education Section */}
            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 mb-8">
              <h2 className="text-3xl font-light serif text-gray-900 mb-10">Education</h2>
              <div className="space-y-6"> {/* Changed to space-y-6 for consistency */}
                <div className="flex items-start gap-4"> {/* Wrapped content in flex container */}
                  <p className="w-20 flex-shrink-0 text-sm text-gray-500">2013</p> {/* Year separate, matching Certificate style */}
                  <p className="text-lg font-medium text-black">대림대학교 방송영상학과 전공</p> {/* Description, matching Certificate style */}
                </div>
              </div>
            </section>

            {/* Certificate Section */}
            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 mb-8">
              <h2 className="text-3xl font-light serif text-gray-900 mb-10">Certificate</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <p className="w-20 flex-shrink-0 text-sm text-gray-500">2023</p>
                  <p className="text-lg font-medium text-black">초경량비행장치(드론) 조종자 4종 취득</p>
                </div>
                <div className="flex items-start gap-4">
                  <p className="w-20 flex-shrink-0 text-sm text-gray-500">2022</p>
                  <p className="text-lg font-normal text-black">EUCA Barista Skill Expert 취득</p> {/* Changed font-medium to font-normal */}
                </div>
                <div className="flex items-start gap-4">
                  <p className="w-20 flex-shrink-0 text-sm text-gray-500">2011</p>
                  <p className="text-lg font-normal text-black">EUCA Barista Skill Basic 취득</p> {/* Changed font-medium to font-normal */}
                </div>
                <div className="flex items-start gap-4">
                  <p className="w-20 flex-shrink-0 text-sm text-gray-500">2009</p>
                  <p className="text-lg font-medium text-black">자동차운전면허 1종 취득</p>
                </div>
              </div>
            </section>

            {/* Skill Section - Moved here */}
            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 mb-8"> {/* Added mb-16 for consistent spacing */}
              <h2 className="text-3xl font-light serif text-gray-900 mb-10">Skill</h2>
              <div className="space-y-6"> {/* This div maintains vertical spacing for all skill groups/items */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6"> {/* New grid for paired skills */}
                  {/* Photoshop */}
                  <div className="flex items-center gap-2">
                    <Paintbrush size={20} className="text-gray-600" />
                    <div className="flex items-center gap-2">
                      <p className="text-base font-medium text-black">Photoshop</p>
                      <p className="text-base font-bold text-yellow-500">★★★★☆</p>
                    </div>
                  </div>
                  {/* Illustrator */}
                  <div className="flex items-center gap-2">
                    <PenTool size={20} className="text-gray-600" />
                    <div className="flex items-center gap-2">
                      <p className="text-base font-medium text-black">Illustrator</p>
                      <p className="text-base font-bold text-yellow-500">★★★☆☆</p>
                    </div>
                  </div>

                  {/* Premiere */}
                  <div className="flex items-center gap-2">
                    <Film size={20} className="text-gray-600" />
                    <div className="flex items-center gap-2">
                      <p className="text-base font-medium text-black">Premiere</p>
                      <p className="text-base font-bold text-yellow-500">★★★★☆</p>
                    </div>
                  </div>
                  {/* After effects */}
                  <div className="flex items-center gap-2">
                    <Layers size={20} className="text-gray-600" />
                    <div className="flex items-center gap-2">
                      <p className="text-base font-medium text-black">After effects</p>
                      <p className="text-base font-bold text-yellow-500">★★★☆☆</p>
                    </div>
                  </div>

                  {/* Davinci Resolve */}
                  <div className="flex items-center gap-2">
                    <Video size={20} className="text-gray-600" />
                    <div className="flex items-center gap-2">
                      <p className="text-base font-medium text-black">Davinci Resolve</p>
                      <p className="text-base font-bold text-yellow-500">★★★★☆</p>
                    </div>
                  </div>
                  {/* Dreamweaver */}
                  <div className="flex items-center gap-2">
                    <Code size={20} className="text-gray-600" />
                    <div className="flex items-center gap-2">
                      <p className="text-base font-medium text-black">Dreamweaver</p>
                      <p className="text-base font-bold text-yellow-500">★★☆☆☆</p>
                    </div>
                  </div>
                </div>
                
                {/* Figma on its own row, separated by space-y-6 from the grid above */}
                <div className="flex items-center gap-2">
                  <Figma size={20} className="text-gray-600" />
                  <div className="flex items-center gap-2">
                    <p className="text-base font-medium text-black">Figma</p>
                    <p className="text-base font-bold text-yellow-500">★★★☆☆</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div>
            {/* Experience Section */}
            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 mb-8">
              <h2 className="text-3xl font-light serif text-gray-900 mb-10">Experience</h2>
              <div className="space-y-10 pl-2"> {/* Add pl-2 for initial offset */}
                {/* Individual Experience Item */}
                <div className="relative pl-8 pb-10 border-l border-gray-200 last:border-l-0 last:pb-0">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-300 rounded-full border-2 border-white"></div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2">2022 -</p>
                  <p className="text-lg font-normal text-gray-900 leading-snug">(주)레푸스 온라인팀 과장(디자인 총괄)</p> {/* Changed font-bold to font-normal */}
                </div>
                
                <div className="relative pl-8 pb-10 border-l border-gray-200 last:border-l-0 last:pb-0">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-300 rounded-full border-2 border-white"></div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2">2018 - 2021</p>
                  <p className="text-lg font-normal text-gray-900 leading-snug">(주)광천김 온라인팀 웹디자인, 영상 담당</p> {/* Changed font-bold to font-normal */}
                </div>

                <div className="relative pl-8 pb-10 border-l border-gray-200 last:border-l-0 last:pb-0">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-300 rounded-full border-2 border-white"></div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2">2016 - 2017</p>
                  <p className="text-lg font-normal text-gray-900 leading-snug">아로마랩 웹디자인 & 촬영 담당</p> {/* Changed font-bold to font-normal */}
                </div>

                <div className="relative pl-8 pb-10 border-l border-gray-200 last:border-l-0 last:pb-0">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-300 rounded-full border-2 border-white"></div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2">2016 - 2016</p>
                  <p className="text-lg font-normal text-gray-900 leading-snug">더에이작 웹디자인 담당</p> {/* Changed font-bold to font-normal */}
                </div>

                <div className="relative pl-8 pb-10 border-l border-gray-200 last:border-l-0 last:pb-0">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-300 rounded-full border-2 border-white"></div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2">2014 - 2015</p>
                  <p className="text-lg font-normal text-gray-900 leading-snug">(주)뷰메디컬 웹디자인 담당</p> {/* Changed font-bold to font-normal */}
                </div>

                <div className="relative pl-8 pb-10 border-l border-gray-200 last:border-l-0 last:pb-0">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-300 rounded-full border-2 border-white"></div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2">2013 - 2014</p>
                  <p className="text-lg font-normal text-gray-900 leading-snug">센서리트레인 웹디자인 담당</p> {/* Changed font-bold to font-normal */}
                </div>

                <div className="relative pl-8 pb-10 border-l border-gray-200 last:border-l-0 last:pb-0">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-300 rounded-full border-2 border-white"></div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2">2013 - 2014</p>
                  <p className="text-lg font-normal text-gray-900 leading-snug">에이뮤컴퍼니 웹디자인 & 촬영 담당</p> {/* Changed font-bold to font-normal */}
                </div>

                <div className="relative pl-8 pb-10 border-l border-gray-200 last:border-l-0 last:pb-0">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-300 rounded-full border-2 border-white"></div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2">2012 - 2012</p>
                  <p className="text-lg font-normal text-gray-900 leading-snug">대유비엠 제품디자인 담당(인턴)</p> {/* Changed font-bold to font-normal */}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
