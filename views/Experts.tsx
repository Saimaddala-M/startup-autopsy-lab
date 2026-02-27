
import React, { useState, useEffect } from 'react';
import { Expert } from '../types';
import { UserPlus, Star, ShieldCheck, Briefcase, Linkedin, GraduationCap, Award, Send, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

const Experts: React.FC = () => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/experts')
      .then(res => res.json())
      .then(data => {
        setExperts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/experts/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setShowApplyForm(false);
          setIsSubmitted(false);
        }, 3000);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to submit application.');
    }
  };

  if (showApplyForm) {
    return (
      <div className="max-w-3xl mx-auto py-4 md:py-8 px-2">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-dark p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden"
        >
          {isSubmitted ? (
            <div className="text-center py-12 md:py-20 space-y-6">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="text-green-500 w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Application Received</h2>
              <p className="text-sm md:text-base text-gray-400">Our Strategic Intelligence Unit will review your credentials and contact you via LinkedIn.</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start mb-8 md:mb-10 gap-4">
                <div>
                  <h2 className="text-2xl md:text-4xl font-black mb-2 uppercase tracking-tighter">Expert Registration</h2>
                  <p className="text-xs md:text-sm text-gray-400">Join the elite network of AutoPsy strategic advisors.</p>
                </div>
                <button 
                  onClick={() => setShowApplyForm(false)}
                  className="text-[10px] font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest min-h-[44px]"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleApplySubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">Full Name</label>
                    <input name="name" type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-cyan-500/50 transition-all font-medium input-glow text-sm min-h-[44px]" placeholder="Dr. Jane Smith" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">Current Profession</label>
                    <input name="profession" type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-cyan-500/50 transition-all font-medium input-glow text-sm min-h-[44px]" placeholder="Venture Partner, Ex-CTO" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">Highest Degree / Certification</label>
                    <div className="relative">
                      < GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input name="degree" type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pl-12 focus:outline-none focus:border-cyan-500/50 transition-all font-medium input-glow text-sm min-h-[44px]" placeholder="PhD in Economics" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">LinkedIn Profile URL</label>
                    <div className="relative">
                      <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input name="linkedin" type="url" required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pl-12 focus:outline-none focus:border-cyan-500/50 transition-all font-medium input-glow text-sm min-h-[44px]" placeholder="linkedin.com/in/username" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">Areas of Expertise (Comma separated)</label>
                  <div className="relative">
                    <Award className="absolute left-4 top-4 w-4 h-4 text-gray-500" />
                    <input name="expertise" type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pl-12 focus:outline-none focus:border-cyan-500/50 transition-all font-medium input-glow text-sm min-h-[44px]" placeholder="SaaS, PLG, AI Governance, Fintech" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">Strategic Pitch (AI-Analyzed)</label>
                  <textarea 
                    name="pitch"
                    required 
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-cyan-500/50 transition-all font-medium text-sm" 
                    rows={4} 
                    placeholder="Briefly describe your unique value proposition as a strategic advisor. What 'unfair advantage' do you bring to founders?"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 bg-cyan-500 text-black rounded-2xl font-black text-sm md:text-xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-3 shadow-xl glow-cyan min-h-[56px] uppercase tracking-widest"
                >
                  <Send className="w-5 h-5 md:w-6 md:h-6" />
                  SUBMIT APPLICATION
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto font-sans px-1 md:px-0">
      <header className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-[28px] sm:text-[36px] md:text-[42px] font-black mb-2 uppercase tracking-tighter text-glow leading-tight">Expert Advisory</h1>
          <p className="text-gray-400 font-mono text-[10px] uppercase tracking-widest">Connect with specialists // Stress-test intelligence</p>
        </div>
        <button 
          onClick={() => setShowApplyForm(true)}
          className="flex items-center justify-center gap-2 px-6 py-4 bg-cyan-500 text-black hover:bg-cyan-400 transition-all rounded-xl font-black text-xs tracking-widest uppercase shadow-lg glow-cyan group min-h-[44px]"
        >
          <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
          APPLY AS EXPERT
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
            </div>
          ) : experts.map(expert => (
            <div 
              key={expert.id}
              onClick={() => setSelectedExpert(expert)}
              className={`group p-5 md:p-6 glass-dark rounded-3xl border transition-all cursor-pointer flex flex-col sm:flex-row gap-4 md:gap-6 relative overflow-hidden ${
                selectedExpert?.id === expert.id ? 'border-cyan-500 bg-cyan-900/10' : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 -mr-12 -mt-12 rotate-45 group-hover:bg-white/10 transition-colors hidden sm:block"></div>
              <img 
                src={expert.avatar} 
                alt={expert.name} 
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all relative z-10" 
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 relative z-10">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight">{expert.name}</h3>
                    <p className="text-cyan-400 font-bold text-[10px] md:text-xs uppercase tracking-widest">{expert.role}</p>
                  </div>
                  <span className="text-[9px] font-black text-gray-500 bg-white/5 px-2 md:px-3 py-1 rounded-lg uppercase tracking-[0.2em] border border-white/5">{expert.availability}</span>
                </div>
                <p className="text-gray-400 text-xs md:text-sm mb-4 leading-relaxed">{expert.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {expert.expertise.map(tag => (
                    <span key={tag} className="text-[8px] md:text-[9px] font-black text-white/40 border border-white/10 px-2 py-0.5 rounded uppercase tracking-widest bg-white/5 font-mono">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="glass-dark p-6 md:p-8 rounded-3xl border border-white/10 sticky top-8">
            {selectedExpert ? (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h3 className="text-lg md:text-xl font-black mb-4 uppercase tracking-tight">Request Consultation</h3>
                <p className="text-gray-400 text-xs md:text-sm mb-6 leading-relaxed">Discuss your AutoPsy report with <strong>{selectedExpert.name}</strong> to validate tactical moves.</p>
                
                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <p className="text-[9px] text-gray-500 uppercase font-bold mb-1 tracking-widest">Session Type</p>
                    <p className="font-semibold text-white text-sm">45-min Strategy Deep Dive</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <p className="text-[9px] text-gray-500 uppercase font-bold mb-1 tracking-widest">Pricing</p>
                    <p className="font-semibold text-white text-sm">$249 / session</p>
                  </div>
                </div>

                <button className="w-full py-4 bg-white text-black font-black rounded-xl hover:bg-gray-200 transition-all mb-4 text-xs uppercase tracking-widest min-h-[44px]">
                  Confirm Booking
                </button>
                <button className="w-full py-4 border border-white/10 font-black rounded-xl hover:bg-white/5 transition-all text-xs uppercase tracking-widest min-h-[44px]">
                  Chat Now
                </button>
              </div>
            ) : (
              <div className="text-center py-8 md:py-12">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 mx-auto mb-6 flex items-center justify-center text-gray-600">
                  <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <h3 className="font-bold text-gray-500 text-xs md:text-sm uppercase tracking-widest">Select an expert to begin your strategic review.</h3>
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="mt-12 md:mt-20 p-6 md:p-10 glass-dark rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5 hidden md:block">
          <Star className="w-40 h-40" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-black mb-4 uppercase tracking-tighter">Are you a domain specialist?</h2>
          <p className="text-sm md:text-base text-gray-400 mb-8 leading-relaxed">
            AutoPsy Lab is expanding its network of elite strategists, risk analysts, and product wizards. Help the next generation of founders navigate the complexities of modern markets.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-500">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm mb-1 uppercase tracking-tight">Vetted Network</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed">Join a community of ex-FAANG and tier-1 VC advisors.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm mb-1 uppercase tracking-tight">Flexible Engagement</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed">Set your own rates and availability for deep-dive sessions.</p>
              </div>
            </div>
          </div>
          <button className="w-full sm:w-auto px-8 py-4 bg-white text-black font-black rounded-xl hover:bg-gray-200 transition-all text-xs uppercase tracking-widest min-h-[44px]">
            REGISTER AS EXPERT
          </button>
        </div>
      </section>
    </div>
  );
};

export default Experts;
