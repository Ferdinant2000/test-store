'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getInitials } from '@/lib/utils';

interface ProfileCardProps {
    avatar?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    onEdit?: () => void;
}

export function ProfileCard({
    avatar,
    firstName,
    lastName,
    email,
    phone,
    onEdit,
}: ProfileCardProps) {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="
            bg-white dark:bg-[#1a1d24]
            rounded-2xl
            border border-neutral-200 dark:border-neutral-700
            shadow-md shadow-black/5 dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)]
            transition-all duration-300 ease-out
            relative overflow-hidden
        ">
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" />

            <div className="relative pt-16 pb-6 px-6">
                <div className="relative w-24 h-24 mx-auto mb-4">
                    {avatar && !imageError ? (
                        <Image
                            src={avatar}
                            alt={`${firstName} ${lastName}`}
                            fill
                            className="rounded-full object-cover border-4 border-white dark:border-[#1a1d24] shadow-xl"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="
                            w-full h-full rounded-full
                            bg-gradient-to-br from-indigo-400 to-purple-500
                            border-4 border-white dark:border-[#1a1d24] shadow-xl
                            flex items-center justify-center
                            text-2xl font-bold text-neutral-100
                        ">
                            {getInitials(firstName, lastName)}
                        </div>
                    )}

                    <span className="
                        absolute bottom-1 right-1
                        w-4 h-4 rounded-full
                        bg-green-500 border-2 border-white dark:border-[#1a1d24]
                    " />
                </div>

                <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                        {firstName} {lastName}
                    </h2>
                    <p className="text-neutral-500 dark:text-neutral-400">
                        Premium Member
                    </p>
                </div>

                <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-4 p-4 bg-neutral-50 dark:bg-[#1e2129] rounded-xl">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">Email</p>
                            <p className="font-medium text-neutral-900 dark:text-neutral-100">{email}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-neutral-50 dark:bg-[#1e2129] rounded-xl">
                        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">Phone</p>
                            <p className="font-medium text-neutral-900 dark:text-neutral-100">{phone}</p>
                        </div>
                    </div>
                </div>

                <Button onClick={onEdit} variant="outline" className="w-full">
                    Edit Profile
                </Button>
            </div>
        </div>
    );
}
