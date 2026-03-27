import {
    TrendingUp,
    Zap,
    PiggyBank,
    Star,
    BrainCircuit,
    Award,
    ChevronRight
} from 'lucide-react';
import {
    AreaChart,
    Area,
    ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { SAVINGS_DATA, MODULES } from '../data/mockData';

interface DashboardViewProps {
    user: {
        id: string;
        name: string;
        xp: number;
        completedModules: string[];
    } | null;
    onStartQuest?: () => void;
}

export default function DashboardView({ user, onStartQuest }: DashboardViewProps) {
    const firstName = user ? user.name.split(' ')[0] : 'Explorer';
    const nextRewardLevel = Math.floor((user?.xp || 0) / 1000) + 15;
    const progressPercent = Math.min(((user?.xp || 0) % 1000) / 10, 100);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
        >
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Welcome Section */}
                <div className="flex-[1.8] relative bg-linear-to-br from-indigo-700 via-indigo-600 to-violet-700 rounded-[3rem] p-12 overflow-hidden shadow-[0_20px_50px_rgba(79,70,229,0.3)] group">
                    <div className="relative z-10 max-w-lg">
                        <div className="inline-flex items-center px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-indigo-100 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-white/10">
                            Personal Goal: New Laptop
                        </div>
                        <h1 className="text-5xl font-black text-white mb-6 leading-[1.15] tracking-tight">
                            Keep it up, {firstName}! <br />
                            <span className="text-white/70">Next reward: Lv. {nextRewardLevel}</span>
                        </h1>
                        <p className="text-indigo-100 text-lg mb-10 leading-relaxed font-medium">
                            You've reached <span className="text-white font-bold">{progressPercent.toFixed(0)}% of your monthly goal</span>.
                            Our AI analysis suggests you can save $40 more if you skip one 'Dining Out' this week.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={onStartQuest}
                                className="bg-white text-indigo-700 font-black px-8 py-4 rounded-2xl hover:scale-105 transition-all shadow-xl shadow-black/20 flex items-center space-x-2"
                            >
                                <Zap className="w-5 h-5 fill-current" />
                                <span>Start Daily Quest</span>
                            </button>
                            <button className="bg-indigo-500/20 backdrop-blur-md border border-white/20 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/10 transition-all">
                                View Goals
                            </button>
                        </div>
                    </div>

                    {/* Animated Orbs */}
                    <div className="absolute top-[-20%] right-[-10%] w-100 h-100 bg-white/10 rounded-full blur-[100px] group-hover:bg-white/15 transition-all duration-1000"></div>
                    <div className="absolute bottom-[-10%] left-[40%] w-60 h-60 bg-indigo-400/20 rounded-full blur-[80px]"></div>

                    <motion.div
                        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-12 right-12 w-48 h-48 opacity-20 pointer-events-none"
                    >
                        <PiggyBank className="w-full h-full text-white" strokeWidth={1} />
                    </motion.div>
                </div>

                {/* Stats Grid */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                    <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] flex flex-col justify-between hover:bg-slate-900/60 transition-colors shadow-lg shadow-black/20 overflow-hidden relative">
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Mock Balance</p>
                                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                    <TrendingUp className="w-4 h-4" />
                                </div>
                            </div>
                            <p className="text-5xl font-black text-white mb-2 leading-none tracking-tighter">$3,420</p>
                        </div>

                        {/* Tiny Chart */}
                        <div className="h-16 w-full -ml-8 -mb-4 opacity-50">
                            <ResponsiveContainer width="120%" height="100%">
                                <AreaChart data={SAVINGS_DATA}>
                                    <defs>
                                        <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorAmt)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="flex items-center text-xs text-emerald-400 font-bold bg-emerald-400/10 w-fit px-3 py-1.5 rounded-lg border border-emerald-400/20 ring-4 ring-emerald-400/5 relative z-10">
                            +12.5% vs last month
                        </div>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] flex flex-col justify-between hover:bg-slate-900/60 transition-colors shadow-lg shadow-black/20">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Learning Streak</p>
                                <div className="w-8 h-8 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                                    <Zap className="w-4 h-4 fill-current" />
                                </div>
                            </div>
                            <p className="text-5xl font-black text-white mb-2 leading-none tracking-tighter">12 <span className="text-2xl text-slate-600 font-bold tracking-normal">days</span></p>
                        </div>
                        <div className="flex items-center text-xs text-orange-400 font-bold px-1">
                            Top 5% of all users this week! 🔥
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                {/* Learning Modules */}
                <div className="xl:col-span-2 space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-black text-white tracking-tight">Financial Mastery</h2>
                            <p className="text-slate-500 font-medium">Progress your skills across 4 key pillars.</p>
                        </div>
                        <button className="group text-indigo-400 font-bold hover:text-indigo-300 transition-colors flex items-center space-x-2 text-sm">
                            <span>View All Paths</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {MODULES.map(module => (
                            <motion.div
                                whileHover={{ y: -5, scale: 1.02 }}
                                key={module.id}
                                className="bg-slate-900/30 border border-slate-800/80 p-8 rounded-3xl hover:border-slate-700/50 hover:bg-slate-900/50 transition-all group cursor-pointer shadow-lg shadow-black/10"
                            >
                                <div className="flex items-start justify-between mb-8">
                                    <div className={cn("p-4 rounded-2xl shadow-lg ring-4 ring-black/20", module.color)}>
                                        <module.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">
                                            {user?.completedModules.includes(String(module.id)) ? '100% Mastered' : `${module.progress}% Mastered`}
                                        </span>
                                    </div>
                                </div>
                                <h3 className="font-extrabold text-xl text-white mb-6 group-hover:text-indigo-400 transition-colors">{module.title}</h3>
                                <div className="w-full bg-slate-800/50 h-3 rounded-full overflow-hidden mb-2 shadow-inner">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: user?.completedModules.includes(String(module.id)) ? '100%' : `${module.progress}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className={cn("h-full relative overflow-hidden", module.color)}
                                    >
                                        <motion.div
                                            animate={{ x: [0, 100], opacity: [0, 0.5, 0] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                            className="absolute inset-y-0 w-8 bg-white/20 skew-x-12"
                                        />
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* AI Sidebar */}
                <div className="space-y-8">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                            <BrainCircuit className="w-6 h-6 text-indigo-400" />
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight">Smart Suggest</h2>
                    </div>

                    <div className="bg-linear-to-b from-[#161B29] to-[#0A0D14] border border-indigo-500/20 rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl">
                        <div className="relative z-10">
                            <div className="inline-flex items-center px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-[9px] font-black uppercase tracking-widest mb-6 border border-indigo-500/20">
                                <Star className="w-3 h-3 mr-2 fill-current" /> Level Up Fast
                            </div>
                            <h3 className="text-2xl font-black text-white mb-4 leading-tight">Income Surge Challenge</h3>
                            <p className="text-slate-400 font-medium mb-8 leading-relaxed">
                                You've mastered budgeting! We recommend the <span className="text-indigo-300 font-bold">'Side Hustle' simulation</span> to practice managing multiple income streams.
                            </p>

                            <div className="space-y-5 mb-10">
                                <div className="flex items-center justify-between text-sm py-1 border-b border-slate-800/50">
                                    <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Rewards</span>
                                    <span className="text-indigo-400 font-black">+1,200 XP</span>
                                </div>
                                <div className="flex items-center justify-between text-sm py-1 border-b border-slate-800/50">
                                    <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Badge</span>
                                    <span className="text-amber-400 font-black flex items-center italic">
                                        <Award className="w-4 h-4 mr-1" /> Hustler Gold
                                    </span>
                                </div>
                            </div>

                            <button className="w-full py-5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black transition-all shadow-xl shadow-indigo-900/30 transform active:scale-[0.98]">
                                Start Simulation
                            </button>
                        </div>

                        {/* Background glow */}
                        <div className="absolute -top-12.5 -right-12.5 w-48 h-48 bg-indigo-500/10 blur-[60px] pointer-events-none"></div>
                        <div className="absolute -bottom-25 -left-5 w-64 h-64 bg-purple-500/5 blur-[80px] pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
