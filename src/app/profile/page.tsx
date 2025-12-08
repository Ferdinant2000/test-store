'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { ProfileCard } from '@/components/profile/ProfileCard';
import { ProfileEditForm } from '@/components/profile/ProfileEditForm';

// Mock user data
const userData = {
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@gmail.com',
    phone: '+1 (555) 123-4567',
};

// Mock order data
const orders = [
    {
        id: 'ORD-001',
        date: 'Dec 5, 2024',
        status: 'Delivered',
        total: 299.99,
        items: 2,
    },
    {
        id: 'ORD-002',
        date: 'Nov 28, 2024',
        status: 'Shipped',
        total: 449.99,
        items: 1,
    },
    {
        id: 'ORD-003',
        date: 'Nov 15, 2024',
        status: 'Delivered',
        total: 189.99,
        items: 3,
    },
];

/**
 * Profile page with user info and order history
 */
export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState(userData);

    const handleSave = (data: typeof userData) => {
        setProfile({ ...profile, ...data });
        setIsEditing(false);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Delivered':
                return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
            case 'Shipped':
                return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
            case 'Processing':
                return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400';
            default:
                return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400';
        }
    };

    return (
        <div className="min-h-screen py-8 lg:py-12">
            <Container>
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                        Profile
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-400">
                        Manage your account and view order history
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card / Edit Form */}
                    <div className="lg:col-span-1 animate-fade-in">
                        {isEditing ? (
                            <ProfileEditForm
                                initialData={profile}
                                onSave={handleSave}
                                onCancel={() => setIsEditing(false)}
                            />
                        ) : (
                            <ProfileCard
                                {...profile}
                                onEdit={() => setIsEditing(true)}
                            />
                        )}
                    </div>

                    {/* Order History */}
                    <div className="lg:col-span-2 animate-fade-in stagger-1">
                        <Card>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                                    Order History
                                </h2>
                                <span className="text-sm text-neutral-500">
                                    {orders.length} orders
                                </span>
                            </div>

                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                                    >
                                        <div className="mb-3 sm:mb-0">
                                            <p className="font-semibold text-neutral-900 dark:text-white">
                                                {order.id}
                                            </p>
                                            <p className="text-sm text-neutral-500">
                                                {order.date} • {order.items} item{order.items > 1 ? 's' : ''}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                            <span className="font-semibold text-neutral-900 dark:text-white">
                                                ${order.total.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                            <Card className="text-center animate-fade-in stagger-2">
                                <div className="text-3xl font-bold text-indigo-500 mb-1">
                                    {orders.length}
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                    Total Orders
                                </p>
                            </Card>

                            <Card className="text-center animate-fade-in stagger-3">
                                <div className="text-3xl font-bold text-purple-500 mb-1">
                                    ${orders.reduce((sum, o) => sum + o.total, 0).toFixed(0)}
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                    Total Spent
                                </p>
                            </Card>

                            <Card className="text-center animate-fade-in stagger-4">
                                <div className="text-3xl font-bold text-green-500 mb-1">
                                    {orders.filter(o => o.status === 'Delivered').length}
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                    Delivered
                                </p>
                            </Card>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
