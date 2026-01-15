import React from 'react';
import { Files, Search, GitGraph, Play, LayoutGrid, Settings, UserCircle } from 'lucide-react';
import clsx from 'clsx';

interface ActivityBarProps {
    activeView: string;
    onViewChange: (view: string) => void;
}

export default function ActivityBar({ activeView, onViewChange }: ActivityBarProps) {
    const topIcons = [
        { id: 'explorer', icon: Files },
        { id: 'search', icon: Search },
        { id: 'git', icon: GitGraph },
        { id: 'debug', icon: Play },
        { id: 'extensions', icon: LayoutGrid },
    ];

    return (
        <div className="w-12 bg-[#333333] flex flex-col justify-between items-center py-2 shrink-0 select-none">
            <div className="flex flex-col gap-2 w-full">
                {topIcons.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onViewChange(item.id)}
                        className={clsx(
                            "w-full h-12 flex items-center justify-center relative hover:text-white transition-colors",
                            activeView === item.id ? "text-white border-l-2 border-white" : "text-[#858585] border-l-2 border-transparent"
                        )}
                    >
                        <item.icon size={24} strokeWidth={1.5} />
                    </button>
                ))}
            </div>

            <div className="flex flex-col gap-4 mb-2 w-full">
                <button className="w-full h-12 flex items-center justify-center text-[#858585] hover:text-white">
                    <UserCircle size={24} strokeWidth={1.5} />
                </button>
                <button className="w-full h-12 flex items-center justify-center text-[#858585] hover:text-white">
                    <Settings size={24} strokeWidth={1.5} />
                </button>
            </div>
        </div>
    );
}
