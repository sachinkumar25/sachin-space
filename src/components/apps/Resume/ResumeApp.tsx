'use client';

import React from 'react';

export default function ResumeApp() {
    return (
        <div className="w-full h-full bg-[#525659] flex flex-col items-center justify-center text-white">
            {/* 
        NOTE: You must place your 'resume.pdf' file in the 'public' folder of your project.
        The path below refers to public/resume.pdf
      */}
            <object
                data="/resume.pdf#zoom=75"
                type="application/pdf"
                className="w-full h-full"
            >
                <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-4">
                    <p className="text-xl font-bold">Resume PDF not found</p>
                    <p className="text-gray-400 max-w-md">
                        Please place your <code className="bg-black/30 px-2 py-1 rounded text-blue-300">resume.pdf</code> file
                        inside the <code className="bg-black/30 px-2 py-1 rounded text-green-300">public/</code> folder of this project.
                    </p>
                    <a
                        href="/resume.pdf"
                        className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
                        download
                    >
                        Download Resume
                    </a>
                </div>
            </object>
        </div>
    );
}
