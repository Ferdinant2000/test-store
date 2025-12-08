import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

/**
 * Reusable Input component with label, error state, and icon support
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, icon, id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s/g, '-');

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        id={inputId}
                        className={cn(
                            `
              w-full h-12 px-4 
              bg-white dark:bg-[#1a1d24]
              border-2 border-neutral-200 dark:border-neutral-700
              rounded-xl
              text-neutral-900 dark:text-neutral-200
              placeholder:text-neutral-400 dark:placeholder:text-neutral-500
              transition-all duration-300 ease-out
              focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10
              dark:focus:border-indigo-500 dark:focus:ring-indigo-500/10
              hover:border-neutral-300 dark:hover:border-neutral-600
              disabled:opacity-50 disabled:cursor-not-allowed
              `,
                            icon ? 'pl-12' : '',
                            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : '',
                            className
                        )}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export { Input };
