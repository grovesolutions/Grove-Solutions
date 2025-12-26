import React, { useState } from 'react';
import LineIcon from '../LineIcon';
import FadeIn from '../FadeIn';

interface LoginPageProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onGoogleLogin: () => Promise<void>;
  onSignUp: () => void;
  onForgotPassword: () => void;
  onBack: () => void;
  error?: string | null;
  loading?: boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({
  onLogin,
  onGoogleLogin,
  onSignUp,
  onForgotPassword,
  onBack,
  error,
  loading = false
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!email.trim()) {
      setLocalError('Please enter your email');
      return;
    }
    if (!password) {
      setLocalError('Please enter your password');
      return;
    }

    try {
      await onLogin(email, password);
    } catch (err) {
      // Error is handled by parent
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await onGoogleLogin();
    } catch (err) {
      // Error is handled by parent
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col relative">
      {/* Mist Background */}
      <div className="mist-wrapper opacity-30 pointer-events-none">
        <div className="mist-orb mist-orb-1"></div>
        <div className="mist-orb mist-orb-2"></div>
        <div className="mist-orb mist-orb-3"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-3 sm:p-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
        >
          <LineIcon name="arrow-left" className="text-sm" />
          <span className="text-xs font-medium">Back</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-6">
        <FadeIn>
          <div className="w-full max-w-sm">
            {/* Logo & Title */}
            <div className="text-center mb-6">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/grove-solutions.firebasestorage.app/o/grovelogo-removebg%20(1).png?alt=media&token=3a875928-dcbb-42fb-b686-fbe6d8be917a" 
                alt="Grove Solutions" 
                className="h-8 sm:h-10 w-auto mx-auto mb-3"
                style={{ filter: 'brightness(0) saturate(100%) invert(50%) sepia(69%) saturate(450%) hue-rotate(99deg) brightness(88%) contrast(90%)' }}
              />
              <h1 className="text-lg sm:text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-1">
                Owners Portal
              </h1>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Sign in to manage your products
              </p>
            </div>

            {/* Login Card */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 sm:p-5 shadow-sm">
              {/* Google Sign In */}
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 border border-neutral-200 dark:border-neutral-700 rounded-lg text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors disabled:opacity-50"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700"></div>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700"></div>
              </div>

              {/* Error Message */}
              {displayError && (
                <div className="mb-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-1.5">
                  <LineIcon name="xmark-circle" className="text-red-500 text-xs shrink-0" />
                  <span className="text-[10px] sm:text-xs text-red-600 dark:text-red-400">{displayError}</span>
                </div>
              )}

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg placeholder-neutral-400 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    disabled={loading}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[10px] sm:text-xs font-medium text-neutral-700 dark:text-neutral-300">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={onForgotPassword}
                      className="text-[10px] text-brand-600 dark:text-brand-400 hover:underline"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 pr-9 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg placeholder-neutral-400 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                    >
                      <LineIcon name={showPassword ? 'locked-1' : 'eye'} className="text-xs" />
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-leaf py-2 rounded-lg text-xs font-semibold disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {loading && <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              {/* Sign Up Link */}
              <p className="mt-4 text-center text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400">
                Don't have an account?{' '}
                <button onClick={onSignUp} className="text-brand-600 dark:text-brand-400 font-medium hover:underline">
                  Sign up
                </button>
              </p>
            </div>

            {/* Footer */}
            <p className="mt-4 text-center text-[9px] text-neutral-400">
              By signing in, you agree to our Terms and Privacy Policy
            </p>
          </div>
        </FadeIn>
      </main>
    </div>
  );
};

export default LoginPage;
