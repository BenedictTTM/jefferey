'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';

interface Post {
    id: string;
    title: string;
    date: string;
    image?: string;
}

export default function AdminPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch('/api/posts');
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setPosts(posts.filter((post) => post.id !== id));
            } else {
                alert('Failed to delete post');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Error deleting post');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C5A059]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F9FAFB] p-8 font-sans">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div className="flex items-center gap-4">
                        {/* Navigation Buttons */}

                    </div>
                </div>

                <div className="flex justify-between items-end mb-8 px-2">
                    <h1 className="text-5xl font-serif text-[#1F2937] tracking-tight">Admin Dashboard</h1>

                    <Link
                        href="/admin/create"
                        className="flex items-center gap-2 bg-[#263548] text-[#C5A059] px-6 py-3 rounded-lg hover:bg-[#1f2b3b] transition-all shadow-md hover:shadow-lg border border-[#C5A059]/20"
                    >
                        <span className="uppercase tracking-wider text-sm font-semibold">Create New Post</span>
                    </Link>
                </div>

                {/* Table Card */}
                <div className="bg-[#FFFDF7] rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden border border-[#C5A059]/20 max-w-3xl mx-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#C5A059]/10">
                                <th className="p-8 pb-4 text-xs font-bold text-[#C5A059] uppercase tracking-[0.2em] w-24">Title</th>
                                <th className="p-8 pb-4 text-xs font-bold text-[#C5A059] uppercase tracking-[0.2em]"></th>
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
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

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
        </div>
    );
}
