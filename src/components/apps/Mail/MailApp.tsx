import React, { useState } from 'react';
import {
    Inbox, Send, File, Trash, Edit, Search,
    X, Minimize2, Paperclip, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Email {
    id: number;
    from: string;
    subject: string;
    preview: string;
    time: string;
    body: string;
    read: boolean;
    folder: 'inbox' | 'sent' | 'drafts' | 'trash';
    avatarColor?: string;
}

interface MailAppProps {
    initialMessage?: {
        subject: string;
        from: string;
        body: string;
    };
}

export default function MailApp({ initialMessage }: MailAppProps) {
    const [selectedFolder, setSelectedFolder] = useState<'inbox' | 'sent' | 'drafts' | 'trash'>('inbox');
    const [isComposeOpen, setIsComposeOpen] = useState(!initialMessage);
    const [searchQuery, setSearchQuery] = useState('');

    // State for emails to allow deletion/moving
    const [emails, setEmails] = useState<Email[]>([
        {
            id: 1,
            from: 'Sachin Satishkumar',
            subject: initialMessage?.subject || 'Welcome to SachinOS',
            preview: 'Thanks for checking out my portfolio! This is a simulation...',
            time: '9:41 AM',
            body: initialMessage?.body || "Hey!\n\nWelcome to my interactive portfolio. This entire environment is built with React, Next.js, and Tailwind CSS to simulate a macOS experience.\n\nFeel free to explore the apps, check out my projects, or even look at the source code.\n\nBest,\nSachin",
            read: false,
            folder: 'inbox',
            avatarColor: 'from-blue-500 to-blue-700'
        },
        {
            id: 2,
            from: 'GitHub',
            subject: 'Security Alert',
            preview: 'A new sign-in was detected on your account...',
            time: 'Yesterday',
            body: "We noticed a new sign-in to your GitHub account from a new device. If this was you, you can ignore this email.",
            read: true,
            folder: 'inbox',
            avatarColor: 'from-gray-700 to-black'
        }
    ]);

    const [selectedMailId, setSelectedMailId] = useState<number | null>(emails[0].id);
    const [draftData, setDraftData] = useState({ to: '', subject: '', message: '' });

    // Filtered Emails
    const displayedEmails = emails.filter(email =>
        email.folder === selectedFolder &&
        (email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            email.from.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const selectedEmail = emails.find(e => e.id === selectedMailId);

    // Actions
    const handleDelete = () => {
        if (!selectedMailId) return;

        setEmails(prev => prev.map(email => {
            if (email.id === selectedMailId) {
                // If already in trash, could permanently delete, but for now let's just keep it in trash or filter it out if we wanted 'permanent'
                // Real macOS behavior: In Inbox -> Trash. In Trash -> Gone.
                if (email.folder === 'trash') {
                    return null; // Will filter out nulls
                }
                return { ...email, folder: 'trash' };
            }
            return email;
        }).filter(Boolean) as Email[]);

        // Select next available or null
        setSelectedMailId(null);
    };

    const handleSend = () => {
        const newEmail: Email = {
            id: Date.now(),
            from: 'Me',
            subject: draftData.subject || 'No Subject',
            preview: draftData.message.substring(0, 50) + '...',
            time: 'Just Now',
            body: draftData.message,
            read: true,
            folder: 'sent',
            avatarColor: 'from-green-500 to-emerald-700'
        };

        setEmails(prev => [newEmail, ...prev]);
        setIsComposeOpen(false);
        setDraftData({ to: '', subject: '', message: '' });

        // Optional: Trigger system notification or sound
    };

    return (
        <div className="flex h-full w-full bg-[#1e1e1e] text-white/90 font-sf-text selection:bg-macos-blue selection:text-white relative overflow-hidden">

            {/* 1. Sidebar (Mailboxes) */}
            <div className="w-[140px] flex-shrink-0 bg-[#2C2C2C]/50 backdrop-blur-xl border-r border-white/10 flex flex-col pt-10 md:pt-0 transition-all">
                {/* Traffic Lights Spacing */}
                <div className="h-10 hidden md:block" />

                <div className="px-4 pb-2">
                    <h3 className="text-[11px] font-semibold text-white/40 uppercase tracking-widest pl-2 mb-2">Favorites</h3>
                    <div className="space-y-0.5">
                        <SidebarItem
                            icon={Inbox}
                            label="Inbox"
                            count={emails.filter(e => e.folder === 'inbox' && !e.read).length}
                            active={selectedFolder === 'inbox'}
                            onClick={() => setSelectedFolder('inbox')}
                        />
                        <SidebarItem
                            icon={Send}
                            label="Sent"
                            active={selectedFolder === 'sent'}
                            onClick={() => setSelectedFolder('sent')}
                        />
                        <SidebarItem
                            icon={File}
                            label="Drafts"
                            active={selectedFolder === 'drafts'}
                            onClick={() => setSelectedFolder('drafts')}
                        />
                        <SidebarItem
                            icon={Trash}
                            label="Trash"
                            active={selectedFolder === 'trash'}
                            onClick={() => setSelectedFolder('trash')}
                        />
                    </div>
                </div>
            </div>

            {/* 2. Message List */}
            <div className="w-[180px] flex-shrink-0 bg-[#1e1e1e] border-r border-white/10 flex flex-col">
                <div className="h-12 border-b border-white/5 flex items-center px-4 justify-between bg-[#1e1e1e]/80 backdrop-blur-md sticky top-0 z-10">
                    <span className="font-semibold text-[13px] capitalize">{selectedFolder}</span>
                    <button onClick={() => setIsComposeOpen(true)}>
                        <Edit size={16} className="text-white/60 hover:text-macos-blue transition-colors" />
                    </button>
                </div>
                {/* Search */}
                <div className="p-2 border-b border-white/5">
                    <div className="bg-white/5 rounded-md flex items-center px-2 py-1 gap-2 border border-white/5 focus-within:border-white/20 transition-colors">
                        <Search size={12} className="text-white/30" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent border-none text-[12px] placeholder:text-white/30 w-full outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                {/* List */}
                <div className="flex-1 overflow-y-auto">
                    {displayedEmails.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-40 text-white/20">
                            <span className="text-[13px]">No Messages</span>
                        </div>
                    ) : (
                        displayedEmails.map(email => (
                            <div
                                key={email.id}
                                onClick={() => setSelectedMailId(email.id)}
                                className={`p-3 border-b border-white/5 cursor-pointer transition-colors ${selectedMailId === email.id ? 'bg-macos-blue text-white' : 'hover:bg-white/5'}`}
                            >
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <span className={`text-[13px] font-semibold leading-tight ${!email.read && selectedMailId !== email.id ? 'text-macos-blue' : ''}`}>{email.from}</span>
                                    <span className={`text-[11px] ${selectedMailId === email.id ? 'text-white/80' : 'text-white/40'}`}>{email.time}</span>
                                </div>
                                <div className={`text-[12px] mb-1 leading-tight ${selectedMailId === email.id ? 'text-white/90' : 'text-white/80'}`}>{email.subject}</div>
                                <div className={`text-[12px] line-clamp-2 leading-snug ${selectedMailId === email.id ? 'text-white/70' : 'text-white/50'}`}>{email.preview}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* 3. Reading Pane */}
            <div className="flex-1 bg-[#1e1e1e] flex flex-col min-w-0">
                {selectedEmail ? (
                    <>
                        {/* Toolbar */}
                        <div className="h-12 border-b border-white/5 flex items-center px-6 justify-between bg-[#1e1e1e]/80 backdrop-blur-md sticky top-0 z-10 text-white/40">
                            <div className="flex gap-4">
                                <button
                                    onClick={handleDelete}
                                    title="Delete"
                                    className="hover:text-white p-1 rounded transition-colors"
                                >
                                    <Trash size={16} />
                                </button>
                                <button title="Archive" className="hover:text-white p-1 rounded transition-colors">
                                    <File size={16} />
                                </button>
                            </div>
                            <div className="flex gap-4">
                                <button title="Reply" onClick={() => setIsComposeOpen(true)} className="hover:text-white p-1 rounded transition-colors">
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 max-w-4xl mx-auto w-full">
                            <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
                                <div>
                                    <h1 className="text-lg font-sf-display font-semibold mb-2 text-white">{selectedEmail.subject}</h1>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${selectedEmail.avatarColor || 'from-gray-500 to-gray-700'} flex items-center justify-center text-xs font-medium text-white shadow-lg`}>
                                            {selectedEmail.from.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="text-[13px] font-medium leading-tight text-white">{selectedEmail.from}</div>
                                            <div className="text-[11px] text-white/50 leading-tight">To: Sachin</div>
                                        </div>
                                    </div>
                                </div>
                                <span className="text-[12px] text-white/40">{selectedEmail.time}</span>
                            </div>
                            <div className="whitespace-pre-wrap text-[13px] leading-relaxed text-white/80 font-sf-text">
                                {selectedEmail.body}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-white/20">
                        <Inbox size={48} className="mb-4 opacity-50" strokeWidth={1} />
                        <span className="text-[15px] font-medium">No Message Selected</span>
                    </div>
                )}
            </div>

            {/* Compose Modal (Overlay) */}
            <AnimatePresence>
                {isComposeOpen && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-[#2C2C2C] w-full max-w-2xl rounded-xl shadow-2xl border border-white/10 overflow-hidden flex flex-col h-[90%]"
                        >
                            {/* Modal Header */}
                            <div className="h-12 bg-[#3A3A3A] border-b border-white/10 flex items-center justify-between px-4">
                                <div className="text-[13px] font-semibold text-white/90">New Message</div>
                                <div className="flex gap-2">
                                    <button onClick={() => setIsComposeOpen(false)} className="hover:bg-white/10 p-1 rounded-md transition-colors">
                                        <Minimize2 size={14} className="text-white/60" />
                                    </button>
                                    <button onClick={() => setIsComposeOpen(false)} className="hover:bg-white/10 p-1 rounded-md transition-colors">
                                        <X size={14} className="text-white/60" />
                                    </button>
                                </div>
                            </div>

                            {/* Form */}
                            <div className="flex-1 flex flex-col bg-[#1e1e1e]">
                                <div className="flex items-center px-4 py-2.5 border-b border-white/5">
                                    <label className="text-sm text-white/40 min-w-[70px]">To:</label>
                                    <input
                                        className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-white/30"
                                        placeholder="Recipient"
                                        value={draftData.to}
                                        onChange={e => setDraftData({ ...draftData, to: e.target.value })}
                                    />
                                </div>
                                <div className="flex items-center px-4 py-2.5 border-b border-white/5">
                                    <label className="text-sm text-white/40 min-w-[70px]">Cc:</label>
                                    <input className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-white/30" />
                                </div>
                                <div className="flex items-center px-4 py-2.5 border-b border-white/5">
                                    <label className="text-sm text-white/40 min-w-[70px]">Subject:</label>
                                    <input
                                        className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-white/30"
                                        placeholder="Enter subject"
                                        value={draftData.subject}
                                        onChange={e => setDraftData({ ...draftData, subject: e.target.value })}
                                    />
                                </div>
                                <textarea
                                    className="flex-1 bg-transparent border-none outline-none p-4 text-[13px] leading-relaxed resize-none font-sf-text text-white"
                                    placeholder="Write your message..."
                                    value={draftData.message}
                                    onChange={e => setDraftData({ ...draftData, message: e.target.value })}
                                />
                            </div>

                            {/* Toolbar Bottom */}
                            <div className="h-14 bg-[#2C2C2C] border-t border-white/10 flex items-center justify-between px-4">
                                <div className="flex gap-3">
                                    <Paperclip size={18} className="text-white/40 hover:text-white cursor-pointer transition-colors" />
                                    <AlertCircle size={18} className="text-white/40 hover:text-white cursor-pointer transition-colors" />
                                </div>
                                <button
                                    onClick={handleSend}
                                    className="bg-macos-blue hover:bg-blue-500 text-white px-4 py-1.5 rounded-md shadow-sm text-[13px] font-medium flex items-center gap-2 transition-colors"
                                >
                                    <Send size={13} /> Send Message
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

function SidebarItem({ icon: Icon, label, count, active, onClick }: { icon: React.ElementType, label: string, count?: number, active?: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-md transition-colors ${active ? 'bg-white/10 shadow-sm' : 'hover:bg-white/5 text-white/60'}`}
        >
            <Icon size={14} className={active ? 'text-macos-blue' : 'currentColor'} />
            <span className={`text-[13px] flex-1 text-left ${active ? 'text-white font-medium' : ''}`}>{label}</span>
            {count ? <span className="text-[11px] text-white/40">{count}</span> : null}
        </button>
    )
}
