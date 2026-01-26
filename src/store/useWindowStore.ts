import { create } from 'zustand';
import { AppID } from '@/types/app';
import { WindowState } from '@/types/window';

interface WindowStore {
    windows: Record<string, WindowState>;
    activeWindow: string | null;
    maxZIndex: number;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    openWindow: (id: AppID, args?: any) => void;
    focusWindow: (id: AppID) => void;
    closeWindow: (id: AppID) => void;
    minimizeWindow: (id: AppID) => void;
    toggleMaximize: (id: AppID) => void;
    setWindowPosition: (id: AppID, position: { x: number; y: number }) => void;
    setWindowSize: (id: AppID, size: { width: number; height: number }) => void;

    // Desktop Widgets State
    isAboutOpen: boolean;
    toggleAbout: (isOpen?: boolean) => void;

    isHeroVisible: boolean;
    toggleHero: (isVisible?: boolean) => void;

    isNotificationCenterOpen: boolean;
    toggleNotificationCenter: (isOpen?: boolean) => void;
}

const INITIAL_WINDOW_STATE: Omit<WindowState, 'id' | 'title' | 'zIndex'> = {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 100, y: 50 },
    size: { width: 800, height: 600 },
};

export const useWindowStore = create<WindowStore>((set, get) => ({
    windows: {},
    activeWindow: null,
    maxZIndex: 100,

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    openWindow: (id: AppID, args?: any) => {
        const { windows, maxZIndex, focusWindow } = get();

        // If window exists and is open, just focus it
        if (windows[id]?.isOpen) {
            // Check if we need to update args even if open (e.g. opening a different file in VS Code)
            if (args) {
                set((state) => ({
                    windows: {
                        ...state.windows,
                        [id]: {
                            ...state.windows[id],
                            launchArgs: args, // Update args
                            zIndex: maxZIndex + 1, // Bring to front
                            isMinimized: false,
                        }
                    },
                    activeWindow: id,
                    maxZIndex: maxZIndex + 1,
                }));
            } else {
                focusWindow(id);
            }
            return;
        }

        // Default titles mapping (can be moved to a config later)
        const titles: Record<AppID, string> = {
            terminal: 'Terminal',
            finder: 'Finder',
            projects: 'Projects',
            resume: 'Resume',
            vscode: 'VS Code',
            mail: 'Mail',
            messages: 'Messages',
            github: 'GitHub',
            launchpad: 'Launchpad',
            safari: 'Safari',
            photos: 'Photos',
            calendar: 'Calendar',
            settings: 'Settings',
            experience: 'Experience',
            education: 'Education',
        };

        const newZIndex = maxZIndex + 1;

        set((state) => ({
            windows: {
                ...state.windows,
                [id]: {
                    ...(state.windows[id] || INITIAL_WINDOW_STATE),
                    id,
                    title: titles[id],
                    isOpen: true,
                    isMinimized: false,
                    zIndex: newZIndex,
                    // Calculate center position if needed
                    position: state.windows[id]?.position || (() => {
                        if (typeof window !== 'undefined' && id === 'messages') {
                            const width = 800; // Default width
                            const height = 600; // Default height
                            return {
                                x: Math.max(0, (window.innerWidth - width) / 2),
                                y: Math.max(0, (window.innerHeight - height) / 2 + 5) // Slight adjustment (5px) to clear hero banner without being too low
                            };
                        }
                        return { x: 100 + (newZIndex % 10) * 20, y: 50 + (newZIndex % 10) * 20 };
                    })(),
                    size: state.windows[id]?.size || (id === 'projects' ? { width: 1100, height: 800 } : { width: 800, height: 600 }),
                    launchArgs: args, // Set initial args
                },
            },
            activeWindow: id,
            maxZIndex: newZIndex,
        }));
    },

    focusWindow: (id: AppID) => {
        const { maxZIndex, activeWindow } = get();

        if (activeWindow === id) return;

        const newZIndex = maxZIndex + 1;

        set((state) => ({
            windows: {
                ...state.windows,
                [id]: {
                    ...state.windows[id],
                    zIndex: newZIndex,
                    isMinimized: false,
                },
            },
            activeWindow: id,
            maxZIndex: newZIndex,
        }));
    },

    closeWindow: (id: AppID) => {
        set((state) => ({
            windows: {
                ...state.windows,
                [id]: {
                    ...state.windows[id],
                    isOpen: false,
                },
            },
            activeWindow: null, // Logic to find next active window could be added here
        }));
    },

    minimizeWindow: (id: AppID) => {
        set((state) => ({
            windows: {
                ...state.windows,
                [id]: {
                    ...state.windows[id],
                    isMinimized: true,
                },
            },
            activeWindow: null,
        }));
    },

    toggleMaximize: (id: AppID) => {
        set((state) => ({
            windows: {
                ...state.windows,
                [id]: {
                    ...state.windows[id],
                    isMaximized: !state.windows[id].isMaximized,
                },
            },
        }));
    },

    setWindowPosition: (id: AppID, position) => {
        set((state) => ({
            windows: {
                ...state.windows,
                [id]: {
                    ...state.windows[id],
                    position,
                },
            },
        }));
    },

    setWindowSize: (id: AppID, size) => {
        set((state) => ({
            windows: {
                ...state.windows,
                [id]: {
                    ...state.windows[id],
                    size,
                },
            },
        }));
    },

    isAboutOpen: true, // Default to open on load
    toggleAbout: (isOpen) => {
        set((state) => ({
            isAboutOpen: isOpen !== undefined ? isOpen : !state.isAboutOpen,
        }));
    },

    isHeroVisible: true,
    toggleHero: (isVisible) => {
        set((state) => ({
            isHeroVisible: isVisible !== undefined ? isVisible : !state.isHeroVisible,
        }));
    },

    isNotificationCenterOpen: false,
    toggleNotificationCenter: (isOpen) => {
        set((state) => ({
            isNotificationCenterOpen: isOpen !== undefined ? isOpen : !state.isNotificationCenterOpen,
        }));
    },
}));
