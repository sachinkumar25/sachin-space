'use client';

import React from 'react';
import { Download } from 'lucide-react';

export default function ResumeApp() {
    return (
        <div className="w-full h-full bg-[#525659] overflow-y-auto p-4 md:p-8 flex justify-center scrollbar-thin scrollbar-thumb-white/20">
            {/* The Paper */}
            <div className="max-w-[800px] w-full min-h-[1100px] bg-white text-black shadow-2xl mx-auto p-8 md:p-12 relative print:shadow-none print:m-0 print:p-0">

                {/* Header */}
                <header className="border-b-2 border-gray-800 pb-6 mb-8 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-2">
                        Sachin Kumar
                    </h1>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm md:text-base text-gray-600 font-sans">
                        <span>San Francisco, CA</span>
                        <span>•</span>
                        <a href="mailto:sachin@example.com" className="hover:text-blue-600 hover:underline">
                            sachin@example.com
                        </a>
                        <span>•</span>
                        <a href="https://github.com/sachin" target="_blank" className="hover:text-blue-600 hover:underline">
                            github.com/sachin
                        </a>
                        <span>•</span>
                        <a href="https://linkedin.com/in/sachin" target="_blank" className="hover:text-blue-600 hover:underline">
                            linkedin.com/in/sachin
                        </a>
                    </div>
                </header>

                {/* Content */}
                <div className="space-y-8 font-sans">

                    {/* Education */}
                    <section>
                        <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-4 text-gray-800 font-serif">
                            Education
                        </h2>
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-bold text-lg">University of Technology</h3>
                                <p className="text-gray-700">Bachelor of Science in Computer Science</p>
                            </div>
                            <div className="text-right text-sm text-gray-600">
                                <p className="font-semibold">Graduating May 2026</p>
                                <p>GPA: 3.9/4.0</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                            Relevant Coursework: Data Structures & Algorithms, Machine Learning, Operating Systems, Distributed Systems.
                        </p>
                    </section>

                    {/* Experience */}
                    <section>
                        <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-4 text-gray-800 font-serif">
                            Experience
                        </h2>

                        {/* Job 1 */}
                        <div className="mb-6">
                            <div className="flex justify-between items-start mb-1">
                                <div>
                                    <h3 className="font-bold text-lg">Tech Giant Corp</h3>
                                    <p className="text-gray-700 font-medium">Software Engineer Intern</p>
                                </div>
                                <span className="text-sm text-gray-600 font-semibold">Summer 2025</span>
                            </div>
                            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                <li>Optimize high-throughput data ingestion pipelines using Go and Kafka, reducing latency by 40%.</li>
                                <li>Collaborated with the AI team to implement RAG for internal documentation search.</li>
                                <li>Developed unit and integration tests achieving 95% code coverage.</li>
                            </ul>
                        </div>

                        {/* Job 2 */}
                        <div>
                            <div className="flex justify-between items-start mb-1">
                                <div>
                                    <h3 className="font-bold text-lg">Startup Inc</h3>
                                    <p className="text-gray-700 font-medium">Full Stack Developer</p>
                                </div>
                                <span className="text-sm text-gray-600 font-semibold">2023 - 2024</span>
                            </div>
                            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                <li>Built a responsive marketing website using Next.js and Tailwind CSS, increasing conversion by 25%.</li>
                                <li>Implemented user authentication and subscription payments using Stripe and Supabase.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Projects */}
                    <section>
                        <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-4 text-gray-800 font-serif">
                            Projects
                        </h2>

                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-1">
                                <h3 className="font-bold text-lg">AI Trading Bot</h3>
                                <span className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-600">Python, PyTorch</span>
                            </div>
                            <p className="text-sm text-gray-700">
                                Reinforcement learning agent trained to trade crypto futures. Implements PPO algorithm and validates strategies using historical backtesting.
                            </p>
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-1">
                                <h3 className="font-bold text-lg">MacOS Portfolio</h3>
                                <span className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-600">Next.js, TypeScript</span>
                            </div>
                            <p className="text-sm text-gray-700">
                                A fully functional desktop operating system simulation in the browser. Features window management, file system, and an integrated LLM assistant.
                            </p>
                        </div>
                    </section>

                    {/* Skills */}
                    <section>
                        <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-4 text-gray-800 font-serif">
                            Skills
                        </h2>
                        <div className="text-sm text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <span className="font-bold">Languages:</span> Python, TypeScript, JavaScript, Go, SQL, HTML/CSS
                            </div>
                            <div>
                                <span className="font-bold">Frameworks:</span> React, Next.js, PyTorch, FastAPI, Node.js
                            </div>
                            <div>
                                <span className="font-bold">Tools:</span> Git, Docker, AWS, Firebase, Vercel, Figma
                            </div>
                            <div>
                                <span className="font-bold">Libraries:</span> Tailwind CSS, Framer Motion, Zustand, OpenAI SDK
                            </div>
                        </div>
                    </section>

                </div>
            </div>

            {/* FAB - Download Button */}
            <button
                className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                onClick={() => alert('Downloading PDF... (Mock)')}
            >
                <Download size={20} />
                Download PDF
            </button>
        </div>
    );
}
