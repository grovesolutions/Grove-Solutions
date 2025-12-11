import React from 'react';
import LineIcon from './LineIcon';
import FadeIn from './FadeIn';

interface MarketingPageProps {
  onBack: () => void;
  onContact: () => void;
}

const MarketingPage: React.FC<MarketingPageProps> = ({ onBack, onContact }) => {
  return (
    <div className="pt-24 md:pt-28 pb-14 md:pb-18 animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-screen">
      <div>
        <div className="mb-5 md:mb-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors group text-xs"
          >
            <LineIcon name="arrow-left" className="text-sm group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
        </div>

        <div className="max-w-3xl mb-10 md:mb-14">
          <FadeIn>
             <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-100 dark:bg-brand-500/15 mb-4 text-brand-600 dark:text-brand-400">
                <LineIcon name="target-user" className="text-sm" />
                <span className="text-[10px] font-medium uppercase tracking-wider">Precision Targeting</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-neutral-800 dark:text-neutral-100 mb-3 md:mb-4 leading-tight">
              Fuel For The{' '}
              <span className="text-leaf-shiny">Machine.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed mb-5 md:mb-6">
              A great infrastructure is useless without traffic. We design strategic, high-ROI campaigns that put your business in front of the people already looking for what you sell.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <button 
              onClick={onContact}
              className="btn-leaf px-5 md:px-6 py-2 md:py-2.5 rounded-lg font-medium text-sm inline-flex items-center gap-2"
            >
              Start Your Campaign
              <LineIcon name="arrow-right" className="text-base" />
            </button>
          </FadeIn>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 md:gap-4 mb-12 md:mb-16">
            <FadeIn delay={150} className="h-full">
              <div className="p-4 md:p-5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 shadow-sm hover:shadow-md dark:shadow-none transition-all h-full hover:border-neutral-300 dark:hover:border-neutral-600">
                  <div className="w-9 h-9 bg-blue-100 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mb-3">
                      <LineIcon name="select-cursor-1" className="text-lg" />
                  </div>
                  <h3 className="text-sm font-display font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5">PPC Management</h3>
                  <p className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed">
                      Stop burning cash. We manage campaigns with a focus on Cost Per Acquisition, not just clicks.
                  </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={250} className="h-full">
               <div className="p-4 md:p-5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 shadow-sm hover:shadow-md dark:shadow-none transition-all h-full hover:border-neutral-300 dark:hover:border-neutral-600">
                  <div className="w-9 h-9 bg-purple-100 dark:bg-purple-500/15 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center mb-3">
                      <LineIcon name="search-1" className="text-lg" />
                  </div>
                  <h3 className="text-sm font-display font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5">SEO Dominance</h3>
                  <p className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed">
                      Rank for high-intent keywords, bringing free organic traffic for years to come.
                  </p>
              </div>
            </FadeIn>

            <FadeIn delay={350} className="h-full">
               <div className="p-4 md:p-5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 shadow-sm hover:shadow-md dark:shadow-none transition-all h-full hover:border-neutral-300 dark:hover:border-neutral-600">
                  <div className="w-9 h-9 bg-pink-100 dark:bg-pink-500/15 text-pink-600 dark:text-pink-400 rounded-lg flex items-center justify-center mb-3">
                      <LineIcon name="megaphone-1" className="text-lg" />
                  </div>
                  <h3 className="text-sm font-display font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5">Social Growth</h3>
                  <p className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed">
                      Build a community around your brand with content that engages and builds trust.
                  </p>
              </div>
            </FadeIn>
        </div>

        <FadeIn delay={400}>
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 md:p-8 text-center border border-neutral-200/80 dark:border-neutral-700 shadow-sm relative">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent"></div>
              <div className="relative z-10">
                  <h2 className="text-base md:text-lg font-display font-semibold text-neutral-900 dark:text-neutral-100 mb-5 md:mb-6">Results You Can Measure</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-2xl mx-auto">
                      <div>
                          <div className="text-xl md:text-2xl font-display font-semibold text-leaf-shiny mb-0.5">300%</div>
                          <div className="text-neutral-500 dark:text-neutral-400 text-[10px] md:text-xs">Avg. ROI</div>
                      </div>
                      <div>
                          <div className="text-xl md:text-2xl font-display font-semibold text-leaf-shiny mb-0.5">24/7</div>
                          <div className="text-neutral-500 dark:text-neutral-400 text-[10px] md:text-xs">Lead Capture</div>
                      </div>
                      <div>
                          <div className="text-xl md:text-2xl font-display font-semibold text-leaf-shiny mb-0.5">&lt;1s</div>
                          <div className="text-neutral-500 dark:text-neutral-400 text-[10px] md:text-xs">Site Load Time</div>
                      </div>
                      <div>
                          <div className="text-xl md:text-2xl font-display font-semibold text-leaf-shiny mb-0.5">100%</div>
                          <div className="text-neutral-500 dark:text-neutral-400 text-[10px] md:text-xs">Data Ownership</div>
                      </div>
                  </div>
              </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default MarketingPage;
