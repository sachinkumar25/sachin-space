import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Search, Lock, Plus, Share, BookOpen, Sidebar } from 'lucide-react';

export default function SafariApp() {
    const [url, setUrl] = useState('sachin.dev');
    const [iframeSrc, setIframeSrc] = useState<string | null>(null);

    const FAVORITES = [
        { id: 'google', label: 'Google', icon: 'G', color: 'bg-red-500', url: 'https://google.com' },
        { id: 'github', label: 'GitHub', icon: 'GH', color: 'bg-gray-800', url: 'https://github.com/sachinkumar25' },
        { id: 'linkedin', label: 'LinkedIn', icon: 'in', color: 'bg-blue-600', url: 'https://linkedin.com' },
        { id: 'portfolio', label: 'Portfolio', icon: 'S', color: 'bg-macos-blue', url: 'https://sachin.dev' },
    ];

    return (
        <div className="flex flex-col h-full bg-[#1e1e1e] text-white">
            {/* Toolbar */}
            <div className="h-12 bg-[#2C2C2C] flex items-center px-4 gap-4 border-b border-black/20 shrink-0">
                <div className="flex items-center gap-4 text-white/50">
                    <Sidebar size={18} />
                    <div className="flex gap-2">
                        <ArrowLeft size={18} className="hover:text-white transition-colors cursor-pointer" />
                        <ArrowRight size={18} className="hover:text-white transition-colors cursor-pointer" />
                    </div>
                </div>

                <div className="flex-1 max-w-2xl mx-auto flex items-center justify-center relative group">
                    <div className="w-full bg-[#1e1e1e] rounded-lg h-8 flex items-center justify-center text-sm text-white/90 shadow-sm border border-transparent group-hover:border-white/10 transition-all cursor-text relative">
                        <Lock size={12} className="text-white/50 mr-2" />
                        <span className="selection:bg-macos-blue selection:text-white">{url}</span>
                        <RotateCw size={12} className="absolute right-3 text-white/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>

                <div className="flex items-center gap-4 text-white/50">
                    <Share size={18} />
                    <Plus size={18} />
                    <BookOpen size={18} />
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-[#262626] overflow-y-auto relative">
                <div className="max-w-4xl mx-auto pt-20 px-8">
                    <div className="flex flex-col items-center mb-16">
                        <h1 className="text-4xl font-bold font-sf-display mb-8 text-white/90">Favorites</h1>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {FAVORITES.map(fav => (
                                <a
                                    key={fav.id}
                                    href={fav.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center gap-4 group"
                                >
                                    <div className={`w-16 h-16 rounded-2xl ${fav.color} flex items-center justify-center text-2xl font-bold shadow-lg group-hover:scale-105 transition-transform`}>
                                        {fav.icon}
                                    </div>
                                    <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{fav.label}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="text-center text-white/30 text-xs mt-auto">
                        Privacy Report: 0 trackers prevented because this is a simulation.
                    </div>
                </div>
            </div>
        </div>
    );
}
