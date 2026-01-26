import React, { useState, useEffect, useRef } from 'react';
import { Search, Calculator, AppWindow, Folder, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/store/useWindowStore';
import { DOCK_APPS } from './Dock';
import { projects } from '@/data/projects';

// Simplified helper types
type ResultItem = {
    id: string;
    label: string;
    type: 'app' | 'project' | 'calc';
    icon: any;
    action: () => void;
    detail?: string;
};

export default function Spotlight({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const { openWindow } = useWindowStore();

    // Reset query when opening
    useEffect(() => {
        if (isOpen) {
            setQuery('');
            setSelectedIndex(0);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isOpen]);

    // Derived Results
    const results: ResultItem[] = [];

    if (query) {
        const lowerQuery = query.toLowerCase();

        // 1. Math Calculation (Naive)
        if (/^[\d\s+\-*/().^]+$/.test(query)) {
            try {
                // eslint-disable-next-line
                const val = eval(query);
                if (!isNaN(val)) {
                    results.push({
                        id: 'calc',
                        label: val.toString(),
                        type: 'calc',
                        icon: Calculator,
                        action: () => { navigator.clipboard.writeText(val.toString()); onClose(); },
                        detail: 'Result (Copy to Clipboard)'
                    });
                }
            } catch (e) { /* ignore */ }
        }

        // 2. Apps
        DOCK_APPS.forEach(app => {
            if (app.label.toLowerCase().includes(lowerQuery)) {
                results.push({
                    id: `app-${app.id}`,
                    label: app.label,
                    type: 'app',
                    icon: AppWindow, // Or use app.icon component if possible, but Lucide for consistency in list
                    action: () => {
                        if (app.externalUrl) {
                            window.open(app.externalUrl, '_blank');
                        } else {
                            // @ts-ignore
                            openWindow(app.id);
                        }
                        onClose();
                    },
                    detail: 'Application'
                });
            }
        });

        // 3. Projects
        projects.forEach(p => {
            if (p.title.toLowerCase().includes(lowerQuery) || p.description.toLowerCase().includes(lowerQuery)) {
                results.push({
                    id: `proj-${p.id}`,
                    label: p.title,
                    type: 'project',
                    icon: Briefcase,
                    action: () => {
                        // Open vscode? or Projects app?
                        // Let's open Projects app for now
                        openWindow('projects');
                        onClose();
                    },
                    detail: 'Project'
                });
            }
        });
    }

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % Math.max(1, results.length));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + Math.max(1, results.length)) % Math.max(1, results.length));
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (results[selectedIndex]) {
                    results[selectedIndex].action();
                }
            } else if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, results, selectedIndex, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-[20vh]" onClick={onClose}>
            <div
                className="w-[600px] bg-[#1e1e1e]/80 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                {/* Search Input */}
                <div className="flex items-center px-4 py-4 gap-3 border-b border-white/5">
                    <Search className="text-white/40" size={20} />
                    <input
                        ref={inputRef}
                        type="text"
                        className="flex-1 bg-transparent border-none outline-none text-xl text-white placeholder:text-white/30 font-sf-display"
                        placeholder="Spotlight Search"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                </div>

                {/* Results */}
                {results.length > 0 && (
                    <div className="max-h-[400px] overflow-y-auto py-2">
                        {results.map((res, idx) => (
                            <div
                                key={res.id}
                                className={`px-4 py-2 flex items-center gap-3 cursor-pointer ${idx === selectedIndex ? 'bg-macos-blue text-white' : 'hover:bg-white/5 text-white/90'}`}
                                onClick={() => res.action()}
                                onMouseEnter={() => setSelectedIndex(idx)}
                            >
                                <res.icon size={18} className={idx === selectedIndex ? 'text-white' : 'text-white/50'} />
                                <div className="flex flex-col">
                                    <span className="text-[14px] font-medium leading-tight">{res.label}</span>
                                    {res.detail && <span className={`text-[11px] ${idx === selectedIndex ? 'text-white/80' : 'text-white/40'}`}>{res.detail}</span>}
                                </div>
                                {idx === selectedIndex && (
                                    <span className="ml-auto text-[11px] text-white/60">Press Enter</span>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {query && results.length === 0 && (
                    <div className="p-8 text-center text-white/30 text-sm">
                        No results found
                    </div>
                )}
            </div>
        </div>
    );
}
