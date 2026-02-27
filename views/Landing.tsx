import React from 'react';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#08090a] text-white overflow-hidden relative font-sans">
      {/* Background Textures */}
      <div className="scanline"></div>
      <div className="noise"></div>
      <div className="absolute inset-0 tactical-grid opacity-30 pointer-events-none"></div>
      
      {/* Animated Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[120px] rounded-full animate-pulse-slow"></div>

      {/* Nav */}
      <nav className="relative z-50 flex items-center justify-between px-4 md:px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-cyan-600 to-blue-500 rounded-lg md:rounded-xl flex items-center justify-center font-bold text-xl md:text-2xl shadow-lg glow-cyan group-hover:scale-110 transition-transform">
            A
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg md:text-xl tracking-tighter leading-none text-glow">AUTOPSY</span>
            <span className="text-cyan-500 font-bold text-[8px] md:text-[10px] tracking-[0.2em] uppercase">Laboratory</span>
          </div>
        </div>
        <button 
          onClick={onStart}
          className="px-4 md:px-6 py-2 glass rounded-lg md:rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all font-bold text-[10px] md:text-xs tracking-widest uppercase min-h-[40px]"
        >
          Access Portal
        </button>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 lg:py-32 flex flex-col items-center text-center">
        <div className="inline-block px-4 md:px-5 py-2 mb-6 md:mb-10 glass rounded-full border border-cyan-500/30 text-cyan-400 text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] animate-pulse shadow-[0_0_20px_rgba(0,229,255,0.1)]">
          Institutional Grade Market Intelligence
        </div>
        <h1 className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[100px] font-black mb-6 md:mb-10 leading-[1] md:leading-[0.85] tracking-tighter bg-gradient-to-b from-white via-white to-white/10 bg-clip-text text-transparent uppercase text-glow">
          Analyze.<br className="hidden sm:block" /> Strategize.<br className="hidden sm:block" /> <span className="text-white text-glow-cyan">Dominate.</span>
        </h1>
        <p className="max-w-2xl text-base md:text-xl text-gray-400 mb-10 md:mb-16 font-medium tracking-tight leading-relaxed px-4">
          The elite platform for founders who don't just build, but conquer. Real-time market gap detection, competitor dissection, and strategic roadmaps powered by frontier intelligence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto px-4 sm:px-0">
          <button 
            onClick={onStart}
            className="w-full sm:w-auto px-10 md:px-14 py-5 md:py-7 bg-cyan-500 text-black font-black text-xs uppercase tracking-[0.3em] rounded-xl md:rounded-2xl hover:bg-cyan-400 transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_60px_rgba(0,229,255,0.2)] relative group overflow-hidden min-h-[56px]"
          >
            Deploy Analysis
          </button>
          <button 
            onClick={onStart}
            className="w-full sm:w-auto px-10 md:px-14 py-5 md:py-7 glass border border-white/10 text-white font-black text-xs uppercase tracking-[0.3em] rounded-xl md:rounded-2xl hover:bg-white/5 transition-all hover:border-cyan-500/50 min-h-[56px]"
          >
            Access Portal
          </button>
        </div>

        {/* Professional dashboard preview */}
        <div className="mt-16 md:mt-24 w-full max-w-5xl glass-dark rounded-[1.5rem] md:rounded-[2rem] border border-white/10 p-2 md:p-3 shadow-2xl animate-float relative group hidden sm:block">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-[1.6rem] md:rounded-[2.1rem] blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <div className="rounded-[1.3rem] md:rounded-[1.8rem] overflow-hidden bg-[#0a0b0c] aspect-video relative border border-white/5">
             <img 
               src="https://picsum.photos/seed/autopsy-pro/1200/675" 
               className="object-cover w-full h-full opacity-10 mix-blend-overlay grayscale" 
               alt="UI Preview" 
               referrerPolicy="no-referrer"
             />
             <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12">
                <div className="grid grid-cols-12 gap-4 w-full h-full">
                  <div className="col-span-3 glass rounded-2xl border border-white/5 p-4 md:p-6 flex flex-col justify-between">
                    <div className="w-12 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)]"></div>
                    <div className="space-y-3">
                      <div className="h-2 w-full bg-white/10 rounded-full"></div>
                      <div className="h-2 w-4/5 bg-white/10 rounded-full"></div>
                      <div className="h-2 w-3/5 bg-white/10 rounded-full"></div>
                    </div>
                  </div>
                  <div className="col-span-6 glass rounded-2xl border border-white/5 p-4 md:p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <div className="w-16 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                      <div className="w-6 h-6 rounded-lg border border-white/10 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white/20 rounded-sm"></div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-3 w-full bg-white/5 rounded-full"></div>
                      <div className="h-3 w-full bg-white/5 rounded-full"></div>
                      <div className="h-3 w-3/4 bg-white/5 rounded-full"></div>
                    </div>
                  </div>
                  <div className="col-span-3 glass rounded-2xl border border-white/5 p-4 md:p-6 flex flex-col justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10"></div>
                    <div className="space-y-3">
                      <div className="h-2 w-full bg-white/10 rounded-full"></div>
                      <div className="h-2 w-1/2 bg-white/10 rounded-full"></div>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer Stats */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pb-12 md:pb-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        <StatItem label="Entities Analyzed" value="14,209" />
        <StatItem label="Market Gaps Found" value="2,841" />
        <StatItem label="Intelligence Accuracy" value="99.4%" />
        <StatItem label="Active Operatives" value="1,204" />
      </div>
    </div>
  );
};

const StatItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col items-center md:items-start text-center md:text-left">
    <span className="text-[9px] md:text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em] mb-1">{label}</span>
    <span className="text-xl md:text-3xl font-black text-white text-glow">{value}</span>
  </div>
);

export default Landing;
