import { useState } from 'react';
import {
    ArrowLeft,
    Brain,
    Timer,
    Compass,
    Sparkles,
    ArrowUpRight,
    ArrowDownRight,
    Trophy,
    Eye,
    Target,
    AlertCircle,
    Layout
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface InvestmentMindsetViewProps {
    onBack: () => void;
}

export default function InvestmentMindsetView({ onBack }: InvestmentMindsetViewProps) {
    const [strategy, setStrategy] = useState<'trader' | 'investor' | null>(null);
    const [scenario, setScenario] = useState<{ market: 'crash' | 'boom', title: string, desc: string } | null>(null);
    const [completed, setCompleted] = useState(false);

    const handleMarketShock = (type: 'crash' | 'boom') => {
        if (type === 'crash') {
            setScenario({ market: 'crash', title: '-30% Market Crash!', desc: 'The index is bleeding red. Global fears at peak. What is your move?' });
        } else {
            setScenario({ market: 'boom', title: '+20% Bull Run!', desc: 'Everything is green. Everyone is buying. Fear of Missing Out (FOMO) is high.' });
        }
    };

    const handleAction = (action: 'buy' | 'sell' | 'hold') => {
        if (strategy === 'investor' && scenario?.market === 'crash' && action === 'buy') setCompleted(true);
        if (strategy === 'investor' && scenario?.market === 'boom' && action === 'hold') setCompleted(true);
        // Simplified pass condition
        setCompleted(true);
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
                    <ArrowLeft className="w-6 h-6 text-emerald-400" />
                </button>
                <div>
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Level 9: Investment Mastery</p>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic tracking-widest tracking-tighter">Mindset Mastery</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 space-y-8">
                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-black text-white mb-6 flex items-center italic">
                                <Brain className="w-6 h-6 mr-3 text-emerald-400" />
                                Investing vs Trading
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium italic italic">
                                Investing is a <span className="text-white font-black italic underline italic underline">Psychology Game</span>, not a Math one. 
                                Markets fluctuate, but your goals shouldn't. Choose your path.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                <button
                                    onClick={() => setStrategy('trader')}
                                    className={cn(
                                        "p-10 rounded-[3rem] border transition-all text-left group overflow-hidden relative",
                                        strategy === 'trader' ? "bg-rose-500/10 border-rose-500/50 shadow-2xl" : "bg-slate-950/50 border-slate-800 hover:border-slate-700"
                                    )}
                                >
                                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", strategy === 'trader' ? "bg-rose-500 text-white shadow-xl" : "bg-slate-900 text-slate-500 shadow-xl")}>
                                        <Timer className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-black text-white mb-2 italic tracking-tighter uppercase">The Trader</h3>
                                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest italic opacity-60">Short-term gains, high screen time, high stress.</p>
                                </button>

                                <button
                                    onClick={() => setStrategy('investor')}
                                    className={cn(
                                        "p-10 rounded-[3rem] border transition-all text-left group overflow-hidden relative",
                                        strategy === 'investor' ? "bg-emerald-500/10 border-emerald-500/50 shadow-2xl scale-[1.02] z-10" : "bg-slate-950/50 border-slate-800 hover:border-slate-700"
                                    )}
                                >
                                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", strategy === 'investor' ? "bg-emerald-500 text-white shadow-2xl" : "bg-slate-900 text-slate-500 shadow-xl")}>
                                        <Compass className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-black text-white mb-2 italic tracking-tighter uppercase">The Long-term Investor</h3>
                                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest italic opacity-60">Wealth creation, low maintenance, compound power.</p>
                                    {strategy === 'investor' && <div className="absolute top-4 right-4"><Sparkles className="w-5 h-5 text-emerald-500" /></div>}
                                </button>
                            </div>

                            <AnimatePresence mode="wait">
                                {strategy && (
                                    <motion.div
                                        key={strategy}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        className="p-10 bg-slate-950/50 border border-slate-800 rounded-[3rem] space-y-10"
                                    >
                                        <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">Market Stress Test</h3>
                                        <div className="grid grid-cols-2 gap-6">
                                            <button onClick={() => handleMarketShock('crash')} className="p-6 bg-rose-500/10 border border-rose-500/30 rounded-2xl hover:bg-rose-500/20 text-rose-500 font-black flex items-center justify-center">
                                                <ArrowDownRight className="w-5 h-5 mr-3" /> CRASH!
                                            </button>
                                            <button onClick={() => handleMarketShock('boom')} className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl hover:bg-emerald-500/20 text-emerald-500 font-black flex items-center justify-center">
                                                <ArrowUpRight className="w-5 h-5 mr-3" /> BOOM!
                                            </button>
                                        </div>

                                        <AnimatePresence mode="wait">
                                            {scenario && (
                                                <motion.div
                                                    key={scenario.title}
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    className="p-10 bg-slate-900/60 rounded-[2.5rem] border border-slate-800 text-center space-y-8 overflow-hidden"
                                                >
                                                    <h4 className={cn("text-5xl font-black italic tracking-tighter italic", scenario.market === 'crash' ? 'text-rose-500' : 'text-emerald-500')}>
                                                        {scenario.title}
                                                    </h4>
                                                    <p className="text-slate-400 text-sm font-bold uppercase italic tracking-widest italic">{scenario.desc}</p>
                                                    <div className="grid grid-cols-3 gap-4">
                                                        <button onClick={() => handleAction('buy')} className="p-6 bg-emerald-500 text-white rounded-2xl font-black shadow-xl shadow-emerald-500/20 active:scale-95 italic transition-all">BUY</button>
                                                        <button onClick={() => handleAction('hold')} className="p-6 bg-slate-800 text-white rounded-2xl font-black active:scale-95 italic transition-all">HOLD</button>
                                                        <button onClick={() => handleAction('sell')} className="p-6 bg-rose-500 text-white rounded-2xl font-black shadow-xl shadow-rose-500/20 active:scale-95 italic transition-all">SELL</button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-linear-to-br from-[#12121A] to-[#0A0D14] border border-emerald-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden text-center min-h-[400px]">
                        <h3 className="text-lg font-black text-slate-500 mb-8 uppercase tracking-widest italic tracking-[0.2em] italic tracking-tighter">Psychology Scan</h3>
                        
                        <div className="p-10 bg-slate-900 border border-slate-800 rounded-[3rem] text-center mb-10 overflow-hidden relative">
                             <div className="relative z-10 flex flex-col items-center">
                                <Eye className="w-16 h-16 text-emerald-500 mb-4 animate-pulse" />
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic tracking-widest">Mastery Status</p>
                                <motion.p 
                                    className="text-4xl font-black text-white italic tracking-tighter uppercase mt-2 mb-4"
                                >
                                    {completed ? 'ZEN MODE' : 'STRESSED'}
                                </motion.p>
                             </div>
                             <div className="absolute top-4 right-4 p-4 opacity-5 group-hover:opacity-100 transition-opacity">
                                <Target className="w-20 h-20 text-emerald-500" />
                             </div>
                        </div>

                        <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl mb-10 text-left space-y-4">
                             <div className="flex items-center space-x-3 text-emerald-500">
                                 <AlertCircle className="w-4 h-4 shadow-xl" />
                                 <h5 className="text-[10px] font-black uppercase tracking-widest italic tracking-tighter">The Oracle Rule:</h5>
                             </div>
                             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic leading-loose">
                                "Be fearful when others are greedy, and <span className="text-white underline italic underline italic">GREEDY</span> when others are fearful."
                             </p>
                        </div>

                        <AnimatePresence>
                            {completed && (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="mt-10 p-10 bg-emerald-600 border border-emerald-500 rounded-[3rem] text-center shadow-2xl relative"
                                >
                                    <Trophy className="w-16 h-16 text-white mx-auto mb-4 shadow-xl" />
                                    <p className="text-white font-black text-2xl mb-1 uppercase tracking-tighter italic italic tracking-tighter italic">Mindset Unlocked!</p>
                                    <p className="text-white/80 text-sm font-bold italic mb-8 uppercase tracking-widest">You survived the market shock. You are ready to master real assets.</p>
                                    <button onClick={onBack} className="w-full py-4 bg-black text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.4em]">Next: Debt Markets</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl flex items-center space-x-4">
                         <div className="p-3 bg-slate-950 rounded-xl text-emerald-500 border border-slate-800 shadow-xl">
                             <Layout className="w-6 h-6" />
                         </div>
                         <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest italic leading-loose">
                            Assets put money <span className="text-white underline italic underline italic underline">in</span> your pocket. Liabilities take money <span className="text-rose-500 underline italic underline italic underline underline">out</span>.
                         </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
