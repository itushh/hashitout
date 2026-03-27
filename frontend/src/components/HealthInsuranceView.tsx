import { useState, useMemo } from 'react';
import {
    ArrowLeft,
    HeartPulse,
    ShieldCheck,
    Zap,
    CheckCircle,
    Star,
    Stethoscope,
    AlertCircle,
    ArrowUpRight,
    ArrowDownRight,
    Info,
    Layout,
    Clock,
    UserCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface HealthInsuranceViewProps {
    onBack: () => void;
}

export default function HealthInsuranceView({ onBack }: HealthInsuranceViewProps) {
    const [copay, setCopay] = useState(0);
    const [roomRentCap, setRoomRentCap] = useState(true);
    const [completed, setCompleted] = useState(false);

    const bill = 500000;
    const roomRent = 40000; // Extra room rent due to cap

    const calculations = useMemo(() => {
        const copayAmt = bill * (copay / 100);
        const cappingAmt = roomRentCap ? 50000 : 0;
        const netPaidByInsurer = bill - copayAmt - cappingAmt;
        const netPaidByUser = copayAmt + cappingAmt;
        
        return {
            insurer: Math.round(netPaidByInsurer),
            user: Math.round(netPaidByUser),
            percentCovered: Math.round((netPaidByInsurer / bill) * 100)
        };
    }, [copay, roomRentCap]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-10 pb-20"
        >
            <div className="flex items-center space-x-4">
                <button onClick={onBack} className="p-3 bg-slate-900 hover:bg-slate-800 rounded-2xl border border-slate-800 transition-colors">
                    <ArrowLeft className="w-6 h-6 text-rose-400" />
                </button>
                <div>
                    <p className="text-[10px] font-black text-rose-400 uppercase tracking-[0.2em]">Level 5: Insurance & Protection</p>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">The Medical Shield</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 space-y-8">
                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                        <h2 className="text-2xl font-black text-white mb-6 flex items-center italic">
                            <HeartPulse className="w-6 h-6 mr-3 text-rose-400" />
                            Health Insurance 101
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium italic">
                            Don't let a medical emergency wipe out your life savings. Health insurance provides a <span className="text-white font-black italic">Cashless Shield</span> against hospital bills.
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                            {[
                                { title: 'No Copay', desc: 'No sharing bills with insurer.', icon: <CheckCircle className="w-4 h-4 text-emerald-400" /> },
                                { title: 'No Room Cap', desc: 'Any room, no hidden cuts.', icon: <Layout className="w-4 h-4 text-indigo-400" /> },
                                { title: '4y Wait', desc: 'Pre-existing diseases wait.', icon: <Clock className="w-4 h-4 text-amber-400" /> }
                            ].map((item) => (
                                <div key={item.title} className="p-6 bg-slate-950/50 rounded-2xl border border-slate-800 group hover:border-slate-700 transition-colors">
                                    <div className="mb-4 p-2 bg-slate-900 rounded-lg inline-block">{item.icon}</div>
                                    <h4 className="text-[10px] font-black text-white uppercase tracking-widest italic mb-1">{item.title}</h4>
                                    <p className="text-[9px] text-slate-500 font-bold leading-tight uppercase tracking-tight">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="p-10 bg-slate-950/50 border border-slate-800 rounded-[2.5rem]">
                            <div className="flex items-center text-xs font-black text-slate-500 uppercase tracking-widest mb-8 italic">
                                <Stethoscope className="w-4 h-4 mr-2" />
                                Interactive: The Emergency Room
                            </div>
                            <h3 className="text-xl font-black text-white mb-4">A ₹5,00,000 Bill arrived!</h3>
                            <p className="text-slate-500 text-sm mb-10 italic leading-relaxed uppercase font-medium">
                                Configure your policy to minimize out-of-pocket costs. Set <span className="text-white">Copay to 0%</span> and <span className="text-white">Turn OFF Room Cap</span> to pass!
                            </p>
                            
                            <div className="space-y-10">
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Co-payment Percentage</label>
                                        <span className="text-white font-black">{copay}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="50"
                                        step="10"
                                        value={copay}
                                        onChange={(e) => setCopay(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                                    />
                                </div>

                                <div className="flex items-center justify-between p-6 bg-slate-900 rounded-2xl border border-slate-800">
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 bg-slate-950 rounded-xl">
                                             <ShieldCheck className="w-5 h-5 text-indigo-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-white uppercase tracking-widest italic">Room Rent Capping</p>
                                            <p className="text-[9px] text-slate-500 font-bold uppercase italic tracking-tight underline cursor-help group relative">
                                                (1% of Sum Insured limit usually)
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setRoomRentCap(!roomRentCap)}
                                        className={cn("px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", 
                                            roomRentCap ? "bg-rose-500/20 text-rose-500 border border-rose-500/30" : "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30"
                                        )}
                                    >
                                        {roomRentCap ? 'ON (Limited)' : 'OFF (Unlimited)'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-linear-to-br from-[#1A0D0D] to-[#0A0D14] border border-rose-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden text-center">
                        <h3 className="text-lg font-black text-slate-500 mb-8 uppercase tracking-widest italic tracking-[0.2em]">Live Bill Audit</h3>
                        
                        <div className="p-10 bg-slate-900/50 border border-slate-800 rounded-[3rem] mb-10 space-y-6">
                            <div className="flex justify-between items-center text-left">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">You Pay:</p>
                                <motion.p 
                                    key={calculations.user}
                                    initial={{ y: -10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="text-4xl font-black text-rose-500 tabular-nums"
                                >
                                    ₹{calculations.user.toLocaleString()}
                                </motion.p>
                            </div>
                            <div className="flex justify-between items-center text-left pt-6 border-t border-slate-800">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Insurer Pays:</p>
                                <motion.p 
                                    key={calculations.insurer}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="text-4xl font-black text-emerald-500 tabular-nums"
                                >
                                    ₹{calculations.insurer.toLocaleString()}
                                </motion.p>
                            </div>
                        </div>

                        <div className="mb-10">
                            <p className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-widest italic tracking-tighter">Shield Efficiency</p>
                            <div className="w-full h-4 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                                <motion.div 
                                    style={{ width: `${calculations.percentCovered}%` }}
                                    className="h-full bg-linear-to-r from-rose-500 to-emerald-500"
                                    animate={{ width: `${calculations.percentCovered}%` }}
                                />
                            </div>
                            <p className="text-white font-black text-xl mt-4 italic">{calculations.percentCovered}% COVERED</p>
                        </div>

                        <button
                            onClick={() => copay === 0 && !roomRentCap && setCompleted(true)}
                            className={cn("w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all", 
                                (copay === 0 && !roomRentCap) ? "bg-rose-600 text-white shadow-xl shadow-rose-600/20 active:scale-95" : "bg-slate-950 text-slate-700 italic border border-slate-900 cursor-not-allowed"
                            )}
                        >
                            Finalize Shield
                        </button>

                        <AnimatePresence>
                            {completed && (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="mt-10 p-10 bg-emerald-600 border border-emerald-500 rounded-[3rem] text-center shadow-2xl relative"
                                >
                                    <Star className="w-16 h-16 text-white mx-auto mb-4" />
                                    <p className="text-white font-black text-2xl mb-1 uppercase tracking-tighter italic italic">Shield Activated!</p>
                                    <p className="text-white/80 text-sm font-bold italic mb-8 uppercase tracking-widest">You have avoided common capping traps. Your health is protected!</p>
                                    <button onClick={onBack} className="w-full py-4 bg-black text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.3em]">Exit Level</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="p-8 bg-slate-900 border border-slate-800 rounded-[2.5rem] flex items-center space-x-6">
                         <div className="p-4 bg-slate-800 rounded-2xl text-rose-500">
                             <AlertCircle className="w-6 h-6 border-2 border-rose-500 rounded-full p-0.5" />
                         </div>
                         <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest italic leading-loose">
                             Never hide "Pre-existing" diseases. Insurers use them to <span className="text-rose-500 font-black">Reject</span> 100% of claims later. <span className="text-white italic">Disclosure is your best insurance.</span>
                         </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
