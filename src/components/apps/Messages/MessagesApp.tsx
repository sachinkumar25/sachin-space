import React, { useState, useEffect, useRef } from 'react';
import { Send, Search, Edit, ChevronLeft } from 'lucide-react';
import { useWindowStore } from '@/store/useWindowStore';
import { AppID } from '@/types/app';

interface MessageOption {
    label: string;
    action: 'open_app' | 'link' | 'reply'; // Action type
    params?: string; // App ID, URL, or reply text
}

interface Message {
    sender: 'me' | 'them' | 'System';
    text: string;
    options?: MessageOption[];
    isSystem?: boolean;
}

export default function MessagesApp() {
    const { openWindow } = useWindowStore();
    const [selectedChat, setSelectedChat] = useState<string | null>('sachin');

    // Auto-scroll ref
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [chatHistory, setChatHistory] = useState<Message[]>([
        {
            sender: 'them',
            text: `👋 **Welcome to SachinOS!**\n\nThis interactive desktop showcases what I can build as a Full Stack Engineer.\n\n**🚀 Explore My World:**\n• **Experiences:** A deep dive into my professional career & roles.\n• **Projects:** Interactive showcase of my engineering work.\n• **Terminal:** Ask questions naturally via AI command line.\n• **VS Code:** Review my actual source code in a real editor.\n• **Education:** My academic background & achievements.\n\n**📬 Let's Connect:**\nThis chat is live! Click **"Say Hello"** to send a text directly to my phone.`,
            options: [
                { label: '💼 Experience', action: 'open_app', params: 'experience' },
                { label: '🎓 Education', action: 'open_app', params: 'education' },
                { label: '📂 Projects', action: 'open_app', params: 'projects' },
                { label: '💻 VS Code', action: 'open_app', params: 'vscode' },
                { label: '👋 Say Hello', action: 'reply', params: `Hi! I'm [Name] ([Email/Phone]) — [Your message here]` }
            ]
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isSending, setIsSending] = useState(false);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory]);

    const handleOptionClick = (option: MessageOption) => {
        if (option.action === 'open_app') {
            // Simulate user asking for it
            setChatHistory(prev => [...prev, { sender: 'me', text: `Open ${option.label}...` }]);

            setTimeout(() => {
                if (option.params) openWindow(option.params as AppID);
                setChatHistory(prev => [...prev, { sender: 'them', text: `Opening ${option.label} for you! 👍` }]);
            }, 800);
        } else if (option.action === 'link') {
            window.open(option.params, '_blank');
        } else if (option.action === 'reply') {
            // Simulate typing the pre-filled reply
            setInputValue(option.params || '');
            // Optional: auto-send or let them edit
        }
    };

    const handleSend = async () => {
        if (!inputValue.trim() || isSending) return;

        const messageText = inputValue.trim();
        setInputValue('');
        setIsSending(true);

        // Add user message immediately
        const newMsg: Message = { sender: 'me', text: messageText };
        setChatHistory(prev => [...prev, newMsg]);

        try {
            // Attempt to send via real SMS API
            const response = await fetch('/api/sms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: messageText, sender: 'Portfolio Visitor' })
            });

            if (response.ok) {
                // System Confirmation
                setTimeout(() => {
                    setChatHistory(prev => [...prev, {
                        sender: 'System',
                        text: "✅ Message sent to Sachin! He will reach out to the contact details you provided shortly.",
                        isSystem: true
                    }]);
                }, 1000);
            } else {
                console.warn('SMS failed, falling back to simulated response');
                // Fallback simulation
                setTimeout(() => {
                    setChatHistory(prev => [...prev, {
                        sender: 'System',
                        text: "✅ Message simulated (SMS keys missing). But in production, this would go to Sachin's phone!",
                        isSystem: true
                    }]);
                }, 1000);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsSending(false);
        }
    };

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
                                {chatHistory[chatHistory.length - 1].text}
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
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white scroll-smooth flex flex-col">
                        <div className="flex justify-center mb-4">
                            <span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">iMessage • Today</span>
                        </div>

                        {chatHistory.map((msg, index) => {
                            if (msg.isSystem) {
                                return (
                                    <div key={index} className="flex justify-center my-2 animate-in fade-in zoom-in duration-300">
                                        <span className="text-[11px] font-medium text-gray-400 italic text-center max-w-[80%]">
                                            {msg.text}
                                        </span>
                                    </div>
                                );
                            }

                            return (
                                <div
                                    key={index}
                                    className={`flex flex-col gap-2 max-w-[85%] animate-in fade-in slide-in-from-bottom-2 duration-300 ${msg.sender === 'me' ? 'self-end items-end' : 'self-start items-start'}`}
                                >
                                    <div className={`flex items-end gap-2 ${msg.sender === 'me' ? 'flex-row-reverse' : ''}`}>
                                        {msg.sender === 'them' && (
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-gray-400 to-gray-600 flex-shrink-0 mb-1 flex items-center justify-center text-[8px] text-white">SA</div>
                                        )}

                                        <div
                                            className={`px-4 py-2 text-sm leading-relaxed shadow-sm
                                                ${msg.sender === 'me' ? 'bg-blue-500 text-white rounded-2xl rounded-br-sm' : 'bg-[#e9e9eb] text-black rounded-2xl rounded-bl-sm'}
                                            `}
                                        >
                                            <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{
                                                __html: msg.text
                                                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                    .replace(/`([^`]+)`/g, '<code class="bg-gray-200/20 px-1 rounded font-mono text-xs">$1</code>')
                                                    .replace(/\n/g, '<br>')
                                            }} />
                                        </div>
                                    </div>

                                    {/* Options / Chips */}
                                    {msg.options && (
                                        <div className="flex flex-wrap gap-2 ml-8">
                                            {msg.options.map((opt, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => handleOptionClick(opt)}
                                                    className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 text-xs font-medium px-3 py-1.5 rounded-full border border-blue-500/20 transition-all hover:scale-105 active:scale-95"
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 border-t border-gray-100 bg-gray-50/50 backdrop-blur-sm">
                        <div className="bg-white border border-gray-300 rounded-full px-4 py-1.5 flex items-center gap-2 text-sm text-gray-800 focus-within:border-blue-500 transition-colors">
                            <input
                                type="text"
                                placeholder="Hi! I'm [Name] ([Email/Phone]) — [Message]"
                                className="flex-1 outline-none placeholder:text-gray-400 bg-transparent"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <button
                                onClick={handleSend}
                                disabled={!inputValue.trim() || isSending}
                                className={`bg-blue-500 text-white rounded-full p-1 w-7 h-7 flex items-center justify-center transition-colors ${(!inputValue.trim() || isSending) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                            >
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
