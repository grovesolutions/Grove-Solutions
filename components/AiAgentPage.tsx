import React, { useState, useRef, useEffect } from 'react';
import LineIcon from './LineIcon';
import FadeIn from './FadeIn';
import ChatMarkdown from './ChatMarkdown';
import { sendMessageToGemini, SaplingResponse, submitContactRequest } from '../backend';
import { Message } from '../types';

interface ActionCard {
  type: 'contact' | 'quote' | 'demo' | 'email';
  title: string;
  description: string;
  icon: string;
}

interface ExtendedMessage extends Message {
  actions?: ActionCard[];
}

interface AiAgentPageProps {
  onBack: () => void;
  onContact: () => void;
  onWebDev?: () => void;
  onMarketing?: () => void;
  onIndustries?: () => void;
}

const AiAgentPage: React.FC<AiAgentPageProps> = ({ onBack, onContact, onWebDev, onMarketing, onIndustries }) => {
  const serviceLinks = [
    { id: 'web-dev', label: 'Web Development', icon: 'code-1', onClick: onWebDev },
    { id: 'marketing', label: 'Marketing', icon: 'trend-up-1', onClick: onMarketing },
    { id: 'industries', label: 'Industries', icon: 'buildings-1', onClick: onIndustries },
  ];
  // Chat state for the interactive demo
  const [messages, setMessages] = useState<ExtendedMessage[]>([
    { 
      role: 'model', 
      text: "Hi! I'm Sapling, your AI assistant. Try asking me about our web development services, AI agents, or how we can help grow your business!",
      actions: [
        { type: 'quote', title: 'Get a Quote', description: 'Free estimate', icon: 'calculator-1' },
        { type: 'demo', title: 'Book a Demo', description: 'See it live', icon: 'calendar-days' },
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState<ActionCard | null>(null);
  const [requestForm, setRequestForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showRequestForm]);

  const handleActionClick = (action: ActionCard) => {
    setShowRequestForm(action);
    setFormSubmitted(false);
    setRequestForm({ name: '', email: '', phone: '', message: '' });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that at least one contact method is provided
    if (!requestForm.name?.trim() && !requestForm.email?.trim() && !requestForm.phone?.trim()) {
      return;
    }
    
    if (isSubmittingForm) return;
    
    setIsSubmittingForm(true);
    
    try {
      await submitContactRequest({
        name: requestForm.name?.trim(),
        email: requestForm.email?.trim(),
        phone: requestForm.phone?.trim(),
        requestType: showRequestForm?.type || 'contact',
        message: `[${showRequestForm?.title || 'Contact'}] ${requestForm.message || 'No additional message provided.'}`.trim(),
      });
    
    setFormSubmitted(true);
    
    setTimeout(() => {
      const contactMethods = [];
      if (requestForm.email) contactMethods.push(requestForm.email);
      if (requestForm.phone) contactMethods.push(requestForm.phone);
      const contactInfo = contactMethods.length > 0 ? ` We'll reach out to you at ${contactMethods.join(' or ')} within 24 hours.` : ' We\'ll be in touch soon!';
      
      setMessages(prev => [...prev, {
        role: 'model',
          text: `Thanks${requestForm.name ? ` ${requestForm.name}` : ''}! 🎉 We've received your ${showRequestForm?.title?.toLowerCase() || 'contact'} request.${contactInfo}`
      }]);
      setShowRequestForm(null);
        setRequestForm({ name: '', email: '', phone: '', message: '' });
    }, 1500);
    } catch (error) {
      console.error("Contact request error:", error);
      setMessages(prev => [...prev, {
        role: 'model',
        text: "Sorry, there was an issue sending your request. Please try again or contact us directly at grovesolutions.contact@gmail.com"
      }]);
      setShowRequestForm(null);
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    const newHistory: ExtendedMessage[] = [...messages, { role: 'user', text: userMessage }];
    setMessages(newHistory);

    try {
      // Pass user info if we have it from a previous form submission
      const userInfo = requestForm.name && requestForm.email 
        ? { name: requestForm.name, email: requestForm.email, phone: requestForm.phone }
        : undefined;
      
      const response: SaplingResponse = await sendMessageToGemini(userMessage, newHistory, userInfo);
      
      // Handle agentic actions
      if (response.action === 'collect_info') {
        // AI wants to collect user info - show the form automatically
        const requestType = response.requestType || 'contact';
        const actionCard: ActionCard = {
          type: requestType as ActionCard['type'],
          title: requestType === 'quote' ? 'Get a Quote' : requestType === 'demo' ? 'Book a Demo' : 'Contact Us',
          description: requestType === 'quote' ? 'Free estimate' : requestType === 'demo' ? 'See it live' : 'Send a message',
          icon: requestType === 'quote' ? 'calculator-1' : requestType === 'demo' ? 'calendar-days' : 'envelope-1',
        };
        
        setMessages(prev => [...prev, { role: 'model', text: response.text }]);
        setShowRequestForm(actionCard);
        setFormSubmitted(false);
        setRequestForm({ name: '', email: '', phone: '', message: '' });
      } else if (response.action === 'email_sent') {
        // AI successfully sent an email!
        setMessages(prev => [...prev, { 
          role: 'model', 
          text: response.text + (response.emailSuccess ? ' ✅' : '')
        }]);
      } else {
        // Normal response - check if it might need action cards
        const needsActions = response.text.toLowerCase().includes('contact') || 
                            response.text.toLowerCase().includes('quote') ||
                            response.text.toLowerCase().includes('demo') ||
                            response.text.toLowerCase().includes('get in touch') ||
                            response.text.toLowerCase().includes('help you');
      
      const newMessage: ExtendedMessage = {
        role: 'model',
          text: response.text,
        ...(needsActions && {
          actions: [
            { type: 'contact', title: 'Contact Us', description: 'Send a message', icon: 'envelope-1' },
            { type: 'quote', title: 'Get a Quote', description: 'Free estimate', icon: 'calculator-1' },
          ]
        })
      };
      
      setMessages(prev => [...prev, newMessage]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "Sorry, I'm having trouble connecting right now. Try the quick actions below!", 
        actions: [
          { type: 'contact', title: 'Contact Us', description: 'Send a message', icon: 'envelope-1' },
        ]
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: "alarm-1",
      title: "24/7 Instant Response",
      desc: "5 minutes. That's how long before a lead goes cold. Our agents respond in seconds, capturing 100% of opportunities."
    },
    {
      icon: "comment-1",
      title: "Natural Conversation",
      desc: "Gone are robotic menus. Our agents understand context, nuance, and intent—speaking like humans would."
    },
    {
      icon: "database-2",
      title: "CRM Integration",
      desc: "Every interaction logged, transcribed, and organized automatically. No lost sticky notes or forgotten callbacks."
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

        <div className="max-w-3xl mb-10 md:mb-14">
          <FadeIn>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-100 dark:bg-brand-500/15 mb-4 text-brand-600 dark:text-brand-400">
              <LineIcon name="comment-1" className="text-base" />
              <span className="text-[10px] font-medium uppercase tracking-wider">Proprietary Tech</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-neutral-800 dark:text-neutral-100 mb-3 md:mb-4 leading-tight">
              An Employee That{' '}
              <span className="text-leaf-shiny">Never Sleeps.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed mb-5 md:mb-6">
              Our Proprietary Answering Agents aren't chatbots. They're intelligent systems trained on your business data to handle calls, texts, and bookings 24/7/365.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <button 
              onClick={onContact}
              className="btn-leaf px-5 md:px-6 py-2 md:py-2.5 rounded-lg font-medium text-sm inline-flex items-center gap-2"
            >
              Deploy Your Agent
              <LineIcon name="arrow-right" className="text-base" />
            </button>
          </FadeIn>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 items-center mb-12 md:mb-16">
            <div className="space-y-4 md:space-y-5">
                {features.map((item, i) => (
                    <FadeIn key={i} delay={i * 100}>
                      <div className="flex gap-3 p-4 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 shadow-sm hover:shadow-md dark:shadow-none transition-all hover:border-neutral-300 dark:hover:border-neutral-600">
                          <div className="w-9 h-9 rounded-lg bg-brand-100 dark:bg-brand-500/15 flex items-center justify-center shrink-0">
                              <LineIcon name={item.icon} className="text-lg text-brand-600 dark:text-brand-400" />
                          </div>
                          <div>
                              <h3 className="text-sm font-display font-semibold text-neutral-900 dark:text-neutral-100 mb-1">{item.title}</h3>
                              <p className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed">{item.desc}</p>
                          </div>
                      </div>
                    </FadeIn>
                ))}
            </div>
            
            <div className="relative">
                <FadeIn delay={400}>
                  <div className="bg-white dark:bg-neutral-800 rounded-xl relative overflow-hidden flex flex-col h-[360px] md:h-[400px] border border-neutral-200/80 dark:border-neutral-700 shadow-sm">
                      {/* Header */}
                      <div className="flex items-center justify-between p-3 md:p-4 border-b border-neutral-200 dark:border-neutral-700">
                          <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-red-400"></div>
                              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                              <div className="w-2 h-2 rounded-full bg-green-400"></div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-neutral-500 dark:text-neutral-400 text-[10px] font-medium">Live Demo</span>
                          </div>
                      </div>
                      
                      {/* Messages Area */}
                      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-50 dark:bg-neutral-900 scroll-smooth">
                          {messages.map((msg, idx) => (
                            <div key={idx} className="space-y-2">
                              <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                              <div 
                                  className={`max-w-[85%] px-4 py-2.5 text-[13px] leading-relaxed ${
                                  msg.role === 'user' 
                                      ? 'bg-brand-500 text-white rounded-[20px] rounded-br-md shadow-sm' 
                                      : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 rounded-[20px] rounded-bl-md shadow-sm'
                                }`}
                              >
                                <ChatMarkdown text={msg.text} isUser={msg.role === 'user'} />
                                </div>
                              </div>
                              
                              {/* Action Cards */}
                              {msg.actions && msg.actions.length > 0 && (
                                <div className="flex gap-1.5 pl-1 flex-wrap">
                                  {msg.actions.map((action, actionIdx) => (
                                    <button
                                      key={actionIdx}
                                      onClick={() => handleActionClick(action)}
                                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-brand-50 dark:bg-brand-900/20 hover:bg-brand-100 dark:hover:bg-brand-900/30 border border-brand-200 dark:border-brand-800/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                      <div className="w-5 h-5 rounded-full bg-brand-500/10 flex items-center justify-center">
                                        <LineIcon name={action.icon} className="text-[10px] text-brand-600 dark:text-brand-400" />
                                      </div>
                                      <span className="text-[11px] font-medium text-brand-700 dark:text-brand-300">{action.title}</span>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                          
                          {/* Request Form */}
                          {showRequestForm && (
                            <div className="bg-white dark:bg-neutral-800 rounded-xl p-3 shadow-sm border border-neutral-200 dark:border-neutral-700">
                              {!formSubmitted ? (
                                <>
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-1.5">
                                      <div className="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                                        <LineIcon name={showRequestForm.icon} className="text-xs text-brand-600" />
                                      </div>
                                      <h4 className="font-medium text-xs text-neutral-800 dark:text-neutral-200">{showRequestForm.title}</h4>
                                    </div>
                                    <button 
                                      onClick={() => setShowRequestForm(null)}
                                      className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                                    >
                                      <LineIcon name="xmark" className="text-xs" />
                                    </button>
                                  </div>
                                  <form onSubmit={handleFormSubmit} className="space-y-2">
                                    <input
                                      type="text"
                                      placeholder="Your name"
                                      value={requestForm.name}
                                      onChange={(e) => setRequestForm(prev => ({ ...prev, name: e.target.value }))}
                                      className="chat-input-clean w-full px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-xs text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400"
                                    />
                                    <input
                                      type="email"
                                      placeholder="Your email"
                                      value={requestForm.email}
                                      onChange={(e) => setRequestForm(prev => ({ ...prev, email: e.target.value }))}
                                      className="chat-input-clean w-full px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-xs text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400"
                                    />
                                    <input
                                      type="tel"
                                      placeholder="Your phone"
                                      value={requestForm.phone}
                                      onChange={(e) => setRequestForm(prev => ({ ...prev, phone: e.target.value }))}
                                      className="chat-input-clean w-full px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-xs text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400"
                                    />
                                    <textarea
                                      placeholder="Tell us about your project (optional)"
                                      value={requestForm.message}
                                      onChange={(e) => setRequestForm(prev => ({ ...prev, message: e.target.value }))}
                                      className="chat-input-clean w-full px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-xs text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 resize-none h-12"
                                    />
                                    <button
                                      type="submit"
                                      disabled={isSubmittingForm}
                                      className="w-full py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                      {isSubmittingForm ? (
                                        <>
                                          <LineIcon name="spinner-3" className="text-[10px] lni-is-spinning" />
                                          Sending...
                                        </>
                                      ) : (
                                        <>
                                      <LineIcon name="enter" className="text-[10px]" />
                                      Send Request
                                        </>
                                      )}
                                    </button>
                                  </form>
                                </>
                              ) : (
                                <div className="text-center py-3">
                                  <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mx-auto mb-2">
                                    <LineIcon name="check-circle-1" className="text-base text-brand-500" />
                                  </div>
                                  <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200">Request sent!</p>
                                  <p className="text-[10px] text-neutral-500 mt-0.5">We'll be in touch soon</p>
                                </div>
                              )}
                            </div>
                          )}
                          
                          {isLoading && (
                            <div className="flex justify-start pl-1">
                                <div className="flex gap-1">
                                  <span className="w-2 h-2 rounded-full bg-brand-400 animate-bounce [animation-delay:-0.3s]"></span>
                                  <span className="w-2 h-2 rounded-full bg-brand-400 animate-bounce [animation-delay:-0.15s]"></span>
                                  <span className="w-2 h-2 rounded-full bg-brand-400 animate-bounce"></span>
                              </div>
                            </div>
                          )}
                      </div>

                      {/* Input Area */}
                      <div className="p-3 bg-white dark:bg-neutral-800">
                        <form onSubmit={handleSubmit} className="flex items-center gap-2 rounded-full px-4 py-2 bg-neutral-100 dark:bg-neutral-900">
                        <input
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                            placeholder={isLoading ? "Waiting for response..." : "Type a message..."}
                            disabled={isLoading}
                            className="chat-input-clean flex-1 bg-transparent text-neutral-800 dark:text-neutral-100 text-sm min-w-0 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 disabled:opacity-50"
                        />
                        <button 
                          type="submit"
                          disabled={isLoading || !input.trim()}
                            className="chat-input-clean flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-brand-500 hover:bg-brand-600 text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                          aria-label="Send message"
                        >
                            <LineIcon name="arrow-upward" className="text-sm" />
                        </button>
                      </form>
                      </div>
                  </div>
                </FadeIn>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AiAgentPage;
