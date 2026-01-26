import React, { useRef, useEffect, useState } from 'react';
import MenuBar from './MenuBar';
import Dock from './Dock';
import WindowManager from '../windows/WindowManager';
import MobileOverlay from '../mobile/MobileOverlay';
import IntroModal from './IntroModal';
import NotificationCenter from './NotificationCenter';
import ShortcutsOverlay from './ShortcutsOverlay';
import DesktopWidgets from './DesktopWidgets';
import StickyNote from './StickyNote';
import Spotlight from './Spotlight';
import BootSequence from './BootSequence';
import { useSystemStore } from '@/store/useSystemStore';
import { useWindowStore } from '@/store/useWindowStore';
import { AppID } from '@/types/app';

interface DesktopProps {
  children?: React.ReactNode;
}

export default function Desktop({ children }: DesktopProps) {
  const desktopRef = useRef<HTMLDivElement>(null);
  const { openWindow, closeWindow, activeWindow, toggleAbout } = useWindowStore();
  const { wallpaper } = useSystemStore();

  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showSpotlight, setShowSpotlight] = useState(false);

  useEffect(() => {
    // Auto-open Messages with welcome message
    const timer = setTimeout(() => {
      openWindow('messages');
    }, 1500);

    return () => clearTimeout(timer);
  }, [openWindow]);

  // Global Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Shortcuts: ? (Shift + /)
      if (e.key === '?' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        setShowShortcuts(prev => !prev);
      }

      // Close Active Window: Esc
      if (e.key === 'Escape') {
        setShowShortcuts(false); // also close overlay
        if (activeWindow) {
          closeWindow(activeWindow as AppID);
        }
      }

      // Meta Shortcuts
      if (e.metaKey || e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case 'p':
            e.preventDefault();
            openWindow('projects');
            break;
          case 'r':
            e.preventDefault();
            openWindow('resume');
            break;
          case 'i':
            e.preventDefault();
            toggleAbout(true);
            break;
          case '.': // Hidden shortcut for settings
            e.preventDefault();
            openWindow('settings');
            break;
          case 'k': // Spotlight (Cmd+K)
          case ' ': // Spotlight (Cmd+Space)
            e.preventDefault();
            setShowSpotlight(prev => !prev);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeWindow, openWindow, closeWindow, toggleAbout]);

  return (
    <main
      ref={desktopRef}
      className="relative w-screen h-screen overflow-hidden bg-cover bg-center text-white selection:bg-macos-blue selection:text-white transition-[background-image] duration-700 ease-in-out"
      style={{ backgroundImage: `url('${wallpaper}')` }}
    >
      <MenuBar />

      <div className="relative z-0 w-full h-full pt-8 pb-20">
        {/* Desktop Icons Area */}
        {children}

        {/* Widgets Layer (Lower Priority) */}
        <DesktopWidgets />
        <StickyNote />

        {/* Windows Layer (Higher Priority - Z-Index managed by window store) */}
        <WindowManager />
      </div>

      <Dock />
      <NotificationCenter />
      <IntroModal />
      <MobileOverlay />

      {/* Spotlight */}
      <Spotlight isOpen={showSpotlight} onClose={() => setShowSpotlight(false)} />

      {/* Boot Sequence (Overlay) */}
      <BootSequence />

      {/* Shortcuts Overlay */}
      <ShortcutsOverlay isOpen={showShortcuts} onClose={() => setShowShortcuts(false)} />
    </main>
  );
}
