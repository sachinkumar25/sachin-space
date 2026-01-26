'use client';

import React, { useState, useCallback } from 'react';
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

// Snap zone types
type SnapZone = 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | null;

// Snap detection threshold (pixels from edge)
const SNAP_THRESHOLD = 20;
const MENU_BAR_HEIGHT = 32;
const DOCK_HEIGHT = 80;

// Get snap zone dimensions
const getSnapZoneDimensions = (zone: SnapZone) => {
    if (typeof globalThis.window === 'undefined') return null;

    const screenWidth = globalThis.window.innerWidth;
    const screenHeight = globalThis.window.innerHeight;
    const usableHeight = screenHeight - MENU_BAR_HEIGHT - DOCK_HEIGHT;

    switch (zone) {
        case 'left':
            return { x: 0, y: MENU_BAR_HEIGHT, width: screenWidth / 2, height: usableHeight };
        case 'right':
            return { x: screenWidth / 2, y: MENU_BAR_HEIGHT, width: screenWidth / 2, height: usableHeight };
        case 'top':
            return { x: 0, y: MENU_BAR_HEIGHT, width: screenWidth, height: usableHeight }; // Maximize
        case 'top-left':
            return { x: 0, y: MENU_BAR_HEIGHT, width: screenWidth / 2, height: usableHeight / 2 };
        case 'top-right':
            return { x: screenWidth / 2, y: MENU_BAR_HEIGHT, width: screenWidth / 2, height: usableHeight / 2 };
        case 'bottom-left':
            return { x: 0, y: MENU_BAR_HEIGHT + usableHeight / 2, width: screenWidth / 2, height: usableHeight / 2 };
        case 'bottom-right':
            return { x: screenWidth / 2, y: MENU_BAR_HEIGHT + usableHeight / 2, width: screenWidth / 2, height: usableHeight / 2 };
        default:
            return null;
    }
};

// Detect which snap zone the cursor is in
const detectSnapZone = (x: number, y: number): SnapZone => {
    if (typeof globalThis.window === 'undefined') return null;

    const screenWidth = globalThis.window.innerWidth;
    const screenHeight = globalThis.window.innerHeight;

    const nearLeft = x < SNAP_THRESHOLD;
    const nearRight = x > screenWidth - SNAP_THRESHOLD;
    const nearTop = y < MENU_BAR_HEIGHT + SNAP_THRESHOLD;
    const nearBottom = y > screenHeight - DOCK_HEIGHT - SNAP_THRESHOLD;

    // Corner detection (priority over edges)
    if (nearLeft && nearTop) return 'top-left';
    if (nearRight && nearTop) return 'top-right';
    if (nearLeft && nearBottom) return 'bottom-left';
    if (nearRight && nearBottom) return 'bottom-right';

    // Edge detection
    if (nearLeft) return 'left';
    if (nearRight) return 'right';
    if (nearTop) return 'top';

    return null;
};

export default function WindowFrame({ window, children }: WindowFrameProps) {
    const { focusWindow, setWindowPosition, setWindowSize, toggleMaximize } = useWindowStore();
    const [snapZone, setSnapZone] = useState<SnapZone>(null);
    const [isDragging, setIsDragging] = useState(false);

    const isMaximized = window.isMaximized;

    // Mobile Lite Mode Logic
    const isMobile = typeof globalThis.window !== 'undefined' && globalThis.window.innerWidth < 768;

    // Force maximize behavior on mobile
    const effectivePosition = (isMaximized || isMobile) ? { x: 0, y: 32 } : window.position;
    const effectiveSize = (isMaximized || isMobile) ? { width: '100vw', height: 'calc(100vh - 96px)' } : window.size;
    const effectiveDisableDragging = isMaximized || isMobile;
    const effectiveEnableResizing = !isMaximized && !isMobile;

    const handleDragStart = useCallback(() => {
        setIsDragging(true);
        focusWindow(window.id as AppID);
    }, [focusWindow, window.id]);

    const handleDrag = useCallback((e: any, d: any) => {
        // Detect snap zone based on cursor position
        const zone = detectSnapZone(d.x + 200, d.y + 20); // Offset for window header center
        setSnapZone(zone);
    }, []);

    const handleDragStop = useCallback((e: any, d: any) => {
        setIsDragging(false);

        // If we're in a snap zone, apply the snap
        if (snapZone) {
            const dimensions = getSnapZoneDimensions(snapZone);
            if (dimensions) {
                setWindowPosition(window.id as AppID, { x: dimensions.x, y: dimensions.y });
                setWindowSize(window.id as AppID, { width: dimensions.width, height: dimensions.height });
            }
        } else {
            // Normal drag end
            setWindowPosition(window.id as AppID, { x: d.x, y: d.y });
        }

        setSnapZone(null);
    }, [snapZone, setWindowPosition, setWindowSize, window.id]);

    // Get snap preview dimensions
    const snapPreview = snapZone ? getSnapZoneDimensions(snapZone) : null;

    return (
        <AnimatePresence>
            {window.isOpen && !window.isMinimized && (
                <>
                    {/* Snap Zone Preview */}
                    <AnimatePresence>
                        {isDragging && snapPreview && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                className="fixed pointer-events-none z-[9998]"
                                style={{
                                    left: snapPreview.x,
                                    top: snapPreview.y,
                                    width: snapPreview.width,
                                    height: snapPreview.height,
                                }}
                            >
                                <div className="w-full h-full rounded-xl bg-blue-500/20 border-2 border-blue-500/50 backdrop-blur-sm" />
                            </motion.div>
                        )}
                    </AnimatePresence>

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
                        onDragStart={handleDragStart}
                        onDrag={handleDrag}
                        onDragStop={handleDragStop}
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
                        className="flex flex-col pointer-events-auto"
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
                                onDoubleClick={() => toggleMaximize(window.id as AppID)}
                            >
                                <TrafficLights id={window.id as AppID} />

                                <div className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-gray-400 flex items-center gap-2">
                                    {window.title}
                                </div>

                                <div className="w-[52px]" /> {/* Spacer for symmetry */}
                            </div>

                            {/* Window Content */}
                            <div
                                className="flex-1 overflow-hidden relative text-white"
                                onPointerDownCapture={() => focusWindow(window.id as AppID)}
                            >
                                {children}
                            </div>
                        </motion.div>
                    </Rnd>
                </>
            )}
        </AnimatePresence>
    );
}
