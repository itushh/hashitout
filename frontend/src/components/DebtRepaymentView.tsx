import { useState, useMemo } from 'react';
import {
    ArrowLeft,
    TrendingUp,
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
    Trophy
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface DebtRepaymentViewProps {
    onBack: () => void;
}

export default function DebtRepaymentView({ onBack }: DebtRepaymentViewProps) {
    const [strategy, setStrategy] = useState<'snowball' | 'avalanche' | null>(null);
    const [completed, setCompleted] = useState(false);

    const debts = [
        { id: '1', name: 'Credit Card', balance: 50000, rate: 36, icon: <Zap className="w-4 h-4 text-rose-500" /> },
        { id: '2', name: 'Personal Loan', balance: 200000, rate: 15, icon: <AlertCircle className="w-4 h-4 text-amber-500" /> },
        { id: '3', name: 'Car Loan', balance: 500000, rate: 9, icon: <TrendingUp className="w-4 h-4 text-indigo-500" /> },
    ];

    const strategyStats = useMemo(() => {
        if (!strategy) return null;
        return strategy === 'snowball' 
            ? { title: 'The Snowball Effect', desc: 'Focus on paying the smallest debt first to gain psychological momentum.', speed: 'Faster Wins', savings: 'Low' }
            : { title: 'The Avalanche Mode', desc: 'Focus on the highest interest rate first to save the most money mathematically.', speed: 'Slower Wins', savings: 'Maximum' };
    }, [strategy]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-10 pb-20"
        >
            <div className="flex items-center space-x-4">
                <button onClick={onBack} className="p-3 bg-slate-900 hover:bg-slate-800 rounded-2xl border border-slate-800 transition-colors">
                    <ArrowLeft className="w-6 h-6 text-emerald-400" />
                </button>
                <div>
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Level 3: Credit & Borrowing</p>
                    <h1 className="text-4xl font-black text-white tracking-tighter">Debt Crusader</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 space-y-8">
                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                        <h2 className="text-2xl font-black text-white mb-6 flex items-center">
                            <Flame className="w-6 h-6 mr-3 text-rose-500" />
                            Choose Your Battle Strategy
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium italic">
                            Mathematically, paying high interest is better. Psychologically, finishing small debts is better. Which one will you pick?
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <button
                                onClick={() => setStrategy('snowball')}
                                className={cn(
                                    "p-10 rounded-[2.5rem] border transition-all text-left group relative overflow-hidden",
                                    strategy === 'snowball' ? "bg-indigo-500/10 border-indigo-500/50 shadow-xl" : "bg-slate-950/50 border-slate-800 hover:border-slate-700"
                                )}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 -mr-16 -mt-16 blur-2xl group-hover:bg-indigo-500/10 transition-colors" />
                                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all", 
                                    strategy === 'snowball' ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "bg-slate-900 text-slate-500"
                                )}>
                                    <Snowflake className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight italic">Debt Snowball</h3>
                                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest leading-tight italic">Pay Smallest Balance First</p>
                            </button>

                            <button
                                onClick={() => setStrategy('avalanche')}
                                className={cn(
                                    "p-10 rounded-[2.5rem] border transition-all text-left group relative overflow-hidden",
                                    strategy === 'avalanche' ? "bg-emerald-500/10 border-emerald-500/50 shadow-xl" : "bg-slate-950/50 border-slate-800 hover:border-slate-700"
                                )}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 -mr-16 -mt-16 blur-2xl group-hover:bg-emerald-500/10 transition-colors" />
                                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all", 
                                    strategy === 'avalanche' ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "bg-slate-900 text-slate-500"
                                )}>
                                    <Flame className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight italic">Debt Avalanche</h3>
                                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest leading-tight italic">Pay Highest Interest Rate First</p>
                            </button>
                        </div>

                        <div className="mt-10 space-y-4">
                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Your Debt Portfolio</h4>
                            {debts.map((d) => (
                                <div key={d.id} className="p-6 bg-slate-950/50 border border-slate-800 rounded-2xl flex items-center justify-between group hover:border-slate-700 transition-colors">
                                    <div className="flex items-center space-x-6">
                                        <div className="p-4 bg-slate-900 rounded-xl">{d.icon}</div>
                                        <div>
                                            <p className="text-sm font-black text-white uppercase tracking-widest">{d.name}</p>
                                            <p className="text-[10px] text-slate-600 font-bold italic tracking-tight">Interest Rate: <span className="text-rose-500">{d.rate}%</span></p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-black text-white tabular-nums tracking-tighter">₹{d.balance.toLocaleString()}</p>
                                        <p className="text-[9px] text-slate-700 uppercase font-black tracking-widest">Balance Owed</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-linear-to-br from-[#12121A] to-[#0A0D14] border border-slate-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
                        <div className="relative z-10 text-center">
                            <h3 className="text-lg font-black text-slate-500 mb-8 uppercase tracking-widest italic">Strategy Outcome</h3>
                            
                            <AnimatePresence mode="wait">
                                {strategy ? (
                                    <motion.div
                                        key={strategy}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-8"
                                    >
                                        <div className="p-10 bg-slate-900/50 rounded-[2.5rem] border border-slate-800">
                                            <h4 className="text-white font-black text-2xl mb-4 italic tracking-tighter">{strategyStats?.title}</h4>
                                            <p className="text-slate-500 text-sm font-medium leading-relaxed italic mb-8 uppercase tracking-tight">{strategyStats?.desc}</p>
                                            
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="p-6 bg-slate-950/50 rounded-2xl border border-slate-800">
                                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 italic">Advantage</p>
                                                    <p className="text-white font-black text-lg italic">{strategyStats?.speed}</p>
                                                </div>
                                                <div className="p-6 bg-slate-950/50 rounded-2xl border border-slate-800">
                                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 italic">Total Savings</p>
                                                    <p className="text-white font-black text-lg italic">{strategyStats?.savings}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl text-left space-y-4">
                                            <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Pay-off Priority</h5>
                                            <div className="space-y-3">
                                                {(strategy === 'snowball' ? [...debts].sort((a,b) => a.balance - b.balance) : [...debts].sort((a,b) => b.rate - a.rate)).map((d, i) => (
                                                    <div key={d.id} className="flex items-center space-x-4">
                                                        <div className="w-6 h-6 rounded-full bg-slate-800 text-[10px] flex items-center justify-center font-black italic">{i+1}</div>
                                                        <p className="text-sm font-bold text-white uppercase tracking-widest">{d.name}</p>
                                                        {i === 0 && <span className="text-[8px] bg-emerald-500/20 text-emerald-500 px-2 py-0.5 rounded-full font-black uppercase tracking-widest">CRITICAL TARGET</span>}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setCompleted(true)}
                                            className="w-full py-5 bg-indigo-500 text-white font-black rounded-2xl shadow-xl shadow-indigo-500/20 active:scale-95 transition-all text-xs uppercase tracking-[0.2em]"
                                        >
                                            Confirm Strategy & Finish
                                        </button>
                                    </motion.div>
                                ) : (
                                    <div className="py-20 text-center space-y-6">
                                        <Trophy className="w-16 h-16 text-slate-800 mx-auto animate-pulse" />
                                        <p className="text-slate-600 font-black italic uppercase tracking-widest text-sm max-w-xs mx-auto">Pick a strategy on the left to simulate your debt-free future.</p>
                                    </div>
                                )}
                            </AnimatePresence>

                            <AnimatePresence>
                                {completed && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="mt-10 p-10 bg-emerald-500 border border-emerald-400 rounded-[3rem] text-center shadow-2xl shadow-emerald-500/20"
                                    >
                                        <Star className="w-16 h-16 text-white mx-auto mb-4" />
                                        <p className="text-white font-black text-2xl mb-1 italic tracking-tighter uppercase">Debt-Free Goal!</p>
                                        <p className="text-white/80 text-sm font-bold mb-8 italic uppercase tracking-tight leading-relaxed">You have mastered the art of leverage and debt clearing strategies.</p>
                                        <button
                                            onClick={onBack}
                                            className="w-full py-5 bg-black text-white font-black rounded-2xl shadow-lg active:scale-95 transition-all text-xs uppercase tracking-[0.3em]"
                                        >
                                            COMPLETE LEVEL 3
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-slate-800 rounded-xl">
                                <Zap className="w-5 h-5 text-indigo-400" />
                            </div>
                            <div>
                                <h4 className="text-xs font-black text-white uppercase tracking-widest italic">Legendary Status</h4>
                                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-tight italic opacity-80">Completing Level 3 unlocks the <span className="text-indigo-400 font-black">"Debt Crusader"</span> profile border</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
