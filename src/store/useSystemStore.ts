import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SystemState {
    wallpaper: string;
    dockSize: number; // Scale factor: 0.5 to 1.5
    bootStatus: 'booting' | 'locked' | 'unlocked';
    isDark: boolean;
    setWallpaper: (url: string) => void;
    setDockSize: (size: number) => void;
    setBootStatus: (status: 'booting' | 'locked' | 'unlocked') => void;
    toggleTheme: () => void;
}

export const useSystemStore = create<SystemState>()(
    persist(
        (set) => ({
            wallpaper: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=3870&auto=format&fit=crop',
            dockSize: 1,
            bootStatus: 'booting', // Initial state
            isDark: true,
            setWallpaper: (url) => set({ wallpaper: url }),
            setDockSize: (size) => set({ dockSize: size }),
            setBootStatus: (status) => set({ bootStatus: status }),
            toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
        }),
        {
            name: 'system-storage',
            partialize: (state) => ({
                // Don't persist boot status so it always reboots on refresh? 
                // Or maybe we want to skip boot on refresh? 
                // For "Delight", let's persist wallpaper/dock, but reset bootStatus on load via a layout effect or similar?
                // Actually, if we persist 'locked' it might be annoying.
                // Let's only persist wallpaper and dockSize.
                wallpaper: state.wallpaper,
                dockSize: state.dockSize,
                isDark: state.isDark
            }),
        }
    )
);
