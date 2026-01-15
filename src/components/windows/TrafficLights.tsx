'use client';

import { X, Minus, Plus } from 'lucide-react';
import { useWindowStore } from '@/store/useWindowStore';
import { AppID } from '@/types/app';
import clsx from 'clsx';

interface TrafficLightsProps {
    id: AppID;
}

export default function TrafficLights({ id }: TrafficLightsProps) {
    const { closeWindow, minimizeWindow, toggleMaximize } = useWindowStore();

    return (
        <div
            className="flex gap-2 group nodrag"
            onPointerDown={(e) => e.stopPropagation()}
        >
            {/* Close (Red) */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    closeWindow(id);
                }}
                className={clsx(
                    "w-3 h-3 rounded-full flex items-center justify-center transition-colors",
                    "bg-[#FF5F56] border border-[#E0443E]",
                    "hover:bg-[#FF5F56] active:bg-[#BF4A43]"
                )}
            >
                <X
                    size={6}
                    strokeWidth={4}
                    className="opacity-0 group-hover:opacity-100 text-[#4c0002]"
                />
            </button>

            {/* Minimize (Yellow) */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    minimizeWindow(id);
                }}
                className={clsx(
                    "w-3 h-3 rounded-full flex items-center justify-center transition-colors",
                    "bg-[#FFBD2E] border border-[#DEA123]",
                    "hover:bg-[#FFBD2E] active:bg-[#D99E1F]"
                )}
            >
                <Minus
                    size={6}
                    strokeWidth={4}
                    className="opacity-0 group-hover:opacity-100 text-[#593d01]"
                />
            </button>

            {/* Maximize (Green) */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    toggleMaximize(id);
                }}
                className={clsx(
                    "w-3 h-3 rounded-full flex items-center justify-center transition-colors",
                    "bg-[#27C93F] border border-[#1AAB29]",
                    "hover:bg-[#27C93F] active:bg-[#1F9F31]"
                )}
            >
                <Plus
                    size={6}
                    strokeWidth={4}
                    className="opacity-0 group-hover:opacity-100 text-[#0c4002]"
                />
            </button>
        </div>
    );
}
