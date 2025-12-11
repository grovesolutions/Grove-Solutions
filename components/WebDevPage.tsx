import React from 'react';
import LineIcon from './LineIcon';
import FadeIn from './FadeIn';

interface WebDevPageProps {
  onBack: () => void;
  onContact: () => void;
  onAiAgents?: () => void;
  onMarketing?: () => void;
  onIndustries?: () => void;
}

const WebDevPage: React.FC<WebDevPageProps> = ({ onBack, onContact, onAiAgents, onMarketing, onIndustries }) => {
  const serviceLinks = [
    { id: 'ai-agents', label: 'AI Agents', icon: 'comment-1', onClick: onAiAgents },
    { id: 'marketing', label: 'Marketing', icon: 'trend-up-1', onClick: onMarketing },
    { id: 'industries', label: 'Industries', icon: 'buildings-1', onClick: onIndustries },
  ];
  const techStack = [
    { label: "React.js for interactive, app-like interfaces", icon: "code-1" },
    { label: "Tailwind CSS for bespoke, responsive styling", icon: "layout-9" },
    { label: "Next.js for superior SEO and server-side rendering", icon: "search-1" },
    { label: "Mobile-first methodology for all devices", icon: "phone" }
  ];

  return (
    <div className="pt-24 md:pt-28 pb-14 md:pb-18 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Navigation Bar */}
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <button 
          onClick={onBack}
          className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors group text-xs"
        >
          <LineIcon name="arrow-left" className="text-base group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>
        
        {/* Quick Service Links */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mr-1">Also explore:</span>
          {serviceLinks.map((link) => (
            <button
              key={link.id}
              onClick={link.onClick}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-brand-300 dark:hover:border-brand-500/50 text-neutral-600 dark:text-neutral-400 hover:text-brand-600 dark:hover:text-brand-400 transition-all text-xs"
            >
              <LineIcon name={link.icon} className="text-base" />
              <span className="hidden sm:inline">{link.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="mb-14 md:mb-18">
        <div className="max-w-3xl">
          <FadeIn>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-100 dark:bg-brand-500/15 mb-4 text-brand-600 dark:text-brand-400">
              <LineIcon name="code-1" className="text-base" />
              <span className="text-[10px] font-medium uppercase tracking-wider">Engineering over Templates</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-neutral-800 dark:text-neutral-100 mb-3 md:mb-4 leading-tight">
              Websites that act like{' '}
              <span className="text-leaf-shiny">Best-Selling Employees.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed mb-5 md:mb-6">
              Most agencies sell you a WordPress template. We engineer high-performance, custom React applications designed to capture leads, process data, and scale with your business.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <button 
              onClick={onContact}
              className="btn-leaf px-5 md:px-6 py-2 md:py-2.5 rounded-lg font-medium text-sm inline-flex items-center gap-2"
            >
              Start Your Build
              <LineIcon name="arrow-right" className="text-base" />
            </button>
          </FadeIn>
        </div>
      </section>

      {/* The Difference Grid */}
      <section className="py-10 md:py-14 mb-12 md:mb-16">
        <div>
          <div className="text-center mb-8 md:mb-12">
            <FadeIn>
              <h2 className="text-lg sm:text-xl md:text-2xl font-display font-semibold text-neutral-800 dark:text-neutral-100 mb-2">Why Custom Infrastructure?</h2>
              <p className="text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto text-xs md:text-sm">
                In a digital-first world, your website is your HQ. Generic builders can't compete with hand-coded performance.
              </p>
            </FadeIn>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 md:gap-4">
            <FadeIn delay={100} className="h-full">
              <div className="p-4 md:p-5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 shadow-sm hover:shadow-md dark:shadow-none transition-all group h-full hover:border-neutral-300 dark:hover:border-neutral-600">
                <div className="w-9 h-9 bg-brand-100 dark:bg-brand-500/15 rounded-lg flex items-center justify-center mb-3">
                  <LineIcon name="bolt-2" className="text-lg text-brand-600 dark:text-brand-400" />
                </div>
                <h3 className="text-sm font-display font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5">Sub-Second Load Times</h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed">
                  Google penalizes slow sites. Our React builds load instantly, keeping users engaged and boosting your SEO.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={200} className="h-full">
              <div className="p-4 md:p-5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 shadow-sm hover:shadow-md dark:shadow-none transition-all group h-full hover:border-neutral-300 dark:hover:border-neutral-600">
                <div className="w-9 h-9 bg-brand-100 dark:bg-brand-500/15 rounded-lg flex items-center justify-center mb-3">
                  <LineIcon name="layout-9" className="text-lg text-brand-600 dark:text-brand-400" />
                </div>
                <h3 className="text-sm font-display font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5">Pixel-Perfect Branding</h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed">
                  No rigid templates. We code exactly what you envision, ensuring your brand stands out.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={300} className="h-full">
              <div className="p-4 md:p-5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 shadow-sm hover:shadow-md dark:shadow-none transition-all group h-full hover:border-neutral-300 dark:hover:border-neutral-600">
                <div className="w-9 h-9 bg-brand-100 dark:bg-brand-500/15 rounded-lg flex items-center justify-center mb-3">
                  <LineIcon name="database-2" className="text-lg text-brand-600 dark:text-brand-400" />
                </div>
                <h3 className="text-sm font-display font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5">Scalable Architecture</h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed">
                  Need a client portal? Custom calculator? AI integration? Custom code handles it.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mb-12 md:mb-16">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <FadeIn>
              <h2 className="text-lg sm:text-xl md:text-2xl font-display font-semibold text-neutral-800 dark:text-neutral-100 mb-3">
                Our <span className="text-leaf-shiny">Technology Stack</span>
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 mb-5 text-sm">
                Enterprise-grade technology used by Facebook, Netflix, and Airbnb. Future-proofed for the next decade.
              </p>
            </FadeIn>
            
            <div className="space-y-2">
              {techStack.map((item, i) => (
                <FadeIn key={i} delay={i * 80}>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 shadow-sm hover:shadow-md dark:shadow-none transition-all hover:border-neutral-300 dark:hover:border-neutral-600">
                    <LineIcon name={item.icon} className="text-base text-brand-600 dark:text-brand-400" />
                    <span className="text-neutral-700 dark:text-neutral-300 text-xs">{item.label}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <div className="relative">
             <FadeIn delay={300}>
                <div className="bg-white dark:bg-neutral-800 rounded-xl p-5 md:p-6 border border-neutral-200/80 dark:border-neutral-700 shadow-sm relative">
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent"></div>
                  
                  <h3 className="text-neutral-900 dark:text-neutral-100 font-semibold text-sm mb-4 pb-3 border-b border-neutral-200 dark:border-neutral-700">Comparison</h3>
                  
                  <div className="grid grid-cols-3 gap-2 mb-3 text-[10px] font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    <div>Feature</div>
                    <div className="text-center">Generic</div>
                    <div className="text-center text-brand-600 dark:text-brand-400">Grove</div>
                  </div>

                  <div className="space-y-2">
                    {[
                      { feat: "Load Speed", bad: "2-5s", good: "<0.5s" },
                      { feat: "SEO", bad: "Limited", good: "Full Control" },
                      { feat: "Custom", bad: "Plugins", good: "Unlimited" },
                      { feat: "Fees", bad: "High", good: "Low" },
                      { feat: "Ownership", bad: "Platform", good: "100% Yours" },
                    ].map((row, i) => (
                      <div key={i} className="grid grid-cols-3 gap-2 text-xs py-2 items-center">
                        <div className="text-neutral-700 dark:text-neutral-300">{row.feat}</div>
                        <div className="text-center text-neutral-500 dark:text-neutral-400">{row.bad}</div>
                        <div className="text-center text-neutral-900 dark:text-neutral-100 font-medium flex justify-center items-center gap-1 bg-brand-100 dark:bg-brand-500/15 rounded px-2 py-1">
                          {row.good}
                          <LineIcon name="check-circle-1" className="text-xs text-brand-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
             </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <FadeIn>
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 md:p-8 text-center border border-neutral-200/80 dark:border-neutral-700 shadow-sm relative">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent"></div>
            
            <h2 className="text-lg sm:text-xl md:text-2xl font-display font-semibold text-neutral-900 dark:text-neutral-100 mb-3">Stop Renting. Start Building.</h2>
            <p className="text-neutral-500 dark:text-neutral-400 mb-5 max-w-lg mx-auto text-xs md:text-sm">
              Your business deserves a digital asset that you actually own. Let's build a website that pays for itself.
            </p>
            <button 
              onClick={onContact}
              className="btn-leaf px-6 md:px-8 py-2.5 rounded-lg font-medium text-sm transition-all"
            >
              Schedule a Free Strategy Call
            </button>
          </div>
        </FadeIn>
      </section>
    </div>
  );
};

export default WebDevPage;
