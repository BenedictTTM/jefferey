'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image';
import { Edit, Trash2 } from 'lucide-react';

interface Post {
    id: string;
    title: string;
    date: string;
    image?: string;
    excerpt?: string;
    published: boolean;
}

export default function AdminPage() {
    const queryClient = useQueryClient();

    const { data: posts = [], isLoading, isError, error } = useQuery<Post[]>({
        queryKey: ['posts'],
        queryFn: async () => {
            const response = await fetch('/api/posts');
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            // console.log('Fetched posts:', data); 
            return data;
        },
    });

    const deletePostMutation = useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete post');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
        onError: (error) => {
            console.error('Error deleting post:', error);
            alert('Failed to delete post');
        },
    });

    const handleDelete = (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        deletePostMutation.mutate(id);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C5A059]"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
                <div className="text-red-500 font-medium">Error loading posts: {error.message}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-8 font-sans">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                    <h1 className="text-3xl md:text-5xl font-serif text-[#1F2937] tracking-tight">Admin Dashboard</h1>

                    <Link
                        href="/admin/create"
                        className="flex items-center justify-center w-full md:w-auto gap-2 bg-[#263548] text-[#C5A059] px-6 py-3 rounded-lg hover:bg-[#1f2b3b] transition-all shadow-md hover:shadow-lg border border-[#C5A059]/20"
                    >
                        <span className="uppercase tracking-wider text-sm font-semibold">Create New Post</span>
                    </Link>
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block bg-[#FFFDF7] rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden border border-[#C5A059]/20">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#C5A059]/10">
                                <th className="p-8 pb-4 text-xs font-bold text-[#C5A059] uppercase tracking-[0.2em] w-24">Title</th>
                                <th className="p-8 pb-4 text-xs font-bold text-[#C5A059] uppercase tracking-[0.2em]"></th>
                                <th className="p-8 pb-4 text-xs font-bold text-[#C5A059] uppercase tracking-[0.2em]">Status</th>
                                <th className="p-8 pb-4 text-xs font-bold text-[#C5A059] uppercase tracking-[0.2em]">Date</th>
                                <th className="p-8 pb-4 text-xs font-bold text-[#C5A059] uppercase tracking-[0.2em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#C5A059]/10">
                            {posts.map((post) => (
                                <tr key={post.id} className="hover:bg-[#C5A059]/5 transition-colors group">
                                    <td className="p-2 pl-8 w-32">
                                        <div className="relative w-20 h-20 rounded-lg overflow-hidden shadow-sm border border-[#C5A059]/20 group-hover:border-[#C5A059]/40 transition-colors">
                                            {post.image ? (
                                                <Image
                                                    src={post.image}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                                                    <span className="text-xs">No Img</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <h3 className="font-serif text-lg text-[#1F2937] font-medium group-hover:text-[#C5A059] transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        {post.excerpt && (
                                            <p className="text-xs text-gray-400 line-clamp-1 mt-1 font-sans">
                                                {post.excerpt}
                                            </p>
                                        )}
                                    </td>
                                    <td className="p-6">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${post.published
                                                ? 'bg-green-100 text-green-800 border border-green-200'
                                                : 'bg-gray-100 text-gray-800 border border-gray-200'
                                            }`}>
                                            {post.published ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="p-6 text-sm text-[#4B5563] font-medium">
                                        {new Date(post.date).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td className="p-6 pr-8 text-right">
                                        <div className="flex justify-end gap-4">
                                            <Link
                                                href={`/admin/edit/${post.id}`}
                                                className="p-2 text-[#C5A059] hover:text-[#1F2937] hover:bg-[#C5A059]/10 rounded-lg transition-all"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="p-2 text-[#C5A059] hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                disabled={deletePostMutation.isPending}
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-[#FFFDF7] rounded-xl shadow-sm border border-[#C5A059]/20 p-4 flex flex-col gap-4">
                            <div className="flex gap-4">
                                <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden shadow-sm border border-[#C5A059]/20">
                                    {post.image ? (
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                                            <span className="text-xs">No Img</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <h3 className="font-serif text-lg text-[#1F2937] font-medium line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <span className={`flex-shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${post.published
                                                ? 'bg-green-100 text-green-800 border border-green-200'
                                                : 'bg-gray-100 text-gray-800 border border-gray-200'
                                            }`}>
                                            {post.published ? 'Published' : 'Draft'}
                                        </span>
                                    </div>

                                    <p className="text-xs text-gray-500 font-medium">
                                        {new Date(post.date).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric'
                                        })}
                                    </p>
                                    {post.excerpt && (
                                        <p className="text-xs text-gray-400 line-clamp-2 mt-1 font-sans">
                                            {post.excerpt}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-[#C5A059]/10 pt-3 mt-auto">
                                <Link
                                    href={`/admin/edit/${post.id}`}
                                    className="flex items-center gap-2 text-sm font-medium text-[#C5A059]"
                                >
                                    <Edit className="w-4 h-4" />
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600"
                                    disabled={deletePostMutation.isPending}
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="p-16 text-center">
                        <p className="text-[#4B5563] text-lg font-serif italic mb-4">No stories yet.</p>
                        <Link
                            href="/admin/create"
                            className="text-[#C5A059] hover:text-[#1F2937] underline underline-offset-4 decoration-1 transition-colors"
                        >
                            Start writing your first post
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
