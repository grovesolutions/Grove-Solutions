import React, { useState, useRef, useEffect } from 'react';
import LineIcon from './LineIcon';
import { sendMessageToGemini } from '../backend';
import { Message } from '../types';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello! I'm Sapling, your AI assistant. Looking to upgrade your website or automate your business?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

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
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-5 md:right-5 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] sm:w-72 md:w-80 bg-[var(--bg-primary)] rounded-2xl shadow-xl overflow-hidden flex flex-col h-[65vh] sm:h-[420px] max-h-[420px] transition-all duration-300 ease-in-out animate-in slide-in-from-bottom-4 border border-[var(--border-primary)]">
          {/* Header */}
          <div className="bg-brand-500 p-3 flex justify-between items-center relative">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer-card_4s_ease-in-out_infinite]"></div>
            </div>
            <div className="flex items-center gap-2 relative z-10">
              <div className="bg-white/15 w-7 h-7 rounded-full flex items-center justify-center">
                <LineIcon name="comment-1" className="text-sm text-white" />
              </div>
              <h3 className="font-medium text-white text-xs">Sapling AI</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors p-1 relative z-10"
              aria-label="Close chat"
            >
              <LineIcon name="xmark" className="text-base" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5 bg-[var(--bg-secondary)]">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-2.5 rounded-lg text-xs leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-brand-500 text-white rounded-br-none' 
                      : 'bg-[var(--bg-card)] text-[var(--text-primary)] rounded-bl-none border border-[var(--border-primary)]'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[var(--bg-card)] p-2.5 rounded-lg rounded-bl-none border border-[var(--border-primary)]">
                  <LineIcon name="spinner-3" className="text-sm lni-is-spinning text-brand-500" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Sapling Style */}
          <div className="p-3 bg-[var(--bg-secondary)]">
            <form onSubmit={handleSubmit} className="flex items-center gap-2 rounded-full px-3 py-1.5 bg-[var(--bg-card)] border border-[var(--border-primary)]">
              {/* Input Field */}
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything"
                className="flex-1 bg-transparent text-[var(--text-primary)] text-sm focus:outline-none min-w-0"
              />
              
              {/* Send Button - Arrow Up */}
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-[var(--bg-highlight)] hover:bg-[var(--border-secondary)] text-[var(--text-secondary)] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
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
          onClick={() => setIsOpen(true)}
          className="btn-leaf h-11 px-4 rounded-xl shadow-lg transition-all duration-300 ease-out hover:scale-[1.02] flex items-center justify-center gap-2"
          aria-label="Open chat"
        >
          <LineIcon name="comment-1" className="text-base text-white" />
          <span className="whitespace-nowrap font-medium text-xs text-white">Try our AI</span>
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
