import { getFunctions, httpsCallable } from "firebase/functions";
import { Message } from "../types";
import { getFirebaseApp } from "./firebase";

// Interface for the function response
interface ChatResponse {
  success: boolean;
  response: string;
  action?: 'collect_info' | 'email_sent';
  requestType?: string;
  emailSuccess?: boolean;
}

// Extended response type for frontend
export interface SaplingResponse {
  text: string;
  action?: 'collect_info' | 'email_sent';
  requestType?: string;
  emailSuccess?: boolean;
}

// Reset function (for compatibility - no-op since state is server-side)
export const resetChatSession = (): void => {
  // Chat state is managed server-side in Firebase Functions
  // This is a no-op for API compatibility
};

// Initialize chat (for compatibility - returns void)
export const initializeChat = (): void => {
  // Initialization happens via Firebase Functions
  // This is kept for API compatibility
};

// User info interface
interface UserInfo {
  name?: string;
  email?: string;
}

/**
 * Sends a message to the Sapling AI via Firebase Functions
 * The system instructions and API key are securely stored server-side
 * Now supports agentic tool calling for emails
 */
export const sendMessageToGemini = async (
  text: string, 
  history: Message[],
  userInfo?: UserInfo
): Promise<SaplingResponse> => {
  try {
    // Basic input validation
    const sanitizedText = text.trim().slice(0, 2000);
    
    if (!sanitizedText) {
      return { text: "I didn't catch that. How can I help you with your digital presence today?" };
    }

    // Get Firebase Functions instance
    const app = getFirebaseApp();
    const functions = getFunctions(app);
    
    // Call the Firebase Function
    const chatWithSapling = httpsCallable<
      { message: string; history: Message[]; userInfo?: UserInfo },
      ChatResponse
    >(functions, "chatWithSapling");

    const result = await chatWithSapling({
      message: sanitizedText,
      history: history.map(msg => ({
        role: msg.role,
        text: msg.text,
      })),
      userInfo,
    });

    if (result.data.success) {
      return {
        text: result.data.response,
        action: result.data.action,
        requestType: result.data.requestType,
        emailSuccess: result.data.emailSuccess,
      };
    }
    
    return { text: "I'm processing that. Could you rephrase your question about our services?" };
  } catch (error: any) {
    console.error("Chat Error:", error);
    console.error("Error details:", error?.code, error?.message, error?.details);
    throw error;
  }
};
