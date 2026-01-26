import React, { useRef, useEffect } from 'react';
import { useWindowStore } from '@/store/useWindowStore';
import { FileText, Github, Linkedin, Mail, ExternalLink, Battery, Wifi } from 'lucide-react';
import Image from 'next/image';

export default function NotificationCenter() {
    const { isNotificationCenterOpen, toggleNotificationCenter, openWindow } = useWindowStore();
    const panelRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isNotificationCenterOpen && panelRef.current && !panelRef.current.contains(event.target as Node)) {
                // Don't close if clicking the clock (trigger) - handled by bubbling check or distinct event
                // Ideally the clock click stops propagation, but for safely, we just check if it's the specific panel area
                // Actually, simplest is to just let the desktop click handler close it if we want strictness,
                // but usually we want to click *anywhere* else.

                // Check if target is NOT inside the clock (which has specific ID or class ideally, but we'll rely on the menu bar handling its own clicks)
                // For now, let's just close it.
                toggleNotificationCenter(false);
            }
        };

        if (isNotificationCenterOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isNotificationCenterOpen, toggleNotificationCenter]);

    return (
        <div
            ref={panelRef}
            className={`fixed top-8 bottom-2 right-2 w-80 md:w-96 bg-[#1e1e1e]/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl z-40 transform transition-transform duration-300 ease-in-out flex flex-col overflow-hidden ${isNotificationCenterOpen ? 'translate-x-0' : 'translate-x-[110%]'
                }`}
        >
            <div className="flex-1 overflow-y-auto p-4 space-y-6">

                {/* Profile Widget */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/20">
                        <Image src="/profile.jpg" alt="Profile" fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg">Sachin Kumar</h3>
                        <p className="text-white/60 text-xs">SWE @ Capital One</p>
                        <div className="flex items-center gap-1.5 mt-1.5">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-green-400 text-[10px] font-medium tracking-wide uppercase">Online & Hiring</span>
                        </div>
                    </div>
                </div>

                {/* Quick Actions Grid */}
                <div>
                    <h4 className="text-xs font-semibold text-white/50 mb-2 uppercase tracking-wider px-1">Quick Actions</h4>
                    <div className="grid grid-cols-4 gap-2">
                        <ActionButton icon={FileText} label="Resume" onClick={() => openWindow('resume')} />
                        <ActionButton icon={Github} label="GitHub" onClick={() => window.open('https://github.com/sachinkumar25', '_blank')} />
                        <ActionButton icon={Linkedin} label="LinkedIn" onClick={() => window.open('https://linkedin.com/in/sachinkumar', '_blank')} />
                        <ActionButton icon={Mail} label="Email" onClick={() => window.location.href = 'mailto:sskumar@umd.edu'} />
                    </div>
                </div>

                {/* System Stats (Mimicking Widgets) */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-3 flex flex-col items-center justify-center gap-2 aspect-square">
                        <Battery className="text-blue-400" size={24} />
                        <span className="text-white/90 text-sm font-medium">100%</span>
                        <span className="text-white/50 text-[10px]">Battery</span>
                    </div>
                    <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-3 flex flex-col items-center justify-center gap-2 aspect-square">
                        <Wifi className="text-green-400" size={24} />
                        <span className="text-white/90 text-sm font-medium">Home WiFi</span>
                        <span className="text-white/50 text-[10px]">Connected</span>
                    </div>
                </div>

                {/* Featured Projects */}
                <div>
                    <h4 className="text-xs font-semibold text-white/50 mb-2 uppercase tracking-wider px-1">Featured Work</h4>
                    <div className="space-y-3">
                        <ProjectCard
                            title="EcoNavix"
                            desc="AI-powered waste management system"
                            color="bg-green-500"
                            onClick={() => openWindow('projects')}
                        />
                        <ProjectCard
                            title="RecruitRaptor"
                            desc="Intelligent resume analysis tool"
                            color="bg-purple-500"
                            onClick={() => openWindow('projects')}
                        />
                        <ProjectCard
                            title="Tributum"
                            desc="Modern tribute & memorial platform"
                            color="bg-amber-500"
                            onClick={() => openWindow('projects')}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}

function ActionButton({ icon: Icon, label, onClick }: { icon: React.ElementType, label: string, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center gap-2 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
        >
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <Icon size={16} className="text-white/90" />
            </div>
            <span className="text-[10px] text-white/70 font-medium truncate w-full text-center">{label}</span>
        </button>
    );
}

function ProjectCard({ title, desc, color, onClick }: { title: string, desc: string, color: string, onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className="group bg-white/5 hover:bg-white/10 transition-colors border border-white/5 rounded-xl p-3 flex items-center gap-3 cursor-pointer"
        >
            <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                <span className="text-white font-bold text-sm">{title[0]}</span>
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                    <h5 className="text-white text-sm font-medium truncate">{title}</h5>
                    <ExternalLink size={12} className="text-white/30 group-hover:text-white/60" />
                </div>
                <p className="text-white/50 text-xs truncate">{desc}</p>
            </div>
        </div>
    );
}
