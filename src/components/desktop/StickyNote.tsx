'use client';

import React, { useState } from 'react';
import { X, Pin, Mail, FileText, Github } from 'lucide-react';
import { useWindowStore } from '@/store/useWindowStore';

export default function StickyNote() {
    const [isVisible, setIsVisible] = useState(true);
    const [isPinned, setIsPinned] = useState(true);
    const { openWindow } = useWindowStore();

    if (!isVisible) return null;

    return (
        <div
            className={`absolute bottom-24 right-4 w-64 z-20 transition-all duration-300 ${
                isPinned ? 'opacity-100' : 'opacity-80 hover:opacity-100'
            }`}
        >
            {/* Note Shadow */}
            <div className="absolute inset-0 bg-black/20 rounded-lg translate-y-1 translate-x-1 blur-sm" />

            {/* Note Body */}
            <div className="relative bg-gradient-to-b from-amber-300 to-amber-400 rounded-lg shadow-lg overflow-hidden">
                {/* Header Bar */}
                <div className="flex items-center justify-between px-3 py-1.5 bg-amber-500/50">
                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={() => setIsVisible(false)}
                            className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors flex items-center justify-center group"
                        >
                            <X size={8} className="text-red-900 opacity-0 group-hover:opacity-100" />
                        </button>
                        <button
                            onClick={() => setIsPinned(!isPinned)}
                            className={`w-3 h-3 rounded-full transition-colors flex items-center justify-center ${
                                isPinned ? 'bg-green-500' : 'bg-yellow-600'
                            }`}
                        >
                            <Pin size={6} className="text-white/70" />
                        </button>
                    </div>
                    <span className="text-amber-900/60 text-[9px] font-medium">Quick Reference</span>
                </div>

                {/* Note Content */}
                <div className="p-3 text-amber-950">
                    {/* Title */}
                    <h3 className="font-bold text-sm mb-2 border-b border-amber-500/30 pb-1">
                        Sachin Kumar
                    </h3>

                    {/* Quick Info */}
                    <div className="space-y-1 text-xs mb-3 font-medium">
                        <p>SWE @ Capital One</p>
                        <p>CS + Data Science Minor @ UMD '26</p>
                        <p className="text-amber-800">sskumar@umd.edu</p>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-amber-500/30 my-2" />

                    {/* Quick Actions */}
                    <div className="flex items-center gap-2">
                        <StickyButton
                            icon={FileText}
                            label="Resume"
                            onClick={() => openWindow('resume')}
                        />
                        <StickyButton
                            icon={Github}
                            label="GitHub"
                            onClick={() => window.open('https://github.com/sachinkumar25', '_blank')}
                        />
                        <StickyButton
                            icon={Mail}
                            label="Contact"
                            onClick={() => openWindow('messages')}
                        />
                    </div>

                    {/* Handwritten Note Effect */}
                    <p className="mt-3 text-[10px] text-amber-800/70 italic">
                        Let's build something great together!
                    </p>
                </div>

                {/* Folded Corner Effect */}
                <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[16px] border-l-transparent border-b-[16px] border-b-amber-200/80" />
            </div>
        </div>
    );
}

function StickyButton({
    icon: Icon,
    label,
    onClick
}: {
    icon: React.ElementType;
    label: string;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-1 px-2 py-1 bg-amber-500/30 hover:bg-amber-500/50 rounded text-amber-900 text-[10px] font-semibold transition-colors"
        >
            <Icon size={10} />
            {label}
        </button>
    );
}
