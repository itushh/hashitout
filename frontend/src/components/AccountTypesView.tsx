import { useState } from 'react';
import {
    ArrowLeft,
    Landmark,
    Zap,
    CheckCircle,
    Star,
    Wallet,
    Briefcase,
    Timer,
    Lock
} from 'lucide-react';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    ResponsiveContainer
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface AccountTypesViewProps {
    onBack: () => void;
}

export default function AccountTypesView({ onBack }: AccountTypesViewProps) {
    const [selectedType, setSelectedType] = useState('savings');
    const [completed, setCompleted] = useState(false);
    const [answers, setAnswers] = useState<Record<string, string>>({});

    const accountTypes = [
        {
            id: 'savings',
            name: 'Savings Account',
            icon: <Wallet className="w-5 h-5 text-indigo-400" />,
            stats: [
                { subject: 'Liquidity', A: 100 },
                { subject: 'Interest', A: 30 },
                { subject: 'Safety', A: 95 },
                { subject: 'Tax Saving', A: 20 },
                { subject: 'Accessibility', A: 90 },
            ],
            color: 'indigo',
            desc: "The 'Safe House' for your daily money. High liquidity but low growth.",
            bestFor: "Emergency funds and monthly expenses."
        },
        {
            id: 'fd',
            name: 'Fixed Deposit (FD)',
            icon: <Lock className="w-5 h-5 text-emerald-400" />,
            stats: [
                { subject: 'Liquidity', A: 20 },
                { subject: 'Interest', A: 75 },
                { subject: 'Safety', A: 100 },
                { subject: 'Tax Saving', A: 50 },
                { subject: 'Accessibility', A: 40 },
            ],
            color: 'emerald',
            desc: "The 'Vault'. Lock your money for a set time (1-5 years) to earn higher interest.",
            bestFor: "Long-term goals with zero risk."
        },
        {
            id: 'current',
            name: 'Current Account',
            icon: <Briefcase className="w-5 h-5 text-amber-400" />,
            stats: [
                { subject: 'Liquidity', A: 100 },
                { subject: 'Interest', A: 0 },
                { subject: 'Safety', A: 90 },
                { subject: 'Tax Saving', A: 10 },
                { subject: 'Accessibility', A: 100 },
            ],
            color: 'amber',
            desc: "The 'Business Engine'. No interest, but unlimited transactions.",
            bestFor: "Business owners and frequent traders."
        }
    ];

    const currentData = accountTypes.find(t => t.id === selectedType);

    const challenges = [
        { id: 'q1', text: "I want to save for my wedding in 3 years with NO risk.", correct: 'fd' },
        { id: 'q2', text: "I need money for my monthly groceries and UPI payments.", correct: 'savings' },
        { id: 'q3', text: "I run a bakery and have 50 transactions daily.", correct: 'current' }
    ];

    const handleAnswer = (qid: string, aid: string) => {
        const newAnswers = { ...answers, [qid]: aid };
        setAnswers(newAnswers);
        if (challenges.every(c => newAnswers[c.id] === c.correct)) {
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
                    <ArrowLeft className="w-6 h-6 text-emerald-400" />
                </button>
                <div>
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Level 2: The Banking System</p>
                    <h1 className="text-4xl font-black text-white tracking-tighter">Vault Types: Accounts</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 space-y-8">
                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl">
                        <h2 className="text-2xl font-black text-white mb-8 flex items-center">
                            <Landmark className="w-6 h-6 mr-3 text-emerald-400" />
                            Choose Your Weapon
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            {accountTypes.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setSelectedType(type.id)}
                                    className={cn(
                                        "p-6 rounded-3xl border transition-all text-left group",
                                        selectedType === type.id 
                                            ? `bg-${type.color}-500/10 border-${type.color}-500/50 shadow-lg shadow-${type.color}-500/5`
                                            : "bg-slate-950/50 border-slate-800 hover:border-slate-700"
                                    )}
                                >
                                    <div className={cn("w-12 h-12 rounded-xl mb-4 flex items-center justify-center transition-colors", 
                                        selectedType === type.id ? `bg-${type.color}-500 text-white` : "bg-slate-900 text-slate-500"
                                    )}>
                                        {type.icon}
                                    </div>
                                    <h4 className={cn("font-black text-sm uppercase tracking-widest mb-1", selectedType === type.id ? "text-white" : "text-slate-500")}>
                                        {type.name}
                                    </h4>
                                    <p className="text-[11px] text-slate-600 font-bold leading-tight line-clamp-2">{type.desc}</p>
                                </button>
                            ))}
                        </div>

                        <div className="bg-slate-950/50 border border-slate-800 p-10 rounded-[2.5rem] relative overflow-hidden">
                            <div className="flex flex-col md:flex-row items-center gap-10">
                                <div className="w-full md:w-1/2 h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={currentData?.stats}>
                                            <PolarGrid stroke="#1e293b" />
                                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
                                            <Radar
                                                name="Profile"
                                                dataKey="A"
                                                stroke={selectedType === 'savings' ? '#6366f1' : selectedType === 'fd' ? '#10b981' : '#f59e0b'}
                                                fill={selectedType === 'savings' ? '#6366f1' : selectedType === 'fd' ? '#10b981' : '#f59e0b'}
                                                fillOpacity={0.6}
                                            />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="w-full md:w-1/2">
                                    <h3 className="text-xl font-black text-white mb-4">Why use this?</h3>
                                    <p className="text-slate-400 font-medium mb-6">{currentData?.desc}</p>
                                    <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
                                        <div className="flex items-center text-xs font-black text-emerald-400 uppercase tracking-widest mb-2">
                                            <Zap className="w-3 h-3 mr-2" />
                                            Ideal Scenario
                                        </div>
                                        <p className="text-white text-sm font-bold">{currentData?.bestFor}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl">
                        <h2 className="text-2xl font-black text-white mb-8">Roleplay: Be the Consultant</h2>
                        <div className="space-y-6">
                            {challenges.map((c, idx) => (
                                <div key={c.id} className="p-8 bg-slate-950/50 rounded-3xl border border-slate-800">
                                    <div className="flex items-center space-x-4 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-lg font-black italic">
                                            {idx + 1}
                                        </div>
                                        <p className="text-lg text-white font-bold">{c.text}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        {['savings', 'fd', 'current'].map((optId) => {
                                            const opt = accountTypes.find(t => t.id === optId);
                                            const isSelected = answers[c.id] === optId;
                                            const isCorrect = isSelected && optId === c.correct;

                                            return (
                                                <button
                                                    key={optId}
                                                    onClick={() => handleAnswer(c.id, optId)}
                                                    className={cn(
                                                        "px-6 py-3 border rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest",
                                                        isSelected 
                                                            ? (isCorrect ? "bg-emerald-500 border-emerald-400 text-white" : "bg-rose-500 border-rose-400 text-white")
                                                            : "bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-600 hover:text-white"
                                                    )}
                                                >
                                                    {opt?.name}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-linear-to-br from-[#0D1F17] to-[#0A0D14] border border-emerald-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xl font-black text-white mb-8 flex items-center">
                                <Star className="w-5 h-5 mr-3 text-emerald-400" />
                                Level Progress
                            </h3>

                            <div className="space-y-8">
                                <div className="p-8 bg-slate-950/50 rounded-3xl border border-slate-800 text-center">
                                    <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                                        <CheckCircle className={cn("w-8 h-8 transition-colors", completed ? "text-emerald-500" : "text-slate-700")} />
                                    </div>
                                    <p className="text-slate-500 font-black text-xs uppercase tracking-[0.2em] mb-1">Module Status</p>
                                    <p className="text-white font-black text-xl">{completed ? "MASTERED" : "LEARNING"}</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-slate-500">
                                        <span>Accuracy</span>
                                        <span>{Math.round((Object.keys(answers).filter(k => answers[k] === challenges.find(c => c.id === k)?.correct).length / 3) * 100)}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(Object.keys(answers).filter(k => answers[k] === challenges.find(c => c.id === k)?.correct).length / 3) * 100}%` }}
                                            className="h-full bg-emerald-500"
                                        />
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {completed && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="p-8 bg-emerald-500/10 border border-emerald-500/30 rounded-[2rem] text-center"
                                        >
                                            <div className="relative inline-block mb-4">
                                                <Star className="w-12 h-12 text-yellow-400 fill-yellow-400" />
                                                <div className="absolute inset-0 animate-ping opacity-30">
                                                    <Star className="w-12 h-12 text-yellow-400 fill-yellow-400" />
                                                </div>
                                            </div>
                                            <p className="text-emerald-400 font-black text-lg mb-1">Consultant Grade A!</p>
                                            <p className="text-emerald-500/60 text-sm font-bold">+400 XP Awarded</p>
                                            <button
                                                onClick={onBack}
                                                className="mt-6 w-full py-4 bg-emerald-500 text-white font-black rounded-2xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                                            >
                                                Next: How Banks Profit
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <Timer className="w-4 h-4 text-emerald-400" />
                                <span className="text-xs font-black text-white uppercase tracking-widest">Time Bonus</span>
                            </div>
                            <span className="text-xs font-black text-slate-500">02:45</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <Zap className="w-4 h-4 text-emerald-400" />
                                <span className="text-xs font-black text-white uppercase tracking-widest">Efficiency</span>
                            </div>
                            <span className="text-xs font-black text-emerald-400">98%</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
