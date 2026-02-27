
import React, { useState, useEffect } from 'react';
import { AppState } from '../types';
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  LogOut,
  ChevronRight,
  Zap,
  Activity,
  User,
  LogIn,
  Menu,
  X,
  Target,
  ChevronLeft,
  Globe
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeState: AppState;
  onNavigate: (state: AppState) => void;
  user: { name: string; email: string } | null;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeState, onNavigate, user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Close mobile menu on navigation
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
  }, [activeState]);

  if (activeState === AppState.LANDING) return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#0A0F14] text-white flex flex-col md:flex-row overflow-hidden relative">
      {/* Global Textures */}
      <div className="scanline"></div>
      <div className="noise"></div>
      <div className="absolute inset-0 tactical-grid opacity-20 pointer-events-none"></div>

      {/* Background Mock Activity Cards (Visual Only) */}
      <div className="absolute top-32 right-12 w-64 h-32 glass-card rounded-2xl p-5 opacity-10 pointer-events-none rotate-3 hidden lg:block z-0">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-3 h-3 text-cyan-400" />
          <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-cyan-400">Live Stream // Node_04</span>
        </div>
        <div className="space-y-3">
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-cyan-500/30"></div>
          </div>
          <div className="h-1 w-4/5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-cyan-500/30"></div>
          </div>
          <div className="h-1 w-3/5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-4/5 bg-cyan-500/30"></div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden h-16 border-b border-white/[0.08] glass-dark flex items-center justify-between px-4 z-[60] sticky top-0">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate(AppState.LANDING)}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center font-bold text-lg shadow-lg glow-cyan">
            A
          </div>
          <span className="font-black text-lg tracking-tighter text-glow uppercase">AUTOPSY</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-cyan-400 hover:bg-white/5 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar - Desktop & Tablet */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-[70] md:relative md:z-50
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isSidebarCollapsed ? 'md:w-20' : 'md:w-72'}
          w-72 border-r border-white/[0.08] glass-dark p-6 flex flex-col gap-8 transition-all duration-300
        `}
      >
        {/* Collapse Toggle - Tablet/Desktop only */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="hidden md:flex absolute -right-3 top-24 w-6 h-6 bg-cyan-500 rounded-full items-center justify-center text-black shadow-lg hover:scale-110 transition-transform z-[80]"
        >
          {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        <div
          className={`flex items-center gap-3 cursor-pointer group mb-4 ${isSidebarCollapsed ? 'justify-center' : ''}`}
          onClick={() => onNavigate(AppState.LANDING)}
        >
          <div className="w-10 h-10 min-w-[40px] bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center font-bold text-2xl shadow-lg glow-cyan group-hover:scale-105 transition-transform">
            A
          </div>
          {!isSidebarCollapsed && (
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tighter leading-none text-glow uppercase">AUTOPSY</span>
              <span className="text-cyan-400 font-bold text-[10px] tracking-[0.2em] uppercase">Laboratory</span>
            </div>
          )}
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto">
          <SidebarLink
            active={activeState === AppState.ANALYZER}
            onClick={() => onNavigate(AppState.ANALYZER)}
            icon={<LayoutDashboard className="w-5 h-5" />}
            label="Analyzer"
            type="analyzer"
            collapsed={isSidebarCollapsed}
          />
          <SidebarLink
            active={activeState === AppState.SPY_MODE}
            onClick={() => onNavigate(AppState.SPY_MODE)}
            icon={<Target className="w-5 h-5" />}
            label="Spy Mode"
            type="spy"
            collapsed={isSidebarCollapsed}
          />
          <SidebarLink
            active={activeState === AppState.TREND_RADAR}
            onClick={() => onNavigate(AppState.TREND_RADAR)}
            icon={<Globe className="w-5 h-5" />}
            label="Trend Radar"
            type="neutral"
            collapsed={isSidebarCollapsed}
          />
          <div className={`pt-6 pb-2 ${isSidebarCollapsed ? 'flex justify-center' : ''}`}>
            {!isSidebarCollapsed ? (
              <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] ml-4">Community</span>
            ) : (
              <div className="h-[1px] w-8 bg-gray-800"></div>
            )}
          </div>
          <SidebarLink
            active={activeState === AppState.PUBLIC_FORUM}
            onClick={() => onNavigate(AppState.PUBLIC_FORUM)}
            icon={<MessageSquare className="w-5 h-5" />}
            label="Public Forum"
            type="neutral"
            collapsed={isSidebarCollapsed}
          />
          <SidebarLink
            active={activeState === AppState.EXPERTS}
            onClick={() => onNavigate(AppState.EXPERTS)}
            icon={<Users className="w-5 h-5" />}
            label="Experts"
            type="neutral"
            collapsed={isSidebarCollapsed}
          />
        </nav>

        {user && (
          <div className={`mt-auto p-4 glass rounded-2xl border border-white/5 flex items-center gap-3 group ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 min-w-[40px] rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center border border-white/10 shadow-lg">
              <User className="w-5 h-5 text-gray-400" />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate tracking-tight">{user.name}</p>
                <p className="text-[10px] text-gray-500 truncate lowercase font-mono">{user.email}</p>
              </div>
            )}
            {!isSidebarCollapsed && (
              <button
                onClick={onLogout}
                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[65] md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative z-10 flex flex-col">
        {/* Top Header - Desktop/Tablet */}
        <header className="hidden md:flex h-20 border-b border-white/[0.05] items-center justify-end px-8 glass-dark sticky top-0 z-40">
          {!user ? (
            <button
              onClick={() => onNavigate(AppState.AUTH)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-500/5 transition-all text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 min-h-[44px]"
            >
              <LogIn className="w-4 h-4" />
              Authenticate
            </button>
          ) : (
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-500 font-mono text-[9px] uppercase tracking-[0.3em]">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                System Online
              </div>
              <div className="h-4 w-[1px] bg-white/10"></div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Credits</span>
                  <span className="text-xs font-black text-cyan-400 tracking-tighter">1,240</span>
                </div>
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
                  <Zap className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
            </div>
          )}
        </header>

        <div className="p-4 sm:p-8 md:p-12 lg:p-16 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
};

interface SidebarLinkProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  type: 'analyzer' | 'spy' | 'neutral';
  collapsed?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ active, onClick, icon, label, type, collapsed }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all group relative overflow-hidden min-h-[44px] ${active
      ? (type === 'analyzer' ? 'sidebar-active-cyan' : type === 'spy' ? 'sidebar-active-red' : 'sidebar-active-cyan')
      : 'text-gray-500 hover:text-gray-200 hover:bg-white/[0.03]'
      } ${collapsed ? 'justify-center' : ''}`}
    title={collapsed ? label : ''}
  >
    <div className="flex items-center gap-3 relative z-10">
      <div className={`transition-colors ${active
        ? (type === 'analyzer' ? 'text-cyan-400' : type === 'spy' ? 'text-red-400' : 'text-white')
        : 'group-hover:text-gray-300'
        }`}>
        {icon}
      </div>
      {!collapsed && (
        <span className={`text-sm font-bold tracking-tight ${active && type === 'analyzer' ? 'font-black uppercase tracking-tighter' : ''}`}>
          {label}
        </span>
      )}
    </div>
    {active && !collapsed && <ChevronRight className="w-4 h-4 relative z-10" />}
  </button>
);

export default Layout;
