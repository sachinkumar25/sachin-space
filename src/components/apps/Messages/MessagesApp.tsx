import React, { useState } from 'react';
import { Send, Search, Edit, ChevronLeft } from 'lucide-react';

export default function MessagesApp() {
    const [selectedChat, setSelectedChat] = useState<string | null>('sachin');

    const messages = [
        "Hey! Welcome to my interactive portfolio. 🚀",
        "I built this OS simulation with **Next.js 15, TypeScript, and Tailwind**.",
        `Here is how to look around:
• **Terminal**: Ask the AI about my skills or type \`ls\`.
• **Projects**: Check out my work (like EcoNavix and RecruitRaptor).
• **Resume**: View my official CV.`,
        "Enjoy exploring! - Sachin"
    ];

    return (
        <div className="flex h-full bg-white text-gray-900 font-sans overflow-hidden">
            {/* Sidebar (Left, 25% width) - Hidden on mobile if chat selected */}
            <div className={`w-full md:w-1/4 border-r border-gray-200 bg-gray-50/80 backdrop-blur-xl flex flex-col ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
                <div className="h-12 border-b border-gray-200 flex items-center px-4 justify-between sticky top-0 bg-transparent">
                    <div className="font-semibold text-gray-500 text-sm">Messages</div>
                    <Edit size={16} className="text-gray-400 cursor-pointer hover:text-blue-500" />
                </div>
                <div className="p-2">
                    <div className="flex items-center gap-2 bg-gray-200/50 rounded-lg px-3 py-1.5 text-sm text-gray-500">
                        <Search size={14} /> Search
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <div
                        onClick={() => setSelectedChat('sachin')}
                        className={`px-4 py-3 cursor-pointer transition-colors flex gap-3 items-center ${selectedChat === 'sachin' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200/50'}`}
                    >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-400 to-gray-600 flex-shrink-0 flex items-center justify-center text-sm font-medium text-white">SA</div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline">
                                <span className="font-semibold text-sm truncate">Sachin Satishkumar</span>
                                <span className={`text-[10px] ${selectedChat === 'sachin' ? 'text-blue-100' : 'text-gray-400'}`}>Now</span>
                            </div>
                            <div className={`text-xs truncate mt-0.5 ${selectedChat === 'sachin' ? 'text-blue-100' : 'text-gray-500'}`}>
                                Welcome to my interactive portfolio...
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Area (Right, 75% width) */}
            {selectedChat ? (
                <div className="flex-1 flex flex-col bg-white w-full">
                    {/* Header */}
                    <div className="h-12 border-b border-gray-100 flex items-center px-4 bg-white/80 backdrop-blur-md justify-between z-10">
                        <div className="flex items-center gap-2">
                            <button className="md:hidden" onClick={() => setSelectedChat(null)}>
                                <ChevronLeft size={20} className="text-blue-500" />
                            </button>
                            <div className="flex flex-col items-center mx-auto md:mx-0 md:flex-row md:gap-2">
                                <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-[10px] text-white font-medium md:hidden">SA</div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-medium text-gray-500">To: <span className="text-black font-semibold">Sachin Satishkumar</span></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Message List */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-white scroll-smooth">
                        <div className="flex justify-center mb-4">
                            <span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">iMessage • Today</span>
                        </div>

                        {messages.map((msg, index) => (
                            <div key={index} className="flex items-end gap-2 max-w-[85%] animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: `${index * 150}ms` }}>
                                {index === messages.length - 1 && (
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-gray-400 to-gray-600 flex-shrink-0 mb-1 flex items-center justify-center text-[8px] text-white">SA</div>
                                )}
                                {index !== messages.length - 1 && <div className="w-6 flex-shrink-0" />}

                                <div className={`px-4 py-2 rounded-2xl text-sm leading-relaxed ${index === messages.length - 1 ? 'rounded-bl-sm' : 'rounded-bl-2xl'} bg-[#e9e9eb] text-black`}>
                                    <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{
                                        __html: msg
                                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                            .replace(/`([^`]+)`/g, '<code class="bg-gray-200 px-1 rounded font-mono text-xs">$1</code>')
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-3 border-t border-gray-100 bg-gray-50/50 backdrop-blur-sm">
                        <div className="bg-white border border-gray-300 rounded-full px-4 py-1.5 flex items-center gap-2 text-sm text-gray-800 focus-within:border-blue-500 transition-colors">
                            <input
                                type="text"
                                placeholder="iMessage"
                                className="flex-1 outline-none placeholder:text-gray-400 bg-transparent"
                            />
                            <button className="bg-blue-500 text-white rounded-full p-1 w-7 h-7 flex items-center justify-center hover:bg-blue-600 transition-colors">
                                <Send size={14} className="ml-0.5" />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 hidden md:flex items-center justify-center bg-gray-50 text-gray-400 flex-col gap-2">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <Edit size={32} className="text-gray-400" />
                    </div>
                    <p>Select a message to start chatting</p>
                </div>
            )}
        </div>
    );
}
