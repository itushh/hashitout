import { useState } from 'react';
import {
    ArrowLeft,
    Brain,
    ShieldCheck,
    Users,
    Anchor,
    TrendingDown,
    Zap,
    CheckCircle,
    Compass,
    Waves
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Cell
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface BehaviouralFinanceViewProps {
    onBack: () => void;
}

export default function BehaviouralFinanceView({ onBack }: BehaviouralFinanceViewProps) {
    const [emotionalXp, setEmotionalXp] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [selectedScenario, setSelectedScenario] = useState<number | null>(null);

    const biases = [
        { 
            id: 'loss-aversion', 
            name: "Loss Aversion", 
            icon: <TrendingDown className="w-5 h-5 text-rose-400" />, 
            desc: "The pain of losing is twice as powerful as the joy of gaining.",
            color: "border-rose-500/20 bg-rose-500/5"
        },
        { 
            id: 'herd-mentality', 
            name: "Herd Mentality", 
            icon: <Users className="w-5 h-5 text-indigo-400" />, 
            desc: "Following the crowd without looking at the facts.",
            color: "border-indigo-500/20 bg-indigo-500/5"
        },
        { 
            id: 'anchoring', 
            name: "Anchoring Bias", 
            icon: <Anchor className="w-5 h-5 text-amber-400" />, 
            desc: "Focusing too much on the first piece of information you see.",
            color: "border-amber-500/20 bg-amber-500/5"
        }
    ];

    const lossAversionData = [
        { name: 'Gaining ₹1k', value: 10, fill: '#10b981' },
        { name: 'Losing ₹1k', value: -25, fill: '#ef4444' },
    ];

    const scenarios = [
        {
            question: "A stock you bought for ₹1,000 is now at ₹800. Logic says sell it, but it feels too painful to 'realize' the loss. Which bias is this?",
            options: ["Anchoring", "Loss Aversion", "Herd Mentality"],
            correct: 1
        },
        {
            question: "A generic shirt is priced at ₹2,000 but 'On Sale' for ₹1,000. You buy it thinking it's a steal, even though it's worth only ₹500. This is:",
            options: ["Anchoring", "Loss Aversion", "Fear Of Missing Out"],
            correct: 0
        }
    ];

    const handleScenario = (scenarioIdx: number, optionIdx: number) => {
        if (optionIdx === scenarios[scenarioIdx].correct) {
            setEmotionalXp(prev => Math.min(prev + 50, 100));
            if (emotionalXp >= 50) setCompleted(true);
        }
        setSelectedScenario(optionIdx);
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
                    <ArrowLeft className="w-6 h-6 text-purple-400" />
                </button>
                <div>
                    <p className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em]">Level 1: Psychology of Wealth</p>
                    <h1 className="text-4xl font-black text-white tracking-tighter">Mind Traps: Behavioural Finance</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 space-y-8">
                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl">
                        <h2 className="text-2xl font-black text-white mb-6 flex items-center">
                            <Brain className="w-6 h-6 mr-3 text-purple-400" />
                            The Logic Gap
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8">
                            Finance isn't just about math; it's about humans. Our brains are hardwired for survival in the wild, not for picking stocks or budgeting. 
                            Understanding your "Mind Traps" is the first step to financial freedom.
                        </p>

                        <div className="space-y-6">
                            {biases.map((bias) => (
                                <div key={bias.id} className={cn("flex items-center space-x-6 p-6 rounded-3xl border transition-all hover:scale-[1.01]", bias.color)}>
                                    <div className="w-14 h-14 rounded-2xl bg-black/20 flex items-center justify-center shrink-0 shadow-inner">
                                        {bias.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-white uppercase tracking-widest text-sm mb-1">{bias.name}</h4>
                                        <p className="text-slate-500 text-sm font-medium">{bias.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl">
                        <h2 className="text-2xl font-black text-white mb-8">Bias Detector Challenge</h2>
                        <div className="space-y-8">
                            {scenarios.map((s, sIdx) => (
                                <div key={sIdx} className="p-8 bg-slate-950/50 rounded-3xl border border-slate-800">
                                    <p className="text-lg text-white font-bold mb-6">{s.question}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {s.options.map((opt, oIdx) => (
                                            <button
                                                key={oIdx}
                                                onClick={() => handleScenario(sIdx, oIdx)}
                                                className={cn(
                                                    "py-4 border border-slate-800 rounded-2xl transition-all font-bold text-sm",
                                                    selectedScenario === oIdx && sIdx === 0 // Basic feedback for first one
                                                        ? (oIdx === s.correct ? "bg-emerald-500 border-emerald-400 text-white" : "bg-rose-500 border-rose-400 text-white")
                                                        : "hover:border-purple-500/50 hover:bg-slate-900 text-slate-400 hover:text-white"
                                                )}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-linear-to-br from-[#12121A] to-[#0A0D14] border border-purple-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xl font-black text-white mb-8 flex items-center">
                                <ShieldCheck className="w-5 h-5 mr-3 text-purple-400" />
                                Your Emotional EQ
                            </h3>

                            <div className="mb-10 text-center">
                                <div className="relative w-48 h-48 mx-auto mb-6">
                                    {/* Simple Gauge visualization */}
                                    <svg className="w-full h-full" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="10" />
                                        <motion.circle 
                                            cx="50" cy="50" r="45" fill="none" stroke="#a855f7" strokeWidth="10" 
                                            strokeDasharray="282.7" 
                                            strokeDashoffset={282.7 - (282.7 * emotionalXp / 100)}
                                            strokeLinecap="round"
                                            initial={{ strokeDashoffset: 282.7 }}
                                            animate={{ strokeDashoffset: 282.7 - (282.7 * emotionalXp / 100) }}
                                        />
                                    </svg>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                        <p className="text-3xl font-black text-white">{emotionalXp}%</p>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Logic Power</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-950/50 border border-slate-800 p-8 rounded-[2rem] mb-8">
                                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center">
                                    <Waves className="w-4 h-4 mr-2 text-rose-500" />
                                    The Pain of Loss vs Joy of Gain
                                </h4>
                                <div className="h-48">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={lossAversionData} layout="vertical" margin={{ left: -20 }}>
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 'bold' }} />
                                            <Bar dataKey="value" radius={[0, 10, 10, 0]}>
                                                {lossAversionData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <p className="text-[11px] text-slate-500 font-medium italic text-center mt-4">
                                    *Studies show losing ₹1k feels 2-3x more intense than gaining ₹1k!
                                </p>
                            </div>

                            <AnimatePresence>
                                {completed && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-3xl text-center"
                                    >
                                        <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                                        <p className="text-emerald-400 font-black text-lg mb-1">Mind Mastered!</p>
                                        <p className="text-emerald-500/60 text-sm font-bold">+500 XP & "Stoic" Rank</p>
                                        <button
                                            onClick={onBack}
                                            className="mt-6 w-full py-4 bg-emerald-500 text-white font-black rounded-2xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                                        >
                                            Complete Mission
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {!completed && (
                                <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl flex items-center space-x-4">
                                    <div className="p-3 bg-indigo-500/10 rounded-xl">
                                        <Compass className="w-5 h-5 text-indigo-500 fill-current" />
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-bold leading-relaxed uppercase tracking-tight">
                                        Detect the biases in the <span className="text-white font-black italic">Challenges</span> to reach 100% Emotional EQ.
                                    </p>
                                </div>
                            )}
                        </div>
                        
                        {/* Purple background glow */}
                        <div className="absolute -top-10 -right-10 w-48 h-48 bg-purple-500/5 blur-[80px] pointer-events-none"></div>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="p-2 bg-slate-800 rounded-lg">
                                <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            </div>
                            <span className="text-sm font-black text-white uppercase tracking-widest">Bonus Streak</span>
                        </div>
                        <span className="text-indigo-400 font-black">X2.5</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
