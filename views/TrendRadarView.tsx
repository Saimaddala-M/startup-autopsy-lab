
import React, { useState, useEffect } from 'react';
import { RadarData } from '../types';
import { getTrendRadarData } from '../services/geminiService';
import { 
  TrendingUp, 
  Zap, 
  ShieldAlert, 
  AlertTriangle, 
  RefreshCw, 
  Globe, 
  Clock,
  ExternalLink,
  Info
} from 'lucide-react';
import { motion } from 'motion/react';

const TrendRadarView: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<RadarData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const radarData = await getTrendRadarData();
      setData(radarData);
    } catch (error: unknown) {
      console.error(error);
      const err = error as { status?: number; message?: string };
      if (err.status === 429 || err.message?.includes('429') || err.message?.includes('quota')) {
        setError('Market intelligence quota exceeded. The system is currently under high load. Please wait a few minutes before refreshing.');
      } else {
        setError('Failed to retrieve real-time intelligence. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto font-sans px-4 sm:px-6 lg:px-8 py-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-md text-[9px] font-black uppercase tracking-[0.4em] text-cyan-400 mb-4">
            <Globe className="w-3 h-3 animate-spin-slow" />
            Live Market Grounding Active
          </div>
          <h1 className="text-[32px] sm:text-[48px] md:text-[64px] font-black uppercase tracking-tighter text-glow leading-tight mb-2">
            Trend Radar
          </h1>
          <p className="text-gray-400 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] ml-1">
            Real-world intelligence // Failure patterns & Opportunity vectors
          </p>
        </div>
        
        <button 
          onClick={fetchData}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all font-bold text-xs uppercase tracking-widest disabled:opacity-50 min-h-[44px]"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          Refresh Intelligence
        </button>
      </header>

      {loading && !data ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-8">
          <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2 uppercase tracking-tight">Scanning Global Markets...</h2>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Accessing real-time data via Google Search Grounding</p>
          </div>
        </div>
      ) : error ? (
        <div className="glass-dark p-12 rounded-3xl border border-red-500/20 text-center">
          <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Intelligence Interrupted</h3>
          <p className="text-gray-400 mb-6">{error}</p>
          <button onClick={fetchData} className="px-8 py-3 bg-red-600 text-white rounded-xl font-bold uppercase text-xs tracking-widest">Retry Connection</button>
        </div>
      ) : data && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Summary Bar */}
          <div className="glass-dark p-4 rounded-2xl border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Last Intelligence Sync: {data.lastUpdated || new Date().toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">3 Critical Failure Risks</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">3 High-Growth Sectors</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Failure Radar Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-red-500/10 rounded-xl text-red-500 border border-red-500/20">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-red-500">Failure Radar</h2>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Current Startup Mortality Factors</p>
                </div>
              </div>

              <div className="space-y-6">
                {data.failurePatterns.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass-dark p-6 md:p-8 rounded-3xl border border-white/10 hover:border-red-500/30 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                      <ShieldAlert className="w-32 h-32 -rotate-12" />
                    </div>
                    
                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <h3 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-red-400 transition-colors">{item.pattern}</h3>
                      <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                        item.risk === 'Critical' ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 
                        item.risk === 'High' ? 'bg-orange-500/20 text-orange-500 border border-orange-500/30' : 
                        'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'
                      }`}>
                        {item.risk} Risk
                      </span>
                    </div>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 relative z-10">{item.description}</p>
                    
                    <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="w-3 h-3 text-red-500" />
                        <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Real-World Case</span>
                      </div>
                      <p className="text-xs text-gray-300 italic">"{item.realWorldExample}"</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Opportunity Radar Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-500 border border-cyan-500/20">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-cyan-400">Opportunity Radar</h2>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">High-Growth Strategic Vectors</p>
                </div>
              </div>

              <div className="space-y-6">
                {data.opportunityIndustries.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass-dark p-6 md:p-8 rounded-3xl border border-white/10 hover:border-cyan-500/30 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                      <Zap className="w-32 h-32 rotate-12" />
                    </div>

                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <h3 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-cyan-400 transition-colors">{item.industry}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-cyan-400 tracking-tighter">{item.growth}</span>
                        <TrendingUp className="w-4 h-4 text-cyan-500" />
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed mb-6 relative z-10">{item.description}</p>

                    <div className="space-y-3 relative z-10">
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Key Growth Drivers</span>
                      <div className="flex flex-wrap gap-2">
                        {item.keyDrivers.map((driver, dIdx) => (
                          <span key={dIdx} className="text-[9px] font-bold bg-cyan-500/5 border border-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full uppercase tracking-widest">
                            {driver}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                       <div className="flex items-center gap-2">
                         <div className={`w-2 h-2 rounded-full ${item.trend === 'Up' ? 'bg-green-500' : item.trend === 'Down' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                         <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Trend: {item.trend}</span>
                       </div>
                       <button className="text-[10px] font-black text-cyan-500 uppercase tracking-widest flex items-center gap-1 hover:text-cyan-400 transition-colors">
                         Explore Market Gap <ExternalLink className="w-3 h-3" />
                       </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="glass-dark p-8 rounded-3xl border border-white/5 text-center">
            <p className="text-xs text-gray-500 font-mono uppercase tracking-widest leading-relaxed max-w-2xl mx-auto">
              This data is generated in real-time using frontier AI models grounded in live web search results. 
              Strategic decisions should be validated with multiple sources.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendRadarView;
