'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Input } from '@/components/ui/Input';
import { ProductCard } from '@/components/product/ProductCard';

// Mock product data
const products = [
    {
        id: '1',
        name: 'Wireless Headphones Pro',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=500&fit=crop',
        description: 'Premium wireless headphones with active noise cancellation.',
    },
    {
        id: '2',
        name: 'Smart Watch Series X',
        price: 449.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop',
        description: 'Advanced smartwatch with health monitoring features.',
    },
    {
        id: '3',
        name: 'Leather Backpack',
        price: 189.99,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop',
        description: 'Handcrafted genuine leather backpack for everyday use.',
    },
    {
        id: '4',
        name: 'Designer Sunglasses',
        price: 259.99,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=500&fit=crop',
        description: 'UV-protected designer sunglasses with premium frames.',
    },
    {
        id: '5',
        name: 'Minimalist Desk Lamp',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=500&fit=crop',
        description: 'Modern LED desk lamp with adjustable brightness.',
    },
    {
        id: '6',
        name: 'Premium Camera Lens',
        price: 899.99,
        image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=400&h=500&fit=crop',
        description: 'Professional-grade camera lens for stunning photography.',
    },
    {
        id: '7',
        name: 'Bluetooth Speaker',
        price: 179.99,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=500&fit=crop',
        description: 'Portable Bluetooth speaker with 360° sound.',
    },
    {
        id: '8',
        name: 'Mechanical Keyboard',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=500&fit=crop',
        description: 'RGB mechanical keyboard with custom switches.',
    },
];

const categories = ['All', 'Electronics', 'Fashion', 'Accessories', 'Home'];

/**
 * Store page with product grid and filters
 */
export default function StorePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen py-8 lg:py-12">
            <Container>
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                        Store
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-400">
                        Discover our collection of {products.length} premium products
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col lg:flex-row gap-4 mb-8">
                    {/* Search */}
                    <div className="flex-1 max-w-md">
                        <Input
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                            }
                        />
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`
                  px-4 py-2 rounded-xl font-medium text-sm
                  transition-all duration-300
                  ${selectedCategory === category
                                        ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                                    }
                `}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className="animate-fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <ProductCard
                                    {...product}
                                    onAddToCart={() => console.log('Add to cart:', product.id)}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                            No products found
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400">
                            Try adjusting your search or filters
                        </p>
                    </div>
                )}
            </Container>
        </div>
    );
}
