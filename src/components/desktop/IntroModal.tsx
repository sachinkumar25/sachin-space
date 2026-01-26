'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, ChevronRight, X, Briefcase, GraduationCap, Code, Flame, Brain, Terminal, Zap, FileText } from 'lucide-react';
import { useWindowStore } from '@/store/useWindowStore';

export default function IntroModal() {
    const { isAboutOpen, toggleAbout } = useWindowStore();
    const [view, setView] = useState<'main' | 'tech'>('main');

    const handleEnter = () => {
        toggleAbout(false);
    };



    const techCategories = [
        {
            title: "Languages",
            icon: Code,
            skills: ["Python", "TypeScript", "Go", "C++", "Java", "SQL", "Bash"]
        },
        {
            title: "Frameworks",
            icon: Zap,
            skills: ["React", "Next.js", "FastAPI", "Node.js", "Express", "TailwindCSS", "PyTorch"]
        },
        {
            title: "Infrastructure",
            icon: Flame,
            skills: ["AWS (Lambda, EC2, S3)", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Nginx"]
        },
        {
            title: "Data & Tools",
            icon: Terminal,
            skills: ["PostgreSQL", "Redis", "Kafka", "ZeroMQ", "Git", "Linux", "WebSockets"]
        }
    ];

    return (
        <AnimatePresence>
            {isAboutOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
                    className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-xl p-4 overflow-y-auto"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full max-w-5xl bg-[#1e1e1e]/90 border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => toggleAbout(false)}
                            className="absolute top-6 right-6 p-2 text-white/40 hover:text-white transition-colors z-20 hover:bg-white/10 rounded-full"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
                            <AnimatePresence mode="wait">
                                {view === 'main' ? (
                                    <motion.div
                                        key="main"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="p-8 md:p-12"
                                    >
                                        {/* Header Section */}
                                        <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
                                            {/* Profile Visual */}
                                            {/* INSTRUCTION: Add a file named 'profile.jpg' to your public/ folder to see your image here */}
                                            <div className="w-48 h-64 rounded-2xl overflow-hidden shadow-xl flex-shrink-0 bg-gray-800 border-2 border-white/10">
                                                <img
                                                    src="/profile.jpg"
                                                    alt="Sachin"
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        // Fallback if image doesn't exist
                                                        e.currentTarget.style.display = 'none';
                                                        e.currentTarget.parentElement!.classList.add('bg-gradient-to-br', 'from-blue-500', 'to-purple-600', 'flex', 'items-center', 'justify-center');
                                                        e.currentTarget.parentElement!.innerHTML = 'SS';
                                                    }}
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                                                    Hi, I&apos;m Sashvad (Sachin) Satishkumar
                                                </h1>
                                                <p className="text-xl text-blue-400 font-medium mb-4 flex items-center gap-2">
                                                    <Code size={20} /> CS + Data Science Minor Student @ UMD
                                                </p>
                                                <p className="text-gray-400 text-lg flex items-center gap-2 mb-6">
                                                    <GraduationCap size={18} /> University of Maryland, College Park
                                                </p>

                                                <button
                                                    onClick={handleEnter}
                                                    className="group mt-4 px-10 py-6 bg-blue-600/80 hover:bg-blue-500/90 backdrop-blur-xl border border-white/20 text-white text-2xl md:text-3xl font-bold rounded-3xl shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center gap-4"
                                                >
                                                    Explore SachinOS <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Status Bar */}
                                        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-5 mb-10 backdrop-blur-sm">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="relative flex h-3 w-3">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                                    </span>
                                                    <span className="font-semibold text-green-100">Currently: SWE @ Capital One</span>
                                                    <span className="text-white/30 text-sm mx-2">|</span>
                                                    <span className="text-gray-400">Prev: AnaVation LLC</span>
                                                </div>
                                                <div className="text-sm text-green-300/80 font-medium bg-green-500/10 px-3 py-1 rounded-full w-fit">
                                                    🎯 Available for Summer 2026 internships
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                            {/* Left Column: Bio & Specialties */}
                                            <div className="lg:col-span-2 space-y-10">
                                                {/* Bio */}
                                                <section>
                                                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                                        <Brain className="text-purple-400" /> About Me
                                                    </h3>
                                                    <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed text-lg space-y-4">
                                                        <p>
                                                            Hey, I’m Sachin. I’m a CS + Data Science Minor student at UMD who is obsessed with building high-performance systems.
                                                        </p>
                                                        <p>
                                                            Currently, I’m on the Technology Incubator team at Capital One, turning &quot;generative AI&quot; from a buzzword into reliable, cost-effective infrastructure. Before that, I was building satellite intelligence tools at AnaVation and engineering quant trading systems at Sentinel Capital.
                                                        </p>
                                                        <p>
                                                            I’ve actually been doing this for a while! I started researching bioinformatics and geospatial data back in high school (at Dartmouth and GMU), which gave me a deep appreciation for messy data and rigorous testing.
                                                        </p>
                                                        <p>
                                                            I write code in Python, Go, and TypeScript. Outside of the terminal, I’m a big fan of chess, fishing, and cooking.
                                                        </p>
                                                    </div>
                                                </section>

                                                {/* Specializations */}
                                                <section>
                                                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                                        <Zap className="text-yellow-400" /> Technical Focus
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        <Badge>Distributed Systems</Badge>
                                                        <Badge>ML Infrastructure</Badge>
                                                        <Badge>Real-Time Data Pipelines</Badge>
                                                        <Badge>Full-Stack Engineering</Badge>
                                                        <Badge>Cloud Architecture</Badge>
                                                    </div>
                                                </section>
                                            </div>

                                            {/* Right Column: Stats & Actions */}
                                            <div className="space-y-8">
                                                {/* Quick Stats Grid */}
                                                <div className="grid grid-cols-2 gap-3">
                                                    <StatCard number="15+" label="ML Projects" icon={Briefcase} />
                                                    <StatCard number="5" label="Years Coding" icon={Terminal} />
                                                    <StatCard number="127" label="Day Streak" icon={Flame} color="text-orange-500" />
                                                    <StatCard
                                                        number="8+"
                                                        label="Tech Stacks"
                                                        icon={Code}
                                                        onClick={() => setView('tech')}
                                                    />
                                                </div>

                                                {/* Call to Actions */}
                                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                                                    <h3 className="text-white font-semibold mb-2">Connect & Explore</h3>

                                                    <button
                                                        onClick={handleEnter}
                                                        className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                                                    >
                                                        Explore My Work <ChevronRight size={18} />
                                                    </button>

                                                    <button
                                                        className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                                                    >
                                                        <FileText size={18} /> Download Resume
                                                    </button>

                                                    <div className="pt-4 flex justify-between items-center border-t border-white/10 mt-2">
                                                        <SocialIcon icon={Github} url="https://github.com/sachinkumar25" />
                                                        <SocialIcon icon={Linkedin} url="https://linkedin.com/in/sachinsatishkumar" />
                                                        <SocialIcon icon={Mail} url="mailto:sskumar@umd.edu" />
                                                        <SocialIcon icon={Twitter} url="#" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="tech"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.3 }}
                                        className="p-8 md:p-12 h-full flex flex-col"
                                    >
                                        <div className="flex items-center gap-4 mb-8">
                                            <button
                                                onClick={() => setView('main')}
                                                className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors"
                                            >
                                                <ChevronRight size={24} className="rotate-180" />
                                            </button>
                                            <div>
                                                <h2 className="text-3xl font-bold text-white">Technologies & Tools</h2>
                                                <p className="text-blue-400">My technical arsenal</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
                                            {techCategories.map((category) => (
                                                <div key={category.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <category.icon className="text-blue-400" size={24} />
                                                        <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {category.skills.map((skill) => (
                                                            <span key={skill} className="px-3 py-1.5 bg-black/20 border border-white/5 rounded-lg text-gray-300 text-sm font-medium">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-auto pt-6 border-t border-white/10 text-center">
                                            <p className="text-gray-400 mb-4">Constantly learning and experimenting with new tech.</p>
                                            <button
                                                onClick={() => setView('main')}
                                                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-colors"
                                            >
                                                Back to Profile
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Sub-components for cleaner code
function StatCard({ number, label, icon: Icon, color = "text-blue-400", onClick }: { number: string; label: string; icon: React.ElementType; color?: string; onClick?: () => void }) {
    return (
        <div
            onClick={onClick}
            className={`bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all ${onClick ? 'cursor-pointer hover:bg-white/10 hover:scale-105 active:scale-95' : ''}`}
        >
            <Icon size={24} className={`mb-2 ${color}`} />
            <div className="text-2xl font-bold text-white mb-1">{number}</div>
            <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">{label}</div>
        </div>
    );
}

function Badge({ children }: { children: React.ReactNode }) {
    return (
        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 text-sm font-medium">
            {children}
        </span>
    );
}



function SocialIcon({ icon: Icon, url }: { icon: React.ElementType, url: string }) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all hover:scale-110"
        >
            <Icon size={20} />
        </a>
    );
}
