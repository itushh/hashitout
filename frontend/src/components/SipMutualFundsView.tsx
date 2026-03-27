import { useState, useMemo } from 'react';
import {
    ArrowLeft,
    Snowflake,
    Trophy,
    Zap,
    BarChart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface SipMutualFundsViewProps {
    onBack: () => void;
}

export default function SipMutualFundsView({ onBack }: SipMutualFundsViewProps) {
    const [sip, setSip] = useState(5000);
    const [years, setYears] = useState(10);
    const [returns, setReturns] = useState(12);
    const [completed, setCompleted] = useState(false);

    const calculations = useMemo(() => {
        const monthlyRate = returns / 12 / 100;
        const months = years * 12;
        const totalInvested = sip * months;
        const maturity = Math.round(sip * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
        const wealthGained = maturity - totalInvested;
        return {
            totalInvested,
            maturity,
            wealthGained
        };
    }, [sip, years, returns]);

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
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Level 9: Investment Mastery</p>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic tracking-widest tracking-tighter">SIP SNOWBALL</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 space-y-8">
                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-black text-white mb-6 flex items-center italic">
                                <Snowflake className="w-6 h-6 mr-3 text-emerald-400" />
                                The Power of Compounding
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium italic italic">
                                Compounding is the <span className="text-white font-black italic underline italic underline">8th Wonder</span> of the world. 
                                It works best when you ignore the market noise and focus on <span className="text-white font-black italic underline italic">Time</span>.
                            </p>

                            <div className="p-10 bg-slate-950/50 border border-slate-800 rounded-[3rem] space-y-12">
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest italic tracking-tighter">Monthly SIP Amount</label>
                                        <span className="text-white font-black italic tracking-tighter">₹{sip.toLocaleString()}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="500"
                                        max="100000"
                                        step="500"
                                        value={sip}
                                        onChange={(e) => setSip(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest italic tracking-tighter">Investment Duration (Years)</label>
                                        <span className="text-white font-black italic tracking-tighter">{years} Years</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="40"
                                        value={years}
                                        onChange={(e) => setYears(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest italic tracking-tighter">Expected Return (% p.a.)</label>
                                        <span className="text-white font-black italic tracking-tighter">{returns}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="5"
                                        max="25"
                                        value={returns}
                                        onChange={(e) => setReturns(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-linear-to-br from-[#12121A] to-[#0A0D14] border border-emerald-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden text-center min-h-[400px]">
                        <h3 className="text-lg font-black text-slate-500 mb-8 uppercase tracking-widest italic tracking-[0.2em] italic tracking-tighter italic">Compounding Vision</h3>
                        
                        <div className="p-10 bg-slate-900 border border-slate-800 rounded-[3rem] text-left mb-10 overflow-hidden relative group">
                             <div className="relative z-10 space-y-8">
                                <div className="border-b border-slate-800 pb-4">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic italic tracking-tighter">Total Invested:</p>
                                    <p className="text-2xl font-black text-white italic tracking-tighter">₹{calculations.totalInvested.toLocaleString()}</p>
                                </div>
                                <div className="border-b border-slate-800 pb-4">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic italic tracking-tighter">Wealth Gained:</p>
                                    <p className="text-2xl font-black text-emerald-400 italic tracking-tighter italic shadow-xl">+₹{calculations.wealthGained.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic italic tracking-tighter">Final Corpus:</p>
                                    <p className="text-5xl font-black text-white italic tracking-tighter">₹{(calculations.maturity/10000000).toFixed(2)} Cr</p>
                                </div>
                             </div>
                             <div className="absolute top-4 right-4 p-4 opacity-5 group-hover:opacity-100 transition-opacity">
                                <BarChart className="w-20 h-20 text-emerald-500" />
                             </div>
                        </div>

                        <button
                            onClick={() => years >= 15 && setCompleted(true)}
                            className={cn("w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all", 
                                years >= 15 ? "bg-emerald-600 text-white shadow-xl shadow-emerald-600/20 active:scale-95" : "bg-slate-950 text-slate-700 italic border border-slate-800 cursor-not-allowed"
                            )}
                        >
                            {years < 15 ? 'Needs More Time...' : 'Snowball Complete'}
                        </button>

                        <AnimatePresence>
                            {completed && (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="mt-10 p-10 bg-emerald-600 border border-emerald-500 rounded-[3rem] text-center shadow-2xl relative"
                                >
                                    <Trophy className="w-16 h-16 text-white mx-auto mb-4 italic shadow-xl" />
                                    <p className="text-white font-black text-2xl mb-1 uppercase tracking-tighter italic italic tracking-tighter italic">Snowball Master!</p>
                                    <p className="text-white/80 text-sm font-bold italic mb-8 uppercase tracking-widest">You have mastered delayed gratification. Next: The Trading Floor.</p>
                                    <button onClick={onBack} className="w-full py-4 bg-black text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.4em]">Final Lesson</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl flex items-center space-x-4">
                         <div className="p-3 bg-slate-950 rounded-xl text-emerald-500 shadow-xl">
                             <Zap className="w-6 h-6" />
                         </div>
                         <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest italic leading-loose">
                            Compounding is like a <span className="text-white underline italic underline italic underline">Snowball</span>. The longer the slope, the bigger it gets. <span className="text-white">Start early!</span>
                         </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
