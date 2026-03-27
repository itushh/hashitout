import { useState } from 'react';
import {
    ArrowLeft,
    Shield,
    TrendingUp,
    CheckCircle,
    Star,
    Zap,
    Briefcase,
    Building2,
    Search,
    AlertCircle,
    Trophy,
    UserCircle2,
    Ghost,
    Skull,
    Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface AvoidAgentScamsViewProps {
    onBack: () => void;
}

export default function AvoidAgentScamsView({ onBack }: AvoidAgentScamsViewProps) {
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState<string[]>([]);
    const [completed, setCompleted] = useState(false);

    const pitches = [
        { id: '1', text: "This insurance plan doubles your money in 10 years guaranteed!", isScam: true, fact: "Insurance is protection. Doubling money in 10y is only ~7% CAGR, which is a very poor investment." },
        { id: '2', text: "Pay for 5 years and get tax-free returns for life.", isScam: true, fact: "This is a classic 'hiding the IRR' pitch. The effective return is often less than 5%." },
        { id: '3', text: "Term insurance is a waste because you get nothing back if you live.", isScam: false, fact: "Actually, getting nothing back is why it's so cheap. It's the only plan that truly protects your family." },
        { id: '4', text: "High premium is better because you get more bonuses.", isScam: true, fact: "Higher premium mostly means higher commission for the agent, not better returns for you." },
        { id: '5', text: "Close your old policy and buy this new 'upgraded' one immediately.", isScam: true, fact: "Closing old policies in the first few years leads to massive losses for you and new commission for the agent." }
    ];

    const handleChoice = (id: string, isScam: boolean) => {
        if (selected.includes(id)) return;
        setSelected([...selected, id]);
        if (isScam) setScore(prev => prev + 1);
        if (selected.length === pitches.length - 1) setCompleted(true);
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
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Level 5: Insurance & Protection</p>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic tracking-widest tracking-tighter">Scam Detector</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 space-y-8">
                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-black text-white mb-6 flex items-center italic">
                                <Search className="w-6 h-6 mr-3 text-indigo-400" />
                                Spot the Mis-selling
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium italic">
                                In India, insurance is often <span className="text-white font-black italic underline tracking-tight underline">mis-sold</span> as a tax-saving investment. Don't be a victim. 
                                Click on the <span className="text-indigo-400 font-bold italic underline">Scam</span> pitches to expose them!
                            </p>

                            <div className="space-y-6">
                                {pitches.map((p) => {
                                    const isSelected = selected.includes(p.id);
                                    return (
                                        <div key={p.id} className="group">
                                            <button
                                                disabled={isSelected}
                                                onClick={() => handleChoice(p.id, p.isScam)}
                                                className={cn(
                                                    "w-full p-8 rounded-3xl border transition-all text-left relative overflow-hidden flex items-center justify-between",
                                                    isSelected 
                                                        ? (p.isScam ? "bg-indigo-500/20 border-indigo-500/50" : "bg-slate-900 border-slate-800 opacity-40") 
                                                        : "bg-slate-950/50 border-slate-800 hover:border-indigo-500/20 hover:bg-slate-900 shadow-xl"
                                                )}
                                            >
                                                <div className="flex items-center space-x-6">
                                                    <div className={cn("p-4 bg-slate-900 rounded-2xl", isSelected && p.isScam ? "text-indigo-400" : "text-slate-600")}>
                                                        <UserCircle2 className="w-6 h-6" />
                                                    </div>
                                                    <p className="text-white font-black text-sm italic tracking-tight italic">{p.text}</p>
                                                </div>
                                                {!isSelected && (
                                                    <div className="p-3 bg-indigo-500 rounded-xl text-white shadow-lg active:scale-90 transition-transform hidden group-hover:block">
                                                        <Search className="w-4 h-4" />
                                                    </div>
                                                )}
                                            </button>
                                            <AnimatePresence>
                                                {isSelected && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="p-10 bg-slate-900/50 border-x border-b border-slate-800 rounded-b-[2rem] ml-10 -mt-8 pt-16 flex items-start space-x-6 relative z-0">
                                                            <div className="p-3 bg-slate-950 rounded-xl">
                                                                {p.isScam ? <Skull className="w-5 h-5 text-rose-500" /> : <Shield className="w-5 h-5 text-emerald-500" />}
                                                            </div>
                                                            <div>
                                                                <h5 className="text-[10px] font-black uppercase tracking-widest mb-1 italic opacity-60">The Financial Reality:</h5>
                                                                <p className="text-slate-500 text-xs font-bold leading-relaxed italic">{p.fact}</p>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-linear-to-br from-[#12121A] to-[#0A0D14] border border-indigo-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden text-center min-h-[400px]">
                        <h3 className="text-lg font-black text-slate-500 mb-8 uppercase tracking-widest italic tracking-[0.2em]">Detector Status</h3>
                        
                        <div className="p-10 bg-slate-900 border border-slate-800 rounded-[3rem] mb-10 text-center">
                            <motion.p 
                                key={score}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-7xl font-black text-white tabular-nums tracking-tighter italic"
                            >
                                {score}/4
                            </motion.p>
                            <p className="text-indigo-400 font-black text-xs uppercase tracking-widest mt-4 italic">Scams Exposed</p>
                        </div>

                        <div className="space-y-6 mb-10">
                            {[
                                { name: 'Commitment Period', val: 'Low', icon: <Clock className="w-4 h-4" /> },
                                { name: 'Commissions', val: 'High', icon: <TrendingUp className="w-4 h-4" /> }
                            ].map((item) => (
                                <div key={item.name} className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800 flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="p-2 bg-slate-950 rounded-lg text-indigo-400">{item.icon}</div>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">{item.name}</p>
                                    </div>
                                    <p className="text-white font-black text-sm italic">{item.val}</p>
                                </div>
                            ))}
                        </div>

                        <AnimatePresence>
                            {completed && (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="p-10 bg-indigo-600 border border-indigo-500 rounded-[3rem] text-center shadow-2xl relative overflow-hidden"
                                >
                                    <Sparkles className="w-16 h-16 text-white mx-auto mb-4" />
                                    <p className="text-white font-black text-2xl mb-1 uppercase tracking-tighter italic italic tracking-tighter">Truth Seeker!</p>
                                    <p className="text-white/80 text-sm font-bold italic mb-8 uppercase tracking-widest">You have developed the BS detection skills to protect your wealth from agents.</p>
                                    <button onClick={onBack} className="w-full py-4 bg-black text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.4em]">Level 5 Complete</button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {!completed && (
                             <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl flex items-center space-x-4 text-left">
                                <AlertCircle className="w-8 h-8 text-indigo-500" />
                                <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest italic leading-loose">
                                    Reveal all <span className="text-white">5 pitches</span> to finalize the detector scan. 
                                    <br/>(4 scams, 1 truth)
                                </p>
                             </div>
                        )}
                    </div>

                    <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
                         <div className="flex items-center space-x-3">
                             <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                             <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Pro Tip</p>
                         </div>
                         <p className="text-xs text-slate-500 font-bold italic opacity-60 italic leading-relaxed">
                            If an agent says <span className="text-white font-black">Guaranteed</span> + <span className="text-white font-black">Returns</span> + <span className="text-white font-black">Insurance</span>, run the other way!
                         </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
