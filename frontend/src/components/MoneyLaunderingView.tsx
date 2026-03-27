import { useState } from 'react';
import {
    ArrowLeft,
    CheckCircle,
    Scale,
    Search,
    AlertCircle,
    Trophy,
    Building2,
    Coins
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface MoneyLaunderingViewProps {
    onBack: () => void;
}

export default function MoneyLaunderingView({ onBack }: MoneyLaunderingViewProps) {
    const [phase, setPhase] = useState(0);
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(false);

    const phases = [
        { 
            title: 'Placement', 
            desc: 'Dirty cash is introduced into the financial system via small deposits.', 
            action: 'Spot the layering attempt below.' 
        },
        { 
            title: 'Layering', 
            desc: 'Moving money through complex layers of transactions to hide origin.', 
            action: 'Trace the shell company path.' 
        },
        { 
            title: 'Integration', 
            desc: 'Money re-enters the economy appearing "clean" from legitimate sources.', 
            action: 'Finalize the audit report.' 
        }
    ];

    const handleAction = () => {
        if (phase < 2) {
            setPhase(prev => prev + 1);
            setScore(prev => prev + 33);
        } else {
            setScore(100);
            setCompleted(true);
        }
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
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Level 8: Legal Context</p>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic tracking-widest tracking-tighter">The Money Washer</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 space-y-8">
                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-black text-white mb-6 flex items-center italic">
                                <Scale className="w-6 h-6 mr-3 text-indigo-400" />
                                Anti-Money Laundering (AML)
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium italic italic">
                                Money Laundering is the process of making "dirty" money look "clean". 
                                It happens in three distinct stages. Master them to spot financial crimes.
                            </p>

                            <div className="grid grid-cols-3 gap-4 mb-10">
                                {phases.map((p, i) => (
                                    <div key={p.title} className={cn(
                                        "p-6 rounded-2xl border transition-all text-center relative",
                                        phase === i ? "bg-indigo-500/10 border-indigo-500/50 shadow-xl scale-[1.05] z-10" : 
                                        phase > i ? "bg-emerald-500/10 border-emerald-500/30 opacity-60" : "bg-slate-950/50 border-slate-800 opacity-30"
                                    )}>
                                        <div className={cn("w-10 h-10 rounded-xl mx-auto mb-4 flex items-center justify-center font-black", 
                                            phase === i ? "bg-indigo-500 text-white" : 
                                            phase > i ? "bg-emerald-500 text-white" : "bg-slate-900 text-slate-600"
                                        )}>
                                            {phase > i ? <CheckCircle className="w-5 h-5" /> : i + 1}
                                        </div>
                                        <h4 className="text-[10px] font-black text-white uppercase tracking-widest">{p.title}</h4>
                                    </div>
                                ))}
                            </div>

                            <div className="p-10 bg-slate-950/50 border border-slate-800 rounded-[3rem] relative overflow-hidden">
                                <h3 className="text-xl font-black text-white mb-4 italic uppercase tracking-tighter">{phases[phase].title} Stage</h3>
                                <p className="text-slate-500 text-sm italic font-medium leading-relaxed uppercase tracking-tight mb-10">
                                    {phases[phase].desc}
                                </p>
                                
                                <div className="p-10 bg-slate-900 rounded-[2rem] border border-slate-800 text-center space-y-8 relative group cursor-pointer" onClick={handleAction}>
                                    <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="w-20 h-20 bg-slate-950 rounded-full mx-auto flex items-center justify-center shadow-2xl border border-slate-800 group-active:scale-95 transition-transform">
                                        <Search className="w-8 h-8 text-indigo-500 animate-pulse" />
                                    </div>
                                    <p className="text-white font-black text-xs uppercase tracking-[0.2em] italic">{phases[phase].action}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-linear-to-br from-[#12121A] to-[#0A0D14] border border-indigo-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden text-center min-h-[400px]">
                        <h3 className="text-lg font-black text-slate-500 mb-8 uppercase tracking-widest italic tracking-[0.2em] italic tracking-tighter">AML Integrity Scan</h3>
                        
                        <div className="p-10 bg-slate-900 border border-slate-800 rounded-[3rem] mb-10 text-center relative pt-10 overflow-hidden">
                             <div className="relative z-10">
                                <motion.p 
                                    key={score}
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    className={cn("text-8xl font-black italic tracking-tighter mb-2", completed ? "text-emerald-500" : "text-white")}
                                >
                                    {score}%
                                </motion.p>
                                <p className="text-indigo-400 font-black text-xs uppercase tracking-widest mt-4 italic tracking-widest">Audit Accuracy</p>
                             </div>
                             <div className="absolute -bottom-10 -right-10 p-10 opacity-5 group-hover:opacity-100 transition-opacity">
                                <Building2 className="w-40 h-40 text-white" />
                             </div>
                        </div>

                        <div className="p-8 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center space-x-4 mb-10 text-left">
                             <AlertCircle className="w-8 h-8 text-indigo-500" />
                             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic leading-loose">
                                Complete all <span className="text-white">3 PHASES</span> of the money washing cycle to pass the audit!
                             </p>
                        </div>

                        <AnimatePresence>
                            {completed && (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="mt-10 p-10 bg-indigo-600 border border-indigo-500 rounded-[3rem] text-center shadow-2xl relative"
                                >
                                    <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
                                    <p className="text-white font-black text-2xl mb-1 uppercase tracking-tighter italic italic tracking-tighter">Audit Master!</p>
                                    <p className="text-white/80 text-sm font-bold italic mb-8 uppercase tracking-widest">You can now identify major financial fraud patterns. Legal XP +200.</p>
                                    <button onClick={onBack} className="w-full py-4 bg-black text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.4em]">Next: Rules & Rights</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl flex items-center space-x-4">
                         <div className="p-3 bg-slate-950 rounded-xl text-indigo-500 shadow-xl">
                             <Coins className="w-6 h-6" />
                         </div>
                         <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest italic leading-loose">
                            Tax evasion is NOT the same as money laundering, but they often walk <span className="text-white underline italic underline">hand-in-hand</span>.
                         </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
