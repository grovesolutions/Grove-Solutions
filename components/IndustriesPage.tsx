import React, { useState } from 'react';
import LineIcon from './LineIcon';
import FadeIn from './FadeIn';

interface IndustriesPageProps {
  onBack: () => void;
  onContact: () => void;
  onWebDev?: () => void;
  onAiAgents?: () => void;
  onMarketing?: () => void;
}

interface Feature {
  icon: string;
  title: string;
  desc: string;
}

interface Industry {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  features: Feature[];
  color: string;
  stats: { value: string; label: string }[];
}

interface Product {
  id: string;
  name: string;
  fullName: string;
  icon: string;
  description: string;
  features: string[];
}


const IndustriesPage: React.FC<IndustriesPageProps> = ({ onBack, onContact, onWebDev, onAiAgents, onMarketing }) => {
  const [activeIndustry, setActiveIndustry] = useState<string>('service-providers');

  const serviceLinks = [
    { id: 'web-dev', label: 'Web Development', icon: 'code-1', onClick: onWebDev },
    { id: 'ai-agents', label: 'AI Agents', icon: 'comment-1', onClick: onAiAgents },
    { id: 'marketing', label: 'Marketing', icon: 'trend-up-1', onClick: onMarketing },
  ];

  const industries: Industry[] = [
    {
      id: 'service-providers',
      title: 'Service Providers',
      subtitle: 'Plumbers, HVAC, Electricians, Contractors, Cleaners & More',
      icon: 'hammer-2',
      description: 'Never miss another lead. Our AI-powered systems ensure every call is answered, every appointment is booked, and every customer is followed up with—automatically. Perfect for home service businesses that are always on the go.',
      features: [
        { icon: 'phone', title: '24/7 AI Receptionist', desc: 'Never miss a call. AI handles inquiries, qualifies leads, and books appointments while you work.' },
        { icon: 'calendar-days', title: 'Smart Scheduling', desc: 'Auto-booking that syncs with your calendar and optimizes your route.' },
        { icon: 'user-multiple-4', title: 'Lead Dashboard', desc: 'Real-time visibility into every lead, conversion metrics, and revenue tracking.' },
        { icon: 'comment-1', title: 'Missed-Call Text Back', desc: 'Instantly text customers who call when you\'re busy—never lose a job again.' }
      ],
      color: 'brand',
      stats: [
        { value: '47%', label: 'More Leads Captured' },
        { value: '3.2x', label: 'ROI Average' },
        { value: '24/7', label: 'Availability' }
      ]
    },
    {
      id: 'real-estate',
      title: 'Real Estate',
      subtitle: 'Agents, Brokers, Property Managers & Investors',
      icon: 'home-2',
      description: 'Close more deals with less effort. From AI-generated listings to intelligent lead scoring, we give you the competitive edge in a crowded market. Automate follow-ups and focus on what matters—closing.',
      features: [
        { icon: 'buildings-1', title: 'AI Listing Builder', desc: 'Generate compelling property descriptions and marketing copy optimized for visibility.' },
        { icon: 'comment-1', title: 'Property Chatbot', desc: '24/7 AI assistant that answers buyer questions and captures lead info automatically.' },
        { icon: 'clipboard', title: 'Auto Follow-ups', desc: 'Personalized drip campaigns that nurture browsers into buyers.' },
        { icon: 'trend-up-1', title: 'Lead Scoring', desc: 'AI identifies your hottest leads so you focus on closers, not tire-kickers.' }
      ],
      color: 'emerald',
      stats: [
        { value: '2.8x', label: 'Lead Conversion' },
        { value: '65%', label: 'Time Saved' },
        { value: '91%', label: 'Response Rate' }
      ]
    },
    {
      id: 'restaurants',
      title: 'Restaurants & Hospitality',
      subtitle: 'Cafes, Bars, Fine Dining, Quick Service & Catering',
      icon: 'knife-fork-1',
      description: 'Fill more seats and build lasting customer relationships. Handle everything from reservations to reputation management. Dominate local search and turn one-time visitors into regulars.',
      features: [
        { icon: 'clipboard', title: 'Digital Menus', desc: 'Beautiful, searchable menus that update instantly across all platforms.' },
        { icon: 'star-fat', title: 'Review Responder', desc: 'AI-crafted responses that build your reputation and address concerns professionally.' },
        { icon: 'search-1', title: 'Local SEO Domination', desc: 'Own "restaurant near me" searches in your area.' },
        { icon: 'map-marker-1', title: 'Smart Reservations', desc: 'Seamless booking that manages capacity and reduces no-shows automatically.' }
      ],
      color: 'amber',
      stats: [
        { value: '38%', label: 'More Bookings' },
        { value: '4.6★', label: 'Avg Rating Boost' },
        { value: '52%', label: 'Repeat Customers' }
      ]
    },
    {
      id: 'health-beauty',
      title: 'Health & Beauty',
      subtitle: 'Barbers, Salons, Spas, Gyms, Personal Trainers & Wellness',
      icon: 'heart',
      description: 'Build a loyal client base and fill your appointment book. From automated booking reminders to personalized client management, we help you deliver exceptional experiences that keep clients coming back.',
      features: [
        { icon: 'calendar-days', title: 'Online Booking', desc: 'Let clients book 24/7. Automatic reminders reduce no-shows by up to 70%.' },
        { icon: 'user-multiple-4', title: 'Client Profiles', desc: 'Track preferences, history, and notes for personalized service every visit.' },
        { icon: 'instagram', title: 'Social Integration', desc: 'Showcase your work and book directly from Instagram and Facebook.' },
        { icon: 'box-gift-1', title: 'Loyalty Programs', desc: 'Automated rewards that turn first-timers into regulars.' }
      ],
      color: 'rose',
      stats: [
        { value: '70%', label: 'Less No-Shows' },
        { value: '3.5x', label: 'Rebooking Rate' },
        { value: '28%', label: 'Revenue Growth' }
      ]
    },
    {
      id: 'professional-services',
      title: 'Professional Services',
      subtitle: 'Consultants, Accountants, Tutors, Coaches & Agencies',
      icon: 'briefcase-1',
      description: 'Position yourself as the expert and let your digital presence work while you sleep. Capture high-value leads, automate client onboarding, and scale your practice without scaling your hours.',
      features: [
        { icon: 'www', title: 'Authority Website', desc: 'Professional site that positions you as the go-to expert in your field.' },
        { icon: 'calendar-days', title: 'Discovery Scheduling', desc: 'Qualify leads and book consultations automatically.' },
        { icon: 'envelope-1', title: 'Email Sequences', desc: 'Nurture prospects with automated value-driven email campaigns.' },
        { icon: 'bar-chart-4', title: 'Analytics Dashboard', desc: 'Track client acquisition, retention, and lifetime value.' }
      ],
      color: 'violet',
      stats: [
        { value: '156%', label: 'Lead Increase' },
        { value: '4.2x', label: 'Consultation Rate' },
        { value: '$8.5K', label: 'Avg Client Value' }
      ]
    }
  ];

  const products: Product[] = [
    {
      id: 'ges-site',
      name: 'GES-SITE',
      fullName: 'Smart Integrated Template Engine',
      icon: 'www',
      description: 'AI-powered website and funnel builder designed to convert visitors into leads and booked appointments.',
      features: ['Custom responsive design', 'Conversion-optimized layouts', 'Sales funnel integration', 'Mobile-first approach']
    },
    {
      id: 'ges-voice',
      name: 'GES-VOICE',
      fullName: 'Virtual Operations Intelligent Call Engine',
      icon: 'phone',
      description: 'An AI receptionist that handles calls, books appointments, and automates lead qualification 24/7.',
      features: ['Natural conversation AI', 'Appointment booking', 'Lead qualification', 'Call routing & transcripts']
    },
    {
      id: 'ges-lead',
      name: 'GES-LEAD',
      fullName: 'Localized Engagement & Acquisition Database',
      icon: 'target-user',
      description: 'A lead generation and scoring engine that identifies, tracks, and prioritizes high-value local prospects.',
      features: ['Automated prospecting', 'Lead scoring AI', 'CRM integration', 'Follow-up automation']
    },
    {
      id: 'ges-seo',
      name: 'GES-SEO',
      fullName: 'Search Engine Orchestrator',
      icon: 'search-1',
      description: 'Automated SEO system that improves local search rankings, manages reviews, and enhances online visibility.',
      features: ['Local SEO optimization', 'Review management', 'Google Business setup', 'Ranking reports']
    }
  ];


  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; glow: string; border: string; gradient: string }> = {
      brand: { 
        bg: 'bg-brand-100 dark:bg-brand-500/15', 
        text: 'text-brand-600 dark:text-brand-400', 
        glow: 'text-leaf-shiny',
        border: 'border-brand-200 dark:border-brand-500/30',
        gradient: 'from-brand-500/10 to-transparent'
      },
      emerald: { 
        bg: 'bg-emerald-100 dark:bg-emerald-500/15', 
        text: 'text-emerald-600 dark:text-emerald-400', 
        glow: 'text-emerald-600 dark:text-emerald-400',
        border: 'border-emerald-200 dark:border-emerald-500/30',
        gradient: 'from-emerald-500/10 to-transparent'
      },
      amber: { 
        bg: 'bg-amber-100 dark:bg-amber-500/15', 
        text: 'text-amber-600 dark:text-amber-400', 
        glow: 'text-amber-600 dark:text-amber-400',
        border: 'border-amber-200 dark:border-amber-500/30',
        gradient: 'from-amber-500/10 to-transparent'
      },
      rose: { 
        bg: 'bg-rose-100 dark:bg-rose-500/15', 
        text: 'text-rose-600 dark:text-rose-400', 
        glow: 'text-rose-600 dark:text-rose-400',
        border: 'border-rose-200 dark:border-rose-500/30',
        gradient: 'from-rose-500/10 to-transparent'
      },
      violet: { 
        bg: 'bg-violet-100 dark:bg-violet-500/15', 
        text: 'text-violet-600 dark:text-violet-400', 
        glow: 'text-violet-600 dark:text-violet-400',
        border: 'border-violet-200 dark:border-violet-500/30',
        gradient: 'from-violet-500/10 to-transparent'
      }
    };
    return colors[color] || colors.brand;
  };

  const activeIndustryData = industries.find(i => i.id === activeIndustry) || industries[0];
  const activeColors = getColorClasses(activeIndustryData.color);

  return (
    <div className="pt-24 md:pt-28 pb-14 md:pb-18 animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-screen">
      <div>
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
        <div className="max-w-4xl mb-12 md:mb-16">
          <FadeIn>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-100 dark:bg-brand-500/15 mb-4 text-brand-600 dark:text-brand-400">
              <LineIcon name="buildings-1" className="text-base" />
              <span className="text-[10px] font-medium uppercase tracking-wider">Industry Solutions</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-neutral-800 dark:text-neutral-100 mb-3 md:mb-4 leading-tight">
              Solutions Built For <span className="text-leaf-shiny">Your Industry.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed mb-6">
              Every business faces unique challenges. We've developed specialized AI-powered solutions for high-demand industries, engineered to solve your specific problems and accelerate your growth.
            </p>
          </FadeIn>
        </div>

        {/* Industry Selector Tabs */}
        <FadeIn delay={200}>
          <div className="mb-10 md:mb-12">
            <div className="flex flex-wrap gap-2 md:gap-3">
              {industries.map((industry) => {
                const colors = getColorClasses(industry.color);
                const isActive = activeIndustry === industry.id;
                return (
                  <button
                    key={industry.id}
                    onClick={() => setActiveIndustry(industry.id)}
                    className={`
                      flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all
                      ${isActive 
                        ? `${colors.bg} ${colors.text} ${colors.border} border shadow-sm` 
                        : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-600'
                      }
                    `}
                  >
                    <LineIcon name={industry.icon} className="text-base" />
                    <span className="hidden sm:inline">{industry.title}</span>
                    <span className="sm:hidden">{industry.title.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* Active Industry Showcase */}
        <FadeIn delay={250} key={activeIndustry}>
          <div className={`relative rounded-2xl bg-gradient-to-br ${activeColors.gradient} dark:from-neutral-800/50 dark:to-neutral-900/50 border ${activeColors.border} p-6 md:p-8 mb-12 md:mb-16 overflow-hidden`}>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-10 dark:opacity-5 pointer-events-none">
              <LineIcon name={activeIndustryData.icon} className="w-full h-full" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${activeColors.bg} flex items-center justify-center flex-shrink-0`}>
                  <LineIcon name={activeIndustryData.icon} className={`text-2xl md:text-3xl ${activeColors.text}`} />
                </div>
                <div>
                  <h2 className={`text-xl md:text-2xl font-display font-semibold ${activeColors.glow} mb-1`}>
                    {activeIndustryData.title}
                  </h2>
                  <p className="text-neutral-500 dark:text-neutral-400 text-xs md:text-sm">{activeIndustryData.subtitle}</p>
                </div>
              </div>
              
              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300 mb-6 md:mb-8 max-w-3xl leading-relaxed">
                {activeIndustryData.description}
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {activeIndustryData.stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className={`text-xl md:text-2xl lg:text-3xl font-display font-bold ${activeColors.text}`}>
                      {stat.value}
                    </div>
                    <div className="text-[10px] md:text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {activeIndustryData.features.map((feature, fIdx) => (
                  <div 
                    key={fIdx} 
                    className="p-4 rounded-xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200/60 dark:border-neutral-700/60 hover:shadow-md transition-all group"
                  >
                    <div className={`w-10 h-10 rounded-lg ${activeColors.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <LineIcon name={feature.icon} className={`text-xl ${activeColors.text}`} />
                    </div>
                    <h3 className="text-sm font-display font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 md:mt-8 flex flex-wrap gap-3">
                <button 
                  onClick={onContact}
                  className="btn-leaf px-5 md:px-6 py-2.5 rounded-lg font-medium text-sm inline-flex items-center gap-2"
                >
                  Get Started with {activeIndustryData.title.split(' ')[0]}
                  <LineIcon name="arrow-right" className="text-base" />
                </button>
                <button 
                  onClick={onContact}
                  className="px-5 md:px-6 py-2.5 rounded-lg font-medium text-sm inline-flex items-center gap-2 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  <LineIcon name="phone" className="text-base" />
                  Schedule a Demo
                </button>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* GES Product Suite Section */}
        <FadeIn delay={100}>
          <div className="mb-12 md:mb-16">
            <div className="text-center mb-8 md:mb-10">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 mb-3 text-neutral-600 dark:text-neutral-400">
                <LineIcon name="gear-1" className="text-base" />
                <span className="text-[10px] font-medium uppercase tracking-wider">The Grove Ecosystem</span>
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-display font-semibold text-neutral-800 dark:text-neutral-100 mb-3">
                Powered by <span className="text-leaf-shiny">GES Technology</span>
              </h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
                Our Grove Enterprise Solutions suite provides the backbone for every industry solution—modular, powerful, and seamlessly integrated.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((product, idx) => (
                <FadeIn key={product.id} delay={idx * 80}>
                  <div className="aspect-square p-5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 shadow-sm hover:shadow-lg dark:shadow-none transition-all group hover:border-brand-300 dark:hover:border-brand-500/50 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-11 h-11 rounded-lg bg-brand-100 dark:bg-brand-500/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <LineIcon name={product.icon} className="text-2xl text-brand-600 dark:text-brand-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-display font-bold text-brand-600 dark:text-brand-400">{product.name}</h3>
                        <p className="text-[9px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">{product.fullName}</p>
                      </div>
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 mb-3 leading-relaxed flex-grow line-clamp-3">
                      {product.description}
                    </p>
                    <ul className="space-y-1 mt-auto">
                      {product.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                          <LineIcon name="check-circle-1" className="text-brand-500 text-sm flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>



        {/* Final CTA Section */}
        <FadeIn delay={300}>
          <div className="text-center">
            <div className="bg-gradient-to-br from-brand-50 to-white dark:from-neutral-800 dark:to-neutral-900 rounded-2xl p-8 md:p-10 max-w-2xl mx-auto border border-brand-200/50 dark:border-brand-500/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-500/40 to-transparent"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-500/10 dark:bg-brand-500/5 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                  Ready to Transform Your Business?
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 mb-6 text-sm md:text-base">
                  Don't see your industry? No problem. We build custom solutions for any business. Let's discuss how we can accelerate your growth.
                </p>
                <button 
                    onClick={onContact}
                    className="btn-leaf px-6 md:px-8 py-3 rounded-lg font-medium text-sm md:text-base inline-flex items-center gap-2"
                  >
                    Schedule a Free Consultation
                    <LineIcon name="arrow-right" className="text-base" />
                  </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default IndustriesPage;
