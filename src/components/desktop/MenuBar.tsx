"use client";

import React, { useState, useEffect } from 'react';
import { Apple, Wifi, Battery, Search, Command } from 'lucide-react';
import { useWindowStore } from '@/store/useWindowStore';

export default function MenuBar() {
    const [time, setTime] = useState<string>('');
    const [dateStr, setDateStr] = useState<string>('');
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const { toggleAbout, openWindow, closeWindow, toggleHero, toggleNotificationCenter } = useWindowStore();

    useEffect(() => {
        const updateTime = () => {
            const date = new Date();
            setTime(date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            }));
            setDateStr(date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            }));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        const handleClickOutside = () => setActiveMenu(null);
        window.addEventListener('click', handleClickOutside);
        return () => {
            clearInterval(interval);
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleMenuClick = (e: React.MouseEvent, menu: string) => {
        e.stopPropagation();
        setActiveMenu(activeMenu === menu ? null : menu);
    };

    const handleAction = (action: string) => {
        switch (action) {
            case 'about': toggleAbout(true); break;
            case 'restart': window.location.reload(); break;
            case 'sleep': document.documentElement.classList.toggle('grayscale'); break;

            // File
            case 'resume': window.open('/resume.pdf', '_blank'); break;
            case 'email': window.location.href = 'mailto:sskumar@umd.edu'; break;

            // View
            case 'showHero':
                toggleHero(true);
                localStorage.removeItem('hero-dismissed');
                break;
            case 'fullscreen':
                if (!document.fullscreenElement) document.documentElement.requestFullscreen();
                else document.exitFullscreen();
                break;

            // Go
            case 'github': window.open('https://github.com/sachinkumar25', '_blank'); break;
            case 'linkedin': window.open('https://www.linkedin.com/in/sachinkumar-io/', '_blank'); break;
            case 'projects': openWindow('projects'); break;

            // Help
            case 'repo': window.open('https://github.com/sachinkumar25/sachin-space', '_blank'); break;
            case 'terminal': openWindow('terminal'); break;
        }
        setActiveMenu(null);
    };

    const MenuItem = ({ label, action, shortcut }: { label: string, action: string, shortcut?: string }) => (
        <button
            onClick={(e) => { e.stopPropagation(); handleAction(action); }}
            className="w-full text-left px-4 py-1 hover:bg-blue-600 hover:text-white transition-colors flex justify-between group"
        >
            <span>{label}</span>
            {shortcut && <span className="text-gray-500 group-hover:text-white/80 ml-4">{shortcut}</span>}
        </button>
    );

    const MenuSeparator = () => <div className="h-[1px] bg-white/10 my-1 mx-2"></div>;

    return (
        <header className="absolute top-0 left-0 right-0 h-8 z-50 glass flex items-center justify-between px-4 text-xs font-medium select-none text-white/90">
            <div className="flex items-center gap-4 relative">
                {/* Apple Menu */}
                <button
                    onClick={(e) => handleMenuClick(e, 'apple')}
                    className={`hover:bg-white/10 p-1 -ml-1 rounded transition-colors ${activeMenu === 'apple' ? 'bg-white/10' : ''}`}
                >
                    <Apple size={16} fill="currentColor" />
                </button>
                {activeMenu === 'apple' && (
                    <div className="absolute top-8 left-0 w-56 bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl py-1 flex flex-col z-50">
                        <MenuItem label="About This Mac" action="about" />
                        <MenuSeparator />
                        <MenuItem label="System Settings..." action="none" />
                        <MenuSeparator />
                        <MenuItem label="Sleep" action="sleep" />
                        <MenuItem label="Restart..." action="restart" />
                        <MenuItem label="Shut Down..." action="restart" />
                    </div>
                )}

                <span className="font-bold cursor-default hidden sm:block">Finder</span>

                {/* File Menu */}
                <div className="relative">
                    <button onClick={(e) => handleMenuClick(e, 'file')} className={`px-2 py-1 rounded hover:bg-white/10 ${activeMenu === 'file' ? 'bg-white/10' : ''}`}>File</button>
                    {activeMenu === 'file' && (
                        <div className="absolute top-8 left-0 w-48 bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl py-1 flex flex-col z-50">
                            <MenuItem label="New Window" action="finder" shortcut="⌘N" />
                            <MenuItem label="New Folder" action="none" shortcut="⇧⌘N" />
                            <MenuSeparator />
                            <MenuItem label="Download Resume" action="resume" />
                            <MenuItem label="Email Me" action="email" />
                        </div>
                    )}
                </div>

                {/* Edit Menu (Placeholder) */}
                <div className="relative hidden sm:block">
                    <button onClick={(e) => handleMenuClick(e, 'edit')} className={`px-2 py-1 rounded hover:bg-white/10 ${activeMenu === 'edit' ? 'bg-white/10' : ''}`}>Edit</button>
                    {activeMenu === 'edit' && (
                        <div className="absolute top-8 left-0 w-48 bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl py-1 flex flex-col z-50">
                            <MenuItem label="Undo" action="none" shortcut="⌘Z" />
                            <MenuItem label="Redo" action="none" shortcut="⇧⌘Z" />
                            <MenuSeparator />
                            <MenuItem label="Cut" action="none" shortcut="⌘X" />
                            <MenuItem label="Copy" action="none" shortcut="⌘C" />
                            <MenuItem label="Paste" action="none" shortcut="⌘V" />
                        </div>
                    )}
                </div>

                {/* View Menu */}
                <div className="relative hidden sm:block">
                    <button onClick={(e) => handleMenuClick(e, 'view')} className={`px-2 py-1 rounded hover:bg-white/10 ${activeMenu === 'view' ? 'bg-white/10' : ''}`}>View</button>
                    {activeMenu === 'view' && (
                        <div className="absolute top-8 left-0 w-48 bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl py-1 flex flex-col z-50">
                            <MenuItem label="Enter Full Screen" action="fullscreen" shortcut="^⌘F" />
                            <MenuItem label="Toggle Grayscale" action="sleep" />
                            <MenuSeparator />
                            <MenuItem label="Show Summary Bar" action="showHero" />
                        </div>
                    )}
                </div>

                {/* Go Menu */}
                <div className="relative hidden sm:block">
                    <button onClick={(e) => handleMenuClick(e, 'go')} className={`px-2 py-1 rounded hover:bg-white/10 ${activeMenu === 'go' ? 'bg-white/10' : ''}`}>Go</button>
                    {activeMenu === 'go' && (
                        <div className="absolute top-8 left-0 w-48 bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl py-1 flex flex-col z-50">
                            <MenuItem label="Back" action="none" shortcut="⌘[" />
                            <MenuItem label="Forward" action="none" shortcut="⌘]" />
                            <MenuSeparator />
                            <MenuItem label="Projects" action="projects" />
                            <MenuItem label="GitHub" action="github" />
                            <MenuItem label="LinkedIn" action="linkedin" />
                        </div>
                    )}
                </div>

                {/* Window Menu (Placeholder) */}
                <div className="relative hidden sm:block">
                    <button onClick={(e) => handleMenuClick(e, 'window')} className={`px-2 py-1 rounded hover:bg-white/10 ${activeMenu === 'window' ? 'bg-white/10' : ''}`}>Window</button>
                    {activeMenu === 'window' && (
                        <div className="absolute top-8 left-0 w-48 bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl py-1 flex flex-col z-50">
                            <MenuItem label="Minimize" action="none" shortcut="⌘M" />
                            <MenuItem label="Zoom" action="none" />
                            <MenuSeparator />
                            <MenuItem label="Bring All to Front" action="none" />
                        </div>
                    )}
                </div>

                {/* Help Menu */}
                <div className="relative hidden sm:block">
                    <button onClick={(e) => handleMenuClick(e, 'help')} className={`px-2 py-1 rounded hover:bg-white/10 ${activeMenu === 'help' ? 'bg-white/10' : ''}`}>Help</button>
                    {activeMenu === 'help' && (
                        <div className="absolute top-8 left-0 w-56 bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl py-1 flex flex-col z-50">
                            <MenuItem label="Search" action="none" shortcut="⌘?" />
                            <MenuSeparator />
                            <MenuItem label="Terminal Tutorial" action="terminal" />
                            <MenuItem label="View Source Code" action="repo" />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-3">
                    <Battery size={18} className="text-white/80" />
                    <Wifi size={16} className="text-white/80" />
                    <Search size={14} className="text-white/80" />
                    <Command size={14} className="text-white/80" />
                </div>
                <div
                    className="flex gap-2 hover:bg-white/10 p-1 rounded transition-colors cursor-pointer"
                    onClick={() => toggleNotificationCenter()}
                >
                    <span className="hidden sm:block">{dateStr}</span>
                    <span>{time}</span>
                </div>
            </div>
        </header>
    );
}
