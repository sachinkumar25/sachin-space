'use client';

import React from 'react';
import { Rnd } from 'react-rnd';
import { WindowState } from '@/types/window';
import { useWindowStore } from '@/store/useWindowStore';
import TrafficLights from './TrafficLights';
import { AppID } from '@/types/app';
import { motion, AnimatePresence } from 'framer-motion';

interface WindowFrameProps {
    window: WindowState;
    children: React.ReactNode;
}

export default function WindowFrame({ window, children }: WindowFrameProps) {
    const { focusWindow, setWindowPosition, setWindowSize } = useWindowStore();

    // If maximized, we might want to disable dragging/resizing or change styles.
    // For simplicity in speed run, we'll keep basic logic. 
    // Real maximization often involves setting position to 0,0 and size to 100vw/100vh.

    const isMaximized = window.isMaximized;

    // Mobile Lite Mode Logic
    // We access globalThis.window because 'window' prop shadows the global object
    const isMobile = typeof globalThis.window !== 'undefined' && globalThis.window.innerWidth < 768;

    // Force maximize behavior on mobile
    const effectivePosition = (isMaximized || isMobile) ? { x: 0, y: 32 } : window.position;
    const effectiveSize = (isMaximized || isMobile) ? { width: '100vw', height: 'calc(100vh - 110px)' } : window.size; // 110px leaves room for dock + menu
    const effectiveDisableDragging = isMaximized || isMobile;
    const effectiveEnableResizing = !isMaximized && !isMobile;

    return (
        <AnimatePresence>
            {window.isOpen && !window.isMinimized && (
                <Rnd
                    default={{
                        x: window.position.x,
                        y: window.position.y,
                        width: window.size.width,
                        height: window.size.height,
                    }}
                    position={effectivePosition as any}
                    size={effectiveSize as any}
                    disableDragging={effectiveDisableDragging}
                    enableResizing={effectiveEnableResizing}
                    onDragStart={() => focusWindow(window.id as AppID)}
                    onDragStop={(e, d) => {
                        setWindowPosition(window.id as AppID, { x: d.x, y: d.y });
                    }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                        setWindowSize(window.id as AppID, {
                            width: parseInt(ref.style.width),
                            height: parseInt(ref.style.height),
                        });
                        setWindowPosition(window.id as AppID, position);
                    }}
                    minWidth={300}
                    minHeight={200}
                    bounds="parent"
                    dragHandleClassName="window-header"
                    cancel=".nodrag"
                    style={{ zIndex: window.zIndex }}
                    className="flex flex-col"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`w-full h-full flex flex-col rounded-xl overflow-hidden backdrop-blur-xl bg-gray-900/80 ring-1 ring-black/10 transition-all duration-200 pointer-events-auto
                        ${window.zIndex >= useWindowStore.getState().maxZIndex ? 'border-white/20 shadow-2xl' : 'border-white/5 shadow-lg opacity-90'}`}
                        onClick={() => focusWindow(window.id as AppID)}
                    >
                        {/* Header / Title Bar */}
                        <div
                            className="window-header h-10 shrink-0 flex items-center justify-between px-4 bg-gradient-to-b from-white/10 to-transparent border-b border-white/5 cursor-default select-none group"
                            onDoubleClick={() => useWindowStore.getState().toggleMaximize(window.id as AppID)}
                        >
                            <TrafficLights id={window.id as AppID} />

                            <div className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-gray-400 flex items-center gap-2">
                                {/* Optional: Add icon here if available in WindowState */}
                                {window.title}
                            </div>

                            <div className="w-[52px]" /> {/* Spacer for symmetry with traffic lights */}
                        </div>

                        {/* Window Content */}
                        <div
                            className="flex-1 overflow-hidden relative text-white"
                            onPointerDownCapture={(e) => {
                                // Important: We want clicking content to focus the window, 
                                // BUT we want to stop react-rnd from thinking this is a drag start 
                                // (even though dragHandleClassName handles that, safety first)
                                focusWindow(window.id as AppID);
                            }}
                        >
                            {children}

                            {/* Overlay to catch clicks and focus window when inactive */}
                            {/* We can skip this if the whole window focuses on click, which is handled by the container onClick */}
                        </div>
                    </motion.div>
                </Rnd>
            )}
        </AnimatePresence>
    );
}
