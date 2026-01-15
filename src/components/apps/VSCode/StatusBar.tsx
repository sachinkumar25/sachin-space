import React from 'react';
import { GitBranch, AlertCircle, Bell, Check } from 'lucide-react';

export default function StatusBar() {
    return (
        <div className="h-6 bg-[#007acc] text-white text-[11px] flex justify-between items-center px-2 select-none shrink-0">
            <div className="flex items-center gap-3">
                <button className="flex items-center gap-1 hover:bg-white/20 px-1 rounded-sm">
                    <GitBranch size={12} />
                    <span>main*</span>
                </button>
                <button className="flex items-center gap-1 hover:bg-white/20 px-1 rounded-sm">
                    <AlertCircle size={12} />
                    <span>0</span>
                    <AlertCircle size={12} />
                    <span>0</span>
                </button>
            </div>

            <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 hover:bg-white/20 px-1 rounded-sm">
                    <span>Ln 12, Col 42</span>
                </button>
                <button className="flex items-center gap-1 hover:bg-white/20 px-1 rounded-sm">
                    <span>UTF-8</span>
                </button>
                <button className="flex items-center gap-1 hover:bg-white/20 px-1 rounded-sm">
                    <span>TypeScript React</span>
                </button>
                <button className="flex items-center gap-1 hover:bg-white/20 px-1 rounded-sm">
                    <Bell size={12} />
                </button>
            </div>
        </div>
    );
}
