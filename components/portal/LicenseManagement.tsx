import React, { useState } from 'react';
import LineIcon from '../LineIcon';
import FadeIn from '../FadeIn';

interface LicenseManagementProps {
  products?: {
    website: boolean;
    aiVoice: boolean;
    marketing: boolean;
  };
  planName?: string;
  planStatus?: 'active' | 'trialing' | 'past_due' | 'canceled';
  onUpgrade?: () => void;
  onContact?: () => void;
}

interface ProductInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
  price?: string;
  active: boolean;
}

const LicenseManagement: React.FC<LicenseManagementProps> = ({ 
  products = { website: true, aiVoice: false, marketing: false },
  planName = 'Growth Website',
  planStatus = 'active',
  onUpgrade, 
  onContact 
}) => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const allProducts: ProductInfo[] = [
    {
      id: 'website',
      name: 'Website',
      description: 'Professional website',
      icon: 'website',
      color: 'blue',
      features: ['Custom design', 'SEO optimized', 'Mobile responsive', 'Monthly updates'],
      price: '$69/mo',
      active: products.website
    },
    {
      id: 'aiVoice',
      name: 'AI Voice',
      description: '24/7 call handling',
      icon: 'microphone',
      color: 'green',
      features: ['24/7 answering', 'Lead capture', 'Appointments', 'SMS follow-ups'],
      price: '$199/mo',
      active: products.aiVoice
    },
    {
      id: 'marketing',
      name: 'Marketing',
      description: 'Growth campaigns',
      icon: 'bullhorn',
      color: 'purple',
      features: ['Paid ads', 'Social media', 'Analytics', 'A/B testing'],
      price: '$299/mo',
      active: products.marketing
    }
  ];

  const activeProducts = allProducts.filter(p => p.active);
  const availableProducts = allProducts.filter(p => !p.active);

  const getColor = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400' },
      green: { bg: 'bg-brand-50 dark:bg-brand-900/20', text: 'text-brand-600 dark:text-brand-400' },
      purple: { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400' }
    };
    return colors[color] || colors.blue;
  };

  const getStatusBadge = () => {
    const badges: Record<string, { text: string; class: string }> = {
      active: { text: 'Active', class: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
      trialing: { text: 'Trial', class: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
      past_due: { text: 'Past Due', class: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
      canceled: { text: 'Canceled', class: 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400' }
    };
    return badges[planStatus] || badges.active;
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <FadeIn>
        <div className="mb-4 md:mb-6">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-neutral-800 dark:text-neutral-100 mb-0.5">
            Products
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            Manage your subscriptions
          </p>
        </div>
      </FadeIn>

      {/* Plan Summary - Compact */}
      <FadeIn delay={50}>
        <div className="mb-4 md:mb-6 p-3 sm:p-4 bg-gradient-to-r from-brand-500 to-brand-600 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/20 flex items-center justify-center">
                <LineIcon name="crown-3" className="text-sm sm:text-base" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-sm sm:text-base font-semibold">{planName}</p>
                  <span className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full font-medium ${getStatusBadge().class}`}>
                    {getStatusBadge().text}
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-brand-100">
                  {activeProducts.length} active
                </p>
              </div>
            </div>
            <button 
              onClick={onContact}
              className="text-[10px] sm:text-xs font-medium bg-white/20 hover:bg-white/30 px-2 sm:px-3 py-1.5 rounded-lg transition-colors"
            >
              Support
            </button>
          </div>
        </div>
      </FadeIn>

      {/* Active Products */}
      {activeProducts.length > 0 && (
        <FadeIn delay={100}>
          <div className="mb-4 md:mb-6">
            <h2 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 mb-2 sm:mb-3">Active Products</h2>
            <div className="space-y-2">
              {activeProducts.map((product) => {
                const colorClasses = getColor(product.color);
                const isExpanded = selectedProduct === product.id;
                
                return (
                  <div 
                    key={product.id}
                    className={`portal-card overflow-hidden transition-all ${isExpanded ? 'ring-1 ring-brand-500' : ''}`}
                  >
                    <button
                      onClick={() => setSelectedProduct(isExpanded ? null : product.id)}
                      className="w-full p-3 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg ${colorClasses.bg} flex items-center justify-center`}>
                          <LineIcon name={product.icon} className={`text-sm ${colorClasses.text}`} />
                        </div>
                        <div className="text-left">
                          <p className="text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-100">{product.name}</p>
                          <p className="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400">{product.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] sm:text-xs font-medium text-neutral-700 dark:text-neutral-300 hidden sm:block">{product.price}</span>
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-medium bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                          <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                          Active
                        </span>
                        <LineIcon name={isExpanded ? 'chevron-up' : 'chevron-down'} className="text-neutral-400 text-xs" />
                      </div>
                    </button>
                    
                    {isExpanded && (
                      <div className="px-3 pb-3 pt-0 border-t border-neutral-200 dark:border-neutral-700">
                        <ul className="mt-2 grid grid-cols-2 gap-1">
                          {product.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-1 text-[10px] sm:text-xs text-neutral-600 dark:text-neutral-400">
                              <LineIcon name="check" className="text-brand-500 text-[8px]" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      )}

      {/* No Active Products */}
      {activeProducts.length === 0 && (
        <FadeIn delay={100}>
          <div className="mb-4 md:mb-6 portal-card p-6 text-center">
            <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-2">
              <LineIcon name="box-closed" className="text-lg text-neutral-400" />
            </div>
            <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100 mb-1">No Active Products</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Choose from the options below to get started.
            </p>
          </div>
        </FadeIn>
      )}

      {/* Available Products */}
      {availableProducts.length > 0 && (
        <FadeIn delay={150}>
          <div className="mb-4 md:mb-6">
            <h2 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 mb-2 sm:mb-3">Available</h2>
            <div className="grid sm:grid-cols-3 gap-2 sm:gap-3">
              {availableProducts.map((product) => {
                const colorClasses = getColor(product.color);
                return (
                  <div key={product.id} className="portal-card p-3 hover:border-brand-300 dark:hover:border-brand-700 transition-colors">
                    <div className={`w-8 h-8 rounded-lg ${colorClasses.bg} flex items-center justify-center mb-2`}>
                      <LineIcon name={product.icon} className={`text-sm ${colorClasses.text}`} />
                    </div>
                    <p className="text-xs font-medium text-neutral-800 dark:text-neutral-100 mb-0.5">{product.name}</p>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mb-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-medium text-neutral-700 dark:text-neutral-300">{product.price}</span>
                      <button 
                        onClick={() => window.open(`mailto:grovesolutions.contact@gmail.com?subject=Add ${product.name}`)}
                        className="text-[10px] font-medium text-brand-600 dark:text-brand-400 hover:underline"
                      >
                        Add →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      )}

      {/* Upgrade CTA */}
      <FadeIn delay={200}>
        <div className="portal-card p-3 sm:p-4 border-dashed flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <LineIcon name="rocket-5" className="text-white text-xs sm:text-sm" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-100">Custom Solution?</p>
              <p className="text-[10px] text-neutral-500 dark:text-neutral-400 hidden sm:block">Get a tailored package</p>
            </div>
          </div>
          <button 
            onClick={onUpgrade}
            className="btn-leaf px-3 py-1.5 rounded-lg text-[10px] sm:text-xs whitespace-nowrap"
          >
            Contact Us
          </button>
        </div>
      </FadeIn>

      {/* Billing Section */}
      <FadeIn delay={250}>
        <div className="mt-4 md:mt-6 portal-card p-4 text-center">
          <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-2">
            <LineIcon name="credit-card-multiple" className="text-lg text-neutral-400" />
          </div>
          <p className="text-xs font-medium text-neutral-800 dark:text-neutral-100 mb-1">Billing Coming Soon</p>
          <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mb-2">
            For billing inquiries, contact support.
          </p>
          <button 
            onClick={onContact}
            className="text-[10px] text-brand-600 dark:text-brand-400 hover:underline"
          >
            Contact Support →
          </button>
        </div>
      </FadeIn>
    </div>
  );
};

export default LicenseManagement;
