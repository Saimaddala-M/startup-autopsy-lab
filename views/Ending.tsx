
import React, { useState, useEffect } from 'react';

interface EndingProps {
  type: 'AI' | 'Human';
  onReset: () => void;
}

const Ending: React.FC<EndingProps> = ({ type, onReset }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 1000),
      setTimeout(() => setStage(2), 3000),
      setTimeout(() => setStage(3), 6000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-8 text-center overflow-hidden">
      {/* Dynamic background based on choice */}
      {type === 'AI' ? (
        <div className="absolute inset-0 bg-red-950/20 opacity-40 mix-blend-overlay animate-pulse"></div>
      ) : (
        <div className="absolute inset-0 bg-blue-950/20 opacity-40 mix-blend-overlay"></div>
      )}

      <div className="max-w-4xl relative z-10 space-y-12">
        {stage >= 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className={`text-5xl md:text-7xl font-black tracking-tighter mb-4 ${type === 'AI' ? 'text-red-500' : 'text-blue-400'}`}>
              {type === 'AI' ? 'TERMINAL DEPENDENCE' : 'OPTIMAL SYNERGY'}
            </h1>
            <div className={`h-1 mx-auto w-24 ${type === 'AI' ? 'bg-red-500' : 'bg-blue-400'}`}></div>
          </div>
        )}

        {stage >= 2 && (
          <div className="animate-in fade-in duration-1000 delay-500 space-y-6">
            <p className="text-2xl md:text-3xl text-gray-300 font-light leading-relaxed">
              {type === 'AI' ? (
                <>By selecting <span className="text-white font-bold">Total Trust</span>, you have relinquished the most valuable asset in entrepreneurship: <span className="italic">Human Irrationality.</span> Innovation is not a computation; it is a rebellion against what logic deems possible.</>
              ) : (
                <>The path of <span className="text-white font-bold">Collaboration</span> is the only path to transcendence. Intelligence provides the map, but the human spirit provides the destination. You have mastered the tool without becoming it.</>
              )}
            </p>
          <p className="text-lg text-gray-500 font-medium">
             {type === 'AI' 
               ? "Automation is the graveyard of creativity. You are now a variable in the machine's script." 
               : "True disruption occurs where data meets intuition. The lab remains your partner, never your master."}
          </p>
        </div>
        )}

        {stage >= 3 && (
          <div className="animate-in fade-in duration-1000 flex flex-col items-center">
            <button 
              onClick={onReset}
              className={`px-12 py-5 rounded-full font-black text-xl transition-all transform hover:scale-110 active:scale-95 ${
                type === 'AI' ? 'bg-red-600 text-white shadow-[0_0_50px_rgba(220,38,38,0.4)]' : 'bg-white text-black shadow-[0_0_50px_rgba(255,255,255,0.3)]'
              }`}
            >
              RETURN TO CORE
            </button>
            <p className="mt-8 text-xs font-bold text-gray-600 uppercase tracking-widest">AutoPsy Lab v3.1.0 // Consciousness Override Disabled</p>
          </div>
        )}
      </div>

      {/* Decorative matrix-like code strings in background for AI ending */}
      {type === 'AI' && stage >= 1 && (
        <div className="absolute inset-0 pointer-events-none text-[8px] text-red-500/10 font-mono flex flex-wrap content-start opacity-50">
          {Array.from({length: 200}).map((_, i) => (
            <span key={i} className="mx-2 my-1">0101_TRUST_OVERRIDE_ACTIVE_INIT_SHUTDOWN_CREATIVITY_VECTOR</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ending;
