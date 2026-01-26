import React, { useState } from 'react';
import { ChevronRight, ChevronDown, FileCode, FileJson, FileType, Folder, FolderOpen } from 'lucide-react';
import { DirectoryNode, FileNode, FileSystemItem, explorerData } from '@/data/fileSystem';
import clsx from 'clsx';

interface SideBarProps {
    onFileSelect: (file: FileNode) => void;
    visible: boolean;
}

const FileIcon = ({ name }: { name: string }) => {
    if (name.endsWith('.tsx') || name.endsWith('.ts')) return <FileCode size={14} className="text-blue-400" />;
    if (name.endsWith('.css')) return <FileType size={14} className="text-blue-300" />;
    if (name.endsWith('.json')) return <FileJson size={14} className="text-yellow-400" />;
    if (name.endsWith('.md')) return <FileType size={14} className="text-gray-300" />;
    return <FileType size={14} className="text-gray-400" />;
};

export default function SideBar({ onFileSelect, visible }: SideBarProps) {
    const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
        'sachin-space': true,
        'src': true,
        'components': false,
    });

    if (!visible) return null;

    const toggleFolder = (name: string) => {
        setExpandedFolders(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const renderTree = (items: FileSystemItem[], depth = 0) => {
        return items.map((item) => {
            const isFolder = 'children' in item;
            const isExpanded = isFolder && expandedFolders[item.name];
            const paddingLeft = depth * 12 + 10;

            return (
                <div key={item.name}>
                    <div
                        className={clsx(
                            "flex items-center gap-1 py-0.5 hover:bg-[#2a2d2e] cursor-pointer text-[#cccccc] text-xs select-none",
                        )}
                        style={{ paddingLeft: `${paddingLeft}px` }}
                        onClick={() => {
                            if (isFolder) toggleFolder(item.name);
                            else onFileSelect(item as FileNode);
                        }}
                    >
                        {isFolder && (
                            <span className="text-[#858585]">
                                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            </span>
                        )}
                        {!isFolder && <span className="w-[14px]" />} {/* Indent for files */}

                        {isFolder ? (
                            isExpanded ?
                                <FolderOpen size={14} className="text-[#858585]" /> :
                                <Folder size={14} className="text-[#858585]" />
                        ) : (
                            <FileIcon name={item.name} />
                        )}

                        <span>{item.name}</span>
                    </div>
                    {isFolder && isExpanded && renderTree((item as DirectoryNode).children, depth + 1)}
                </div>
            );
        });
    };

    return (
        <div className="w-48 bg-[#252526] text-white flex flex-col border-r border-black/10">
            <div className="uppercase text-xs font-bold text-[#bbbbbb] px-4 py-2.5 tracking-wide">
                Explorer
            </div>
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
                {renderTree(explorerData)}
            </div>
        </div>
    );
}
