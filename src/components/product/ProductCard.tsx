'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    image: string;
    description?: string;
    onAddToCart?: () => void;
}

export function ProductCard({
    id,
    name,
    price,
    image,
    description,
    onAddToCart,
}: ProductCardProps) {
    return (
        <div className="
            bg-white dark:bg-[#1a1d24]
            rounded-2xl
            border border-neutral-200 dark:border-neutral-700
            shadow-md shadow-black/5 dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)]
            transition-all duration-300 ease-out
            hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.45)]
            hover:-translate-y-1
            hover:border-neutral-300 dark:hover:border-[#3a3d46]
            dark:hover:bg-[#1e2129]
            overflow-hidden group
        ">
            <Link href={`/product/${id}`} className="block relative aspect-[4/5] overflow-hidden">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                <div className="
                    absolute inset-0 
                    bg-gradient-to-t from-[#0d0f14]/60 via-transparent to-transparent
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                    flex items-end justify-center pb-4
                ">
                    <Button
                        size="sm"
                        onClick={(e) => {
                            e.preventDefault();
                            onAddToCart?.();
                        }}
                        className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    >
                        Add to Cart
                    </Button>
                </div>
            </Link>

            <div className="p-4">
                <Link href={`/product/${id}`}>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1 line-clamp-1 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                        {name}
                    </h3>
                </Link>

                {description && (
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3 line-clamp-2">
                        {description}
                    </p>
                )}

                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-indigo-500 dark:text-indigo-400">
                        {formatPrice(price)}
                    </span>

                    <button className="
                        p-2 rounded-full
                        text-neutral-400 hover:text-red-500
                        hover:bg-red-50 dark:hover:bg-red-500/10
                        transition-colors duration-300
                    ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
