import React, { useState, useEffect } from 'react';
import LineIcon from './LineIcon';

interface NavbarProps {
  onNavigate: (sectionId?: string) => void;
  onWhyUs?: () => void;
  onIndustries?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, onWhyUs, onIndustries }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, type: 'scroll' | 'page', id?: string) => {
    e.preventDefault();
    if (type === 'page' && id === 'why-us' && onWhyUs) {
      onWhyUs();
    } else if (type === 'page' && id === 'industries' && onIndustries) {
      onIndustries();
    } else {
      onNavigate(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 py-4 md:py-5 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex justify-between items-center">
        <a href="#" onClick={(e) => handleNavClick(e, 'scroll')} className="flex items-center group">
          <img 
            src="https://firebasestorage.googleapis.com/v0/b/grove-solutions.firebasestorage.app/o/grovelogo-removebg%20(1).png?alt=media&token=3a875928-dcbb-42fb-b686-fbe6d8be917a" 
            alt="Grove Solutions" 
            className="h-8 md:h-9 w-auto"
            style={{ filter: 'brightness(0) saturate(100%) invert(50%) sepia(69%) saturate(450%) hue-rotate(99deg) brightness(88%) contrast(90%)' }}
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <a 
            href="#services"
            onClick={(e) => handleNavClick(e, 'scroll', 'services')}
            className="text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            Services
          </a>
          <a 
            href="#process"
            onClick={(e) => handleNavClick(e, 'scroll', 'process')}
            className="text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            Process
          </a>
          <a 
            href="#industries"
            onClick={(e) => handleNavClick(e, 'page', 'industries')}
            className="text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            Industries
          </a>
          <a 
            href="#why-us"
            onClick={(e) => handleNavClick(e, 'page', 'why-us')}
            className="text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            Why Us
          </a>
          
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, 'scroll', 'contact')}
            className="btn-leaf px-4 py-1.5 rounded-lg text-xs font-medium"
          >
            Get a Proposal
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-neutral-600 dark:text-neutral-300 p-2 -mr-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <LineIcon name="xmark" className="text-xl" />
          ) : (
            <LineIcon name="menu-hamburger-1" className="text-xl" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl p-4 md:hidden flex flex-col gap-1">
          <a 
            href="#services"
            className="text-neutral-600 dark:text-neutral-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-neutral-100/50 dark:hover:bg-neutral-900/50 rounded-md px-3 py-2.5 transition-colors text-sm"
            onClick={(e) => handleNavClick(e, 'scroll', 'services')}
          >
            Services
          </a>
          <a 
            href="#process"
            className="text-neutral-600 dark:text-neutral-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-neutral-100/50 dark:hover:bg-neutral-900/50 rounded-md px-3 py-2.5 transition-colors text-sm"
            onClick={(e) => handleNavClick(e, 'scroll', 'process')}
          >
            Process
          </a>
          <a 
            href="#industries"
            className="text-neutral-600 dark:text-neutral-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-neutral-100/50 dark:hover:bg-neutral-900/50 rounded-md px-3 py-2.5 transition-colors text-sm"
            onClick={(e) => handleNavClick(e, 'page', 'industries')}
          >
            Industries
          </a>
          <a 
            href="#why-us"
            className="text-neutral-600 dark:text-neutral-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-neutral-100/50 dark:hover:bg-neutral-900/50 rounded-md px-3 py-2.5 transition-colors text-sm"
            onClick={(e) => handleNavClick(e, 'page', 'why-us')}
          >
            Why Us
          </a>
          <div className="pt-2 mt-1">
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, 'scroll', 'contact')}
              className="btn-leaf text-center py-2.5 rounded-lg font-medium block text-sm"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
