'use client';

import { useWindowStore } from '@/store/useWindowStore';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { AppID } from '@/types/app';
import { Terminal, Folder, Briefcase, FileText, Code2, Mail, Github, MessageSquare, Rocket, Settings, GraduationCap, Globe, Image, Calendar } from 'lucide-react';

// App Config for Dock
// App Config for Dock
export const DOCK_APPS: { id: AppID; label: string; icon: React.ElementType; iconPath?: string; externalUrl?: string; scale?: number }[] = [
    { id: 'launchpad', label: 'Launchpad', icon: Rocket, iconPath: '/icons/launchpad.png' },
    { id: 'finder', label: 'Finder', icon: Folder, iconPath: '/icons/finder.png' },
    { id: 'safari', label: 'Safari', icon: Globe, iconPath: '/icons/safari.png', scale: 1.75 },
    { id: 'photos', label: 'Photos', icon: Image, iconPath: '/icons/photos.png', scale: 1.35 },
    { id: 'calendar', label: 'Calendar', icon: Calendar, iconPath: '/icons/calendar.png', scale: 1.35 },
    { id: 'terminal', label: 'Terminal', icon: Terminal, iconPath: '/icons/terminal.png' },
    { id: 'projects', label: 'Projects', icon: Briefcase, iconPath: '/icons/projects.png' },
    { id: 'vscode' as AppID, label: 'VS Code', icon: Code2, iconPath: '/icons/vscode.png' },
    { id: 'mail', label: 'Mail', icon: Mail, iconPath: '/icons/mail.png' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, iconPath: '/icons/messages.png' },
    { id: 'resume', label: 'Resume', icon: FileText, iconPath: '/icons/resume.png' },
    { id: 'github', label: 'GitHub', icon: Github, iconPath: '/icons/github.png', externalUrl: 'https://github.com/sachinkumar25' },
    { id: 'experience', label: 'Experience', icon: Briefcase, iconPath: '/icons/experiences.png' },
    { id: 'education', label: 'Education', icon: GraduationCap, iconPath: '/icons/education.png' },
    { id: 'settings', label: 'System Settings', icon: Settings, iconPath: '/icons/settings.png' },
];

function DockIcon({ mouseX, id, icon: Icon, label, iconPath, externalUrl, scale }: { mouseX: MotionValue<number>; id: AppID; icon: React.ElementType; label: string; iconPath?: string; externalUrl?: string; scale?: number }) {
    const ref = useRef<HTMLDivElement>(null);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [50, 120, 50]); // Smaller base (50px), massive hover (120px)
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 20 }); // Snappier

    const { openWindow, windows } = useWindowStore();
    const isOpen = windows[id]?.isOpen;

    const handleClick = () => {
        if (externalUrl) {
            window.open(externalUrl, '_blank');
        } else {
            openWindow(id);
        }
    };

    return (
        <motion.div
            ref={ref}
            style={{ width }}
            className="aspect-square relative flex items-center justify-center group"
        >
            <button
                onClick={handleClick}
                className={`w-full h-full rounded-2xl flex items-center justify-center overflow-hidden transition-all ${iconPath
                    ? 'hover:scale-110 active:scale-95 duration-200'
                    : 'bg-gray-800/50 backdrop-blur-md border border-white/10 shadow-lg hover:bg-gray-700/60'
                    }`}
            >
                {iconPath ? (
                    <img
                        src={iconPath}
                        alt={label}
                        className="w-full h-full object-contain drop-shadow-xl"
                        style={{ transform: scale ? `scale(${scale})` : undefined }}
                        onError={(e) => {
                            // If image fails to load, hide it so fallback shows (helper logic needed or just fallback to text)
                            // Ideally we toggle a state, but for simplicity we can swap src or just rely on user providing correct files.
                            // For this MVP, if it breaks, it breaks, but we will assume user provides files.
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement?.classList.add('bg-gray-800/50', 'backdrop-blur-md', 'border', 'border-white/10');
                            // We can't easily mount the Icon component here without state, so we'll trust the plan.
                        }}
                    />
                ) : (
                    <Icon className="w-1/2 h-1/2 text-white" />
                )}

                {/* Fallback Icon (only visible if img hidden/missing, but CSS specific) 
                    Actually, simpler approach: render both, hide Icon if iconPath exists.
                    Realistically, we just render one or the other.
                */}
            </button>

            {/* Tooltip */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900/90 text-white text-xs rounded-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                {label}
            </div>

            {/* Active Dot (only for internal apps) */}
            {isOpen && !externalUrl && (
                <div className="absolute -bottom-2 w-1 h-1 rounded-full bg-white/60" />
            )}
        </motion.div>
    );
}

export default function Dock() {
    const mouseX = useMotionValue(Infinity);

    return (
        <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-end gap-5 px-6 py-5 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/10 shadow-2xl z-50 transition-transform duration-300 ease-out origin-bottom"
        >
            <div
                className="flex gap-3 items-end"
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
            >
                {DOCK_APPS.map((app) => (
                    <DockIcon
                        key={app.id}
                        id={app.id}
                        icon={app.icon}
                        label={app.label}
                        iconPath={app.iconPath}
                        externalUrl={app.externalUrl}
                        scale={app.scale}
                        mouseX={mouseX}
                    />
                ))}
            </div>
        </div>
    );
}
