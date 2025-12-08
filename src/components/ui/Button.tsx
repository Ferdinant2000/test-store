import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

/**
 * Reusable Button component with multiple variants
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
        const baseStyles = `
      inline-flex items-center justify-center font-medium
      transition-all duration-300 ease-out
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      active:scale-[0.98]
    `;

        const variants = {
            primary: `
        bg-indigo-500 text-white
        hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/25
        focus:ring-indigo-500
        dark:bg-indigo-500 dark:hover:bg-indigo-600
        dark:shadow-lg dark:shadow-indigo-500/20
      `,
            secondary: `
        bg-purple-500 text-white
        hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/25
        focus:ring-purple-500
        dark:bg-[#1f232c] dark:hover:bg-[#262b35]
        dark:text-neutral-200 dark:shadow-none
      `,
            outline: `
        border-2 border-indigo-500 text-indigo-500
        hover:bg-indigo-500 hover:text-white
        focus:ring-indigo-500
        dark:border-indigo-400 dark:text-indigo-400
        dark:hover:bg-indigo-500 dark:hover:text-white dark:hover:border-indigo-500
      `,
            ghost: `
        text-neutral-600 
        hover:bg-neutral-100 hover:text-neutral-900
        focus:ring-neutral-500
        dark:text-neutral-300 dark:hover:bg-[#1f232c] dark:hover:text-neutral-100
      `,
        };

        const sizes = {
            sm: 'px-3 py-1.5 text-sm rounded-lg',
            md: 'px-5 py-2.5 text-base rounded-xl',
            lg: 'px-7 py-3 text-lg rounded-xl',
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button };
