import { useState, useMemo } from 'react';
import type { ReactNode, ElementType } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  TrendingUp,
  Gamepad2,
  Trophy,
  Settings,
  ChevronRight,
  Wallet,
  Target,
  Bell,
  Search,
  Zap,
  Star,
  Award,
  BarChart3,
  Dices,
  PlayCircle,
  Users,
  BrainCircuit,
  PiggyBank,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  PieChart as PieChartIcon,
  CheckCircle,
  Sparkles
} from 'lucide-react';

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for Tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Simple Mock Data
const SAVINGS_DATA = [
  { name: 'Jan', amount: 400 },
  { name: 'Feb', amount: 600 },
  { name: 'Mar', amount: 550 },
  { name: 'Apr', amount: 900 },
  { name: 'May', amount: 1200 },
  { name: 'Jun', amount: 1400 },
];

const MODULES = [
  { id: 1, title: 'Budgeting 101', progress: 80, color: 'bg-blue-500', icon: Target },
  { id: 2, title: 'Saving Strategies', progress: 45, color: 'bg-purple-500', icon: Wallet },
  { id: 3, title: 'Investing Basics', progress: 20, color: 'bg-emerald-500', icon: TrendingUp },
  { id: 4, title: 'Credit Management', progress: 10, color: 'bg-orange-500', icon: Award },
];

const SIMULATIONS = [
  { id: 1, title: 'First Salary Challenge', tag: 'Practical', xp: 500, users: 1240, difficulty: 'Easy', status: 'available' },
  { id: 2, title: 'Student Debt Rescue', tag: 'Real-Life', xp: 800, users: 850, difficulty: 'Hard', status: 'locked' },
  { id: 3, title: 'Crypto Mania Scenario', tag: 'Risk Management', xp: 1200, users: 2100, difficulty: 'Medium', status: 'available' },
  { id: 4, title: 'Small Business Simulation', tag: 'Strategy', xp: 1500, users: 340, difficulty: 'Pro', status: 'locked' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentModule, setCurrentModule] = useState<string | null>(null);

  const navigateToModule = (moduleId: string) => {
    setCurrentModule(moduleId);
    setActiveTab('module-detail');
  };

  const goBack = () => {
    setCurrentModule(null);
    setActiveTab('learning');
  };

  return (
    <div className="flex h-screen bg-[#0A0D14] text-slate-200 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-68 border-r border-slate-800/80 flex flex-col p-8 space-y-10 bg-[#0D1117]">
        <div className="flex items-center space-x-3.5 px-2">
          <div className="w-11 h-11 bg-linear-to-tr from-indigo-600 to-violet-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <Zap className="text-white w-6 h-6 fill-current" />
          </div>
          <span className="text-2xl font-black tracking-tight text-white">FinYoda</span>
        </div>

        <nav className="flex-1 space-y-3">
          <NavItem
            active={activeTab === 'dashboard'}
            onClick={() => { setActiveTab('dashboard'); setCurrentModule(null); }}
            icon={LayoutDashboard}
            label="Dashboard"
          />
          <NavItem
            active={activeTab === 'learning' || activeTab === 'module-detail'}
            onClick={() => { setActiveTab('learning'); setCurrentModule(null); }}
            icon={BookOpen}
            label="Learn Path"
          />
          <NavItem
            active={activeTab === 'simulations'}
            onClick={() => { setActiveTab('simulations'); setCurrentModule(null); }}
            icon={Gamepad2}
            label="Simulation Center"
            badge="New"
          />
          <NavItem
            active={activeTab === 'analytics'}
            onClick={() => { setActiveTab('analytics'); setCurrentModule(null); }}
            icon={BarChart3}
            label="Analytics"
          />
          <NavItem
            active={activeTab === 'quests'}
            onClick={() => { setActiveTab('quests'); setCurrentModule(null); }}
            icon={Trophy}
            label="Weekly Quests"
          />
        </nav>

        <div className="pt-6 border-t border-slate-800/50">
          <NavItem
            active={activeTab === 'settings'}
            onClick={() => { setActiveTab('settings'); setCurrentModule(null); }}
            icon={Settings}
            label="Profile Settings"
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <header className="h-24 px-12 border-b border-slate-800/60 flex items-center justify-between sticky top-0 bg-[#0A0D14]/80 backdrop-blur-xl z-20">
          <div className="flex items-center max-w-lg w-full relative">
            <Search className="absolute left-5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search concepts, sims or quests..."
              className="w-full bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl py-3 pl-14 pr-4 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-500 focus:bg-slate-900 shadow-inner"
            />
          </div>

          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2.5 bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-2.5 hover:bg-slate-800/80 transition-colors shadow-sm">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]" />
              <span className="font-bold text-white tracking-wide">2,450 XP</span>
            </div>

            <button className="relative p-2.5 text-slate-400 hover:text-white transition-all bg-slate-900/50 border border-slate-800 rounded-xl">
              <Bell className="w-6 h-6" />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-indigo-500 rounded-full border-2 border-[#0A0D14]"></span>
            </button>

            <div className="flex items-center space-x-4 pl-8 border-l border-slate-800/60">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-white leading-none mb-1">Alex J.</p>
                <p className="text-[11px] font-black uppercase tracking-widest text-indigo-400">Level 14</p>
              </div>
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 border-2 border-slate-800 shadow-lg overflow-hidden flex items-center justify-center">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=6366f1" alt="Avatar" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-lg border-2 border-[#0A0D14] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Rendering */}
        <div className="p-12 max-w-400 mx-auto w-full">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && <DashboardView key="dashboard" />}
            {activeTab === 'learning' && <LearningView key="learning" onModuleSelect={navigateToModule} />}
            {activeTab === 'simulations' && <SimulationView key="simulations" />}
            {activeTab === 'module-detail' && currentModule === 'budgeting-50-30-20' && <Budgeting503020View key="budgeting-module" onBack={goBack} />}
            {activeTab !== 'dashboard' && activeTab !== 'learning' && activeTab !== 'simulations' && activeTab !== 'module-detail' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <div className="w-28 h-28 bg-slate-900 border border-slate-800 rounded-4xl flex items-center justify-center mb-8 rotate-3 shadow-2xl">
                  <Dices className="w-14 h-14 text-indigo-500 opacity-80" />
                </div>
                <h1 className="text-4xl font-black text-white mb-4 tracking-tight uppercase">Coming Soon</h1>
                <p className="text-slate-500 max-w-md text-lg leading-relaxed">We're sharpening our AI-driven financial models to give you the most accurate real-world feedback. Hang tight!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

interface NavItemProps {
  active: boolean;
  icon: ElementType;
  label: string;
  onClick: () => void;
  badge?: string;
}

function NavItem({ active, icon: Icon, label, onClick, badge }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-between w-full px-5 py-3.5 rounded-2xl transition-all group relative overflow-hidden",
        active ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-sm" : "hover:bg-slate-800/50 text-slate-500 border border-transparent"
      )}
    >
      <div className="flex items-center space-x-4 relative z-10">
        <Icon className={cn("w-5 h-5 transition-transform duration-300", active ? "text-indigo-400 scale-110" : "text-slate-600 group-hover:text-slate-400 group-hover:scale-110")} />
        <span className={cn("font-bold tracking-wide", active ? "text-indigo-400" : "group-hover:text-slate-200")}>{label}</span>
      </div>
      {badge && (
        <span className="px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 relative z-10">
          {badge}
        </span>
      )}
      {active && (
        <motion.div
          layoutId="sidebarActive"
          className="absolute left-0 top-1/4 w-1.5 h-1/2 bg-indigo-500 rounded-r-full"
        />
      )}
    </button>
  );
}

function DashboardView() {
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
              Keep it up, Alex! <br />
              <span className="text-white/70">Next reward: Lv. 15</span>
            </h1>
            <p className="text-indigo-100 text-lg mb-10 leading-relaxed font-medium">
              You've reached <span className="text-white font-bold">34% of your monthly goal</span>.
              Our AI analysis suggests you can save $40 more if you skip one 'Dining Out' this week.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-indigo-700 font-black px-8 py-4 rounded-2xl hover:scale-105 transition-all shadow-xl shadow-black/20 flex items-center space-x-2">
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
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">{module.progress}% Mastered</span>
                  </div>
                </div>
                <h3 className="font-extrabold text-xl text-white mb-6 group-hover:text-indigo-400 transition-colors">{module.title}</h3>
                <div className="w-full bg-slate-800/50 h-3 rounded-full overflow-hidden mb-2 shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${module.progress}%` }}
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

function LearningView({ onModuleSelect }: { onModuleSelect: (id: string) => void }) {
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
          <button className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-black text-xs uppercase tracking-widest shadow-xl">In Progress</button>
          <button className="px-6 py-2.5 rounded-xl text-slate-500 hover:text-slate-300 font-black text-xs uppercase tracking-widest transition-colors">Completed</button>
          <button className="px-6 py-2.5 rounded-xl text-slate-500 hover:text-slate-300 font-black text-xs uppercase tracking-widest transition-colors">Locked</button>
        </div>
      </div>

      <div className="relative py-10">
        {/* Vertical Path Line */}
        <div className="absolute top-0 left-16 h-full w-2 bg-linear-to-b from-indigo-500 via-indigo-600/20 to-transparent rounded-full shadow-[0_0_15px_rgba(79,70,229,0.2)]"></div>

        <div className="space-y-24">
          {[1, 2, 3].map((level) => (
            <div key={level} className="relative flex gap-12 group">
              {/* Level Node */}
              <div className={cn(
                "relative z-10 w-32 h-32 rounded-[2.5rem] flex items-center justify-center shrink-0 border-4 shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all duration-500 group-hover:rotate-6",
                level === 1 ? "bg-indigo-600 border-indigo-400 text-white ring-8 ring-indigo-500/10" : "bg-slate-900 border-slate-800 text-slate-700 group-hover:border-slate-700"
              )}>
                {level === 1 ? <Star className="w-14 h-14 fill-current drop-shadow-lg" /> : <BookOpen className="w-12 h-12" />}
                <div className={cn(
                  "absolute -top-5 -right-5 w-12 h-12 rounded-2xl border-2 flex items-center justify-center text-lg font-black italic",
                  level === 1 ? "bg-indigo-400 border-indigo-300 text-white" : "bg-slate-800 border-slate-700 text-slate-500"
                )}>
                  L{level}
                </div>
              </div>

              {/* Level Details */}
              <div className="flex-1 pt-4">
                <div className="flex items-center space-x-4 mb-4">
                  <h3 className={cn("text-4xl font-black tracking-tight transition-colors", level === 1 ? "text-white" : "text-slate-600 group-hover:text-slate-400")}>
                    {level === 1 ? "The Foundation" :
                      level === 2 ? "Wealth Engine" :
                        level === 3 ? "Empire Building" : "Final Stage"}
                  </h3>
                  {level === 1 && (
                    <div className="inline-flex items-center px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/5">
                      Active Now
                    </div>
                  )}
                </div>
                <p className="text-slate-500 max-w-2xl text-lg font-medium mb-10 leading-relaxed">
                  {level === 1 ? "Learn the rules of the game. We'll cover budgeting, banking, and the philosophy of money." :
                    "Understanding credit, debt management, and the basics of stock market and property investing."}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                  {level === 1 ? [
                    { id: 'mindset', name: "Mindset Over Money", type: "Video", duration: "5 min", status: "completed", icon: PlayCircle },
                    { id: 'budgeting-50-30-20', name: "Budgeting 50/30/20", type: "Guided", duration: "12 min", status: "active", icon: BrainCircuit },
                    { id: 'emergency-funds', name: "Emergency Funds", type: "Quiz", duration: "15 XP", status: "locked", icon: Trophy },
                  ].map((sub, i) => (
                    <div
                      onClick={() => sub.status === 'active' && onModuleSelect(sub.id)}
                      key={i}
                      className={cn(
                        "relative group/card p-6 rounded-4xl border transition-all duration-300",
                        sub.status === 'completed' ? "bg-slate-900/30 border-slate-800 opacity-60" :
                          sub.status === 'active' ? "bg-indigo-600/5 border-indigo-500/30 ring-1 ring-indigo-500/20 cursor-pointer hover:bg-indigo-600/10 hover:border-indigo-500/50" :
                            "bg-slate-900/5 border-slate-800 opacity-30 cursor-not-allowed"
                      )}>
                      <div className="flex items-center justify-between mb-6">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                          sub.status === 'active' ? "bg-indigo-500/20 text-indigo-400" : "bg-slate-800 text-slate-600"
                        )}>
                          <sub.icon className="w-6 h-6" />
                        </div>
                        {sub.status === 'completed' && (
                          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/40">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <h4 className={cn("text-lg font-black mb-1 transition-colors", sub.status === 'active' ? "text-white group-hover/card:text-indigo-400" : "text-slate-600")}>{sub.name}</h4>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{sub.type} • {sub.duration}</span>

                      {sub.status === 'active' && (
                        <div className="absolute bottom-4 right-6 opacity-0 group-hover/card:opacity-100 transition-opacity">
                          <ChevronRight className="w-5 h-5 text-indigo-400" />
                        </div>
                      )}
                    </div>
                  )) : (
                    <div className="col-span-1 md:col-span-2 2xl:col-span-3 h-32 border-2 border-dashed border-slate-800/50 rounded-[2.5rem] flex items-center justify-center">
                      <div className="flex items-center space-x-3 text-slate-700">
                        <AlertCircle className="w-5 h-5" />
                        <span className="font-black uppercase tracking-[0.2em] text-xs">Reach Level 15 to unlock these nodes</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SimulationView() {
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
                  <button className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-xl shadow-indigo-900/30 transition-all active:scale-95 group-hover:scale-105">
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

function Budgeting503020View({ onBack }: { onBack: () => void }) {
  const [income, setIncome] = useState(3000);
  const [completed, setCompleted] = useState(false);

  const budget = useMemo(() => ({
    needs: income * 0.5,
    wants: income * 0.3,
    savings: income * 0.2,
  }), [income]);

  const pieData = [
    { name: 'Needs', value: 50, color: '#6366f1' },
    { name: 'Wants', value: 30, color: '#a855f7' },
    { name: 'Savings', value: 20, color: '#10b981' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-10 pb-20"
    >
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="p-3 bg-slate-900 hover:bg-slate-800 rounded-2xl border border-slate-800 transition-colors">
          <ArrowLeft className="w-6 h-6 text-indigo-400" />
        </button>
        <div>
          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Level 1: The Foundation</p>
          <h1 className="text-4xl font-black text-white tracking-tighter">Budgeting 50/30/20</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3 space-y-8">
          <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl">
            <h2 className="text-2xl font-black text-white mb-6 flex items-center">
              <Sparkles className="w-6 h-6 mr-3 text-indigo-400" />
              The Magic Ratio
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              The 50/30/20 rule is a simple yet powerful blueprint for your money.
              By splitting your after-tax income into three buckets, you ensure your bills are paid, you have fun, and your future is secure.
            </p>

            <div className="space-y-6">
              <BudgetCard
                title="50% Needs"
                desc="Rent, groceries, utilities, and insurance."
                amount={budget.needs}
                color="border-indigo-500/30 bg-indigo-500/5"
                icon={<Target className="w-5 h-5 text-indigo-400" />}
              />
              <BudgetCard
                title="30% Wants"
                desc="Dining out, subscriptions, shopping, and hobbies."
                amount={budget.wants}
                color="border-purple-500/30 bg-purple-500/5"
                icon={<Gamepad2 className="w-5 h-5 text-purple-400" />}
              />
              <BudgetCard
                title="20% Savings"
                desc="Debt repayment, emergency fund, and investing."
                amount={budget.savings}
                color="border-emerald-500/30 bg-emerald-500/5"
                icon={<TrendingUp className="w-5 h-5 text-emerald-400" />}
              />
            </div>
          </section>

          <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl">
            <h2 className="text-2xl font-black text-white mb-8">Quick Quiz: Test Your IQ</h2>
            <div className="p-8 bg-slate-950/50 rounded-3xl border border-slate-800">
              <p className="text-lg text-white font-bold mb-6">If you win $1,000 in a contest, how much should go to your Savings bucket according to this rule?</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['₹500', '₹300', '₹200'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => opt === '$200' && setCompleted(true)}
                    className={cn(
                      "py-4 border border-slate-800 rounded-2xl transition-all font-bold",
                      completed && opt === '$200' ? "bg-emerald-500 border-emerald-400 text-white" : "hover:border-indigo-500/50 hover:bg-slate-900 text-slate-400 hover:text-white"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-linear-to-br from-[#161B29] to-[#0A0D14] border border-indigo-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden top-32">
            <div className="relative z-10">
              <h3 className="text-xl font-black text-white mb-8 flex items-center">
                <PieChartIcon className="w-5 h-5 mr-3 text-indigo-400" />
                Live Budget Preview
              </h3>

              <div className="flex justify-center mb-10 h-64 scale-110">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={10}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center mt-3">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total</p>
                  <p className="text-2xl font-black text-white">₹{income}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Your Monthly Income</label>
                    <span className="text-white font-black">₹{income}</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="10000"
                    step="100"
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                <AnimatePresence>
                  {completed && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-3xl text-center"
                    >
                      <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                      <p className="text-emerald-400 font-black text-lg mb-1">Challenge Complete!</p>
                      <p className="text-emerald-500/60 text-sm font-bold">+250 XP Awarded</p>
                      <button
                        onClick={onBack}
                        className="mt-6 w-full py-4 bg-emerald-500 text-white font-black rounded-2xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                      >
                        Continue Journey
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!completed && (
                  <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl flex items-center space-x-4">
                    <div className="p-3 bg-amber-500/10 rounded-xl">
                      <Star className="w-5 h-5 text-amber-500 fill-current" />
                    </div>
                    <p className="text-xs text-slate-400 font-bold leading-relaxed">
                      Adjust the slider and answer the quiz to earn your <span className="text-white font-black italic">Foundation Badge</span>.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Background glow */}
            <div className="absolute -top-25 -left-25 w-64 h-64 bg-indigo-500/5 blur-[100px] pointer-events-none"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface BudgetCardProps {
  title: string;
  desc: string;
  amount: number;
  color: string;
  icon: ReactNode;
}

function BudgetCard({ title, desc, amount, color, icon }: BudgetCardProps) {
  return (
    <div className={cn("flex items-center justify-between p-6 rounded-4xl border transition-all hover:scale-[1.01]", color)}>
      <div className="flex items-center space-x-5">
        <div className="w-12 h-12 rounded-2xl bg-black/20 flex items-center justify-center shadow-inner">
          {icon}
        </div>
        <div>
          <h4 className="font-black text-white uppercase tracking-widest text-xs mb-1">{title}</h4>
          <p className="text-slate-500 text-sm font-medium">{desc}</p>
        </div>
      </div>
      <div className="text-right pl-4">
        <p className="text-2xl font-black text-white leading-none">₹{amount.toLocaleString()}</p>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter mt-1">Allocation</p>
      </div>
    </div>
  );
}
