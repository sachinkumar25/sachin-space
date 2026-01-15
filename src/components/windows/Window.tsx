"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Minus, X, Maximize2 } from 'lucide-react';
import clsx from 'clsx';

interface WindowProps {
    id: string;
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    initialPosition?: { x: number; y: number };
    initialSize?: { width: number; height: number };
    isActive?: boolean;
    onClick?: () => void;
}

export default function Window({
    title,
    children,
    isOpen,
    onClose,
    initialPosition = { x: 100, y: 100 },
    initialSize = { width: 600, height: 400 },
    isActive = false,
    onClick
}: WindowProps) {
    if (!isOpen) return null;

    return (
        <motion.div
            drag
            dragMomentum={false}
            initial={initialPosition}
            className={clsx(
                "absolute flex flex-col rounded-xl overflow-hidden shadow-window glass border border-white/10 transition-shadow duration-200",
                isActive ? "z-40 shadow-2xl" : "z-10"
            )}
            style={{
                width: initialSize.width,
                height: initialSize.height,
            }}
            onClick={onClick}
        >
            {/* Title Bar */}
            <div className="h-8 bg-gradient-to-b from-white/10 to-transparent flex items-center justify-between px-3 cursor-default" onPointerDownCapture={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-2 group">
                    <button
                        onClick={(e) => { e.stopPropagation(); onClose(); }}
                        className="w-3 h-3 rounded-full bg-macos-red flex items-center justify-center text-black/50 hover:text-black"
                    >
                        <X size={8} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                    <button className="w-3 h-3 rounded-full bg-macos-yellow flex items-center justify-center text-black/50 hover:text-black">
                        <Minus size={8} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                    <button className="w-3 h-3 rounded-full bg-macos-green flex items-center justify-center text-black/50 hover:text-black">
                        <Maximize2 size={6} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 text-xs font-semibold text-white/80 opacity-90 pointer-events-none">
                    {title}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto bg-black/40 relative">
                {children}
            </div>
        </motion.div>
    );
}
