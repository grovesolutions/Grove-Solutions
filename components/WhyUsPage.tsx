import React from 'react';
import LineIcon from './LineIcon';
import FadeIn from './FadeIn';

interface WhyUsPageProps {
  onBack: () => void;
  onContact: () => void;
}

const WhyUsPage: React.FC<WhyUsPageProps> = ({ onBack, onContact }) => {
  const advantages = [
    {
      icon: "user-multiple-4",
      title: "Customer & Lead Acquisition",
      desc: "Most websites are digital brochures. Ours are lead magnets. High-speed architecture combined with targeted marketing brings new eyes daily."
    },
    {
      icon: "layers-1",
      title: "Automated Follow-Up",
      desc: "The money is in the follow-up. Our agents engage leads within seconds, ensuring you never lose a customer to a slower competitor."
    },
    {
      icon: "dollar",
      title: "Increased Profit Margins",
      desc: "Efficiency creates wealth. Automating scheduling, answering, and qualification reduces overhead while increasing output."
    },
    {
      icon: "shield-2-check",
      title: "Organized Business Structure",
      desc: "Chaos kills growth. We implement infrastructure that organizes customer data, streamlines workflow, and gives you clarity."
    }
  ];

  return (
    <div className="pt-24 md:pt-28 pb-14 md:pb-18 animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-screen">
      <div>
        {/* Back Navigation */}
        <div className="mb-5 md:mb-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors group text-xs"
          >
            <LineIcon name="arrow-left" className="text-sm group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
        </div>

        {/* Hero */}
        <div className="max-w-3xl mb-10 md:mb-14">
          <FadeIn>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-neutral-800 dark:text-neutral-100 mb-3 md:mb-4 leading-tight">
              We Don't Just Build.{' '}
              <span className="text-leaf-shiny">We Scale.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed mb-5 md:mb-6">
              Competitors sell tools. Grove Solutions builds machines. We focus on the metrics that matter: Customer Acquisition, Retention, and Profit Margin.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <button 
              onClick={onContact}
              className="btn-leaf px-5 md:px-6 py-2 md:py-2.5 rounded-lg font-medium text-sm inline-flex items-center gap-2"
            >
              Partner With Us
              <LineIcon name="arrow-right" className="text-base" />
            </button>
          </FadeIn>
        </div>

        {/* The Advantage Grid */}
        <div className="grid sm:grid-cols-2 gap-3 md:gap-4 mb-12 md:mb-16">
            {advantages.map((item, idx) => (
                <FadeIn key={idx} delay={idx * 100} className="h-full">
                  <div className="p-4 md:p-5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 shadow-sm hover:shadow-md dark:shadow-none transition-all group h-full hover:border-neutral-300 dark:hover:border-neutral-600">
                      <div className="w-10 h-10 bg-brand-100 dark:bg-brand-500/15 rounded-lg flex items-center justify-center mb-3">
                          <LineIcon name={item.icon} className="text-xl text-brand-600 dark:text-brand-400" />
                      </div>
                      <h3 className="text-sm md:text-base font-display font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5">{item.title}</h3>
                      <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed text-xs">{item.desc}</p>
                  </div>
                </FadeIn>
            ))}
        </div>

        {/* Comparison Table */}
        <FadeIn delay={400}>
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-5 md:p-6 border border-neutral-200/80 dark:border-neutral-700 shadow-sm relative">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent"></div>
              
              <h2 className="text-base md:text-lg font-display font-semibold text-neutral-900 dark:text-neutral-100 mb-6 text-center">The Grove Difference</h2>
              <div className="overflow-x-auto -mx-5 md:mx-0 px-5 md:px-0">
                  <table className="w-full text-left border-collapse min-w-[360px]">
                      <thead>
                          <tr>
                              <th className="py-2 px-2 text-neutral-500 dark:text-neutral-400 font-medium uppercase tracking-wider text-[10px]">Feature</th>
                              <th className="py-2 px-2 text-neutral-500 dark:text-neutral-400 font-medium uppercase tracking-wider text-[10px] text-center">Traditional Agency</th>
                              <th className="py-2 px-2 text-brand-600 dark:text-brand-400 font-medium uppercase tracking-wider text-[10px] text-center bg-brand-100 dark:bg-brand-500/15 rounded-t-md">Grove Solutions</th>
                          </tr>
                      </thead>
                      <tbody>
                          {[
                              { label: "Response Time", bad: "Hours or Days", good: "Instant (AI Driven)" },
                              { label: "Website Tech", bad: "Slow Templates", good: "Custom React Code" },
                              { label: "Goal", bad: "Deliver a Product", good: "Scale Revenue" },
                              { label: "Lead Handling", bad: "Manual Entry", good: "Automated CRM Sync" },
                          ].map((row, i) => (
                              <tr key={i} className="hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors">
                                  <td className="py-3 px-2 font-medium text-neutral-700 dark:text-neutral-300 text-xs">{row.label}</td>
                                  <td className="py-3 px-2 text-neutral-500 dark:text-neutral-400 text-center text-xs">{row.bad}</td>
                                  <td className="py-3 px-2 text-neutral-900 dark:text-neutral-100 font-medium text-center bg-brand-100 dark:bg-brand-500/15 text-xs">{row.good}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default WhyUsPage;
