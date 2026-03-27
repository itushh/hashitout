import { useState, useMemo } from 'react';
import {
    ArrowLeft,
    CheckCircle,
    Sparkles,
    Snowflake,
    Zap as SparkIcon,
    Flame,
    Timer,
    TrendingUp,
    TrendingDown
} from 'lucide-react';
import {
    AreaChart,
    Area,
    Line,
    ResponsiveContainer
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface MagicOfInterestViewProps {
    onBack: () => void;
}

export default function MagicOfInterestView({ onBack }: MagicOfInterestViewProps) {
    const [rate, setRate] = useState(8);
    const [years, setYears] = useState(10);
    const [completed, setCompleted] = useState(false);

    const initialAmount = 10000;

    const data = useMemo(() => {
        const result = [];
        for (let i = 0; i <= 30; i++) {
            const simple = initialAmount * (1 + (rate / 100) * i);
            const compound = initialAmount * Math.pow(1 + (rate / 100), i);
            result.push({
                year: `Year ${i}`,
                Simple: Math.round(simple),
                Compound: Math.round(compound)
            });
        }
        return result;
    }, [rate]);

    const currentStats = useMemo(() => {
        const simple = initialAmount * (1 + (rate / 100) * years);
        const compound = initialAmount * Math.pow(1 + (rate / 100), years);
        return {
            simple: Math.round(simple),
            compound: Math.round(compound),
            difference: Math.round(compound - simple)
        };
    }, [rate, years]);

    const handleChallenge = () => {
        if (years >= 25 && rate >= 10) setCompleted(true);
    };

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
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Level 2: The Banking System</p>
                    <h1 className="text-4xl font-black text-white tracking-tighter">The 8th Wonder</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 space-y-8">
                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-black text-white mb-6 flex items-center">
                                <Sparkles className="w-6 h-6 mr-3 text-indigo-400" />
                                The Magic of Compounding
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                Einstein called compound interest the "Eighth Wonder of the World." 
                                While simple interest only pays on your principal, compound interest pays on your <span className="text-white font-black italic">principal AND your accumulated interest</span>.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-8 bg-slate-950/50 rounded-3xl border border-slate-800 hover:border-indigo-500/20 transition-all group">
                                    <div className="mb-4 text-rose-500">
                                        <TrendingDown className="w-8 h-8 opacity-50" />
                                    </div>
                                    <h4 className="text-white font-black mb-2 uppercase text-xs tracking-widest">Simple Interest</h4>
                                    <p className="text-slate-500 text-sm italic font-medium">Interest is earned only on the initial principal. It grows like a straight line.</p>
                                </div>
                                <div className="p-8 bg-slate-950/50 rounded-3xl border border-slate-800 hover:border-emerald-500/20 transition-all group">
                                    <div className="mb-4 text-emerald-500">
                                        <Snowflake className="w-8 h-8 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                                    </div>
                                    <h4 className="text-white font-black mb-2 uppercase text-xs tracking-widest">Compound Interest</h4>
                                    <p className="text-slate-500 text-sm italic font-medium">Interest is earned on interest. Like a snowball rolling down a hill, it gets bigger and faster!</p>
                                </div>
                            </div>

                            <div className="mt-10 p-10 bg-indigo-600/10 border border-indigo-500/20 rounded-[2.5rem] relative overflow-hidden">
                                <div className="relative z-10 flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center text-indigo-400 font-black text-xs uppercase tracking-widest mb-2 italic">
                                            <Flame className="w-4 h-4 mr-2" />
                                            Snowball Challenge
                                        </div>
                                        <h3 className="text-xl font-black text-white mb-2">The Long Game</h3>
                                        <p className="text-slate-400 text-sm max-w-sm">Observe the divergence after year 20. Set the time to <span className="text-white font-black italic">25+ Years</span> and rate to <span className="text-white font-black italic">10%+</span> to master this module.</p>
                                    </div>
                                    <button 
                                        onClick={handleChallenge}
                                        className={cn("px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all", 
                                            (years >= 25 && rate >= 10) ? "bg-indigo-500 text-white shadow-xl shadow-indigo-500/20" : "bg-slate-900 text-slate-700"
                                        )}
                                    >
                                        Claim Badge
                                    </button>
                                </div>
                                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-linear-to-br from-[#12121A] to-[#0A0D14] border border-indigo-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
                        <div className="relative z-10 text-center">
                            <h3 className="text-lg font-black text-slate-500 mb-8 uppercase tracking-widest">Interest Lab</h3>

                            <div className="mb-10 text-center">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Final Wealth (Compounded)</p>
                                <motion.div 
                                    key={currentStats.compound}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-5xl font-black text-white tabular-nums tracking-tighter"
                                >
                                    ₹{currentStats.compound.toLocaleString()}
                                </motion.div>
                                <p className="text-emerald-400 font-bold text-sm mt-2 flex items-center justify-center">
                                    <SparkIcon className="w-3 h-3 mr-2" />
                                    Extra Gain: +₹{currentStats.difference.toLocaleString()}
                                </p>
                            </div>

                            <div className="h-48 mb-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data}>
                                        <defs>
                                            <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <Area 
                                            type="monotone" 
                                            dataKey="Compound" 
                                            stroke="#6366f1" 
                                            strokeWidth={3}
                                            fillOpacity={1} 
                                            fill="url(#colorComp)" 
                                        />
                                        <Line type="monotone" dataKey="Simple" stroke="#ef4444" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="space-y-10 text-left">
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Return Rate (%)</label>
                                        <span className="text-indigo-400 font-black">{rate}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="15"
                                        step="0.5"
                                        value={rate}
                                        onChange={(e) => setRate(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Time (Years)</label>
                                        <span className="text-indigo-400 font-black">{years} Yrs</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="30"
                                        value={years}
                                        onChange={(e) => setYears(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                    />
                                </div>

                                <AnimatePresence>
                                    {completed && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="p-8 bg-emerald-500/10 border border-emerald-500/30 rounded-[2rem] text-center"
                                        >
                                            <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                                            <p className="text-emerald-400 font-black text-lg mb-1">Time Lord!</p>
                                            <p className="text-emerald-500/60 text-sm font-bold">+600 XP & "Compound King" Title</p>
                                            <button
                                                onClick={onBack}
                                                className="mt-6 w-full py-4 bg-emerald-500 text-white font-black rounded-2xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all text-xs uppercase tracking-widest"
                                            >
                                                Back to Map
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {!completed && (
                                    <div className="p-8 bg-slate-900 border border-slate-800 rounded-[2rem] flex flex-col items-center space-y-4">
                                        <div className="flex -space-x-3">
                                            <div className="w-10 h-10 rounded-full border-2 border-[#0A0D14] bg-indigo-500 flex items-center justify-center">
                                                <Timer className="w-4 h-4 text-white" />
                                            </div>
                                            <div className="w-10 h-10 rounded-full border-2 border-[#0A0D14] bg-purple-500 flex items-center justify-center">
                                                <Sparkles className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-slate-500 font-black uppercase text-center tracking-widest leading-loose">
                                            Push the time to <span className="text-white italic">25+ Years</span> with a <span className="text-white italic">10%+ rate</span> to witness the magic.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
