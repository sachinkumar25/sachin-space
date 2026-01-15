"use client";

import React, { useState, useEffect } from 'react';
import { Apple, Wifi, Battery, Search, Command } from 'lucide-react';

export default function MenuBar() {
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const date = new Date();
            setTime(date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            }));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="absolute top-0 left-0 right-0 h-8 z-50 glass flex items-center justify-between px-4 text-xs font-medium select-none text-white/90">
            <div className="flex items-center gap-4">
                <button className="hover:bg-white/10 p-1 -ml-1 rounded transition-colors">
                    <Apple size={16} fill="currentColor" />
                </button>
                <span className="font-bold cursor-default hidden sm:block">Finder</span>
                <div className="hidden sm:flex gap-4">
                    <span className="cursor-default hover:text-white transition-colors">File</span>
                    <span className="cursor-default hover:text-white transition-colors">Edit</span>
                    <span className="cursor-default hover:text-white transition-colors">View</span>
                    <span className="cursor-default hover:text-white transition-colors">Go</span>
                    <span className="cursor-default hover:text-white transition-colors">Window</span>
                    <span className="cursor-default hover:text-white transition-colors">Help</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                    <Battery size={18} className="text-white/80" />
                    <Wifi size={16} className="text-white/80" />
                    <Search size={14} className="text-white/80" />
                    <Command size={14} className="text-white/80" />
                </div>
                <span>{time}</span>
            </div>
        </header>
    );
}
