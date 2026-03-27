import { useState, useMemo } from 'react';
import {
    ArrowLeft,
    Zap,
    CheckCircle,
    Star,
    Snowflake,
    Flame,
    Calculator,
    Timer,
    AlertCircle,
    ArrowUpRight,
    ArrowDownRight,
    Trophy,
    Mountain,
    Flag,
    Sparkles,
    UserCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface FireConceptViewProps {
    onBack: () => void;
}

export default function FireConceptView({ onBack }: FireConceptViewProps) {
    const [expenses, setExpenses] = useState(50000);
    const [savings, setSavings] = useState(10000000); // 1 Crore
    const [completed, setCompleted] = useState(false);

    const calculations = useMemo(() => {
        const annualExpenses = expenses * 12;
        const targetCorpus = annualExpenses * 25; // 25x Rule
        const progress = Math.min(100, Math.round((savings / targetCorpus) * 100));
        const swr = Math.round(savings * 0.04 / 12); // 4% SWR Monthly
        
        return {
            annualExpenses,
            targetCorpus,
            progress,
            swr,
            gap: Math.max(0, targetCorpus - savings)
        };
    }, [expenses, savings]);

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
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Level 6: Retirement Planning</p>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic tracking-widest tracking-tighter">The FIRE Road</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 space-y-8">
                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-black text-white mb-6 flex items-center italic">
                                <Flame className="w-6 h-6 mr-3 text-orange-400" />
                                Financial Independence, Retire Early
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium italic italic">
                                FIRE is not about <span className="text-white font-black italic">escaping</span> work, it's about <span className="text-indigo-400 font-bold italic tracking-tight underline italic">owning</span> your time. 
                                The core rule is simple: Save <span className="text-white font-black italic">25x</span> your annual expenses, and you can live off the returns forever.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                <div className="p-10 bg-slate-950/50 rounded-[2.5rem] border border-slate-800 space-y-4 group hover:border-orange-500/20 transition-all">
                                    <h4 className="text-white font-black text-xs uppercase tracking-widest flex items-center italic tracking-widest italic tracking-tighter">
                                        <Timer className="w-4 h-4 mr-2" />
                                        The 25x Rule
                                    </h4>
                                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-loose italic">
                                        Once your corpus hits 25x of your spend, you are mathematically FREE.
                                    </p>
                                </div>
                                <div className="p-10 bg-slate-950/50 rounded-[2.5rem] border border-slate-800 space-y-4 group hover:border-emerald-500/20 transition-all">
                                    <h4 className="text-white font-black text-xs uppercase tracking-widest flex items-center italic tracking-widest italic tracking-tighter">
                                        <Zap className="w-4 h-4 mr-2" />
                                        The 4% Rule
                                    </h4>
                                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-loose italic">
                                        Withdrawing 4% of your total corpus every year rarely depletes it over 30 years.
                                    </p>
                                </div>
                            </div>

                            <div className="p-10 bg-slate-950/50 border border-slate-800 rounded-[3rem]">
                                <h3 className="text-xl font-black text-white mb-8">Independence Dashboard</h3>
                                <div className="space-y-12">
                                    <div>
                                        <div className="flex justify-between mb-4">
                                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest italic tracking-tighter">Monthly Survival Expenses (Rent, Food, EMI)</label>
                                            <span className="text-white font-black italic tracking-tighter text-lg underline">₹{expenses.toLocaleString()}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="10000"
                                            max="300000"
                                            step="5000"
                                            value={expenses}
                                            onChange={(e) => setExpenses(Number(e.target.value))}
                                            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-4">
                                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest italic tracking-tighter">Current Retirement Savings</label>
                                            <span className="text-white font-black italic tracking-tighter">₹{(savings/10000000).toFixed(2)} Cr</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100000000"
                                            step="1000000"
                                            value={savings}
                                            onChange={(e) => setSavings(Number(e.target.value))}
                                            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                        />
                                    </div>
                                    <div className="p-8 bg-indigo-500/10 border border-indigo-500/20 rounded-3xl flex items-center space-x-6 text-left">
                                         <AlertCircle className="w-8 h-8 text-indigo-500" />
                                         <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic leading-loose">
                                            Mission: Reach <span className="text-white">100% Progress</span> by adjusting your lifestyle (Expenses) or your Portfolio (Savings) to pass!
                                         </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-linear-to-br from-[#12121A] to-[#0A0D14] border border-indigo-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden text-center min-h-[400px]">
                        <h3 className="text-lg font-black text-slate-500 mb-8 uppercase tracking-widest italic tracking-[0.2em] italic tracking-tighter">Freedom Tracker</h3>
                        
                        <div className="mb-10 text-center relative pt-10">
                            <motion.p 
                                key={calculations.progress}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className={cn("text-8xl font-black italic tracking-tighter mb-2", calculations.progress === 100 ? "text-indigo-400" : "text-white")}
                            >
                                {calculations.progress}%
                            </motion.p>
                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest italic tracking-tighter">Independence Realized</p>
                            
                            <div className="mt-8 flex justify-center space-x-4">
                                <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-[10px] font-black text-indigo-400 uppercase tracking-widest italic flex items-center">
                                    <Sparkles className="w-3 h-3 mr-2" />
                                    Fat FIRE
                                </div>
                                <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-[10px] font-black text-amber-400 uppercase tracking-widest italic flex items-center">
                                    <Snowflake className="w-3 h-3 mr-2" />
                                    Lean FIRE
                                </div>
                            </div>
                        </div>

                        <div className="p-10 bg-slate-900 border border-slate-800 rounded-[3rem] mb-10 text-left space-y-6 overflow-hidden relative">
                             <div className="relative z-10">
                                <div className="flex justify-between items-end border-b border-slate-800 pb-4">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic italic tracking-tighter">FIRE Goal:</p>
                                    <p className="text-2xl font-black text-white italic tracking-tighter">₹{(calculations.targetCorpus/10000000).toFixed(2)} Cr</p>
                                </div>
                                <div className="flex justify-between items-end border-b border-slate-800 pb-4 py-4">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic italic tracking-tighter">Safe Monthly Pay:</p>
                                    <p className={cn("text-2xl font-black italic tracking-tighter", calculations.swr >= expenses ? "text-emerald-500" : "text-rose-500")}>₹{calculations.swr.toLocaleString()}</p>
                                </div>
                             </div>
                             <div className="absolute -bottom-10 -right-10 p-10 opacity-5 rotate-12">
                                <Mountain className="w-40 h-40 text-white" />
                             </div>
                        </div>

                        <button
                            onClick={() => calculations.progress === 100 && setCompleted(true)}
                            className={cn("w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all relative overflow-hidden group", 
                                calculations.progress === 100 ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 active:scale-95" : "bg-slate-950 text-slate-700 italic border border-slate-900 cursor-not-allowed"
                            )}
                        >
                            <span className="relative z-10 font-black">Escape the Matrix</span>
                            {calculations.progress === 100 && (
                                <motion.div 
                                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                                    animate={{ left: ['-100%', '100%'] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                                />
                            )}
                        </button>

                        <AnimatePresence>
                            {completed && (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="mt-10 p-10 bg-indigo-600 border border-indigo-500 rounded-[3rem] text-center shadow-2xl relative"
                                >
                                    <Flag className="w-16 h-16 text-white mx-auto mb-4" />
                                    <p className="text-white font-black text-2xl mb-1 uppercase tracking-tighter italic italic tracking-tighter">FIRE ARCHITECT!</p>
                                    <p className="text-white/80 text-sm font-bold italic mb-8 uppercase tracking-widest">You have mastered the road to freedom. Retirement modules complete.</p>
                                    <button onClick={onBack} className="w-full py-4 bg-black text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.4em]">Curriculum Master</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl flex items-center space-x-4">
                         <div className="p-3 bg-slate-950 rounded-xl text-indigo-500">
                             <Sparkles className="w-6 h-6" />
                         </div>
                         <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest italic leading-loose">
                            Independence is when your <span className="text-white underline italic underline">Return on Investment</span> {'>'} <span className="text-white underline italic underline">Cost of Living</span>.
                         </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
