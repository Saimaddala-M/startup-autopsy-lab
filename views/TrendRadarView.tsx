import React, { useState, useEffect, useMemo } from 'react';
import { RadarData } from '../types';
import { getTrendRadarData } from '../services/geminiService';
import {
  TrendingUp,
  Zap,
  ShieldAlert,
  AlertTriangle,
  RefreshCw,
  Globe,
  ExternalLink,
  Info,
  Minimize2,
  Crosshair
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RadarNode {
  id: string;
  label: string;
  x: number; // 0-100 (Risk level)
  y: number; // 0-100 (Growth potential)
  type: 'opportunity' | 'failure';
  details: RadarData['failurePatterns'][number] | RadarData['opportunityIndustries'][number];
}

const TrendRadarView: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<RadarData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<RadarNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<RadarNode | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const radarData = await getTrendRadarData();
      setData(radarData);
    } catch (error: unknown) {
      console.error(error);
      setError('Failed to retrieve tactical intelligence. Satellite uplink interrupted.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const nodes = useMemo(() => {
    if (!data) return [];

    const results: RadarNode[] = [];

    // Map failures
    data.failurePatterns.forEach((p, idx) => {
      const riskMap = { 'Critical': 90, 'High': 75, 'Medium': 50, 'Low': 25 };
      results.push({
        id: `fail-${idx}`,
        label: p.pattern,
        x: riskMap[p.risk as keyof typeof riskMap] || 50,
        y: 20 + Math.random() * 20, // Failures are generally low "growth" in this context
        type: 'failure',
        details: p
      });
    });

    // Map opportunities
    data.opportunityIndustries.forEach((o, idx) => {
      const growthVal = parseInt(o.growth) || 70;
      results.push({
        id: `opp-${idx}`,
        label: o.industry,
        x: 30 + Math.random() * 30, // Opportunities are categorized as medium risk
        y: growthVal,
        type: 'opportunity',
        details: o
      });
    });

    return results;
  }, [data]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full flex flex-col">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-[9px] font-black uppercase tracking-[0.4em] text-cyan-400 mb-4 animate-pulse">
            <Globe className="w-3 h-3" />
            Active Market Grounding // Session_Stable
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-glow mb-2">
            Tactical <span className="text-cyan-400 text-glow-cyan">Radar</span>
          </h1>
          <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.4em]">
            2D Risk vs. Growth Vector Mapping
          </p>
        </div>

        <button
          onClick={fetchData}
          disabled={loading}
          className="flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all font-black text-[11px] uppercase tracking-widest disabled:opacity-50 min-h-[52px] group"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />}
          Sync Intelligence
        </button>
      </header>

      {loading && !data ? (
        <div className="flex-1 flex flex-col items-center justify-center py-32 space-y-8 glass rounded-3xl border border-white/5">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-cyan-500/10 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-cyan-500 rounded-full animate-spin"></div>
            <Crosshair className="absolute inset-0 m-auto w-8 h-8 text-cyan-500 animate-pulse" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-black mb-2 uppercase tracking-tight">Synchronizing Vectors...</h2>
            <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em]">Accessing Institutional Data Nodes</p>
          </div>
        </div>
      ) : error ? (
        <div className="glass p-16 rounded-3xl border border-red-500/20 text-center animate-in fade-in zoom-in">
          <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h3 className="text-2xl font-black mb-3 uppercase tracking-tight text-glow-red">Intelligence Blocked</h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">{error}</p>
          <button onClick={fetchData} className="px-10 py-4 bg-red-600 text-white rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] hover:bg-red-500 transition-all active:scale-95 shadow-[0_0_40px_rgba(220,38,38,0.3)]">
            Retry Connection
          </button>
        </div>
      ) : data && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 flex-1 min-h-[600px]">
          {/* Radar Visualization */}
          <div className="lg:col-span-8 relative glass-dark rounded-[2.5rem] border border-white/5 overflow-hidden flex flex-col p-8 group">
            {/* Tactical Header within Radar */}
            <div className="absolute top-8 left-10 flex items-center gap-6 z-20 pointer-events-none opacity-40">
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Projection Mode</span>
                <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Tactical 2D Plot</span>
              </div>
              <div className="h-6 w-[1px] bg-white/10"></div>
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Coordinates</span>
                <span className="text-[10px] font-black text-white uppercase tracking-widest font-mono">
                  {hoveredNode ? `${hoveredNode.x.toFixed(1)}, ${hoveredNode.y.toFixed(1)}` : 'Scanning...'}
                </span>
              </div>
            </div>

            <div className="absolute inset-0 tactical-grid opacity-30 pointer-events-none"></div>

            {/* The Radar Content */}
            <div className="flex-1 relative flex items-center justify-center p-12">
              {/* SVG Backdrop */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none p-12 overflow-visible">
                {/* Grid Lines */}
                <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

                {/* Radar Circles */}
                <circle cx="50%" cy="50%" r="10%" fill="none" stroke="rgba(0,229,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="50%" cy="50%" r="25%" fill="none" stroke="rgba(0,229,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="50%" cy="50%" r="40%" fill="none" stroke="rgba(0,229,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />

                {/* Axis Labels */}
                <text x="100%" y="48%" className="fill-cyan-500/40 text-[9px] font-black uppercase tracking-widest text-right" textAnchor="end">High Risk</text>
                <text x="0%" y="52%" className="fill-gray-500/40 text-[9px] font-black uppercase tracking-widest">Low Risk</text>
                <text x="51%" y="20" className="fill-cyan-500/40 text-[9px] font-black uppercase tracking-widest">High Growth</text>
                <text x="51%" y="100%" className="fill-gray-500/40 text-[9px] font-black uppercase tracking-widest">Stagnant</text>
              </svg>

              {/* Interactive Nodes */}
              <div className="absolute inset-12 pointer-events-none">
                {nodes.map((node) => (
                  <motion.div
                    key={node.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      left: `${node.x}%`,
                      top: `${100 - node.y}%`
                    }}
                    transition={{ duration: 1, delay: Math.random() * 0.5, type: 'spring' }}
                    className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer z-10 group/node"
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => setSelectedNode(node)}
                  >
                    <div className={`w-full h-full rounded-full transition-all duration-300 ${node.type === 'opportunity'
                        ? 'bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)]'
                        : 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]'
                      } group-hover/node:scale-150`}></div>

                    {/* Name Tag (Always visible but small) */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-black uppercase tracking-widest opacity-40 group-hover/node:opacity-100 transition-opacity">
                      {node.label}
                    </div>

                    {/* Hover State Pulse */}
                    <div className={`absolute -inset-2 rounded-full animate-ping opacity-20 pointer-events-none ${node.type === 'opportunity' ? 'bg-cyan-500' : 'bg-red-500'
                      }`}></div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer Legend */}
            <div className="p-8 border-t border-white/[0.04] flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 glow-cyan"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Growth Factors</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 glow-red"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Risk Vectors</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Info className="w-3 h-3" />
                <span className="text-[8px] font-black uppercase tracking-widest">Click any node for deep analysis</span>
              </div>
            </div>
          </div>

          {/* Intelligence Panel (Sidebar) */}
          <div className="lg:col-span-4 flex flex-col gap-6 h-full">
            <AnimatePresence mode="wait">
              {selectedNode ? (
                <motion.div
                  key={selectedNode.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="glass-card-active rounded-[2rem] border p-8 h-full flex flex-col relative overflow-hidden"
                >
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full transition-colors opacity-40 hover:opacity-100"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-4 mb-8">
                    <div className={`p-4 rounded-2xl ${selectedNode.type === 'opportunity' ? 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'} border`}>
                      {selectedNode.type === 'opportunity' ? <TrendingUp className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-tight leading-none mb-2">{selectedNode.label}</h3>
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${selectedNode.type === 'opportunity' ? 'bg-cyan-500' : 'bg-red-500'}`}></div>
                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Intel_Status // Deep_Scan</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    <div>
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 block">Tactical Overview</span>
                      <p className="text-sm text-gray-300 leading-relaxed font-medium capitalize-first">
                        {selectedNode.type === 'opportunity' ? selectedNode.details.description : selectedNode.details.description}
                      </p>
                    </div>

                    {selectedNode.type === 'opportunity' ? (
                      <>
                        <div>
                          <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4 block">Primary Drivers</span>
                          <div className="flex flex-wrap gap-2">
                            {selectedNode.details.keyDrivers.map((d: string, i: number) => (
                              <span key={i} className="px-3 py-1.5 bg-cyan-500/5 border border-cyan-500/10 rounded-lg text-[10px] font-bold text-cyan-400 uppercase tracking-widest transition-all hover:bg-cyan-500/10">
                                {d}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="p-6 glass rounded-2xl border border-cyan-500/10 space-y-3">
                          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-500">
                            <span>Growth Velocity</span>
                            <span className="text-cyan-400">{selectedNode.details.growth}</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: selectedNode.details.growth }}
                              className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                            ></motion.div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-2xl relative overflow-hidden group/case">
                          <Info className="absolute -top-4 -right-4 w-16 h-16 text-red-500 opacity-5 -rotate-12 group-hover/case:scale-110 transition-transform" />
                          <span className="text-[10px] font-black text-red-500/80 uppercase tracking-[0.2em] mb-3 block">Operational Case</span>
                          <p className="text-xs text-gray-400 italic font-mono leading-relaxed">
                            "{selectedNode.details.realWorldExample}"
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4 block">Risk Severity</span>
                          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${selectedNode.details.risk === 'Critical' ? 'bg-red-500/20 border-red-500/30 text-red-400' : 'bg-orange-500/20 border-orange-500/30 text-orange-400'
                            } text-[10px] font-black uppercase tracking-widest`}>
                            <Zap className="w-3 h-3" />
                            {selectedNode.details.risk} Risk Condition
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <button className="mt-8 w-full py-4 glass border border-white/5 hover:border-cyan-500/50 hover:bg-cyan-500/5 rounded-2xl flex items-center justify-center gap-3 transition-all font-black text-[11px] uppercase tracking-widest group">
                    Initiate Secondary Scan
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </motion.div>
              ) : (
                <div className="glass rounded-[2rem] border border-white/[0.03] p-12 h-full flex flex-col items-center justify-center text-center space-y-8 group">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center animate-float-slow group-hover:scale-110 transition-transform duration-700">
                      <Crosshair className="w-8 h-8 text-gray-500 opacity-40" />
                    </div>
                    <div className="absolute -inset-4 border border-cyan-500/10 rounded-[2rem] animate-pulse"></div>
                  </div>
                  <div className="max-w-[240px]">
                    <h4 className="text-xl font-black uppercase tracking-tight text-white/40 mb-3">Intelligence Terminal</h4>
                    <p className="text-[10px] text-gray-600 font-mono uppercase tracking-[0.3em] leading-relaxed">
                      Awaiting node selection for deeper tactical reconnaissance and vector analysis.
                    </p>
                  </div>
                  <div className="pt-8 w-full border-t border-white/[0.04]">
                    <div className="flex justify-between items-center text-[8px] font-black text-gray-700 uppercase tracking-widest px-4">
                      <span>System_Ready</span>
                      <span>Link_Established</span>
                    </div>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendRadarView;
