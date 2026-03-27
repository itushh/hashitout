import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Mail, Lock, User, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { api } from '../utils/api';

interface AuthPageProps {
    onAuthSuccess: (user: any) => void;
    onSkip: () => void;
}

export default function AuthPage({ onAuthSuccess, onSkip }: AuthPageProps) {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const path = isLogin ? '/auth/login' : '/auth/register';
        const data = isLogin
            ? { email: formData.email, password: formData.password }
            : { name: formData.name, email: formData.email, password: formData.password };

        try {
            const result = await api.post(path, data);
            onAuthSuccess(result.user);
        } catch (err: any) {
            setError(err.message || 'An error occurred during authentication');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen w-full bg-[#0A0D14] flex items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Decorative blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/10 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full z-10"
            >
                {/* Logo */}
                <div className="flex items-center justify-center space-x-3 mb-10">
                    <div className="w-12 h-12 bg-linear-to-tr from-indigo-600 to-violet-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                        <Zap className="text-white w-7 h-7 fill-current" />
                    </div>
                    <span className="text-3xl font-black tracking-tight text-white">FinYoda</span>
                </div>

                {/* Card */}
                <div className="bg-[#0D1117] border border-slate-800/80 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-2">
                            {isLogin ? 'Welcome back' : 'Create an account'}
                        </h2>
                        <p className="text-slate-500 text-sm">
                            {isLogin
                                ? 'Empower your financial journey with AI-driven insights.'
                                : 'Join FinYoda and master your finances like a pro.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <AnimatePresence mode="popLayout">
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-1.5"
                                >
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                        <input
                                            name="name"
                                            type="text"
                                            required={!isLogin}
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all placeholder:text-slate-600 text-white shadow-inner"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="alex@finai.com"
                                    className="w-full bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all placeholder:text-slate-600 text-white shadow-inner"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all placeholder:text-slate-600 text-white shadow-inner"
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl p-4 flex items-start space-x-3 text-sm shadow-lg shadow-red-500/5"
                            >
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                <span>{error}</span>
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 text-white font-bold py-3.5 rounded-2xl shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center space-x-2 group active:scale-[0.98]"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                                    <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 flex flex-col space-y-4">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-slate-400 hover:text-indigo-400 text-sm font-medium transition-colors text-center"
                        >
                            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-800"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase tracking-widest">
                                <span className="bg-[#0D1117] px-4 text-slate-500">or</span>
                            </div>
                        </div>

                        <button
                            onClick={onSkip}
                            className="w-full bg-slate-900 border border-slate-800/80 text-slate-300 font-semibold py-3.5 rounded-2xl hover:bg-slate-800 transition-all active:scale-[0.98]"
                        >
                            Continue without account
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
