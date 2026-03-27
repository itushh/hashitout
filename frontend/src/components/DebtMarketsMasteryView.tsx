import { useState, useMemo } from 'react';
import {
    ArrowLeft,
    Trophy,
    Landmark,
    Shield,
    AlertCircle,
    Coins
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface DebtMarketsMasteryViewProps {
    onBack: () => void;
}

export default function DebtMarketsMasteryView({ onBack }: DebtMarketsMasteryViewProps) {
    const [liquid, setLiquid] = useState(40);
    const [gsec, setGsec] = useState(40);
    const [corp, setCorp] = useState(20);
    const [completed, setCompleted] = useState(false);

    const stats = useMemo(() => {
        const total = liquid + gsec + corp;
        const yieldRate = (liquid * 0.055 + gsec * 0.075 + corp * 0.09) / total;
        const safetyScore = (liquid * 100 + gsec * 95 + corp * 60) / total;
        return {
            yieldRate,
            safetyScore,
            total
        };
    }, [liquid, gsec, corp]);

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
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Level 9: Investment Mastery</p>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic tracking-widest tracking-tighter">Debt Mastery</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 space-y-8">
                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-black text-white mb-6 flex items-center italic">
                                <Landmark className="w-6 h-6 mr-3 text-indigo-400" />
                                The Stability Ladder
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium italic italic">
                                Debt markets are the <span className="text-white font-black italic underline italic underline">Foundation</span> of your portfolio. 
                                Lending your money for fixed interest is safer than equity but requires strategic allocation.
                            </p>

                            <div className="space-y-12 mb-10 p-10 bg-slate-950/50 border border-slate-800 rounded-[3rem]">
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse" />
                                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest italic tracking-tighter">Liquid Funds (Safety: 100%)</label>
                                        </div>
                                        <span className="text-white font-black italic tracking-tighter">{liquid}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={liquid}
                                        onChange={(e) => setLiquid(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3" />
                                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest italic tracking-tighter">G-Secs / Gilts (Safety: 95%)</label>
                                        </div>
                                        <span className="text-white font-black italic tracking-tighter">{gsec}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={gsec}
                                        onChange={(e) => setGsec(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 bg-rose-500 rounded-full mr-3" />
                                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest italic tracking-tighter">Corporate Bonds (Safety: 60%)</label>
                                        </div>
                                        <span className="text-white font-black italic tracking-tighter">{corp}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={corp}
                                        onChange={(e) => setCorp(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                                    />
                                </div>
                                <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-between shadow-xl">
                                     <div className="flex items-center space-x-4">
                                         <AlertCircle className="w-5 h-5 text-indigo-500" />
                                         <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">Ensure Total = 100%</p>
                                     </div>
                                     <p className={cn("text-xl font-black italic", stats.total === 100 ? "text-emerald-500" : "text-rose-500")}>{stats.total}%</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-linear-to-br from-[#12121A] to-[#0A0D14] border border-indigo-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden text-center min-h-[400px]">
                        <h3 className="text-lg font-black text-slate-500 mb-8 uppercase tracking-widest italic tracking-[0.2em] italic tracking-tighter">Stability Metrics</h3>
                        
                        <div className="p-10 bg-slate-900 border border-slate-800 rounded-[3rem] mb-10 text-left space-y-8 relative overflow-hidden group">
                             <div className="relative z-10">
                                <div className="flex justify-between items-end border-b border-slate-800 pb-4">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic tracking-widest">Expected Yield:</p>
                                    <p className="text-4xl font-black text-white italic tracking-tighter">{(stats.yieldRate * 100).toFixed(1)}%</p>
                                </div>
                                <div className="flex justify-between items-end pt-4">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic tracking-widest">Safety Score:</p>
                                    <p className={cn("text-4xl font-black italic tracking-tighter", stats.safetyScore >= 80 ? "text-emerald-500" : "text-amber-500")}>{Math.round(stats.safetyScore)}%</p>
                                </div>
                             </div>
                             <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:scale-110 transition-transform">
                                <Shield className="w-40 h-40 text-white" />
                             </div>
                        </div>

                        <button
                            onClick={() => stats.total === 100 && setCompleted(true)}
                            className={cn("w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all", 
                                stats.total === 100 ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 active:scale-95" : "bg-slate-950 text-slate-700 italic border border-slate-800 cursor-not-allowed"
                            )}
                        >
                            Finalize Portfolio
                        </button>

                        <AnimatePresence>
                            {completed && (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="mt-10 p-10 bg-indigo-600 border border-indigo-500 rounded-[3rem] text-center shadow-2xl relative"
                                >
                                    <Trophy className="w-16 h-16 text-white mx-auto mb-4 italic shadow-xl" />
                                    <p className="text-white font-black text-2xl mb-1 uppercase tracking-tighter italic italic tracking-tighter italic">Stability Architect!</p>
                                    <p className="text-white/80 text-sm font-bold italic mb-8 uppercase tracking-widest">You have built a fortress for your cash. Next: SIP Compounding.</p>
                                    <button onClick={onBack} className="w-full py-4 bg-black text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.4em]">Next Module</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl flex items-center space-x-4">
                         <div className="p-3 bg-slate-950 rounded-xl text-indigo-500 shadow-xl border border-slate-800">
                             <Coins className="w-6 h-6 shadow-xl shadow-indigo-500/10" />
                         </div>
                         <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest italic leading-loose">
                            Debt is about <span className="text-white uppercase italic tracking-widest italic tracking-tighter">Protection</span>. Equity is about <span className="text-white uppercase italic tracking-widest italic tracking-tighter">Growth</span>. Never mistake one for the other.
                         </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
