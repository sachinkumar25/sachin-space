"use client";

import Desktop from "@/components/desktop/Desktop";
import Window from "@/components/windows/Window";
import { useState } from "react";

export default function Home() {
  const [welcomeOpen, setWelcomeOpen] = useState(true);

  return (
    <Desktop>
      <Window
        id="welcome"
        title="Welcome"
        isOpen={welcomeOpen}
        onClose={() => setWelcomeOpen(false)}
        initialPosition={{ x: 300, y: 150 }}
        isActive={true}
      >
        <div className="p-8 text-white space-y-4">
          <h1 className="text-2xl font-bold">Welcome to sachin-space</h1>
          <p>This is a macOS-style portfolio simulation built with Next.js 15 and Tailwind v4.</p>
          <p>Explore the dock to open applications.</p>
        </div>
      </Window>
    </Desktop>
  );
}
