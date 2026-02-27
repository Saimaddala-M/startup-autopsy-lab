
import React, { useState } from 'react';
import { StartupInput, AnalysisResult } from '../types';
import { analyzeStartup } from '../services/geminiService';
import {
  TrendingUp,
  Target,
  Zap,
  Rocket,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

const Analyzer: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [form, setForm] = useState<StartupInput>({
    name: '',
    problem: '',
    audience: '',
    industry: '',
    revenueModel: '',
    competitors: '',
    budget: 'bootstrap'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const analysis = await analyzeStartup(form);
      setResult(analysis);
    } catch (error: any) {
      console.error("Analysis Error:", error);
      const errorMessage = error.message || "Unknown error";
      const errorStatus = error.status || "500";

      if (errorStatus === 429 || errorMessage.includes('429') || errorMessage.includes('quota')) {
        alert('Strategic audit quota exceeded. The lab is currently at capacity. Please wait a few minutes.');
      } else {
        alert(`Strategic analysis failed: ${errorMessage} (Status: ${errorStatus})`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-8">
        <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Analyzing Market Dynamics...</h2>
          <p className="text-gray-500">Retrieving intelligence, calculating risk vectors, and mapping growth.</p>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-[26px] sm:text-[32px] md:text-[42px] font-black mb-2 text-glow uppercase tracking-tighter leading-tight">Analysis: {form.name}</h1>
            <p className="text-gray-400 font-mono text-[10px] md:text-xs uppercase tracking-widest">Strategic intelligence report // AutoPsy Core</p>
          </div>
          <button
            onClick={() => setResult(null)}
            className="w-full md:w-auto px-6 py-3 text-sm font-bold bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 min-h-[44px] transition-all active:scale-95"
          >
            New Analysis
          </button>
        </div>

        {/* KPI Dashboard */}
        <div className="flex overflow-x-auto pb-4 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 snap-x no-scrollbar">
          <div className="min-w-[280px] md:min-w-0 snap-center flex-1">
            <KpiCard label="Growth Potential" value={`${result.growthPotential}/10`} color="text-green-500" icon={<TrendingUp className="w-4 h-4" />} />
          </div>
          <div className="min-w-[280px] md:min-w-0 snap-center flex-1">
            <KpiCard label="Risk Level" value={result.riskScore} color={result.riskScore === 'Low' ? 'text-green-500' : result.riskScore === 'Medium' ? 'text-yellow-500' : 'text-red-500'} icon={<ShieldAlert className="w-4 h-4" />} />
          </div>
          <div className="min-w-[280px] md:min-w-0 snap-center flex-1">
            <KpiCard label="Market Gap" value={result.marketGapStrength} color={result.marketGapStrength === 'Strong' ? 'text-green-500' : result.marketGapStrength === 'Moderate' ? 'text-yellow-500' : 'text-red-500'} icon={<Target className="w-4 h-4" />} />
          </div>
          <div className="min-w-[280px] md:min-w-0 snap-center flex-1">
            <KpiCard label="AI Confidence" value={`${result.confidenceScore}%`} color="text-cyan-500" icon={<Zap className="w-4 h-4" />} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column */}
          <div className="space-y-6 md:space-y-8">
            <div className="glass-dark p-6 md:p-8 rounded-3xl border border-white/10">
              <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2 uppercase tracking-tight">
                <span className="w-2 h-6 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)]"></span>
                1. What Problem Is Being Solved?
              </h3>
              <p className="text-gray-300 leading-relaxed">{result.problemSolved}</p>
            </div>

            <div className="glass-dark p-6 md:p-8 rounded-3xl border border-white/10">
              <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2 uppercase tracking-tight">
                <span className="w-2 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
                2. Who Is This For?
              </h3>
              <p className="text-gray-300 leading-relaxed">{result.targetUsers}</p>
            </div>

            <ListCard title="3. Why Might It Work?" items={result.whyItMightWork} icon={<TrendingUp className="w-5 h-5 text-green-500" />} />
          </div>

          {/* Right Column */}
          <div className="space-y-6 md:space-y-8">
            <ListCard title="4. What Are the Main Risks?" items={result.mainRisks} icon={<ShieldAlert className="w-5 h-5 text-red-500" />} />

            <div className="glass-dark p-6 md:p-8 rounded-3xl border border-white/10">
              <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2 uppercase tracking-tight">
                <span className="w-2 h-6 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                5. Monetization Check
              </h3>
              <p className="text-gray-300 leading-relaxed">{result.monetizationCheck}</p>
            </div>

            <ListCard title="6. What Should Be Improved?" items={result.improvements} icon={<Rocket className="w-5 h-5 text-blue-500" />} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-4 md:py-8 font-sans">
      {/* Hero Section */}
      <div className="glass-dark p-6 sm:p-10 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-cyan-500/20 mb-8 md:mb-12 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity hidden sm:block">
          <Target className="w-64 h-64 -rotate-12 text-cyan-500" />
        </div>
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-md text-[9px] font-black uppercase tracking-[0.4em] text-cyan-400 animate-pulse mb-6">
            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(0,229,255,0.6)]"></div>
            Strategic Core: Online
          </div>
          <h1 className="text-[28px] sm:text-[42px] md:text-[56px] lg:text-[72px] font-black uppercase tracking-tighter text-glow-cyan leading-[0.9] mb-4">Run Startup Autopsy</h1>
          <p className="text-gray-400 font-medium text-base md:text-lg tracking-tight max-w-xl mx-auto leading-relaxed">Dissect your idea before the market does. Identify failure patterns and strategic growth vectors.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 glass-dark p-6 sm:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity hidden sm:block">
          <Rocket className="w-64 h-64 -rotate-12" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10">
          <InputGroup label="Startup Name" value={form.name} onChange={v => setForm({ ...form, name: v })} placeholder="e.g. NexusFlow" />
          <InputGroup label="Industry" value={form.industry} onChange={v => setForm({ ...form, industry: v })} placeholder="e.g. Fintech, SaaS" />
        </div>

        <div className="space-y-2 relative z-10">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">Tell your idea</label>
          <textarea
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 focus:outline-none focus:border-cyan-500/50 transition-all text-white placeholder:text-gray-700 font-medium leading-relaxed input-glow text-sm md:text-base"
            rows={4}
            placeholder="Describe your startup idea or the critical pain point you are eliminating."
            value={form.problem}
            onChange={e => setForm({ ...form, problem: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10">
          <InputGroup label="Target Audience" value={form.audience} onChange={v => setForm({ ...form, audience: v })} placeholder="e.g. SMB Owners" />
          <InputGroup label="Revenue Model" value={form.revenueModel} onChange={v => setForm({ ...form, revenueModel: v })} placeholder="e.g. Subscription, Freemium" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10">
          <InputGroup label="Direct Competitors" value={form.competitors || ''} onChange={v => setForm({ ...form, competitors: v })} placeholder="Who else is in the ring?" />
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">Capital Stage</label>
            <div className="relative">
              <select
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 focus:outline-none focus:border-cyan-500/50 transition-all text-white appearance-none font-bold text-sm uppercase tracking-widest min-h-[44px]"
                value={form.budget}
                onChange={e => setForm({ ...form, budget: e.target.value as StartupInput['budget'] })}
              >
                <option value="bootstrap">Bootstrap / Zero</option>
                <option value="seed">Seed Funding</option>
                <option value="series-a">Series A / Scaled</option>
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <ChevronRight className="w-5 h-5 rotate-90" />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-5 md:py-6 bg-cyan-500 text-black font-black text-xs md:text-sm uppercase tracking-[0.3em] hover:bg-cyan-400 transition-all transform hover:scale-[1.01] active:scale-95 shadow-xl glow-cyan relative z-10 group rounded-2xl min-h-[44px]"
        >
          Run Autopsy
        </button>
      </form>
    </div>
  );
};

const InputGroup: React.FC<{ label: string; value: string; onChange: (v: string) => void; placeholder: string }> = ({ label, value, onChange, placeholder }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">{label}</label>
    <input
      type="text"
      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-cyan-500/50 transition-all text-white placeholder:text-gray-600 text-sm md:text-base min-h-[44px]"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      required
    />
  </div>
);

const KpiCard: React.FC<{ label: string; value: string; color: string; icon: React.ReactNode }> = ({ label, value, color, icon }) => (
  <div className="glass-dark p-6 rounded-2xl border border-white/10 flex flex-col justify-between h-32 group hover:border-white/20 transition-all relative overflow-hidden">
    <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 -mr-8 -mt-8 rotate-45 group-hover:bg-white/10 transition-colors"></div>
    <div className="flex items-center justify-between relative z-10">
      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">{label}</span>
      <div className={`${color} opacity-40 group-hover:opacity-100 transition-opacity`}>{icon}</div>
    </div>
    <span className={`text-2xl md:text-3xl font-black ${color} relative z-10 font-mono tracking-tighter`}>{value}</span>
  </div>
);

const ListCard: React.FC<{ title: string; items: string[]; icon: React.ReactNode }> = ({ title, items, icon }) => (
  <div className="glass-dark p-6 rounded-3xl border border-white/10">
    <h4 className="font-bold mb-4 flex items-center gap-2 text-sm md:text-base uppercase tracking-tight">
      {icon}
      {title}
    </h4>
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="text-xs md:text-sm text-gray-400 flex gap-2 leading-relaxed">
          <span className="text-cyan-500">•</span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default Analyzer;
