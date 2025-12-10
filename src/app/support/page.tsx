'use client';

import { useState, FormEvent } from 'react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { SupportChat } from '@/components/support/SupportChat';
import { Faq, defaultFaqItems } from '@/components/support/Faq';

/**
 * Support page with chat, FAQ, and contact form
 */
export default function SupportPage() {
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (field: string) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setContactForm(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const ticketId = `SUP-${Date.now()}`;
            const pageUrl = window.location.href;

            const payload = {
                ticketId,
                userName: contactForm.name,
                userEmail: contactForm.email,
                requestType: contactForm.subject,
                description: contactForm.message,
                pageUrl,
            };

            const response = await fetch('/api/submit-ticket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                // Try to parse the error message from the JSON body
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.message || `Server error: ${response.status} ${response.statusText}`;
                throw new Error(errorMessage);
            }

            setSubmitted(true);
            setContactForm({ name: '', email: '', subject: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setSubmitted(false), 5000);
        } catch (error) {
            console.error('Ticket submission failed:', error);
            const message = error instanceof Error ? error.message : 'Unknown error occurred';
            alert(`Failed to send message: ${message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactOptions = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                </svg>
            ),
            title: 'Email Us',
            description: 'support@store.com',
            action: 'Send an email',
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
            ),
            title: 'Call Us',
            description: '1-800-STORE',
            action: 'Call now',
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
            ),
            title: 'Working Hours',
            description: 'Mon-Fri: 9AM-6PM',
            action: 'View schedule',
        },
    ];

    return (
        <div className="min-h-screen py-8 lg:py-12">
            <Container>
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                        How can we help?
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        Get in touch with our support team or find answers in our FAQ section.
                    </p>
                </div>

                {/* Contact Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                    {contactOptions.map((option, index) => (
                        <Card
                            key={index}
                            hover
                            className="text-center cursor-pointer animate-fade-in"
                            style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
                        >
                            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-500">
                                {option.icon}
                            </div>
                            <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
                                {option.title}
                            </h3>
                            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3">
                                {option.description}
                            </p>
                            <button className="text-sm text-indigo-500 hover:text-indigo-600 font-medium">
                                {option.action} →
                            </button>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Live Chat */}
                    <div className="animate-fade-in stagger-1">
                        <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                            Live Chat
                        </h2>
                        <SupportChat />
                    </div>

                    {/* Contact Form */}
                    <div className="animate-fade-in stagger-2">
                        <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                            Send a Message
                        </h2>
                        <Card>
                            {submitted ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                                        Message Sent!
                                    </h3>
                                    <p className="text-neutral-600 dark:text-neutral-400">
                                        We&apos;ll get back to you within 24 hours.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <Input
                                            label="Name"
                                            placeholder="Your name"
                                            value={contactForm.name}
                                            onChange={handleChange('name')}
                                            required
                                        />
                                        <Input
                                            label="Email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={contactForm.email}
                                            onChange={handleChange('email')}
                                            required
                                        />
                                    </div>

                                    <Input
                                        label="Subject"
                                        placeholder="How can we help?"
                                        value={contactForm.subject}
                                        onChange={handleChange('subject')}
                                        required
                                    />

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                            Message
                                        </label>
                                        <textarea
                                            placeholder="Describe your issue..."
                                            value={contactForm.message}
                                            onChange={handleChange('message')}
                                            required
                                            rows={4}
                                            className="
                        w-full px-4 py-3
                        bg-white dark:bg-neutral-800
                        border-2 border-neutral-200 dark:border-neutral-700
                        rounded-xl
                        text-neutral-900 dark:text-white
                        placeholder:text-neutral-400 dark:placeholder:text-neutral-500
                        transition-all duration-300 ease-out
                        focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10
                        resize-none
                      "
                                        />
                                    </div>

                                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </Button>
                                </form>
                            )}
                        </Card>
                    </div>
                </div>

                {/* FAQ Section */}
                <section className="animate-fade-in stagger-3">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-neutral-600 dark:text-neutral-400">
                            Find quick answers to common questions
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <Faq items={defaultFaqItems} />
                    </div>
                </section>
            </Container>
        </div>
    );
}
