import type { ElementType } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface NavItemProps {
    active: boolean;
    icon: ElementType;
    label: string;
    onClick: () => void;
    badge?: string;
}

export default function NavItem({ active, icon: Icon, label, onClick, badge }: NavItemProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center justify-between w-full px-5 py-3.5 rounded-2xl transition-all group relative overflow-hidden text-left",
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
