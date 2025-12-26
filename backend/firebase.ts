import { initializeApp, FirebaseApp, getApps } from "firebase/app";
import { getAnalytics, Analytics, isSupported } from "firebase/analytics";
import { getFunctions, Functions } from "firebase/functions";
import { 
  getAuth, 
  Auth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile,
  sendPasswordResetEmail,
  browserPopupRedirectResolver
} from "firebase/auth";
import { 
  getFirestore, 
  Firestore, 
  doc, 
  setDoc, 
  getDoc, 
  getDocFromCache,
  serverTimestamp,
  enableIndexedDbPersistence
} from "firebase/firestore";

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
let auth: Auth | null = null;
let db: Firestore | null = null;
let persistenceEnabled = false;
const googleProvider = new GoogleAuthProvider();

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
  auth = getAuth(app);
  db = getFirestore(app);
  
  // Enable offline persistence
  if (!persistenceEnabled && typeof window !== 'undefined') {
    try {
      await enableIndexedDbPersistence(db);
      persistenceEnabled = true;
    } catch (err: any) {
      if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab at a time
        console.warn('Firestore persistence unavailable: multiple tabs open');
      } else if (err.code === 'unimplemented') {
        // The current browser doesn't support persistence
        console.warn('Firestore persistence not supported in this browser');
      }
    }
  }
  
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

export const getFirebaseAuth = (): Auth => {
  if (!auth) {
    auth = getAuth(getFirebaseApp());
  }
  return auth;
};

export const getFirebaseDb = (): Firestore => {
  if (!db) {
    db = getFirestore(getFirebaseApp());
  }
  return db;
};

// ========== AUTH FUNCTIONS ==========

// Check for redirect result on page load
export const checkRedirectResult = async (): Promise<User | null> => {
  const authInstance = getFirebaseAuth();
  try {
    const result = await getRedirectResult(authInstance);
    if (result?.user) {
      await createOrUpdateUserDocument(result.user);
      return result.user;
    }
  } catch (error: any) {
    // Ignore "no redirect operation" errors
    if (error.code !== 'auth/popup-closed-by-user') {
      console.error('Redirect result error:', error);
    }
  }
  return null;
};

// Google Sign In - uses popup with fallback to redirect
export const signInWithGoogle = async (): Promise<User | null> => {
  const authInstance = getFirebaseAuth();
  
  // Try popup first (works in most cases)
  try {
    const result = await signInWithPopup(authInstance, googleProvider, browserPopupRedirectResolver);
    if (result?.user) {
      await createOrUpdateUserDocument(result.user);
      return result.user;
    }
    return null;
  } catch (error: any) {
    // If popup is blocked or COOP issue, fallback to redirect
    if (
      error.code === 'auth/popup-blocked' || 
      error.code === 'auth/popup-closed-by-user' ||
      error.code === 'auth/cancelled-popup-request' ||
      error.message?.includes('Cross-Origin-Opener-Policy')
    ) {
      console.log('Popup blocked, using redirect...');
      await signInWithRedirect(authInstance, googleProvider);
      return null; // Page will reload
    }
    throw error;
  }
};

// Email/Password Sign In
export const signInWithEmail = async (email: string, password: string): Promise<User> => {
  const authInstance = getFirebaseAuth();
  const result = await signInWithEmailAndPassword(authInstance, email, password);
  return result.user;
};

// Email/Password Sign Up
export const signUpWithEmail = async (
  email: string, 
  password: string, 
  displayName: string,
  companyName: string
): Promise<User> => {
  const authInstance = getFirebaseAuth();
  const result = await createUserWithEmailAndPassword(authInstance, email, password);
  
  // Update profile with display name
  await updateProfile(result.user, { displayName });
  
  // Create user document in Firestore
  await createOrUpdateUserDocument(result.user, { companyName });
  
  return result.user;
};

// Sign Out
export const logOut = async (): Promise<void> => {
  const authInstance = getFirebaseAuth();
  await signOut(authInstance);
};

// Password Reset
export const resetPassword = async (email: string): Promise<void> => {
  const authInstance = getFirebaseAuth();
  await sendPasswordResetEmail(authInstance, email);
};

// Auth State Observer
export const onAuthChange = (callback: (user: User | null) => void): (() => void) => {
  const authInstance = getFirebaseAuth();
  return onAuthStateChanged(authInstance, callback);
};

// ========== FIRESTORE FUNCTIONS ==========

// User document interface
export interface UserDocument {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  companyName: string;
  phone: string;
  plan: 'starter' | 'growth' | 'business-pro';
  planStatus: 'active' | 'trialing' | 'past_due' | 'canceled';
  createdAt: any;
  updatedAt: any;
  products: {
    website: boolean;
    aiVoice: boolean;
    marketing: boolean;
  };
  onboardingComplete: boolean;
}

// Create or update user document
export const createOrUpdateUserDocument = async (
  user: User, 
  additionalData?: Partial<UserDocument>
): Promise<void> => {
  const dbInstance = getFirebaseDb();
  const userRef = doc(dbInstance, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) {
    // Create new user document
    const userData: UserDocument = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || additionalData?.displayName || 'User',
      photoURL: user.photoURL,
      companyName: additionalData?.companyName || 'My Business',
      phone: additionalData?.phone || '',
      plan: 'growth',
      planStatus: 'trialing',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      products: {
        website: true,
        aiVoice: false,
        marketing: false,
      },
      onboardingComplete: false,
    };
    
    await setDoc(userRef, userData);
  } else {
    // Update existing user
    await setDoc(userRef, {
      ...userSnap.data(),
      displayName: user.displayName || userSnap.data().displayName,
      photoURL: user.photoURL || userSnap.data().photoURL,
      updatedAt: serverTimestamp(),
      ...additionalData,
    }, { merge: true });
  }
};

// Get user document with offline fallback
export const getUserDocument = async (uid: string): Promise<UserDocument | null> => {
  const dbInstance = getFirebaseDb();
  const userRef = doc(dbInstance, 'users', uid);
  
  try {
    // Try to get from server first
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data() as UserDocument;
    }
    return null;
  } catch (error: any) {
    // If offline, try to get from cache
    if (error.code === 'unavailable' || error.message?.includes('offline')) {
      try {
        const cachedSnap = await getDocFromCache(userRef);
        if (cachedSnap.exists()) {
          console.log('Using cached user document (offline)');
          return cachedSnap.data() as UserDocument;
        }
      } catch (cacheError) {
        // No cached data available
        console.warn('No cached user document available');
      }
    }
    // Re-throw for other errors or if cache also failed
    throw error;
  }
};

export { app, analytics, functions, auth, db, googleProvider };
