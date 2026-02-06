"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { BlogPost } from "@/types/blog";

interface BlogPostContentProps {
    post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
    if (!post) return null;

    return (
        <>
            <main className="min-h-screen bg-[#FDFBF7] pt-32 pb-24 relative overflow-hidden">
                {/* Background Geometric Elements */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 0 L100 100 M100 0 L0 100" stroke="currentColor" strokeWidth="0.1" />
                        <circle cx="90" cy="10" r="20" stroke="currentColor" strokeWidth="0.1" fill="none" />
                        <circle cx="10" cy="90" r="30" stroke="currentColor" strokeWidth="0.1" fill="none" />
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    {/* Back Link */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-sm font-bold text-[var(--color-mba-text-primary)] hover:text-[var(--color-mba-gold)] transition-colors tracking-widest uppercase mb-12 md:mb-0 md:absolute md:top-0 md:left-6"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Articles
                    </Link>

                    <article className="max-w-4xl mx-auto">
                        {/* Header */}
                        <header className="text-center mb-16 pt-12">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="inline-block px-6 py-2 mb-8 text-xs font-bold tracking-[0.2em] text-[var(--color-mba-gold)] border border-[var(--color-mba-gold)] rounded-full uppercase bg-white/50 backdrop-blur-sm">
                                    {post.category || "Article"}
                                </span>

                                <div className="relative inline-block">
                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--color-mba-text-primary)] mb-8 font-[family-name:var(--font-playfair)] leading-tight">
                                        {post.title}
                                    </h1>
                                    {/* Decorative underline element */}
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-[var(--color-mba-gold)] rounded-full opacity-60" />
                                </div>

                                <div className="flex items-center justify-center gap-8 text-sm text-[var(--color-mba-text-grey)] font-medium tracking-wide uppercase">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-[var(--color-mba-gold)]" />
                                        <time dateTime={new Date(post.date).toISOString()}>
                                            {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </time>
                                    </div>
                                    <div className="w-1 h-1 bg-[var(--color-mba-gold)] rounded-full" />
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-[var(--color-mba-gold)]" />
                                        <span>{post.readTime} read</span>
                                    </div>
                                </div>
                            </motion.div>
                        </header>

                        {/* Featured Image with Frame */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative w-full mb-20 p-2 md:p-3 border border-[var(--color-mba-gold)]/40 rounded-[2.5rem]"
                        >
                            <div className="relative w-full aspect-[16/9] rounded-[2rem] overflow-hidden shadow-2xl">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                                />
                            </div>
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="prose prose-lg md:prose-xl max-w-none prose-headings:font-[family-name:var(--font-playfair)] prose-headings:font-bold prose-headings:text-[var(--color-mba-text-primary)] prose-p:text-[var(--color-mba-text-grey)] prose-p:leading-loose prose-a:text-[var(--color-mba-gold)] prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl"
                        >
                            <div dangerouslySetInnerHTML={{ __html: post.content || "" }} />
                        </motion.div>

                        {/* Footer / Share */}
                        <div className="mt-20 pt-10 border-t border-[var(--color-mba-border)]/50 flex flex-col items-center">
                            <h3 className="text-xl font-[family-name:var(--font-playfair)] font-bold mb-6">Share this article</h3>
                            <div className="flex gap-4">
                                <button className="w-10 h-10 rounded-full border border-[var(--color-mba-border)] flex items-center justify-center hover:bg-[var(--color-mba-gold)] hover:border-[var(--color-mba-gold)] hover:text-white transition-all">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                                </button>
                                <button className="w-10 h-10 rounded-full border border-[var(--color-mba-border)] flex items-center justify-center hover:bg-[var(--color-mba-gold)] hover:border-[var(--color-mba-gold)] hover:text-white transition-all">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                                </button>
                                <button className="w-10 h-10 rounded-full border border-[var(--color-mba-border)] flex items-center justify-center hover:bg-[var(--color-mba-gold)] hover:border-[var(--color-mba-gold)] hover:text-white transition-all">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                                </button>
                            </div>
                        </div>
                    </article>
                </div>
            </main>
            <Footer />
        </>
    );
}
