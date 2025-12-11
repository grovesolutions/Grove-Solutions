import React, { useState, useRef, useEffect } from 'react';
import LineIcon from './LineIcon';
import FadeIn from './FadeIn';
import { sendMessageToGemini } from '../backend';
import { Message } from '../types';

interface AiAgentPageProps {
  onBack: () => void;
  onContact: () => void;
}

const AiAgentPage: React.FC<AiAgentPageProps> = ({ onBack, onContact }) => {
  // Chat state for the interactive demo
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi! I'm Sapling, your AI assistant. Try asking me about our web development services, AI agents, or how we can help grow your business!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    const newHistory: Message[] = [...messages, { role: 'user', text: userMessage }];
    setMessages(newHistory);

    try {
      const responseText = await sendMessageToGemini(userMessage, newHistory);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting right now. Please try again!" }]);
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
              <LineIcon name="comment-1" className="text-sm" />
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
                      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 bg-neutral-50 dark:bg-neutral-900">
                          {messages.map((msg, idx) => (
                            <div 
                              key={idx} 
                              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div 
                                className={`max-w-[85%] p-3 rounded-lg text-xs leading-relaxed ${
                                  msg.role === 'user' 
                                    ? 'bg-brand-500 text-white rounded-br-none' 
                                    : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 rounded-bl-none border border-neutral-200 dark:border-neutral-700'
                                }`}
                              >
                                {msg.text}
                              </div>
                            </div>
                          ))}
                          {isLoading && (
                            <div className="flex justify-start">
                              <div className="bg-white dark:bg-neutral-800 p-3 rounded-lg rounded-bl-none border border-neutral-200 dark:border-neutral-700">
                                <LineIcon name="spinner-3" className="text-sm lni-is-spinning text-brand-500" />
                              </div>
                            </div>
                          )}
                          <div ref={messagesEndRef} />
                      </div>

                      {/* Input Area */}
                      <form onSubmit={handleSubmit} className="p-3 bg-neutral-50 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 flex gap-2">
                        <input
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="Try asking Sapling a question..."
                          className="flex-1 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 text-xs rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-colors border border-neutral-200 dark:border-neutral-700"
                        />
                        <button 
                          type="submit"
                          disabled={isLoading || !input.trim()}
                          className="bg-brand-500 hover:bg-brand-600 text-white px-3 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                          aria-label="Send message"
                        >
                          <span className="hidden sm:inline text-xs font-medium">Send</span>
                          <LineIcon name="location-arrow-right" className="text-sm" />
                        </button>
                      </form>
                  </div>
                </FadeIn>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AiAgentPage;
