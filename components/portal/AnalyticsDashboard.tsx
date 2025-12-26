import React, { useState } from 'react';
import LineIcon from '../LineIcon';
import FadeIn from '../FadeIn';

interface AnalyticsDashboardProps {
  products?: {
    website: boolean;
    aiVoice: boolean;
    marketing: boolean;
  };
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  products = { website: true, aiVoice: false, marketing: false }
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'calls' | 'website'>('overview');

  const hasAnyProduct = products.website || products.aiVoice || products.marketing;

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: 'grid-1' },
    { id: 'calls' as const, label: 'Calls', icon: 'phone', show: products.aiVoice },
    { id: 'website' as const, label: 'Website', icon: 'website', show: products.website },
  ].filter(t => t.show !== false);

  const EmptyState = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
    <div className="text-center py-8 sm:py-12">
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-3">
        <LineIcon name={icon} className="text-xl sm:text-2xl text-neutral-400" />
      </div>
      <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100 mb-1">{title}</p>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto">{description}</p>
    </div>
  );

  return (
    <div className="p-3 sm:p-4 md:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <FadeIn>
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-neutral-800 dark:text-neutral-100 mb-0.5">
              Analytics
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              Track performance
            </p>
          </div>
          <select className="text-[10px] sm:text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-2 py-1.5">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
        </div>
      </FadeIn>

      {/* Tabs - Compact */}
      <FadeIn delay={50}>
        <div className="flex gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg mb-4 md:mb-6 overflow-x-auto">
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

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <FadeIn delay={100}>
          {hasAnyProduct ? (
            <div className="space-y-4">
              {/* Stats Grid - Compact */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {[
                  { label: 'Views', icon: 'eye', value: '-', show: products.website },
                  { label: 'Leads', icon: 'users', value: '-', show: true },
                  { label: 'Calls', icon: 'phone', value: '-', show: products.aiVoice },
                  { label: 'Conv.', icon: 'trend-up-1', value: '-', show: true },
                ].filter(m => m.show).map((metric) => (
                  <div key={metric.label} className="portal-card p-2.5 sm:p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-md bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                        <LineIcon name={metric.icon} className="text-[10px] text-neutral-500" />
                      </div>
                      <span className="text-[10px] text-neutral-500 dark:text-neutral-400">{metric.label}</span>
                    </div>
                    <p className="text-lg sm:text-xl font-bold text-neutral-300 dark:text-neutral-600">{metric.value}</p>
                  </div>
                ))}
              </div>

              {/* Integration Status */}
              <div className="portal-card p-3 sm:p-4">
                <h3 className="text-xs font-semibold text-neutral-800 dark:text-neutral-100 mb-3">Integration Status</h3>
                <div className="space-y-2">
                  {products.website && (
                    <div className="flex items-center justify-between p-2 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <LineIcon name="globe-1" className="text-blue-600 dark:text-blue-400 text-sm" />
                        <span className="text-xs text-neutral-700 dark:text-neutral-300">Website Analytics</span>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                        Pending
                      </span>
                    </div>
                  )}
                  {products.aiVoice && (
                    <div className="flex items-center justify-between p-2 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <LineIcon name="microphone-1" className="text-brand-600 dark:text-brand-400 text-sm" />
                        <span className="text-xs text-neutral-700 dark:text-neutral-300">Call Analytics</span>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                        Pending
                      </span>
                    </div>
                  )}
                  {products.marketing && (
                    <div className="flex items-center justify-between p-2 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <LineIcon name="megaphone-1" className="text-purple-600 dark:text-purple-400 text-sm" />
                        <span className="text-xs text-neutral-700 dark:text-neutral-300">Marketing Analytics</span>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                        Pending
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-3 p-2 bg-brand-50 dark:bg-brand-900/20 rounded-lg">
                  <p className="text-[10px] text-brand-700 dark:text-brand-300">
                    Analytics will appear once your products are fully configured.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="portal-card">
              <EmptyState
                icon="chart-bar"
                title="No Analytics Yet"
                description="Add products to your plan to start tracking analytics."
              />
            </div>
          )}
        </FadeIn>
      )}

      {/* Calls Tab */}
      {activeTab === 'calls' && (
        <FadeIn delay={100}>
          <div className="portal-card">
            <EmptyState
              icon="phone"
              title="No Call History"
              description="Call logs and transcripts will appear here once your AI handles calls."
            />
          </div>
        </FadeIn>
      )}

      {/* Website Tab */}
      {activeTab === 'website' && (
        <FadeIn delay={100}>
          <div className="portal-card">
            <EmptyState
              icon="website"
              title="Analytics Pending"
              description="Website analytics will appear after Google Analytics integration."
            />
          </div>
        </FadeIn>
      )}

      {/* Help */}
      <FadeIn delay={200}>
        <div className="mt-6 text-center">
          <p className="text-[10px] sm:text-xs text-neutral-400">
            Questions? <a href="mailto:grovesolutions.contact@gmail.com" className="text-brand-600 dark:text-brand-400 hover:underline">Contact support</a>
          </p>
        </div>
      </FadeIn>
    </div>
  );
};

export default AnalyticsDashboard;
