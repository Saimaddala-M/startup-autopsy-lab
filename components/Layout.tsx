
import React, { useState } from 'react';
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
  Globe,
  History
} from 'lucide-react';

// constants used for footer
const WEBSITE_URL = 'https://yourwebsite.com';
const VERSION = '1.1.0';


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

  const navigate = (state: AppState) => {
    setIsMobileMenuOpen(false);
    onNavigate(state);
  };

  if (activeState === AppState.LANDING) return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#080A0C] text-white flex flex-col md:flex-row overflow-hidden relative font-sans">
      {/* Global Textures */}
      <div className="scanline"></div>
      <div className="noise"></div>
      <div className="absolute inset-0 tactical-grid opacity-40 pointer-events-none"></div>

      {/* Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Background Mock Activity Cards */}
      <div className="absolute top-32 right-12 w-64 h-32 glass-card rounded-2xl p-5 opacity-20 pointer-events-none rotate-3 hidden lg:block z-0 animate-float-slow">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-3 h-3 text-cyan-400" />
          <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-cyan-400">Node_04 // Live Data</span>
        </div>
        <div className="space-y-3">
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-cyan-500/40"></div>
          </div>
          <div className="h-1 w-4/5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-cyan-500/40"></div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden h-16 border-b border-white/[0.08] glass-dark flex items-center justify-between px-6 z-[60] sticky top-0">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate(AppState.LANDING)}
        >
          <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center font-bold text-xl shadow-[0_0_20px_rgba(6,182,212,0.3)]">
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

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-[70] md:relative md:z-50
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isSidebarCollapsed ? 'md:w-20' : 'md:w-72'}
          border-r border-white/[0.06] glass-dark flex flex-col transition-all duration-500 ease-in-out
        `}
      >
        {/* Collapse Toggle */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="hidden md:flex absolute -right-3 top-24 w-6 h-6 bg-cyan-500 rounded-full items-center justify-center text-black shadow-lg hover:scale-110 transition-transform z-[80] group"
        >
          {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          <div className="absolute left-full ml-4 px-2 py-1 glass rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {isSidebarCollapsed ? 'Expand' : 'Collapse'}
          </div>
        </button>

        <div className="p-8">
          <div
            className={`flex items-center gap-4 cursor-pointer group mb-12 ${isSidebarCollapsed ? 'justify-center' : ''}`}
            onClick={() => onNavigate(AppState.LANDING)}
          >
            <div className="w-11 h-11 min-w-[44px] bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center font-black text-2xl shadow-[0_0_30px_rgba(6,182,212,0.4)] group-hover:scale-105 transition-all duration-500 glow-cyan">
              A
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tighter leading-none text-glow uppercase">AUTOPSY</span>
                <span className="text-cyan-400 font-black text-[10px] tracking-[0.3em] uppercase opacity-70">Laboratory</span>
              </div>
            )}
          </div>

          <nav className="space-y-2">
            <SidebarLink
              active={activeState === AppState.ANALYZER}
              onClick={() => navigate(AppState.ANALYZER)}
              icon={<LayoutDashboard className="w-5 h-5" />}
              label="Analyzer"
              type="analyzer"
              collapsed={isSidebarCollapsed}
            />
            <SidebarLink
              active={activeState === AppState.SPY_MODE}
              onClick={() => navigate(AppState.SPY_MODE)}
              icon={<Target className="w-5 h-5" />}
              label="Spy Mode"
              type="spy"
              collapsed={isSidebarCollapsed}
            />
            <SidebarLink
              active={activeState === AppState.TREND_RADAR}
              onClick={() => navigate(AppState.TREND_RADAR)}
              icon={<Globe className="w-5 h-5" />}
              label="Trend Radar"
              type="neutral"
              collapsed={isSidebarCollapsed}
            />
            <SidebarLink
              active={activeState === AppState.HISTORY}
              onClick={() => navigate(AppState.HISTORY)}
              icon={<History className="w-5 h-5" />}
              label="Archive"
              type="neutral"
              collapsed={isSidebarCollapsed}
            />

            <div className={`pt-8 pb-3 ${isSidebarCollapsed ? 'flex justify-center' : 'px-4'}`}>
              {!isSidebarCollapsed ? (
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.5em]">Network</span>
              ) : (
                <div className="h-[1px] w-8 bg-white/5"></div>
              )}
            </div>

            <SidebarLink
              active={activeState === AppState.PUBLIC_FORUM}
              onClick={() => navigate(AppState.PUBLIC_FORUM)}
              icon={<MessageSquare className="w-5 h-5" />}
              label="Public Forum"
              type="neutral"
              collapsed={isSidebarCollapsed}
            />
            <SidebarLink
              active={activeState === AppState.EXPERTS}
              onClick={() => navigate(AppState.EXPERTS)}
              icon={<Users className="w-5 h-5" />}
              label="Experts"
              type="neutral"
              collapsed={isSidebarCollapsed}
            />
          </nav>
        </div>

        {user && (
          <div className="mt-auto p-6 border-t border-white/[0.04]">
            <div className={`flex items-center gap-4 group ${isSidebarCollapsed ? 'justify-center' : 'p-3 glass rounded-2xl border border-white/5'}`}>
              <div className="w-10 h-10 min-w-[40px] rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg group-hover:border-cyan-500/50 transition-colors">
                <User className="w-5 h-5 text-cyan-400/70" />
              </div>
              {!isSidebarCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate tracking-tight text-white/90">{user.name}</p>
                  <p className="text-[10px] text-gray-500 truncate lowercase font-mono opacity-60">{user.email}</p>
                </div>
              )}
              {!isSidebarCollapsed && (
                <button
                  onClick={onLogout}
                  className="p-2 text-gray-500 hover:text-red-500 transition-all hover:scale-110"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative z-10 flex flex-col selection:bg-cyan-500/20">
        {/* Top Header */}
        <header className="hidden md:flex h-20 border-b border-white/[0.04] items-center justify-between px-10 glass-dark sticky top-0 z-40">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/5 animate-pulse">
              <div className="w-2 h-2 bg-cyan-500 rounded-full glow-cyan"></div>
              <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em]">Satellite Intelligence Live</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            {user ? (
              <>
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest opacity-60">Session Credits</span>
                    <span className="text-sm font-black text-white tracking-tighter glow-cyan">1,240 <span className="text-[10px] text-cyan-400">XP</span></span>
                  </div>
                  <div className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center shadow-inner hover:border-cyan-500/50 transition-all group cursor-pointer">
                    <Zap className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              </>
            ) : (
              <button
                onClick={() => navigate(AppState.AUTH)}
                className="btn-premium flex items-center gap-3 px-6 py-3 bg-cyan-500 text-black rounded-xl font-black text-[11px] uppercase tracking-[0.2em] shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)]"
              >
                <LogIn className="w-4 h-4" />
                Establish Connection
              </button>
            )}
          </div>
        </header>

        <div className="p-6 md:p-10 lg:p-16 flex-1 max-w-7xl mx-auto w-full">
          {children}
        </div>

        <footer className="w-full border-t border-white/[0.04] p-8 flex flex-col md:flex-row items-center justify-between gap-4 opacity-40 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            <span className="text-[10px] font-black uppercase tracking-widest">Mainframe Stable v{VERSION}</span>
          </div>
          <div className="flex items-center gap-6">
            <a href={WEBSITE_URL} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-widest hover:text-cyan-400 transition-colors">
              Tactical Support
            </a>
            <span className="text-gray-700">|</span>
            <span className="text-[10px] font-black uppercase tracking-widest">© 2026 Autopsy Lab</span>
          </div>
        </footer>
      </main>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[65] md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
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
    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group relative overflow-hidden min-h-[52px] ${active
      ? (type === 'analyzer' ? 'sidebar-active-cyan' : type === 'spy' ? 'sidebar-active-red' : 'sidebar-active-cyan')
      : 'text-white/40 hover:text-white hover:bg-white/[0.04]'
      } ${collapsed ? 'justify-center' : ''}`}
    title={collapsed ? label : ''}
  >
    <div className="flex items-center gap-4 relative z-10">
      <div className={`transition-all duration-500 ${active
        ? (type === 'analyzer' ? 'text-white' : type === 'spy' ? 'text-white' : 'text-white')
        : 'group-hover:text-cyan-400 group-hover:scale-110'
        }`}>
        {icon}
      </div>
      {!collapsed && (
        <span className={`text-sm font-bold tracking-tight transition-all ${active ? 'font-black uppercase tracking-widest translate-x-1' : 'group-hover:translate-x-1'}`}>
          {label}
        </span>
      )}
    </div>
    {active && !collapsed && <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_#fff]"></div>}
  </button>
);

export default Layout;
