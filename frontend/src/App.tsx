import { useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Gamepad2,
  Trophy,
  Settings,
  Bell,
  Search,
  Zap,
  Star,
  BarChart3,
  Dices
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardView from './components/DashboardView';
import LearningView from './components/LearningView';
import SimulationView from './components/SimulationView';
import Budgeting503020View from './components/Budgeting503020View';
import NavItem from './components/NavItem';

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
            label="Simulation"
            badge="AI"
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
