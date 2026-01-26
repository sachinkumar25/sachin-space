'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { useWindowStore } from '@/store/useWindowStore';
import ActivityBar from './ActivityBar';
import SideBar from './SideBar';
import TabBar from './TabBar';
import StatusBar from './StatusBar';
import { FileNode } from '@/data/fileSystem';

const initialFile: FileNode = {
    name: 'welcome.py',
    language: 'python',
    content: `"""
Welcome to My Code Hub! 👨‍💻
---------------------------
This VS Code instance is connected to my GitHub repositories.

Use the Explorer on the left 👈 to browse my actual projects:
- 📂 projects/
  - Each folder represents a project from my GitHub.
  - View 'README.md' for details.
  - Check out the source files (e.g., 'main.py', 'index.ts') to see my coding style.

This is a great place to review technical implementations without leaving the site.
"""

def github_sync():
    print("Fetching repositories...")
    print("Syncing code snippets...")
    print("Done! Ready for review.")

if __name__ == "__main__":
    github_sync()`
};

export default function VSCodeApp() {
    const launchArgs = useWindowStore((state) => state.windows['vscode']?.launchArgs);

    const [activeAttachedFile, setActiveAttachedFile] = useState<FileNode | null>(null);
    const [openFiles, setOpenFiles] = useState<FileNode[]>([initialFile]);
    const [activeView, setActiveView] = useState('explorer');

    const handleFileOpen = useCallback((file: FileNode) => {
        setOpenFiles(prev => {
            if (!prev.find(f => f.name === file.name)) {
                return [...prev, file];
            }
            return prev;
        });
        setActiveAttachedFile(file);
    }, []);

    // Handle external launch args (e.g. "code projects.ts" from terminal)
    useEffect(() => {
        if (launchArgs && launchArgs.file && launchArgs.code) {
            const newFile: FileNode = {
                name: launchArgs.file,
                content: launchArgs.code,
                language: 'typescript' // simplified
            };
            // eslint-disable-next-line
            handleFileOpen(newFile);
        }
    }, [launchArgs, handleFileOpen]);

    // Initialize with a welcome file or empty
    useEffect(() => {
        if (openFiles.length === 0) {
            // eslint-disable-next-line
            setOpenFiles([initialFile]);
            setActiveAttachedFile(initialFile);
        }
    }, [openFiles.length]);

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
