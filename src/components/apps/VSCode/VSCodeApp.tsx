'use client';

import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useWindowStore } from '@/store/useWindowStore';
import ActivityBar from './ActivityBar';
import SideBar from './SideBar';
import TabBar from './TabBar';
import StatusBar from './StatusBar';
import { FileNode, explorerData } from '@/data/fileSystem';

export default function VSCodeApp() {
    const launchArgs = useWindowStore((state) => state.windows['vscode']?.launchArgs);

    // Default file if nothing open
    const initialFile: FileNode = {
        name: 'welcome.py',
        language: 'python',
        content: `# Welcome to VS Code\n# -------------------\n# Select a file from the explorer to start coding.`
    };

    const [activeAttachedFile, setActiveAttachedFile] = useState<FileNode | null>(null);
    const [openFiles, setOpenFiles] = useState<FileNode[]>([]);
    const [activeView, setActiveView] = useState('explorer');

    // Handle external launch args (e.g. "code projects.ts" from terminal)
    useEffect(() => {
        if (launchArgs && launchArgs.file && launchArgs.code) {
            const newFile: FileNode = {
                name: launchArgs.file,
                content: launchArgs.code,
                language: 'typescript' // simplified
            };
            handleFileOpen(newFile);
        }
    }, [launchArgs]);

    // Initialize with a welcome file or empty
    useEffect(() => {
        if (openFiles.length === 0) {
            setOpenFiles([initialFile]);
            setActiveAttachedFile(initialFile);
        }
    }, []);

    const handleFileOpen = (file: FileNode) => {
        if (!openFiles.find(f => f.name === file.name)) {
            setOpenFiles([...openFiles, file]);
        }
        setActiveAttachedFile(file);
    };

    const handleTabClose = (fileName: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const newFiles = openFiles.filter(f => f.name !== fileName);
        setOpenFiles(newFiles);

        if (activeAttachedFile?.name === fileName) {
            setActiveAttachedFile(newFiles.length > 0 ? newFiles[newFiles.length - 1] : null);
        }
    };

    return (
        <div className="h-full w-full bg-[#1e1e1e] flex flex-col text-sm rounded-b-xl overflow-hidden leading-normal">
            <div className="flex-1 flex overflow-hidden">
                {/* Activity Bar */}
                <ActivityBar activeView={activeView} onViewChange={setActiveView} />

                {/* Sidebar */}
                <SideBar
                    visible={activeView === 'explorer'}
                    onFileSelect={handleFileOpen}
                />

                {/* Main Editor Area */}
                <div className="flex-1 flex flex-col bg-[#1e1e1e] min-w-0">
                    {/* Tabs */}
                    <TabBar
                        openFiles={openFiles}
                        activeFile={activeAttachedFile}
                        onTabClick={setActiveAttachedFile}
                        onTabClose={handleTabClose}
                    />

                    {/* Editor */}
                    <div className="flex-1 relative">
                        {activeAttachedFile ? (
                            <Editor
                                height="100%"
                                defaultLanguage={activeAttachedFile.language === 'typescript' ? 'typescript' : activeAttachedFile.language} // map simple types
                                value={activeAttachedFile.content}
                                path={activeAttachedFile.name}
                                theme="vs-dark"
                                options={{
                                    readOnly: true,
                                    minimap: { enabled: true },
                                    fontSize: 14,
                                    fontFamily: "'Menlo', 'Monaco', 'Courier New', monospace",
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    lineNumbers: 'on',
                                }}
                            />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-500 bg-[#1e1e1e]">
                                <div className="text-center">
                                    <div className="text-4xl mb-4 opacity-20">VS Code</div>
                                    <p>Select a file to view code</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Status Bar */}
            <StatusBar />
        </div>
    );
}
