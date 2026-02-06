'use client';

import { useMutation } from '@tanstack/react-query';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Upload } from 'lucide-react';

import Editor from '@/components/Editor';

import { createPostSchema } from '@/lib/schemas';
import { z } from 'zod';

export default function CreatePostPage() {
    const router = useRouter();

    const [content, setContent] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const createPostMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await fetch('/api/posts', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to create post');
            }

            return response.json();
        },
        onSuccess: () => {
            router.push('/admin');
        },
        onError: (error: Error) => {
            console.error('Error creating post:', error);
            alert(error.message);
        },
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});

        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get('title'),
            excerpt: formData.get('excerpt'),
            content: content,
            readTime: formData.get('readTime'),
            category: formData.get('category'),
            image: formData.get('image'),
        };

        const result = createPostSchema.safeParse(data);

        if (!result.success) {
            const formattedErrors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                formattedErrors[issue.path[0] as string] = issue.message;
            });
            setErrors(formattedErrors);
            return;
        }

        formData.set('content', content);
        createPostMutation.mutate(formData);
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB] pb-6">
            <form onSubmit={handleSubmit}>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-end gap-3 mb-6">
                        <button
                            type="button"
                            className="px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-all text-sm"
                        >
                            Save Draft
                        </button>
                        <button
                            type="submit"
                            disabled={createPostMutation.isPending}
                            className="px-5 py-2.5 rounded-lg bg-[#263548] text-white font-medium hover:bg-[#1f2b3b] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center gap-2 shadow-sm"
                        >
                            {createPostMutation.isPending && (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            )}
                            {createPostMutation.isPending ? 'Creating...' : 'Create Post'}
                        </button>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content - Left Column */}
                        <div className="lg:col-span-2">
                            <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-xl p-6 shadow-sm">
                                <h2 className="text-2xl  font-bold text-[#1F2937] mb-6">Post Details</h2>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label htmlFor="title" className="block text-sm font-bold text-gray-800">
                                            Post Title
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            className={`w-full px-4 py-3 bg-[#FAF9F6] border rounded-lg focus:ring-2 focus:ring-[#C5A059]/20 focus:border-[#C5A059] outline-none transition-all text-gray-900 placeholder-gray-400 text-lg  ${errors.title ? 'border-red-500' : 'border-[#E5E5E5]'
                                                }`}
                                            placeholder="Enter a catchy title..."
                                        />
                                        {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="excerpt" className="block text-sm font-bold text-gray-800">
                                            Excerpt
                                        </label>
                                        <textarea
                                            name="excerpt"
                                            id="excerpt"
                                            rows={3}
                                            className={`w-full px-4 py-3 bg-[#FAF9F6] border rounded-lg focus:ring-2 focus:ring-[#C5A059]/20 focus:border-[#C5A059] outline-none transition-all text-gray-900 placeholder-gray-400 text-base resize-none ${errors.excerpt ? 'border-red-500' : 'border-[#E5E5E5]'
                                                }`}
                                            placeholder="Write a short summary..."
                                        />
                                        {errors.excerpt && <p className="text-red-500 text-xs">{errors.excerpt}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="content" className="block text-sm font-bold text-gray-800">
                                            Content
                                        </label>
                                        <div className={`overflow-hidden rounded-lg border ${errors.content ? 'border-red-500' : 'border-[#E5E5E5]'}`}>
                                            <Editor value={content} onChange={setContent} />
                                        </div>
                                        {errors.content && <p className="text-red-500 text-xs">{errors.content}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar - Right Column */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Post Settings</h3>

                            {/* Featured Image */}
                            <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-xl p-5 shadow-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <label className="block text-sm font-bold text-gray-900">
                                        Featured Image
                                    </label>
                                    <button type="button" className="text-xs text-[#C5A059] font-medium hover:underline">
                                        Upload
                                    </button>
                                </div>

                                <div className={`relative group border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center transition-all hover:bg-white/50 ${errors.image ? 'border-red-500 bg-red-50/50' : 'border-[#D1D5DB]'
                                    }`}>
                                    {imagePreview ? (
                                        <div className="w-full relative">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-40 object-cover rounded-md shadow-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setImagePreview(null)}
                                                className="absolute top-2 right-2 bg-white/90 text-red-500 rounded-full p-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2 text-gray-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                                            </div>
                                            <p className="text-xs font-semibold text-gray-700">Click to upload image</p>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </div>
                                {errors.image && <p className="text-red-500 text-xs mt-2">{errors.image}</p>}
                            </div>

                            {/* Estimated Read Time */}
                            <div className="space-y-2">
                                <label htmlFor="readTime" className="block text-sm font-bold text-gray-900">
                                    Estimated Read Time
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="readTime"
                                        id="readTime"
                                        defaultValue="5"
                                        className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#E5E5E5] rounded-xl focus:ring-2 focus:ring-[#C5A059]/20 focus:border-[#C5A059] outline-none transition-all text-gray-900 placeholder-gray-400 text-sm"
                                        placeholder="e.g. 5"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-medium">mins</span>
                                </div>
                            </div>

                            {/* Category */}
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-900">
                                    Category
                                </label>
                                <div className="relative">
                                    <select name="category" className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#E5E5E5] rounded-xl focus:ring-2 focus:ring-[#C5A059]/20 focus:border-[#C5A059] outline-none transition-all text-gray-900 text-sm appearance-none cursor-pointer">
                                        <option value="Uncategorized">Select a category</option>
                                        <option value="Research">Research</option>
                                        <option value="Mentorship">Mentorship</option>
                                        <option value="Bioinformatics">Bioinformatics</option>
                                        <option value="Engineering">Engineering</option>
                                        <option value="AI & Health">AI & Health</option>
                                        <option value="Community">Community</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Post Visibility */}
                            <div className="bg-[#FAF9F6] rounded-xl p-5 border border-[#E5E5E5] space-y-4 shadow-sm">
                                <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                    Post Visibility
                                </div>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input type="radio" name="visibility" defaultChecked className="peer sr-only" />
                                            <div className="w-4 h-4 border border-gray-400 rounded-full peer-checked:border-[#263548] peer-checked:border-4 transition-all bg-white"></div>
                                        </div>
                                        <span className="text-gray-600 text-sm group-hover:text-gray-900 transition-colors">Public</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input type="radio" name="visibility" className="peer sr-only" />
                                            <div className="w-4 h-4 border border-gray-400 rounded-full peer-checked:border-[#263548] peer-checked:border-4 transition-all bg-white"></div>
                                        </div>
                                        <span className="text-gray-600 text-sm group-hover:text-gray-900 transition-colors">Private</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
