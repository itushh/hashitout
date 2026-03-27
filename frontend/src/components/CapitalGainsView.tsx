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
    Calendar,
    MousePointer2,
    BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface CapitalGainsViewProps {
    onBack: () => void;
}

export default function CapitalGainsView({ onBack }: CapitalGainsViewProps) {
    const [buyPrice, setBuyPrice] = useState(100000);
    const [sellPrice, setSellPrice] = useState(300000);
    const [holdingTime, setHoldingTime] = useState(6); // Months
    const [completed, setCompleted] = useState(false);

    const taxResults = useMemo(() => {
        const profit = sellPrice - buyPrice;
        const isLongTerm = holdingTime >= 12;
        let tax = 0;
        let type = isLongTerm ? 'LTCG (Long Term)' : 'STCG (Short Term)';
        
        if (isLongTerm) {
            tax = profit > 125000 ? (profit - 125000) * 0.125 : 0; // Simplified LTCG
        } else {
            tax = profit * 0.2; // Simplified STCG
        }

        return {
            profit: Math.round(profit),
            tax: Math.round(tax),
            type,
            isLongTerm,
            rate: isLongTerm ? '12.5%' : '20%',
            netProfit: Math.round(profit - tax)
        };
    }, [buyPrice, sellPrice, holdingTime]);

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
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Level 4: Taxation in India</p>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">Capital Gains Tax</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 space-y-8">
                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                        <h2 className="text-2xl font-black text-white mb-6 flex items-center italic">
                            <BarChart3 className="w-6 h-6 mr-3 text-emerald-400" />
                            Tax on Profits
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium italic">
                            When you sell an asset (Stocks, Gold, Real Estate) for a <span className="text-white font-black italic">Profit</span>, Govt wants a share. 
                            The secret part? The <span className="text-emerald-500 font-bold italic underline">longer you hold</span>, the less you pay.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                            <div className="p-10 bg-slate-950/50 rounded-[2.5rem] border border-slate-800 group hover:border-emerald-500/20 transition-all">
                                <h4 className="text-white font-black uppercase text-xs tracking-widest mb-4 flex items-center italic">
                                    <Timer className="w-4 h-4 mr-2 text-rose-400" />
                                    STCG: The Fast Tax
                                </h4>
                                <p className="text-slate-500 text-sm font-medium italic italic leading-relaxed">
                                    Sell in less than <span className="text-rose-500 font-black italic">12 months</span>? Pay <span className="text-rose-500 font-black italic">20%</span> tax on the entire profit.
                                </p>
                            </div>
                            <div className="p-10 bg-slate-950/50 rounded-[2.5rem] border border-slate-800 group hover:border-emerald-500/20 transition-all">
                                <h4 className="text-white font-black uppercase text-xs tracking-widest mb-4 flex items-center italic">
                                    <Calendar className="w-4 h-4 mr-2 text-emerald-400" />
                                    LTCG: The Patient Tax
                                </h4>
                                <p className="text-slate-500 text-sm font-medium italic italic leading-relaxed">
                                    Hold for <span className="text-emerald-500 font-black italic">12 months+</span>? Pay <span className="text-emerald-500 font-black italic">12.5%</span> (with a ₹1.25L exemption!)
                                </p>
                            </div>
                        </div>

                        <div className="p-10 bg-emerald-500/10 border border-emerald-500/20 rounded-[3rem] relative overflow-hidden group">
                           <div className="relative z-10 flex items-center justify-between">
                                <div className="space-y-4">
                                    <div className="p-3 bg-slate-900 rounded-xl inline-flex items-center text-xs font-black text-emerald-400 uppercase tracking-widest italic">
                                        <Zap className="w-4 h-4 mr-2" />
                                        Profit Protector Bonus
                                    </div>
                                    <h3 className="text-2xl font-black text-white italic tracking-tighter">Save ₹2,00,000 using patience</h3>
                                    <p className="text-slate-500 text-sm max-w-sm italic tracking-tight font-medium opacity-80 group-hover:opacity-100 transition-opacity uppercase">
                                        Adjust the holding months for a <span className="text-white">₹3,00,000 profit</span>. Hit <span className="text-emerald-500">12+ months</span> to clear the level!
                                    </p>
                                    <button 
                                        onClick={() => taxResults.isLongTerm && setCompleted(true)}
                                        className={cn("px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all", 
                                            taxResults.isLongTerm ? "bg-emerald-500 text-white shadow-xl shadow-emerald-500/20" : "bg-slate-900 text-slate-700 italic border border-slate-800 cursor-not-allowed"
                                        )}
                                    >
                                        Execute Long-Term Hold
                                    </button>
                                </div>
                                <div className="w-32 h-32 bg-slate-900/50 rounded-full flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity ml-10">
                                    <MousePointer2 className="w-10 h-10 text-emerald-500 animate-bounce" />
                                </div>
                           </div>
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-linear-to-br from-[#0D1F17] to-[#0A0D14] border border-emerald-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden text-center">
                        <h3 className="text-lg font-black text-slate-500 mb-8 uppercase tracking-widest italic">Trade Report</h3>
                        
                        <div className="mb-10 text-center p-10 bg-slate-900/50 rounded-[3rem] border border-slate-800">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 italic">Tax Payable ({taxResults.rate})</p>
                            <motion.div 
                                key={taxResults.tax}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className={cn("text-6xl font-black tabular-nums tracking-tighter", taxResults.isLongTerm ? "text-emerald-500" : "text-rose-500")}
                            >
                                ₹{taxResults.tax.toLocaleString()}
                            </motion.div>
                            <p className="text-white/60 font-black text-xs uppercase tracking-widest mt-4 italic">{taxResults.type}</p>
                        </div>

                        <div className="space-y-10 text-left">
                            <div>
                                <div className="flex justify-between mb-4">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest italic">Holding Period</label>
                                    <span className="text-white font-black">{holdingTime} Months</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="36"
                                    value={holdingTime}
                                    onChange={(e) => setHoldingTime(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between mb-4">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest italic">Total Profit</label>
                                    <span className="text-white font-black">₹{taxResults.profit.toLocaleString()}</span>
                                </div>
                                <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-center font-black text-slate-400 italic">
                                    Buy: ₹{buyPrice/1000}k | Sell: ₹{sellPrice/1000}k
                                </div>
                            </div>

                            <AnimatePresence>
                                {completed && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-10 bg-emerald-500 border border-emerald-400 rounded-[3rem] text-center shadow-2xl shadow-emerald-500/20"
                                    >
                                        <Star className="w-16 h-16 text-white mx-auto mb-4" />
                                        <p className="text-white font-black text-2xl mb-1 uppercase tracking-tighter italic">Patient Profit!</p>
                                        <p className="text-white/80 text-sm font-bold italic mb-8 uppercase tracking-widest">You saved nearly 50% in taxes by holding for 1 year.</p>
                                        <button onClick={onBack} className="w-full py-4 bg-black text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.3em]">Next Level</button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] flex items-center space-x-6">
                        <div className="p-3 bg-slate-800 rounded-xl">
                            <TrendingUp className="w-6 h-6 text-emerald-400" />
                        </div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic leading-loose">
                            Long-term investing is not just a <span className="text-white border-b border-white">growth</span> strategy, it's a <span className="text-emerald-500 border-b border-emerald-500">tax saving</span> strategy.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
