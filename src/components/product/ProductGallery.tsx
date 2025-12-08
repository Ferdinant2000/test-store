'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
    images: string[];
    productName: string;
}

/**
 * Product image gallery with thumbnail navigation
 */
export function ProductGallery({ images, productName }: ProductGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <Image
                    src={images[activeIndex]}
                    alt={`${productName} - Image ${activeIndex + 1}`}
                    fill
                    className="object-cover transition-opacity duration-500"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={() => setActiveIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                            className="
                absolute left-4 top-1/2 -translate-y-1/2
                w-10 h-10 rounded-full
                bg-white/80 dark:bg-neutral-900/80
                backdrop-blur-sm
                flex items-center justify-center
                text-neutral-700 dark:text-neutral-300
                hover:bg-white dark:hover:bg-neutral-900
                transition-all duration-300
                shadow-lg
              "
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setActiveIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                            className="
                absolute right-4 top-1/2 -translate-y-1/2
                w-10 h-10 rounded-full
                bg-white/80 dark:bg-neutral-900/80
                backdrop-blur-sm
                flex items-center justify-center
                text-neutral-700 dark:text-neutral-300
                hover:bg-white dark:hover:bg-neutral-900
                transition-all duration-300
                shadow-lg
              "
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </>
                )}

                {/* Image Counter */}
                <div className="
          absolute bottom-4 right-4
          px-3 py-1.5 rounded-full
          bg-black/50 backdrop-blur-sm
          text-white text-sm font-medium
        ">
                    {activeIndex + 1} / {images.length}
                </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={cn(
                                `
                relative w-20 h-20 flex-shrink-0
                rounded-xl overflow-hidden
                border-2 transition-all duration-300
                `,
                                index === activeIndex
                                    ? 'border-indigo-500 shadow-lg shadow-indigo-500/25'
                                    : 'border-transparent hover:border-neutral-300 dark:hover:border-neutral-600 opacity-70 hover:opacity-100'
                            )}
                        >
                            <Image
                                src={image}
                                alt={`${productName} thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="80px"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
