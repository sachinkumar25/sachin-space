'use client';

import React from 'react';
import Editor from '@monaco-editor/react';
import { useWindowStore } from '@/store/useWindowStore';
import { FileCode, X } from 'lucide-react';

export default function VSCodeApp() {
    const launchArgs = useWindowStore((state) => state.windows['vscode']?.launchArgs);

    const fileName = launchArgs?.file || 'welcome.py';
    const code = launchArgs?.code || `# Welcome to Sachin's Portfolio Codebase
# ---------------------------------------
# Select a project from the "Projects" app
# to view its source code here.
#
# Try: "open projects" in the terminal.

def greet():
    print("Hello, World!")
    print("Ready to code.")

greet()`;

    // Determine language based on extension
    const getLanguage = (file: string) => {
        if (file.endsWith('.py')) return 'python';
        if (file.endsWith('.ts') || file.endsWith('.tsx')) return 'typescript';
        if (file.endsWith('.js') || file.endsWith('.jsx')) return 'javascript';
        if (file.endsWith('.json')) return 'json';
        if (file.endsWith('.css')) return 'css';
        if (file.endsWith('.html')) return 'html';
        return 'plaintext';
    };

    return (
        <div className="h-full w-full bg-[#1e1e1e] flex flex-col text-sm rounded-b-xl overflow-hidden leading-normal">
            {/* Top Bar / Tabs */}
            <div className="flex bg-[#252526] overflow-x-auto">
                <div className="flex items-center gap-2 px-3 py-2 bg-[#1e1e1e] text-white border-t-2 border-blue-500 w-fit min-w-[120px]">
                    <FileCode size={14} className="text-blue-400" />
                    <span className="truncate">{fileName}</span>
                    <button className="ml-auto hover:bg-white/10 rounded p-0.5">
                        <X size={12} />
                    </button>
                </div>
                {/* Inactive fake tab */}
                <div className="flex items-center gap-2 px-3 py-2 text-gray-400 border-t-2 border-transparent hover:bg-[#2a2d2e] cursor-pointer">
                    <span className="truncate">README.md</span>
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 relative">
                <Editor
                    height="100%"
                    defaultLanguage={getLanguage(fileName)}
                    value={code} // Controlled or uncontrolled? Using value makes it controlled, but we want it to update when props change.
                    path={fileName} // This helps Monaco preserve state per file
                    theme="vs-dark"
                    options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        fontSize: 14,
                        fontFamily: "'Menlo', 'Monaco', 'Courier New', monospace",
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                    }}
                />
            </div>

            {/* Status Bar */}
            <div className="bg-[#007acc] text-white text-xs px-3 py-1 flex justify-between items-center">
                <div className="flex gap-3">
                    <span>main*</span>
                </div>
                <div className="flex gap-3">
                    <span>Ln 1, Col 1</span>
                    <span>UTF-8</span>
                    <span>{getLanguage(fileName).toUpperCase()}</span>
                </div>
            </div>
        </div>
    );
}
