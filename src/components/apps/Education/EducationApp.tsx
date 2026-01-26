import React, { useState } from 'react';
import { educationExperiences } from '@/data/experience';
import { Trophy, GraduationCap, Users, BookOpen, MapPin, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EducationApp() {
    const [selectedId, setSelectedId] = useState<string>(educationExperiences[0].id);
    const selectedEdu = educationExperiences.find(e => e.id === selectedId) || educationExperiences[0];

    return (
        <div className="flex h-full w-full bg-[#1e1e1e] font-sf-text text-white/90 selection:bg-macos-blue selection:text-white">
            {/* Sidebar (Master) */}
            <div className="w-[200px] flex-shrink-0 flex flex-col border-r border-white/10 bg-[#2C2C2C]/50 backdrop-blur-xl">
                <div className="p-4 border-b border-white/5">
                    <h2 className="text-[13px] font-sf-display font-semibold text-white/50 px-2 mb-2">Education</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
                    {educationExperiences.map((edu) => (
                        <button
                            key={edu.id}
                            onClick={() => setSelectedId(edu.id)}
                            className={`w-full text-left p-3 rounded-lg transition-colors flex flex-col gap-0.5 ${selectedId === edu.id
                                ? 'bg-macos-blue text-white'
                                : 'hover:bg-white/5 text-white/90'
                                }`}
                        >
                            <span className={`text-[13px] font-semibold leading-tight ${selectedId === edu.id ? 'text-white' : 'text-white/90'}`}>
                                {edu.company}
                            </span>
                            <span className={`text-[12px] leading-tight line-clamp-1 ${selectedId === edu.id ? 'text-white/90' : 'text-white/50'}`}>
                                {edu.role}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area (Detail) */}
            <div className="flex-1 flex flex-col bg-[#1e1e1e]">
                {/* Header */}
                <div className="h-14 border-b border-white/5 flex items-center px-8 bg-[#1e1e1e]/80 backdrop-blur-md sticky top-0 z-10 w-full mb-6">
                    <div className="flex flex-col">
                        <h1 className="text-[17px] font-sf-display font-semibold text-white tracking-tight">
                            {selectedEdu.company}
                        </h1>
                        <span className="text-[12px] text-macos-blue font-medium flex items-center gap-1.5">
                            {selectedEdu.role}
                        </span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-8 pb-12">
                    <div className="max-w-3xl">
                        {/* Meta Data */}
                        <div className="flex gap-6 mb-8 text-[13px] text-white/60 border-b border-white/5 pb-4">
                            <div className="flex items-center gap-2">
                                <Calendar size={14} /> {selectedEdu.date}
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={14} /> {selectedEdu.location}
                            </div>
                        </div>

                        {/* Content Parsing Loop */}
                        <div className="space-y-6">
                            {selectedEdu.description.map((item, i) => {
                                if (item.startsWith('GPA:')) {
                                    return (
                                        <div key={i} className="mac-card p-4 rounded-xl flex items-center gap-3">
                                            <div className="bg-macos-green/20 p-2 rounded-lg text-macos-green">
                                                <GraduationCap size={20} />
                                            </div>
                                            <div>
                                                <div className="text-[11px] text-white/50 uppercase tracking-wider font-semibold">GPA Score</div>
                                                <div className="text-[17px] font-sf-display font-bold text-white">{item.replace('GPA: ', '')}</div>
                                            </div>
                                        </div>
                                    )
                                }
                                if (item.startsWith('Academic Distinctions:') || item.startsWith('Honors & Awards:')) {
                                    return (
                                        <div key={i}>
                                            <h3 className="flex items-center gap-2 text-[15px] font-semibold text-white mb-3">
                                                <Trophy size={16} className="text-macos-yellow" /> Awards & Honors
                                            </h3>
                                            <div className="mac-card p-5 rounded-2xl text-[14px] leading-relaxed text-white/80">
                                                {item.split(':')[1]}
                                            </div>
                                        </div>
                                    )
                                }
                                if (item.startsWith('Activities & Societies:')) {
                                    return (
                                        <div key={i}>
                                            <h3 className="flex items-center gap-2 text-[15px] font-semibold text-white mb-3">
                                                <Users size={16} className="text-macos-blue" /> Activities
                                            </h3>
                                            <div className="mac-card p-5 rounded-2xl text-[14px] leading-relaxed text-white/80">
                                                {item.split(':')[1]}
                                            </div>
                                        </div>
                                    )
                                }
                                if (item.startsWith('Relevant Coursework:')) {
                                    return (
                                        <div key={i}>
                                            <h3 className="flex items-center gap-2 text-[15px] font-semibold text-white mb-3">
                                                <BookOpen size={16} className="text-macos-red" /> Coursework
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {item.split(':')[1].split(',').map((course, idx) => (
                                                    <span key={idx} className="mac-badge">
                                                        {course.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                }
                                return (
                                    <p key={i} className="text-white/70 leading-relaxed text-[14px]">{item}</p>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
