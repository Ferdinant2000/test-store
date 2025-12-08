'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'support';
    timestamp: Date;
}

export function SupportChat() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Hello! 👋 Welcome to our support chat. How can I help you today?',
            sender: 'support',
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: input,
            sender: 'user',
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        setIsTyping(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsTyping(false);

        const responses = [
            "Thank you for reaching out! I'm looking into your question now.",
            "I understand your concern. Let me help you with that.",
            "Great question! Here's what I can tell you...",
            "I'd be happy to assist you with that. Let me check our resources.",
        ];

        const supportMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: responses[Math.floor(Math.random() * responses.length)],
            sender: 'support',
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, supportMessage]);
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="
            bg-white dark:bg-[#1a1d24]
            rounded-2xl
            border border-neutral-200 dark:border-neutral-700
            shadow-md shadow-black/5 dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)]
            flex flex-col h-[500px]
        ">
            <div className="flex items-center gap-4 p-4 border-b border-neutral-200 dark:border-neutral-700">
                <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-neutral-100 font-bold">
                        S
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white dark:border-[#1a1d24]" />
                </div>
                <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                        Support Team
                    </h3>
                    <p className="text-sm text-green-500">Online</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`
                                max-w-[80%] px-4 py-3 rounded-2xl
                                ${message.sender === 'user'
                                    ? 'bg-indigo-500 text-neutral-100 rounded-br-sm'
                                    : 'bg-neutral-100 dark:bg-[#1e2129] text-neutral-900 dark:text-neutral-100 rounded-bl-sm'
                                }
                            `}
                        >
                            <p>{message.text}</p>
                            <p className={`
                                text-xs mt-1
                                ${message.sender === 'user'
                                    ? 'text-indigo-200'
                                    : 'text-neutral-400'
                                }
                            `}>
                                {formatTime(message.timestamp)}
                            </p>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-neutral-100 dark:bg-[#1e2129] px-4 py-3 rounded-2xl rounded-bl-sm">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex gap-3">
                    <Input
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1"
                    />
                    <Button type="submit" disabled={!input.trim()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </Button>
                </div>
            </form>
        </div>
    );
}
