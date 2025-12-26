import React from 'react';
import LineIcon from '../LineIcon';
import FadeIn from '../FadeIn';

interface DashboardHomeProps {
  companyName?: string;
  planName?: string;
  products?: {
    website: boolean;
    aiVoice: boolean;
    marketing: boolean;
  };
  planStatus?: 'active' | 'trialing' | 'past_due' | 'canceled';
  onViewLicenses?: () => void;
  onViewAnalytics?: () => void;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({
  companyName = 'My Business',
  planName = 'Growth Website',
  products = { website: true, aiVoice: false, marketing: false },
  planStatus = 'active',
  onViewLicenses,
  onViewAnalytics
}) => {
  const activeProducts = Object.entries(products).filter(([, active]) => active);
  const hasAnyProduct = activeProducts.length > 0;

  const getStatusBadge = () => {
    switch (planStatus) {
      case 'active':
        return { text: 'Active', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' };
      case 'trialing':
        return { text: 'Trial', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' };
      case 'past_due':
        return { text: 'Past Due', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' };
      case 'canceled':
        return { text: 'Canceled', color: 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400' };
      default:
        return { text: 'Active', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' };
    }
  };

  const statusBadge = getStatusBadge();

  return (
    <div className="p-3 sm:p-4 md:p-6 max-w-5xl mx-auto">
      {/* Header */}
      <FadeIn>
        <div className="mb-4 md:mb-6">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-neutral-800 dark:text-neutral-100 mb-0.5">
            Welcome back 👋
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            <span className="font-medium text-neutral-700 dark:text-neutral-300">{companyName}</span>
          </p>
        </div>
      </FadeIn>

      {/* Plan Card - Compact */}
      <FadeIn delay={50}>
        <div className="mb-4 md:mb-6 p-3 sm:p-4 bg-gradient-to-r from-brand-50 to-brand-100/50 dark:from-brand-900/20 dark:to-brand-900/10 rounded-xl border border-brand-200/60 dark:border-brand-800/40">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
                <LineIcon name="crown-3" className="text-white text-sm sm:text-base" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-sm sm:text-base font-semibold text-neutral-800 dark:text-neutral-100">{planName}</p>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${statusBadge.color}`}>
                    {statusBadge.text}
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-neutral-600 dark:text-neutral-400">
                  {activeProducts.length} product{activeProducts.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <button 
              onClick={onViewLicenses}
              className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline hidden sm:block"
            >
              Manage →
            </button>
          </div>
        </div>
      </FadeIn>

      {/* Products Grid - Compact */}
      <FadeIn delay={100}>
        <div className="mb-4 md:mb-6">
          <h2 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 mb-2 sm:mb-3">Products</h2>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {/* Website */}
            <div className={`portal-card p-2.5 sm:p-3 ${products.website ? '' : 'opacity-50'}`}>
              <div className="flex flex-col items-center text-center">
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg mb-1.5 flex items-center justify-center ${
                  products.website ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-neutral-100 dark:bg-neutral-800'
                }`}>
                  <LineIcon name="globe-1" className={`text-sm sm:text-base ${
                    products.website ? 'text-blue-600 dark:text-blue-400' : 'text-neutral-400'
                  }`} />
                </div>
                <p className="text-[10px] sm:text-xs font-medium text-neutral-800 dark:text-neutral-100">Website</p>
                {products.website && (
                  <span className="text-[9px] text-green-600 dark:text-green-400 flex items-center gap-0.5 mt-0.5">
                    <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                    Live
                  </span>
                )}
              </div>
            </div>

            {/* AI Voice */}
            <div className={`portal-card p-2.5 sm:p-3 ${products.aiVoice ? '' : 'opacity-50'}`}>
              <div className="flex flex-col items-center text-center">
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg mb-1.5 flex items-center justify-center ${
                  products.aiVoice ? 'bg-brand-50 dark:bg-brand-900/20' : 'bg-neutral-100 dark:bg-neutral-800'
                }`}>
                  <LineIcon name="microphone-1" className={`text-sm sm:text-base ${
                    products.aiVoice ? 'text-brand-600 dark:text-brand-400' : 'text-neutral-400'
                  }`} />
                </div>
                <p className="text-[10px] sm:text-xs font-medium text-neutral-800 dark:text-neutral-100">AI Voice</p>
                {products.aiVoice && (
                  <span className="text-[9px] text-green-600 dark:text-green-400 flex items-center gap-0.5 mt-0.5">
                    <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
                    Online
                  </span>
                )}
              </div>
            </div>

            {/* Marketing */}
            <div className={`portal-card p-2.5 sm:p-3 ${products.marketing ? '' : 'opacity-50'}`}>
              <div className="flex flex-col items-center text-center">
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg mb-1.5 flex items-center justify-center ${
                  products.marketing ? 'bg-purple-50 dark:bg-purple-900/20' : 'bg-neutral-100 dark:bg-neutral-800'
                }`}>
                  <LineIcon name="megaphone-1" className={`text-sm sm:text-base ${
                    products.marketing ? 'text-purple-600 dark:text-purple-400' : 'text-neutral-400'
                  }`} />
                </div>
                <p className="text-[10px] sm:text-xs font-medium text-neutral-800 dark:text-neutral-100">Marketing</p>
                {products.marketing && (
                  <span className="text-[9px] text-green-600 dark:text-green-400 flex items-center gap-0.5 mt-0.5">
                    <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                    Active
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Analytics Preview */}
      <FadeIn delay={150}>
        <div className="portal-card p-3 sm:p-4 mb-4 md:mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">Analytics</h2>
            {hasAnyProduct && (
              <button 
                onClick={onViewAnalytics}
                className="text-[10px] sm:text-xs text-brand-600 dark:text-brand-400 hover:underline"
              >
                View all →
              </button>
            )}
          </div>
          
          {hasAnyProduct ? (
            <div className="text-center py-6 sm:py-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center mx-auto mb-2">
                <LineIcon name="bar-chart-4" className="text-lg sm:text-xl text-brand-600 dark:text-brand-400" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-100 mb-1">Coming Soon</p>
              <p className="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto">
                Real-time analytics will appear here once your products are fully configured.
              </p>
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-2">
                <LineIcon name="box-closed" className="text-lg sm:text-xl text-neutral-400" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-100 mb-1">No Products Yet</p>
              <p className="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto mb-3">
                Add a website, AI agent, or marketing to see analytics.
              </p>
              <button 
                onClick={onViewLicenses}
                className="btn-leaf px-3 py-1.5 rounded-lg text-xs"
              >
                View Products
              </button>
            </div>
          )}
        </div>
      </FadeIn>

      {/* Quick Actions - Compact Grid */}
      <FadeIn delay={200}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          <button
            onClick={onViewAnalytics}
            className="portal-card p-2.5 sm:p-3 flex items-center gap-2 hover:border-brand-300 dark:hover:border-brand-700 transition-colors"
          >
            <div className="w-7 h-7 rounded-md bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
              <LineIcon name="bar-chart-4" className="text-xs text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-[10px] sm:text-xs font-medium text-neutral-700 dark:text-neutral-300">Analytics</span>
          </button>
          
          <button
            onClick={onViewLicenses}
            className="portal-card p-2.5 sm:p-3 flex items-center gap-2 hover:border-brand-300 dark:hover:border-brand-700 transition-colors"
          >
            <div className="w-7 h-7 rounded-md bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center shrink-0">
              <LineIcon name="gear-1" className="text-xs text-brand-600 dark:text-brand-400" />
            </div>
            <span className="text-[10px] sm:text-xs font-medium text-neutral-700 dark:text-neutral-300">Settings</span>
          </button>
          
          <button
            onClick={() => window.open('mailto:grovesolutions.contact@gmail.com')}
            className="portal-card p-2.5 sm:p-3 flex items-center gap-2 hover:border-brand-300 dark:hover:border-brand-700 transition-colors"
          >
            <div className="w-7 h-7 rounded-md bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center shrink-0">
              <LineIcon name="headphone-1" className="text-xs text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-[10px] sm:text-xs font-medium text-neutral-700 dark:text-neutral-300">Support</span>
          </button>
          
          <button
            onClick={() => window.open('tel:+14699431433')}
            className="portal-card p-2.5 sm:p-3 flex items-center gap-2 hover:border-brand-300 dark:hover:border-brand-700 transition-colors"
          >
            <div className="w-7 h-7 rounded-md bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center shrink-0">
              <LineIcon name="phone" className="text-xs text-amber-600 dark:text-amber-400" />
            </div>
            <span className="text-[10px] sm:text-xs font-medium text-neutral-700 dark:text-neutral-300">Call Us</span>
          </button>
        </div>
      </FadeIn>

      {/* Footer Help */}
      <FadeIn delay={250}>
        <div className="mt-6 text-center">
          <p className="text-[10px] sm:text-xs text-neutral-400">
            Need help? <a href="mailto:grovesolutions.contact@gmail.com" className="text-brand-600 dark:text-brand-400 hover:underline">Contact support</a>
          </p>
        </div>
      </FadeIn>
    </div>
  );
};

export default DashboardHome;
