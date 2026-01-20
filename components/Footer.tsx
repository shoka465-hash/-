
import React from 'react';
import { Github, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          {/* <h2 className="text-2xl font-semibold serif mb-4">Kim Gil Seop</h2> */}
          {/* <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
            Specializing in creating exceptional digital experiences where design meets strategy.
          </p> */}
          <div className="flex space-x-6 text-gray-400">
            {/* <a href="#" className="hover:text-black transition-colors"><Linkedin size={20} /></a> */}
            <a href="#" className="hover:text-black transition-colors"><Instagram size={20} /></a>
            {/* <a href="#" className="hover:text-black transition-colors"><Github size={20} /></a> */}
          </div>
        </div>
        
        {/* Contact Info (삭제됨) */}
        {/* <div className="flex flex-col md:items-end justify-center">
          <p className="text-sm font-medium uppercase tracking-widest text-gray-400 mb-2">Let's work together</p>
          <a href="mailto:shoka465@naver.com" className="text-3xl md:text-4xl font-light hover:underline serif">
            shoka465@naver.com
          </a>
        </div> */}
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-50 text-xs text-gray-400 flex justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Kim Gil Seop. All rights reserved.</p>
        <p>Design is one with passion.</p>
      </div>
    </footer>
  );
};

export default Footer;