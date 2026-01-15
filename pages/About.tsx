
import React from 'react';
import { Star, Shield, Target, Coffee, Gamepad2 } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Storytelling Intro */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
          <div className="order-2 md:order-1">
            <p className="text-xs tracking-widest text-gray-400 uppercase mb-4">Hello, I am</p>
            <h1 className="text-5xl md:text-7xl font-light serif mb-8 leading-tight">Kim Gil Seop</h1>
            <div className="space-y-6 text-gray-600 font-light text-lg leading-relaxed">
              <p>
                어릴 적 호기심 많던 아이가 기계를 해체하며 디자인에 눈을 떴습니다. 
                그때의 호기심은 이제 웹 디자인이라는 도구를 통해 사용자에게 
                특별하고 의미 있는 경험을 선물하는 열정으로 이어졌습니다.
              </p>
              <p>
                저는 디자인이 단순히 아름답기만 한 것이 아니라, 
                사용자의 삶을 개선하고 비즈니스의 문제를 해결하는 전략적인 도구가 되어야 한다고 믿습니다.
              </p>
              <p className="font-medium text-black">
                "노력과 열정 그리고 디자인은 하나다"
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2 aspect-[4/5] bg-gray-100 rounded-sm overflow-hidden grayscale">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800&h=1000" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Values */}
        <section className="mb-32">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-12 text-center">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Shield size={32} />, title: 'Trust', desc: '고객과의 약속을 최우선으로 하며 깊은 신뢰 관계를 구축합니다.' },
              { icon: <Target size={32} />, title: 'Strategy', desc: '직관적인 UI/UX를 통해 비즈니스 목표를 명확하게 달성합니다.' },
              { icon: <Star size={32} />, title: 'Passion', desc: '작은 디테일 하나에도 노력과 열정을 담아 완성도를 높입니다.' }
            ].map((v, i) => (
              <div key={i} className="p-10 border border-gray-100 text-center hover:bg-gray-50 transition-soft">
                <div className="flex justify-center mb-6 text-gray-400">{v.icon}</div>
                <h3 className="text-xl font-light serif mb-4">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-light">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Experience */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32">
          <div>
            <h2 className="text-3xl font-light serif mb-8">Expertise</h2>
            <div className="space-y-8">
              {[
                { name: 'Web Design (UI/UX)', level: '95%' },
                { name: 'Marketing Strategy', level: '85%' },
                { name: 'Video Production', level: '80%' },
                { name: 'Branding', level: '90%' }
              ].map(skill => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-xs text-gray-400">{skill.level}</span>
                  </div>
                  <div className="w-full h-1 bg-gray-100">
                    <div className="h-full bg-black transition-soft" style={{ width: skill.level }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-light serif mb-8">Career Journey</h2>
            <div className="space-y-12">
              {[
                { year: '2023 - Present', role: 'Freelance Design Lead', company: 'Self-Employed' },
                { year: '2021 - 2023', role: 'Senior Web Designer', company: 'Digital Agency X' },
                { year: '2019 - 2021', role: 'UI Designer', company: 'Tech Startup Y' }
              ].map(job => (
                <div key={job.year} className="flex gap-8">
                  <span className="text-xs font-light text-gray-400 w-24 pt-1">{job.year}</span>
                  <div>
                    <h4 className="font-medium text-sm mb-1">{job.role}</h4>
                    <p className="text-sm text-gray-500">{job.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Personal Interests (Gacha) */}
        <section className="bg-gray-50 p-12 md:p-20 rounded-sm text-center">
          <div className="flex justify-center mb-6 text-gray-400"><Gamepad2 size={40} /></div>
          <h2 className="text-3xl font-light serif mb-6">Side Interests</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            디자인 외에도 저는 가챠샵 운영과 캐릭터 문화에 큰 관심을 가지고 있습니다. 
            다양한 수집품들이 주는 즐거움과 공간이 주는 특별한 에너지는 저에게 
            새로운 디자인 영감을 끊임없이 제공합니다. 😉
          </p>
        </section>

      </div>
    </div>
  );
};

export default About;
