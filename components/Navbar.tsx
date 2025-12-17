import React, { useState, useEffect, useRef } from 'react';
import LineIcon from './LineIcon';

interface NavbarProps {
  onNavigate: (sectionId?: string) => void;
  onWhyUs?: () => void;
  onIndustries?: () => void;
  onWebDev?: () => void;
  onAiAgents?: () => void;
  onMarketing?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, onWhyUs, onIndustries, onWebDev, onAiAgents, onMarketing }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (e: React.MouseEvent, type: 'scroll' | 'page', id?: string) => {
    e.preventDefault();
    if (type === 'page' && id === 'why-us' && onWhyUs) {
      onWhyUs();
    } else if (type === 'page' && id === 'industries' && onIndustries) {
      onIndustries();
    } else if (type === 'page' && id === 'web-dev' && onWebDev) {
      onWebDev();
    } else if (type === 'page' && id === 'ai-agents' && onAiAgents) {
      onAiAgents();
    } else if (type === 'page' && id === 'marketing' && onMarketing) {
      onMarketing();
    } else {
      onNavigate(id);
    }
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  };

  const serviceItems = [
    { id: 'web-dev', icon: 'code-1', label: 'Web Development', desc: 'Custom sites & apps' },
    { id: 'ai-agents', icon: 'comment-1', label: 'AI Agents', desc: '24/7 automation' },
    { id: 'marketing', icon: 'trend-up-1', label: 'Digital Marketing', desc: 'Growth & traffic' },
    { id: 'industries', icon: 'buildings-1', label: 'Industries', desc: 'Tailored solutions' },
  ];

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
          {/* Services Dropdown */}
          <div ref={servicesRef} className="relative">
            <button 
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center gap-1 text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            Services
              <LineIcon name={servicesOpen ? "chevron-up" : "chevron-down"} className="text-[10px]" />
            </button>
            
            {servicesOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                {serviceItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={(e) => handleNavClick(e, 'page', item.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                      <LineIcon name={item.icon} className="text-base text-brand-600 dark:text-brand-400" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200">{item.label}</p>
                      <p className="text-[10px] text-neutral-500 dark:text-neutral-400">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <a 
            href="#process"
            onClick={(e) => handleNavClick(e, 'scroll', 'process')}
            className="text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            Process
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
          {/* Services Accordion */}
          <button
            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
            className="flex items-center justify-between text-neutral-600 dark:text-neutral-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-neutral-100/50 dark:hover:bg-neutral-900/50 rounded-md px-3 py-2.5 transition-colors text-sm"
          >
            Services
            <LineIcon name={mobileServicesOpen ? "chevron-up" : "chevron-down"} className="text-xs" />
          </button>
          
          {mobileServicesOpen && (
            <div className="ml-3 space-y-1 mb-1">
              {serviceItems.map((item) => (
                <button
                  key={item.id}
                  onClick={(e) => handleNavClick(e, 'page', item.id)}
                  className="w-full flex items-center gap-2.5 text-neutral-500 dark:text-neutral-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 rounded-md px-3 py-2 transition-colors text-left"
                >
                  <div className="w-7 h-7 rounded-md bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                    <LineIcon name={item.icon} className="text-sm text-brand-600 dark:text-brand-400" />
                  </div>
                  <span className="text-xs">{item.label}</span>
                </button>
              ))}
            </div>
          )}
          
          <a 
            href="#process"
            className="text-neutral-600 dark:text-neutral-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-neutral-100/50 dark:hover:bg-neutral-900/50 rounded-md px-3 py-2.5 transition-colors text-sm"
            onClick={(e) => handleNavClick(e, 'scroll', 'process')}
          >
            Process
          </a>
          <a 
            href="#why-us"
            className="text-neutral-600 dark:text-neutral-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-neutral-100/50 dark:hover:bg-neutral-900/50 rounded-md px-3 py-2.5 transition-colors text-sm"
            onClick={(e) => handleNavClick(e, 'page', 'why-us')}
          >
            Why Us
          </a>
          <div className="pt-2 mt-1 space-y-2">
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
