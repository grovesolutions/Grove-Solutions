// Backend module exports
export { 
  initializeFirebase, 
  getFirebaseApp, 
  getFirebaseAnalytics,
  getFirebaseFunctions 
} from './firebase';

export { 
  sendMessageToGemini,
  resetChatSession,
  initializeChat
} from './geminiService';
