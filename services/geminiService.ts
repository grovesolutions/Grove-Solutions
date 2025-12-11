// Re-export from backend for backwards compatibility
// New code should import directly from '../backend'
export { sendMessageToGemini, initializeChat, resetChatSession } from '../backend/geminiService';
