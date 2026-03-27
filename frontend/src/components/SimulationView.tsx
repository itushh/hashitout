import {
    Users,
    Star,
    Gamepad2,
    AlertCircle,
    Dices
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { SIMULATIONS } from '../data/mockData';

interface SimulationViewProps {
    onLaunchSimulation: (id: string | number) => void;
}

export default function SimulationView({ onLaunchSimulation }: SimulationViewProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-12"
        >
            <div className="flex items-center justify-between gap-6 border-b border-slate-800/60 pb-10">
                <div>
                    <h1 className="text-5xl font-black text-white mb-4 tracking-tighter">Simulation Lab</h1>
                    <p className="text-slate-500 text-lg font-medium">Safe playground to test your financial decisions.</p>
                </div>
                <div className="hidden md:flex items-center space-x-6">
                    <div className="text-right">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Sims Run</p>
                        <p className="text-2xl font-black text-white">42</p>
                    </div>
                    <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center">
                        <Gamepad2 className="w-6 h-6 text-indigo-500" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {SIMULATIONS.map(sim => (
                    <motion.div
                        whileHover={{ y: -8 }}
                        key={sim.id}
                        className={cn(
                            "relative flex flex-col p-10 rounded-[3rem] border transition-all duration-300 group overflow-hidden",
                            sim.status === 'available' ? "bg-slate-900/40 border-slate-800 hover:border-indigo-500/30 hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)]" : "bg-slate-900/10 border-slate-900 opacity-40 grayscale"
                        )}
                    >
                        <div className="flex items-start justify-between mb-10 relative z-10">
                            <div className="space-y-2">
                                <div className="inline-flex px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[9px] font-black uppercase tracking-[0.2em]">
                                    {sim.tag}
                                </div>
                                <div className="flex items-center space-x-3 text-slate-500 font-bold text-xs uppercase tracking-widest">
                                    <span>{sim.difficulty}</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                                    <span className="flex items-center"><Users className="w-3 h-3 mr-1.5" /> {sim.users} players</span>
                                </div>
                            </div>
                            {sim.status === 'locked' && <div className="p-3 bg-slate-800 rounded-2xl"><AlertCircle className="w-6 h-6 text-slate-600" /></div>}
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-3xl font-black text-white mb-4 group-hover:text-indigo-400 transition-colors">{sim.title}</h3>
                            <p className="text-slate-500 font-medium mb-12 text-lg leading-relaxed max-w-sm">
                                Practice managing your expenses and income in this high-stakes {sim.tag.toLowerCase()} scenario.
                            </p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                    <span className="font-black text-white text-xl">+{sim.xp} <span className="text-slate-600 font-bold text-sm tracking-normal uppercase">XP</span></span>
                                </div>
                                {sim.status === 'available' ? (
                                    <button
                                        onClick={() => onLaunchSimulation(sim.id)}
                                        className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-xl shadow-indigo-900/30 transition-all active:scale-95 group-hover:scale-105"
                                    >
                                        Launch Scenario
                                    </button>
                                ) : (
                                    <div className="text-xs font-black uppercase tracking-widest text-slate-700 italic">Locked Content</div>
                                )}
                            </div>
                        </div>

                        {/* Background Art */}
                        <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                            <Dices className="w-64 h-64 text-white" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
