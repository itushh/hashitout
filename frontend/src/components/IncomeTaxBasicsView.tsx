import { useState, useMemo } from 'react';
import {
    ArrowLeft,
    Calculator,
    TrendingUp,
    CheckCircle,
    Star,
    Zap,
    Scale,
    ShieldCheck,
    Briefcase,
    Building2,
    Search,
    AlertCircle,
    UserCircle2,
    Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface IncomeTaxBasicsViewProps {
    onBack: () => void;
}

export default function IncomeTaxBasicsView({ onBack }: IncomeTaxBasicsViewProps) {
    const [income, setIncome] = useState(1000000);
    const [deductions, setDeductions] = useState(150000); // 80C
    const [completed, setCompleted] = useState(false);

    const taxResults = useMemo(() => {
        // --- NEW REGIME (FY 2024-25 simplified) ---
        const newTaxable = Math.max(0, income - 75000); // Std deduction 75k
        let newTax = 0;
        if (newTaxable > 300000) newTax += Math.min(300000, newTaxable - 300000) * 0.05;
        if (newTaxable > 700000) newTax += Math.min(300000, newTaxable - 700000) * 0.1;
        if (newTaxable > 1000000) newTax += Math.min(200000, newTaxable - 1000000) * 0.15;
        if (newTaxable > 1200000) newTax += Math.min(300000, newTaxable - 1200000) * 0.2;
        if (newTaxable > 1500000) newTax += (newTaxable - 1500000) * 0.3;
        
        // --- OLD REGIME (simplified) ---
        const oldTaxable = Math.max(0, income - 50000 - deductions); 
        let oldTax = 0;
        if (oldTaxable > 250000) oldTax += Math.min(250000, oldTaxable - 250000) * 0.05;
        if (oldTaxable > 500000) oldTax += Math.min(500000, oldTaxable - 500000) * 0.2;
        if (oldTaxable > 1000000) oldTax += (oldTaxable - 1000000) * 0.3;

        return {
            new: Math.round(newTax),
            old: Math.round(oldTax),
            winner: newTax < oldTax ? 'New' : 'Old',
            savings: Math.abs(Math.round(newTax - oldTax))
        };
    }, [income, deductions]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-10 pb-20"
        >
            <div className="flex items-center space-x-4">
                <button onClick={onBack} className="p-3 bg-slate-900 hover:bg-slate-800 rounded-2xl border border-slate-800 transition-colors">
                    <ArrowLeft className="w-6 h-6 text-orange-400" />
                </button>
                <div>
                    <p className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em]">Level 4: Taxation in India</p>
                    <h1 className="text-4xl font-black text-white tracking-tighter">The Regime Battle</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 space-y-8">
                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                        <h2 className="text-2xl font-black text-white mb-6 flex items-center">
                            <Calculator className="w-6 h-6 mr-3 text-orange-400" />
                            Old vs New Regime
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium italic">
                            The Govt offers two paths. One has <span className="text-white font-black italic">Complex Exemptions</span> (Old), 
                            the other has <span className="text-white font-black italic">Lower Tax Rates</span> (New). Your job? Pick the winner.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            {[
                                { title: 'Old Regime', tag: 'Deduction King', desc: 'Allows 80C, HRA, Medical insurance claims.', icon: <Building2 className="w-4 h-4 text-orange-500" /> },
                                { title: 'New Regime', tag: 'Simplicity First', desc: 'Lower rates, no deductions (default option now).', icon: <UserCircle2 className="w-4 h-4 text-emerald-500" /> }
                            ].map((item) => (
                                <div key={item.title} className="p-8 bg-slate-950/50 rounded-3xl border border-slate-800 space-y-2 group hover:border-slate-700 transition-colors">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className="p-3 bg-slate-900 rounded-xl">{item.icon}</div>
                                        <h4 className="text-sm font-black text-white uppercase tracking-widest leading-none">{item.title}</h4>
                                    </div>
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest tracking-tighter italic opacity-60 group-hover:opacity-100 transition-opacity">{item.tag}</p>
                                    <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="p-10 bg-slate-950/50 border border-slate-800 rounded-[2.5rem]">
                            <h3 className="text-xl font-black text-white mb-8">Strategic Planning</h3>
                            <div className="space-y-10">
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Gross Annual Income</label>
                                        <span className="text-white font-black">₹{(income/100000).toFixed(1)}L</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="300000"
                                        max="5000000"
                                        step="50000"
                                        value={income}
                                        onChange={(e) => setIncome(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Investments (80C, Insurance, etc.)</label>
                                        <span className="text-white font-black">₹{(deductions/1000).toFixed(0)}k</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="500000"
                                        step="5000"
                                        value={deductions}
                                        onChange={(e) => setDeductions(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                    />
                                </div>
                                <div className="p-8 bg-orange-500/10 border border-orange-500/20 rounded-3xl flex items-center space-x-6">
                                    <div className="p-4 bg-slate-900 rounded-2xl">
                                        <AlertCircle className="w-6 h-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-white uppercase tracking-widest mb-1 italic">Strategist Quest</p>
                                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-loose">Find a case where <span className="text-white">Old Regime</span> saves you <span className="text-emerald-500 font-black">₹50k or more</span> to pass!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-linear-to-br from-[#1A0D05] to-[#0A0D14] border border-orange-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden text-center">
                        <h3 className="text-lg font-black text-slate-500 mb-8 uppercase tracking-widest italic">The Battle Outcome</h3>
                        
                        <div className="space-y-6 mb-10">
                            <div className={cn("p-8 rounded-3xl border transition-all cursor-default", taxResults.winner === 'Old' ? "bg-emerald-500/10 border-emerald-500/50 shadow-xl" : "bg-slate-900/50 border-slate-800 opacity-60")}>
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Old Regime Tax</p>
                                    {taxResults.winner === 'Old' && <span className="text-[9px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-black uppercase tracking-widest">WINNER</span>}
                                </div>
                                <p className="text-3xl font-black text-white tabular-nums">₹{taxResults.old.toLocaleString()}</p>
                            </div>

                            <div className={cn("p-8 rounded-3xl border transition-all cursor-default", taxResults.winner === 'New' ? "bg-emerald-500/10 border-emerald-500/50 shadow-xl" : "bg-slate-900/50 border-slate-800 opacity-60")}>
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">New Regime Tax</p>
                                    {taxResults.winner === 'New' && <span className="text-[9px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-black uppercase tracking-widest">WINNER</span>}
                                </div>
                                <p className="text-3xl font-black text-white tabular-nums">₹{taxResults.new.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-[2.5rem] mb-10">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 italic">Potential Savings</p>
                            <motion.p 
                                key={taxResults.savings}
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-5xl font-black text-emerald-500 tracking-tighter"
                            >
                                ₹{taxResults.savings.toLocaleString()}
                            </motion.p>
                        </div>

                        <button
                            onClick={() => taxResults.winner === 'Old' && taxResults.savings >= 50000 && setCompleted(true)}
                            className={cn("w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all", 
                                (taxResults.winner === 'Old' && taxResults.savings >= 50000) ? "bg-orange-500 text-white shadow-xl shadow-orange-500/20" : "bg-slate-950 text-slate-700 italic border border-slate-900 cursor-not-allowed"
                            )}
                        >
                            Confirm Tax Strategy
                        </button>

                        <AnimatePresence>
                            {completed && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="mt-10 p-10 bg-orange-500 border border-orange-400 rounded-[2.5rem] text-center shadow-2xl shadow-orange-500/20"
                                >
                                    <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
                                    <p className="text-white font-black text-2xl mb-1 uppercase tracking-tighter italic">Tax Strategist!</p>
                                    <p className="text-white/80 text-sm font-bold italic mb-8 uppercase tracking-widest">You saved ₹50k+ via deductions. Next module: Capital Gains.</p>
                                    <button onClick={onBack} className="w-full py-4 bg-black text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.2em]">Exit to Curriculum</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
