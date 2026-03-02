
import React, { useState } from 'react';
import { StartupInput, AnalysisResult } from '../types';
import { analyzeStartup } from '../services/geminiService';
import {
  TrendingUp,
  Target,
  Zap,
  Rocket,
  ChevronRight,
  ShieldAlert,
  FileSearch,
  Activity,
  Award,
  Lock,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';

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
      alert(`Strategic analysis failed: ${errorMessage} (Status: ${errorStatus})`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-32 space-y-12">
        <div className="relative">
          <div className="w-32 h-32 border-4 border-cyan-500/10 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-cyan-500 rounded-full animate-spin"></div>
          <FileSearch className="absolute inset-0 m-auto w-10 h-10 text-cyan-500 animate-pulse" />
        </div>
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-black uppercase tracking-tight text-glow-cyan">Dissecting Concept...</h2>
          <div className="flex flex-col items-center gap-2">
            <div className="h-[2px] w-48 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-cyan-500"
                animate={{ x: [-200, 200] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />
            </div>
            <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.4em]">Intelligence Matrix // Vector Mapping</p>
          </div>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header Dossier Style */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-10 border-b border-white/5">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-cyan-500/5 border border-cyan-500/10 rounded-lg text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500">
              <Lock className="w-3 h-3" />
              Institutional Intelligence Dossier // Confident_Level_01
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-glow leading-[0.9]">
              {form.name} <span className="text-cyan-400">Analysis</span>
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-500 font-mono text-[10px] uppercase tracking-widest">
              <span className="flex items-center gap-2"><Activity className="w-3 h-3" /> ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              <span className="flex items-center gap-2"><FileSearch className="w-3 h-3" /> Type: Strategic Audit</span>
              <span className="flex items-center gap-2"><Award className="w-3 h-3" /> Origin: AutoPsy Lab Core</span>
            </div>
          </div>
          <button
            onClick={() => setResult(null)}
            className="group flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all font-black text-[11px] uppercase tracking-[0.2em]"
          >
            New Tactical Scan
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </header>

        {/* Intelligence Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <IntelligenceCard label="Growth Potential" value={`${result.growthPotential}/10`} color="text-cyan-400" icon={<TrendingUp className="w-5 h-5" />} description="Strategic Opportunity Vector" />
          <IntelligenceCard label="Risk Assessment" value={result.riskScore} color={result.riskScore === 'Low' ? 'text-green-400' : result.riskScore === 'Medium' ? 'text-yellow-400' : 'text-red-400'} icon={<ShieldAlert className="w-5 h-5" />} description="Operational Vulnerability" />
          <IntelligenceCard label="Market Strength" value={result.marketGapStrength} color="text-purple-400" icon={<Target className="w-5 h-5" />} description="Gap Infiltration Rating" />
          <IntelligenceCard label="AI Integrity" value={`${result.confidenceScore}%`} color="text-blue-400" icon={<Zap className="w-5 h-5" />} description="Dataset Correlation Confidence" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
            <DossierSection title="Tactical Problem Definition" icon={<FileSearch className="w-5 h-5" />}>
              <p className="text-lg text-gray-300 leading-relaxed font-medium">
                {result.problemSolved}
              </p>
            </DossierSection>

            <DossierSection title="Personnel & Target Demographic" icon={<Target className="w-5 h-5 text-purple-400" />}>
              <p className="text-lg text-gray-300 leading-relaxed font-medium">
                {result.targetUsers}
              </p>
            </DossierSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <DossierList title="Probability of Success" items={result.whyItMightWork} icon={<TrendingUp className="w-5 h-5 text-cyan-500" />} />
              <DossierList title="Failure Trap Vectors" items={result.mainRisks} icon={<ShieldAlert className="w-5 h-5 text-red-500" />} />
            </div>
          </div>

          {/* Side Intelligence Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-card-active p-8 rounded-[2rem] border border-white/5 space-y-8">
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-6 flex items-center gap-2">
                  <Lock className="w-3 h-3" />
                  Monetization Protocol
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed italic font-mono bg-white/5 p-4 rounded-xl border border-white/5">
                  "{result.monetizationCheck}"
                </p>
              </div>

              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-6 flex items-center gap-2">
                  <Rocket className="w-3 h-3" />
                  Strategic Recommendations
                </h3>
                <div className="space-y-3">
                  {result.improvements.map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-4 glass rounded-xl border border-white/5 group hover:border-cyan-500/30 transition-all">
                      <div className="w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-black">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-gray-300 font-medium leading-relaxed group-hover:text-white transition-colors capitalize-first">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center">
      {/* Search Header */}
      <div className="text-center space-y-8 mb-20 max-w-2xl relative">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-cyan-500/5 border border-cyan-500/10 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500 animate-pulse">
          <Zap className="w-3 h-3" />
          Core AI Analyzer // Tactical_V3
        </div>
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-glow-cyan leading-[0.85]">
          Strategic <br /> <span className="text-white">Analysis</span>
        </h1>
        <p className="text-gray-500 font-medium text-lg md:text-xl tracking-tight leading-relaxed font-outfit">
          Subject your vision to intense market pressure. Identify failure points and growth vectors before they manifest.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-10 glass-dark p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-3xl hover:border-cyan-500/20 transition-all group relative overflow-hidden">
        <div className="absolute inset-0 tactical-grid opacity-20 pointer-events-none"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
          <TacticalInput label="Startup Project Title" value={form.name} onChange={v => setForm({ ...form, name: v })} placeholder="Nexus Intelligence" />
          <TacticalInput label="Industry Sector" value={form.industry} onChange={v => setForm({ ...form, industry: v })} placeholder="Cybersecurity / SaaS" />
        </div>

        <div className="space-y-3 relative z-10">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] ml-2">Operational Vision</label>
          <textarea
            className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 focus:outline-none focus:border-cyan-500/50 transition-all text-white placeholder:text-gray-700 font-medium leading-relaxed input-glow text-lg min-h-[160px]"
            placeholder="Document the core problem, your proposed solution, and the unique leverage point your startup occupies."
            value={form.problem}
            onChange={e => setForm({ ...form, problem: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
          <TacticalInput label="Target Demographic" value={form.audience} onChange={v => setForm({ ...form, audience: v })} placeholder="Fortune 500 CISOs" />
          <TacticalInput label="Monetization Strategy" value={form.revenueModel} onChange={v => setForm({ ...form, revenueModel: v })} placeholder="Annual Recurring Revenue" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
          <TacticalInput label="Known Adversaries (Competitors)" value={form.competitors || ''} onChange={v => setForm({ ...form, competitors: v })} placeholder="Palantir, Crowdstrike" />
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] ml-2">Capital Stage</label>
            <div className="relative group/select">
              <select
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 focus:outline-none focus:border-cyan-500/50 transition-all text-white appearance-none font-black text-xs uppercase tracking-[0.2em]"
                value={form.budget}
                onChange={e => setForm({ ...form, budget: e.target.value as StartupInput['budget'] })}
              >
                <option value="bootstrap">Bootstrap / Sweat Equity</option>
                <option value="seed">Seed Phase / Initial Capital</option>
                <option value="series-a">Series A / Growth Scaling</option>
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600 group-hover/select:text-cyan-500 transition-colors">
                <ChevronRight className="w-5 h-5 rotate-90" />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-8 bg-cyan-500 text-black font-black text-sm uppercase tracking-[0.4em] hover:bg-cyan-400 transition-all transform hover:scale-[1.01] active:scale-95 shadow-2xl glow-cyan relative z-10 group rounded-2xl flex items-center justify-center gap-4"
        >
          <Rocket className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          Initiate Strategic Scan
        </button>
      </form>
    </div>
  );
};

const TacticalInput: React.FC<{ label: string; value: string; onChange: (v: string) => void; placeholder: string }> = ({ label, value, onChange, placeholder }) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] ml-2">{label}</label>
    <input
      type="text"
      className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 focus:outline-none focus:border-cyan-500/50 transition-all text-white placeholder:text-gray-700 font-bold uppercase tracking-widest text-xs min-h-[64px]"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      required
    />
  </div>
);

const IntelligenceCard: React.FC<{ label: string; value: string; color: string; icon: React.ReactNode; description: string }> = ({ label, value, color, icon, description }) => (
  <div className="glass-card p-6 rounded-[2rem] border border-white/5 flex flex-col justify-between h-44 group hover:border-white/10 transition-all relative overflow-hidden">
    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 -mr-12 -mt-12 rotate-45 group-hover:bg-cyan-500/5 transition-colors"></div>
    <div className="flex items-center justify-between relative z-10 mb-4">
      <span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">{label}</span>
      <div className={`${color} opacity-40 group-hover:opacity-100 transition-opacity`}>{icon}</div>
    </div>
    <div className="relative z-10">
      <span className={`text-4xl font-black ${color} tracking-tighter font-mono`}>{value}</span>
      <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mt-2">{description}</p>
    </div>
  </div>
);

const DossierSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="glass-dark p-8 md:p-10 rounded-[2.5rem] border border-white/5 relative group">
    <div className="absolute top-8 right-8 text-white/5 group-hover:text-cyan-500/10 transition-colors">
      {icon}
    </div>
    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-8 flex items-center gap-2">
      <span className="w-1.5 h-4 bg-cyan-500 rounded-full"></span>
      {title}
    </h3>
    {children}
  </div>
);

const DossierList: React.FC<{ title: string; items: string[]; icon: React.ReactNode }> = ({ title, items, icon }) => (
  <div className="glass-dark p-10 rounded-[2.5rem] border border-white/10 shadow-lg">
    <h4 className="font-black mb-8 flex items-center gap-3 text-sm uppercase tracking-tight">
      <div className="p-3 bg-white/5 rounded-xl border border-white/10">{icon}</div>
      {title}
    </h4>
    <ul className="space-y-4">
      {items.map((item, idx) => (
        <li key={idx} className="text-sm text-gray-400 flex gap-4 leading-relaxed group">
          <span className="text-cyan-500 font-black mt-0.5 group-hover:scale-125 transition-transform">»</span>
          <span className="group-hover:text-gray-200 transition-colors font-medium capitalize-first">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default Analyzer;
