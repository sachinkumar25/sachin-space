"use client";

import React, { useState, useEffect } from 'react';
import { FileText, Github, Linkedin, X } from 'lucide-react';
import { useWindowStore } from '@/store/useWindowStore';

export default function HeroBar() {
    const { openWindow, isHeroVisible, toggleHero } = useWindowStore();

    useEffect(() => {
        // Check localStorage on mount
        const dismissed = localStorage.getItem('hero-dismissed');
        if (dismissed) {
            toggleHero(false);
        } else {
            toggleHero(true);
        }
    }, [toggleHero]);

    const handleDismiss = () => {
        toggleHero(false);
        localStorage.setItem('hero-dismissed', 'true');
    };

    if (!isHeroVisible) return null;

    return (
        <div className="absolute top-10 md:top-12 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-full py-3 px-6 flex items-center justify-between text-white animate-in slide-in-from-top-4 fade-in duration-500">
            {/* Info Section */}
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="font-semibold text-shadow-sm">Sachin Kumar</span>
                </div>
                <span className="hidden md:inline text-white/40">•</span>
                <span className="text-white/90">SWE @ Capital One</span>
                <span className="hidden md:inline text-white/40">•</span>
                <span className="text-blue-200 font-medium">Open to Summer 2026</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 ml-4">
                <div className="h-4 w-px bg-white/20 hidden sm:block" />

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => openWindow('resume')}
                        className="p-1.5 hover:bg-white/10 rounded-full transition-colors group relative"
                        title="View Resume"
                    >
                        <FileText size={18} className="text-white/80 group-hover:text-white" />
                    </button>
                    <button
                        onClick={() => window.open('https://github.com/sachinkumar25', '_blank')}
                        className="p-1.5 hover:bg-white/10 rounded-full transition-colors group"
                        title="GitHub"
                    >
                        <Github size={18} className="text-white/80 group-hover:text-white" />
                    </button>
                    <button
                        onClick={() => window.open('https://linkedin.com/in/sachinkumar', '_blank')}
                        className="p-1.5 hover:bg-white/10 rounded-full transition-colors group"
                        title="LinkedIn"
                    >
                        <Linkedin size={18} className="text-white/80 group-hover:text-white" />
                    </button>
                </div>

                <div className="h-4 w-px bg-white/20" />

                <button
                    onClick={handleDismiss}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                    <X size={16} className="text-white/60 hover:text-white" />
                </button>
            </div>
        </div>
    );
}
