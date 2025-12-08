'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface NavItemProps {
    href: string;
    icon: ReactNode;
    label: string;
    collapsed?: boolean;
}

/**
 * Navigation item component with active state detection
 */
export function NavItem({ href, icon, label, collapsed = false }: NavItemProps) {
    const pathname = usePathname();
    const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));

    return (
        <Link
            href={href}
            className={cn(
                `
        flex items-center gap-3
        px-4 py-3
        rounded-xl
        font-medium
        transition-all duration-300 ease-out
        group
        `,
                isActive
                    ? `
            bg-indigo-500/10 text-indigo-500
            dark:bg-indigo-500/10 dark:text-indigo-400
            border-l-4 border-indigo-500
            shadow-sm
          `
                    : `
            text-neutral-600 dark:text-neutral-400
            hover:bg-neutral-100 dark:hover:bg-[#1f232c]
            hover:text-neutral-900 dark:hover:text-neutral-100
          `,
                collapsed && 'justify-center px-3'
            )}
        >
            <span
                className={cn(
                    'text-xl transition-transform duration-300',
                    !isActive && 'group-hover:scale-110'
                )}
            >
                {icon}
            </span>
            {!collapsed && (
                <span className="whitespace-nowrap">{label}</span>
            )}
        </Link>
    );
}
