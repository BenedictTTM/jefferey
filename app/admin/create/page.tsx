'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Upload } from 'lucide-react';

import Editor from '@/components/Editor';

import { createPostSchema } from '@/lib/schemas';
import { z } from 'zod';

export default function CreatePostPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get('title'),
            excerpt: formData.get('excerpt'),
            content: content,
            readTime: formData.get('readTime'),
            image: formData.get('image'),
        };

        const result = createPostSchema.safeParse(data);

        if (!result.success) {
            const formattedErrors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                formattedErrors[issue.path[0] as string] = issue.message;
            });
            setErrors(formattedErrors);
            setLoading(false);
            return;
        }

        formData.set('content', content);

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                router.push('/admin');
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Error creating post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-8">
            <form onSubmit={handleSubmit}>
                {/* Header */}
                <div className="bg-white border-b sticky top-0 z-10">
                    <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-serif font-bold text-gray-900">Create New Post</h1>
                            <p className="text-gray-500 text-xs mt-0.5">Draft your latest story for the world to see.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors text-xs"
                            >
                                Save Draft
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs flex items-center gap-2"
                            >
                                {loading && (
                                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                )}
                                {loading ? 'Creating...' : 'Create Post'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content - Left Column */}
                        <div className="lg:col-span-2 space-y-5">
                            <div className="space-y-2">
                                <label htmlFor="title" className="block text-sm font-bold text-gray-900">
                                    Post Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    className={`w-full px-3 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400 text-base ${errors.title ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                    placeholder="Enter a catchy title..."
                                />
                                {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="excerpt" className="block text-sm font-bold text-gray-900">
                                    Excerpt
                                </label>
                                <textarea
                                    name="excerpt"
                                    id="excerpt"
                                    rows={3}
                                    className={`w-full px-3 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400 text-sm resize-none ${errors.excerpt ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                    placeholder="Write a short summary that will appear in previews..."
                                />
                                {errors.excerpt && <p className="text-red-500 text-xs">{errors.excerpt}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="content" className="block text-sm font-bold text-gray-900">
                                    Content
                                </label>
                                <div className={`border rounded-lg bg-white overflow-hidden ${errors.content ? 'border-red-500' : 'border-gray-200'}`}>
                                    <Editor value={content} onChange={setContent} />
                                </div>
                                {errors.content && <p className="text-red-500 text-xs">{errors.content}</p>}
                            </div>
                        </div>

                        {/* Sidebar - Right Column */}
                        <div className="space-y-6">
                            {/* Featured Image */}
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-900">
                                    Featured Image
                                </label>
                                <div className={`relative group border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all hover:bg-gray-50 ${errors.image ? 'border-red-500 bg-red-50/50' : 'border-gray-300'
                                    }`}>
                                    {imagePreview ? (
                                        <div className="w-full relative">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-40 object-cover rounded-lg shadow-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setImagePreview(null);
                                                    // Reset file input if possible (requires ref)
                                                }}
                                                className="absolute top-2 right-2 bg-white/90 text-red-500 rounded-full p-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2 text-gray-400">
                                                <Upload className="w-5 h-5" />
                                            </div>
                                            <p className="text-xs font-semibold text-gray-900">Click to upload or drag</p>
                                            <p className="text-[10px] text-gray-500 mt-1">PNG, JPG or WEBP (max. 5MB)</p>
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
                                {errors.image && <p className="text-red-500 text-xs">{errors.image}</p>}
                            </div>

                            {/* Read Time */}
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
                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400 text-sm"
                                        placeholder="e.g. 5"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-medium">mins</span>
                                </div>
                            </div>

                            {/* Category - Visual Only */}
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-900">
                                    Category
                                </label>
                                <div className="relative">
                                    <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-gray-900 text-sm appearance-none cursor-pointer">
                                        <option>News</option>
                                        <option>Tutorial</option>
                                        <option>Article</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Post Visibility - Visual Only */}
                            <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100 space-y-3">
                                <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                    Post Visibility
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input type="radio" name="visibility" defaultChecked className="peer sr-only" />
                                            <div className="w-4 h-4 border-2 border-gray-300 rounded-full peer-checked:border-blue-600 peer-checked:border-4 transition-all bg-white"></div>
                                        </div>
                                        <span className="text-gray-700 text-xs group-hover:text-gray-900 font-medium">Public (Live immediately)</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                       
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <div className="w-4 h-4 border-2 border-gray-300 rounded-full peer-checked:border-blue-600 peer-checked:border-4 transition-all bg-white"></div>
                                        </div>
                                        <span className="text-gray-700 text-xs group-hover:text-gray-900 font-medium">Draft</span>
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
