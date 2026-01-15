import React, { useState } from 'react';
import { Send, User, Mail, MessageSquare, CheckCircle, AlertCircle, ChevronLeft, Search, Edit } from 'lucide-react';

interface MailAppProps {
    initialMessage?: {
        subject: string;
        from: string;
        body: string;
    };
}

export default function MailApp({ initialMessage }: MailAppProps) {
    const [view, setView] = useState<'read' | 'compose'>(initialMessage ? 'read' : 'compose');
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mailtoLink = `mailto:sachinsk141@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
        window.location.href = mailtoLink;
        setStatus('success');
        setTimeout(() => {
            setStatus('idle');
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
    };

    if (view === 'read' && initialMessage) {
        return (
            <div className="flex h-full bg-white text-gray-900 font-sans overflow-hidden">
                {/* Sidebar */}
                <div className="w-80 border-r border-gray-200 bg-gray-50 flex flex-col hidden md:flex">
                    <div className="h-12 border-b border-gray-200 flex items-center px-4 justify-between bg-white/50 backdrop-blur-sm sticky top-0">
                        <div className="font-semibold text-gray-500 text-sm">Messages</div>
                        <Edit size={16} className="text-gray-400 cursor-pointer hover:text-blue-500" onClick={() => setView('compose')} />
                    </div>
                    <div className="p-2">
                        <div className="flex items-center gap-2 bg-gray-200/50 rounded-lg px-3 py-1.5 text-sm text-gray-500">
                            <Search size={14} /> Search
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <div className="px-3 py-2 bg-blue-500/10 border-l-4 border-blue-500 cursor-pointer">
                            <div className="flex justify-between items-start">
                                <span className="font-semibold text-sm">Sachin Satishkumar</span>
                                <span className="text-xs text-gray-400">Now</span>
                            </div>
                            <div className="text-xs text-gray-500 line-clamp-2 mt-0.5">
                                {initialMessage.subject}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col bg-white">
                    {/* Header */}
                    <div className="h-12 border-b border-gray-100 flex items-center px-4 bg-white/80 backdrop-blur-md justify-between">
                        <div className="flex items-center gap-2">
                            <button className="md:hidden" onClick={() => setView('compose')}><ChevronLeft size={20} className="text-blue-500" /></button>
                            <div className="flex flex-col items-center mx-auto md:mx-0 md:flex-row md:gap-2">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-gray-400 to-gray-600 flex items-center justify-center text-xs text-white font-medium">SA</div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-semibold">Sachin Satishkumar</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setView('compose')} className="text-blue-500 hover:bg-blue-50 rounded-full p-1.5 transition-colors">
                            <Edit size={18} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                        <div className="flex justify-center">
                            <span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Today 9:41 AM</span>
                        </div>

                        {/* Message Bubble (Left/Gray) */}
                        <div className="flex items-end gap-2 max-w-[85%]">
                            <div className="w-6 h-6 rounded-full bg-gray-300 flex-shrink-0 mb-1" />
                            <div className="bg-[#e9e9eb] text-black px-4 py-2.5 rounded-2xl rounded-bl-sm text-sm">
                                <p className="font-semibold mb-1">{initialMessage.subject}</p>
                                <div className="whitespace-pre-line leading-relaxed">
                                    {initialMessage.body}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Input Area (Fake) */}
                    <div className="p-3 border-t border-gray-100 bg-gray-50/50">
                        <div className="bg-white border border-gray-300 rounded-full px-4 py-2 flex items-center gap-2 text-sm text-gray-400 cursor-not-allowed">
                            <span className="flex-1">iMessage</span>
                            <Send size={16} className="text-gray-300" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Default Compose View
    return (
        <div className="h-full w-full bg-[#f5f5f7] flex flex-col text-gray-900 font-sans">
            <div className="h-12 border-b border-gray-200 flex items-center px-4 bg-white/80 backdrop-blur-md sticky top-0 z-10 justify-between">
                <div className="font-semibold text-gray-600 flex items-center gap-2">
                    <Mail size={16} /> New Message
                </div>
                {initialMessage && (
                    <button onClick={() => setView('read')} className="text-blue-500 text-sm font-medium hover:underline">
                        Cancel
                    </button>
                )}
            </div>
            <div className="flex-1 overflow-y-auto p-6 md:p-10">
                <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="border-b border-gray-100 bg-gray-50/50 p-4 space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="text-gray-400 w-16 text-right text-sm font-medium">To:</span>
                            <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                Sachin Satishkumar
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-gray-400 w-16 text-right text-sm font-medium">From:</span>
                            <input
                                type="email"
                                placeholder="your.email@example.com"
                                className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder:text-gray-300"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 border-b border-gray-100 pb-2 focus-within:border-blue-400 transition-colors">
                                <User size={18} className="text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="flex-1 outline-none text-gray-800 placeholder:text-gray-400"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex items-center gap-2 border-b border-gray-100 pb-2 focus-within:border-blue-400 transition-colors">
                                <AlertCircle size={18} className="text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Subject"
                                    className="flex-1 outline-none text-gray-800 font-medium placeholder:text-gray-400"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <textarea
                                placeholder="Write your message here..."
                                className="w-full h-64 resize-none outline-none text-gray-700 leading-relaxed placeholder:text-gray-300"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                            />
                        </div>
                        <div className="flex justify-end pt-4 border-t border-gray-100">
                            <button
                                type="submit"
                                disabled={status !== 'idle'}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-white transition-all ${status === 'success' ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-500 active:scale-95'} disabled:opacity-70 disabled:cursor-not-allowed`}
                            >
                                {status === 'idle' && <>Send Message <Send size={16} /></>}
                                {status === 'sending' && <>Sending...</>}
                                {status === 'success' && <>Sent! <CheckCircle size={16} /></>}
                            </button>
                        </div>
                    </form>
                </div>
                <p className="text-center text-gray-400 text-sm mt-6">This will open your default email client to send the message.</p>
            </div>
        </div>
    );
}
