import { useState } from 'react';
import {
    ArrowLeft,
    Trophy,
    LineChart,
    Activity,
    MousePointer2,
    CheckCircle2,
    TrendingUp,
    AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StockMarketEssentialsViewProps {
    onBack: () => void;
}

export default function StockMarketEssentialsView({ onBack }: StockMarketEssentialsViewProps) {
    const [score, setScore] = useState(0);
    const [selections, setSelections] = useState<string[]>([]);
    const [completed, setCompleted] = useState(false);

    const questions = [
        { 
            id: '1', 
            title: 'Market Indices', 
            scenario: 'The NIFTY 50 and SENSEX are indices. What do they represent?', 
            options: [
                { id: '1a', text: 'Top 50 and 30 companies based on market cap.', correct: true, note: 'Correct! They track the biggest blue-chip companies.' },
                { id: '1b', text: 'All companies listed on the NSE and BSE.', correct: false, note: 'Incorrect. There are thousands of companies; indices only track a select top group.' }
            ]
        },
        { 
            id: '2', 
            title: 'Analysis Types', 
            scenario: 'You want to buy a company to hold for 10 years. Which analysis is better?', 
            options: [
                { id: '2a', text: 'Technical (Price patterns and candles).', correct: false, note: 'Incorrect. Technicals are better for short-term timing.' },
                { id: '2b', text: 'Fundamental (Profits, Debt, Management).', correct: true, note: 'Correct! Fundamentals determine long-term value.' }
            ]
        },
        { 
            id: '3', 
            title: 'Exchanges', 
            scenario: 'NSE and BSE are where you buy stocks. Who regulates them?', 
            options: [
                { id: '3a', text: 'The Reserve Bank of India (RBI).', correct: false, note: 'Incorrect. RBI regulates banks and debt.' },
                { id: '3b', text: 'Securities and Exchange Board of India (SEBI).', correct: true, note: 'Correct! SEBI is the 시장 watchman.' }
            ]
        }
    ];

    const currentQuestion = questions.find(q => !selections.includes(q.id));

    const handleChoice = (isCorrect: boolean) => {
        if (isCorrect) setScore(prev => prev + 1);
        if (currentQuestion) setSelections([...selections, currentQuestion.id]);
        if (selections.length === questions.length - 1) setCompleted(true);
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
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic tracking-widest tracking-tighter">The Trade Floor</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 space-y-8">
                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-black text-white mb-6 flex items-center italic">
                                <LineChart className="w-6 h-6 mr-3 text-emerald-400" />
                                Stock Market Essentials
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium italic italic">
                                The Stock Market is where <span className="text-white font-black italic underline italic underline">Lenders (Investors)</span> meet <span className="text-white font-black italic underline italic underline">Spendors (Companies)</span>. 
                                Master the rules of the floor to avoid getting trampled.
                            </p>

                            <AnimatePresence mode="wait">
                                {currentQuestion ? (
                                    <motion.div
                                        key={currentQuestion.id}
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -20, opacity: 0 }}
                                        className="p-10 bg-slate-950/50 border border-slate-800 rounded-[3rem] relative"
                                    >
                                        <div className="flex items-center space-x-4 mb-6">
                                            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-black">
                                                {selections.length + 1}
                                            </div>
                                            <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">{currentQuestion.title}</h3>
                                        </div>
                                        <p className="text-slate-200 text-lg font-bold leading-relaxed mb-10 p-10 bg-slate-900 rounded-[2.5rem] border border-slate-800">
                                            "{currentQuestion.scenario}"
                                        </p>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {currentQuestion.options.map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => handleChoice(opt.correct)}
                                                    className="p-8 rounded-[2rem] border border-slate-800 bg-slate-950/50 hover:border-emerald-500/50 hover:bg-slate-900 transition-all text-left shadow-xl group"
                                                >
                                                    <p className="text-white font-black text-xs uppercase tracking-widest italic italic tracking-tighter">{opt.text}</p>
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
                                        <p className="text-slate-500 font-bold uppercase tracking-widest">Floor Clearance Complete</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-linear-to-br from-[#101A12] to-[#0A0D14] border border-emerald-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden text-center min-h-[400px]">
                        <h3 className="text-lg font-black text-slate-500 mb-8 uppercase tracking-widest italic tracking-[0.2em] italic tracking-tighter">Market Mastery</h3>
                        
                        <div className="p-10 bg-slate-900 border border-slate-800 rounded-[3rem] text-center mb-10 overflow-hidden relative">
                             <div className="relative z-10 flex flex-col items-center">
                                <Activity className="w-16 h-16 text-emerald-500 mb-4 animate-pulse" />
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic tracking-widest">Score</p>
                                <motion.p 
                                    key={score}
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    className="text-8xl font-black text-white italic tracking-tighter"
                                >
                                    {score}/3
                                </motion.p>
                             </div>
                             <div className="absolute top-4 right-4 p-4 opacity-5 group-hover:opacity-100 transition-opacity">
                                <TrendingUp className="w-20 h-20 text-emerald-500" />
                             </div>
                        </div>

                        <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl mb-10 text-left space-y-4 shadow-xl">
                             <div className="flex items-center space-x-3 text-emerald-400">
                                 <AlertCircle className="w-4 h-4 shadow-xl shadow-emerald-500/20" />
                                 <h5 className="text-[10px] font-black uppercase tracking-widest italic tracking-tighter">Wisdom of the Floor:</h5>
                             </div>
                             <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-loose italic">
                                "The stock market is a device for transferring money from the <span className="text-rose-400 underline italic underline">IMPATIENT</span> to the <span className="text-emerald-400 underline italic underline italic">PATIENT</span>."
                             </p>
                        </div>

                        <AnimatePresence>
                            {completed && (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="p-10 bg-emerald-600 border border-emerald-500 rounded-[3rem] text-center shadow-2xl relative"
                                >
                                    <Trophy className="w-16 h-16 text-white mx-auto mb-4 italic shadow-2xl" />
                                    <p className="text-white font-black text-2xl mb-1 uppercase tracking-tighter italic italic tracking-tighter italic">Curriculum Master!</p>
                                    <p className="text-white/80 text-sm font-bold italic mb-8 uppercase tracking-widest">You have completed all levels of the FinQuest journey. You are ready for the Real World.</p>
                                    <button onClick={onBack} className="w-full py-4 bg-black text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.4em]">Final Exit</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-2xl flex items-center space-x-4">
                         <div className="p-3 bg-slate-950 rounded-xl text-emerald-500 shadow-xl">
                             <TrendingUp className="w-6 h-6 shadow-xl shadow-emerald-500/10" />
                         </div>
                         <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest italic leading-loose">
                            Price is what you pay. <span className="text-white underline italic underline">Value</span> is what you get. <span className="text-white">Learn to spot the difference.</span>
                         </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
