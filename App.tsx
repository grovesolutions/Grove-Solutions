import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import WebDevPage from './components/WebDevPage';
import WhyUsPage from './components/WhyUsPage';
import AiAgentPage from './components/AiAgentPage';
import MarketingPage from './components/MarketingPage';
import IndustriesPage from './components/IndustriesPage';
import PricingPage from './components/PricingPage';
import FadeIn from './components/FadeIn';

type Page = 'home' | 'web-dev' | 'why-us' | 'ai-agents' | 'marketing' | 'industries' | 'pricing';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigateToHome = (targetId?: string) => {
    setCurrentPage('home');
    if (targetId) {
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateToPage = (page: Page) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 relative selection:bg-brand-500/15 transition-colors duration-300 overflow-x-hidden">
      {/* Fluid Animated Background Mist */}
      <div className="mist-wrapper">
        <div className="mist-orb mist-orb-1"></div>
        <div className="mist-orb mist-orb-2"></div>
        <div className="mist-orb mist-orb-3"></div>
        <div className="mist-orb mist-orb-4"></div>
        <div className="mist-orb mist-orb-5"></div>
        <div className="mist-orb mist-orb-6"></div>
      </div>

      <div className="relative z-10">
        <Navbar 
          onNavigate={navigateToHome} 
          onWhyUs={() => navigateToPage('why-us')}
          onIndustries={() => navigateToPage('industries')}
          onWebDev={() => navigateToPage('web-dev')}
          onAiAgents={() => navigateToPage('ai-agents')}
          onMarketing={() => navigateToPage('marketing')}
          onPricing={() => navigateToPage('pricing')}
        />
        
        <main className="max-w-[1200px] mx-auto px-4 sm:px-6">
          {currentPage === 'home' && (
            <>
              <Hero onContact={() => navigateToHome('contact')} />
              <Services 
                onLearnMoreWeb={() => navigateToPage('web-dev')}
                onLearnMoreAi={() => navigateToPage('ai-agents')}
                onLearnMoreMarketing={() => navigateToPage('marketing')}
              />
              {/* Process section */}
              <div id="process" className="py-16 md:py-20">
                 <div className="container mx-auto px-4 sm:px-6 text-center">
                   <FadeIn>
                    <h2 className="text-xl md:text-2xl font-display font-semibold text-neutral-800 dark:text-neutral-100 mb-10 md:mb-14">How We Work</h2>
                   </FadeIn>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                     {[
                       { num: "01", title: "Discovery", desc: "We analyze your business model and identify bottlenecks." },
                       { num: "02", title: "Strategy", desc: "We design a custom tailored digital roadmap." },
                       { num: "03", title: "Build", desc: "Our engineers build your site and configure your AI agents." },
                       { num: "04", title: "Launch", desc: "We go live, drive traffic, and monitor conversions." }
                     ].map((step, i) => (
                      <FadeIn key={i} delay={i * 100} className="h-full">
                         <div className="relative p-4 md:p-5 h-full">
                           <div className="text-5xl md:text-7xl font-display font-bold text-neutral-300 dark:text-neutral-700/50 mb-2">{step.num}</div>
                           <h3 className="text-sm md:text-base font-display font-semibold text-neutral-800 dark:text-neutral-100 mb-1.5">{step.title}</h3>
                           <p className="text-neutral-500 dark:text-neutral-400 text-xs md:text-sm leading-relaxed">{step.desc}</p>
                          </div>
                       </FadeIn>
                     ))}
                   </div>
                   {/* Shimmer divider */}
                 </div>
              </div>
              <Contact />
            </>
          )}
          
          {currentPage === 'web-dev' && (
            <WebDevPage 
              onBack={() => navigateToHome()} 
              onContact={() => navigateToHome('contact')}
              onAiAgents={() => navigateToPage('ai-agents')}
              onMarketing={() => navigateToPage('marketing')}
              onIndustries={() => navigateToPage('industries')}
            />
          )}

          {currentPage === 'why-us' && (
            <WhyUsPage 
              onBack={() => navigateToHome()}
              onContact={() => navigateToHome('contact')}
            />
          )}

          {currentPage === 'ai-agents' && (
            <AiAgentPage
              onBack={() => navigateToHome()}
              onContact={() => navigateToHome('contact')}
              onWebDev={() => navigateToPage('web-dev')}
              onMarketing={() => navigateToPage('marketing')}
              onIndustries={() => navigateToPage('industries')}
            />
          )}

          {currentPage === 'marketing' && (
            <MarketingPage
              onBack={() => navigateToHome()}
              onContact={() => navigateToHome('contact')}
              onWebDev={() => navigateToPage('web-dev')}
              onAiAgents={() => navigateToPage('ai-agents')}
              onIndustries={() => navigateToPage('industries')}
            />
          )}

          {currentPage === 'industries' && (
            <IndustriesPage
              onBack={() => navigateToHome()}
              onContact={() => navigateToHome('contact')}
              onWebDev={() => navigateToPage('web-dev')}
              onAiAgents={() => navigateToPage('ai-agents')}
              onMarketing={() => navigateToPage('marketing')}
              onPricing={() => navigateToPage('pricing')}
            />
          )}

          {currentPage === 'pricing' && (
            <PricingPage
              onBack={() => navigateToHome()}
              onContact={() => navigateToHome('contact')}
              onWebDev={() => navigateToPage('web-dev')}
              onAiAgents={() => navigateToPage('ai-agents')}
              onMarketing={() => navigateToPage('marketing')}
              onIndustries={() => navigateToPage('industries')}
            />
          )}
        </main>

        <Footer 
          onNavWeb={() => navigateToPage('web-dev')}
          onNavAi={() => navigateToPage('ai-agents')}
          onNavMarketing={() => navigateToPage('marketing')}
          onNavConsulting={() => navigateToHome('contact')}
          onNavIndustries={() => navigateToPage('industries')}
          onNavPricing={() => navigateToPage('pricing')}
        />
        <ChatWidget />
      </div>
    </div>
  );
}

export default App;
