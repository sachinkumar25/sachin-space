import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, X } from 'lucide-react';

interface ShortcutsOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ShortcutsOverlay({ isOpen, onClose }: ShortcutsOverlayProps) {
    // Basic Shortcuts List
    const shortcuts = [
        { keys: ['⌘', 'P'], label: 'Open Projects' },
        { keys: ['⌘', 'R'], label: 'Open Resume' },
        { keys: ['⌘', 'I'], label: 'About Me' },
        { keys: ['?'], label: 'Toggle Shortcuts' },
        { keys: ['Esc'], label: 'Close Active Window' },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-6 w-full max-w-md pointer-events-auto relative overflow-hidden"
                    >

                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <Command className="text-gray-500" />
                                Keyboard Shortcuts
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-1 hover:bg-black/5 rounded-full transition-colors"
                            >
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            {shortcuts.map((s, i) => (
                                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                                    <span className="text-gray-600 font-medium">{s.label}</span>
                                    <div className="flex items-center gap-1">
                                        {s.keys.map((k, j) => (
                                            <kbd
                                                key={j}
                                                className="bg-white border border-gray-200 shadow-sm rounded-lg px-2.5 py-1 text-sm font-sans font-semibold text-gray-500 min-w-[32px] text-center"
                                            >
                                                {k}
                                            </kbd>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-400">Press <kbd className="font-sans">?</kbd> to toggle this menu anytime.</p>
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
