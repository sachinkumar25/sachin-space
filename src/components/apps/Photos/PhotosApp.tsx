import React from 'react';
import { Sidebar, Sliders, Heart, Info } from 'lucide-react';

const PHOTOS = [
    'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=3870&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2940&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518098268026-4e187743369b?q=80&w=2940&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2940&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=2940&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1588651034509-c83133ff03d9?q=80&w=2940&auto=format&fit=crop', // Abstract
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop', // Cyberpunk
    'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2940&auto=format&fit=crop', // Neon
];

export default function PhotosApp() {
    return (
        <div className="flex h-full bg-[#1e1e1e] text-white">
            {/* Sidebar */}
            <div className="w-[220px] bg-[#2C2C2C]/50 border-r border-white/10 hidden md:flex flex-col p-4 pt-8">
                <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2 px-3">Library</div>
                <div className="px-3 py-1.5 bg-macos-blue text-white rounded-md text-sm font-medium mb-1">Library</div>
                <div className="px-3 py-1.5 hover:bg-white/5 text-white/80 rounded-md text-sm transition-colors mb-1">Memories</div>
                <div className="px-3 py-1.5 hover:bg-white/5 text-white/80 rounded-md text-sm transition-colors mb-6">Favorites</div>

                <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2 px-3">Albums</div>
                <div className="px-3 py-1.5 hover:bg-white/5 text-white/80 rounded-md text-sm transition-colors mb-1">Recents</div>
                <div className="px-3 py-1.5 hover:bg-white/5 text-white/80 rounded-md text-sm transition-colors mb-1">Imports</div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col bg-[#1e1e1e]">
                {/* Header */}
                <div className="h-12 border-b border-white/5 flex items-center justify-between px-6 bg-[#1e1e1e]/80 backdrop-blur-md">
                    <span className="font-semibold text-md tracking-tight">Library</span>
                    <div className="flex gap-4 text-white/50">
                        <Sliders size={16} />
                        <Info size={16} />
                    </div>
                </div>

                {/* Photo Grid */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {PHOTOS.map((src, i) => (
                            <div key={i} className="aspect-square bg-gray-800 rounded-lg overflow-hidden relative group">
                                <img src={src} alt={`Photo ${i}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-2">
                                    <button className="text-white hover:text-red-500 transition-colors">
                                        <Heart size={16} fill="white" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center text-white/30 text-xs mt-12 mb-4">
                        {PHOTOS.length} Photos, 1 Video
                    </div>
                </div>
            </div>
        </div>
    );
}
