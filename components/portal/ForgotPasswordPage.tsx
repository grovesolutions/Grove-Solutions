import React, { useState } from 'react';
import LineIcon from '../LineIcon';
import FadeIn from '../FadeIn';

interface ForgotPasswordPageProps {
  onResetPassword: (email: string) => Promise<void>;
  onBack: () => void;
  onLogin: () => void;
  error?: string | null;
  loading?: boolean;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({
  onResetPassword,
  onBack,
  onLogin,
  error,
  loading = false
}) => {
  const [email, setEmail] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!email.trim()) {
      setLocalError('Please enter your email');
      return;
    }

    try {
      await onResetPassword(email);
      setEmailSent(true);
    } catch (err) {
      // Error is handled by parent
    }
  };

  const displayError = localError || error;

  if (emailSent) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col relative">
        {/* Mist Background */}
        <div className="mist-wrapper opacity-30 pointer-events-none">
          <div className="mist-orb mist-orb-1"></div>
          <div className="mist-orb mist-orb-2"></div>
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

        <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-6">
          <FadeIn>
            <div className="w-full max-w-sm text-center">
              <div className="w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mx-auto mb-4">
                <LineIcon name="envelope-1" className="text-xl text-brand-600 dark:text-brand-400" />
              </div>
              <h1 className="text-lg sm:text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-1">
                Check your email
              </h1>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
                Reset link sent to <span className="font-medium text-neutral-700 dark:text-neutral-300">{email}</span>
              </p>
              <button
                onClick={onLogin}
                className="btn-leaf px-5 py-2 rounded-lg text-xs font-semibold"
              >
                Back to Sign In
              </button>
              <p className="mt-3 text-[10px] text-neutral-400">
                Didn't receive it?{' '}
                <button onClick={() => setEmailSent(false)} className="text-brand-600 dark:text-brand-400 hover:underline">
                  Try again
                </button>
              </p>
            </div>
          </FadeIn>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col relative">
      {/* Mist Background */}
      <div className="mist-wrapper opacity-30 pointer-events-none">
        <div className="mist-orb mist-orb-1"></div>
        <div className="mist-orb mist-orb-2"></div>
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
                Reset Password
              </h1>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                We'll send you a reset link
              </p>
            </div>

            {/* Reset Card */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 sm:p-5 shadow-sm">
              {/* Error Message */}
              {displayError && (
                <div className="mb-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-1.5">
                  <LineIcon name="xmark-circle" className="text-red-500 text-xs shrink-0" />
                  <span className="text-[10px] sm:text-xs text-red-600 dark:text-red-400">{displayError}</span>
                </div>
              )}

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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-leaf py-2 rounded-lg text-xs font-semibold disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {loading && <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>

              {/* Back to Login */}
              <p className="mt-4 text-center text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400">
                Remember your password?{' '}
                <button onClick={onLogin} className="text-brand-600 dark:text-brand-400 font-medium hover:underline">
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </FadeIn>
      </main>
    </div>
  );
};

export default ForgotPasswordPage;
