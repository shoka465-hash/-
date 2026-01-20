
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' }, // Home 버튼 추가
    { name: 'About', path: '/about' },
    { name: 'Works', path: '/portfolio' },
    { name: 'Admin', path: '/admin' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-soft ${scrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-white/90 backdrop-blur-md py-4 shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-center items-center">
        {/* <Link to="/" className="text-2xl font-semibold tracking-tighter serif">
          KIM GIL SEOP
        </Link> */}

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-12">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm tracking-widest uppercase transition-colors hover:text-gray-400 ${location.pathname === link.path ? 'font-bold' : 'font-light'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 flex flex-col p-8 space-y-6 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="text-lg tracking-widest uppercase"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;