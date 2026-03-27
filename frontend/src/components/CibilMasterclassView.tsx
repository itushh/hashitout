import { useState, useMemo } from 'react';
import {
    ArrowLeft,
    ShieldCheck,
    AlertTriangle,
    TrendingUp,
    CheckCircle,
    Star,
    CreditCard,
    Zap,
    History,
    PieChart,
    BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface CibilMasterclassViewProps {
    onBack: () => void;
}

export default function CibilMasterclassView({ onBack }: CibilMasterclassViewProps) {
    const [score, setScore] = useState(650);
    const [history, setHistory] = useState<{ text: string, change: number, type: 'up' | 'down' }[]>([]);
    const [completed, setCompleted] = useState(false);

    const actions = [
        { id: '1', text: "Set Autopay for Credit Card", change: 45, impact: 'up', desc: "Payment history is 35% of your score!" },
        { id: '2', text: "Max out Credit Card (95% usage)", change: -60, impact: 'down', desc: "Credit Utilization above 30% is a major red flag." },
        { id: '3', text: "Apply for 5 Personal Loans in one day", change: -40, impact: 'down', desc: "Too many 'Hard Inquiries' scream desperation to banks." },
        { id: '4', text: "Increase Credit Limit (but keep spending same)", change: 25, impact: 'up', desc: "Lowering your utilization ratio boosts points instantly." },
        { id: '5', text: "Close your oldest 10-year old Credit Card", change: -30, impact: 'down', desc: "Length of credit history matters. Don't kill old records!" }
    ];

    const handleAction = (action: typeof actions[0]) => {
        if (history.find(h => h.text === action.text)) return;
        setScore(prev => Math.min(900, Math.max(300, prev + action.change)));
        setHistory(prev => [{ text: action.text, change: action.change, type: action.impact as 'up' | 'down' }, ...prev]);
        if (score + action.change >= 780) setCompleted(true);
    };

    const getScoreColor = (s: number) => {
        if (s < 600) return 'text-rose-500';
        if (s < 750) return 'text-amber-500';
        return 'text-emerald-500';
    };

    const rotation = ((score - 300) / 600) * 180 - 90;

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
                    <h1 className="text-4xl font-black text-white tracking-tighter">CIBIL Guardian</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 space-y-8">
                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                        <h2 className="text-2xl font-black text-white mb-6 flex items-center">
                            <ShieldCheck className="w-6 h-6 mr-3 text-emerald-400" />
                            Your Credit Power
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-10">
                            Think of CIBIL as your <span className="text-white font-black italic">Financial Character Certificate</span>. 
                            A score above 750 gets you lower interest rates, while a low score makes you an 'untouchable' for banks.
                        </p>

                        <div className="space-y-4">
                            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">Simulation: Shape Your Future</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {actions.map((action) => {
                                    const isDone = history.find(h => h.text === action.text);
                                    return (
                                        <button
                                            key={action.id}
                                            disabled={!!isDone}
                                            onClick={() => handleAction(action)}
                                            className={cn(
                                                "p-6 rounded-2xl border transition-all text-left flex items-center justify-between group",
                                                isDone 
                                                    ? "bg-slate-900/50 border-slate-800 opacity-50 cursor-not-allowed" 
                                                    : "bg-slate-950/50 border-slate-800 hover:border-emerald-500/30 hover:bg-emerald-500/5"
                                            )}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", action.impact === 'up' ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500")}>
                                                    {action.impact === 'up' ? <TrendingUp className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                                                </div>
                                                <div>
                                                    <p className="text-white font-bold text-sm">{action.text}</p>
                                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{action.desc}</p>
                                                </div>
                                            </div>
                                            <div className={cn("font-black text-xs", action.impact === 'up' ? "text-emerald-500" : "text-rose-500")}>
                                                {action.impact === 'up' ? '+' : ''}{action.change} PTS
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl">
                        <h2 className="text-2xl font-black text-white mb-8">What build your score?</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { name: 'Payment History', val: '35%', icon: <History className="w-4 h-4" /> },
                                { name: 'Credit Utilization', val: '30%', icon: <PieChart className="w-4 h-4" /> },
                                { name: 'Credit Duration', val: '15%', icon: <Zap className="w-4 h-4" /> },
                                { name: 'Credit Mix', val: '10%', icon: <BarChart3 className="w-4 h-4" /> }
                            ].map((item) => (
                                <div key={item.name} className="p-6 bg-slate-950/50 border border-slate-800 rounded-2xl text-center">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-4 font-black">
                                        {item.icon}
                                    </div>
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">{item.name}</p>
                                    <p className="text-white font-black text-lg">{item.val}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-linear-to-br from-[#0D1F17] to-[#0A0D14] border border-emerald-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
                        <div className="relative z-10 text-center">
                            <h3 className="text-lg font-black text-slate-500 mb-8 uppercase tracking-widest">CIBIL Meter</h3>
                            
                            <div className="relative w-64 h-32 mx-auto mb-8 overflow-hidden">
                                <div className="absolute inset-0 border-[16px] border-slate-800 rounded-t-full" />
                                <div className="absolute inset-0 border-[16px] border-linear-to-r from-rose-500 via-amber-500 to-emerald-500 rounded-t-full mask-image-clip-path opacity-80" />
                                <motion.div 
                                    className="absolute bottom-0 left-1/2 w-2 h-24 bg-white/80 rounded-full origin-bottom -ml-1 border border-black shadow-xl"
                                    animate={{ rotate: rotation }}
                                    transition={{ type: 'spring', damping: 10 }}
                                />
                                <div className="absolute bottom-0 left-1/2 -ml-3 w-6 h-6 rounded-full bg-white shadow-2xl" />
                            </div>

                            <div className="mb-10 text-center">
                                <motion.div 
                                    key={score}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className={cn("text-7xl font-black tabular-nums tracking-tighter", getScoreColor(score))}
                                >
                                    {score}
                                </motion.div>
                                <p className="text-slate-500 font-black text-xs uppercase tracking-widest mt-2">{score >= 750 ? "EXCELLENT" : score >= 650 ? "GOOD" : "RISKY"}</p>
                            </div>

                            <div className="space-y-6 text-left">
                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 italic">Action History</h4>
                                <div className="max-h-60 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                                    {history.map((h, i) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            key={i}
                                            className="bg-slate-900/50 p-4 rounded-xl flex items-center justify-between border border-slate-800/50"
                                        >
                                            <p className="text-xs text-slate-300 font-bold max-w-[150px] truncate">{h.text}</p>
                                            <span className={cn("font-black text-[10px]", h.type === 'up' ? "text-emerald-500" : "text-rose-500")}>
                                                {h.type === 'up' ? '+' : ''}{h.change}
                                            </span>
                                        </motion.div>
                                    ))}
                                    {history.length === 0 && (
                                        <p className="text-center py-10 text-slate-700 text-xs font-bold italic">No actions taken yet.</p>
                                    )}
                                </div>

                                <AnimatePresence>
                                    {completed && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="p-8 bg-emerald-500 border border-emerald-400 rounded-3xl text-center shadow-xl shadow-emerald-500/20"
                                        >
                                            <Star className="w-12 h-12 text-white mx-auto mb-4" />
                                            <p className="text-white font-black text-xl mb-1">CIBIL Master!</p>
                                            <p className="text-white/80 text-sm font-bold mb-6">Score is now 750+. You qualify for the cheapest loans.</p>
                                            <button
                                                onClick={onBack}
                                                className="w-full py-4 bg-black text-white font-black rounded-2xl shadow-lg active:scale-95 transition-all text-xs uppercase tracking-widest"
                                            >
                                                Next: Loan Anatomy
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-slate-800 rounded-xl">
                                <CreditCard className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                                <h4 className="text-xs font-black text-white uppercase tracking-widest">Goal: 780 Score</h4>
                                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-tight">Hit the target to unlock <span className="text-emerald-500">Platinum Badge</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
