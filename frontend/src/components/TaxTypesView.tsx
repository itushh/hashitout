import { useState, useMemo } from 'react';
import {
    ArrowLeft,
    Scale,
    TrendingUp,
    CheckCircle,
    Star,
    DollarSign,
    Zap,
    Briefcase,
    Building2,
    ShoppingBag,
    Coins,
    BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface TaxTypesViewProps {
    onBack: () => void;
}

export default function TaxTypesView({ onBack }: TaxTypesViewProps) {
    const [income, setIncome] = useState(1000000);
    const [spending, setSpending] = useState(500000);
    const [completed, setCompleted] = useState(false);

    const taxes = useMemo(() => {
        const gst = spending * 0.18; // 18% avg
        const incomeTax = income > 700000 ? (income - 700000) * 0.1 : 0; // Simple mock
        return {
            gst: Math.round(gst),
            incomeTax: Math.round(incomeTax),
            total: Math.round(gst + incomeTax)
        };
    }, [income, spending]);

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
                    <p className="text-[10px] font-black text-amber-400 uppercase tracking-[0.2em]">Level 4: Taxation in India</p>
                    <h1 className="text-4xl font-black text-white tracking-tighter">Tax Types & Flow</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 space-y-8">
                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                        <h2 className="text-2xl font-black text-white mb-6 flex items-center">
                            <Scale className="w-6 h-6 mr-3 text-amber-400" />
                            Direct vs Indirect
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium italic">
                            In India, you pay taxes twice: once when you <span className="text-white font-black italic">earn</span> (Direct Tax) and once when you <span className="text-white font-black italic">spend</span> (Indirect Tax/GST).
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-8 bg-slate-950/50 rounded-3xl border border-slate-800 hover:border-amber-500/20 transition-all group">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="p-3 bg-amber-500/10 rounded-xl">
                                        <Building2 className="w-5 h-5 text-amber-500" />
                                    </div>
                                    <h4 className="text-white font-black uppercase text-xs tracking-widest">Direct Tax</h4>
                                </div>
                                <p className="text-slate-500 text-sm font-medium italic leading-relaxed">
                                    Paid directly to govt from your income. E.g., Income Tax, Corporate Tax.
                                </p>
                            </div>
                            <div className="p-8 bg-slate-950/50 rounded-3xl border border-slate-800 hover:border-indigo-500/20 transition-all group">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="p-3 bg-indigo-500/10 rounded-xl">
                                        <ShoppingBag className="w-5 h-5 text-indigo-500" />
                                    </div>
                                    <h4 className="text-white font-black uppercase text-xs tracking-widest">Indirect Tax (GST)</h4>
                                </div>
                                <p className="text-slate-500 text-sm font-medium italic leading-relaxed">
                                    Included in the price of goods/services. Everyone pays, regardless of income.
                                </p>
                            </div>
                        </div>

                        <div className="mt-10 p-10 bg-slate-950/50 border border-slate-800 rounded-[2.5rem]">
                            <h3 className="text-xl font-black text-white mb-6">Simulation: The Tax Leak</h3>
                            <div className="space-y-8">
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Annual Income</label>
                                        <span className="text-white font-black">₹{(income/100000).toFixed(1)}L</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="300000"
                                        max="5000000"
                                        step="100000"
                                        value={income}
                                        onChange={(e) => setIncome(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Annual Spending (Goods/Services)</label>
                                        <span className="text-white font-black">₹{(spending/100000).toFixed(1)}L</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="100000"
                                        max=" income"
                                        step="50000"
                                        value={spending}
                                        onChange={(e) => setSpending(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-linear-to-br from-[#1A1A10] to-[#0A0D14] border border-amber-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden text-center">
                        <h3 className="text-lg font-black text-slate-500 mb-8 uppercase tracking-widest italic">Tax Breakdown</h3>
                        
                        <div className="grid grid-cols-2 gap-4 mb-10">
                            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 italic">Income Tax</p>
                                <p className="text-amber-500 font-black text-xl tabular-nums">₹{taxes.incomeTax.toLocaleString()}</p>
                            </div>
                            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 italic">GST (Est. 18%)</p>
                                <p className="text-indigo-500 font-black text-xl tabular-nums">₹{taxes.gst.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="p-10 bg-slate-900/50 rounded-[2.5rem] border border-slate-800 mb-8">
                            <Coins className="w-10 h-10 text-amber-500 mx-auto mb-4" />
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Total Contribution</p>
                            <motion.div 
                                key={taxes.total}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-5xl font-black text-white tracking-tighter"
                            >
                                ₹{taxes.total.toLocaleString()}
                            </motion.div>
                        </div>

                        <button
                            onClick={() => setCompleted(true)}
                            className="w-full py-5 bg-amber-500 text-white font-black rounded-2xl shadow-xl shadow-amber-500/20 active:scale-95 transition-all text-xs uppercase tracking-[0.2em]"
                        >
                            Confirm Analysis
                        </button>

                        <AnimatePresence>
                            {completed && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="mt-10 p-8 bg-emerald-500 border border-emerald-400 rounded-3xl text-center shadow-xl shadow-emerald-500/20"
                                >
                                    <CheckCircle className="w-12 h-12 text-white mx-auto mb-4" />
                                    <p className="text-white font-black text-xl mb-1 italic uppercase tracking-tight">Citizen Unlocked!</p>
                                    <p className="text-white/80 text-sm font-bold italic mb-6">You understand the flow of money to the nation.</p>
                                    <button onClick={onBack} className="w-full py-4 bg-black text-white font-black rounded-xl text-[10px] uppercase tracking-widest">Next Tutorial</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-slate-800 rounded-xl">
                                <BarChart3 className="w-5 h-5 text-amber-500" />
                            </div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic leading-relaxed">
                                Tax money builds <span className="text-white">Roads</span>, <span className="text-white">Hospitals</span>, and <span className="text-white">Schools</span>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
