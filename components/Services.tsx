import React from 'react';
import LineIcon from './LineIcon';
import FadeIn from './FadeIn';

interface ServicesProps {
  onLearnMoreWeb: () => void;
  onLearnMoreAi: () => void;
  onLearnMoreMarketing: () => void;
}

interface ServiceItemWithCode {
  title: string;
  productCode: string;
  description: string;
  icon: string;
  features: string[];
}

const Services: React.FC<ServicesProps> = ({ onLearnMoreWeb, onLearnMoreAi, onLearnMoreMarketing }) => {
  const services: ServiceItemWithCode[] = [
    {
      title: "Tailored Web Experiences",
      productCode: "GES-SITE",
      description: "Your 24/7 salesperson. Custom, lightning-fast React applications designed for your industry.",
      icon: "globe-1",
      features: ["Custom UI/UX Design", "SEO Optimization", "Mobile-First", "High-Conversion Pages"]
    },
    {
      title: "Proprietary AI Agents",
      productCode: "GES-VOICE",
      description: "Never miss a lead. Our agents handle inquiries, book appointments, and qualify leads instantly.",
      icon: "comment-1",
      features: ["Natural Language AI", "Lead Qualification", "CRM Integration", "24/7 Availability"]
    },
    {
      title: "Strategic Marketing",
      productCode: "GES-SEO",
      description: "We don't just build—we fuel. Targeted campaigns ensure the right eyes see your infrastructure.",
      icon: "bar-chart-4",
      features: ["PPC Management", "Social Growth", "Email Automation", "Analytics"]
    }
  ];

  const handleLearnMore = (index: number) => {
    if (index === 0) {
      onLearnMoreWeb();
    } else if (index === 1) {
      onLearnMoreAi();
    } else if (index === 2) {
      onLearnMoreMarketing();
    }
  };

  return (
    <section id="services" className="py-14 md:py-18 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-10 md:mb-12 text-center max-w-2xl mx-auto">
          <FadeIn>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-neutral-800 dark:text-neutral-100 mb-3">
              The <span className="text-leaf-shiny">Grove Ecosystem</span>
            </h2>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base">
              Three pillars of modern business, unified. Stop juggling freelancers—we handle it all.
            </p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-5 pt-4">
          {services.map((service, idx) => (
            <FadeIn key={idx} delay={idx * 100} className={`h-full ${idx === 0 ? 'relative' : ''}`}>
              {idx === 0 && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-brand-500 text-white text-[10px] font-medium px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Popular
                </div>
              )}
              <div className={`group relative p-5 md:p-6 rounded-xl transition-all duration-300 h-full flex flex-col border ${
                idx === 0 
                  ? 'bg-brand-50 dark:bg-neutral-800 border-brand-200 dark:border-neutral-700 shadow-sm' 
                  : 'bg-white dark:bg-neutral-800 border-neutral-200/80 dark:border-neutral-700 shadow-sm hover:shadow-md dark:shadow-none hover:border-neutral-300 dark:hover:border-neutral-600'
              }`}>
                
                <div className={`w-10 h-10 md:w-11 md:h-11 rounded-lg flex items-center justify-center mb-4 ${
                  idx === 0 
                    ? 'bg-brand-100 dark:bg-brand-500/15' 
                    : 'bg-neutral-100 dark:bg-neutral-700 group-hover:bg-brand-100 dark:group-hover:bg-brand-500/15'
                } transition-colors`}>
                  <LineIcon name={service.icon} className={`text-xl md:text-2xl ${
                    idx === 0 
                      ? 'text-brand-600 dark:text-brand-400' 
                      : 'text-neutral-500 dark:text-neutral-400 group-hover:text-brand-600 dark:group-hover:text-brand-400'
                  } transition-colors`} />
                </div>
                
                <div className="mb-3">
                  <span className="text-[10px] font-mono text-brand-600/60 dark:text-brand-500/60 tracking-wider">{service.productCode}</span>
                  <h3 className="text-base md:text-lg font-display font-semibold text-neutral-800 dark:text-neutral-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{service.title}</h3>
                </div>
                <p className="text-neutral-500 dark:text-neutral-400 mb-4 leading-relaxed text-xs md:text-sm flex-grow">
                  {service.description}
                </p>
                
                <ul className="space-y-1.5 mb-4">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 text-xs">
                      <LineIcon name="check-circle-1" className="text-sm text-brand-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleLearnMore(idx)}
                  className="inline-flex items-center text-brand-600 dark:text-brand-500 font-medium text-xs hover:text-brand-700 dark:hover:text-brand-400 transition-colors mt-auto"
                >
                  Learn more <LineIcon name="arrow-angular-top-right" className="text-sm ml-1" />
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
