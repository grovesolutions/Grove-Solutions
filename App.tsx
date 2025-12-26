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
import Testimonials from './components/Testimonials';
import FadeIn from './components/FadeIn';
import LineIcon from './components/LineIcon';

type Page = 'home' | 'web-dev' | 'why-us' | 'ai-agents' | 'marketing' | 'industries';

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
              <Testimonials />
              {/* Process section */}
              <div id="process" className="py-16 md:py-20">
                 <div className="container mx-auto px-4 sm:px-6 text-center">
                   <FadeIn>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-100 dark:bg-brand-500/15 mb-4 text-brand-600 dark:text-brand-400">
                      <LineIcon name="gears-3" className="text-sm" />
                      <span className="text-[10px] font-medium uppercase tracking-wider">Simple Setup</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-display font-semibold text-neutral-800 dark:text-neutral-100 mb-3">
                      Get Started in <span className="text-leaf-shiny">30 Minutes</span>
                    </h2>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base mb-10 md:mb-14 max-w-2xl mx-auto">
                      No complex onboarding. We handle the technical setup so you can focus on your business.
                    </p>
                   </FadeIn>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
                     {[
                       { num: "01", title: "Quick Call", desc: "15-min consultation to understand your needs", icon: "phone" },
                       { num: "02", title: "Setup", desc: "We configure AI voice and build your site", icon: "gears-3" },
                       { num: "03", title: "Test", desc: "Review and approve—we make it perfect", icon: "check-circle-1" },
                       { num: "04", title: "Launch", desc: "Go live and start capturing customers", icon: "arrow-upward" }
                     ].map((step, i) => (
                      <FadeIn key={i} delay={i * 100} className="h-full">
                         <div className="relative p-4 md:p-5 h-full rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-brand-300 dark:hover:border-brand-500/50 transition-all">
                           <div className="w-10 h-10 rounded-lg bg-brand-100 dark:bg-brand-500/15 flex items-center justify-center mx-auto mb-3">
                             <LineIcon name={step.icon} className="text-lg text-brand-600 dark:text-brand-400" />
                           </div>
                           <div className="text-3xl md:text-4xl font-display font-bold text-neutral-300 dark:text-neutral-700/50 mb-2">{step.num}</div>
                           <h3 className="text-sm md:text-base font-display font-semibold text-neutral-800 dark:text-neutral-100 mb-1.5">{step.title}</h3>
                           <p className="text-neutral-500 dark:text-neutral-400 text-xs md:text-sm leading-relaxed">{step.desc}</p>
                          </div>
                       </FadeIn>
                     ))}
                   </div>
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
            />
          )}
        </main>

        <Footer 
          onNavWeb={() => navigateToPage('web-dev')}
          onNavAi={() => navigateToPage('ai-agents')}
          onNavMarketing={() => navigateToPage('marketing')}
          onNavConsulting={() => navigateToHome('contact')}
          onNavIndustries={() => navigateToPage('industries')}
        />
        {/* AI Chat Widget */}
        <ChatWidget />
      </div>
    </div>
  );
}

export default App;
