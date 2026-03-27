import { useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import {
    ArrowLeft,
    Sparkles,
    Target,
    Gamepad2,
    TrendingUp,
    PieChart as PieChartIcon,
    CheckCircle,
    Star
} from 'lucide-react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip as RechartsTooltip,
    ResponsiveContainer
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface Budgeting503020ViewProps {
    onBack: () => void;
}

export default function Budgeting503020View({ onBack }: Budgeting503020ViewProps) {
    const [income, setIncome] = useState(3000);
    const [completed, setCompleted] = useState(false);

    const budget = useMemo(() => ({
        needs: income * 0.5,
        wants: income * 0.3,
        savings: income * 0.2,
    }), [income]);

    const pieData = [
        { name: 'Needs', value: 50, color: '#6366f1' },
        { name: 'Wants', value: 30, color: '#a855f7' },
        { name: 'Savings', value: 20, color: '#10b981' },
    ];

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
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Level 1: The Foundation</p>
                    <h1 className="text-4xl font-black text-white tracking-tighter">Budgeting 50/30/20</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 space-y-8">
                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl">
                        <h2 className="text-2xl font-black text-white mb-6 flex items-center">
                            <Sparkles className="w-6 h-6 mr-3 text-indigo-400" />
                            The Magic Ratio
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8">
                            The 50/30/20 rule is a simple yet powerful blueprint for your money.
                            By splitting your after-tax income into three buckets, you ensure your bills are paid, you have fun, and your future is secure.
                        </p>

                        <div className="space-y-6">
                            <BudgetCard
                                title="50% Needs"
                                desc="Rent, groceries, utilities, and insurance."
                                amount={budget.needs}
                                color="border-indigo-500/30 bg-indigo-500/5"
                                icon={<Target className="w-5 h-5 text-indigo-400" />}
                            />
                            <BudgetCard
                                title="30% Wants"
                                desc="Dining out, subscriptions, shopping, and hobbies."
                                amount={budget.wants}
                                color="border-purple-500/30 bg-purple-500/5"
                                icon={<Gamepad2 className="w-5 h-5 text-purple-400" />}
                            />
                            <BudgetCard
                                title="20% Savings"
                                desc="Debt repayment, emergency fund, and investing."
                                amount={budget.savings}
                                color="border-emerald-500/30 bg-emerald-500/5"
                                icon={<TrendingUp className="w-5 h-5 text-emerald-400" />}
                            />
                        </div>
                    </section>

                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl">
                        <h2 className="text-2xl font-black text-white mb-8">Quick Quiz: Test Your IQ</h2>
                        <div className="p-8 bg-slate-950/50 rounded-3xl border border-slate-800">
                            <p className="text-lg text-white font-bold mb-6">If you win ₹1,000 in a contest, how much should go to your Savings bucket according to this rule?</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {['₹500', '₹300', '₹200'].map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => opt === '₹200' && setCompleted(true)}
                                        className={cn(
                                            "py-4 border border-slate-800 rounded-2xl transition-all font-bold",
                                            completed && opt === '₹200' ? "bg-emerald-500 border-emerald-400 text-white" : "hover:border-indigo-500/50 hover:bg-slate-900 text-slate-400 hover:text-white"
                                        )}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-linear-to-br from-[#161B29] to-[#0A0D14] border border-indigo-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden top-32">
                        <div className="relative z-10">
                            <h3 className="text-xl font-black text-white mb-8 flex items-center">
                                <PieChartIcon className="w-5 h-5 mr-3 text-indigo-400" />
                                Live Budget Preview
                            </h3>

                            <div className="flex justify-center mb-10 h-64 scale-110">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={10}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip
                                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center mt-3">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total</p>
                                    <p className="text-2xl font-black text-white">₹{income}</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between mb-3">
                                        <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Your Monthly Income</label>
                                        <span className="text-white font-black">₹{income}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="500"
                                        max="10000"
                                        step="100"
                                        value={income}
                                        onChange={(e) => setIncome(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
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
                                            <p className="text-emerald-400 font-black text-lg mb-1">Challenge Complete!</p>
                                            <p className="text-emerald-500/60 text-sm font-bold">+250 XP Awarded</p>
                                            <button
                                                onClick={onBack}
                                                className="mt-6 w-full py-4 bg-emerald-500 text-white font-black rounded-2xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                                            >
                                                Continue Journey
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {!completed && (
                                    <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl flex items-center space-x-4">
                                        <div className="p-3 bg-amber-500/10 rounded-xl">
                                            <Star className="w-5 h-5 text-amber-500 fill-current" />
                                        </div>
                                        <p className="text-xs text-slate-400 font-bold leading-relaxed">
                                            Adjust the slider and answer the quiz to earn your <span className="text-white font-black italic">Foundation Badge</span>.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Background glow */}
                        <div className="absolute -top-25 -left-25 w-64 h-64 bg-indigo-500/5 blur-[100px] pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

interface BudgetCardProps {
    title: string;
    desc: string;
    amount: number;
    color: string;
    icon: ReactNode;
}

function BudgetCard({ title, desc, amount, color, icon }: BudgetCardProps) {
    return (
        <div className={cn("flex items-center justify-between p-6 rounded-4xl border transition-all hover:scale-[1.01]", color)}>
            <div className="flex items-center space-x-5">
                <div className="w-12 h-12 rounded-2xl bg-black/20 flex items-center justify-center shadow-inner">
                    {icon}
                </div>
                <div>
                    <h4 className="font-black text-white uppercase tracking-widest text-xs mb-1">{title}</h4>
                    <p className="text-slate-500 text-sm font-medium">{desc}</p>
                </div>
            </div>
            <div className="text-right pl-4">
                <p className="text-2xl font-black text-white leading-none">₹{amount.toLocaleString()}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter mt-1">Allocation</p>
            </div>
        </div>
    );
}
