'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

interface FaqProps {
    items: FaqItem[];
}

/**
 * FAQ accordion component
 */
export function Faq({ items }: FaqProps) {
    const [openId, setOpenId] = useState<string | null>(null);

    const toggle = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="space-y-3">
            {items.map((item) => (
                <div
                    key={item.id}
                    className={cn(
                        `
            border-2 rounded-xl overflow-hidden
            transition-all duration-300
            `,
                        openId === item.id
                            ? 'border-indigo-500 dark:border-indigo-400 shadow-lg shadow-indigo-500/10'
                            : 'border-neutral-200 dark:border-neutral-700'
                    )}
                >
                    <button
                        onClick={() => toggle(item.id)}
                        className="
              w-full flex items-center justify-between
              p-5 text-left
              bg-white dark:bg-neutral-800
              hover:bg-neutral-50 dark:hover:bg-neutral-700/50
              transition-colors duration-300
            "
                    >
                        <span className="font-semibold text-neutral-900 dark:text-white pr-4">
                            {item.question}
                        </span>
                        <span
                            className={cn(
                                'flex-shrink-0 w-6 h-6 rounded-full',
                                'bg-neutral-100 dark:bg-neutral-700',
                                'flex items-center justify-center',
                                'text-neutral-600 dark:text-neutral-400',
                                'transition-transform duration-300',
                                openId === item.id && 'rotate-180'
                            )}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </span>
                    </button>

                    <div
                        className={cn(
                            'overflow-hidden transition-all duration-300',
                            openId === item.id ? 'max-h-96' : 'max-h-0'
                        )}
                    >
                        <div className="p-5 pt-0 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            {item.answer}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// Default FAQ items
export const defaultFaqItems: FaqItem[] = [
    {
        id: '1',
        question: 'How do I track my order?',
        answer: 'You can track your order by logging into your account and visiting the "Orders" section. You\'ll find real-time tracking information for all your orders. Alternatively, you can use the tracking number sent to your email.',
    },
    {
        id: '2',
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy for most items. Products must be unused and in original packaging. Simply initiate a return from your account dashboard or contact our support team for assistance.',
    },
    {
        id: '3',
        question: 'How long does shipping take?',
        answer: 'Standard shipping typically takes 5-7 business days. Express shipping is available for 2-3 business day delivery. International orders may take 10-15 business days depending on the destination.',
    },
    {
        id: '4',
        question: 'Do you offer international shipping?',
        answer: 'Yes, we ship to over 100 countries worldwide. Shipping costs and delivery times vary by destination. You can see the exact cost at checkout before completing your order.',
    },
    {
        id: '5',
        question: 'How can I contact customer support?',
        answer: 'You can reach our support team through live chat (available 24/7), email at support@store.com, or by phone at 1-800-STORE. We typically respond within 24 hours.',
    },
];
