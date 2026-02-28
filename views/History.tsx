
import React, { useState, useEffect } from 'react';
import { AnalysisResult } from '../types';
import { Search, History as HistoryIcon, Shield, ChevronRight, Calendar, User } from 'lucide-react';

interface StoredAnalysis {
    id: string;
    startup_name: string;
    input_data: any;
    result_data: AnalysisResult;
    created_at: string;
}

const History: React.FC = () => {
    const [history, setHistory] = useState<StoredAnalysis[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedReport, setSelectedReport] = useState<StoredAnalysis | null>(null);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const response = await fetch('/api/history');
            const data = await response.json();
            setHistory(data);
        } catch (error) {
            console.error("Failed to fetch history:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredHistory = history.filter(item =>
        item.startup_name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto font-sans px-4 md:px-0">
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <HistoryIcon className="text-cyan-500 w-6 h-6" />
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-glow">Intelligence Archive</h1>
                </div>
                <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.4em]">Decrypted analysis reports from global operatives</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Search & List */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 group-focus-within:text-cyan-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Filter by startup name..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-cyan-500/30 transition-all font-mono text-xs placeholder:text-gray-700"
                        />
                    </div>

                    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                        {loading ? (
                            [1, 2, 3].map(i => <div key={i} className="h-20 glass rounded-xl animate-pulse"></div>)
                        ) : filteredHistory.length === 0 ? (
                            <p className="text-center text-gray-600 font-mono text-xs py-10 italic">No reports found in the archive.</p>
                        ) : (
                            filteredHistory.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setSelectedReport(item)}
                                    className={`w-full text-left p-5 rounded-xl border transition-all group ${selectedReport?.id === item.id
                                            ? 'bg-cyan-500/10 border-cyan-500/30 ring-1 ring-cyan-500/30'
                                            : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-sm font-black text-white uppercase tracking-tight truncate mr-2">{item.startup_name}</span>
                                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${item.result_data.riskScore === 'Low' ? 'bg-green-500/20 text-green-500' :
                                                item.result_data.riskScore === 'Medium' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-red-500/20 text-red-500'
                                            }`}>
                                            {item.result_data.riskScore} Risk
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-[9px] text-gray-500 font-mono uppercase tracking-widest">
                                        <span className="flex items-center gap-1"><Calendar className="w-2.5 h-2.5" /> {new Date(item.created_at).toLocaleDateString()}</span>
                                        <span className="flex items-center gap-1"><User className="w-2.5 h-2.5" /> {item.input_data.industry}</span>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* Report Content */}
                <div className="lg:col-span-8">
                    {selectedReport ? (
                        <div className="glass-dark p-8 md:p-12 rounded-2xl border border-white/5 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                                <div>
                                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-glow-cyan leading-none mb-2">{selectedReport.startup_name}</h2>
                                    <p className="text-cyan-500 font-mono text-[9px] uppercase tracking-[0.4em]">Detailed Intelligence Report // SECURED</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="text-center p-3 glass rounded-xl border border-white/5 min-w-[80px]">
                                        <div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Score</div>
                                        <div className="text-xl font-black text-white">{selectedReport.result_data.confidenceScore}</div>
                                    </div>
                                    <div className="text-center p-3 glass rounded-xl border border-white/5 min-w-[80px]">
                                        <div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Growth</div>
                                        <div className="text-xl font-black text-cyan-500">{selectedReport.result_data.growthPotential}/10</div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-8">
                                    <section>
                                        <h4 className="font-black text-cyan-500 uppercase text-[10px] tracking-[0.4em] mb-4 flex items-center gap-2">
                                            <Shield className="w-3 h-3" /> Mission Core
                                        </h4>
                                        <p className="text-sm text-gray-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">{selectedReport.result_data.problemSolved}</p>
                                    </section>

                                    <section>
                                        <h4 className="font-black text-cyan-500 uppercase text-[10px] tracking-[0.4em] mb-4">Operational Strengths</h4>
                                        <div className="space-y-3">
                                            {selectedReport.result_data.whyItMightWork.map((item, idx) => (
                                                <div key={idx} className="flex items-start gap-3 text-xs text-gray-400">
                                                    <div className="mt-1.5 w-1.5 h-1.5 bg-cyan-500 rounded-full flex-shrink-0 shadow-[0_0_8px_rgba(0,229,255,0.4)]"></div>
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>

                                <div className="space-y-8">
                                    <section>
                                        <h4 className="font-black text-red-500 uppercase text-[10px] tracking-[0.4em] mb-4">Strategic Risks</h4>
                                        <div className="space-y-3">
                                            {selectedReport.result_data.mainRisks.map((item, idx) => (
                                                <div key={idx} className="flex items-start gap-3 text-xs text-gray-400">
                                                    <div className="mt-1.5 w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.4)]"></div>
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section className="p-6 bg-cyan-500/5 rounded-2xl border border-cyan-500/10">
                                        <h4 className="font-black text-cyan-500 uppercase text-[10px] tracking-[0.4em] mb-3">Improvement Roadmap</h4>
                                        <ul className="space-y-4">
                                            {selectedReport.result_data.improvements.map((item, idx) => (
                                                <li key={idx} className="text-xs text-gray-400 flex items-start gap-3">
                                                    <ChevronRight className="w-3 h-3 mt-0.5 text-cyan-500" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center glass-dark rounded-2xl border border-white/5 border-dashed p-20 text-center opacity-40">
                            <HistoryIcon className="w-20 h-20 mb-6 text-gray-600" />
                            <h3 className="text-xl font-black uppercase tracking-widest text-gray-500">Awaiting Signal Selection</h3>
                            <p className="max-w-xs text-[10px] font-mono uppercase tracking-[0.2em] mt-4 leading-relaxed">Select an intelligence report from the archive to decrypt and visualize its contents.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default History;
