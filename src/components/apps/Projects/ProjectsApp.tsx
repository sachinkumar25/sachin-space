'use client';

import React from 'react';
import { projects } from '@/data/projects';
import { useWindowStore } from '@/store/useWindowStore';
import { Github, Globe, Code } from 'lucide-react';

export default function ProjectsApp() {
    const { openWindow } = useWindowStore();

    return (
        <div className="h-full overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="group flex flex-col bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:border-white/20"
                    >
                        {/* Project Image */}
                        {project.image && (
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] to-transparent opacity-60" />
                            </div>
                        )}

                        {/* Header / Title */}
                        <div className="p-5 flex items-start justify-between relative">
                            <div>
                                <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                                    {project.description}
                                </p>
                            </div>
                        </div>

                        {/* Metrics Section */}
                        {project.metrics && (
                            <div className="px-5 pb-4">
                                <ul className="space-y-1">
                                    {project.metrics.map((metric, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                                            <span className="text-green-400 mt-1">✓</span>
                                            <span>{metric}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Spacer */}
                        <div className="flex-1" />

                        {/* Tech Stack */}
                        <div className="px-5 pb-4 flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Footer / Actions */}
                        <div className="p-4 bg-black/20 border-t border-white/5 flex items-center justify-between pointer-events-auto">
                            {/* Links */}
                            <div className="flex gap-3">
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-white transition-colors"
                                        title="View on GitHub"
                                        onClick={(e) => e.stopPropagation()} // Prevent card click if we add one later
                                    >
                                        <Github size={18} />
                                    </a>
                                )}
                                {project.demoUrl && (
                                    <a
                                        href={project.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-white transition-colors"
                                        title="Live Demo"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Globe size={18} />
                                    </a>
                                )}
                            </div>

                            {/* View Code Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    openWindow('vscode', {
                                        file: `${project.id}.ts`, // Or just project title
                                        code: project.codeSnippet
                                    });
                                }}
                                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/5"
                            >
                                <Code size={14} />
                                View Code
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
