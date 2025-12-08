import { ReactNode, CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    style?: CSSProperties;
}

/**
 * Reusable Card component with hover effects and padding variants
 */
export function Card({
    children,
    className,
    hover = false,
    padding = 'md',
    style
}: CardProps) {
    const paddingStyles = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    return (
        <div
            style={style}
            className={cn(
                `
        bg-white dark:bg-[#1a1d24]/90
        rounded-2xl
        border border-neutral-200 dark:border-[#2a2d36]
        shadow-md shadow-black/5 dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)]
        dark:backdrop-blur-sm
        transition-all duration-300 ease-out
        `,
                hover && `
          hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.45)]
          hover:-translate-y-1
          hover:border-neutral-300 dark:hover:border-[#3a3d46]
          dark:hover:bg-[#1e2129]/90
        `,
                paddingStyles[padding],
                className
            )}
        >
            {children}
        </div>
    );
}
