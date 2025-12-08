/**
 * Theme management utilities
 */

export type Theme = 'light' | 'dark';

const THEME_KEY = 'store-theme';

/**
 * Get stored theme from localStorage
 */
export function getStoredTheme(): Theme | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(THEME_KEY) as Theme | null;
}

/**
 * Store theme preference in localStorage
 */
export function setStoredTheme(theme: Theme): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(THEME_KEY, theme);
}

/**
 * Get system preference for dark mode
 */
export function getSystemTheme(): Theme {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Apply theme to document
 */
export function applyTheme(theme: Theme): void {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    if (theme === 'dark') {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }
}

/**
 * Initialize theme on page load
 */
export function initializeTheme(): Theme {
    const stored = getStoredTheme();
    const theme = stored || getSystemTheme();
    applyTheme(theme);
    return theme;
}
