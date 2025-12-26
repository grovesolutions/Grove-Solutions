import React, { useState } from 'react';
import LineIcon from '../LineIcon';
import FadeIn from '../FadeIn';

interface AccountSettingsProps {
  userName?: string;
  userEmail?: string;
  companyName?: string;
  phone?: string;
  products?: {
    website: boolean;
    aiVoice: boolean;
    marketing: boolean;
  };
  onSave?: (data: { displayName: string; companyName: string; phone: string }) => Promise<void>;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({
  userName = '',
  userEmail = '',
  companyName = '',
  phone = '',
  products = { website: true, aiVoice: false, marketing: false },
  onSave
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'billing' | 'ai-settings'>('profile');
  const [formData, setFormData] = useState({
    name: userName,
    email: userEmail,
    company: companyName,
    phone: phone,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSaveMessage(null);
  };

  const handleSave = async () => {
    if (!onSave) return;
    setIsSaving(true);
    setSaveMessage(null);
    try {
      await onSave({
        displayName: formData.name,
        companyName: formData.company,
        phone: formData.phone
      });
      setSaveMessage({ type: 'success', text: 'Saved!' });
    } catch (error: any) {
      setSaveMessage({ type: 'error', text: error.message || 'Failed to save' });
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: 'user' },
    { id: 'billing' as const, label: 'Billing', icon: 'credit-card' },
    { id: 'ai-settings' as const, label: 'AI', icon: 'microphone', show: products.aiVoice },
  ].filter(t => t.show !== false);

  return (
    <div className="p-3 sm:p-4 md:p-6 max-w-3xl mx-auto">
      {/* Header */}
      <FadeIn>
        <div className="mb-4 md:mb-6">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-neutral-800 dark:text-neutral-100 mb-0.5">
            Settings
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            Manage your account
          </p>
        </div>
      </FadeIn>

      {/* Tabs - Compact */}
      <FadeIn delay={50}>
        <div className="flex gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg mb-4 md:mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 shadow-sm'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
              }`}
            >
              <LineIcon name={tab.icon} className="text-xs" />
              {tab.label}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <FadeIn delay={100}>
          <div className="portal-card p-3 sm:p-4">
            {/* Avatar */}
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-neutral-200 dark:border-neutral-700">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-lg sm:text-xl font-bold">
                {(formData.name || 'U').charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{formData.name || 'User'}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{formData.company || 'My Business'}</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    disabled
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-400 cursor-not-allowed"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    autoComplete="organization"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Company name"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 555-5555"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Save */}
            <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
              {saveMessage && (
                <span className={`text-xs ${saveMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {saveMessage.text}
                </span>
              )}
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="btn-leaf px-4 py-1.5 rounded-lg text-xs font-medium disabled:opacity-50 ml-auto flex items-center gap-1.5"
              >
                {isSaving && <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </FadeIn>
      )}

      {/* Billing Tab */}
      {activeTab === 'billing' && (
        <FadeIn delay={100}>
          <div className="portal-card p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-3">
              <LineIcon name="credit-card-multiple" className="text-xl text-neutral-400" />
            </div>
            <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100 mb-1">Billing Coming Soon</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">
              For billing inquiries, contact support.
            </p>
            <button 
              onClick={() => window.open('mailto:grovesolutions.contact@gmail.com?subject=Billing Inquiry')}
              className="btn-leaf px-4 py-1.5 rounded-lg text-xs"
            >
              Contact Support
            </button>
          </div>
        </FadeIn>
      )}

      {/* AI Settings Tab */}
      {activeTab === 'ai-settings' && products.aiVoice && (
        <FadeIn delay={100}>
          <div className="portal-card p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-12 h-12 rounded-full bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center">
                <LineIcon name="microphone-1" className="text-xl text-brand-600 dark:text-brand-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100 mb-1">AI Configuration</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">
              Self-service AI settings coming soon.
            </p>
            <button 
              onClick={() => window.open('mailto:grovesolutions.contact@gmail.com?subject=AI Configuration')}
              className="btn-leaf px-4 py-1.5 rounded-lg text-xs"
            >
              Request Change
            </button>
          </div>
        </FadeIn>
      )}

      {/* Help */}
      <FadeIn delay={200}>
        <div className="mt-6 text-center">
          <p className="text-[10px] sm:text-xs text-neutral-400">
            Need help? <a href="mailto:grovesolutions.contact@gmail.com" className="text-brand-600 dark:text-brand-400 hover:underline">Contact support</a>
          </p>
        </div>
      </FadeIn>
    </div>
  );
};

export default AccountSettings;
