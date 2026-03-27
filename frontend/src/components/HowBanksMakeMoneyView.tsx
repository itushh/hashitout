import { useState, useMemo } from 'react';
import {
    ArrowLeft,
    Banknote,
    CheckCircle,
    ArrowUpRight,
    ArrowDownRight,
    Briefcase
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface HowBanksMakeMoneyViewProps {
    onBack: () => void;
}

export default function HowBanksMakeMoneyView({ onBack }: HowBanksMakeMoneyViewProps) {
    const [depositRate, setDepositRate] = useState(3); // Rate paid to customers
    const [loanRate, setLoanRate] = useState(10); // Rate charged to borrowers
    const [completed, setCompleted] = useState(false);

    const margin = useMemo(() => {
        const value = loanRate - depositRate;
        return {
            value: Number(value.toFixed(1)),
            isProfit: value > 0,
            status: value > 4 ? 'Highly Profitable' : value > 0 ? 'Healthy Margin' : 'Bankrupt'
        };
    }, [depositRate, loanRate]);

    const chartData = [
        { name: 'Interest Cost', value: depositRate, fill: '#ef4444' },
        { name: 'Interest Yield', value: loanRate, fill: '#10b981' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-10 pb-20"
        >
            <div className="flex items-center space-x-4">
                <button onClick={onBack} className="p-3 bg-slate-900 hover:bg-slate-800 rounded-2xl border border-slate-800 transition-colors">
                    <ArrowLeft className="w-6 h-6 text-amber-400" />
                </button>
                <div>
                    <p className="text-[10px] font-black text-amber-400 uppercase tracking-[0.2em]">Level 2: The Banking System</p>
                    <h1 className="text-4xl font-black text-white tracking-tighter">The Banking Machine</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 space-y-8">
                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                        <h2 className="text-2xl font-black text-white mb-6 flex items-center">
                            <Banknote className="w-6 h-6 mr-3 text-amber-400" />
                            How Banks Make Money
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-10">
                            Banks are middlemen. They borrow money from you (deposits) and lend it to others (loans). 
                            Their profit comes from the <span className="text-white font-black italic">Net Interest Margin (NIM)</span>—the difference between what they pay you and what they charge others.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="p-8 bg-slate-950/50 rounded-3xl border border-slate-800 relative group transition-all hover:border-emerald-500/50">
                                <ArrowUpRight className="absolute top-6 right-6 w-5 h-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Lending (The Revenue)</h4>
                                <div className="text-xl text-white font-bold leading-relaxed">
                                    "We charge borrowers <span className="text-emerald-400 font-black">10% interest</span> for car loans, home loans, and business expansion."
                                </div>
                            </div>
                            <div className="p-8 bg-slate-950/50 rounded-3xl border border-slate-800 relative group transition-all hover:border-rose-500/50">
                                <ArrowDownRight className="absolute top-6 right-6 w-5 h-5 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Deposits (The Cost)</h4>
                                <div className="text-xl text-white font-bold leading-relaxed">
                                    "We pay YOU <span className="text-rose-400 font-black">3% interest</span> to keep your savings safe with us."
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 p-8 bg-slate-900 border border-slate-800 rounded-4xl">
                            <h3 className="text-xl font-black text-white mb-6 flex items-center italic">
                                <Briefcase className="w-5 h-5 mr-3 text-amber-400" />
                                The Simulator Quest
                            </h3>
                            <p className="text-slate-400 text-sm mb-6">Can you adjust the rates to achieve a <span className="text-emerald-400 font-black italic">6% Net Interest Margin</span> without going bankrupt?</p>
                            <div className="flex space-x-6">
                                <button className="px-6 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs font-black text-slate-400 uppercase tracking-widest hover:text-white transition-colors">Goal: 6% NIM</button>
                                <button className={cn("px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all", margin.value >= 6 ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "bg-slate-900 text-slate-700")}>Target {margin.value === 6 ? 'REACHED!' : `${(6 - margin.value).toFixed(1)}% Left`}</button>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-linear-to-br from-[#1F1B0D] to-[#0A0D14] border border-amber-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
                        <div className="relative z-10 text-center">
                            <h3 className="text-lg font-black text-slate-500 mb-8 uppercase tracking-widest">Bank Manager Console</h3>
                            
                            <div className="mb-10">
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Net Interest Margin</div>
                                <motion.div 
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    className={cn("text-6xl font-black tabular-nums tracking-tighter", margin.isProfit ? "text-emerald-500" : "text-rose-500")}
                                >
                                    {margin.value}%
                                </motion.div>
                                <div className={cn("text-[10px] font-black px-4 py-1 inline-block rounded-full uppercase tracking-[0.2em] mt-3 border transition-colors", 
                                    margin.value > 4 ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : 
                                    margin.value > 0 ? "bg-amber-500/10 border-amber-500/30 text-amber-400" : 
                                    "bg-rose-500/10 border-rose-500/30 text-rose-400"
                                )}>
                                    {margin.status}
                                </div>
                            </div>

                            <div className="h-48 mb-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData}>
                                        <XAxis dataKey="name" hide />
                                        <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Bar>
                                        <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff' }} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="space-y-10 text-left">
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center">
                                            <ArrowDownRight className="w-3 h-3 mr-2 text-rose-400" />
                                            Deposit Interest (Cost)
                                        </label>
                                        <span className="text-white font-black">{depositRate}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="8"
                                        step="0.5"
                                        value={depositRate}
                                        onChange={(e) => setDepositRate(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center">
                                            <ArrowUpRight className="w-3 h-3 mr-2 text-emerald-400" />
                                            Lending Interest (Yield)
                                        </label>
                                        <span className="text-white font-black">{loanRate}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="4"
                                        max="18"
                                        step="0.5"
                                        value={loanRate}
                                        onChange={(e) => setLoanRate(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                    />
                                </div>

                                <AnimatePresence>
                                    {margin.value === 6 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-8 bg-emerald-500 text-white rounded-[2rem] text-center shadow-xl shadow-emerald-500/20"
                                        >
                                            <CheckCircle className="w-10 h-10 mx-auto mb-4" />
                                            <p className="font-black text-lg mb-1">Target Achieved!</p>
                                            <p className="font-bold opacity-80 text-sm mb-6">You've reached the Gold Tier NIM.</p>
                                            <button 
                                                onClick={() => setCompleted(true)}
                                                className="w-full py-4 bg-black text-white font-black rounded-2xl active:scale-95 transition-all text-xs uppercase tracking-widest"
                                            >
                                                Claim 500 XP
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {completed && (
                                    <motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        onClick={onBack}
                                        className="w-full py-5 bg-amber-500 text-black font-black rounded-2xl shadow-xl shadow-amber-500/20 active:scale-95 transition-all uppercase tracking-widest text-xs"
                                    >
                                        Next: Magic of Interest
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
