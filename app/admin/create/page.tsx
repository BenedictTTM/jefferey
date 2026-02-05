'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Upload } from 'lucide-react';

import Editor from '@/components/Editor';

export default function CreatePostPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
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
            <div className="max-w-3xl mx-auto">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label htmlFor="title" className="block text-sm font-semibold text-gray-800">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white text-sm"
                                placeholder="Enter post title"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="category" className="block text-sm font-semibold text-gray-800">
                                Category
                            </label>
                            <input
                                type="text"
                                name="category"
                                id="category"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white text-sm"
                                placeholder="e.g. Technology"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="excerpt" className="block text-sm font-semibold text-gray-800">
                            Excerpt
                        </label>
                        <textarea
                            name="excerpt"
                            id="excerpt"
                            required
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white text-sm"
                            placeholder="Brief summary used in cards"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="content" className="block text-sm font-semibold text-gray-800">
                            Content
                        </label>
                        <div className="relative">
                            <Editor value={content} onChange={setContent} />
                        </div>
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
                            <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors bg-gray-50">
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    accept="image/*"
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                                />
                                <p className="text-xs text-gray-500 mt-1 ml-1">Upload a high quality cover image</p>
                            </div>
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
