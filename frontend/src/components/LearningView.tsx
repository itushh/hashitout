import {
    ChevronRight,
    CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { CURRICULUM } from '../data/mockData';

interface LearningViewProps {
    user: {
        id: string;
        name: string;
        xp: number;
        completedModules: string[];
    } | null;
    onModuleSelect: (id: string) => void;
}

export default function LearningView({ onModuleSelect, user }: LearningViewProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
        >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800/60 pb-10">
                <div>
                    <h1 className="text-5xl font-black text-white mb-4 tracking-tighter">Your Roadmap</h1>
                    <p className="text-slate-500 text-lg font-medium">Master the financial world through interactive levels.</p>
                </div>
                <div className="flex items-center p-1.5 bg-slate-900/80 rounded-2xl border border-slate-800/80 shadow-inner">
                    <button className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-black text-xs uppercase tracking-widest shadow-xl">Full Access</button>
                    <button className="px-6 py-2.5 rounded-xl text-slate-500 hover:text-slate-300 font-black text-xs uppercase tracking-widest transition-colors">Completed</button>
                </div>
            </div>

            <div className="relative py-10">
                {/* Vertical Path Line */}
                <div className="absolute top-0 left-16 h-full w-2 bg-linear-to-b from-indigo-500 via-indigo-600/20 to-transparent rounded-full shadow-[0_0_15px_rgba(79,70,229,0.2)]"></div>

                <div className="space-y-24">
                    {CURRICULUM.map((levelData) => {
                        const LevelMainIcon = levelData.nodes[0].icon;
                        return (
                            <div key={levelData.level} className="relative flex gap-12 group">
                                {/* Level Node */}
                                <div className={cn(
                                    "relative z-10 w-32 h-32 rounded-[2.5rem] flex items-center justify-center shrink-0 border-4 shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all duration-500 group-hover:rotate-6",
                                    levelData.level === 1 ? "bg-indigo-600 border-indigo-400 text-white ring-8 ring-indigo-500/10" : "bg-slate-900 border-slate-800 text-slate-400"
                                )}>
                                    <LevelMainIcon className={cn("w-14 h-14 drop-shadow-lg", levelData.level === 1 ? "fill-current" : "")} />
                                    <div className={cn(
                                        "absolute -top-5 -right-5 w-12 h-12 rounded-2xl border-2 flex items-center justify-center text-lg font-black italic",
                                        levelData.level === 1 ? "bg-indigo-400 border-indigo-300 text-white" : "bg-slate-800 border-slate-700 text-slate-500"
                                    )}>
                                        L{levelData.level}
                                    </div>
                                </div>

                                {/* Level Details */}
                                <div className="flex-1 pt-4">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <h3 className="text-4xl font-black tracking-tight transition-colors text-white">
                                            {levelData.title}
                                        </h3>
                                        {levelData.level === 1 && (
                                            <div className="inline-flex items-center px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/5">
                                                Active Level
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-slate-500 max-w-2xl text-lg font-medium mb-10 leading-relaxed">
                                        {levelData.description}
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                                        {levelData.nodes.map((sub, i) => {
                                            const SubIcon = sub.icon;
                                            return (
                                                <div
                                                    onClick={() => onModuleSelect(sub.id)}
                                                    key={i}
                                                    className="relative group/card p-6 rounded-4xl border border-slate-800 bg-slate-900/30 transition-all duration-300 cursor-pointer hover:bg-indigo-600/10 hover:border-indigo-500/50 hover:shadow-[0_20px_40px_rgba(79,70,229,0.1)]"
                                                >
                                                    <div className="flex items-center justify-between mb-6">
                                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors bg-indigo-500/20 text-indigo-400">
                                                            <SubIcon className="w-6 h-6" />
                                                        </div>
                                                        {user?.completedModules.includes(sub.id) && (
                                                            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/40">
                                                                <CheckCircle2 className="w-4 h-4 text-white" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <h4 className="text-lg font-black mb-1 transition-colors text-white group-hover/card:text-indigo-400">{sub.name}</h4>
                                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{sub.type} • {sub.duration}</span>

                                                    <div className="absolute bottom-4 right-6 opacity-0 group-hover/card:opacity-100 transition-opacity">
                                                        <ChevronRight className="w-5 h-5 text-indigo-400" />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}
