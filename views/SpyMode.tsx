
import React, { useState } from 'react';
import { SpyResult } from '../types';
import { spyOnCompetitor } from '../services/geminiService';
import { Search, Shield, Zap, Target, Diamond, ChevronRight, RefreshCw } from 'lucide-react';

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
      const err = error as { status?: number; message?: string };
      if (err.status === 429 || err.message?.includes('429') || err.message?.includes('quota')) {
        alert('Intelligence gathering quota exceeded. Please wait a moment before trying again.');
      } else {
        alert('Intelligence gathering failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto font-sans relative px-1 md:px-0">
      <div className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/5 border border-red-500/20 rounded text-[9px] font-black uppercase tracking-[0.4em] text-red-500 animate-pulse shadow-[0_0_15px_rgba(255,59,59,0.1)]">
            <div className="w-1 h-1 bg-red-500 rounded-full shadow-[0_0_8px_rgba(255,59,59,0.8)]"></div>
            Infiltration Protocol: Active
          </div>
          <h1 className="text-[42px] sm:text-[56px] md:text-[72px] lg:text-[88px] font-black uppercase tracking-tighter text-glow-red leading-[0.85]">Spy mode</h1>
          <p className="text-gray-500 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.4em] ml-1">Competitive Espionage // Operational Blindspots</p>
        </div>
        
        <form onSubmit={handleSpy} className="relative w-full md:w-[440px] group">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600/10 to-transparent rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-700 w-5 h-5 group-focus-within:text-red-500 transition-colors" />
            <input 
              type="text" 
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search Target Entity..."
              className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-5 md:py-6 pl-16 pr-4 focus:outline-none focus:border-red-500/30 transition-all font-mono text-sm placeholder:text-gray-800 input-glow min-h-[56px]"
            />
            <button 
              type="submit"
              disabled={loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-all disabled:opacity-50 shadow-lg glow-red min-h-[44px] min-w-[44px] flex items-center justify-center btn-glow-expand"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </form>
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
          <div className="md:col-span-2 h-64 md:h-96 glass-dark rounded-xl border border-white/5"></div>
          <div className="h-64 md:h-96 glass-dark rounded-xl border border-white/5"></div>
          <div className="h-48 md:h-64 glass-dark rounded-xl border border-white/5"></div>
          <div className="h-48 md:h-64 glass-dark rounded-xl border border-white/5"></div>
          <div className="h-48 md:h-64 glass-dark rounded-xl border border-white/5"></div>
        </div>
      )}

      {result && !loading && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Target Profile Card */}
            <div className="lg:col-span-2 glass-dark p-8 md:p-12 rounded-xl border border-red-500/10 relative overflow-hidden group hover-elevation">
              <div className="absolute top-0 right-0 p-10 opacity-[0.01] pointer-events-none group-hover:opacity-[0.03] transition-opacity hidden md:block">
                <Target className="w-64 h-64 rotate-12 text-red-500" />
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-8 mb-10 md:mb-16">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-xl flex items-center justify-center shadow-2xl shadow-red-900/40 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                  <Shield className="w-8 h-8 md:w-10 md:h-10 text-white relative z-10" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-glow leading-tight">{result.name}</h2>
                  <p className="text-red-500 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em]">Company Analysis // Simple Overview</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">
                <DataRow label="Founder" value={result.founder} />
                <DataRow label="Revenue" value={result.estimatedRevenue} />
                <DataRow label="Market Share" value={result.marketShare} />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Pressure Level</span>
                  <span className={`text-sm font-bold font-mono tracking-tight ${
                    result.pressureLevel === 'High' ? 'text-red-500' : 
                    result.pressureLevel === 'Medium' ? 'text-yellow-500' : 'text-green-500'
                  }`}>{result.pressureLevel}</span>
                </div>
              </div>

              <div className="space-y-10">
                <div>
                  <h4 className="font-black text-red-500 uppercase text-[10px] tracking-[0.4em] mb-4 flex items-center gap-2">
                    <Shield className="w-3 h-3" />
                    Where is this company strong?
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.strengths.map((item, idx) => (
                      <div key={idx} className="p-4 bg-white/5 rounded-xl border border-white/5 text-sm text-gray-300 leading-relaxed">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-black text-red-500 uppercase text-[10px] tracking-[0.4em] mb-4 flex items-center gap-2">
                    <Zap className="w-3 h-3" />
                    Where is this company vulnerable?
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.weaknesses.map((item, idx) => (
                      <div key={idx} className="p-4 bg-white/5 rounded-xl border border-white/5 text-sm text-gray-300 leading-relaxed">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Differentiation Ideas Sidebar */}
            <div className="glass-dark p-8 md:p-10 rounded-xl border border-white/5 relative overflow-hidden hover-elevation">
              <div className="flex items-center gap-3 mb-8">
                <div className="text-cyan-500 opacity-60"><Diamond className="w-4 h-4" /></div>
                <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-cyan-500">New Competitor Ideas</h4>
              </div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-6 font-bold">What could be done differently?</p>
              <ul className="space-y-6">
                {result.differentiationIdeas.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-400 flex items-start gap-4 leading-relaxed">
                    <div className="mt-2 w-1.5 h-1.5 bg-cyan-500 rounded-full flex-shrink-0 shadow-[0_0_8px_rgba(0,229,255,0.4)]"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DataRow: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">{label}</span>
    <span className="text-sm font-bold text-gray-200 font-mono tracking-tight">{value || 'N/A'}</span>
  </div>
);

export default SpyMode;
