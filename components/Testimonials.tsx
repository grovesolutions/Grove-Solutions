import React from 'react';
import LineIcon from './LineIcon';
import FadeIn from './FadeIn';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "We used to miss 30% of our calls after hours. Now our AI books appointments 24/7 and we've seen a 23% increase in bookings.",
      author: "Sarah Chen",
      role: "Owner, Atlanta Plumbing Co.",
      metric: "+23% bookings",
      icon: "comment-1"
    },
    {
      quote: "The website conversion rate went from 2% to 6% in the first month. Our lead quality improved dramatically with the scoring system.",
      author: "Mike Rodriguez",
      role: "Director, Home Services Pro",
      metric: "6% conversion",
      icon: "comment-1"
    },
    {
      quote: "Best investment we've made. The AI handles routine calls, and I only get the hot leads. It's like having a full-time receptionist for a fraction of the cost.",
      author: "Jennifer Park",
      role: "Founder, Wellness Studio",
      metric: "85% call success",
      icon: "comment-1"
    }
  ];

  const stats = [
    { value: "85%+", label: "AI Call Success Rate", icon: "phone" },
    { value: "5%+", label: "Website Conversion", icon: "globe-1" },
    { value: "24/7", label: "Availability", icon: "alarm-1" },
    { value: "<2s", label: "Page Load Time", icon: "gauge-1" }
  ];

  return (
    <section id="testimonials" className="py-16 md:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Stats Bar */}
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16 max-w-4xl mx-auto">
            {stats.map((stat, idx) => (
              <div 
                key={idx}
                className="text-center p-4 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-100 dark:bg-brand-500/15 flex items-center justify-center mx-auto mb-2">
                  <LineIcon name={stat.icon} className="text-lg text-brand-600 dark:text-brand-400" />
                </div>
                <div className="text-2xl md:text-3xl font-display font-bold text-neutral-800 dark:text-neutral-100 mb-1">
                  {stat.value}
                </div>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-10 md:mb-12">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-100 dark:bg-brand-500/15 mb-4 text-brand-600 dark:text-brand-400">
                <LineIcon name="star-fat" className="text-sm" />
                <span className="text-[10px] font-medium uppercase tracking-wider">Trusted by Local Businesses</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-neutral-800 dark:text-neutral-100 mb-3">
                Real Results from <span className="text-leaf-shiny">Real Businesses</span>
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base">
                See how local businesses are capturing more customers and proving ROI
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {testimonials.map((testimonial, idx) => (
              <FadeIn key={idx} delay={idx * 100}>
                <div className="p-5 md:p-6 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 h-full flex flex-col">
                  <div className="mb-4">
                    <LineIcon name={testimonial.icon} className="text-2xl text-brand-500/30 mb-3" />
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4 flex-grow">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-semibold text-sm text-neutral-800 dark:text-neutral-100">
                          {testimonial.author}
                        </div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-brand-100 dark:bg-brand-500/15 text-brand-600 dark:text-brand-400 text-[10px] font-medium">
                      <LineIcon name="trend-up-1" className="text-xs" />
                      {testimonial.metric}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

