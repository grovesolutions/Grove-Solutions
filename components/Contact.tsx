import React, { useState } from 'react';
import LineIcon from './LineIcon';
import FadeIn from './FadeIn';
import { submitContactRequest } from '../backend';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;

    try {
      await submitContactRequest({
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim(),
        message: message.trim(),
        requestType: 'contact',
      });

      setSubmitStatus('success');
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative contact-section-bg">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 max-w-6xl mx-auto items-center">
          
          {/* Left Column: Form */}
          <div className="order-2 lg:order-1">
            <FadeIn delay={200}>
              {submitStatus === 'success' ? (
                <div className="bg-brand-500/5 dark:bg-brand-500/10 border border-brand-500/20 rounded-xl p-8 text-center animate-in">
                  <div className="w-14 h-14 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <LineIcon name="check-circle-1" className="text-2xl text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-2">Message Sent!</h4>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-6">Thank you for reaching out. We'll get back to you soon.</p>
                  <button 
                    onClick={() => setSubmitStatus('idle')}
                    className="text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 text-sm font-medium"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <input 
                      type="text" 
                      name="name" 
                      id="name"
                      required
                      placeholder="Your Name"
                      className="contact-input-minimal"
                    />
                  </div>

                  <div>
                    <input 
                      type="email" 
                      name="email" 
                      id="email"
                      required
                      placeholder="Your Email"
                      className="contact-input-minimal"
                    />
                  </div>

                  <div>
                    <input 
                      type="tel" 
                      name="phone" 
                      id="phone"
                      placeholder="Your Phone Number (Optional)"
                      className="contact-input-minimal"
                    />
                  </div>

                  <div>
                    <textarea 
                      name="message" 
                      id="message"
                      rows={3}
                      required
                      placeholder="Share your thoughts"
                      className="contact-input-minimal resize-none"
                    ></textarea>
                  </div>

                  {submitStatus === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                      <LineIcon name="question-mark-circle" className="text-base shrink-0" />
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <div className="pt-4">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="btn-gradient-border rounded-lg text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <LineIcon name="spinner-3" className="text-sm lni-is-spinning" />
                          Sending...
                        </span>
                      ) : (
                        'Share Your Feedback'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </FadeIn>
          </div>

          {/* Right Column: Heading with Blob */}
          <div className="order-1 lg:order-2 relative flex items-center justify-center min-h-[380px] md:min-h-[480px] lg:min-h-[520px]">
            {/* Decorative Circle */}
            <div className="contact-blob">
              <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                <circle cx="200" cy="200" r="190" />
              </svg>
            </div>
            
            <FadeIn className="relative z-10 text-center lg:text-left px-8 md:px-12 lg:px-16 py-12">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-light italic text-neutral-800 dark:text-neutral-100 text-glow-green">
                Contact
              </h2>
              <div className="flex items-center gap-4 mt-2 justify-center lg:justify-start">
                <div className="w-16 h-px bg-gradient-to-r from-brand-500 to-brand-300"></div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-light italic text-neutral-800 dark:text-neutral-100 text-glow-green">
                  Us
                </h2>
              </div>
              
              <p className="mt-6 text-neutral-500 dark:text-neutral-400 text-sm md:text-base leading-relaxed max-w-xs mx-auto lg:mx-0">
                It is very important for us to keep in touch with you, so we are always ready to answer any question that interests you. Shoot!
              </p>

              {/* Contact Info */}
              <div className="mt-6 space-y-3">
                <a 
                  href="mailto:grovesolutions.contact@gmail.com" 
                  className="flex items-center gap-3 text-neutral-500 dark:text-neutral-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors text-sm justify-center lg:justify-start"
                >
                  <LineIcon name="envelope-1" className="text-brand-500" />
                  grovesolutions.contact@gmail.com
                </a>
                <a 
                  href="tel:+14699431433" 
                  className="flex items-center gap-3 text-neutral-500 dark:text-neutral-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors text-sm justify-center lg:justify-start"
                >
                  <LineIcon name="phone" className="text-brand-500" />
                  +1 (469) 943-1433
                </a>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
