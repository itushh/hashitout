import { useState } from 'react';
import {
    ArrowLeft,
    FileText,
    Search,
    AlertCircle,
    CheckCircle,
    ArrowDownLeft,
    ArrowUpRight,
    Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface ReadingStatementViewProps {
    onBack: () => void;
}

export default function ReadingStatementView({ onBack }: ReadingStatementViewProps) {
    const [foundItems, setFoundItems] = useState<string[]>([]);
    const [completed, setCompleted] = useState(false);

    const statementData = [
        { id: '1', date: 'Mar 15', desc: 'UPI / SWIGGY / 9123...', type: 'debit', amount: 450, tag: 'Food' },
        { id: '2', date: 'Mar 14', desc: 'RTGS / SALARY / MAR 2024', type: 'credit', amount: 50000, tag: 'Salary' },
        { id: 'hidden-1', date: 'Mar 12', desc: 'MIN BAL CHRG / NON-MAINTENANCE', type: 'debit', amount: 250, tag: 'FEE', hidden: true, tip: "Minimum Balance Fee! This is often charged if your balance drops below the required limit." },
        { id: '4', date: 'Mar 10', desc: 'POS / ZUDIO / BENGALURU', type: 'debit', amount: 1200, tag: 'Shopping' },
        { id: 'hidden-2', date: 'Mar 08', desc: 'ATM EXT CHG / NON-SBP ATM', type: 'debit', amount: 20, tag: 'FEE', hidden: true, tip: "ATM Extraction Fee! Using other banks' ATMs more than 3-5 times a month leads to this." },
        { id: '6', date: 'Mar 05', desc: 'INT / CREDITED / QTR 4', type: 'credit', amount: 840, tag: 'Interest' },
        { id: 'hidden-3', date: 'Mar 02', desc: 'SMS CHRG / QTR MAR 2024', type: 'debit', amount: 15, tag: 'FEE', hidden: true, tip: "SMS Alerts Fee! A small but recurring cost many ignore." },
    ];

    const toggleItem = (id: string) => {
        if (foundItems.includes(id)) return;
        const newFound = [...foundItems, id];
        setFoundItems(newFound);
        if (newFound.length === 3) setCompleted(true);
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
                    <ArrowLeft className="w-6 h-6 text-amber-400" />
                </button>
                <div>
                    <p className="text-[10px] font-black text-amber-400 uppercase tracking-[0.2em]">Level 2: The Banking System</p>
                    <h1 className="text-4xl font-black text-white tracking-tighter">The Financial X-Ray</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 space-y-8">
                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-white flex items-center">
                                <FileText className="w-6 h-6 mr-3 text-amber-400" />
                                Interactive Statement
                            </h2>
                            <div className="flex items-center bg-slate-950/50 border border-slate-800 px-6 py-2 rounded-2xl">
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mr-4">Audit Mode</div>
                                <div className="flex space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className={cn("w-2 h-2 rounded-full", foundItems.length >= i ? "bg-amber-500" : "bg-slate-800")} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <p className="text-slate-400 text-sm mb-10 leading-relaxed font-medium">
                            Your bank statement is a goldmine of information—and sometimes, hidden costs. 
                            We've placed <span className="text-amber-400 font-bold">3 Hidden Fees</span> in this statement. Can you spot and click on them?
                        </p>

                        <div className="bg-slate-950/80 rounded-[2.5rem] border border-slate-800 overflow-hidden shadow-2xl">
                            <div className="bg-slate-900/50 p-6 border-b border-slate-800 grid grid-cols-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                                <span>Date</span>
                                <span className="col-span-2">Description / Particulars</span>
                                <span className="text-right">Amount</span>
                            </div>
                            <div className="divide-y divide-slate-800/50">
                                {statementData.map((item) => (
                                    <div 
                                        key={item.id}
                                        onClick={() => item.hidden && toggleItem(item.id)}
                                        className={cn(
                                            "grid grid-cols-4 p-6 transition-all group cursor-pointer items-center",
                                            item.hidden && !foundItems.includes(item.id) ? "hover:bg-amber-500/5" : "hover:bg-slate-900/30",
                                            foundItems.includes(item.id) && "bg-amber-500/10 border-l-4 border-amber-500"
                                        )}
                                    >
                                        <div className="text-xs text-slate-500 font-bold">{item.date}</div>
                                        <div className="col-span-2 flex items-center space-x-4">
                                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", 
                                                item.type === 'debit' ? "bg-rose-500/10 text-rose-500" : "bg-emerald-500/10 text-emerald-500"
                                            )}>
                                                {item.type === 'debit' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                                                {item.hidden && foundItems.includes(item.id) && <AlertCircle className="w-4 h-4 ml-1" />}
                                            </div>
                                            <div>
                                                <p className={cn("text-sm font-black transition-colors", 
                                                    foundItems.includes(item.id) ? "text-amber-400" : "text-slate-300 group-hover:text-white"
                                                )}>
                                                    {item.desc}
                                                </p>
                                                <span className="text-[9px] font-black bg-slate-900/80 px-2 py-0.5 rounded-full text-slate-600 uppercase tracking-widest">{item.tag}</span>
                                            </div>
                                        </div>
                                        <div className={cn("text-right font-black tabular-nums", 
                                            item.type === 'debit' ? "text-slate-200" : "text-emerald-500"
                                        )}>
                                            {item.type === 'debit' ? '-' : '+'}₹{item.amount.toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-10 bg-slate-900/50 flex items-center justify-between">
                                <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">Ending Balance (Mar 31)</div>
                                <div className="text-2xl font-black text-white">₹49,420.00</div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-linear-to-br from-[#1A1A12] to-[#0A0D14] border border-amber-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
                        <div className="relative z-10 text-center">
                            <h3 className="text-lg font-black text-slate-500 mb-8 uppercase tracking-widest">Audit Findings</h3>

                            <div className="space-y-6 text-left">
                                {foundItems.length === 0 && (
                                    <div className="p-10 text-center space-y-4">
                                        <Search className="w-12 h-12 text-slate-700 mx-auto animate-pulse" />
                                        <p className="text-slate-500 font-bold text-sm italic">Scan the statement and click on fees that look suspicious or unnecessary.</p>
                                    </div>
                                )}

                                {foundItems.map((fid) => {
                                    const item = statementData.find(i => i.id === fid);
                                    return (
                                        <motion.div
                                            key={fid}
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="p-6 bg-amber-500/10 border border-amber-500/30 rounded-3xl"
                                        >
                                            <div className="flex items-center space-x-3 mb-2">
                                                <AlertCircle className="w-4 h-4 text-amber-500" />
                                                <h4 className="text-white font-black text-xs uppercase tracking-widest">{item?.desc}</h4>
                                            </div>
                                            <p className="text-slate-400 text-xs font-medium leading-relaxed">{item?.tip}</p>
                                        </motion.div>
                                    )
                                })}

                                <AnimatePresence>
                                    {completed && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="p-8 bg-emerald-500 border border-emerald-400 rounded-3xl text-center shadow-xl shadow-emerald-500/20"
                                        >
                                            <CheckCircle className="w-12 h-12 text-white mx-auto mb-4" />
                                            <p className="text-white font-black text-xl mb-1">Audit Complete!</p>
                                            <p className="text-white/80 text-sm font-bold mb-6">You've found all hidden costs. Your financial IQ is elite.</p>
                                            <button
                                                onClick={onBack}
                                                className="w-full py-4 bg-black text-white font-black rounded-2xl shadow-lg active:scale-95 transition-all text-xs uppercase tracking-widest"
                                            >
                                                Back to Path
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {!completed && foundItems.length > 0 && (
                                    <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl text-center">
                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                                            Keep searching! <span className="text-amber-500 italic">{3 - foundItems.length} more fees</span> hidden in the statement.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-slate-800 rounded-xl">
                                <Target className="w-5 h-5 text-amber-400" />
                            </div>
                            <div>
                                <h4 className="text-xs font-black text-white uppercase tracking-widest">Efficiency Skill</h4>
                                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-tight">Statement mastery reduces unneeded bank costs by avg <span className="text-emerald-500">₹3,000/yr</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
