import { useState, useMemo } from 'react';
import {
    ArrowLeft,
    ShieldCheck,
    TrendingUp,
    CheckCircle,
    Star,
    Zap,
    Briefcase,
    Building2,
    Search,
    AlertCircle,
    Trophy,
    Lock,
    Unlock,
    DollarSign,
    Scale
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface PfNpsDeepDiveViewProps {
    onBack: () => void;
}

export default function PfNpsDeepDiveView({ onBack }: PfNpsDeepDiveViewProps) {
    const [selectedTool, setSelectedTool] = useState<'epf' | 'ppf' | 'nps' | null>(null);
    const [npsContribution, setNpsContribution] = useState(50000);
    const [completed, setCompleted] = useState(false);

    const tools = {
        epf: { name: 'EPF (Emp. Provident Fund)', rate: '8.25%', tax: 'EEE', lock: 'Retirement (v. strict)', desc: 'Mandatory for many, high safety, employer matches your 12% contribution.' },
        ppf: { name: 'PPF (Public Provident Fund)', rate: '7.1%', tax: 'EEE', lock: '15 Years', desc: 'Sovereign guarantee, 1.5L limit under 80C, best for long term debt.' },
        nps: { name: 'NPS (National Pension System)', rate: '9-12%', tax: 'EET', lock: 'Age 60', desc: 'Equity exposure, extra 50k deduction (80CCD), cheaper than any M.F.' }
    };

    const npsTaxSaved = Math.round(npsContribution * 0.3); // Assuming 30% bracket

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-10 pb-20"
        >
            <div className="flex items-center space-x-4">
                <button onClick={onBack} className="p-3 bg-slate-900 hover:bg-slate-800 rounded-2xl border border-slate-800 transition-colors">
                    <ArrowLeft className="w-6 h-6 text-amber-500" />
                </button>
                <div>
                    <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em]">Level 6: Retirement Planning</p>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic tracking-widest tracking-tighter">The Tax Shield</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 space-y-8">
                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                        <h2 className="text-2xl font-black text-white mb-6 flex items-center italic">
                            <Scale className="w-6 h-6 mr-3 text-amber-500" />
                            Retirement Trio
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium italic italic">
                            In India, these three are the <span className="text-white font-black italic">Gods of Retirement</span>. They keep your money <span className="text-amber-500 font-bold italic tracking-tight">LOCKED</span> so you can't spend it today, ensuring you have enough for tomorrow.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            {Object.entries(tools).map(([key, tool]) => (
                                <button
                                    key={key}
                                    onClick={() => setSelectedTool(key as any)}
                                    className={cn(
                                        "p-8 rounded-[2.5rem] border transition-all text-left relative overflow-hidden group",
                                        selectedTool === key ? "bg-amber-500/10 border-amber-500/50 shadow-2xl scale-[1.05] z-10" : "bg-slate-950/50 border-slate-800 hover:border-slate-700"
                                    )}
                                >
                                    <h4 className="text-white font-black text-xs uppercase tracking-widest mb-4 italic">{key.toUpperCase()}</h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[9px] font-black text-slate-500 uppercase">Rate:</span>
                                            <span className="text-xs font-black text-white">{tool.rate}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[9px] font-black text-slate-500 uppercase">Tax Mode:</span>
                                            <span className="text-xs font-black text-amber-400">{tool.tax}</span>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex justify-center">
                                         <Lock className={cn("w-6 h-6 transition-all", selectedTool === key ? "text-amber-500" : "text-slate-700")} />
                                    </div>
                                </button>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            {selectedTool ? (
                                <motion.div
                                    key={selectedTool}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    className="p-10 bg-slate-950/50 border border-slate-800 rounded-[2.5rem] relative"
                                >
                                    <h3 className="text-xl font-black text-white mb-4 italic uppercase tracking-tighter">{tools[selectedTool].name}</h3>
                                    <p className="text-slate-500 text-sm italic font-medium leading-relaxed uppercase tracking-tight mb-8">
                                        {tools[selectedTool].desc}
                                    </p>
                                    <div className="flex items-center space-x-4 p-6 bg-slate-900 rounded-2xl border border-slate-800 text-amber-500">
                                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                        <p className="text-[10px] font-black uppercase tracking-widest italic leading-loose">
                                            Locking Period: <span className="text-white border-b border-white">{tools[selectedTool].lock}</span>
                                        </p>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="p-20 bg-slate-950/50 rounded-[2.5rem] border border-slate-800 text-center opacity-30 italic">
                                    <Unlock className="w-12 h-12 text-slate-600 mx-auto mb-4 animate-pulse" />
                                    <p className="text-slate-600 font-bold uppercase tracking-widest text-xs">Unlock a tool to explore retirement power</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </section>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-linear-to-br from-[#1C1A10] to-[#0A0D14] border border-amber-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden text-center min-h-[400px]">
                        <h3 className="text-lg font-black text-slate-500 mb-8 uppercase tracking-widest italic tracking-[0.2em]">The NPS Extra Shield</h3>
                        
                        <div className="p-10 bg-slate-900 border border-slate-800 rounded-[3rem] text-center mb-10 group overflow-hidden relative">
                             <div className="relative z-10">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 italic">Additional Tax Saved (80CCD)</p>
                                <motion.div 
                                    key={npsTaxSaved}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="text-6xl font-black text-amber-500 tracking-tighter tabular-nums"
                                >
                                    ₹{npsTaxSaved.toLocaleString()}
                                </motion.div>
                                <p className="text-white/40 font-black text-[10px] uppercase tracking-widest mt-4 italic">Per Year Forever</p>
                             </div>
                             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-100 transition-opacity">
                                <DollarSign className="w-20 h-20 text-amber-500" />
                             </div>
                        </div>

                        <div className="space-y-6 text-left mb-10">
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic tracking-tighter">NPS Tier I Contribution</label>
                                <span className="text-white font-black italic tracking-tighter">₹{npsContribution.toLocaleString()}</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="50000"
                                step="5000"
                                value={npsContribution}
                                onChange={(e) => setNpsContribution(Number(e.target.value))}
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                            />
                        </div>

                        <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-2xl flex items-center space-x-4 mb-10 text-left">
                             <TrendingUp className="w-8 h-8 text-amber-500" />
                             <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest italic leading-loose">
                                Reach <span className="text-white">₹50,000</span> contribution and explore all <span className="text-white">3 tools</span> to pass!
                             </p>
                        </div>

                        <button
                            onClick={() => selectedTool !== null && npsContribution === 50000 && setCompleted(true)}
                            className={cn("w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all", 
                                (selectedTool !== null && npsContribution === 50000) ? "bg-amber-600 text-white shadow-xl shadow-amber-600/20 active:scale-95" : "bg-slate-950 text-slate-700 italic border border-slate-900 cursor-not-allowed"
                            )}
                        >
                            Finalize Tax Strategy
                        </button>

                        <AnimatePresence>
                            {completed && (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="p-10 bg-amber-600 border border-amber-500 rounded-[3rem] text-center shadow-2xl relative"
                                >
                                    <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
                                    <p className="text-white font-black text-2xl mb-1 uppercase tracking-tighter italic italic tracking-tighter">Shield Master!</p>
                                    <p className="text-white/80 text-sm font-bold italic mb-8 uppercase tracking-widest">You have mastered the TRIO and secured extra tax benefits. Retirement XP +500.</p>
                                    <button onClick={onBack} className="w-full py-4 bg-black text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.4em]">Next: FIRE Concept</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
