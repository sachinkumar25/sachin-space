import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Search, Calendar as CalendarIcon, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { careerExperiences, schoolExperiences, educationExperiences } from '@/data/experience';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function CalendarApp() {
    const [view, setView] = useState<'month' | 'year' | 'timeline'>('timeline');
    const [currentDate, setCurrentDate] = useState(new Date());

    // Combine all experiences into one timeline
    const allEvents = [
        ...careerExperiences.map(e => ({ ...e, type: 'career' })),
        ...schoolExperiences.map(e => ({ ...e, type: 'school' })),
        ...educationExperiences.map(e => ({ ...e, type: 'education' }))
    ].sort((a, b) => -1); // Keep original order roughly (relying on data source)

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        return { daysInMonth, firstDayOfMonth };
    };

    const handlePrev = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNext = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleToday = () => {
        setCurrentDate(new Date());
    };

    const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentDate);
    const days = [...Array(daysInMonth).keys()].map(i => i + 1);
    const blanks = [...Array(firstDayOfMonth).keys()];

    return (
        <div className="flex h-full bg-[#1e1e1e] text-white overflow-hidden font-sf-text">
            {/* Sidebar */}
            <div className="w-[220px] bg-[#2C2C2C]/50 border-r border-white/10 hidden md:flex flex-col p-4 pt-8">
                <div className="flex flex-col gap-1 mb-8">
                    <div className="w-full bg-red-500 rounded-lg h-24 flex flex-col items-center justify-center shadow-lg mb-4 border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-6 bg-black/10 flex items-center justify-center text-[10px] font-semibold tracking-widest text-white/90 uppercase">
                            {new Date().toLocaleString('default', { weekday: 'long' })}
                        </div>
                        <span className="text-4xl font-light text-white mt-4">{new Date().getDate()}</span>
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="px-3 py-1 text-white/40 text-[11px] font-bold uppercase tracking-wider mb-2">Calendars</div>
                    <button onClick={() => setView('timeline')} className={`w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${view === 'timeline' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-white/70'}`}>
                        <CalendarIcon size={14} className="text-red-500" /> Timeline
                    </button>
                    <button onClick={() => setView('month')} className={`w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${view === 'month' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-white/70'}`}>
                        <CalendarIcon size={14} className="text-blue-500" /> Month View
                    </button>
                </div>

                <div className="mt-8 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-white/60">
                        <div className="w-2 h-2 rounded-full bg-blue-500" /> Career
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/60">
                        <div className="w-2 h-2 rounded-full bg-orange-500" /> Education
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/60">
                        <div className="w-2 h-2 rounded-full bg-purple-500" /> Research
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col bg-[#1e1e1e]">
                {/* Header */}
                <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-[#1e1e1e]/80 backdrop-blur-md shrink-0">
                    <div className="flex items-center gap-1 font-semibold text-lg">
                        {view === 'timeline' ? 'Life Timeline' : currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1 bg-white/10 rounded-md p-0.5">
                            <button onClick={handlePrev} className="p-1 hover:bg-white/10 rounded text-white/70"><ChevronLeft size={16} /></button>
                            <button onClick={handleToday} className="px-3 text-sm font-medium hover:bg-white/10 rounded">Today</button>
                            <button onClick={handleNext} className="p-1 hover:bg-white/10 rounded text-white/70"><ChevronRight size={16} /></button>
                        </div>
                        <Search size={18} className="text-white/50 ml-2" />
                        <Plus size={18} className="text-white/50" />
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8">
                    {view === 'timeline' ? (
                        <div className="max-w-3xl mx-auto border-l-2 border-white/10 pl-8 space-y-12 pb-20">
                            {allEvents.map((event, i) => (
                                <div key={i} className="relative">
                                    {/* Dot */}
                                    <div className={`absolute -left-[41px] w-5 h-5 rounded-full border-4 border-[#1e1e1e] ${event.type === 'career' ? 'bg-blue-500' :
                                        event.type === 'education' ? 'bg-orange-500' : 'bg-purple-500'
                                        }`} />

                                    <div className="bg-[#262626] rounded-xl p-6 border border-white/5 hover:border-white/10 transition-colors shadow-sm group">
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-white group-hover:text-macos-blue transition-colors flex items-center gap-2">
                                                    {event.role}
                                                </h3>
                                                <div className="text-white/60 font-medium flex items-center gap-2 mt-1">
                                                    {event.type === 'education' ? <GraduationCap size={14} /> : <Briefcase size={14} />}
                                                    {event.company}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-medium text-macos-blue bg-blue-500/10 px-3 py-1 rounded-full inline-block">
                                                    {event.date}
                                                </div>
                                                <div className="text-xs text-white/40 mt-1 flex items-center justify-end gap-1">
                                                    <MapPin size={10} /> {event.location}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description Snippet (first 2 items) */}
                                        <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-white/70 leading-relaxed mb-4">
                                            {event.description.map((desc, idx) => (
                                                <li key={idx} className="pl-1">{desc}</li>
                                            ))}
                                        </ul>

                                        {/* Skills */}
                                        <div className="flex flex-wrap gap-2">
                                            {event.skills.map(skill => (
                                                <span key={skill} className="px-2 py-1 bg-white/5 text-white/50 text-[10px] uppercase font-bold tracking-wider rounded border border-white/5">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col">
                            {/* Days Header */}
                            <div className="grid grid-cols-7 mb-2 border-b border-white/10 pb-2">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                    <div key={day} className="text-xs font-semibold text-white/40 text-center uppercase tracking-wider">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Days Grid */}
                            <div className="grid grid-cols-7 gap-1 flex-1 auto-rows-fr">
                                {blanks.map(blank => (
                                    <div key={`blank-${blank}`} className="bg-transparent" />
                                ))}
                                {days.map(day => {
                                    const isToday = day === new Date().getDate() &&
                                        currentDate.getMonth() === new Date().getMonth() &&
                                        currentDate.getFullYear() === new Date().getFullYear();

                                    return (
                                        <div key={day} className={`
                                            relative bg-[#262626] rounded-lg border border-white/5 p-2 transition-colors hover:bg-white/5 hover:border-white/10 group cursor-default min-h-[4rem] flex flex-col items-center md:items-start
                                            ${isToday ? 'ring-1 ring-red-500 bg-red-500/10' : ''}
                                        `}>
                                            <span className={`
                                                w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium
                                                ${isToday ? 'bg-red-500 text-white' : 'text-white/80 group-hover:text-white'}
                                            `}>
                                                {day}
                                            </span>

                                            {/* Fake dots for visual effect on random days */}
                                            {(day % 3 === 0 || day % 7 === 0) && (
                                                <div className="mt-auto hidden md:flex gap-1 justify-center w-full">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${day % 2 === 0 ? 'bg-blue-500' : 'bg-orange-500'}`} />
                                                    {day % 5 === 0 && <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
