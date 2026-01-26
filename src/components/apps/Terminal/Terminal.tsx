'use client';

import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import { parseCommand } from '@/lib/commands/localParser';

// macOS Dracula/Dark Theme
const THEME = {
    background: '#1a1b26',
    foreground: '#a9b1d6',
    cursor: '#c0caf5',
    selectionBackground: '#33467C',
    black: '#15161E',
    red: '#f7768e',
    green: '#9ece6a',
    yellow: '#e0af68',
    blue: '#7aa2f7',
    magenta: '#bb9af7',
    cyan: '#7dcfff',
    white: '#a9b1d6',
    brightBlack: '#414868',
    brightRed: '#f7768e',
    brightGreen: '#9ece6a',
    brightYellow: '#e0af68',
    brightBlue: '#7aa2f7',
    brightMagenta: '#bb9af7',
    brightCyan: '#7dcfff',
    brightWhite: '#c0caf5',
};

export default function TerminalApp() {
    const terminalRef = useRef<HTMLDivElement>(null);
    const xtermRef = useRef<XTerm | null>(null);
    const fitAddonRef = useRef<FitAddon | null>(null);
    const commandBuffer = useRef<string>('');
    const isProcessing = useRef(false);

    useEffect(() => {
        if (!terminalRef.current || xtermRef.current) return;

        // Initialize XTerm
        const term = new XTerm({
            cursorBlink: true,
            fontFamily: 'Menlo, Monaco, "Courier New", monospace',
            fontSize: 14,
            theme: THEME,
            allowProposedApi: true,
        });

        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);

        term.open(terminalRef.current);
        fitAddon.fit();

        xtermRef.current = term;
        fitAddonRef.current = fitAddon;

        // Initial greeting
        term.writeln('\x1b[1;36m┌─────────────────────────────────────────────┐\x1b[0m');
        term.writeln('\x1b[1;36m│\x1b[0m  SACHIN KUMAR                               \x1b[1;36m│\x1b[0m');
        term.writeln('\x1b[1;36m│\x1b[0m  SWE @ Capital One | CS+Math @ UMD          \x1b[1;36m│\x1b[0m');
        term.writeln('\x1b[1;36m│\x1b[0m                                             \x1b[1;36m│\x1b[0m');
        term.writeln('\x1b[1;36m│\x1b[0m  Type \'\x1b[1;33mhelp\x1b[0m\' for commands                   \x1b[1;36m│\x1b[0m');
        term.writeln('\x1b[1;36m│\x1b[0m  Type \'\x1b[1;33mprojects\x1b[0m\' to see my work             \x1b[1;36m│\x1b[0m');
        term.writeln('\x1b[1;36m│\x1b[0m  Type \'\x1b[1;33mcontact\x1b[0m\' for ways to reach me        \x1b[1;36m│\x1b[0m');
        term.writeln('\x1b[1;36m└─────────────────────────────────────────────┘\x1b[0m');
        term.write('\r\n$ ');

        // Handle Resize
        const handleResize = () => fitAddon.fit();
        window.addEventListener('resize', handleResize);

        // Quick hack to ensuring fit happens after mount/animation
        setTimeout(() => {
            fitAddon.fit();
            term.focus(); // Force focus
        }, 100);



        // Input Handling
        term.onData(async (data) => {
            // Drop input if we are waiting for AI
            if (isProcessing.current) return;

            const charCode = data.charCodeAt(0);

            // Enter
            if (charCode === 13) {
                term.write('\r\n');
                const command = commandBuffer.current.trim();

                if (command) {
                    const result = parseCommand(command);

                    if (result === '__CLEAR__') {
                        term.clear();
                    } else if (result !== null) {
                        term.writeln(result);
                    } else {
                        // Phase 4: AI Fallback
                        term.write('\r\n(thinking...)\r\n');
                        isProcessing.current = true; // Lock Input

                        const messages = [{ role: 'user', content: command }];

                        try {
                            const res = await fetch('/api/chat', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ messages }),
                            });

                            if (!res.ok) {
                                throw new Error(`HTTP ${res.status}`);
                            }

                            const data = await res.json();

                            if (data.error) {
                                term.writeln(`\r\n[System Error]: ${data.error}`);
                            } else if (data.type === 'action') {
                                term.writeln(data.response); // e.g. "Opening projects..."

                                const { useWindowStore } = await import('@/store/useWindowStore');

                                if (data.tool === 'open_window' && data.params.appId) {
                                    const SUPPORTED_APPS = ['terminal', 'finder', 'projects', 'resume', 'vscode', 'mail', 'about'];

                                    if (SUPPORTED_APPS.includes(data.params.appId)) {
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        useWindowStore.getState().openWindow(data.params.appId as any);
                                    } else {
                                        term.writeln(`\r\nError: App '${data.params.appId}' not installed.`);
                                    }

                                } else if (data.tool === 'list_projects') {
                                    useWindowStore.getState().openWindow('projects');
                                } else {
                                    term.writeln(`Action: ${data.tool}`);
                                }
                            } else if (data.type === 'message') {
                                term.writeln(data.content || '');
                            }
                        } catch (err) {
                            term.writeln('\r\n[System Error]: Neural Link Disconnected. (Check API Key)');
                            console.error(err);
                        } finally {
                            isProcessing.current = false; // Unlock Input
                        }
                    }
                }


                commandBuffer.current = '';
                term.write('\r\n$ ');
            }
            // Backspace
            else if (charCode === 127) {
                if (commandBuffer.current.length > 0) {
                    commandBuffer.current = commandBuffer.current.slice(0, -1);
                    term.write('\b \b');
                }
            }
            // Regular input
            else if (charCode >= 32) {
                commandBuffer.current += data;
                term.write(data);
            }
            // Handle arrows (basic ignore for now to prevent artifacts)
            else if (charCode === 27) {
                // Arrow keys sent ANSI sequences, we ignore for simplicity in MVP
            }
        });

        return () => {
            window.removeEventListener('resize', handleResize);
            term.dispose();
            xtermRef.current = null;
        };
    }, []);

    // Re-fit when container size changes (e.g. window resize)
    useEffect(() => {
        // A more robust apporach would be using ResizeObserver on the container
        // ensuring fitAddon.fit() is called whenever the div size changes
        const observer = new ResizeObserver(() => {
            fitAddonRef.current?.fit();
        });

        if (terminalRef.current) {
            observer.observe(terminalRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            className="h-full w-full bg-[#1a1b26] p-1 overflow-hidden"
            ref={terminalRef}
            onClick={() => {
                if (xtermRef.current) {
                    xtermRef.current.focus();
                }
            }}
        />
    );
}
