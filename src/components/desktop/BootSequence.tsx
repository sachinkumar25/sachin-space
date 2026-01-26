import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSystemStore } from '@/store/useSystemStore';
import { Rocket } from 'lucide-react';

export default function BootSequence() {
    const { bootStatus, setBootStatus } = useSystemStore();
    const [progress, setProgress] = useState(0);

    // Boot Loader Simulation
    useEffect(() => {
        if (bootStatus === 'booting') {
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        // Skip login, go straight to unlock
                        setTimeout(() => setBootStatus('unlocked'), 500);
                        return 100;
                    }
                    return prev + 2; // Speed
                });
            }, 40); // Slightly faster boot 40ms
            return () => clearInterval(interval);
        }
    }, [bootStatus, setBootStatus]);

    if (bootStatus === 'unlocked') return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-black text-white flex flex-col items-center justify-center font-sf-display">
            <AnimatePresence mode="wait">
                {bootStatus === 'booting' && (
                    <motion.div
                        key="boot"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center gap-8"
                    >
                        {/* Custom Portfolio Boot Logo */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-24 h-24 bg-white/10 rounded-[28px] flex items-center justify-center backdrop-blur-md border border-white/10 shadow-2xl">
                                <Rocket size={48} className="text-white drop-shadow-lg" fill="currentColor" />
                            </div>
                            <h1 className="text-2xl font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                                SachinOS
                            </h1>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-[200px] h-1 bg-[#333] rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
