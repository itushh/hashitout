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
  Dices,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardView from './components/DashboardView';
import LearningView from './components/LearningView';
import SimulationView from './components/SimulationView';
import Budgeting503020View from './components/Budgeting503020View';
import InflationView from './components/InflationView';
import BehaviouralFinanceView from './components/BehaviouralFinanceView';
import AccountTypesView from './components/AccountTypesView';
import HowBanksMakeMoneyView from './components/HowBanksMakeMoneyView';
import MagicOfInterestView from './components/MagicOfInterestView';
import ReadingStatementView from './components/ReadingStatementView';
import TaxTypesView from './components/TaxTypesView';
import IncomeTaxBasicsView from './components/IncomeTaxBasicsView';
import CapitalGainsView from './components/CapitalGainsView';
import TermVsOthersView from './components/TermVsOthersView';
import HealthInsuranceView from './components/HealthInsuranceView';
import VehicleProtectionView from './components/VehicleProtectionView';
import AvoidAgentScamsView from './components/AvoidAgentScamsView';
import FdRetirementView from './components/FdRetirementView';
import PfNpsDeepDiveView from './components/PfNpsDeepDiveView';
import FireConceptView from './components/FireConceptView';
import PrecautionChecklistView from './components/PrecautionChecklistView';
import DontBeADuckView from './components/DontBeADuckView';
import CibilMasterclassView from './components/CibilMasterclassView';
import LoanAnatomyView from './components/LoanAnatomyView';
import EmiPsychologyView from './components/EmiPsychologyView';
import DebtRepaymentView from './components/DebtRepaymentView';
import MoneyLaunderingView from './components/MoneyLaunderingView';
import FinanceRulesView from './components/FinanceRulesView';
import InvestmentMindsetView from './components/InvestmentMindsetView';
import DebtMarketsMasteryView from './components/DebtMarketsMasteryView';
import SipMutualFundsView from './components/SipMutualFundsView';
import StockMarketEssentialsView from './components/StockMarketEssentialsView';
import NavItem from './components/NavItem';
import AuthPage from './components/AuthPage';
import FirstSalarySimulation from './components/FirstSalarySimulation';
import { api } from './utils/api';

interface User {
  id: string;
  name: string;
  email: string;
  xp: number;
  completedModules: string[];
}

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentModule, setCurrentModule] = useState<string | null>(null);
  const [activeSimulation, setActiveSimulation] = useState<string | number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [hasSkippedAuth, setHasSkippedAuth] = useState(false);

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
  };

  const handleSkipAuth = () => {
    setHasSkippedAuth(true);
  };

  const handleLogout = () => {
    setUser(null);
    setHasSkippedAuth(false);
  };

  const handleUpdateProgress = async (xpToAdd: number, moduleId?: string) => {
    if (!user) return;

    try {
      const result = await api.post('/user/progress', {
        userId: user.id,
        xpToAdd,
        moduleId
      });
      setUser(result.user);
    } catch (err) {
      console.error('Failed to update progress:', err);
    }
  };

  if (!user && !hasSkippedAuth) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} onSkip={handleSkipAuth} />;
  }

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
            onClick={() => { setActiveTab('dashboard'); setCurrentModule(null); setActiveSimulation(null); }}
            icon={LayoutDashboard}
            label="Dashboard"
          />
          <NavItem
            active={activeTab === 'learning' || activeTab === 'module-detail'}
            onClick={() => { setActiveTab('learning'); setCurrentModule(null); setActiveSimulation(null); }}
            icon={BookOpen}
            label="Learn Path"
          />
          <NavItem
            active={activeTab === 'simulations'}
            onClick={() => { setActiveTab('simulations'); setCurrentModule(null); setActiveSimulation(null); }}
            icon={Gamepad2}
            label="Simulation"
            badge="AI"
          />
          <NavItem
            active={activeTab === 'analytics'}
            onClick={() => { setActiveTab('analytics'); setCurrentModule(null); setActiveSimulation(null); }}
            icon={BarChart3}
            label="Analytics"
          />
          <NavItem
            active={activeTab === 'quests'}
            onClick={() => { setActiveTab('quests'); setCurrentModule(null); setActiveSimulation(null); }}
            icon={Trophy}
            label="Weekly Quests"
          />
        </nav>

        <div className="pt-6 border-t border-slate-800/50 space-y-3">
          <NavItem
            active={activeTab === 'settings'}
            onClick={() => { setActiveTab('settings'); setCurrentModule(null); setActiveSimulation(null); }}
            icon={Settings}
            label="Profile Settings"
          />
          {user && (
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3.5 px-6 py-4 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all font-bold text-sm"
            >
              <LogOut className="w-5 h-5" />
              <span>Log out</span>
            </button>
          )}
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
                <p className="text-sm font-bold text-white leading-none mb-1">{user ? user.name : 'Guest User'}</p>
                <p className="text-[11px] font-black uppercase tracking-widest text-indigo-400">{user ? 'Verified Explorer' : 'Quick Visit'}</p>
              </div>
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 border-2 border-slate-800 shadow-lg overflow-hidden flex items-center justify-center">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user ? user.name : 'Guest'}&backgroundColor=6366f1`} alt="Avatar" />
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
            {activeTab === 'dashboard' && <DashboardView key="dashboard" user={user} onStartQuest={() => handleUpdateProgress(100)} />}
            {activeTab === 'learning' && <LearningView key="learning" onModuleSelect={navigateToModule} user={user} />}
            {activeTab === 'simulations' && !activeSimulation && (
              <SimulationView key="simulations" onLaunchSimulation={setActiveSimulation} />
            )}
            {activeTab === 'simulations' && activeSimulation === 1 && (
              <FirstSalarySimulation
                key="first-salary-sim"
                onBack={() => setActiveSimulation(null)}
                onComplete={(xp, id) => handleUpdateProgress(xp, id)}
              />
            )}
            {activeTab === 'module-detail' && currentModule === 'budgeting-50-30-20' && <Budgeting503020View key="budgeting-module" onBack={goBack} onComplete={handleUpdateProgress} />}
            {activeTab === 'module-detail' && currentModule === 'inflation' && <InflationView key="inflation-module" onBack={goBack} onComplete={handleUpdateProgress} />}
            {activeTab === 'module-detail' && currentModule === 'behavioural-finance' && <BehaviouralFinanceView key="behavioural-module" onBack={goBack} onComplete={handleUpdateProgress} />}
            {activeTab === 'module-detail' && currentModule === 'account-types' && <AccountTypesView key="account-types-module" onBack={goBack} />}
            {activeTab === 'module-detail' && currentModule === 'bank-business' && <HowBanksMakeMoneyView key="bank-business-module" onBack={goBack} />}
            {activeTab === 'module-detail' && currentModule === 'interest-rates' && <MagicOfInterestView key="interest-rates-module" onBack={goBack} />}
            {activeTab === 'module-detail' && currentModule === 'statement-reading' && <ReadingStatementView key="statement-reading-module" onBack={goBack} />}
            {activeTab === 'module-detail' && currentModule === 'tax-types' && <TaxTypesView key="tax-types-module" onBack={goBack} />}
            {activeTab === 'module-detail' && currentModule === 'income-tax-basics' && <IncomeTaxBasicsView key="income-tax-basics-module" onBack={goBack} />}
            {activeTab === 'module-detail' && currentModule === 'capital-gains' && <CapitalGainsView key="capital-gains-module" onBack={goBack} />}
            {activeTab === 'module-detail' && currentModule === 'life-insurance-term' && <TermVsOthersView key="life-insurance-term-module" onBack={goBack} />}
            {activeTab === 'module-detail' && currentModule === 'health-insurance-101' && <HealthInsuranceView key="health-insurance-101-module" onBack={goBack} />}
            {activeTab === 'module-detail' && currentModule === 'vehicle-protection' && <VehicleProtectionView key="vehicle-protection-module" onBack={goBack} />}
            {activeTab === 'module-detail' && currentModule === 'avoid-agent-scams' && <AvoidAgentScamsView key="avoid-agent-scams-module" onBack={goBack} />}
            {activeTab === 'module-detail' && currentModule === 'fd-retirement' && <FdRetirementView key="fd-retirement-module" onBack={goBack} />}
            {activeTab === 'module-detail' && currentModule === 'pf-nps-deepdive' && <PfNpsDeepDiveView key="pf-nps-deepdive-module" onBack={goBack} />}
            {activeTab === 'module-detail' && currentModule === 'fire-concept' && <FireConceptView key="fire-concept-module" onBack={goBack} />}
            {activeTab === 'module-detail' && currentModule === 'fraud-checklist' && <PrecautionChecklistView key="fraud-checklist-module" onBack={goBack} />}
            {activeTab === 'module-detail' && currentModule === 'duck-prevention' && <DontBeADuckView key="duck-prevention-module" onBack={goBack} />}
            {activeTab === 'module-detail' && currentModule === 'cibil-masterclass' && <CibilMasterclassView key="cibil-module" onBack={goBack} />}
            {activeTab === 'module-detail' && currentModule === 'loan-anatomy' && <LoanAnatomyView key="loan-anatomy-module" onBack={goBack} />}
            {activeTab === 'module-detail' && currentModule === 'emi-psychology' && <EmiPsychologyView key="emi-psychology-module" onBack={goBack} />}
            {activeTab === 'module-detail' && currentModule === 'debt-repayment' && <DebtRepaymentView key="debt-repayment-module" onBack={goBack} />}
            {activeTab === 'module-detail' && currentModule === 'money-laundering' && <MoneyLaunderingView key="money-laundering-module" onBack={goBack} />}
            {activeTab === 'module-detail' && currentModule === 'finance-rules' && <FinanceRulesView key="finance-rules-module" onBack={goBack} />}
            {activeTab === 'module-detail' && currentModule === 'investing-intro' && <InvestmentMindsetView key="investing-intro-module" onBack={goBack} />}
            {activeTab === 'module-detail' && currentModule === 'fd-basics-mastery' && <DebtMarketsMasteryView key="fd-basics-mastery-module" onBack={goBack} />}
            {activeTab === 'module-detail' && currentModule === 'sip-mutual-funds' && <SipMutualFundsView key="sip-mutual-funds-module" onBack={goBack} />}
            {activeTab === 'module-detail' && currentModule === 'stock-market' && <StockMarketEssentialsView key="stock-market-module" onBack={goBack} />}
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
