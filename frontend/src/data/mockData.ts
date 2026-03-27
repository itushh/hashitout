import {
    Target,
    Wallet,
    TrendingUp,
    Award,
    Zap,
    Shield,
    Briefcase,
    Scale,
    PlayCircle,
    BrainCircuit,
    Trophy,
    Landmark,
    CreditCard,
    ShieldAlert,
    Calculator,
    ShieldCheck,
    Stethoscope,
    Car,
    Search,
    Timer,
    Flame,
    Ghost,
    Brain,
    FileText,
    Banknote,
    Sparkles,
    Smartphone
} from 'lucide-react';

export const SAVINGS_DATA = [
    { name: 'Jan', amount: 400 },
    { name: 'Feb', amount: 600 },
    { name: 'Mar', amount: 550 },
    { name: 'Apr', amount: 900 },
    { name: 'May', amount: 1200 },
    { name: 'Jun', amount: 1400 },
];

export const MODULES = [
    { id: 1, title: 'Budgeting 101', progress: 80, color: 'bg-blue-500', icon: Target },
    { id: 2, title: 'Saving Strategies', progress: 45, color: 'bg-purple-500', icon: Wallet },
    { id: 3, title: 'Investing Basics', progress: 20, color: 'bg-emerald-500', icon: TrendingUp },
    { id: 4, title: 'Credit Management', progress: 10, color: 'bg-orange-500', icon: Award },
];

export const SIMULATIONS = [
    { id: 1, title: 'First Salary Challenge', tag: 'Practical', xp: 500, users: 1240, difficulty: 'Easy', status: 'available' },
    { id: 2, title: 'Student Debt Rescue', tag: 'Real-Life', xp: 800, users: 850, difficulty: 'Hard', status: 'locked' },
    { id: 3, title: 'Crypto Mania Scenario', tag: 'Risk Management', xp: 1200, users: 2100, difficulty: 'Medium', status: 'available' },
    { id: 4, title: 'Small Business Simulation', tag: 'Strategy', xp: 1500, users: 340, difficulty: 'Pro', status: 'locked' },
];

export const CURRICULUM = [
    {
        level: 1,
        title: "Basics of Money",
        description: "Build a strong foundation for your financial journey.",
        nodes: [
            { id: 'budgeting-50-30-20', name: "Budgeting 50/30/20", type: "Guided", duration: "12 min", icon: BrainCircuit, status: "active" },
            { id: 'inflation', name: "The Silent Thief: Inflation", type: "Interactive", duration: "10 min", icon: Ghost, status: "active" },
            { id: 'behavioural-finance', name: "Behavioural Finance", type: "Interactive", duration: "10 min", icon: Brain, status: "active" },
        ]
    },
    {
        level: 2,
        title: "The Banking System",
        description: "Navigate the world of modern banking and accounts.",
        nodes: [
            { id: 'account-types', name: "Types of Accounts", type: "Interactive", duration: "10 min", icon: Wallet, status: "active" },
            { id: 'bank-business', name: "How Banks Make Money", type: "Interactive", duration: "8 min", icon: Banknote, status: "active" },
            { id: 'interest-rates', name: "The Magic of Interest", type: "Interactive", duration: "15 min", icon: Sparkles, status: "active" },
            { id: 'statement-reading', name: "Reading Your Statement", type: "Interactive", duration: "10 min", icon: FileText, status: "active" },
        ]
    },
    {
        level: 3,
        title: "Credit & Borrowing",
        description: "Master the art of leverage and avoid debt traps.",
        nodes: [
            { id: 'cibil-masterclass', name: "The CIBIL Score Masterclass", type: "Interactive", duration: "10 min", icon: ShieldCheck, status: "active" },
            { id: 'loan-anatomy', name: "Loan Anatomy", type: "Interactive", duration: "12 min", icon: Landmark, status: "active" },
            { id: 'emi-psychology', name: "EMI Psychology & Traps", type: "Interactive", duration: "10 min", icon: Smartphone, status: "active" },
            { id: 'debt-repayment', name: "Snowball vs Avalanche", type: "Interactive", duration: "15 min", icon: Flame, status: "active" },
        ]
    },
    {
        level: 4,
        title: "Taxation in India",
        description: "Demystifying taxes and legal compliance.",
        nodes: [
            { id: 'tax-types', name: "Types of Taxes in India", type: "Interactive", duration: "12 min", icon: Scale, status: "active" },
            { id: 'income-tax-basics', name: "Income Tax Basics", type: "Interactive", duration: "15 min", icon: Calculator, status: "active" },
            { id: 'capital-gains', name: "Capital Gains Tax", type: "Interactive", duration: "8 min", icon: TrendingUp, status: "active" },
        ]
    },
    {
        level: 5,
        title: "Insurance & Protection",
        description: "Safeguard your future and assets.",
        nodes: [
            { id: 'life-insurance-term', name: "Life: Term vs Others", type: "Interactive", duration: "10 min", icon: ShieldCheck, status: "active" },
            { id: 'health-insurance-101', name: "Health Insurance 101", type: "Interactive", duration: "8 min", icon: Stethoscope, status: "active" },
            { id: 'vehicle-protection', name: "Vehicle Protection", type: "Interactive", duration: "5 min", icon: Car, status: "active" },
            { id: 'avoid-agent-scams', name: "How to Avoid Agent Scams", type: "Interactive", duration: "10 min", icon: Shield, status: "active" },
        ]
    },
    {
        level: 6,
        title: "Retirement Planning",
        description: "Strategies for a secure and early freedom.",
        nodes: [
            { id: 'fd-retirement', name: "The Savings Safety Net", type: "Interactive", duration: "10 min", icon: Landmark, status: "active" },
            { id: 'pf-nps-deepdive', name: "PF & NPS Deep Dive", type: "Interactive", duration: "15 min", icon: Wallet, status: "active" },
            { id: 'fire-concept', name: "The FIRE Concept", type: "Interactive", duration: "12 min", icon: Flame, status: "active" },
        ]
    },
    {
        level: 7,
        title: "Fraud Prevention",
        description: "Stay one step ahead of financial criminals.",
        nodes: [
            { id: 'fraud-checklist', name: "Precaution Checklists", type: "Interactive", duration: "10 min", icon: ShieldAlert, status: "active" },
            { id: 'duck-prevention', name: "Don't be a Duck", type: "Interactive", duration: "5 min", icon: Shield, status: "active" },
        ]
    },
    {
        level: 8,
        title: "Legal Context",
        description: "Understanding the law of the land.",
        nodes: [
            { id: 'money-laundering', name: "Money Laundering & AML", type: "Interactive", duration: "12 min", icon: Scale, status: "active" },
            { id: 'finance-rules', name: "RBI/SEBI Rules & Rights", type: "Interactive", duration: "15 min", icon: Scale, status: "active" },
        ]
    },
    {
        level: 9,
        title: "Investment Mastery",
        description: "Grow your wealth with strategic investing.",
        nodes: [
            { id: 'investing-intro', name: "Investment Mindset", type: "Interactive", duration: "5 min", icon: PlayCircle, status: "active" },
            { id: 'fd-basics-mastery', name: "Debt Markets Mastery", type: "Interactive", duration: "5 min", icon: Landmark, status: "active" },
            { id: 'sip-mutual-funds', name: "SIP & Mutual Funds", type: "Interactive", duration: "15 min", icon: TrendingUp, status: "active" },
            { id: 'stock-market', name: "Stock Market Essentials", type: "Interactive", duration: "30 min", icon: Timer, status: "active" },
        ]
    }
];
