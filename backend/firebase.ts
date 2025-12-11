import { initializeApp, FirebaseApp, getApps } from "firebase/app";
import { getAnalytics, Analytics, isSupported } from "firebase/analytics";
import { getFunctions, Functions } from "firebase/functions";

// Firebase configuration for Grove Solutions
const firebaseConfig = {
  apiKey: "AIzaSyB8EF4IfQ3ziVDmB42E5xQyOPYQX4ZV-Kw",
  authDomain: "grove-solutions.firebaseapp.com",
  projectId: "grove-solutions",
  storageBucket: "grove-solutions.firebasestorage.app",
  messagingSenderId: "293837600222",
  appId: "1:293837600222:web:bb7d7faf6d0f239520194f",
  measurementId: "G-04WWFSK0PE"
};

// Initialize Firebase
let app: FirebaseApp | null = null;
let analytics: Analytics | null = null;
let functions: Functions | null = null;

export const initializeFirebase = async (): Promise<FirebaseApp> => {
  if (app) return app;
  
  // Check if already initialized
  const existingApps = getApps();
  if (existingApps.length > 0) {
    app = existingApps[0];
  } else {
    app = initializeApp(firebaseConfig);
  }
  
  // Only initialize analytics in browser environment where supported
  if (typeof window !== 'undefined') {
    const analyticsSupported = await isSupported();
    if (analyticsSupported) {
      analytics = getAnalytics(app);
    }
  }
  
  functions = getFunctions(app);
  
  return app;
};

export const getFirebaseApp = (): FirebaseApp => {
  if (!app) {
    // Auto-initialize if not done yet
    const existingApps = getApps();
    if (existingApps.length > 0) {
      app = existingApps[0];
    } else {
      app = initializeApp(firebaseConfig);
    }
  }
  return app;
};

export const getFirebaseAnalytics = (): Analytics | null => {
  return analytics;
};

export const getFirebaseFunctions = (): Functions => {
  if (!functions) {
    functions = getFunctions(getFirebaseApp());
  }
  return functions;
};

export { app, analytics, functions };
