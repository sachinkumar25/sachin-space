"use client";

import React, { useRef } from 'react';
import MenuBar from './MenuBar';
import Dock from './Dock';
import WindowManager from '../windows/WindowManager';

interface DesktopProps {
  children?: React.ReactNode;
}

export default function Desktop({ children }: DesktopProps) {
  const desktopRef = useRef<HTMLDivElement>(null);

  return (
    <main
      ref={desktopRef}
      className="relative w-screen h-screen overflow-hidden bg-[url('https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=3870&auto=format&fit=crop')] bg-cover bg-center text-white selection:bg-macos-blue selection:text-white"
    >
      {/* Background Overlay for better contrast if needed, currently disabled to show wallpaper */}
      {/* <div className="absolute inset-0 bg-black/10 pointer-events-none" /> */}

      <MenuBar />

      <div className="relative z-0 w-full h-full pt-8 pb-20">
        {/* Desktop Icons Area */}
        {children}
        <WindowManager />
      </div>

      <Dock />
    </main>
  );
}
