import React, { useState } from 'react';
import PortalLayout from './PortalLayout';
import DashboardHome from './DashboardHome';
import LicenseManagement from './LicenseManagement';
import AnalyticsDashboard from './AnalyticsDashboard';
import AccountSettings from './AccountSettings';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import { useAuth } from '../../contexts/AuthContext';
import { getFirebaseDb } from '../../backend/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

type PortalSection = 'dashboard' | 'licenses' | 'analytics' | 'settings';
type AuthView = 'login' | 'signup' | 'forgot-password';

interface OwnerPortalProps {
  onExit?: () => void;
}

const OwnerPortal: React.FC<OwnerPortalProps> = ({ onExit }) => {
  const { 
    user, 
    userDoc, 
    loading, 
    error, 
    signInWithGoogle, 
    signInWithEmail, 
    signUpWithEmail, 
    logout, 
    resetPassword,
    clearError 
  } = useAuth();

  const [currentSection, setCurrentSection] = useState<PortalSection>('dashboard');
  const [authView, setAuthView] = useState<AuthView>('login');

  const handleExit = () => {
    if (onExit) {
      onExit();
    } else {
      window.location.href = '/';
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleNavigate = (section: PortalSection) => {
    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchAuthView = (view: AuthView) => {
    clearError();
    setAuthView(view);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-500 dark:text-neutral-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - show auth pages
  if (!user) {
    switch (authView) {
      case 'signup':
        return (
          <SignUpPage
            onSignUp={signUpWithEmail}
            onGoogleSignUp={signInWithGoogle}
            onLogin={() => switchAuthView('login')}
            onBack={handleExit}
            error={error}
            loading={loading}
          />
        );
      case 'forgot-password':
        return (
          <ForgotPasswordPage
            onResetPassword={resetPassword}
            onBack={handleExit}
            onLogin={() => switchAuthView('login')}
            error={error}
            loading={loading}
          />
        );
      default:
        return (
          <LoginPage
            onLogin={signInWithEmail}
            onGoogleLogin={signInWithGoogle}
            onSignUp={() => switchAuthView('signup')}
            onForgotPassword={() => switchAuthView('forgot-password')}
            onBack={handleExit}
            error={error}
            loading={loading}
          />
        );
    }
  }

  // User data for portal
  const userData = {
    name: user.displayName || userDoc?.displayName || 'User',
    email: user.email || '',
    companyName: userDoc?.companyName || 'My Business',
    phone: userDoc?.phone || '',
    plan: userDoc?.plan === 'starter' ? 'Starter Website' 
        : userDoc?.plan === 'business-pro' ? 'Business Pro' 
        : 'Growth Website',
    products: userDoc?.products || { website: true, aiVoice: false, marketing: false }
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'dashboard':
        return (
          <DashboardHome 
            companyName={userData.companyName}
            planName={userData.plan}
            products={userData.products}
            planStatus={userDoc?.planStatus || 'trialing'}
            onViewLicenses={() => handleNavigate('licenses')}
            onViewAnalytics={() => handleNavigate('analytics')}
          />
        );
      case 'licenses':
        return (
          <LicenseManagement 
            products={userData.products}
            planName={userData.plan}
            planStatus={userDoc?.planStatus || 'trialing'}
            onUpgrade={() => window.open('mailto:grovesolutions.contact@gmail.com?subject=Upgrade Plan')}
            onContact={() => window.open('mailto:grovesolutions.contact@gmail.com')}
          />
        );
      case 'analytics':
        return <AnalyticsDashboard products={userData.products} />;
      case 'settings':
        return (
          <AccountSettings 
            userName={userData.name}
            userEmail={userData.email}
            companyName={userData.companyName}
            phone={userData.phone}
            products={userData.products}
            onSave={async (data) => {
              if (!user) throw new Error('Not authenticated');
              const db = getFirebaseDb();
              const userRef = doc(db, 'users', user.uid);
              await updateDoc(userRef, {
                displayName: data.displayName,
                companyName: data.companyName,
                phone: data.phone,
                updatedAt: serverTimestamp()
              });
            }}
          />
        );
      default:
        return <DashboardHome />;
    }
  };

  return (
    <PortalLayout
      currentSection={currentSection}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
      userName={userData.name}
      userEmail={userData.email}
      companyName={userData.companyName}
    >
      {renderContent()}
    </PortalLayout>
  );
};

export default OwnerPortal;
