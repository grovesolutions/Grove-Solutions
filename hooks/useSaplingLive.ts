/**
 * useSaplingLive - React hook for Gemini Live API voice interactions
 * Uses ephemeral tokens for secure client-side API access
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { GoogleGenAI, Modality, Session } from '@google/genai';
import { AudioPlaybackQueue, decodeBase64Audio } from '../lib/AudioPlaybackQueue';
import { getFirebaseApp } from '../backend/firebase';

export interface SaplingLiveConfig {
  systemInstruction?: string;
  voiceName?: string;
}

export interface SaplingLiveMessage {
  type: 'user' | 'assistant' | 'system' | 'error';
  content: string;
  timestamp: number;
}

export interface UseSaplingLiveReturn {
  isConnected: boolean;
  isConnecting: boolean;
  isRecording: boolean;
  isAISpeaking: boolean;
  messages: SaplingLiveMessage[];
  error: string | null;
  connect: (config?: SaplingLiveConfig) => Promise<void>;
  disconnect: () => void;
  sendText: (text: string) => void;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  stopAudio: () => void;
  clearMessages: () => void;
}

export const useSaplingLive = (): UseSaplingLiveReturn => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [messages, setMessages] = useState<SaplingLiveMessage[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Refs for managing resources
  const sessionRef = useRef<Session | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const audioPlaybackQueueRef = useRef<AudioPlaybackQueue | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const configRef = useRef<SaplingLiveConfig>({});
  const textBufferRef = useRef<string>('');

  // Cleanup function
  const cleanup = useCallback(() => {
    // Stop recording
    if (workletNodeRef.current) {
      workletNodeRef.current.disconnect();
      workletNodeRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }

    // Stop audio playback
    if (audioPlaybackQueueRef.current) {
      audioPlaybackQueueRef.current.stop();
      audioPlaybackQueueRef.current = null;
    }

    // Close audio contexts
    if (audioContextRef.current?.state !== 'closed') {
      audioContextRef.current?.close().catch(() => {});
    }
    audioContextRef.current = null;

    if (inputAudioContextRef.current?.state !== 'closed') {
      inputAudioContextRef.current?.close().catch(() => {});
    }
    inputAudioContextRef.current = null;

    // Close session
    if (sessionRef.current) {
      try {
        sessionRef.current.close();
      } catch (e) {
        // Session may already be closed
      }
      sessionRef.current = null;
    }

    setIsConnected(false);
    setIsRecording(false);
    setIsAISpeaking(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  // Add message helper
  const addMessage = useCallback((type: SaplingLiveMessage['type'], content: string) => {
    setMessages(prev => [...prev, {
      type,
      content,
      timestamp: Date.now()
    }]);
  }, []);

  // Connect to Gemini Live API
  const connect = useCallback(async (config?: SaplingLiveConfig) => {
    if (isConnecting || isConnected) return;

    setIsConnecting(true);
    setError(null);
    configRef.current = config || {};

    try {
      // Get ephemeral token from Firebase Function
      getFirebaseApp(); // Ensure Firebase is initialized
      const functions = getFunctions();
      const createToken = httpsCallable(functions, 'createSaplingLiveToken');
      
      const result = await createToken({
        systemInstruction: config?.systemInstruction
      });

      const tokenData = result.data as {
        token: string;
        model: string;
        systemInstruction: string;
        expireTime: string;
      };

      // Initialize audio context for playback (24kHz for Gemini output)
      audioContextRef.current = new AudioContext({ sampleRate: 24000 });

      // Initialize audio playback queue
      audioPlaybackQueueRef.current = new AudioPlaybackQueue(
        audioContextRef.current,
        24000,
        () => setIsAISpeaking(true),
        () => setIsAISpeaking(false)
      );

      // Initialize Google GenAI client with ephemeral token
      const ai = new GoogleGenAI({
        apiKey: tokenData.token
      });

      // Configure session
      const sessionConfig: any = {
        responseModalities: [Modality.AUDIO],
        systemInstruction: tokenData.systemInstruction,
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: config?.voiceName || 'Aoede' // Default warm, friendly voice
            }
          }
        }
      };

      // Connect to Live API
      const session = await ai.live.connect({
        model: tokenData.model,
        config: sessionConfig,
        callbacks: {
          onopen: () => {
            console.log('Sapling Live: Connected');
            setIsConnected(true);
            setIsConnecting(false);
            addMessage('system', 'Connected to Sapling AI');
          },
          onclose: (event: any) => {
            console.log('Sapling Live: Disconnected', event);
            cleanup();
            addMessage('system', 'Disconnected from Sapling AI');
          },
          onerror: (error: any) => {
            console.error('Sapling Live: Error', error);
            setError(error?.message || 'Connection error occurred');
            cleanup();
          },
          onmessage: (message: any) => {
            // Handle text responses
            if (message.text) {
              textBufferRef.current += message.text;
            }

            // Handle audio responses
            if (message.data) {
              try {
                const audioData = decodeBase64Audio(message.data);
                audioPlaybackQueueRef.current?.addToQueue(audioData);
              } catch (e) {
                console.error('Error processing audio:', e);
              }
            }

            // Handle turn completion
            if (message.serverContent?.turnComplete) {
              if (textBufferRef.current.trim()) {
                addMessage('assistant', textBufferRef.current.trim());
                textBufferRef.current = '';
              }
            }

            // Handle input transcription
            if (message.serverContent?.inputTranscription?.text) {
              addMessage('user', message.serverContent.inputTranscription.text);
            }
          }
        }
      });

      sessionRef.current = session;

    } catch (err: any) {
      console.error('Sapling Live: Connection failed', err);
      setError(err?.message || 'Failed to connect');
      cleanup();
      setIsConnecting(false);
    }
  }, [isConnecting, isConnected, cleanup, addMessage]);

  // Disconnect from Gemini Live API
  const disconnect = useCallback(() => {
    cleanup();
  }, [cleanup]);

  // Send text message
  const sendText = useCallback((text: string) => {
    if (!sessionRef.current || !isConnected) {
      console.warn('Cannot send text: not connected');
      return;
    }

    try {
      // Stop any playing audio
      audioPlaybackQueueRef.current?.clear();
      audioPlaybackQueueRef.current?.reset();
      setIsAISpeaking(false);

      // Add user message
      addMessage('user', text);

      // Send to Live API
      sessionRef.current.sendClientContent({
        turns: [{ role: 'user', parts: [{ text }] }],
        turnComplete: true
      });
    } catch (err: any) {
      console.error('Error sending text:', err);
      setError('Failed to send message');
    }
  }, [isConnected, addMessage]);

  // Start recording from microphone
  const startRecording = useCallback(async () => {
    if (!sessionRef.current || !isConnected || isRecording) {
      console.warn('Cannot start recording');
      return;
    }

    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true
        }
      });

      mediaStreamRef.current = stream;

      // Create audio context for input (native sample rate, will resample)
      inputAudioContextRef.current = new AudioContext();
      
      // Load audio worklet
      await inputAudioContextRef.current.audioWorklet.addModule('/audio-worklet-processor.js');

      // Create source from microphone stream
      const source = inputAudioContextRef.current.createMediaStreamSource(stream);

      // Create worklet node
      const workletNode = new AudioWorkletNode(inputAudioContextRef.current, 'recorder-processor');
      workletNodeRef.current = workletNode;

      // Handle audio data from worklet
      workletNode.port.onmessage = (event) => {
        if (event.data.type === 'audio' && sessionRef.current) {
          try {
            // Send audio to Gemini Live
            const base64Audio = arrayBufferToBase64(event.data.data);
            sessionRef.current.sendRealtimeInput({
              audio: {
                data: base64Audio,
                mimeType: 'audio/pcm;rate=16000'
              }
            });
          } catch (e) {
            console.error('Error sending audio:', e);
          }
        }
      };

      // Connect the audio graph
      source.connect(workletNode);
      
      setIsRecording(true);

    } catch (err: any) {
      console.error('Error starting recording:', err);
      setError(err?.message || 'Failed to access microphone');
    }
  }, [isConnected, isRecording]);

  // Stop recording
  const stopRecording = useCallback(() => {
    if (workletNodeRef.current) {
      workletNodeRef.current.disconnect();
      workletNodeRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }

    if (inputAudioContextRef.current?.state !== 'closed') {
      inputAudioContextRef.current?.close().catch(() => {});
    }
    inputAudioContextRef.current = null;

    setIsRecording(false);
  }, []);

  // Stop AI audio playback
  const stopAudio = useCallback(() => {
    audioPlaybackQueueRef.current?.clear();
    audioPlaybackQueueRef.current?.reset();
    setIsAISpeaking(false);
  }, []);

  // Clear messages
  const clearMessages = useCallback(() => {
    setMessages([]);
    textBufferRef.current = '';
  }, []);

  return {
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
  };
};

// Helper function to convert ArrayBuffer to base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export default useSaplingLive;
