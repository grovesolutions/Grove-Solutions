import React, { useState } from 'react';
import LineIcon from '../LineIcon';

interface PortalLayoutProps {
  children: React.ReactNode;
  currentSection: 'dashboard' | 'licenses' | 'analytics' | 'settings';
  onNavigate: (section: 'dashboard' | 'licenses' | 'analytics' | 'settings') => void;
  onLogout: () => void;
  userName?: string;
  userEmail?: string;
  companyName?: string;
}

const PortalLayout: React.FC<PortalLayoutProps> = ({ 
  children, 
  currentSection, 
  onNavigate, 
  onLogout,
  userName = 'User',
  userEmail = '',
  companyName = 'My Business'
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard' as const, icon: 'grid-1', label: 'Dashboard' },
    { id: 'licenses' as const, icon: 'license', label: 'Products' },
    { id: 'analytics' as const, icon: 'graph', label: 'Analytics' },
    { id: 'settings' as const, icon: 'cog', label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 relative">
      {/* Mist Background (same as landing) */}
      <div className="mist-wrapper opacity-30 pointer-events-none">
        <div className="mist-orb mist-orb-1"></div>
        <div className="mist-orb mist-orb-2"></div>
        <div className="mist-orb mist-orb-3"></div>
      </div>

      {/* Desktop Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-r border-neutral-200/60 dark:border-neutral-800/60 z-50 transition-all duration-300 hidden md:flex flex-col ${
        sidebarCollapsed ? 'w-[60px]' : 'w-56'
      }`}>
        {/* Logo Header */}
        <div className="p-3 border-b border-neutral-200/60 dark:border-neutral-800/60">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/grove-solutions.firebasestorage.app/o/grovelogo-removebg%20(1).png?alt=media&token=3a875928-dcbb-42fb-b686-fbe6d8be917a" 
                alt="Grove" 
                className="h-6 w-auto"
                style={{ filter: 'brightness(0) saturate(100%) invert(50%) sepia(69%) saturate(450%) hue-rotate(99deg) brightness(88%) contrast(90%)' }}
              />
              {!sidebarCollapsed && (
                <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">Owners Portal</span>
              )}
            </a>
            {!sidebarCollapsed && (
              <button 
                onClick={() => setSidebarCollapsed(true)}
                className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <LineIcon name="arrow-left" className="text-neutral-400 text-xs" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {sidebarCollapsed && (
            <button 
              onClick={() => setSidebarCollapsed(false)}
              className="w-full p-2 mb-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center"
              title="Expand menu"
            >
              <LineIcon name="menu-hamburger-1" className="text-neutral-500 text-sm" />
            </button>
          )}
          
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              title={item.label}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all duration-200 ${
                currentSection === item.id
                  ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                currentSection === item.id
                  ? 'bg-brand-100 dark:bg-brand-900/40'
                  : 'bg-neutral-100 dark:bg-neutral-800'
              }`}>
                <LineIcon name={item.icon} className={`text-sm ${
                  currentSection === item.id ? 'text-brand-600 dark:text-brand-400' : ''
                }`} />
              </div>
              {!sidebarCollapsed && (
                <span className="text-xs font-medium">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        {/* User Profile Footer */}
        <div className="p-2 border-t border-neutral-200/60 dark:border-neutral-800/60">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-medium text-[10px]">
                {(userName || 'U').charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200 truncate">{userName}</p>
              </div>
              <button 
                onClick={onLogout}
                className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                title="Sign out"
              >
                <LineIcon name="exit" className="text-neutral-400 text-xs" />
              </button>
            </div>
          ) : (
            <button 
              onClick={onLogout}
              className="w-full p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center"
              title="Sign out"
            >
              <LineIcon name="exit" className="text-neutral-500 text-sm" />
            </button>
          )}
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-12 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-200/60 dark:border-neutral-800/60 z-50 flex items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 -ml-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <LineIcon name={mobileMenuOpen ? 'xmark' : 'menu-hamburger-1'} className="text-lg text-neutral-700 dark:text-neutral-300" />
          </button>
          <img 
            src="https://firebasestorage.googleapis.com/v0/b/grove-solutions.firebasestorage.app/o/grovelogo-removebg%20(1).png?alt=media&token=3a875928-dcbb-42fb-b686-fbe6d8be917a" 
            alt="Grove" 
            className="h-5 w-auto"
            style={{ filter: 'brightness(0) saturate(100%) invert(50%) sepia(69%) saturate(450%) hue-rotate(99deg) brightness(88%) contrast(90%)' }}
          />
        </div>
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-medium text-[10px]">
          {(userName || 'U').charAt(0).toUpperCase()}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="w-64 h-full bg-white dark:bg-neutral-900 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-semibold text-xs">
                  {companyName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200">{companyName}</p>
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">{userEmail}</p>
                </div>
              </div>
            </div>
            <nav className="p-2 space-y-0.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors ${
                    currentSection === item.id
                      ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <LineIcon name={item.icon} className="text-base" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
            <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-neutral-200 dark:border-neutral-800">
              <button 
                onClick={onLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LineIcon name="exit" className="text-base" />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className={`relative z-10 transition-all duration-300 ${
        sidebarCollapsed ? 'md:ml-[60px]' : 'md:ml-56'
      } pt-12 md:pt-0`}>
        <div className="min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
};

export default PortalLayout;
