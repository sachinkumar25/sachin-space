'use client';

import React, { useState } from 'react';
import { projects } from '@/data/projects';
import { useWindowStore } from '@/store/useWindowStore';
import { Github, Globe, Code, FileText, Download, ExternalLink, Briefcase, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PUBLICATIONS = [
    {
        id: 'mobility-network',
        title: 'Human mobility-based synthetic social network generation',
        abstract: 'A framework for generating synthetic social networks based on human mobility patterns. This study explores how movement data can be used to model social ties and interactions, providing insights for urban planning and epidemiological modeling.',
        pdfPath: '/Mobility_Social_Networks.pdf.pdf',
        tags: ['Social Networks', 'Data Science', 'Human Mobility']
    },
    {
        id: 'tacs-traffic',
        title: 'TACS: A Calibrated Highway Surveillance Dataset for Traffic Analysis',
        abstract: 'Presented at the 2022 IEEE Eighth International Conference on Multimedia Big Data (BigMM). TACS provides a calibrated dataset for highway surveillance, enabling robust computer vision research in traffic analysis and vehicle tracking.',
        pdfPath: '/TACS_Traffic_Dataset.pdf.pdf',
        tags: ['Computer Vision', 'Traffic Analysis', 'IEEE BigMM']
    }
];

// CSS-based Paper Thumbnail Component
const PaperThumbnail = () => (
    <div className="w-full h-full bg-white relative shadow-sm overflow-hidden flex flex-col p-3">
        {/* Header Lines */}
        <div className="flex gap-2 mb-3">
            <div className="w-1/3 h-1.5 bg-gray-200 rounded-sm" />
            <div className="w-1/4 h-1.5 bg-gray-200 rounded-sm" />
        </div>

        {/* Body Text Lines (Simulating Abstract) */}
        <div className="space-y-1.5">
            <div className="w-full h-1 bg-gray-100 rounded-[1px]" />
            <div className="w-full h-1 bg-gray-100 rounded-[1px]" />
            <div className="w-11/12 h-1 bg-gray-100 rounded-[1px]" />
            <div className="w-full h-1 bg-gray-100 rounded-[1px]" />
            <div className="w-4/5 h-1 bg-gray-100 rounded-[1px]" />
            <div className="w-full h-1 bg-gray-100 rounded-[1px]" />
            <div className="w-3/4 h-1 bg-gray-100 rounded-[1px]" />
            {/* Gap */}
            <div className="h-2" />
            {/* More Lines (2nd Paragraph) */}
            <div className="w-full h-1 bg-gray-100 rounded-[1px]" />
            <div className="w-11/12 h-1 bg-gray-100 rounded-[1px]" />
            <div className="w-full h-1 bg-gray-100 rounded-[1px]" />
            <div className="w-1/2 h-1 bg-gray-100 rounded-[1px]" />
        </div>

        {/* Footer/Page Number */}
        <div className="mt-auto self-center w-4 h-1 bg-gray-200 rounded-[1px]" />

        {/* Gradient Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none" />
    </div>
);

export default function ProjectsApp() {
    const { openWindow } = useWindowStore();
    const [activeTab, setActiveTab] = useState<'projects' | 'publications'>('projects');

    return (
        <div className="h-full flex flex-col bg-[#1e1e1e] text-white">
            {/* Header / Tabs */}
            <div className="sticky top-0 z-20 bg-[#1e1e1e]/80 backdrop-blur-xl border-b border-white/5 py-4 px-6 flex items-center justify-between">
                <h2 className="text-[17px] font-sf-display font-semibold tracking-tight text-white/90 hidden md:block">
                    {activeTab === 'projects' ? 'My Work' : 'Research'}
                </h2>

                {/* Segmented Control */}
                <div className="flex bg-white/10 p-1 rounded-lg mx-auto md:mx-0">
                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`flex items-center gap-2 px-6 py-1.5 rounded-[6px] text-[13px] font-medium transition-all ${activeTab === 'projects'
                            ? 'bg-[#606060]/50 text-white shadow-sm'
                            : 'text-white/60 hover:text-white/80 hover:bg-white/5'
                            }`}
                    >
                        <Briefcase size={14} />
                        Projects
                    </button>
                    <button
                        onClick={() => setActiveTab('publications')}
                        className={`flex items-center gap-2 px-6 py-1.5 rounded-[6px] text-[13px] font-medium transition-all ${activeTab === 'publications'
                            ? 'bg-[#606060]/50 text-white shadow-sm'
                            : 'text-white/60 hover:text-white/80 hover:bg-white/5'
                            }`}
                    >
                        <BookOpen size={14} />
                        Publications
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <AnimatePresence mode="wait">
                    {activeTab === 'projects' ? (
                        <motion.div
                            key="projects"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8"
                        >
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
                                            <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-[13px] text-gray-300 mt-2 line-clamp-2">
                                                {project.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="px-5 pb-4 flex flex-wrap gap-2 mt-auto">
                                        {project.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Footer */}
                                    <div className="p-4 bg-black/20 border-t border-white/5 flex items-center justify-between pointer-events-auto">
                                        <div className="flex gap-3">
                                            {project.githubUrl && (
                                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                                    <Github size={18} />
                                                </a>
                                            )}
                                            {project.demoUrl && (
                                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                                    <Globe size={18} />
                                                </a>
                                            )}
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openWindow('vscode', {
                                                    file: `${project.id}.ts`,
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
                        </motion.div>
                    ) : (
                        <motion.div
                            key="publications"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8"
                        >
                            {PUBLICATIONS.map((pub, index) => (
                                <div key={pub.id} className="mac-card p-0 rounded-xl flex flex-col relative group border border-white/5 hover:border-white/10 transition-all overflow-hidden h-full">

                                    {/* Top Section: Thumbnail + Basic Info */}
                                    <div className="p-5 flex gap-5 items-start">
                                        {/* Paper Thumbnail */}
                                        <div className="flex-shrink-0 w-24 h-32 md:w-28 md:h-36 bg-[#f0f0f0] rounded-lg shadow-inner border border-white/10 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                                            <PaperThumbnail />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <h3 className="text-[15px] font-bold text-white group-hover:text-blue-300 transition-colors leading-tight line-clamp-3">
                                                    {pub.title}
                                                </h3>
                                            </div>
                                            {/* Tags inline/below title */}
                                            <div className="flex flex-wrap gap-1.5 mt-3">
                                                {pub.tags.slice(0, 3).map(tag => (
                                                    <span key={tag} className="mac-badge text-[10px] px-1.5 py-0.5 border-white/10 bg-white/5">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Abstract Section (Aligned rows) */}
                                    <div className="px-5 pb-4 flex-1">
                                        <p className="text-white/60 text-[13px] leading-relaxed font-sf-text line-clamp-4">
                                            {pub.abstract}
                                        </p>
                                    </div>

                                    {/* Footer Actions */}
                                    <div className="p-4 bg-black/20 border-t border-white/5 flex gap-3 mt-auto">
                                        <button
                                            onClick={() => window.open(pub.pdfPath, '_blank')}
                                            className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg text-xs font-medium transition-colors border border-white/5 flex items-center justify-center gap-2 group/btn"
                                        >
                                            <BookOpen size={14} className="group-hover/btn:text-blue-300 transition-colors" /> Read PDF
                                        </button>
                                        <button
                                            onClick={() => {
                                                const link = document.createElement('a');
                                                link.href = pub.pdfPath;
                                                link.download = pub.pdfPath.split('/').pop() || 'publication.pdf';
                                                link.click();
                                            }}
                                            className="px-3 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-medium transition-colors border border-white/5 flex items-center justify-center"
                                            title="Download PDF"
                                        >
                                            <Download size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
