import { useState, useMemo } from 'react';
import {
    ArrowLeft,
    Car,
    ShieldCheck,
    TrendingUp,
    CheckCircle,
    Star,
    Zap,
    Briefcase,
    Building2,
    Search,
    AlertCircle,
    ArrowUpRight,
    ArrowDownRight,
    Trophy,
    Gamepad2,
    Layout,
    Clock,
    UserCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface VehicleProtectionViewProps {
    onBack: () => void;
}

export default function VehicleProtectionView({ onBack }: VehicleProtectionViewProps) {
    const [age, setAge] = useState(1);
    const [ncbYears, setNcbYears] = useState(0);
    const [zeroDep, setZeroDep] = useState(true);
    const [completed, setCompleted] = useState(false);

    const carValue = 1000000; // 10 Lakhs original

    const policyStats = useMemo(() => {
        const idv = carValue * (1 - (age * 0.1));
        const basePremium = (idv * 0.02);
        const ncbDiscount = [0, 0.2, 0.25, 0.35, 0.45, 0.5][ncbYears] || 0.5;
        const netPremium = (basePremium * (1 - ncbDiscount)) + (zeroDep ? 5000 : 0);
        
        return {
            idv: Math.round(idv),
            premium: Math.round(netPremium),
            ncb: Math.round(ncbDiscount * 100)
        };
    }, [age, ncbYears, zeroDep]);

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
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Level 5: Insurance & Protection</p>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">Vehicle Sentinel</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 space-y-8">
                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                        <h2 className="text-2xl font-black text-white mb-6 flex items-center italic">
                            <Car className="w-6 h-6 mr-3 text-emerald-400" />
                            Insuring your Ride
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium italic">
                            Don't look for the <span className="text-white font-black italic underline tracking-tight">cheapest</span> quote. Look for the <span className="text-white font-black italic underline tracking-tight">right</span> IDV and 100% Zero-Dep cover. 
                            The value of your car drops every year—don't let your coverage drop with it!
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 text-center">
                            {[
                                { title: 'IDV', name: 'Insured Value', icon: <Building2 className="w-4 h-4" /> },
                                { title: 'NCB', name: 'No Claim Bonus', icon: <Star className="w-4 h-4" /> },
                                { title: 'Zero-Dep', name: 'Bumper cover', icon: <Zap className="w-4 h-4" /> },
                                { title: 'TP', name: 'Third Party', icon: <Layout className="w-4 h-4" /> }
                            ].map((item) => (
                                <div key={item.title} className="p-6 bg-slate-950/50 rounded-2xl border border-slate-800 group hover:border-slate-700 transition-colors">
                                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center mx-auto mb-4 border border-slate-800 group-hover:border-emerald-500/20 transition-all font-black text-white text-xs">{item.title}</div>
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{item.name}</p>
                                </div>
                            ))}
                        </div>

                        <div className="p-10 bg-slate-950/50 border border-slate-800 rounded-[2.5rem]">
                            <h3 className="text-xl font-black text-white mb-8">Sentinel Dashboard</h3>
                            <div className="space-y-10">
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest italic tracking-tighter">Car Age (Years)</label>
                                        <span className="text-white font-black">{age} YRS OLD</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        value={age}
                                        onChange={(e) => setAge(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest italic tracking-tighter">Clean Driving Years (NCB)</label>
                                        <span className="text-white font-black">{ncbYears} YEARS</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="5"
                                        value={ncbYears}
                                        onChange={(e) => setNcbYears(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                    />
                                </div>

                                <div className="flex items-center justify-between p-8 bg-slate-900 border border-slate-800 rounded-3xl">
                                    <div>
                                        <p className="text-xs font-black text-white uppercase tracking-widest mb-1 italic">Zero Depreciation Add-on</p>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase italic tracking-tight opacity-60">Highly recommended for cars under 5 years.</p>
                                    </div>
                                    <button
                                        onClick={() => setZeroDep(!zeroDep)}
                                        className={cn("px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", 
                                            zeroDep ? "bg-emerald-500 text-white" : "bg-slate-800 text-slate-500"
                                        )}
                                    >
                                        {zeroDep ? 'ACTIVE' : 'DEACTIVE'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-linear-to-br from-[#101A12] to-[#0A0D14] border border-emerald-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden text-center">
                        <h3 className="text-lg font-black text-slate-500 mb-8 uppercase tracking-widest italic tracking-[0.2em]">Policy Summary</h3>
                        
                        <div className="p-10 bg-slate-900 border border-slate-800 rounded-[3rem] mb-10 space-y-8">
                            <div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 italic">Insured Value (IDV)</p>
                                <motion.div 
                                    key={policyStats.idv}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="text-4xl font-black text-white tracking-tighter tabular-nums"
                                >
                                    ₹{policyStats.idv.toLocaleString()}
                                </motion.div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pb-8 border-b border-slate-800">
                                <div>
                                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Loyalty Discount</p>
                                    <p className="text-lg font-black text-emerald-500 italic tabular-nums">{policyStats.ncb}% OFF</p>
                                </div>
                                <div>
                                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Zero-Dep Risk</p>
                                    <p className={cn("text-lg font-black italic", zeroDep ? "text-emerald-500" : "text-rose-500")}>{zeroDep ? 'REDUCED' : 'HIGH'}</p>
                                </div>
                            </div>
                            <div className="pt-4">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 italic">Net Premium</p>
                                <motion.div 
                                    key={policyStats.premium}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-5xl font-black text-emerald-500 tracking-tighter tabular-nums"
                                >
                                    ₹{policyStats.premium.toLocaleString()}
                                </motion.div>
                            </div>
                        </div>

                        <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl mb-8 flex items-center space-x-4">
                            <Gamepad2 className="w-5 h-5 text-emerald-400" />
                            <p className="text-[10px] text-left text-slate-500 font-bold uppercase tracking-widest italic leading-loose">
                                Reach <span className="text-white">5 years NCB</span> and <span className="text-white">Zero-Dep ACTIVE</span> to master the road!
                            </p>
                        </div>

                        <button
                            onClick={() => ncbYears === 5 && zeroDep && setCompleted(true)}
                            className={cn("w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all", 
                                (ncbYears === 5 && zeroDep) ? "bg-emerald-500 text-white shadow-xl shadow-emerald-500/20 active:scale-95" : "bg-slate-950 text-slate-700 italic border border-slate-800 cursor-not-allowed"
                            )}
                        >
                            Confirm Sentinel Path
                        </button>

                        <AnimatePresence>
                            {completed && (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="mt-10 p-10 bg-emerald-600 border border-emerald-500 rounded-[3rem] text-center shadow-2xl relative"
                                >
                                    <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
                                    <p className="text-white font-black text-2xl mb-1 uppercase tracking-tighter italic italic tracking-tighter">Pro Driver Unlocked!</p>
                                    <p className="text-white/80 text-sm font-bold italic mb-8 uppercase tracking-widest">You maximize protection while minimizing premium. Sentinel Badge Earned.</p>
                                    <button onClick={onBack} className="w-full py-4 bg-black text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.3em]">Next: Agent Scams</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
