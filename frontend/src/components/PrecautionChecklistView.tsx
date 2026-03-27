import { useState } from 'react';
import {
    ArrowLeft,
    ShieldCheck,
    TrendingUp,
    CheckCircle,
    Star,
    Zap,
    Briefcase,
    Building2,
    Search,
    AlertCircle,
    Trophy,
    Gamepad2,
    Layout,
    Clock,
    UserCircle2,
    Smartphone,
    Link,
    Key,
    Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface PrecautionChecklistViewProps {
    onBack: () => void;
}

export default function PrecautionChecklistView({ onBack }: PrecautionChecklistViewProps) {
    const [checked, setChecked] = useState<string[]>([]);
    const [completed, setCompleted] = useState(false);

    const precautions = [
        { id: '1', title: '2FA On Every App', desc: 'Secure your login with a second layer of security.', icon: <Key className="w-4 h-4" /> },
        { id: '2', title: 'No Link Policy', desc: 'Never click on banking links in SMS/Emails.', icon: <Link className="w-4 h-4" /> },
        { id: '3', title: 'Private WiFi ONLY', desc: 'Never access bank accounts on Public/Free WiFi.', icon: <Smartphone className="w-4 h-4" /> },
        { id: '4', title: 'V-KYC Awareness', desc: 'Do not share screen for KYC; banks never ask.', icon: <Briefcase className="w-4 h-4" /> },
        { id: '5', title: 'SIM Lock Enabled', desc: 'Lock your physical SIM with a PIN to prevent swaps.', icon: <Lock className="w-4 h-4" /> }
    ];

    const toggleCheck = (id: string) => {
        const newChecked = checked.includes(id) ? checked.filter(c => c !== id) : [...checked, id];
        setChecked(newChecked);
        if (newChecked.length === precautions.length) setCompleted(true);
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
                    <ArrowLeft className="w-6 h-6 text-rose-400" />
                </button>
                <div>
                    <p className="text-[10px] font-black text-rose-400 uppercase tracking-[0.2em]">Level 7: Fraud Prevention</p>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic tracking-widest tracking-tighter">The Digital Keyhole</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 space-y-8">
                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-black text-white mb-6 flex items-center italic">
                                <ShieldCheck className="w-6 h-6 mr-3 text-rose-400" />
                                Precaution Checklist
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium italic italic">
                                Your digital vault is only as strong as your <span className="text-white font-black italic">weakest habit</span>. 
                                Complete the checklist to activate your defense protocol.
                            </p>

                            <div className="space-y-4">
                                {precautions.map((p) => {
                                    const isChecked = checked.includes(p.id);
                                    return (
                                        <button
                                            key={p.id}
                                            onClick={() => toggleCheck(p.id)}
                                            className={cn(
                                                "w-full p-8 rounded-3xl border transition-all text-left flex items-center justify-between group overflow-hidden relative",
                                                isChecked ? "bg-rose-500/10 border-rose-500/50" : "bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900 shadow-xl"
                                            )}
                                        >
                                            <div className="flex items-center space-x-6 relative z-10">
                                                <div className={cn("p-4 rounded-2xl transition-all", isChecked ? "bg-rose-500 text-white" : "bg-slate-900 text-slate-500 shadow-xl")}>
                                                    {isChecked ? <CheckCircle className="w-6 h-6" /> : p.icon}
                                                </div>
                                                <div>
                                                    <h4 className={cn("text-white font-black text-sm uppercase italic tracking-widest transition-all", isChecked && "italic")}>{p.title}</h4>
                                                    <p className="text-slate-500 text-xs font-bold leading-relaxed italic mt-1 italic tracking-tight">{p.desc}</p>
                                                </div>
                                            </div>
                                            {!isChecked && (
                                                <div className="p-3 bg-slate-900 rounded-xl text-slate-700 hidden group-hover:block relative z-10">
                                                    <Star className="w-4 h-4" />
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-linear-to-br from-[#1A0D0D] to-[#0A0D14] border border-rose-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden text-center min-h-[400px]">
                        <h3 className="text-lg font-black text-slate-500 mb-8 uppercase tracking-widest italic tracking-[0.2em] italic tracking-tighter">Defense Matrix Status</h3>
                        
                        <div className="p-10 bg-slate-900 border border-slate-800 rounded-[3rem] mb-10 text-center relative pt-10 group">
                             <motion.p 
                                key={checked.length}
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                className={cn("text-8xl font-black italic tracking-tighter mb-2", checked.length === precautions.length ? "text-emerald-500" : "text-white")}
                             >
                                {Math.round((checked.length / precautions.length) * 100)}%
                             </motion.p>
                             <p className="text-rose-400 font-black text-xs uppercase tracking-widest mt-4 italic tracking-widest">Protocol Integrity</p>
                             <div className="absolute top-4 right-4 p-4 opacity-5 group-hover:opacity-100 transition-opacity">
                                <ShieldCheck className="w-16 h-16 text-rose-500" />
                             </div>
                        </div>

                        <div className="p-10 bg-slate-900/50 border border-slate-800 rounded-3xl mb-10 text-left space-y-6 relative overflow-hidden">
                             <div className="relative z-10 flex items-center space-x-4">
                                <div className="p-3 bg-slate-950 rounded-xl shadow-xl">
                                    <AlertCircle className="w-5 h-5 text-rose-500" />
                                </div>
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest italic leading-loose">
                                    Finalize all <span className="text-white">SHIELD NODES</span> to pass the protocol scan.
                                </p>
                             </div>
                        </div>

                        <button
                            onClick={() => completed && onBack()}
                            className={cn("w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all", 
                                completed ? "bg-rose-600 text-white shadow-xl shadow-rose-600/20 active:scale-95" : "bg-slate-950 text-slate-700 italic border border-slate-900 cursor-not-allowed"
                            )}
                        >
                            Finalize Protocol
                        </button>

                        <AnimatePresence>
                            {completed && (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="mt-10 p-10 bg-emerald-600 border border-emerald-500 rounded-[3rem] text-center shadow-2xl relative"
                                >
                                    <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
                                    <p className="text-white font-black text-2xl mb-1 uppercase tracking-tighter italic italic tracking-tighter">Protocol Passed!</p>
                                    <p className="text-white/80 text-sm font-bold italic mb-8 uppercase tracking-widest">Your digital footprint is now significantly safer. Defense Point +50.</p>
                                    <button onClick={onBack} className="w-full py-4 bg-black text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.4em]">Next: Ponzi Hunt</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl flex items-center space-x-4">
                         <div className="p-3 bg-slate-950 rounded-xl text-rose-500">
                             <Zap className="w-6 h-6" />
                         </div>
                         <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest italic leading-loose">
                            Knowledge is the best firewall. Keep your <span className="text-white underline italic underline">Checklist</span> current as scams evolve. 
                         </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
