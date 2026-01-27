import React, { useState } from 'react';
import Image from 'next/image';
import { useWindowStore } from '@/store/useWindowStore';
import { DOCK_APPS } from '@/components/desktop/Dock';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LaunchpadApp() {
    const { openWindow, closeWindow } = useWindowStore();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredApps = DOCK_APPS.filter(app =>
        app.id !== 'launchpad' && // Don't show launchpad in launchpad
        app.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAppClick = (appId: string, externalUrl?: string) => {
        if (externalUrl) {
            window.open(externalUrl, '_blank');
        } else {
            // @ts-expect-error - appId is dynamic
            openWindow(appId);
        }
        // Close launchpad after selection
        closeWindow('launchpad');
    };

    return (
        <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-start pt-20 bg-black/40 backdrop-blur-[30px]"
            onClick={(e) => {
                // Clicking background closes launchpad
                if (e.target === e.currentTarget) closeWindow('launchpad');
            }}
        >
            {/* Search Bar */}
            <div className="relative mb-16 w-[300px] group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-white/80 transition-colors" size={16} />
                <input
                    type="text"
                    placeholder="Search"
                    autoFocus
                    className="w-full bg-white/10 border border-white/10 rounded-lg py-1.5 pl-10 pr-4 text-white text-[14px] placeholder:text-white/40 focus:outline-none focus:bg-white/15 focus:border-white/20 transition-all font-sf-text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* App Grid */}
            <div className="grid grid-cols-5 md:grid-cols-7 lg:grid-cols-8 gap-x-6 gap-y-8 max-w-5xl px-8 w-full">
                {filteredApps.map((app, index) => (
                    <motion.button
                        key={app.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: index * 0.03 }}
                        onClick={() => handleAppClick(app.id, app.externalUrl)}
                        className="flex flex-col items-center gap-2 group"
                    >
                        <div className="w-[52px] h-[52px] md:w-[58px] md:h-[58px] rounded-[14px] transition-transform duration-200 group-hover:scale-110 active:scale-95 active:opacity-80 relative shadow-xl">
                            {/* Icon Rendering Logic Matching Dock */}
                            {app.iconPath ? (
                                <Image
                                    src={app.iconPath}
                                    alt={app.label}
                                    width={58}
                                    height={58}
                                    className="w-full h-full object-contain drop-shadow-lg"
                                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.parentElement?.classList.add('bg-gray-800/50', 'backdrop-blur-md', 'border', 'border-white/10', 'flex', 'items-center', 'justify-center');
                                    }}
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-800/50 backdrop-blur-md border border-white/10 rounded-[16px] flex items-center justify-center">
                                    <app.icon className="w-1/2 h-1/2 text-white" />
                                </div>
                            )}
                            {/* Fallback Icon if Image Fails (handled via error logic above but can add overlay if needed) */}
                            {app.iconPath && (
                                <div className="absolute inset-0 flex items-center justify-center -z-10 bg-gray-600 rounded-[16px]">
                                    <app.icon className="w-1/2 h-1/2 text-white" />
                                </div>
                            )}
                        </div>
                        <span className="text-white text-[11px] font-medium tracking-tight drop-shadow-md font-sf-display">
                            {app.label}
                        </span>
                    </motion.button>
                ))}
            </div>

            {/* Pagination Dots (Visual Only for now) */}
            <div className="absolute bottom-10 flex gap-2">
                <div className="w-2 h-2 rounded-full bg-white opacity-100 shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                <div className="w-2 h-2 rounded-full bg-white/20" />
            </div>
        </div>
    );
}
