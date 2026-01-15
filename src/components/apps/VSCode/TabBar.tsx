import React from 'react';
import { X, FileCode, FileJson, FileType } from 'lucide-react';
import clsx from 'clsx';
import { FileNode } from '@/data/fileSystem';

interface TabBarProps {
    openFiles: FileNode[];
    activeFile: FileNode | null;
    onTabClick: (file: FileNode) => void;
    onTabClose: (fileName: string, e: React.MouseEvent) => void;
}

const FileIcon = ({ name }: { name: string }) => {
    if (name.endsWith('.tsx') || name.endsWith('.ts')) return <FileCode size={14} className="text-blue-400 scale-90" />;
    if (name.endsWith('.css')) return <FileType size={14} className="text-blue-300 scale-90" />;
    if (name.endsWith('.json')) return <FileJson size={14} className="text-yellow-400 scale-90" />;
    if (name.endsWith('.md')) return <FileType size={14} className="text-gray-300 scale-90" />;
    return <FileType size={14} className="text-gray-400 scale-90" />;
};

export default function TabBar({ openFiles, activeFile, onTabClick, onTabClose }: TabBarProps) {
    return (
        <div className="flex bg-[#252526] overflow-x-auto h-9 shrink-0 scrollbar-hide">
            {openFiles.map((file) => (
                <div
                    key={file.name}
                    onClick={() => onTabClick(file)}
                    className={clsx(
                        "flex items-center gap-2 px-3 min-w-[120px] max-w-[200px] border-r border-[#1e1e1e] cursor-pointer group select-none hover:bg-[#2d2d2d]",
                        activeFile?.name === file.name
                            ? "bg-[#1e1e1e] text-white border-t border-t-[#007acc]"
                            : "bg-[#2d2d2d] text-[#969696] border-t border-t-transparent"
                    )}
                >
                    <FileIcon name={file.name} />
                    <span className={clsx("truncate text-sm", activeFile?.name === file.name ? "text-[#ffffff]" : "text-[#969696]")}>
                        {file.name}
                    </span>
                    <button
                        onClick={(e) => onTabClose(file.name, e)}
                        className={clsx(
                            "ml-auto p-0.5 rounded-md opacity-0 group-hover:opacity-100 hover:bg-[#4d4d4d]",
                            activeFile?.name === file.name && "text-white"
                        )}
                    >
                        <X size={14} />
                    </button>
                </div>
            ))}
        </div>
    );
}
