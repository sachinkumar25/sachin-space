import React, { useState } from 'react';
import { useSystemStore } from '@/store/useSystemStore';
import { Monitor, Moon, Sun, Layout, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WALLPAPERS = [
    { id: 'catalina', url: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=3870&auto=format&fit=crop', label: 'Catalina' },
    { id: 'bigsur', url: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2940&auto=format&fit=crop', label: 'Big Sur' },
    { id: 'monterey', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2940&auto=format&fit=crop', label: 'Monterey' },
    { id: 'ventura', url: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=2940&auto=format&fit=crop', label: 'Ventura' },
    { id: 'sonoma', url: 'https://images.unsplash.com/photo-1501854140884-074cf27f7386?q=80&w=2940&auto=format&fit=crop', label: 'Sonoma' },
    { id: 'sequoia', url: 'https://images.unsplash.com/photo-1518098268026-4e187743369b?q=80&w=2940&auto=format&fit=crop', label: 'Sequoia' },
];

export default function SettingsApp() {
    const { wallpaper, dockSize, isDark, setWallpaper, setDockSize, toggleTheme } = useSystemStore();
    const [activeTab, setActiveTab] = useState<'wallpaper' | 'display' | 'about'>('wallpaper');

    return (
        <div className="flex h-full bg-[#1e1e1e] text-white font-sf-text">
            {/* Sidebar */}
            <div className="w-[180px] bg-[#2C2C2C]/50 backdrop-blur-xl border-r border-white/10 flex flex-col pt-8 px-2 space-y-1">
                <SidebarItem icon={Monitor} label="Wallpaper" active={activeTab === 'wallpaper'} onClick={() => setActiveTab('wallpaper')} />
                <SidebarItem icon={Layout} label="Dock & Menu" active={activeTab === 'display'} onClick={() => setActiveTab('display')} />
                <SidebarItem icon={Info} label="About" active={activeTab === 'about'} onClick={() => setActiveTab('about')} />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-8 py-8">
                <AnimatePresence mode="wait">
                    {activeTab === 'wallpaper' && (
                        <motion.div
                            key="wallpaper"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-6"
                        >
                            <h2 className="text-lg font-semibold border-b border-white/10 pb-2 mb-4">Wallpaper</h2>

                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                {WALLPAPERS.map(wp => (
                                    <button
                                        key={wp.id}
                                        onClick={() => setWallpaper(wp.url)}
                                        className={`group relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${wallpaper === wp.url ? 'border-macos-blue' : 'border-transparent hover:border-white/20'}`}
                                    >
                                        <img src={wp.url} alt={wp.label} className="w-full h-full object-cover" />
                                        <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-sm py-1 px-2 text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                            {wp.label}
                                        </div>
                                        {wallpaper === wp.url && (
                                            <div className="absolute inset-0 ring-2 ring-inset ring-macos-blue rounded-lg pointer-events-none" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'display' && (
                        <motion.div
                            key="display"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-8"
                        >
                            <h2 className="text-lg font-semibold border-b border-white/10 pb-2 mb-6">Dock & Menu Bar</h2>

                            {/* Dock Size */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-white/80">Dock Size</label>
                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                                    <span className="text-xs text-white/50">Small</span>
                                    <input
                                        type="range"
                                        min="0.5"
                                        max="1.5"
                                        step="0.1"
                                        value={dockSize}
                                        onChange={(e) => setDockSize(parseFloat(e.target.value))}
                                        className="flex-1 accent-macos-blue h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <span className="text-xs text-white/50">Large</span>
                                </div>
                            </div>

                            {/* Theme Toggle */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-white/80">Appearance</label>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => !isDark && toggleTheme()}
                                        className={`flex-1 p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${isDark ? 'bg-white/10 border-macos-blue' : 'bg-white/5 border-transparent hover:bg-white/10'}`}
                                    >
                                        <Moon size={24} className={isDark ? 'text-macos-blue' : 'text-white/60'} />
                                        <span className="text-xs font-medium">Dark Mode</span>
                                    </button>
                                    <button
                                        onClick={() => isDark && toggleTheme()}
                                        className={`flex-1 p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${!isDark ? 'bg-white/90 text-black border-macos-blue' : 'bg-white/5 border-transparent hover:bg-white/10'}`}
                                    >
                                        <Sun size={24} className={!isDark ? 'text-orange-500' : 'text-white/60'} />
                                        <span className="text-xs font-medium">Light Mode</span>
                                    </button>
                                </div>
                                <p className="text-[11px] text-white/40 mt-1 pl-1">
                                    * Theme toggling primarily affects system windows. Some apps are dark-only by design.
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'about' && (
                        <motion.div
                            key="about"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex flex-col items-center justify-center pt-8 text-center"
                        >
                            <img src="/icons/launchpad.png" alt="OS Logo" className="w-24 h-24 mb-6 shadow-2xl rounded-[22px]" />
                            <h1 className="text-2xl font-bold mb-1 font-sf-display">SachinOS</h1>
                            <p className="text-white/50 text-sm mb-6">Version 15.0 (Sequoia)</p>

                            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-left text-sm bg-white/5 p-6 rounded-xl border border-white/5 w-full max-w-sm">
                                <span className="text-white/40">Processor</span>
                                <span>Neural Chip M4</span>
                                <span className="text-white/40">Memory</span>
                                <span>64 GB</span>
                                <span className="text-white/40">Graphics</span>
                                <span>Liquid Retina XDR</span>
                                <span className="text-white/40">Serial Number</span>
                                <span className="font-mono text-xs pt-0.5 opacity-80">SC-2025-XD</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function SidebarItem({ icon: Icon, label, active, onClick }: { icon: React.ElementType, label: string, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-md transition-all text-left group ${active ? 'bg-macos-blue text-white shadow-sm' : 'hover:bg-white/5 text-white/70'}`}
        >
            <Icon size={16} className={active ? 'text-white' : 'text-white/50 group-hover:text-white/80'} />
            <span className="text-[13px] font-medium">{label}</span>
        </button>
    )
}
