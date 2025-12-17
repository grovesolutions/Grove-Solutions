import React from 'react';
import LineIcon from './LineIcon';

interface FooterProps {
  onNavWeb: () => void;
  onNavAi: () => void;
  onNavMarketing: () => void;
  onNavConsulting: () => void;
  onNavIndustries: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavWeb, onNavAi, onNavMarketing, onNavConsulting, onNavIndustries }) => {
  return (
    <footer className="pt-12 pb-8 ">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Shimmer divider at top */}
        
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-10">
          <div className="sm:col-span-2">
            <a href="#" className="flex items-center mb-4">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/grove-solutions.firebasestorage.app/o/grovelogo-removebg%20(1).png?alt=media&token=3a875928-dcbb-42fb-b686-fbe6d8be917a" 
                alt="Grove Solutions" 
                className="h-8 md:h-9 w-auto"
                style={{ filter: 'brightness(0) saturate(100%) invert(50%) sepia(69%) saturate(450%) hue-rotate(99deg) brightness(88%) contrast(90%)' }}
              />
            </a>
            <p className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed max-w-xs">
              Empowering businesses with next-generation digital infrastructure. Websites, AI, and Marketing tailored for growth.
            </p>
          </div>
          
          <div>
            <h4 className="text-neutral-800 dark:text-neutral-100 font-medium text-xs mb-4 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5 text-xs text-neutral-500 dark:text-neutral-400">
              <li>
                <button onClick={onNavWeb} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors text-left">
                  Custom Development
                </button>
              </li>
              <li>
                <button onClick={onNavAi} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors text-left">
                  AI Automation
                </button>
              </li>
              <li>
                <button onClick={onNavMarketing} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors text-left">
                  Digital Marketing
                </button>
              </li>
              <li>
                <button onClick={onNavConsulting} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors text-left">
                  Consulting
                </button>
              </li>
              <li>
                <button onClick={onNavIndustries} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors text-left">
                  Industries
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-neutral-800 dark:text-neutral-100 font-medium text-xs mb-4 uppercase tracking-wider">Connect</h4>
            <ul className="space-y-2.5 text-xs text-neutral-500 dark:text-neutral-400">
              <li>
                <a 
                  href="https://www.instagram.com/grove.solutions?igsh=NDVyb2U4bXV3NXRq&utm_source=qr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <LineIcon name="instagram" className="text-sm" />
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 border-t border-neutral-200/30 dark:border-neutral-800/30">
          <p className="text-neutral-500 dark:text-neutral-400 text-[10px] text-center sm:text-left">© {new Date().getFullYear()} Grove Solutions. All rights reserved.</p>
          <p className="text-neutral-500 dark:text-neutral-500 text-[10px]">Designed for the future.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
