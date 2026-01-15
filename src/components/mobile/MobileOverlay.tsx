'use client';

import React, { useState } from 'react';

export default function MobileOverlay() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="md:hidden fixed inset-0 z-[9999] bg-black text-white flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
            <h2 className="text-2xl font-bold mb-4">Desktop Experience Recommended</h2>
            <p className="mb-8 text-gray-400">
                This Operating System simulation is optimized for Mouse & Keyboard.
                <br />
                On mobile, dragging and resizing are disabled.
            </p>
            <button
                onClick={() => setIsVisible(false)}
                className="px-6 py-2 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-colors font-medium active:scale-95"
            >
                Continue (Lite Mode)
            </button>
        </div>
    );
}
