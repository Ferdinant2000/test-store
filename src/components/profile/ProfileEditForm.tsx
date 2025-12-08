'use client';

import { useState, FormEvent } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface ProfileData {
    avatar: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

interface ProfileEditFormProps {
    initialData: ProfileData;
    onSave?: (data: ProfileData) => void;
    onCancel?: () => void;
}

/**
 * Profile edit form component
 */
export function ProfileEditForm({
    initialData,
    onSave,
    onCancel,
}: ProfileEditFormProps) {
    const [formData, setFormData] = useState<ProfileData>(initialData);
    const [errors, setErrors] = useState<Partial<Record<keyof ProfileData, string>>>({});
    const [isLoading, setIsLoading] = useState(false);

    const validate = () => {
        const newErrors: Partial<Record<keyof ProfileData, string>> = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (field: keyof ProfileData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsLoading(false);
        onSave?.(formData);
    };

    return (
        <Card>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
                Edit Profile
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Avatar Upload */}
                <div className="flex items-center gap-6 mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-2xl font-bold text-white">
                        {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                    </div>
                    <div>
                        <Button type="button" variant="outline" size="sm">
                            Change Avatar
                        </Button>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                            JPG, PNG or GIF. Max 2MB.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input
                        label="First Name"
                        type="text"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleChange('firstName')}
                        error={errors.firstName}
                    />
                    <Input
                        label="Last Name"
                        type="text"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleChange('lastName')}
                        error={errors.lastName}
                    />
                </div>

                <Input
                    label="Email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange('email')}
                    error={errors.email}
                />

                <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange('phone')}
                    error={errors.phone}
                />

                <div className="flex gap-4 pt-4">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button type="button" variant="ghost" onClick={onCancel}>
                        Cancel
                    </Button>
                </div>
            </form>
        </Card>
    );
}
