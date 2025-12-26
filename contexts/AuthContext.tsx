import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { 
  onAuthChange, 
  signInWithGoogle, 
  signInWithEmail, 
  signUpWithEmail, 
  logOut, 
  resetPassword,
  getUserDocument,
  checkRedirectResult,
  initializeFirebase,
  UserDocument 
} from '../backend/firebase';

interface AuthContextType {
  user: User | null;
  userDoc: UserDocument | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName: string, companyName: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  clearError: () => void;
  refetchUserDoc: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userDoc, setUserDoc] = useState<UserDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Firebase with persistence on mount
  useEffect(() => {
    initializeFirebase().catch(console.error);
  }, []);

  // Check for redirect result on mount (for Google Sign In fallback)
  useEffect(() => {
    checkRedirectResult().catch(console.error);
  }, []);

  // Helper to fetch user document with retry
  const fetchUserDocument = async (uid: string, retryCount = 0): Promise<void> => {
    try {
      const doc = await getUserDocument(uid);
      setUserDoc(doc);
    } catch (err: any) {
      // If offline, retry after a delay (max 3 retries)
      const isOfflineError = err.code === 'unavailable' || err.message?.includes('offline');
      if (isOfflineError && retryCount < 3) {
        console.log(`Offline, retrying in ${(retryCount + 1) * 2}s... (attempt ${retryCount + 1}/3)`);
        retryTimeoutRef.current = setTimeout(() => {
          fetchUserDocument(uid, retryCount + 1);
        }, (retryCount + 1) * 2000);
      } else if (!isOfflineError) {
        // Only log non-offline errors
        console.error('Error fetching user document:', err);
      }
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        await fetchUserDocument(firebaseUser.uid);
      } else {
        setUserDoc(null);
      }
      
      setLoading(false);
    });

    return () => {
      unsubscribe();
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  const handleSignInWithGoogle = async () => {
    try {
      setError(null);
      setLoading(true);
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleSignInWithEmail = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      await signInWithEmail(email, password);
    } catch (err: any) {
      let errorMessage = 'Failed to sign in';
      if (err.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      }
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpWithEmail = async (
    email: string, 
    password: string, 
    displayName: string, 
    companyName: string
  ) => {
    try {
      setError(null);
      setLoading(true);
      await signUpWithEmail(email, password, displayName, companyName);
    } catch (err: any) {
      let errorMessage = 'Failed to create account';
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      }
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setError(null);
      await logOut();
      setUserDoc(null);
    } catch (err: any) {
      setError(err.message || 'Failed to sign out');
      throw err;
    }
  };

  const handleResetPassword = async (email: string) => {
    try {
      setError(null);
      await resetPassword(email);
    } catch (err: any) {
      let errorMessage = 'Failed to send reset email';
      if (err.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      }
      setError(errorMessage);
      throw err;
    }
  };

  const clearError = () => setError(null);

  // Manual refetch for user document (useful after offline recovery)
  const refetchUserDoc = async () => {
    if (user) {
      await fetchUserDocument(user.uid);
    }
  };

  const value: AuthContextType = {
    user,
    userDoc,
    loading,
    error,
    signInWithGoogle: handleSignInWithGoogle,
    signInWithEmail: handleSignInWithEmail,
    signUpWithEmail: handleSignUpWithEmail,
    logout: handleLogout,
    resetPassword: handleResetPassword,
    clearError,
    refetchUserDoc,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
