import { useState } from 'react';
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
    Trophy,
    Ghost,
    Skull,
    MousePointer2,
    Search,
    UserCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface DontBeADuckViewProps {
    onBack: () => void;
}

export default function DontBeADuckView({ onBack }: DontBeADuckViewProps) {
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState<string[]>([]);
    const [completed, setCompleted] = useState(false);

    const offers = [
        { id: '1', text: "EARN 2% DAILY! Trade AI-Crypto with our new 'SuperBot'. Instant withdrawals.", type: 'Ponzi', flags: 'Too good to be true, Guaranteed high returns, No regulation.' },
        { id: '2', text: "Join the 'Golden Circle'. Invite 3 people, and earn ₹1 Lakh every month from their work.", type: 'MLM/Pyramid', flags: 'Recruitment focus over product, No clear revenue model.' },
        { id: '3', text: "Invest in NIFTY 50 Index Fund. Track the top 50 companies with 0.1% fee.", type: 'LEGIT', flags: 'Regulated by SEBI, Diversified, Realistic growth.' },
        { id: '4', text: "Double your money in 21 days with our 'Secret Laxmi Fund'. No KYC needed.", type: 'Ponzi', flags: 'No KYC, Extremely fast doubling, Shady origin.' },
        { id: '5', text: "Private Whatsapp Group: Buy these 'Penny Stocks' now to see 500% jump tomorrow!", type: 'Pump & Dump', flags: 'Unsolicited advice, High urgency, Low volume stocks.' }
    ];

    const handleHunt = (id: string, type: string) => {
        if (selected.includes(id)) return;
        setSelected([...selected, id]);
        if (type !== 'LEGIT') setScore(prev => prev + 1);
        if (selected.length === offers.length - 1) setCompleted(true);
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
                    <ArrowLeft className="w-6 h-6 text-amber-500" />
                </button>
                <div>
                    <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em]">Level 7: Fraud Prevention</p>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic tracking-widest tracking-tighter">The Duck Hunt</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 space-y-8">
                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-black text-white mb-6 flex items-center italic">
                                <Search className="w-6 h-6 mr-3 text-amber-500" />
                                Spot the Red Flags
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium italic italic">
                                Don't be a <span className="text-white font-black italic underline underline italic">SITTING DUCK</span> for financial predators. 
                                High returns + Low risk = <span className="text-rose-500 font-black italic">CERTAIN FRAUD</span>. 
                                Click the offers that look <span className="text-amber-500 font-bold italic underline">SUSPICIOUS</span> to expose them!
                            </p>

                            <div className="space-y-6">
                                {offers.map((o) => {
                                    const isSelected = selected.includes(o.id);
                                    return (
                                        <div key={o.id} className="group">
                                            <button
                                                disabled={isSelected}
                                                onClick={() => handleHunt(o.id, o.type)}
                                                className={cn(
                                                    "w-full p-8 rounded-3xl border transition-all text-left relative overflow-hidden flex items-center justify-between",
                                                    isSelected 
                                                        ? (o.type === 'LEGIT' ? "bg-emerald-500/20 border-emerald-500/50" : "bg-rose-500/20 border-rose-500/50") 
                                                        : "bg-slate-950/50 border-slate-800 hover:border-amber-500/20 hover:bg-slate-900 shadow-xl"
                                                )}
                                            >
                                                <div className="flex items-center space-x-6">
                                                     <div className={cn("p-4 bg-slate-950 rounded-2xl", isSelected ? "text-white" : "text-amber-500 shadow-xl")}>
                                                         <MousePointer2 className="w-5 h-5" />
                                                     </div>
                                                     <p className="text-white font-black text-sm italic tracking-tight italic opacity-90">{o.text}</p>
                                                </div>
                                                {!isSelected && (
                                                    <div className="p-3 bg-amber-500 rounded-xl text-white shadow-xl active:scale-95 transition-transform hidden group-hover:block relative z-10">
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
                                                        <div className={cn(
                                                            "p-10 border-x border-b rounded-b-[2rem] ml-10 -mt-8 pt-16 flex items-start space-x-6 relative z-0",
                                                            o.type === 'LEGIT' ? "bg-emerald-500/10 border-emerald-500/50" : "bg-rose-500/10 border-rose-500/50"
                                                        )}>
                                                            <div className="p-3 bg-slate-950 rounded-xl shadow-xl">
                                                                {o.type === 'LEGIT' ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <Skull className="w-5 h-5 text-rose-500" />}
                                                            </div>
                                                            <div>
                                                                <h5 className="text-[10px] font-black uppercase tracking-widest mb-1 italic opacity-60">Analysis Result:</h5>
                                                                <p className="text-white font-black text-sm mb-2 uppercase italic tracking-widest">{o.type}</p>
                                                                <p className="text-slate-500 text-xs font-bold leading-relaxed italic">{o.flags}</p>
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
                    <div className="bg-linear-to-br from-[#1C1A10] to-[#0A0D14] border border-amber-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden text-center min-h-[400px]">
                        <h3 className="text-lg font-black text-slate-500 mb-8 uppercase tracking-widest italic tracking-[0.3em] italic tracking-tighter">Hunter Score</h3>
                        
                        <div className="p-10 bg-slate-900 border border-slate-800 rounded-[3rem] mb-10 text-center relative pt-10 group overflow-hidden">
                             <motion.p 
                                key={score}
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                className="text-8xl font-black italic tracking-tighter mb-2 text-white"
                             >
                                {score}/4
                             </motion.p>
                             <p className="text-amber-400 font-black text-xs uppercase tracking-widest mt-4 italic tracking-widest">Scams Exterminated</p>
                             <div className="absolute top-4 right-4 p-4 opacity-5 group-hover:opacity-100 transition-opacity">
                                <Ghost className="w-16 h-16 text-amber-500" />
                             </div>
                        </div>

                        <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl mb-10 text-left space-y-4 relative overflow-hidden">
                             <div className="flex items-center space-x-3 text-amber-500">
                                 <AlertCircle className="w-4 h-4" />
                                 <h5 className="text-[10px] font-black uppercase tracking-widest italic">The Golden Rule:</h5>
                             </div>
                             <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest italic leading-loose">
                                If you don't understand how the company <span className="text-white underline italic underline">makes money</span>, the product is <span className="text-rose-500 font-black italic underline italic">PROBABLY YOU</span>.
                             </p>
                        </div>

                        <button
                            onClick={() => completed && onBack()}
                            className={cn("w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all", 
                                completed ? "bg-amber-500 text-white shadow-xl shadow-amber-500/20 active:scale-95" : "bg-slate-950 text-slate-700 italic border border-slate-800 cursor-not-allowed"
                            )}
                        >
                            Finalize Hunt
                        </button>

                        <AnimatePresence>
                            {completed && (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="mt-10 p-10 bg-emerald-600 border border-emerald-500 rounded-[3rem] text-center shadow-2xl relative"
                                >
                                    <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
                                    <p className="text-white font-black text-2xl mb-1 uppercase tracking-tighter italic italic tracking-tighter">Wise Hunter!</p>
                                    <p className="text-white/80 text-sm font-bold italic mb-8 uppercase tracking-widest">You have developed the instincts of a master investor. Curriculum mastery achieved.</p>
                                    <button onClick={onBack} className="w-full py-4 bg-black text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.4em]">Exit to Dashboard</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
