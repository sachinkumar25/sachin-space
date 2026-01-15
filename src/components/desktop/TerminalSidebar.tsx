import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, PanelRightOpen, PanelRightClose } from 'lucide-react';
import TerminalApp from '../apps/Terminal/Terminal';
import { useWindowStore } from '@/store/useWindowStore';

export default function TerminalSidebar() {
    const { windows, closeWindow, minimizeWindow, openWindow } = useWindowStore();
    const isOpen = windows['terminal']?.isOpen;
    const isMinimized = windows['terminal']?.isMinimized;

    // Optional: auto-open on mount or check local storage if user wants it persistent
    // Auto-open for "permanent" feel
    useEffect(() => {
        if (!isOpen && !isMinimized) {
            openWindow('terminal');
        }
    }, []);

    // If it's "minimized", we hide it but keep state? 
    // Actually, "minimized" in sidebar context usually means closed or collapsed to a small icon.
    // For this implementation, "minimized" = hidden.

    const isVisible = isOpen && !isMinimized;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="absolute top-8 bottom-20 right-0 w-[400px] md:w-[500px] z-[200] shadow-2xl flex flex-col pointer-events-auto"
                >
                    {/* Glassmorphism Container */}
                    <div className="flex-1 flex flex-col bg-[#1a1b26]/95 backdrop-blur-xl border-l border-white/10 overflow-hidden rounded-l-2xl">
                        {/* Header */}
                        <div className="h-10 flex items-center justify-between px-4 bg-white/5 border-b border-white/5 shrink-0 drag-handle">
                            <span className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                <PanelRightOpen size={14} />
                                Terminal Assistant
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => minimizeWindow('terminal')}
                                    className="p-1.5 hover:bg-white/10 rounded-md text-gray-400 hover:text-white transition-colors"
                                    title="Hide"
                                >
                                    <Minus size={14} />
                                </button>
                                <button
                                    onClick={() => closeWindow('terminal')}
                                    className="p-1.5 hover:bg-red-500/20 rounded-md text-gray-400 hover:text-red-400 transition-colors"
                                    title="Close"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Terminal Content */}
                        <div className="flex-1 relative">
                            <TerminalApp />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
