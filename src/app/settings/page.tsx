'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/context/ThemeContext';

interface SettingToggleProps {
    label: string;
    description: string;
    checked: boolean;
    onChange: () => void;
}

function SettingToggle({ label, description, checked, onChange }: SettingToggleProps) {
    return (
        <div className="flex items-center justify-between py-4 border-b border-neutral-100 dark:border-neutral-800 last:border-0">
            <div>
                <p className="font-medium text-neutral-900 dark:text-white">{label}</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
            </div>
            <button
                onClick={onChange}
                className={`
          relative w-12 h-7 rounded-full
          transition-colors duration-300
          ${checked
                        ? 'bg-indigo-500'
                        : 'bg-neutral-200 dark:bg-neutral-700'
                    }
        `}
            >
                <span
                    className={`
            absolute top-1 left-1
            w-5 h-5 rounded-full bg-white
            shadow-md
            transition-transform duration-300
            ${checked ? 'translate-x-5' : 'translate-x-0'}
          `}
                />
            </button>
        </div>
    );
}

/**
 * Settings page with appearance and notification options
 */
export default function SettingsPage() {
    const { theme, setTheme } = useTheme();
    const [settings, setSettings] = useState({
        emailNotifications: true,
        pushNotifications: false,
        orderUpdates: true,
        promotions: false,
        newsletter: true,
        twoFactor: false,
    });

    const toggleSetting = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="min-h-screen py-8 lg:py-12">
            <Container size="md">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                        Settings
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-400">
                        Manage your preferences and account settings
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Appearance */}
                    <Card className="animate-fade-in">
                        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                            Appearance
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setTheme('light')}
                                className={`
                  p-4 rounded-xl border-2 transition-all duration-300
                  ${theme === 'light'
                                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                                        : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
                                    }
                `}
                            >
                                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white border border-neutral-200 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500">
                                        <circle cx="12" cy="12" r="5" />
                                        <line x1="12" y1="1" x2="12" y2="3" />
                                        <line x1="12" y1="21" x2="12" y2="23" />
                                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                        <line x1="1" y1="12" x2="3" y2="12" />
                                        <line x1="21" y1="12" x2="23" y2="12" />
                                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                                    </svg>
                                </div>
                                <p className="font-medium text-neutral-900 dark:text-white">Light</p>
                            </button>

                            <button
                                onClick={() => setTheme('dark')}
                                className={`
                  p-4 rounded-xl border-2 transition-all duration-300
                  ${theme === 'dark'
                                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                                        : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
                                    }
                `}
                            >
                                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                    </svg>
                                </div>
                                <p className="font-medium text-neutral-900 dark:text-white">Dark</p>
                            </button>
                        </div>
                    </Card>

                    {/* Notifications */}
                    <Card className="animate-fade-in stagger-1">
                        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                            Notifications
                        </h2>

                        <SettingToggle
                            label="Email Notifications"
                            description="Receive order updates via email"
                            checked={settings.emailNotifications}
                            onChange={() => toggleSetting('emailNotifications')}
                        />
                        <SettingToggle
                            label="Push Notifications"
                            description="Receive notifications on your device"
                            checked={settings.pushNotifications}
                            onChange={() => toggleSetting('pushNotifications')}
                        />
                        <SettingToggle
                            label="Order Updates"
                            description="Get notified when your order status changes"
                            checked={settings.orderUpdates}
                            onChange={() => toggleSetting('orderUpdates')}
                        />
                        <SettingToggle
                            label="Promotions"
                            description="Receive special offers and discounts"
                            checked={settings.promotions}
                            onChange={() => toggleSetting('promotions')}
                        />
                        <SettingToggle
                            label="Newsletter"
                            description="Weekly newsletter with new products"
                            checked={settings.newsletter}
                            onChange={() => toggleSetting('newsletter')}
                        />
                    </Card>

                    {/* Security */}
                    <Card className="animate-fade-in stagger-2">
                        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                            Security
                        </h2>

                        <SettingToggle
                            label="Two-Factor Authentication"
                            description="Add an extra layer of security to your account"
                            checked={settings.twoFactor}
                            onChange={() => toggleSetting('twoFactor')}
                        />

                        <div className="pt-4 space-y-3">
                            <Button variant="outline" className="w-full justify-start">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                                Change Password
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                                Privacy Settings
                            </Button>
                        </div>
                    </Card>

                    {/* Danger Zone */}
                    <Card className="animate-fade-in stagger-3 border-red-200 dark:border-red-900/50">
                        <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
                            Danger Zone
                        </h2>
                        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                            Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <Button
                            variant="outline"
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        >
                            Delete Account
                        </Button>
                    </Card>
                </div>
            </Container>
        </div>
    );
}
