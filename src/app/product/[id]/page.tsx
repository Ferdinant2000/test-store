'use client';

import { use } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductCard } from '@/components/product/ProductCard';

// Mock product data
const productsData: Record<string, {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    description: string;
    images: string[];
    specifications: { label: string; value: string }[];
    reviews: { id: string; author: string; rating: number; comment: string; date: string }[];
}> = {
    '1': {
        id: '1',
        name: 'Wireless Headphones Pro',
        price: 299.99,
        originalPrice: 399.99,
        description: 'Experience unparalleled audio quality with our Wireless Headphones Pro. Featuring advanced active noise cancellation technology, these headphones deliver crystal-clear sound whether you\'re commuting, working, or relaxing. The premium memory foam ear cushions provide all-day comfort, while the 40-hour battery life ensures your music never stops. With quick charge capability, just 10 minutes of charging gives you 3 hours of playback.',
        images: [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&h=800&fit=crop',
        ],
        specifications: [
            { label: 'Driver Size', value: '40mm' },
            { label: 'Frequency Response', value: '20Hz - 20kHz' },
            { label: 'Battery Life', value: '40 hours' },
            { label: 'Connectivity', value: 'Bluetooth 5.2' },
            { label: 'Weight', value: '250g' },
            { label: 'Noise Cancellation', value: 'Active (ANC)' },
        ],
        reviews: [
            { id: '1', author: 'Alex M.', rating: 5, comment: 'Best headphones I\'ve ever owned. The noise cancellation is incredible!', date: 'Dec 5, 2024' },
            { id: '2', author: 'Sarah K.', rating: 4, comment: 'Great sound quality and very comfortable. Battery lasts forever.', date: 'Dec 3, 2024' },
            { id: '3', author: 'Mike R.', rating: 5, comment: 'Worth every penny. The build quality is exceptional.', date: 'Nov 28, 2024' },
        ],
    },
    '2': {
        id: '2',
        name: 'Smart Watch Series X',
        price: 449.99,
        description: 'The Smart Watch Series X is your ultimate companion for a healthier, more connected lifestyle. Track your fitness goals with precision GPS, monitor your heart rate 24/7, and stay connected with seamless notifications. The always-on Retina display is bright enough for any environment, and the water-resistant design means you can wear it anywhere.',
        images: [
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=800&fit=crop',
        ],
        specifications: [
            { label: 'Display', value: '1.9" OLED Retina' },
            { label: 'Battery Life', value: '18 hours' },
            { label: 'Water Resistance', value: '50 meters' },
            { label: 'Sensors', value: 'Heart rate, GPS, SpO2' },
            { label: 'Storage', value: '32GB' },
        ],
        reviews: [
            { id: '1', author: 'John D.', rating: 5, comment: 'Perfect fitness companion. Love the health tracking features!', date: 'Dec 4, 2024' },
        ],
    },
};

// Related products for recommendations
const relatedProducts = [
    {
        id: '3',
        name: 'Leather Backpack',
        price: 189.99,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop',
        description: 'Handcrafted genuine leather backpack.',
    },
    {
        id: '4',
        name: 'Designer Sunglasses',
        price: 259.99,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=500&fit=crop',
        description: 'UV-protected designer sunglasses.',
    },
    {
        id: '5',
        name: 'Minimalist Desk Lamp',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=500&fit=crop',
        description: 'Modern LED desk lamp.',
    },
    {
        id: '6',
        name: 'Premium Camera Lens',
        price: 899.99,
        image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=400&h=500&fit=crop',
        description: 'Professional-grade camera lens.',
    },
];

interface ProductPageProps {
    params: Promise<{ id: string }>;
}

/**
 * Product detail page
 */
export default function ProductPage({ params }: ProductPageProps) {
    const { id } = use(params);
    const product = productsData[id];

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                        Product Not Found
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                        The product you&apos;re looking for doesn&apos;t exist.
                    </p>
                    <Link
                        href="/store"
                        className="text-indigo-500 hover:text-indigo-600 font-medium"
                    >
                        ← Back to Store
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 lg:py-12">
            <Container>
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <ol className="flex items-center gap-2 text-sm">
                        <li>
                            <Link href="/" className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300">
                                Home
                            </Link>
                        </li>
                        <li className="text-neutral-400">/</li>
                        <li>
                            <Link href="/store" className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300">
                                Store
                            </Link>
                        </li>
                        <li className="text-neutral-400">/</li>
                        <li className="text-neutral-900 dark:text-white font-medium">
                            {product.name}
                        </li>
                    </ol>
                </nav>

                {/* Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
                    {/* Gallery */}
                    <div className="animate-fade-in">
                        <ProductGallery images={product.images} productName={product.name} />
                    </div>

                    {/* Product Info */}
                    <div className="animate-fade-in stagger-1">
                        <ProductInfo
                            name={product.name}
                            price={product.price}
                            originalPrice={product.originalPrice}
                            description={product.description}
                            specifications={product.specifications}
                            reviews={product.reviews}
                            inStock={true}
                            onAddToCart={() => console.log('Add to cart')}
                            onBuyNow={() => console.log('Buy now')}
                        />
                    </div>
                </div>

                {/* Related Products */}
                <section>
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
                        You May Also Like
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className="animate-fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <ProductCard {...product} />
                            </div>
                        ))}
                    </div>
                </section>
            </Container>
        </div>
    );
}
