/**
 * VoiceChat - AI Receptionist Voice Chat Component
 * Uses Gemini Live API via ephemeral tokens for secure voice interactions
 */

import React, { useState, useRef, useEffect } from 'react';
import { useSaplingLive, SaplingLiveMessage } from '../hooks/useSaplingLive';

interface VoiceChatProps {
  className?: string;
}

// Available AI voices
const VOICE_OPTIONS = [
  { id: 'Aoede', name: 'Aoede', description: 'Warm & friendly' },
  { id: 'Charon', name: 'Charon', description: 'Professional & calm' },
  { id: 'Fenrir', name: 'Fenrir', description: 'Energetic & bold' },
  { id: 'Kore', name: 'Kore', description: 'Soft & welcoming' },
  { id: 'Puck', name: 'Puck', description: 'Lively & engaging' },
];

export const VoiceChat: React.FC<VoiceChatProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('Aoede');
  const [showSettings, setShowSettings] = useState(false);
  const [textInput, setTextInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    isConnected,
    isConnecting,
    isRecording,
    isAISpeaking,
    messages,
    error,
    connect,
    disconnect,
    sendText,
    startRecording,
    stopRecording,
    stopAudio,
    clearMessages
  } = useSaplingLive();

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle opening the voice chat
  const handleOpen = async () => {
    setIsOpen(true);
    if (!isConnected && !isConnecting) {
      await connect({ voiceName: selectedVoice });
    }
  };

  // Handle closing the voice chat
  const handleClose = () => {
    setIsOpen(false);
    disconnect();
    clearMessages();
  };

  // Toggle microphone
  const handleMicToggle = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      await startRecording();
    }
  };

  // Send text message
  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim() && isConnected) {
      sendText(textInput.trim());
      setTextInput('');
    }
  };

  // Reconnect with new voice
  const handleVoiceChange = async (voiceId: string) => {
    setSelectedVoice(voiceId);
    if (isConnected) {
      disconnect();
      setTimeout(() => {
        connect({ voiceName: voiceId });
      }, 500);
    }
  };

  // Format timestamp
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  // Message component
  const MessageBubble = ({ message }: { message: SaplingLiveMessage }) => {
    const isUser = message.type === 'user';
    const isSystem = message.type === 'system';
    const isError = message.type === 'error';

    if (isSystem) {
      return (
        <div className="flex justify-center my-2">
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {message.content}
          </span>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="flex justify-center my-2">
          <span className="text-xs text-red-600 bg-red-50 px-3 py-1 rounded-full">
            {message.content}
          </span>
        </div>
      );
    }

    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
        <div
          className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${
            isUser
              ? 'bg-emerald-600 text-white rounded-br-md'
              : 'bg-gray-100 text-gray-800 rounded-bl-md'
          }`}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
          <span className={`text-[10px] mt-1 block ${isUser ? 'text-emerald-200' : 'text-gray-400'}`}>
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Floating Voice Button */}
      <button
        onClick={handleOpen}
        className={`fixed bottom-6 right-24 z-50 w-14 h-14 bg-gradient-to-r from-emerald-500 to-emerald-600 
          rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110
          flex items-center justify-center group ${className}`}
        aria-label="Open voice chat"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-white"
        >
          <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10a1 1 0 0 0-2 0 5 5 0 1 1-10 0 1 1 0 0 0-2 0 7 7 0 0 0 6 6.92V20H8a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2h-3v-3.08A7 7 0 0 0 19 10Z" />
        </svg>
        
        {/* Pulse animation when not open */}
        {!isOpen && (
          <span className="absolute w-full h-full rounded-full bg-emerald-400 animate-ping opacity-30" />
        )}
      </button>

      {/* Voice Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md mx-4 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                      <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                      <path d="M19 10a1 1 0 0 0-2 0 5 5 0 1 1-10 0 1 1 0 0 0-2 0 7 7 0 0 0 6 6.92V20H8a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2h-3v-3.08A7 7 0 0 0 19 10Z" />
                    </svg>
                  </div>
                  {/* Connection indicator */}
                  <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                    isConnected ? 'bg-green-400' : isConnecting ? 'bg-yellow-400 animate-pulse' : 'bg-gray-400'
                  }`} />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Sapling AI</h3>
                  <p className="text-emerald-100 text-xs">
                    {isAISpeaking ? 'Speaking...' : isRecording ? 'Listening...' : isConnected ? 'Ready' : isConnecting ? 'Connecting...' : 'Offline'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Settings button */}
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Settings"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                    <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Close"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
              <div className="bg-gray-50 px-5 py-4 border-b">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Voice Settings</h4>
                <div className="grid grid-cols-2 gap-2">
                  {VOICE_OPTIONS.map((voice) => (
                    <button
                      key={voice.id}
                      onClick={() => handleVoiceChange(voice.id)}
                      className={`px-3 py-2 rounded-lg text-left transition-all ${
                        selectedVoice === voice.id
                          ? 'bg-emerald-100 border-2 border-emerald-500 text-emerald-700'
                          : 'bg-white border border-gray-200 hover:border-emerald-300'
                      }`}
                    >
                      <span className="font-medium text-sm">{voice.name}</span>
                      <span className="text-xs text-gray-500 block">{voice.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 px-5 py-3 border-b border-red-100">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 min-h-[300px] max-h-[400px]">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-emerald-600">
                      <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                      <path d="M19 10a1 1 0 0 0-2 0 5 5 0 1 1-10 0 1 1 0 0 0-2 0 7 7 0 0 0 6 6.92V20H8a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2h-3v-3.08A7 7 0 0 0 19 10Z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Talk to Sapling</h4>
                  <p className="text-sm text-gray-500">
                    {isConnected 
                      ? 'Click the microphone to start speaking, or type a message below.' 
                      : isConnecting 
                        ? 'Connecting to Sapling AI...'
                        : 'Getting ready...'}
                  </p>
                </div>
              ) : (
                <>
                  {messages.map((message, index) => (
                    <MessageBubble key={index} message={message} />
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t bg-gray-50 px-4 py-4">
              {/* Voice Controls */}
              <div className="flex items-center justify-center gap-4 mb-3">
                {/* Stop AI */}
                {isAISpeaking && (
                  <button
                    onClick={stopAudio}
                    className="p-3 bg-red-100 hover:bg-red-200 rounded-full transition-colors"
                    aria-label="Stop AI speaking"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-600">
                      <path fillRule="evenodd" d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}

                {/* Microphone Button */}
                <button
                  onClick={handleMicToggle}
                  disabled={!isConnected || isConnecting}
                  className={`p-5 rounded-full transition-all shadow-lg ${
                    isRecording
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                      : isConnected
                        ? 'bg-emerald-500 hover:bg-emerald-600'
                        : 'bg-gray-300 cursor-not-allowed'
                  }`}
                  aria-label={isRecording ? 'Stop recording' : 'Start recording'}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                    {isRecording ? (
                      <path fillRule="evenodd" d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z" clipRule="evenodd" />
                    ) : (
                      <>
                        <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                        <path d="M19 10a1 1 0 0 0-2 0 5 5 0 1 1-10 0 1 1 0 0 0-2 0 7 7 0 0 0 6 6.92V20H8a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2h-3v-3.08A7 7 0 0 0 19 10Z" />
                      </>
                    )}
                  </svg>
                </button>
              </div>

              {/* Text Input */}
              <form onSubmit={handleSendText} className="flex gap-2">
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Or type a message..."
                  disabled={!isConnected}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
                />
                <button
                  type="submit"
                  disabled={!isConnected || !textInput.trim()}
                  className="px-4 py-2.5 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceChat;
