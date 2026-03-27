import { useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import {
    ArrowLeft,
    Sparkles,
    Ghost,
    AlertTriangle,
    TrendingUp,
    LineChart as LineChartIcon,
    CheckCircle,
    Star,
    History,
    Activity,
    DollarSign
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface InflationViewProps {
    onBack: () => void;
    onComplete: (xp: number, id: string) => void;
}

export default function InflationView({ onBack, onComplete }: InflationViewProps) {
    const [inflationRate, setInflationRate] = useState(6);
    const [years, setYears] = useState(10);
    const [completed, setCompleted] = useState(false);

    const initialValue = 100000;

    const calculation = useMemo(() => {
        const futureValue = initialValue / Math.pow(1 + (inflationRate / 100), years);
        return {
            futureValue: Math.round(futureValue),
            loss: initialValue - Math.round(futureValue)
        };
    }, [inflationRate, years]);

    const chartData = useMemo(() => {
        const data = [];
        for (let i = 0; i <= 30; i++) {
            const val = initialValue / Math.pow(1 + (inflationRate / 100), i);
            data.push({
                year: `Year ${i}`,
                value: Math.round(val),
                original: initialValue
            });
        }
        return data;
    }, [inflationRate]);

    const historicData = [
        { item: 'Milk (1L)', past: 35, current: 66, icon: '🥛' },
        { item: 'Petrol (1L)', past: 71, current: 104, icon: '⛽' },
        { item: 'Movie Ticket', past: 150, current: 350, icon: '🎬' },
    ];

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleQuiz = (opt: any, index: number) => {
        setSelectedIndex(index);
        if (opt.correct && !completed) {
            setCompleted(true);
            onComplete(350, 'inflation');
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
                    <ArrowLeft className="w-6 h-6 text-orange-400" />
                </button>
                <div>
                    <p className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em]">Level 1: The Invisible Force</p>
                    <h1 className="text-4xl font-black text-white tracking-tighter">The Silent Thief: Inflation</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 space-y-8">
                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-black text-white mb-6 flex items-center">
                                <Ghost className="w-6 h-6 mr-3 text-orange-400" />
                                The Ghost in Your Wallet
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                Inflation is the rate at which the general level of prices for goods and services is rising.
                                It's a "Silent Thief" because it doesn't take your money away—it just makes it worth less over time.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {historicData.map((data, idx) => (
                                    <div key={idx} className="bg-slate-950/50 border border-slate-800 p-6 rounded-3xl hover:border-orange-500/30 transition-all group">
                                        <div className="text-3xl mb-4">{data.icon}</div>
                                        <h4 className="text-white font-black mb-2">{data.item}</h4>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-slate-500 uppercase font-bold">2014: ₹{data.past}</span>
                                            <TrendingUp className="w-3 h-3 text-rose-500" />
                                            <span className="text-orange-400 font-bold">2024: ₹{data.current}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-orange-500/5 blur-[100px] pointer-events-none"></div>
                    </section>

                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-white flex items-center">
                                <Activity className="w-6 h-6 mr-3 text-orange-400" />
                                Why Does It Happen?
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-8 bg-slate-950/50 rounded-3xl border border-slate-800 hover:border-indigo-500/30 transition-all">
                                <h4 className="text-indigo-400 font-black uppercase text-xs tracking-widest mb-3 italic">Demand-Pull</h4>
                                <p className="text-slate-300 text-sm leading-relaxed">Too much money chasing too few goods. Everyone wants that new iPhone, but there aren't enough!</p>
                            </div>
                            <div className="p-8 bg-slate-950/50 rounded-3xl border border-slate-800 hover:border-purple-500/30 transition-all">
                                <h4 className="text-purple-400 font-black uppercase text-xs tracking-widest mb-3 italic">Cost-Push</h4>
                                <p className="text-slate-300 text-sm leading-relaxed">Production costs rise (like oil prices), so companies pass the bill to YOU.</p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl">
                        <h2 className="text-2xl font-black text-white mb-8">Survival Quiz</h2>
                        <div className="p-8 bg-slate-950/50 rounded-3xl border border-slate-800">
                            <p className="text-lg text-white font-bold mb-6">If the inflation rate is 7% and your bank gives 3% interest on savings, what is happening to your wealth?</p>
                            <div className="space-y-4">
                                {[
                                    { text: 'It is growing by 4%', correct: false },
                                    { text: 'It is shrinking by 4% in value', correct: true },
                                    { text: 'It stays exactly the same', correct: false }
                                ].map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleQuiz(opt, i)}
                                        className={cn(
                                            "w-full text-left p-5 border border-slate-800 rounded-2xl transition-all font-bold flex items-center justify-between group",
                                            selectedIndex === i
                                                ? (opt.correct ? "bg-emerald-500 border-emerald-400 text-white" : "bg-rose-500 border-rose-400 text-white")
                                                : "hover:border-orange-500/50 hover:bg-slate-900 text-slate-400 hover:text-white",
                                            completed && opt.correct && "bg-emerald-500 border-emerald-400 text-white"
                                        )}
                                    >
                                        {opt.text}
                                        {completed && opt.correct && <CheckCircle className="w-5 h-5 text-white" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-linear-to-br from-[#1A1612] to-[#0A0D14] border border-orange-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xl font-black text-white mb-8 flex items-center">
                                <History className="w-5 h-5 mr-3 text-orange-400" />
                                Time Traveler Calculator
                            </h3>

                            <div className="mb-10 text-center">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Purchasing Power of ₹1 Lakh</p>
                                <motion.div
                                    key={calculation.futureValue}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-5xl font-black text-white tabular-nums tracking-tighter"
                                >
                                    ₹{calculation.futureValue.toLocaleString()}
                                </motion.div>
                                <p className="text-rose-500 font-bold text-sm mt-2">
                                    Lost to Thief: -₹{calculation.loss.toLocaleString()}
                                </p>
                            </div>

                            <div className="h-48 mb-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Area
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#f97316"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorValue)"
                                        />
                                        <RechartsTooltip
                                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', color: '#fff' }}
                                            itemStyle={{ color: '#f97316', fontWeight: 'bold' }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <div className="flex justify-between mb-3">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Inflation Rate (%)</label>
                                        <span className="text-orange-400 font-black">{inflationRate}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="15"
                                        step="0.5"
                                        value={inflationRate}
                                        onChange={(e) => setInflationRate(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between mb-3">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Time (Years)</label>
                                        <span className="text-orange-400 font-black">{years} Yrs</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="30"
                                        value={years}
                                        onChange={(e) => setYears(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                                    />
                                </div>

                                <AnimatePresence>
                                    {completed && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-3xl text-center"
                                        >
                                            <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                                            <p className="text-emerald-400 font-black text-lg mb-1">Thief Caught!</p>
                                            <p className="text-emerald-500/60 text-sm font-bold">+350 XP & "Vigilant" Badge</p>
                                            <button
                                                onClick={onBack}
                                                className="mt-6 w-full py-4 bg-emerald-500 text-white font-black rounded-2xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                                            >
                                                Back to Map
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {!completed && (
                                    <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl flex items-center space-x-4">
                                        <div className="p-3 bg-amber-500/10 rounded-xl">
                                            <Star className="w-5 h-5 text-amber-500 fill-current" />
                                        </div>
                                        <p className="text-[10px] text-slate-400 font-bold leading-relaxed uppercase tracking-tight">
                                            Calculate the impact of a <span className="text-white font-black italic">10% inflation rate</span> over 10 years and solve the quiz.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
