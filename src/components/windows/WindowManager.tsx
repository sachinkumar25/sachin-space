import { useWindowStore } from '@/store/useWindowStore';
import { AnimatePresence } from 'framer-motion';
import WindowFrame from './WindowFrame';
import TerminalApp from '../apps/Terminal/Terminal';
import ProjectsApp from '../apps/Projects/ProjectsApp';
import VSCodeApp from '../apps/VSCode/VSCodeApp';
import ResumeApp from '../apps/Resume/ResumeApp';

export default function WindowManager() {
    const windows = useWindowStore((state) => state.windows);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <AnimatePresence>
                {Object.values(windows).map((window) => (
                    window.isOpen && (
                        <WindowFrame key={window.id} window={window}>
                            {window.id === 'terminal' ? (
                                <TerminalApp />
                            ) : window.id === 'projects' ? (
                                <ProjectsApp />
                            ) : window.id === 'vscode' ? (
                                <VSCodeApp />
                            ) : window.id === 'resume' ? (
                                <ResumeApp />
                            ) : (
                                <div className="p-4 flex flex-col items-center justify-center h-full text-center text-white">
                                    <h2 className="text-2xl font-bold mb-2">App not found</h2>
                                    <p className="text-white/50">Component for {window.id} is missing.</p>
                                </div>
                            )}
                        </WindowFrame>
                    )
                ))}
            </AnimatePresence>
        </div>
    );
}
