import React, { useState, useRef, useEffect } from 'react';
import LineIcon from './LineIcon';
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

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messages, setMessages] = useState<ExtendedMessage[]>([
    { 
      role: 'model', 
      text: "Hey! 👋 I'm Sapling, your AI assistant. How can I help you today?",
      actions: [
        { type: 'quote', title: 'Get a Quote', description: 'Free project estimate', icon: 'calculator-1' },
        { type: 'demo', title: 'Book a Demo', description: 'See our solutions', icon: 'calendar-days' },
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState<ActionCard | null>(null);
  const [requestForm, setRequestForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, showRequestForm]);

  useEffect(() => {
    if (isFullscreen && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen, isOpen]);

  const containerClasses = isFullscreen 
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm"
    : "fixed bottom-4 right-4 md:bottom-5 md:right-5 z-50 flex flex-col items-end";

  const chatWindowClasses = isFullscreen
    ? "w-full h-full sm:h-[calc(100vh-2rem)] sm:w-[min(960px,calc(100vw-2rem))] md:w-[min(1100px,calc(100vw-3rem))] md:h-[calc(100vh-3rem)] bg-[var(--bg-primary)] rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ease-out animate-in slide-in-from-bottom-4"
    : "mb-3 w-[calc(100vw-2rem)] sm:w-80 md:w-[24rem] bg-[var(--bg-primary)] rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[70vh] sm:h-[480px] md:h-[520px] max-h-[580px] transition-all duration-300 ease-out animate-in slide-in-from-bottom-4";

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
    
    // Add a confirmation message
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
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting right now. Try the quick actions below!", actions: [
        { type: 'contact', title: 'Contact Us', description: 'Send a message', icon: 'envelope-1' },
      ]}]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={containerClasses}>
      {/* Chat Window */}
      {isOpen && (
        <div className={chatWindowClasses}>
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-500 to-brand-600 p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <LineIcon name="comment-1" className="text-base text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">Sapling AI</h3>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFullscreen(prev => !prev)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                <LineIcon name={isFullscreen ? "exit" : "expand-square-4"} className="text-sm text-white" />
              </button>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  setIsFullscreen(false);
                }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Close chat"
              >
                <LineIcon name="xmark" className="text-sm text-white" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)]">
            {messages.map((msg, idx) => (
              <div key={idx} className="space-y-2">
                <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                    className={`max-w-[85%] px-4 py-2.5 text-[13px] leading-relaxed ${
                    msg.role === 'user' 
                        ? 'bg-brand-500 text-white rounded-[20px] rounded-br-md shadow-sm' 
                        : 'bg-[var(--bg-card)] text-[var(--text-primary)] rounded-[20px] rounded-bl-md shadow-sm'
                  }`}
                >
                  <ChatMarkdown text={msg.text} isUser={msg.role === 'user'} />
                </div>
                </div>
                
                {/* Action Cards */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="flex gap-2 pl-1 flex-wrap">
                    {msg.actions.map((action, actionIdx) => (
                      <button
                        key={actionIdx}
                        onClick={() => handleActionClick(action)}
                        className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-brand-50 dark:bg-brand-900/20 hover:bg-brand-100 dark:hover:bg-brand-900/30 border border-brand-200 dark:border-brand-800/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <div className="w-6 h-6 rounded-full bg-brand-500/10 flex items-center justify-center">
                          <LineIcon name={action.icon} className="text-xs text-brand-600 dark:text-brand-400" />
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-medium text-brand-700 dark:text-brand-300">{action.title}</p>
                          <p className="text-[10px] text-brand-500/70 dark:text-brand-400/60">{action.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Request Form Slide-up */}
            {showRequestForm && (
              <div className="bg-[var(--bg-card)] rounded-2xl p-4 shadow-lg border border-[var(--border-primary)] animate-in slide-in-from-bottom-2">
                {!formSubmitted ? (
                  <>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                          <LineIcon name={showRequestForm.icon} className="text-sm text-brand-600" />
                        </div>
                        <h4 className="font-semibold text-sm text-[var(--text-primary)]">{showRequestForm.title}</h4>
                      </div>
                      <button 
                        onClick={() => setShowRequestForm(null)}
                        className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                      >
                        <LineIcon name="xmark" className="text-sm" />
                      </button>
                    </div>
                    <form onSubmit={handleFormSubmit} className="space-y-3">
                      <input
                        type="text"
                        placeholder="Your name"
                        value={requestForm.name}
                        onChange={(e) => setRequestForm(prev => ({ ...prev, name: e.target.value }))}
                        className="chat-input-clean w-full px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors"
                      />
                      <input
                        type="email"
                        placeholder="Your email"
                        value={requestForm.email}
                        onChange={(e) => setRequestForm(prev => ({ ...prev, email: e.target.value }))}
                        className="chat-input-clean w-full px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors"
                      />
                      <input
                        type="tel"
                        placeholder="Your phone"
                        value={requestForm.phone}
                        onChange={(e) => setRequestForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="chat-input-clean w-full px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors"
                      />
                      <textarea
                        placeholder="Tell us about your project (optional)"
                        value={requestForm.message}
                        onChange={(e) => setRequestForm(prev => ({ ...prev, message: e.target.value }))}
                        className="chat-input-clean w-full px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors resize-none h-16"
                      />
                      <button
                        type="submit"
                        disabled={isSubmittingForm}
                        className="chat-input-clean w-full py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSubmittingForm ? (
                          <>
                            <LineIcon name="spinner-3" className="text-xs lni-is-spinning" />
                            Sending...
                          </>
                        ) : (
                          <>
                        <LineIcon name="enter" className="text-xs" />
                        Send Request
                          </>
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <div className="w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mx-auto mb-3">
                      <LineIcon name="check-circle-1" className="text-2xl text-brand-500" />
                    </div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">Request sent!</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">We'll be in touch soon</p>
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
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-[var(--bg-primary)]">
            <form onSubmit={handleSubmit} className="flex items-center gap-2 rounded-full px-4 py-2 bg-[var(--bg-secondary)]">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isLoading ? "Waiting for response..." : "Type a message..."}
                disabled={isLoading}
                className="chat-input-clean flex-1 bg-transparent text-[var(--text-primary)] text-sm min-w-0 placeholder:text-[var(--text-muted)] disabled:opacity-50"
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
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button 
          onClick={() => {
            setIsFullscreen(false);
            setIsOpen(true);
          }}
          className="btn-leaf px-5 py-2.5 rounded-lg shadow-md shadow-brand-500/25 flex items-center justify-center gap-2"
          aria-label="Open chat"
        >
          <LineIcon name="comment-1" className="text-base text-white" />
          <span className="whitespace-nowrap font-medium text-sm text-white">Chat with Sapling</span>
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
