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
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <Link
                        href="/admin"
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 space-y-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-1.5">
                            <label htmlFor="title" className="block text-sm font-semibold text-gray-800">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white text-sm ${errors.title ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Enter post title"
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="excerpt" className="block text-sm font-semibold text-gray-800">
                            Excerpt
                        </label>
                        <textarea
                            name="excerpt"
                            id="excerpt"
                            rows={2}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white text-sm ${errors.excerpt ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Brief summary used in cards"
                        />
                        {errors.excerpt && <p className="text-red-500 text-xs mt-1">{errors.excerpt}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="content" className="block text-sm font-semibold text-gray-800">
                            Content
                        </label>
                        <div className="relative">
                            <Editor value={content} onChange={setContent} />
                        </div>
                        {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <div className="space-y-1.5">
                            <label htmlFor="readTime" className="block text-sm font-semibold text-gray-800">
                                Read Time
                            </label>
                            <input
                                type="text"
                                name="readTime"
                                id="readTime"
                                defaultValue="5 min"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white text-sm"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="image" className="block text-sm font-semibold text-gray-800">
                                Featured Image
                            </label>
                            <div className={`p-3 border-2 border-dashed rounded-lg hover:border-blue-500 transition-colors bg-gray-50 ${errors.image ? 'border-red-500' : 'border-gray-300'
                                }`}>
                                {imagePreview && (
                                    <div className="mb-2 relative group">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-32 object-cover rounded-lg shadow-sm border border-gray-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setImagePreview(null)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        </button>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                                />
                                <p className="text-xs text-gray-500 mt-1 ml-1">Upload a high quality cover image</p>
                            </div>
                            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                        </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Create Post
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
