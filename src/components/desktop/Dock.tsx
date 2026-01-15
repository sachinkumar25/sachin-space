'use client';

import { useWindowStore } from '@/store/useWindowStore';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { AppID } from '@/types/app';
import { Terminal, Folder, Briefcase, FileText, Code2 } from 'lucide-react';

// App Config for Dock
const DOCK_APPS: { id: AppID; label: string; icon: React.ElementType }[] = [
    { id: 'finder', label: 'Finder', icon: Folder },
    { id: 'terminal', label: 'Terminal', icon: Terminal },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'vs_code' as AppID, label: 'VS Code', icon: Code2 }, // Note: updating AppID type might be needed if vs_code vs vscode mismatch
    { id: 'resume', label: 'Resume', icon: FileText },
];

function DockIcon({ mouseX, id, icon: Icon, label }: { mouseX: MotionValue<number>; id: AppID; icon: React.ElementType; label: string }) {
    const ref = useRef<HTMLDivElement>(null);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [48, 80, 48]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    const { openWindow, windows } = useWindowStore();
    const isOpen = windows[id]?.isOpen;

    return (
        <motion.div
            ref={ref}
            style={{ width }}
            className="aspect-square relative flex items-center justify-center group"
        >
            <button
                onClick={() => openWindow(id)}
                className="w-full h-full rounded-2xl bg-gray-800/50 backdrop-blur-md border border-white/10 shadow-lg flex items-center justify-center hover:bg-gray-700/60 transition-colors"
            >
                <Icon className="w-1/2 h-1/2 text-white" />
            </button>

            {/* Tooltip */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900/90 text-white text-xs rounded-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {label}
            </div>

            {/* Active Dot */}
            {isOpen && (
                <div className="absolute -bottom-2 w-1 h-1 rounded-full bg-white/60" />
            )}
        </motion.div>
    );
}

export default function Dock() {
    const mouseX = useMotionValue(Infinity);

    return (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-3 px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/10 shadow-2xl z-50">
            <div
                className="flex gap-3 items-end"
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
            >
                {DOCK_APPS.map((app) => (
                    <DockIcon key={app.id} id={app.id} icon={app.icon} label={app.label} mouseX={mouseX} />
                ))}
            </div>
        </div>
    );
}
