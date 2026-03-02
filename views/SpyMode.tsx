
import React, { useState } from 'react';
import { SpyResult } from '../types';
import { spyOnCompetitor } from '../services/geminiService';
import {
  Search,
  Shield,
  Zap,
  Target,
  Diamond,
  ChevronRight,
  RefreshCw,
  Lock,
  Eye,
  Crosshair,
  AlertTriangle,
  FileText,
  Activity,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';

const SpyMode: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [result, setResult] = useState<SpyResult | null>(null);

  const handleSpy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search) return;
    setLoading(true);
    try {
      const data = await spyOnCompetitor(search);
      setResult(data);
    } catch (error: unknown) {
      console.error(error);
      alert('Intelligence gathering failed. Target defense system holding.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col space-y-12">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-10">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/5 border border-red-500/20 rounded-lg text-[10px] font-black uppercase tracking-[0.4em] text-red-500 animate-pulse">
            <Lock className="w-3 h-3" />
            Infiltration protocol // Active_01
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter text-glow-red leading-[0.8] mb-2">
            Spy <span className="text-white">Mode</span>
          </h1>
          <p className="text-gray-500 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.4em] ml-1">Competitive Reconnaissance // Vulnerability Mapping</p>
        </div>

        <form onSubmit={handleSpy} className="relative w-full lg:w-[480px] group">
          <div className="absolute inset-0 bg-red-600/5 rounded-3xl blur-[40px] opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
          <div className="relative glass-dark rounded-3xl border border-white/10 group-focus-within:border-red-500/30 overflow-hidden transition-all">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-red-500 transition-colors">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Designate Target Entity..."
              className="w-full bg-transparent py-7 md:py-8 pl-16 pr-20 focus:outline-none font-bold uppercase tracking-widest text-xs placeholder:text-gray-800"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-red-600 text-white rounded-2xl hover:bg-red-500 transition-all disabled:opacity-50 shadow-xl shadow-red-900/20 flex items-center justify-center glow-red active:scale-90"
            >
              {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </form>
      </header>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center py-32 space-y-10">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-red-500/10 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-red-500 rounded-full animate-spin"></div>
            <Eye className="absolute inset-0 m-auto w-8 h-8 text-red-500 animate-pulse" />
          </div>
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-black uppercase tracking-tight text-glow-red">Harvesting Intelligence...</h2>
            <p className="text-gray-600 font-mono text-[10px] uppercase tracking-[0.3em]">Accessing Proprietary Data Nodes</p>
          </div>
        </div>
      ) : result && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          {/* Target Profile Dossier */}
          <div className="lg:col-span-8 space-y-10">
            <div className="glass-card-active rounded-[3rem] border border-red-500/10 p-10 md:p-14 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                <Crosshair className="w-80 h-80 rotate-12 text-red-500" />
              </div>

              <div className="flex flex-col md:flex-row items-start gap-10 mb-16 relative z-10">
                <div className="w-24 h-24 bg-red-600 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.3)] relative overflow-hidden group-hover:scale-110 transition-transform">
                  <Shield className="w-10 h-10 text-white relative z-10" />
                  <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded text-[9px] font-black uppercase tracking-widest text-red-500">Confirmed_Target</span>
                    <span className="text-gray-600 font-mono text-[9px] uppercase tracking-widest">Hash: {Math.random().toString(16).substr(2, 8)}</span>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-glow-red leading-none">{result.name}</h2>
                  <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em]">Institutional Overview // Tactical Scan</p>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 border-t border-white/5 pt-12 relative z-10">
                <SpyData label="Chief Architect" value={result.founder} icn={<FileText className="w-3.5 h-3.5" />} />
                <SpyData label="Estimated Reserves" value={result.estimatedRevenue} icn={<Zap className="w-3.5 h-3.5 text-yellow-500" />} />
                <SpyData label="Market Dominance" value={result.marketShare} icn={<Target className="w-3.5 h-3.5 text-cyan-500" />} />
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] flex items-center gap-2">
                    <Activity className="w-3 h-3" />
                    Hostility Level
                  </span>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest border ${result.pressureLevel === 'High' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                      result.pressureLevel === 'Medium' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 'bg-green-500/10 text-green-500 border-green-500/20'
                    }`}>
                    {result.pressureLevel} Hostility
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SpySection title="Operational Strengths" items={result.strengths} variant="strength" />
              <SpySection title="Target Vulnerabilities" items={result.weaknesses} variant="weakness" />
            </div>
          </div>

          {/* Tactical Insertion Ideas */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="glass-card p-10 rounded-[3rem] border border-cyan-500/10 h-full relative group">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-cyan-500/5 blur-[40px]"></div>
              <div className="flex items-center gap-4 mb-10">
                <div className="p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 text-cyan-500">
                  <Diamond className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-[11px] uppercase tracking-[0.3em] text-cyan-400">Competitive Insertion</h4>
                  <p className="text-[9px] text-gray-600 uppercase tracking-widest font-mono">Opportunity Vectors</p>
                </div>
              </div>

              <div className="space-y-6">
                {result.differentiationIdeas.map((item, idx) => (
                  <div key={idx} className="flex gap-5 group/item">
                    <div className="mt-1.5 w-1.5 h-4 bg-cyan-500/20 group-hover/item:bg-cyan-500 rounded-full transition-colors shrink-0"></div>
                    <p className="text-[13px] text-gray-400 leading-relaxed font-outfit font-medium group-hover:text-white transition-colors capitalize-first">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-10 border-t border-white/5 space-y-6">
                <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-gray-700">
                  <span>Tactical_Status</span>
                  <span className="text-cyan-500/50">Insertion_Ready</span>
                </div>
                <button className="w-full py-5 glass border border-white/5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all flex items-center justify-center gap-3">
                  Generate Detailed Attack Plan
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SpyData: React.FC<{ label: string; value?: string; icn: React.ReactNode }> = ({ label, value, icn }) => (
  <div className="space-y-3">
    <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] flex items-center gap-2">
      {icn}
      {label}
    </span>
    <span className="text-lg font-black text-gray-200 tracking-tight block font-outfit truncate">{value || 'Unknown'}</span>
  </div>
);

const SpySection: React.FC<{ title: string; items: string[]; variant: 'strength' | 'weakness' }> = ({ title, items, variant }) => (
  <div className="glass-dark p-10 rounded-[3.5rem] border border-white/5 group relative overflow-hidden">
    <div className={`absolute -top-10 -right-10 w-40 h-40 ${variant === 'strength' ? 'bg-cyan-500/5' : 'bg-red-500/5'} blur-[60px]`}></div>
    <h4 className={`font-black text-[11px] uppercase tracking-[0.4em] mb-10 flex items-center gap-3 ${variant === 'strength' ? 'text-cyan-500' : 'text-red-500'}`}>
      {variant === 'strength' ? <Shield className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
      {title}
    </h4>
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-4 p-5 glass rounded-2xl border border-white/5 hover:bg-white/5 transition-all">
          <span className={`text-[10px] font-black ${variant === 'strength' ? 'text-cyan-400' : 'text-red-400'}`}>0{idx + 1}</span>
          <p className="text-[13px] text-gray-400 font-medium leading-relaxed capitalize-first">{item}</p>
        </div>
      ))}
    </div>
  </div>
);

export default SpyMode;
