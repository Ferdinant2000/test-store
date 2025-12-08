'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';

interface ProductSpec {
    label: string;
    value: string;
}

interface ProductReview {
    id: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
}

interface ProductInfoProps {
    name: string;
    price: number;
    originalPrice?: number;
    description: string;
    specifications: ProductSpec[];
    reviews: ProductReview[];
    inStock?: boolean;
    onAddToCart?: () => void;
    onBuyNow?: () => void;
}

/**
 * Product information component with specs, reviews, and CTA buttons
 */
export function ProductInfo({
    name,
    price,
    originalPrice,
    description,
    specifications,
    reviews,
    inStock = true,
    onAddToCart,
    onBuyNow,
}: ProductInfoProps) {
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');

    const averageRating = reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

    const discount = originalPrice
        ? Math.round((1 - price / originalPrice) * 100)
        : 0;

    return (
        <div className="space-y-6">
            {/* Title & Rating */}
            <div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-3">
                    {name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                                key={star}
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill={star <= Math.round(averageRating) ? 'currentColor' : 'none'}
                                stroke="currentColor"
                                strokeWidth="2"
                                className={star <= Math.round(averageRating) ? 'text-yellow-400' : 'text-neutral-300 dark:text-neutral-600'}
                            >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-neutral-600 dark:text-neutral-400">
                        {averageRating.toFixed(1)} ({reviews.length} reviews)
                    </span>
                </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-indigo-500 dark:text-indigo-400">
                    {formatPrice(price)}
                </span>
                {originalPrice && (
                    <>
                        <span className="text-lg text-neutral-400 line-through">
                            {formatPrice(originalPrice)}
                        </span>
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-medium rounded-lg">
                            -{discount}%
                        </span>
                    </>
                )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className={inStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                    {inStock ? 'In Stock' : 'Out of Stock'}
                </span>
            </div>

            {/* Quantity & Actions */}
            <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center border-2 border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-3 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                        −
                    </button>
                    <span className="px-4 py-3 min-w-[60px] text-center font-medium text-neutral-900 dark:text-white">
                        {quantity}
                    </span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-3 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                        +
                    </button>
                </div>

                <Button onClick={onAddToCart} variant="outline" disabled={!inStock}>
                    Add to Cart
                </Button>

                <Button onClick={onBuyNow} disabled={!inStock}>
                    Buy Now
                </Button>
            </div>

            {/* Tabs */}
            <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6">
                <div className="flex gap-6 border-b border-neutral-200 dark:border-neutral-700">
                    {(['description', 'specs', 'reviews'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                pb-3 font-medium capitalize transition-colors relative
                ${activeTab === tab
                                    ? 'text-indigo-500 dark:text-indigo-400'
                                    : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
                                }
              `}
                        >
                            {tab}
                            {activeTab === tab && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 dark:bg-indigo-400 rounded-full" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="pt-6">
                    {/* Description Tab */}
                    {activeTab === 'description' && (
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            {description}
                        </p>
                    )}

                    {/* Specifications Tab */}
                    {activeTab === 'specs' && (
                        <div className="space-y-3">
                            {specifications.map((spec, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between py-3 border-b border-neutral-100 dark:border-neutral-800 last:border-0"
                                >
                                    <span className="text-neutral-500 dark:text-neutral-400">{spec.label}</span>
                                    <span className="font-medium text-neutral-900 dark:text-white">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Reviews Tab */}
                    {activeTab === 'reviews' && (
                        <div className="space-y-6">
                            {reviews.length === 0 ? (
                                <p className="text-neutral-500 dark:text-neutral-400">No reviews yet.</p>
                            ) : (
                                reviews.map((review) => (
                                    <div key={review.id} className="pb-6 border-b border-neutral-100 dark:border-neutral-800 last:border-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-medium text-neutral-900 dark:text-white">
                                                {review.author}
                                            </span>
                                            <span className="text-sm text-neutral-400">{review.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1 mb-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <svg
                                                    key={star}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 24 24"
                                                    fill={star <= review.rating ? 'currentColor' : 'none'}
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    className={star <= review.rating ? 'text-yellow-400' : 'text-neutral-300 dark:text-neutral-600'}
                                                >
                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                </svg>
                                            ))}
                                        </div>
                                        <p className="text-neutral-600 dark:text-neutral-400">{review.comment}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
