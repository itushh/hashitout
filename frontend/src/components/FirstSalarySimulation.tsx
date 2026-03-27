import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowLeft, Bot, User, Loader2, Star, CheckCircle2, TrendingUp, Wallet, ShieldCheck } from 'lucide-react';
import { api } from '../utils/api';
import { cn } from '../utils/cn';

interface Message {
    role: 'user' | 'model';
    parts: { text: string }[];
}

interface FirstSalarySimulationProps {
    onBack: () => void;
    onComplete: (xp: number, id: string) => void;
}

export default function FirstSalarySimulation({ onBack, onComplete }: FirstSalarySimulationProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'model',
            parts: [{ text: "Greetings, young explorer! I am FinYoda. Congratulations on your first salary of ₹50,000! This is a momentous occasion. Now, tell me, how do you plan to allocate these riches? Will you follow the 50/30/20 path, or do you have another strategy in mind?" }]
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [completed, setCompleted] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // We still call start so the backend knows a session began, 
        // but we don't overwrite the messages if the first one is embedded.
        api.post('/simulation/start', { scenarioId: 'first-salary' }).catch(console.error);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = input;
        setInput('');
        const newMessages: Message[] = [...messages, { role: 'user', parts: [{ text: userMessage }] }];
        setMessages(newMessages);
        setLoading(true);

        try {
            const data = await api.post('/simulation/chat', {
                history: messages,
                userInput: userMessage
            });
            setMessages(data.history);

            if (data.message.toLowerCase().includes('congratulations') || data.message.toLowerCase().includes('well done')) {
                setCompleted(true);
            }
        } catch (err: any) {
            console.error(err);
            setMessages(prev => [...prev, { role: 'model', parts: [{ text: `Error: ${err.message || 'The AI mentor is temporarily unavailable. Check your connection or API key.'}` }] }]);
        } finally {
            setLoading(false);
        }
    };

    const handleFinish = () => {
        onComplete(500, 'first-salary-sim');
        onBack();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col h-[calc(100vh-180px)] max-w-5xl mx-auto w-full bg-[#0D1117] rounded-[3rem] border border-slate-800 shadow-2xl overflow-hidden"
        >
            {/* Header */}
            <div className="px-8 py-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
                <div className="flex items-center space-x-4">
                    <button onClick={onBack} className="p-2.5 hover:bg-slate-800 rounded-xl transition-colors">
                        <ArrowLeft className="w-5 h-5 text-indigo-400" />
                    </button>
                    <div>
                        <h2 className="text-xl font-black text-white">First Salary Challenge</h2>
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none mt-1">AI-Powered Simulation</p>
                    </div>
                </div>
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2 bg-indigo-500/10 px-4 py-2 rounded-2xl border border-indigo-500/20">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-black text-white">+500 XP</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-emerald-500/10 px-4 py-2 rounded-2xl border border-emerald-500/20">
                        <Wallet className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-black text-white">₹50,000</span>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth"
            >
                <AnimatePresence mode="popLayout">
                    {messages.map((m, i) => (
                        <motion.div
                            initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20, y: 10 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            key={i}
                            className={cn(
                                "flex items-start space-x-4 max-w-3xl",
                                m.role === 'user' ? "ml-auto flex-row-reverse space-x-reverse" : ""
                            )}
                        >
                            <div className={cn(
                                "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg",
                                m.role === 'user' ? "bg-indigo-600 shadow-indigo-600/20" : "bg-slate-800 shadow-black/20"
                            )}>
                                {m.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-indigo-400" />}
                            </div>
                            <div className={cn(
                                "p-6 rounded-3xl text-sm leading-relaxed font-medium shadow-sm",
                                m.role === 'user' ? "bg-indigo-600 text-white rounded-tr-none" : "bg-slate-900/60 border border-slate-800 text-slate-300 rounded-tl-none"
                            )}>
                                {m.parts[0].text}
                            </div>
                        </motion.div>
                    ))}
                    {loading && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-start space-x-4"
                        >
                            <div className="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center shadow-lg">
                                <Bot className="w-5 h-5 text-indigo-400 animate-pulse" />
                            </div>
                            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl rounded-tl-none text-slate-500">
                                <Loader2 className="w-5 h-5 animate-spin" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Input Area */}
            <div className="p-8 bg-slate-900/50 border-t border-slate-800">
                {!completed ? (
                    <form onSubmit={handleSend} className="flex space-x-4">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask FinYoda or propose your budget..."
                            className="flex-1 bg-slate-950/50 border border-slate-800 hover:border-slate-700/50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all placeholder:text-slate-600 text-white shadow-inner"
                        />
                        <button
                            disabled={loading || !input.trim()}
                            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-8 py-4 rounded-2xl font-black flex items-center space-x-2 shadow-xl shadow-indigo-900/20 transition-all active:scale-95 min-w-[180px] justify-center"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Send className="w-5 h-5" />
                            )}
                            <span className="hidden sm:inline">{loading ? 'Thinking...' : 'Send Response'}</span>
                        </button>
                    </form>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center py-4 space-y-6"
                    >
                        <div className="flex items-center space-x-4 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl">
                            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                            <p className="text-emerald-400 font-black tracking-tight">Challenge Successfully Navigated!</p>
                        </div>
                        <button
                            onClick={handleFinish}
                            className="bg-emerald-500 hover:bg-emerald-400 text-white px-12 py-4 rounded-2xl font-black shadow-xl shadow-emerald-500/20 transition-all transform hover:scale-105 active:scale-95"
                        >
                            Claim Earnings & Close Simulation
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Footer Info */}
            <div className="px-8 py-3 bg-slate-950 flex items-center justify-between">
                <div className="flex items-center space-x-4 opacity-50">
                    <div className="flex items-center space-x-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <TrendingUp className="w-3 h-3" />
                        <span>Market: Stable</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Advice: Moderated</span>
                    </div>
                </div>
                <div className="text-[9px] font-bold text-slate-700 uppercase tracking-tighter italic">FIN-S-GEN-BETA: 1.0.4</div>
            </div>
        </motion.div>
    );
}
