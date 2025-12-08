'use client';

import { useState } from 'react';
import { NavItem } from './NavItem';
import { useTheme } from '@/context/ThemeContext';

const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);

const StoreIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
);

const ProfileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const SupportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
);

const CollapseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
);

const navItems = [
    { href: '/', icon: <HomeIcon />, label: 'Home' },
    { href: '/store', icon: <StoreIcon />, label: 'Store' },
    { href: '/profile', icon: <ProfileIcon />, label: 'Profile' },
    { href: '/support', icon: <SupportIcon />, label: 'Support' },
];

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const { theme, toggleTheme } = useTheme();

    return (
        <aside
            className={`
        fixed left-0 top-0 h-full
        bg-white/80 dark:bg-[#12151b]/95
        backdrop-blur-xl
        border-r border-neutral-200 dark:border-neutral-800
        transition-all duration-300 ease-out
        z-40
        hidden lg:flex flex-col
        ${collapsed ? 'w-[72px]' : 'w-[260px]'}
      `}
        >
            <div className={`
        flex items-center gap-3 px-4 h-16
        border-b border-neutral-200 dark:border-neutral-800
        ${collapsed ? 'justify-center' : ''}
      `}>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                    <span className="text-neutral-100 font-bold text-sm">S</span>
                </div>
                {!collapsed && (
                    <span className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
                        Store
                    </span>
                )}
            </div>

            <nav className="flex-1 p-3 space-y-1">
                {navItems.map((item) => (
                    <NavItem
                        key={item.href}
                        {...item}
                        collapsed={collapsed}
                    />
                ))}
            </nav>

            <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 space-y-1">
                <NavItem
                    href="/settings"
                    icon={<SettingsIcon />}
                    label="Settings"
                    collapsed={collapsed}
                />

                <button
                    onClick={toggleTheme}
                    className={`
            w-full flex items-center gap-3
            px-4 py-3
            rounded-xl
            font-medium
            text-neutral-600 dark:text-neutral-400
            hover:bg-neutral-100 dark:hover:bg-[#1e2129]
            hover:text-neutral-900 dark:hover:text-neutral-100
            transition-all duration-300 ease-out
            ${collapsed ? 'justify-center px-3' : ''}
          `}
                >
                    <span className="text-xl">
                        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                    </span>
                    {!collapsed && (
                        <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                    )}
                </button>

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className={`
            w-full flex items-center gap-3
            px-4 py-3
            rounded-xl
            font-medium
            text-neutral-600 dark:text-neutral-400
            hover:bg-neutral-100 dark:hover:bg-[#1e2129]
            hover:text-neutral-900 dark:hover:text-neutral-100
            transition-all duration-300 ease-out
            ${collapsed ? 'justify-center px-3' : ''}
          `}
                >
                    <span className={`text-xl transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}>
                        <CollapseIcon />
                    </span>
                    {!collapsed && <span>Collapse</span>}
                </button>
            </div>
        </aside>
    );
}
