import React from 'react';
import LineIcon from './LineIcon';
import FadeIn from './FadeIn';

interface HeroProps {
  onContact: () => void;
}

const Hero: React.FC<HeroProps> = ({ onContact }) => {
  const features = [
    { icon: "globe-1", label: "Custom Web Development", desc: "Tailored for conversion." },
    { icon: "comment-1", label: "Proprietary AI Agents", desc: "24/7 Lead Qualification." },
    { icon: "trend-up-1", label: "Growth Marketing", desc: "Targeted traffic flow." },
  ];

  const integrations = [
    { name: "Gmail", icon: "/assets/icons/gmail.svg" },
    { name: "Google Drive", icon: "/assets/icons/google-drive.svg" },
    { name: "Google Sheets", icon: "/assets/icons/sheets.svg" },
    { name: "Notion", icon: "/assets/icons/notion.svg" },
    { name: "Google Calendar", icon: "/assets/icons/google-calendar.svg" },
    { name: "Outlook", icon: "/assets/icons/outlook.svg" },
    { name: "OneDrive", icon: "/assets/icons/onedrive.svg" },
    { name: "Excel", icon: "/assets/icons/excel.svg" },
  ];

  // Double the integrations for seamless infinite loop
  const loopedIntegrations = [...integrations, ...integrations];

  return (
    <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 lg:pt-48 lg:pb-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          
          <FadeIn>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-neutral-800 dark:text-neutral-100 tracking-tight leading-[1.15] mb-5 md:mb-6">
              We Build The{' '}
              <span className="text-leaf-shiny">Digital Engine</span>
              <br className="hidden sm:block" />
              <span className="block sm:inline mt-1 sm:mt-0"> Your Business Needs.</span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={150}>
            <p className="text-sm md:text-base lg:text-lg text-neutral-500 dark:text-neutral-400 mb-8 md:mb-10 max-w-xl mx-auto leading-relaxed">
              Stop losing leads to outdated tech. We provide <span className="text-neutral-700 dark:text-neutral-300">Custom Websites</span>, intelligent <span className="text-neutral-700 dark:text-neutral-300">AI Agents</span>, and strategic <span className="text-neutral-700 dark:text-neutral-300">Marketing</span> in one seamless ecosystem.
            </p>
          </FadeIn>
          
          <FadeIn delay={300}>
            <div className="flex items-center justify-center">
              <a 
                href="#contact" 
                onClick={(e) => { e.preventDefault(); onContact(); }}
                className="px-6 md:px-7 py-2.5 md:py-3 btn-leaf rounded-lg font-medium text-sm md:text-base flex items-center gap-2 group"
              >
                Start Your Transformation
                <LineIcon name="arrow-right" className="text-base md:text-lg group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mt-14 md:mt-18 lg:mt-20 max-w-3xl mx-auto">
          {features.map((item, idx) => (
            <FadeIn key={idx} delay={450 + (idx * 100)} className="h-full">
              <div className="p-4 md:p-5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 shadow-sm hover:shadow-md dark:shadow-none transition-all group h-full hover:border-neutral-300 dark:hover:border-neutral-600">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-brand-100 dark:bg-brand-500/15 flex items-center justify-center mb-3">
                  <LineIcon name={item.icon} className="text-lg md:text-xl text-brand-600 dark:text-brand-400" />
                </div>
                <h3 className="text-neutral-900 dark:text-neutral-100 font-medium text-sm mb-0.5">{item.label}</h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-xs">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Integration Carousel */}
        <FadeIn delay={700}>
          <div className="mt-16 md:mt-20">
            <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center mb-6 uppercase tracking-wider">
              Integrates with your favorite tools
            </p>
            <div className="integration-carousel-wrapper">
              <div className="integration-carousel">
                {loopedIntegrations.map((app, idx) => (
                  <div 
                    key={`${app.name}-${idx}`}
                    className="integration-carousel-item"
                    title={app.name}
                  >
                    <img src={app.icon} alt={app.name} className="w-7 h-7 md:w-8 md:h-8" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Hero;
