import { useState, useMemo } from 'react';
import {
    ArrowLeft,
    TrendingUp,
    Zap,
    CheckCircle,
    Star,
    Scissors,
    Shield,
    Calendar,
    ArrowRightCircle,
    Info,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import {
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip as RechartsTooltip,
    Legend
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface LoanAnatomyViewProps {
    onBack: () => void;
}

export default function LoanAnatomyView({ onBack }: LoanAnatomyViewProps) {
    const [principal, setPrincipal] = useState(2000000); // 20 Lakhs
    const [rate, setRate] = useState(9);
    const [tenure, setTenure] = useState(20);
    const [completed, setCompleted] = useState(false);

    const loanStats = useMemo(() => {
        const r = rate / 12 / 100;
        const n = tenure * 12;
        const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalPayment = emi * n;
        const totalInterest = totalPayment - principal;
        
        return {
            emi: Math.round(emi),
            totalPayment: Math.round(totalPayment),
            totalInterest: Math.round(totalInterest),
            interestPercentage: Math.round((totalInterest / totalPayment) * 100)
        };
    }, [principal, rate, tenure]);

    const chartData = [
        { name: 'Principal', value: principal, fill: '#10b981' },
        { name: 'Interest', value: loanStats.totalInterest, fill: '#ef4444' }
    ];

    const handleChallenge = () => {
        if (tenure <= 10 && rate <= 8) setCompleted(true);
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
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Level 3: Credit & Borrowing</p>
                    <h1 className="text-4xl font-black text-white tracking-tighter">The Loan Dissector</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 space-y-8">
                    <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                        <h2 className="text-2xl font-black text-white mb-6 flex items-center">
                            <Scissors className="w-6 h-6 mr-3 text-rose-500" />
                            Anatomy of Debt
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium italic">
                            A loan is just money you 'rent' from the future. The cost of that rent is <span className="text-white font-black">Interest</span>. 
                            The longer you rent, the more you pay—sometimes <span className="text-rose-500 font-bold italic">twice</span> the original amount!
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                            {[
                                { title: 'Principal', desc: 'The actual money you borrowed home/car.', icon: <CheckCircle className="w-5 h-5 text-emerald-400" /> },
                                { title: 'Tenure', desc: 'The time you take to pay it back.', icon: <Calendar className="w-5 h-5 text-indigo-400" /> },
                                { title: 'Interest Rate', desc: 'The "Rent" for using the money.', icon: <TrendingUp className="w-5 h-5 text-rose-400" /> },
                                { title: 'EMI', desc: 'Your monthly survival payment.', icon: <Zap className="w-5 h-5 text-amber-400" /> }
                            ].map((item) => (
                                <div key={item.title} className="p-8 bg-slate-950/50 rounded-3xl border border-slate-800 flex items-start space-x-4 group hover:border-slate-700 transition-colors">
                                    <div className="p-3 bg-slate-900 rounded-xl">{item.icon}</div>
                                    <div>
                                        <h4 className="text-sm font-black text-white uppercase tracking-widest mb-1">{item.title}</h4>
                                        <p className="text-[11px] text-slate-500 font-bold leading-tight uppercase tracking-tight italic opacity-60 group-hover:opacity-100 transition-opacity">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-8 bg-linear-to-br from-indigo-500/10 via-slate-900 to-slate-950 border border-indigo-500/20 rounded-[2.5rem]">
                            <div className="flex items-center text-indigo-400 font-black text-xs uppercase tracking-widest mb-4 italic">
                                <Shield className="w-4 h-4 mr-2" />
                                Interactive Quest: Slasher Mode
                            </div>
                            <h3 className="text-xl font-black text-white mb-2">Can you reduce interest?</h3>
                            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                                Use the console to reduce your tenure to <span className="text-white font-black">10 Years</span> and rate to <span className="text-white font-black">8%</span>. 
                                Watch how the <span className="text-rose-500 font-bold">Red Circle (Interest)</span> shrinks!
                            </p>
                            <button 
                                onClick={handleChallenge}
                                className={cn("px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all", 
                                    (tenure <= 10 && rate <= 8) ? "bg-indigo-500 text-white shadow-xl shadow-indigo-500/20" : "bg-slate-900 text-slate-700"
                                )}
                            >
                                Slash the Debt
                            </button>
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-linear-to-br from-[#12121A] to-[#0A0D14] border border-indigo-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
                        <div className="relative z-10 text-center">
                            <h3 className="text-lg font-black text-slate-500 mb-8 uppercase tracking-widest">Loan Console</h3>
                            
                            <div className="mb-8 p-10 bg-slate-900/50 rounded-[2.5rem] border border-slate-800">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 italic">Monthly EMI</p>
                                <motion.div 
                                    key={loanStats.emi}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-5xl font-black text-white tabular-nums tracking-tighter"
                                >
                                    ₹{loanStats.emi.toLocaleString()}
                                </motion.div>
                                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mt-4">Total Rent: ₹{loanStats.totalInterest.toLocaleString()}</p>
                            </div>

                            <div className="h-64 mb-10 overflow-hidden">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RechartsPieChart>
                                        <Pie
                                            data={chartData}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip />
                                        <Legend />
                                    </RechartsPieChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="space-y-10 text-left">
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Principal Amount</label>
                                        <span className="text-white font-black">₹{(principal/100000).toFixed(0)} Lakhs</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="100000"
                                        max="5000000"
                                        step="100000"
                                        value={principal}
                                        onChange={(e) => setPrincipal(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center">
                                            Interest Rate
                                            <ArrowUpRight className="w-3 h-3 ml-2 text-rose-500" />
                                        </label>
                                        <span className="text-white font-black">{rate}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="6"
                                        max="15"
                                        step="0.5"
                                        value={rate}
                                        onChange={(e) => setRate(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center">
                                            Tenure (Years)
                                            <ArrowDownRight className="w-3 h-3 ml-2 text-indigo-400" />
                                        </label>
                                        <span className="text-white font-black">{tenure} YRS</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="30"
                                        value={tenure}
                                        onChange={(e) => setTenure(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                    />
                                </div>

                                <AnimatePresence>
                                    {completed && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="p-8 bg-emerald-500/10 border border-emerald-500/30 rounded-[2.5rem] text-center"
                                        >
                                            <Star className="w-12 h-12 text-yellow-400 fill-yellow-400 mx-auto mb-4" />
                                            <p className="text-emerald-400 font-black text-lg mb-1">Debt Slayer!</p>
                                            <p className="text-emerald-500/60 text-sm font-bold">+600 XP Awarded</p>
                                            <button
                                                onClick={onBack}
                                                className="mt-6 w-full py-5 bg-emerald-500 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/20 active:scale-95 transition-all text-xs uppercase tracking-[0.2em]"
                                            >
                                                Next: EMI Psychology
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {!completed && (
                                    <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-[2rem] flex items-center space-x-4">
                                        <div className="p-3 bg-slate-800 rounded-xl">
                                            <Info className="w-5 h-5 text-indigo-400" />
                                        </div>
                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest italic leading-loose">
                                            Set Tenure to <span className="text-white">10 or less</span> and Rate to <span className="text-white">8 or less</span> to pass!
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
