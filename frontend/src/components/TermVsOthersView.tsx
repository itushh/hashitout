import { useState, useMemo } from 'react';
import {
    ArrowLeft,
    ShieldCheck,
    TrendingUp,
    CheckCircle,
    Star,
    Snowflake,
    Flame,
    Calculator,
    Timer,
    AlertCircle,
    ArrowUpRight,
    ArrowDownRight,
    UserCircle2,
    HeartPulse,
    Layout
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface TermVsOthersViewProps {
    onBack: () => void;
}

export default function TermVsOthersView({ onBack }: TermVsOthersViewProps) {
    const [plan, setPlan] = useState<'term' | 'endowment' | null>(null);
    const [premium, setPremium] = useState(15000);
    const [completed, setCompleted] = useState(false);

    const stats = useMemo(() => {
        if (plan === 'term') {
            return {
                title: 'Term Life Insurance',
                cover: '₹2,00,00,000 (2 Cr)',
                premium: '₹12,000 /yr',
                desc: 'Pure life cover. No maturity benefit, but maximum protection for your family.',
                type: 'The Smart Choice'
            };
        } else if (plan === 'endowment') {
            return {
                title: 'Endowment/Money Back',
                cover: '₹10,00,00,00 (10L)',
                premium: '₹1,00,000 /yr',
                desc: 'Mixed insurance + investment. High premium for very low cover.',
                type: 'The Agent Choice'
            };
        }
        return null;
    }, [plan]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-10 pb-20"
        >
            <div className="flex items-center space-x-4">
                <button onClick={onBack} className="p-3 bg-slate-900 hover:bg-slate-800 rounded-2xl border border-slate-800 transition-colors">
                    <ArrowLeft className="w-6 h-6 text-indigo-400" />
                </button>
                <div>
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Level 5: Insurance & Protection</p>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">Protection Gap</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 space-y-8">
                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                        <h2 className="text-2xl font-black text-white mb-6 flex items-center italic">
                            <ShieldCheck className="w-6 h-6 mr-3 text-indigo-400" />
                            Buying Life, Not Lies
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium italic">
                            Insurance is to <span className="text-white font-black italic">protect</span>, not to <span className="text-white font-black italic">invest</span>. Agents love Endowment plans because they get huge commissions, but your family gets <span className="text-rose-500 font-bold underline italic tracking-tight">very low cover</span>.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                            <button
                                onClick={() => setPlan('term')}
                                className={cn(
                                    "p-10 rounded-[3rem] border transition-all text-left relative overflow-hidden group",
                                    plan === 'term' ? "bg-indigo-500/10 border-indigo-500/50 shadow-2xl" : "bg-slate-950/50 border-slate-800 hover:border-slate-700"
                                )}
                            >
                                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all", 
                                    plan === 'term' ? "bg-indigo-500 text-white" : "bg-slate-900 text-slate-500"
                                )}>
                                    <ShieldCheck className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-black text-white mb-2 italic">Term Insurance</h3>
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest italic opacity-60">High Cover, Low Cost</p>
                            </button>

                            <button
                                onClick={() => setPlan('endowment')}
                                className={cn(
                                    "p-10 rounded-[3rem] border transition-all text-left relative overflow-hidden group",
                                    plan === 'endowment' ? "bg-rose-500/10 border-rose-500/50 shadow-2xl" : "bg-slate-950/50 border-slate-800 hover:border-slate-700"
                                )}
                            >
                                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all", 
                                    plan === 'endowment' ? "bg-rose-500 text-white" : "bg-slate-900 text-slate-500"
                                )}>
                                    <Layout className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-black text-white mb-2 italic tracking-tighter">Endowment / ULIP</h3>
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest italic opacity-60">Low Cover, High Cost</p>
                            </button>
                        </div>

                        <div className="p-8 bg-slate-950/50 border border-slate-800 rounded-[2.5rem]">
                            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6 italic">The Rule of Thumb</h4>
                            <p className="text-white text-lg font-black mb-4">Life Cover = 10x Annual Income</p>
                            <p className="text-slate-500 text-sm leading-relaxed italic uppercase font-medium">
                                If you earn ₹10 Lakhs/year, your family needs ₹1 Crore coverage minimum. Only <span className="text-indigo-400 font-black italic">Term Insurance</span> lets you buy this for just ₹10-15k/year.
                            </p>
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-linear-to-br from-[#12121A] to-[#0A0D14] border border-indigo-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden text-center min-h-[400px]">
                        <h3 className="text-lg font-black text-slate-500 mb-8 uppercase tracking-widest italic">Plan Visualization</h3>
                        
                        <AnimatePresence mode="wait">
                            {plan ? (
                                <motion.div
                                    key={plan}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    className="space-y-10"
                                >
                                    <div className="p-10 bg-slate-900 border border-slate-800 rounded-[3rem]">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 italic">{stats?.type}</p>
                                        <h4 className="text-white font-black text-3xl mb-6 italic tracking-tight">{stats?.title}</h4>
                                        
                                        <div className="space-y-6 text-left">
                                            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                                                <span className="text-[11px] font-black text-slate-500 uppercase italic">Life Cover:</span>
                                                <span className={cn("text-xl font-black", plan === 'term' ? "text-indigo-400" : "text-rose-400")}>{stats?.cover}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-[11px] font-black text-slate-500 uppercase italic">Premium:</span>
                                                <span className="text-white font-black">{stats?.premium}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-slate-500 text-sm italic font-medium leading-relaxed uppercase tracking-tight">{stats?.desc}</p>

                                    <button
                                        onClick={() => plan === 'term' && setCompleted(true)}
                                        className={cn("w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all",
                                            plan === 'term' ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 active:scale-95" : "bg-slate-900 text-slate-700 italic border border-slate-800 cursor-not-allowed"
                                        )}
                                    >
                                        Buy the Protectors Plan
                                    </button>
                                </motion.div>
                            ) : (
                                <div className="py-20 flex flex-col items-center justify-center opacity-30 italic">
                                    <HeartPulse className="w-16 h-16 text-slate-600 mb-6 animate-pulse" />
                                    <p className="text-slate-600 font-bold uppercase tracking-widest text-sm">Select a plan to compare coverage</p>
                                </div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {completed && (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="mt-10 p-10 bg-indigo-600 border border-indigo-500 rounded-[3rem] text-center shadow-2xl relative"
                                >
                                    <Star className="w-16 h-16 text-white mx-auto mb-4" />
                                    <p className="text-white font-black text-2xl mb-1 uppercase tracking-tighter italic italic">Gap Closed!</p>
                                    <p className="text-white/80 text-sm font-bold italic mb-8 uppercase tracking-widest">You have secured a ₹2 Crore cover for your future. Mastery Point +1.</p>
                                    <button onClick={onBack} className="w-full py-4 bg-black text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.3em]">Next: Health 101</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="p-8 bg-slate-900 border border-slate-800 rounded-[2.5rem] flex items-center space-x-6">
                         <div className="p-4 bg-slate-800 rounded-2xl">
                             <Calculator className="w-6 h-6 text-indigo-400" />
                         </div>
                         <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest italic leading-loose">
                             Never mix <span className="text-white underline">Insurance</span> and <span className="text-indigo-400 underline italic">Investment</span>. They are two different tools for two different goals.
                         </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
