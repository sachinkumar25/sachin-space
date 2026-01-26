'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface DraggableDesktopIconProps {
    id: string;
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    imageSrc?: string;
    initialPosition?: { x: number; y: number };
    gridSize?: number;
}

// Grid snapping helper
const snapToGrid = (value: number, gridSize: number) => {
    return Math.round(value / gridSize) * gridSize;
};

// Get saved positions from localStorage
const getSavedPositions = (): Record<string, { x: number; y: number }> => {
    if (typeof window === 'undefined') return {};
    try {
        const saved = localStorage.getItem('desktop-icon-positions');
        return saved ? JSON.parse(saved) : {};
    } catch {
        return {};
    }
};

// Save position to localStorage
const savePosition = (id: string, position: { x: number; y: number }) => {
    try {
        const positions = getSavedPositions();
        positions[id] = position;
        localStorage.setItem('desktop-icon-positions', JSON.stringify(positions));
    } catch {
        // Ignore localStorage errors
    }
};

export default function DraggableDesktopIcon({
    id,
    label,
    icon: Icon,
    onClick,
    imageSrc,
    initialPosition = { x: 0, y: 0 },
    gridSize = 100
}: DraggableDesktopIconProps) {
    const [position, setPosition] = useState(() => {
        const saved = getSavedPositions()[id];
        return saved || initialPosition;
    });
    const [isDragging, setIsDragging] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const hasMoved = useRef(false);

    // Motion values for smooth dragging
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Reset motion values when position changes (after drag ends)
    useEffect(() => {
        x.set(0);
        y.set(0);
    }, [position, x, y]);

    const handleDragStart = () => {
        setIsDragging(true);
        hasMoved.current = false;
    };

    const handleDrag = () => {
        // Check if we've moved enough to count as a drag
        if (Math.abs(x.get()) > 5 || Math.abs(y.get()) > 5) {
            hasMoved.current = true;
        }
    };

    const handleDragEnd = () => {
        setIsDragging(false);

        // Calculate new position from current position + drag offset
        const dragOffsetX = x.get();
        const dragOffsetY = y.get();

        // Snap to grid
        const newX = snapToGrid(position.x + dragOffsetX, gridSize);
        const newY = snapToGrid(position.y + dragOffsetY, gridSize);

        // Clamp to viewport bounds
        const maxX = (typeof window !== 'undefined' ? window.innerWidth : 1000) - 100;
        const maxY = (typeof window !== 'undefined' ? window.innerHeight : 800) - 180;

        const clampedPosition = {
            x: Math.max(16, Math.min(newX, maxX)),
            y: Math.max(48, Math.min(newY, maxY))
        };

        setPosition(clampedPosition);
        savePosition(id, clampedPosition);
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        // Only trigger click if we didn't drag
        if (!hasMoved.current) {
            onClick();
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsSelected(true);
    };

    // Deselect when clicking elsewhere
    useEffect(() => {
        const handleGlobalClick = () => setIsSelected(false);
        window.addEventListener('click', handleGlobalClick);
        return () => window.removeEventListener('click', handleGlobalClick);
    }, []);

    return (
        <motion.div
            drag
            dragMomentum={false}
            dragElastic={0.1}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                x,
                y,
            }}
            className="z-10 touch-none"
            whileDrag={{ scale: 1.05, zIndex: 50 }}
        >
            <div
                className={`
                    flex flex-col items-center gap-1 p-2 rounded-xl transition-colors cursor-pointer group select-none w-24
                    ${isSelected ? 'bg-white/20 ring-2 ring-blue-500/50' : 'hover:bg-white/10'}
                    ${isDragging ? 'opacity-90' : ''}
                `}
                onClick={handleClick}
                onMouseDown={handleMouseDown}
                onDoubleClick={(e) => { e.stopPropagation(); onClick(); }}
            >
                <div className={`
                    ${imageSrc ? 'w-16 h-16' : 'w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg'}
                    flex items-center justify-center text-white group-active:scale-95 transition-transform overflow-hidden
                    ${isDragging ? 'shadow-2xl' : 'shadow-lg'}
                `}>
                    {imageSrc ? (
                        <img
                            src={imageSrc}
                            alt={label}
                            className="w-full h-full object-contain"
                            draggable={false}
                        />
                    ) : (
                        <Icon size={28} />
                    )}
                </div>
                <span className={`
                    text-white text-xs font-medium text-center drop-shadow-md px-2 py-0.5 rounded-md backdrop-blur-sm transition-colors truncate max-w-full
                    ${isSelected ? 'bg-blue-500/80' : 'bg-black/40'}
                `}>
                    {label}
                </span>
            </div>
        </motion.div>
    );
}
