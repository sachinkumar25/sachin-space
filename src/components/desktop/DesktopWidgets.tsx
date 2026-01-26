'use client';

import React from 'react';
import { Github, Linkedin, Mail, FileText, MapPin, Briefcase, GraduationCap, ExternalLink } from 'lucide-react';
import { useWindowStore } from '@/store/useWindowStore';

export default function DesktopWidgets() {
    const { openWindow, toggleAbout } = useWindowStore();

    return (
        <div className="absolute right-4 top-12 w-60 flex flex-col gap-3 z-10 pointer-events-none">
            {/* Profile Widget */}
            <div className="pointer-events-auto bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/10 p-4 shadow-2xl">
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0">
                        <img
                            src="/profile.jpg"
                            alt="Sachin"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">SK</div>';
                            }}
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-base truncate">Sachin Kumar</h3>
                        <p className="text-white/60 text-xs truncate">Full Stack Engineer</p>
                    </div>
                </div>

                {/* Info Pills */}
                <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-white/80 text-xs">
                        <Briefcase size={12} className="text-blue-400 flex-shrink-0" />
                        <span>SWE @ Capital One</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80 text-xs">
                        <GraduationCap size={12} className="text-purple-400 flex-shrink-0" />
                        <span>CS + Data Science Minor @ UMD</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80 text-xs">
                        <MapPin size={12} className="text-red-400 flex-shrink-0" />
                        <span>Washington D.C. Area</span>
                    </div>
                </div>

                {/* Status Badge */}
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg px-3 py-2 mb-3">
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-green-300 text-xs font-medium">Open to Summer 2026</span>
                    </div>
                </div>

                {/* More Info Button */}
                <button
                    onClick={() => toggleAbout(true)}
                    className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1"
                >
                    More About Me <ExternalLink size={10} />
                </button>
            </div>

            {/* Quick Links Widget */}
            <div className="pointer-events-auto bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/10 p-4 shadow-2xl">
                <h4 className="text-white/50 text-[10px] font-semibold uppercase tracking-wider mb-3">Quick Links</h4>

                <div className="grid grid-cols-2 gap-2">
                    <QuickLinkButton
                        icon={FileText}
                        label="Resume"
                        onClick={() => openWindow('resume')}
                        color="text-orange-400"
                    />
                    <QuickLinkButton
                        icon={Github}
                        label="GitHub"
                        onClick={() => window.open('https://github.com/sachinkumar25', '_blank')}
                        color="text-white"
                    />
                    <QuickLinkButton
                        icon={Linkedin}
                        label="LinkedIn"
                        onClick={() => window.open('https://linkedin.com/in/sachinsatishkumar', '_blank')}
                        color="text-blue-400"
                    />
                    <QuickLinkButton
                        icon={Mail}
                        label="Email"
                        onClick={() => window.open('mailto:sskumar@umd.edu', '_blank')}
                        color="text-green-400"
                    />
                </div>
            </div>
        </div>
    );
}

function QuickLinkButton({
    icon: Icon,
    label,
    onClick,
    color
}: {
    icon: React.ElementType;
    label: string;
    onClick: () => void;
    color: string;
}) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/15 rounded-lg transition-all group"
        >
            <Icon size={14} className={`${color} group-hover:scale-110 transition-transform`} />
            <span className="text-white/80 text-xs font-medium">{label}</span>
        </button>
    );
}
