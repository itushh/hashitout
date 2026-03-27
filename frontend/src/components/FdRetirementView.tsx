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
    Landmark,
    Shield
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface FdRetirementViewProps {
    onBack: () => void;
}

export default function FdRetirementView({ onBack }: FdRetirementViewProps) {
    const [principal, setPrincipal] = useState(1000000); // 10 Lakhs
    const [rate, setRate] = useState(7);
    const [years, setYears] = useState(20);
    const [completed, setCompleted] = useState(false);

    const inflation = 6;

    const data = useMemo(() => {
        const results = [];
        for (let i = 0; i <= years; i++) {
            const fdValue = principal * Math.pow(1 + rate / 100, i);
            const inflationValue = principal * Math.pow(1 + inflation / 100, i);
            results.push({
                year: `Yr ${i}`,
                fd: Math.round(fdValue),
                inflation: Math.round(inflationValue)
            });
        }
        return results;
    }, [principal, rate, years]);

    const finalVal = data[data.length - 1];

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
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Level 6: Retirement Planning</p>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic tracking-widest">Savings Safety Net</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 space-y-8">
                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                        <h2 className="text-2xl font-black text-white mb-6 flex items-center italic">
                            <Landmark className="w-6 h-6 mr-3 text-emerald-400" />
                            Fixed Deposits (FD)
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium italic italic">
                            Is FD safe? Mathematically, yes. Practically? Maybe not. While your money <span className="text-white font-black italic">grows</span> at 7%, prices <span className="text-rose-500 font-bold italic">grow</span> at 6%. Your real profit is just <span className="text-white font-black italic">1%</span>.
                        </p>

                        <div className="h-80 mb-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="fdGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="infGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                    <XAxis dataKey="year" stroke="#475569" axisLine={false} tickLine={false} />
                                    <YAxis hide />
                                    <RechartsTooltip 
                                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '1rem' }}
                                        itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                                    />
                                    <Area type="monotone" dataKey="fd" stroke="#10b981" fillOpacity={1} fill="url(#fdGradient)" strokeWidth={3} />
                                    <Area type="monotone" dataKey="inflation" stroke="#ef4444" fillOpacity={1} fill="url(#infGradient)" strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="p-10 bg-slate-950/50 border border-slate-800 rounded-[2.5rem]">
                            <h3 className="text-xl font-black text-white mb-8">Survival Dashboard</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest italic tracking-tighter">FD Interest Rate</label>
                                        <span className={cn("font-black italic text-lg", rate > 6 ? "text-emerald-500" : "text-rose-500")}>{rate}% P.A.</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="4"
                                        max="10"
                                        step="0.5"
                                        value={rate}
                                        onChange={(e) => setRate(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 mb-6"
                                    />
                                    <div className="flex items-center space-x-3 p-4 bg-slate-900 rounded-xl">
                                        <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest italic">Inflation Baseline (6%)</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                     <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic opacity-60">The Mission</h4>
                                     <p className="text-white text-sm font-bold italic leading-relaxed uppercase tracking-tight">
                                        Set your FD rate to <span className="text-emerald-500">8% or more</span> to beat the <span className="text-rose-500 underlined italic">Thief (Inflation)</span> at 20 years.
                                     </p>
                                     <button
                                        onClick={() => rate >= 8 && years >= 20 && setCompleted(true)}
                                        className={cn("w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all", 
                                            (rate >= 8 && years >= 20) ? "bg-emerald-500 text-white shadow-xl shadow-emerald-500/20" : "bg-slate-900 text-slate-700 italic border border-slate-800 cursor-not-allowed"
                                        )}
                                     >
                                        Seal the Safety Net
                                     </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-linear-to-br from-[#0D1F17] to-[#0A0D14] border border-emerald-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden text-center">
                        <h3 className="text-lg font-black text-slate-500 mb-8 uppercase tracking-widest italic tracking-[0.2em]">Retirement Engine</h3>
                        
                        <div className="p-10 bg-slate-900 border border-slate-800 rounded-[3rem] mb-10 space-y-10">
                            <div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 italic">Future FD Value</p>
                                <motion.p 
                                    key={finalVal.fd}
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    className="text-4xl font-black text-emerald-400 tabular-nums tracking-tighter italic"
                                >
                                    ₹{finalVal.fd.toLocaleString()}
                                </motion.p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 italic tracking-tighter">Real Purchasing Power</p>
                                <motion.p 
                                    key={finalVal.inflation}
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    className="text-4xl font-black text-rose-500 tabular-nums tracking-tighter italic"
                                >
                                    ₹{finalVal.inflation.toLocaleString()}
                                </motion.p>
                            </div>
                        </div>

                        <div className="space-y-6 text-left mb-10">
                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Time Horizon</h4>
                            <div className="flex justify-between mb-4">
                                <span className={cn("px-4 py-1 rounded-full text-[10px] font-black", years > 15 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500')}>{years} YEARS</span>
                                <span className="text-white font-black italic tracking-tighter">Target: 20y</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="40"
                                value={years}
                                onChange={(e) => setYears(Number(e.target.value))}
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                            />
                        </div>

                        <AnimatePresence>
                            {completed && (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="p-10 bg-emerald-600 border border-emerald-500 rounded-[3rem] text-center shadow-2xl relative"
                                >
                                    <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
                                    <p className="text-white font-black text-2xl mb-1 uppercase tracking-tighter italic italic tracking-tighter">Net Sealed!</p>
                                    <p className="text-white/80 text-sm font-bold italic mb-8 uppercase tracking-widest">You understand the real return on 'Safe' investments. Shield Point +1.</p>
                                    <button onClick={onBack} className="w-full py-4 bg-black text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.4em]">Next: PF & NPS</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl flex items-center space-x-4">
                         <div className="p-3 bg-slate-950 rounded-xl text-emerald-500 border border-slate-800">
                             <Shield className="w-6 h-6" />
                         </div>
                         <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest italic leading-loose">
                             Safe doesn't mean <span className="text-white">Profitable</span>. Sometimes safe is <span className="text-rose-500 italic">Risky</span> for your retirement because of Inflation.
                         </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
