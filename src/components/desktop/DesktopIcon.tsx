'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DesktopIconProps {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    imageSrc?: string;
    className?: string;
}

export default function DesktopIcon({ label, icon: Icon, onClick, imageSrc, className }: DesktopIconProps) {
    return (
        <div
            className={`flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group select-none ${className || 'w-24'}`}
            onClick={onClick}
        >
            <div className={`
                ${imageSrc ? 'w-24 h-24 rounded-full border-2 border-white/20 shadow-2xl' : 'w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg'} 
                flex items-center justify-center text-white group-active:scale-95 transition-transform overflow-hidden bg-black/20
            `}>
                {imageSrc ? (
                    <img src={imageSrc} alt={label} className="w-full h-full object-cover" />
                ) : (
                    <Icon size={32} />
                )}
            </div>
            <span className="text-white text-sm font-medium text-center drop-shadow-md px-2 py-0.5 rounded-md group-hover:bg-black/40 backdrop-blur-sm transition-colors">
                {label}
            </span>
        </div>
    );
}
