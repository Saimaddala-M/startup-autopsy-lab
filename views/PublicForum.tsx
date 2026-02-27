import React, { useState, useEffect, useRef } from 'react';
import { ForumMessage } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Send, MessageSquare, Activity, Target, ShieldAlert, ThumbsUp, MessageCircle } from 'lucide-react';
import { supabase } from '../services/geminiService';

interface PublicForumProps {
  user: string;
}

const PublicForum: React.FC<PublicForumProps> = ({ user }) => {
  const [messages, setMessages] = useState<ForumMessage[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Fetch initial messages
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('forum_messages')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(50);

      if (data) {
        setMessages(data.map(m => ({
          id: m.id,
          user: m.user_name,
          text: m.message_text,
          timestamp: new Date(m.created_at).getTime()
        })));
      }
    };

    fetchMessages();

    // 2. Subscribe to new messages
    const channel = supabase
      .channel('public:forum_messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'forum_messages' },
        (payload) => {
          const newMessage: ForumMessage = {
            id: payload.new.id,
            user: payload.new.user_name,
            text: payload.new.message_text,
            timestamp: new Date(payload.new.created_at).getTime()
          };
          setMessages(prev => [...prev.filter(m => m.id !== newMessage.id), newMessage]);
        })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const { error } = await supabase
      .from('forum_messages')
      .insert([
        { user_name: user, message_text: input }
      ]);

    if (error) {
      console.error("Error sending message:", error);
    } else {
      setInput('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-auto lg:h-[calc(100vh-12rem)] flex flex-col gap-6 font-sans">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4 md:mb-8">
        <div>
          <h1 className="text-[28px] sm:text-[36px] md:text-[42px] font-black mb-2 flex items-center gap-3 uppercase tracking-tighter text-glow leading-tight">
            <MessageSquare className="text-cyan-500 w-8 h-8 md:w-12 md:h-12" />
            Public Forum
          </h1>
          <p className="text-gray-400 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.3em] ml-1">Drop your idea. Get real feedback. // Ideas survive by debate</p>
        </div>

        {/* Stats - Horizontal scroll on mobile */}
        <div className="flex overflow-x-auto pb-2 md:pb-0 gap-4 no-scrollbar snap-x">
          <div className="snap-center min-w-[160px] flex-1">
            <StatCard icon={<Activity className="w-5 h-5" />} label="Autopsies Run" value="8.4k" color="text-cyan-400" />
          </div>
          <div className="snap-center min-w-[160px] flex-1">
            <StatCard icon={<Target className="w-5 h-5" />} label="Active Investigations" value="1.2k" color="text-cyan-400" />
          </div>
          <div className="snap-center min-w-[160px] flex-1">
            <StatCard icon={<ShieldAlert className="w-5 h-5" />} label="Failure Patterns" value="42" color="text-red-500" />
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
        {/* Main Feed */}
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto lg:overflow-hidden pr-0 lg:pr-2">
          {/* Mock Idea Cards - Stacked on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-2">
            <MockIdeaCard
              name="NexusFlow"
              summary="AI-driven liquidity management for cross-border B2B payments."
              upvotes="124"
              comments="18"
              time="2h ago"
            />
            <MockIdeaCard
              name="Solaris"
              summary="Decentralized grid management for residential solar clusters."
              upvotes="89"
              comments="12"
              time="4h ago"
            />
            <MockIdeaCard
              name="BioSync"
              summary="Real-time metabolic tracking via non-invasive dermal sensors."
              upvotes="210"
              comments="45"
              time="6h ago"
              className="md:hidden lg:block"
            />
          </div>

          <div className="flex-1 min-h-[400px] lg:min-h-0 glass-dark rounded-3xl border border-white/10 flex flex-col overflow-hidden relative">
            <div className="absolute inset-0 tactical-grid opacity-5 pointer-events-none"></div>
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scroll-smooth relative z-10"
            >
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex flex-col ${msg.user === user ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`max-w-[85%] md:max-w-[80%] p-4 rounded-2xl ${msg.user === user
                      ? 'bg-cyan-500 text-black rounded-tr-none glow-cyan'
                      : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none backdrop-blur-md'
                      }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60 font-mono">{msg.user}</span>
                        <span className="text-[10px] opacity-40 font-mono">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-sm leading-relaxed font-medium">{msg.text}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <form onSubmit={handleSend} className="p-3 md:p-4 border-t border-white/10 flex gap-2 md:gap-3 relative z-10 bg-black/20 backdrop-blur-md">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Share an idea or give feedback..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 md:px-6 py-3 md:py-4 focus:outline-none focus:border-cyan-500/50 transition-all font-medium text-sm input-glow min-h-[44px]"
              />
              <button
                type="submit"
                className="px-4 md:px-6 bg-cyan-500 text-black rounded-xl font-black hover:bg-cyan-400 transition-all flex items-center justify-center group shadow-lg glow-cyan min-h-[44px]"
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar - Hidden on mobile, visible on desktop */}
        <div className="w-full lg:w-72 space-y-6">
          <div className="glass-dark p-6 rounded-3xl border border-white/10">
            <h3 className="font-bold mb-4 text-[10px] md:text-sm uppercase tracking-widest text-gray-500">Trending Topics</h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              <TopicTag label="#SaaS-Pricing" count="42" />
              <TopicTag label="#AI-Agents" count="28" />
              <TopicTag label="#Fintech-Gaps" count="19" />
              <TopicTag label="#Bootstrapping" count="15" />
            </div>
          </div>

          <div className="glass p-6 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-900/10 to-transparent">
            <h3 className="font-bold mb-2 text-cyan-400 text-sm uppercase tracking-tighter">Forum Rules</h3>
            <p className="text-[11px] text-gray-400 leading-relaxed font-mono">
              1. Be brutally honest.<br />
              2. Back claims with data.<br />
              3. No self-promotion.<br />
              4. Respect the hustle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MockIdeaCard: React.FC<{ name: string; summary: string; upvotes: string; comments: string; time: string; className?: string }> = ({ name, summary, upvotes, comments, time, className = "" }) => (
  <div className={`glass-card p-5 md:p-6 rounded-2xl md:rounded-3xl border border-white/5 hover:border-cyan-500/30 transition-all group relative overflow-hidden ${className}`}>
    <div className="absolute top-0 right-0 p-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
      <Target className="w-16 h-16" />
    </div>
    <div className="flex justify-between items-start mb-3">
      <h4 className="font-black text-white uppercase tracking-tighter text-base md:text-lg">{name}</h4>
      <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">{time}</span>
    </div>
    <p className="text-[11px] md:text-xs text-gray-400 leading-relaxed mb-4 md:mb-6 line-clamp-2">{summary}</p>
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1.5 text-cyan-400">
        <ThumbsUp className="w-3 h-3" />
        <span className="text-[10px] font-black">{upvotes}</span>
      </div>
      <div className="flex items-center gap-1.5 text-gray-500">
        <MessageCircle className="w-3 h-3" />
        <span className="text-[10px] font-black">{comments}</span>
      </div>
    </div>
  </div>
);

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; color?: string }> = ({ icon, label, value, color = "text-white" }) => (
  <div className="glass-card px-6 py-4 rounded-2xl flex items-center gap-4 min-w-[140px] relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-12 h-12 bg-white/[0.02] -mr-6 -mt-6 rotate-45 group-hover:bg-white/[0.05] transition-colors"></div>
    <div className={`p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] ${color} shadow-inner`}>{icon}</div>
    <div className="flex flex-col">
      <span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">{label}</span>
      <span className={`text-2xl font-black tracking-tighter ${color} text-glow`}>{value}</span>
    </div>
  </div>
);

const TopicTag: React.FC<{ label: string; count: string }> = ({ label, count }) => (
  <div className="flex items-center justify-between group cursor-pointer">
    <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{label}</span>
    <span className="text-[10px] font-bold bg-white/5 px-2 py-0.5 rounded text-gray-500">{count}</span>
  </div>
);

export default PublicForum;
