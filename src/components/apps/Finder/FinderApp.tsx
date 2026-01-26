import React, { useState } from 'react';
import { Folder, FileText, Image as ImageIcon, Briefcase, ChevronLeft, ChevronRight, Search, Home, Download, Monitor, HardDrive, Cpu, ArrowLeft } from 'lucide-react';
import { useWindowStore } from '@/store/useWindowStore';
import { AppID } from '@/types/app';

// --- Types ---
type FileType = 'folder' | 'file';

interface FileSystemItem {
    id: string;
    name: string;
    type: FileType;
    icon?: React.ElementType; // Override default icon
    content?: string; // For simple text files
    appId?: AppID; // Open specific app
    args?: unknown; // Args for the app
    children?: FileSystemItem[]; // For folders
    color?: string; // Icon color
}

// --- Virtual File System Data ---
const FILE_SYSTEM: FileSystemItem[] = [
    {
        id: 'desktop',
        name: 'Desktop',
        type: 'folder',
        children: []
    },
    {
        id: 'documents',
        name: 'Documents',
        type: 'folder',
        children: [
            { id: 'resume', name: 'Resume.pdf', type: 'file', icon: FileText, appId: 'resume', color: 'text-red-400' },
            { id: 'cover-letter', name: 'CoverLetter.txt', type: 'file', icon: FileText, content: 'To whom it may concern,\n\nI am passionate about building great software.\n\nBest,\nSachin' }
        ]
    },
    {
        id: 'downloads',
        name: 'Downloads',
        type: 'folder',
        children: []
    },
    {
        id: 'pictures',
        name: 'Pictures',
        type: 'folder',
        children: [
            { id: 'hobbies', name: 'Hobbies', type: 'folder', children: [] },
            { id: 'profile-pic', name: 'profile.jpg', type: 'file', icon: ImageIcon, color: 'text-blue-400' }
        ]
    },
    {
        id: 'projects',
        name: 'Projects',
        type: 'folder',
        children: [
            { id: 'all-projects', name: 'All Projects', type: 'file', icon: Briefcase, appId: 'projects', color: 'text-purple-400' },
            // Can add specific project shortcuts here
        ]
    }
];

// --- Component ---
export default function FinderApp() {
    // Navigation State
    const [history, setHistory] = useState<FileSystemItem[][]>([FILE_SYSTEM]); // Stack of directory views
    const [currentIndex, setCurrentIndex] = useState(0); // Current position in history
    const [currentPath, setCurrentPath] = useState<string[]>(['Home']);

    // Store access for opening files
    const { openWindow } = useWindowStore();

    // Helper: Get current directory contents
    const currentContents = history[currentIndex];

    // Navigation Handlers
    const handleNavigate = (folder: FileSystemItem) => {
        if (folder.type === 'folder') {
            const newHistory = history.slice(0, currentIndex + 1);
            newHistory.push(folder.children || []);
            setHistory(newHistory);
            setCurrentIndex(newHistory.length - 1);
            setCurrentPath([...currentPath, folder.name]);
        } else if (folder.type === 'file') {
            // File Action logic
            if (folder.appId) {
                openWindow(folder.appId, folder.args);
            } else if (folder.content) {
                alert(folder.content); // Placeholder for simple preview
            }
        }
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setCurrentPath(currentPath.slice(0, -1));
        }
    };

    const handleForward = () => {
        if (currentIndex < history.length - 1) {
            setCurrentIndex(currentIndex + 1);
            // Re-constructing path is tricky without storing it in history, simpler to just pop back
            // For MVP specific path reconstruction on forward might glitch without full state, 
            // but effectively we just move index.
            // A robust implementations stores { items: [], path: [] } in history.
        }
    };

    // Sidebar Items
    const SIDEBAR_ITEMS = [
        { label: 'Recents', icon: Home, active: false },
        { label: 'Application', icon: Cpu, active: false },
        { label: 'Desktop', icon: Monitor, active: false },
        { label: 'Documents', icon: FileText, active: currentPath.includes('Documents') },
        { label: 'Downloads', icon: Download, active: false },
        { label: 'Pictures', icon: ImageIcon, active: currentPath.includes('Pictures') },
        { label: 'Projects', icon: Briefcase, active: currentPath.includes('Projects') },
    ];

    return (
        <div className="flex h-full w-full bg-[#1e1e1e] text-white font-sans rounded-b-xl overflow-hidden">
            {/* Sidebar (Glassmorphism-ish) */}
            <div className="w-48 bg-[#2C2C2E]/90 backdrop-blur-xl border-r border-white/10 flex flex-col pt-4">
                <div className="px-4 mb-2 text-xs font-semibold text-gray-400 pl-6">Favorites</div>
                <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
                    {SIDEBAR_ITEMS.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => {
                                // Shortcut logic: Find the folder in root and navigate
                                const folder = FILE_SYSTEM.find(f => f.name === item.label);
                                if (folder) {
                                    // Reset history to root then push this folder
                                    setHistory([FILE_SYSTEM, folder.children || []]);
                                    setCurrentIndex(1);
                                    setCurrentPath(['Home', folder.name]);
                                } else {
                                    // Reset to Home
                                    setHistory([FILE_SYSTEM]);
                                    setCurrentIndex(0);
                                    setCurrentPath(['Home']);
                                }
                            }}
                            className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] transition-colors ${item.active ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-white/5'
                                }`}
                        >
                            <item.icon size={16} className={item.active ? 'text-white' : 'text-blue-400'} />
                            {item.label}
                        </button>
                    ))}

                    <div className="mt-4 px-2 mb-2 text-xs font-semibold text-gray-400 pl-2">Locations</div>
                    <button className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] text-gray-300 hover:bg-white/5">
                        <HardDrive size={16} className="text-gray-400" />
                        Macintosh HD
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] text-gray-300 hover:bg-white/5">
                        <Monitor size={16} className="text-gray-400" />
                        Sachin&apos;s MacBook Pro
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col bg-[#1e1e1e]">
                {/* Toolbar */}
                <div className="h-12 border-b border-white/10 flex items-center px-4 gap-4 bg-[#2C2C2E]">
                    <div className="flex items-center gap-1 text-gray-400">
                        <button
                            onClick={handleBack}
                            disabled={currentIndex === 0}
                            className="p-1 hover:bg-white/10 rounded disabled:opacity-30"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={handleForward}
                            disabled={currentIndex === history.length - 1}
                            className="p-1 hover:bg-white/10 rounded disabled:opacity-30"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    <div className="text-[13px] font-semibold text-gray-300 flex items-center gap-1">
                        <Folder size={14} className="text-blue-400" />
                        {currentPath[currentPath.length - 1]}
                    </div>

                    <div className="flex-1" />

                    <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-[#1a1a1a] border border-white/10 rounded-md py-1 pl-8 pr-3 text-xs text-white placeholder-gray-500 w-32 focus:w-48 transition-all outline-none focus:border-blue-500/50"
                        />
                    </div>
                </div>

                {/* File Grid */}
                <div className="flex-1 p-4 overflow-y-auto">
                    {currentContents.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500">
                            <span className="text-4xl mb-2">📂</span>
                            <p>Empty Folder</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
                            {currentContents.map((item, idx) => (
                                <div
                                    key={idx}
                                    onDoubleClick={() => handleNavigate(item)}
                                    className="group flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-blue-600/20 active:bg-blue-600/40 cursor-default transition-colors"
                                >
                                    {/* Icon */}
                                    <div className={`w-16 h-16 flex items-center justify-center ${item.color || 'text-blue-400'}`}>
                                        {item.icon ? (
                                            <item.icon size={48} strokeWidth={1.5} />
                                        ) : (
                                            <Folder size={48} strokeWidth={1.5} fill="currentColor" className="text-blue-400/80" />
                                        )}
                                    </div>
                                    {/* Label */}
                                    <span className="text-xs text-center text-gray-300 px-2 py-0.5 rounded group-hover:bg-blue-600 group-hover:text-white truncate w-full">
                                        {item.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Status Bar */}
                <div className="h-6 bg-[#2C2C2E] border-t border-white/10 flex items-center px-4 text-[10px] text-gray-500">
                    {currentContents.length} items
                </div>
            </div>
        </div>
    );
}
