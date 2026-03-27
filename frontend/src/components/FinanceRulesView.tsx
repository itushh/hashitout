import { useState } from 'react';
import {
    ArrowLeft,
    Scale,
    Trophy,
    MousePointer2,
    Shield,
    Gavel,
    CheckCircle2,
    Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface FinanceRulesViewProps {
    onBack: () => void;
}

export default function FinanceRulesView({ onBack }: FinanceRulesViewProps) {
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState<string[]>([]);
    const [completed, setCompleted] = useState(false);

    const scenarios = [
        { 
            id: '1', 
            title: 'The Failed Bank', 
            scenario: 'Your bank just went bankrupt. You have ₹10 Lakhs in your account.', 
            options: [
                { id: '1a', text: 'RBI Ombudsman will refund all 10L.', correct: false, note: 'Incorrect. RBI Ombudsman handles service issues, not bankruptcy insurance.' },
                { id: '1b', text: 'DICGC ensures 5L is returned within 90 days.', correct: true, note: 'Correct! DICGC covers up to ₹5 Lakhs (Principal + Interest) per bank.' }
            ]
        },
        { 
            id: '2', 
            title: 'The Rogue Broker', 
            scenario: 'A stock broker mis-sold you shares without your consent.', 
            options: [
                { id: '2a', text: 'File a complaint on SEBI SCORES.', correct: true, note: 'Correct! SCORES is the centralized grievance system for the stock market.' },
                { id: '2b', text: 'Call RBI Customer Care.', correct: false, note: 'Incorrect. Stock market issues go to SEBI, not RBI.' }
            ]
        },
        { 
            id: '3', 
            title: 'Unauthorized Transaction', 
            scenario: 'You lost ₹50,000 via a card leak you immediately reported.', 
            options: [
                { id: '3a', text: "Zero Liability Policy protects you if reported in 3 days.", correct: true, note: "Correct! If reported within 3 working days, you have 'Zero Liability'." },
                { id: '3b', text: "RBI allows banks to keep the money for 30 days.", correct: false, note: "Incorrect. RBI requires banks to refund/shadow credit within 10 days." }
            ]
        }
    ];

    const currentScenario = scenarios.find(s => !selected.includes(s.id));

    const handleChoice = (isCorrect: boolean) => {
        if (isCorrect) setScore(prev => prev + 1);
        if (currentScenario) setSelected([...selected, currentScenario.id]);
        if (selected.length === scenarios.length - 1) setCompleted(true);
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
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Level 8: Legal Context</p>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic tracking-widest tracking-tighter">The Legal Sentinel</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 space-y-8">
                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-black text-white mb-6 flex items-center italic">
                                <Gavel className="w-6 h-6 mr-3 text-emerald-400" />
                                Your Financial Rights
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium italic italic">
                                Being a financial master means knowing when to <span className="text-white font-black italic">Fight back</span>. 
                                Complete the scenarios to learn how to defend your wealth using RBI/SEBI laws.
                            </p>

                            <AnimatePresence mode="wait">
                                {currentScenario ? (
                                    <motion.div
                                        key={currentScenario.id}
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -20, opacity: 0 }}
                                        className="p-10 bg-slate-950/50 border border-slate-800 rounded-[3rem] relative"
                                    >
                                        <div className="flex items-center space-x-4 mb-6">
                                            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-black">
                                                {selected.length + 1}
                                            </div>
                                            <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">{currentScenario.title}</h3>
                                        </div>
                                        <p className="text-slate-500 text-sm font-black italic uppercase tracking-widest leading-relaxed mb-10 p-6 bg-slate-900 rounded-2xl border border-slate-800">
                                            "{currentScenario.scenario}"
                                        </p>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {currentScenario.options.map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => handleChoice(opt.correct)}
                                                    className="p-8 rounded-[2rem] border border-slate-800 bg-slate-950/50 hover:border-emerald-500/50 hover:bg-slate-900 transition-all text-left group shadow-xl"
                                                >
                                                    <p className="text-white font-black text-xs uppercase tracking-widest italic tracking-tighter">{opt.text}</p>
                                                    <div className="mt-6 flex justify-end opacity-20 group-hover:opacity-100 transition-opacity">
                                                        <MousePointer2 className="w-5 h-5 text-emerald-500" />
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="p-20 text-center opacity-30 italic">
                                        <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
                                        <p className="text-slate-500 font-bold uppercase tracking-widest">All Scenarios Handled</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-linear-to-br from-[#101A12] to-[#0A0D14] border border-emerald-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden text-center min-h-[400px]">
                        <h3 className="text-lg font-black text-slate-500 mb-8 uppercase tracking-widest italic tracking-[0.2em] italic tracking-tighter">Sentinel Status</h3>
                        
                        <div className="p-10 bg-slate-900 border border-slate-800 rounded-[3rem] text-center mb-10 overflow-hidden relative">
                             <div className="relative z-10">
                                <motion.p 
                                    key={score}
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    className={cn("text-8xl font-black italic tracking-tighter mb-2", completed ? "text-emerald-500" : "text-white")}
                                >
                                    {score}/3
                                </motion.p>
                                <p className="text-emerald-400 font-black text-xs uppercase tracking-widest mt-4 italic tracking-widest">Mistakes Avoided</p>
                             </div>
                             <div className="absolute top-4 right-4 p-4 opacity-5 group-hover:opacity-100 transition-opacity">
                                <Shield className="w-20 h-20 text-emerald-500" />
                             </div>
                        </div>

                        <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl mb-10 text-left flex items-start space-x-4">
                             <Info className="w-6 h-6 text-emerald-500 mt-1" />
                             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic leading-loose">
                                Rule #1: Always keep a <span className="text-white underline italic underline">PAPER TRAIL</span> or digital history of your request. It's your only weapon in court.
                             </p>
                        </div>

                        <AnimatePresence>
                            {completed && (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="p-10 bg-emerald-600 border border-emerald-500 rounded-[3rem] text-center shadow-2xl relative"
                                >
                                    <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
                                    <p className="text-white font-black text-2xl mb-1 uppercase tracking-tighter italic italic tracking-tighter">Sentinel Rank!</p>
                                    <p className="text-white/80 text-sm font-bold italic mb-8 uppercase tracking-widest">You are legally armored. SEBI & RBI protocols understood. Mastery +1.</p>
                                    <button onClick={onBack} className="w-full py-4 bg-black text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.4em]">Exit Level 8</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl flex items-center space-x-4">
                         <div className="p-3 bg-slate-950 rounded-xl text-emerald-500 shadow-xl border border-slate-800">
                             <Scale className="w-6 h-6" />
                         </div>
                         <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest italic leading-loose">
                            SEBI: Stock Markets | RBI: Banking | IRDAI: Insurance. <span className="text-white">Learn the TRIO to rule them all.</span>
                         </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
