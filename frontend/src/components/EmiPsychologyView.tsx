import { useState, useMemo } from 'react';
import {
    ArrowLeft,
    ShieldAlert,
    Zap,
    CheckCircle,
    Star,
    Ghost,
    Search,
    AlertCircle,
    Zap as SparkIcon,
    Flame,
    Calculator,
    Smartphone,
    CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface EmiPsychologyViewProps {
    onBack: () => void;
}

export default function EmiPsychologyView({ onBack }: EmiPsychologyViewProps) {
    const [processingFee, setProcessingFee] = useState(199);
    const [upfrontPayment, setUpfrontPayment] = useState(1000);
    const [completed, setCompleted] = useState(false);

    const productPrice = 60000;
    const emiMonths = 6;
    const advertisedInterest = 0;

    const calculations = useMemo(() => {
        const monthlyEmi = productPrice / emiMonths;
        const totalPaid = (monthlyEmi * emiMonths) + processingFee + upfrontPayment;
        const hiddenEffectiveRate = (((totalPaid - productPrice) / productPrice) * (12 / emiMonths)) * 100;
        
        return {
            monthlyEmi: Math.round(monthlyEmi),
            totalPaid: Math.round(totalPaid),
            extraCost: Math.round(totalPaid - productPrice),
            effectiveRate: Number(hiddenEffectiveRate.toFixed(1))
        };
    }, [processingFee, upfrontPayment]);

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
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Level 3: Credit & Borrowing</p>
                    <h1 className="text-4xl font-black text-white tracking-tighter">The No-Cost Myth</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 space-y-8">
                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-black text-white mb-6 flex items-center">
                                <Ghost className="w-6 h-6 mr-3 text-indigo-400" />
                                The Ghost Interest
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                "No-Cost EMI" is often a psychological trap. While the interest rate is mathematically 0%, banks often charge 
                                <span className="text-white font-black italic"> Processing Fees</span> and <span className="text-white font-black italic"> Upfront Costs</span> that hide the real interest.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-8 bg-slate-950/50 rounded-3xl border border-slate-800 hover:border-indigo-500/20 transition-all group">
                                    <h4 className="text-white font-black mb-2 uppercase text-xs tracking-widest">Small Payments</h4>
                                    <p className="text-slate-500 text-sm font-medium italic opacity-80 group-hover:opacity-100 transition-opacity">
                                        Paying ₹10,000 feels "easier" than paying ₹60,000, making you buy things you can't afford.
                                    </p>
                                </div>
                                <div className="p-8 bg-slate-950/50 rounded-3xl border border-slate-800 hover:border-emerald-500/20 transition-all group">
                                    <h4 className="text-white font-black mb-2 uppercase text-xs tracking-widest">Instant Gratification</h4>
                                    <p className="text-slate-500 text-sm font-medium italic opacity-80 group-hover:opacity-100 transition-opacity">
                                        You bypass the "pain of paying" which usually stops us from overspending.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-10 p-10 bg-indigo-600/10 border border-indigo-500/20 rounded-[2.5rem] relative overflow-hidden">
                                <div className="relative z-10 flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center text-indigo-400 font-black text-xs uppercase tracking-widest mb-2 italic">
                                            <Search className="w-4 h-4 mr-2" />
                                            Case Study: The iPhone Trap
                                        </div>
                                        <h3 className="text-xl font-black text-white mb-4">Unmask the Effective Rate</h3>
                                        <p className="text-slate-400 text-sm max-w-sm mb-6">
                                            Adjust the fees to see why "Free" isn't free. Hit an effective rate of <span className="text-white font-black italic">6% or more</span> to master this module.
                                        </p>
                                        <button 
                                            onClick={() => calculations.effectiveRate >= 6 && setCompleted(true)}
                                            className={cn("px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all", 
                                                calculations.effectiveRate >= 6 ? "bg-indigo-500 text-white shadow-xl shadow-indigo-500/20" : "bg-slate-900 text-slate-700 font-bold italic"
                                            )}
                                        >
                                            Reveal the Trap
                                        </button>
                                    </div>
                                    <div className="w-32 h-48 bg-slate-900/50 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between ml-10 hidden md:flex">
                                        <Smartphone className="w-6 h-6 text-slate-700" />
                                        <div className="space-y-2">
                                            <div className="h-1 bg-slate-800 rounded-full" />
                                            <div className="h-1 bg-slate-800 rounded-full w-2/3" />
                                        </div>
                                        <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-tighter">0% EMI</p>
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-linear-to-br from-[#12121A] to-[#0A0D14] border border-indigo-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
                        <div className="relative z-10 text-center">
                            <h3 className="text-lg font-black text-slate-500 mb-8 uppercase tracking-widest italic">Myth-Buster Console</h3>

                            <div className="mb-10 text-center p-10 bg-slate-900/50 rounded-[2.5rem] border border-slate-800">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 italic tracking-[0.2em]">Hidden Effective Rate</p>
                                <motion.div 
                                    key={calculations.effectiveRate}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className={cn("text-6xl font-black tabular-nums tracking-tighter", calculations.effectiveRate > 0 ? "text-rose-500" : "text-emerald-500")}
                                >
                                    {calculations.effectiveRate}%
                                </motion.div>
                                <p className="text-rose-400/60 font-black text-xs uppercase tracking-widest mt-4">Total Extra Cost: ₹{calculations.extraCost.toLocaleString()}</p>
                            </div>

                            <div className="space-y-10 text-left">
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center italic">
                                            <Calculator className="w-3 h-3 mr-2" />
                                            Processing Fees
                                        </label>
                                        <span className="text-white font-black">₹{processingFee}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1999"
                                        step="1"
                                        value={processingFee}
                                        onChange={(e) => setProcessingFee(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center italic">
                                            <CreditCard className="w-3 h-3 mr-2" />
                                            Hidden Upfront Cost
                                        </label>
                                        <span className="text-white font-black">₹{upfrontPayment}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="5000"
                                        step="50"
                                        value={upfrontPayment}
                                        onChange={(e) => setUpfrontPayment(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                    />
                                </div>

                                <AnimatePresence>
                                    {completed && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="p-8 bg-emerald-500/10 border border-emerald-500/30 rounded-[2.5rem] text-center"
                                        >
                                            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                                            <p className="text-emerald-400 font-black text-xl mb-1">Myth Busted!</p>
                                            <p className="text-emerald-500/60 text-sm font-bold">+500 XP Awarded</p>
                                            <button
                                                onClick={onBack}
                                                className="mt-6 w-full py-5 bg-emerald-500 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/20 active:scale-95 transition-all text-xs uppercase tracking-[0.2em]"
                                            >
                                                Back to Path
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {!completed && (
                                    <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl flex items-center space-x-4">
                                        <div className="p-3 bg-slate-800 rounded-xl">
                                            <AlertCircle className="w-5 h-5 text-indigo-400" />
                                        </div>
                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest italic leading-loose">
                                            Adjust fees until you see a <span className="text-rose-500">6%+ Hidden Rate</span> to pass the audit!
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
