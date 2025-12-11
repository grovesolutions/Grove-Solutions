import React from 'react';
import LineIcon from './LineIcon';
import FadeIn from './FadeIn';

interface PricingPageProps {
  onBack: () => void;
  onContact: () => void;
  onWebDev?: () => void;
  onAiAgents?: () => void;
  onMarketing?: () => void;
  onIndustries?: () => void;
}

interface PricingTier {
  name: string;
  setup: string;
  monthly: string;
  popular?: boolean;
  description: string;
  features: string[];
  bestFor: string;
}

const PricingPage: React.FC<PricingPageProps> = ({ onBack, onContact, onWebDev, onAiAgents, onMarketing, onIndustries }) => {
  const serviceLinks = [
    { id: 'web-dev', label: 'Web Development', icon: 'code-1', onClick: onWebDev },
    { id: 'ai-agents', label: 'AI Agents', icon: 'comment-1', onClick: onAiAgents },
    { id: 'marketing', label: 'Marketing', icon: 'trend-up-1', onClick: onMarketing },
    { id: 'industries', label: 'Industries', icon: 'buildings-1', onClick: onIndustries },
  ];

  const pricingTiers: PricingTier[] = [
    {
      name: 'Starter',
      setup: '$399',
      monthly: '$39',
      description: 'Perfect for small, stable businesses getting online',
      bestFor: 'New businesses establishing their digital presence',
      features: [
        'Custom 3–5 page website',
        'Mobile-responsive design',
        'Contact form integration',
        'Basic SEO setup',
        'Hosting + uptime monitoring',
        '1 update per month'
      ]
    },
    {
      name: 'Growth',
      setup: '$659',
      monthly: '$69',
      popular: true,
      description: 'For businesses actively growing and scaling',
      bestFor: 'Established businesses ready to accelerate',
      features: [
        'Everything in Starter',
        'Unlimited pages',
        'Advanced animations',
        'Monthly performance reports',
        'Up to 3 updates/month',
        'Conversion-optimized layout',
        'AI Voice Integration'
      ]
    },
    {
      name: 'Business Pro',
      setup: '$999',
      monthly: '$199',
      description: 'For revenue-focused businesses that want it all',
      bestFor: 'Scaling brands, agencies, and SaaS companies',
      features: [
        'Everything in Growth',
        'Unlimited updates',
        'Ongoing CRO improvements',
        'Advanced analytics dashboard',
        'Quarterly design tweaks',
        '24-hour support response',
        'All premium features'
      ]
    }
  ];

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
              <LineIcon name="label-dollar-2" className="text-base" />
              <span className="text-[10px] font-medium uppercase tracking-wider">Transparent Pricing</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-neutral-800 dark:text-neutral-100 mb-3 md:mb-4 leading-tight">
              Plans That <span className="text-leaf-shiny">Scale With You.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed mb-6">
              No hidden fees. No long-term contracts. Start small and upgrade as you grow—we credit your loyalty. Choose the plan that fits your business today.
            </p>
          </FadeIn>
        </div>

        {/* Pricing Cards */}
        <FadeIn delay={200}>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto mb-12 md:mb-16">
            {pricingTiers.map((tier, idx) => (
              <FadeIn key={tier.name} delay={idx * 100}>
                <div className={`
                  relative h-full p-5 md:p-6 rounded-xl border transition-all
                  ${tier.popular 
                    ? 'bg-brand-50 dark:bg-brand-500/10 border-brand-300 dark:border-brand-500/40 shadow-lg scale-[1.02]' 
                    : 'bg-white dark:bg-neutral-800 border-neutral-200/80 dark:border-neutral-700 shadow-sm hover:shadow-md'
                  }
                `}>
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-500 text-white text-[10px] font-semibold uppercase tracking-wider rounded-full">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <h3 className={`text-lg font-display font-semibold mb-1 ${tier.popular ? 'text-brand-700 dark:text-brand-300' : 'text-neutral-900 dark:text-neutral-100'}`}>
                      {tier.name}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{tier.description}</p>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-3xl md:text-4xl font-display font-bold ${tier.popular ? 'text-brand-600 dark:text-brand-400' : 'text-neutral-900 dark:text-neutral-100'}`}>
                        {tier.setup}
                      </span>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">setup</span>
                    </div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className={`text-lg font-semibold ${tier.popular ? 'text-brand-600 dark:text-brand-400' : 'text-neutral-700 dark:text-neutral-300'}`}>
                        {tier.monthly}
                      </span>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">/month</span>
                    </div>
                  </div>

                  <div className="mb-4 pb-4 border-b border-neutral-200 dark:border-neutral-700">
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      <span className="font-medium">Best for:</span> {tier.bestFor}
                    </p>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-300">
                        <LineIcon name="check-circle-1" className="text-base flex-shrink-0 mt-0.5 text-brand-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={onContact}
                    className={`
                      w-full py-2.5 rounded-lg font-medium text-sm transition-all
                      ${tier.popular 
                        ? 'btn-leaf' 
                        : 'border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700'
                      }
                    `}
                  >
                    Get Started
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>

        {/* Add-ons Section */}
        <FadeIn delay={300}>
          <div className="max-w-4xl mx-auto mb-12 md:mb-16">
            <div className="text-center mb-8">
              <h2 className="text-lg md:text-xl font-display font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
                Powerful Add-ons
              </h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Extend your plan with these optional features
              </p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Payments', price: '$75', icon: 'wallet-1', desc: 'Accept payments online' },
                { name: 'Booking', price: '$75', icon: 'calendar-days', desc: 'Online scheduling system' },
                { name: 'Reports', price: '$59/mo', icon: 'bar-chart-4', desc: 'Advanced analytics' },
                { name: 'AI Voice', price: '$199/mo', icon: 'phone', desc: '24/7 AI receptionist' },
              ].map((addon, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 hover:border-brand-300 dark:hover:border-brand-500/50 transition-all group">
                  <div className="w-10 h-10 rounded-lg bg-brand-100 dark:bg-brand-500/15 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <LineIcon name={addon.icon} className="text-xl text-brand-600 dark:text-brand-400" />
                  </div>
                  <h3 className="text-sm font-display font-semibold text-neutral-900 dark:text-neutral-100 mb-0.5">
                    {addon.name}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">{addon.desc}</p>
                  <p className="text-sm font-semibold text-brand-600 dark:text-brand-400">{addon.price}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* FAQ Section */}
        <FadeIn delay={350}>
          <div className="max-w-3xl mx-auto mb-12 md:mb-16">
            <div className="text-center mb-8">
              <h2 className="text-lg md:text-xl font-display font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4">
              {[
                { q: 'Can I upgrade my plan later?', a: 'Absolutely! You can upgrade at any time and we\'ll credit your existing setup fee toward the new plan.' },
                { q: 'Are there any long-term contracts?', a: 'No contracts. You can cancel your monthly subscription at any time. The setup fee is a one-time cost.' },
                { q: 'What\'s included in the monthly fee?', a: 'Hosting, SSL certificate, uptime monitoring, security updates, and the number of content updates specified in your plan.' },
                { q: 'Do you offer custom solutions?', a: 'Yes! For businesses with unique needs, we offer custom packages. Contact us to discuss your requirements.' },
              ].map((faq, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700">
                  <h3 className="text-sm font-display font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Final CTA Section */}
        <FadeIn delay={400}>
          <div className="text-center">
            <div className="bg-gradient-to-br from-brand-50 to-white dark:from-neutral-800 dark:to-neutral-900 rounded-2xl p-8 md:p-10 max-w-2xl mx-auto border border-brand-200/50 dark:border-brand-500/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-500/40 to-transparent"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-500/10 dark:bg-brand-500/5 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                  Ready to Get Started?
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 mb-6 text-sm md:text-base">
                  Schedule a free consultation to discuss which plan is right for your business. No pressure, just honest advice.
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

export default PricingPage;
