import React, { useState, useEffect } from 'react';
import { careerExperiences, schoolExperiences } from '@/data/experience';
import { Briefcase, School, MapPin, Calendar, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExperienceApp() {
    const [activeTab, setActiveTab] = useState<'career' | 'school'>('career');
    const experiences = activeTab === 'career' ? careerExperiences : schoolExperiences;
    const [selectedId, setSelectedId] = useState<string>(experiences[0].id);

    const handleTabChange = (tab: 'career' | 'school') => {
        setActiveTab(tab);
        const newExperiences = tab === 'career' ? careerExperiences : schoolExperiences;
        setSelectedId(newExperiences[0].id);
    };

    const selectedExperience = experiences.find(e => e.id === selectedId) || experiences[0];

    return (
        <div className="flex h-full w-full bg-[#1e1e1e] font-sf-text text-white/90 selection:bg-macos-blue selection:text-white">
            {/* Sidebar (Master) */}
            <div className="w-[200px] flex-shrink-0 flex flex-col border-r border-white/10 bg-[#2C2C2C]/50 backdrop-blur-xl">
                {/* Traffic Lights Placeholder (handled by window decoration, but spacing needed if custom header) */}
                {/* For now, assuming Window Frame takes care of traffic lights styling, we just need padding */}

                {/* Search / Tabs Area */}
                <div className="p-4 border-b border-white/5 space-y-3">
                    <h2 className="text-[13px] font-sf-display font-semibold text-white/50 px-2">Experience</h2>

                    {/* Segmented Control */}
                    <div className="grid grid-cols-2 bg-[#1A1A1A] p-0.5 rounded-lg border border-white/5">
                        <button
                            onClick={() => handleTabChange('career')}
                            className={`flex justify-center items-center gap-2 py-1.5 rounded-[5px] text-[11px] font-medium transition-all ${activeTab === 'career'
                                ? 'bg-[#404040] text-white shadow-sm ring-1 ring-white/10'
                                : 'text-white/50 hover:text-white'
                                }`}
                        >
                            <Briefcase size={12} />
                            Career
                        </button>
                        <button
                            onClick={() => handleTabChange('school')}
                            className={`flex justify-center items-center gap-2 py-1.5 rounded-[5px] text-[11px] font-medium transition-all ${activeTab === 'school'
                                ? 'bg-[#404040] text-white shadow-sm ring-1 ring-white/10'
                                : 'text-white/50 hover:text-white'
                                }`}
                        >
                            <School size={12} />
                            Involvement
                        </button>
                    </div>
                </div>

                {/* List Items */}
                <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
                    {experiences.map((exp) => (
                        <button
                            key={exp.id}
                            onClick={() => setSelectedId(exp.id)}
                            className={`w-full text-left p-3 rounded-lg transition-colors flex flex-col gap-0.5 ${selectedId === exp.id
                                ? 'bg-macos-blue text-white'
                                : 'hover:bg-white/5 text-white/90'
                                }`}
                        >
                            <span className={`text-[13px] font-semibold leading-tight ${selectedId === exp.id ? 'text-white' : 'text-white/90'}`}>
                                {exp.role}
                            </span>
                            <span className={`text-[12px] leading-tight line-clamp-1 ${selectedId === exp.id ? 'text-white/90' : 'text-white/50'}`}>
                                {exp.company}
                            </span>
                            <span className={`text-[11px] mt-1 ${selectedId === exp.id ? 'text-white/80' : 'text-white/40'}`}>
                                {exp.date}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area (Detail) */}
            <div className="flex-1 flex flex-col bg-[#1e1e1e]">
                {/* Header */}
                <div className="h-14 border-b border-white/5 flex items-center px-8 bg-[#1e1e1e]/80 backdrop-blur-md sticky top-0 z-10 w-full">
                    <div className="flex flex-col">
                        <h1 className="text-lg font-sf-display font-semibold text-white tracking-tight">
                            {selectedExperience.role}
                        </h1>
                        <span className="text-xs text-macos-blue font-medium flex items-center gap-1.5">
                            {selectedExperience.company}
                        </span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 pb-16">
                    <div className="max-w-3xl">
                        {/* Meta Data Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                <span className="text-xs text-white/40 block mb-1.5">Duration</span>
                                <div className="flex items-center gap-2 text-sm text-white/90">
                                    <Calendar size={14} className="text-macos-orange" />
                                    {selectedExperience.date}
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                <span className="text-xs text-white/40 block mb-1.5">Location</span>
                                <div className="flex items-center gap-2 text-sm text-white/90">
                                    <MapPin size={14} className="text-macos-red" />
                                    {selectedExperience.location}
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                <span className="text-xs text-white/40 block mb-1.5">Type</span>
                                <div className="flex items-center gap-2 text-sm text-white/90">
                                    <Globe size={14} className="text-macos-teal" />
                                    {activeTab === 'career' ? 'Professional' : 'Extracurricular'}
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="prose prose-invert max-w-none">
                            <h3 className="text-sm font-semibold text-white mb-3">Role Overview</h3>
                            {/* Using mac-card for the main content block for emphasis */}
                            <div className="mac-card p-6 rounded-xl mb-8">
                                <ul className="list-disc list-outside ml-4 space-y-3 text-sm leading-relaxed text-white/80 marker:text-macos-blue">
                                    {selectedExperience.description.map((item, i) => (
                                        <li key={i} className="pl-1">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Skills */}
                        {selectedExperience.skills.length > 0 && (
                            <div>
                                <h3 className="text-xs font-semibold text-white/50 mb-3 uppercase tracking-wider">Technologies & Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedExperience.skills.map((skill, i) => (
                                        <span key={i} className="mac-badge text-xs">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
