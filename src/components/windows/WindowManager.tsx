import { useWindowStore } from '@/store/useWindowStore';
import { AnimatePresence } from 'framer-motion';
import WindowFrame from './WindowFrame';

import ProjectsApp from '../apps/Projects/ProjectsApp';
import VSCodeApp from '../apps/VSCode/VSCodeApp';
import ResumeApp from '../apps/Resume/ResumeApp';
import MailApp from '../apps/Mail/MailApp';
import MessagesApp from '../apps/Messages/MessagesApp';
import FinderApp from '../apps/Finder/FinderApp';
import LaunchpadApp from '../apps/Launchpad/LaunchpadApp';
import SettingsApp from '../apps/Settings/SettingsApp';
import ExperienceApp from '../apps/Experience/ExperienceApp';
import EducationApp from '../apps/Education/EducationApp';
import TerminalApp from '../apps/Terminal/Terminal';
import SafariApp from '../apps/Safari/SafariApp';
import PhotosApp from '../apps/Photos/PhotosApp';
import CalendarApp from '../apps/Calendar/CalendarApp';

export default function WindowManager() {
    const windows = useWindowStore((state) => state.windows);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <AnimatePresence>
                {Object.values(windows)
                    // .filter(w => w.id !== 'terminal') // Removed filter
                    .sort((a, b) => a.id.localeCompare(b.id))
                    .map((window) => (
                        window.isOpen && (
                            <WindowFrame key={window.id} window={window}>
                                {window.id === 'finder' ? (
                                    <FinderApp />
                                ) : window.id === 'safari' ? (
                                    <SafariApp />
                                ) : window.id === 'photos' ? (
                                    <PhotosApp />
                                ) : window.id === 'calendar' ? (
                                    <CalendarApp />
                                ) : window.id === 'terminal' ? (
                                    <TerminalApp />
                                ) : window.id === 'projects' ? (
                                    <ProjectsApp />
                                ) : window.id === 'vscode' ? (
                                    <VSCodeApp />
                                ) : window.id === 'resume' ? (
                                    <ResumeApp />
                                ) : window.id === 'mail' ? (
                                    <MailApp />
                                ) : window.id === 'messages' ? (
                                    <MessagesApp />
                                ) : window.id === 'launchpad' ? (
                                    <LaunchpadApp />
                                ) : window.id === 'settings' ? (
                                    <SettingsApp />
                                ) : window.id === 'experience' ? (
                                    <ExperienceApp />
                                ) : window.id === 'education' ? (
                                    <EducationApp />
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
