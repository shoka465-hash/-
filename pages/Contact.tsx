
import React, { useState } from 'react';
import { Mail, Phone, Globe, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const faqs = [
    { q: "프로젝트 진행 기간은 얼마나 걸리나요?", a: "일반적으로 웹사이트 기준 4-8주 정도 소요되지만, 프로젝트의 규모와 요구 사항에 따라 달라질 수 있습니다." },
    { q: "비용 산정 기준이 궁금합니다.", a: "작업 범위, 기능 구현 난이도, 마감 기한 등을 종합적으로 고려하여 맞춤 견적을 제안해 드립니다." },
    { q: "수정 횟수 제한이 있나요?", a: "기본적으로 2~3회 무상 수정을 포함하고 있으며, 이후 추가 수정은 비용이 발생할 수 있습니다." }
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-20">
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-4">Contact</p>
          <h1 className="text-5xl md:text-7xl font-light serif">Let's Create<br />Something Exceptional</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Inquiry Form */}
          <div className="bg-gray-50 p-10 md:p-16 rounded-sm">
            <h2 className="text-2xl font-light serif mb-10 italic">Inquiry Form</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2 font-medium">Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors" placeholder="Your Name" required />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2 font-medium">Email</label>
                  <input type="email" className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors" placeholder="your@email.com" required />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2 font-medium">Subject</label>
                <select className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors appearance-none">
                  <option>Web Design</option>
                  <option>Branding</option>
                  <option>Marketing Collaboration</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2 font-medium">Message</label>
                <textarea className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors min-h-[150px]" placeholder="Project details, timeline, budget etc..." required></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-black text-white py-5 rounded-sm uppercase tracking-widest text-xs font-bold hover:bg-gray-800 transition-soft flex items-center justify-center gap-3"
              >
                {submitted ? 'Message Sent Successfully!' : <>Send Message <Send size={14} /></>}
              </button>
            </form>
          </div>

          {/* Contact Info & FAQ */}
          <div className="space-y-20">
            <div className="space-y-12">
              <h2 className="text-2xl font-light serif italic">Contact Info</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 rounded-sm text-gray-400"><Mail size={20} /></div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Email</p>
                    <p className="text-sm font-medium">shoka465@naver.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 rounded-sm text-gray-400"><Phone size={20} /></div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Phone</p>
                    <p className="text-sm font-medium">+82 10 1234 5678</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 rounded-sm text-gray-400"><Globe size={20} /></div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Website</p>
                    <p className="text-sm font-medium">www.kimgilseop.design</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 rounded-sm text-gray-400"><MapPin size={20} /></div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Location</p>
                    <p className="text-sm font-medium">Seoul, South Korea</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <h2 className="text-2xl font-light serif italic">FAQ</h2>
              <div className="space-y-8">
                {faqs.map((faq, i) => (
                  <div key={i} className="group">
                    <h4 className="font-medium text-sm mb-2 text-gray-800 flex items-center gap-2">
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      {faq.q}
                    </h4>
                    <p className="text-sm text-gray-500 font-light leading-relaxed pl-3 border-l border-gray-100 ml-0.5">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
