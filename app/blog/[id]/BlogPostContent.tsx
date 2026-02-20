"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BlogPost } from "@/types/blog";
import { useRef } from "react";
import LikeButton from "@/components/LikeButton";

interface BlogPostContentProps {
    post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

    if (!post) return null;

    // Split date for styling
    const dateObj = new Date(post.date);
    const day = dateObj.toLocaleDateString('en-GB', { day: 'numeric' });
    const monthYear = dateObj.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

    return (
        <>
            <main className="min-h-screen bg-white pb-24 relative selection:bg-[var(--color-mba-gold)] selection:text-white">
                {/* Navigation - Absolute */}
                <nav className="absolute top-0 left-0 w-full z-10 px-6 py-8 md:px-12 md:py-10 flex justify-between items-center bg-gradient-to-b from-white/80 to-transparent backdrop-blur-[2px]">
                    <Link
                        href="/blog"
                        className="group inline-flex items-center text-xs font-bold tracking-[0.2em] text-[var(--color-mba-text-primary)] hover:text-[var(--color-mba-gold)] transition-colors uppercase"
                    >
                        <ArrowLeft className="w-3 h-3 mr-3 transition-transform group-hover:-translate-x-1" />
                        Back to Journal
                    </Link>
                </nav>

                <article className="pt-24 md:pt-32">
                    {/* Header Section */}
                    <div className="max-w-[1400px] mx-auto px-6 mb-12 md:mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="max-w-3xl mx-auto text-center"
                        >
                            {/* Category & Date */}
                            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 mb-6 text-xs font-bold tracking-[0.25em] text-[var(--color-mba-text-grey)] uppercase">
                                <span className="text-[var(--color-mba-gold)]">
                                    {post.category || "Editorial"}
                                </span>
                                <span className="hidden md:inline-block w-px h-3 bg-gray-300" />
                                <span>{monthYear}</span>
                            </div>

                            {/* Title */}
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--color-mba-text-primary)] mb-8 font-[family-name:var(--font-oswald)] uppercase leading-[1.05] tracking-tight text-balance">
                                {post.title}
                            </h1>

                            {/* Author/Meta */}
                            <div className="flex items-center justify-center gap-6 text-sm text-[var(--color-mba-text-grey)] font-medium">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-[var(--color-mba-gold)]" />
                                    <span>{post.readTime} read</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Hero Image - Bleed/Wide */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.2, 0.65, 0.3, 0.9], delay: 0.2 }}
                        className="w-full max-w-4xl mx-auto px-0 md:px-6 mb-16 md:mb-24"
                    >
                        <div ref={targetRef} className="relative w-full aspect-[16/10] md:aspect-[21/9] overflow-hidden md:rounded-sm bg-gray-100">
                            <motion.div style={{ y }} className="relative w-full h-[120%] -top-[10%]">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="100vw"
                                />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <div className="max-w-3xl mx-auto px-6">
                        {/* Excerpt - Editorial Lead */}
                        {post.excerpt && (
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="text-xl md:text-2xl leading-relaxed text-[var(--color-mba-text-primary)] font-[family-name:var(--font-playfair)] mb-12 md:mb-16 text-center italic border-b pb-8 border-gray-100"
                            >
                                "{post.excerpt}"
                            </motion.p>
                        )}

                        {/* Main Content */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="prose prose-lg prose-slate w-full max-w-none break-words overflow-hidden
                                prose-headings:font-[family-name:var(--font-playfair)] prose-headings:text-[var(--color-mba-text-primary)] prose-headings:font-bold
                                prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-5
                                prose-p:text-[var(--color-mba-text-grey)] prose-p:leading-8 prose-p:mb-5
                                prose-a:text-[var(--color-mba-gold)] prose-a:no-underline prose-a:border-b prose-a:border-[var(--color-mba-gold)] hover:prose-a:bg-[var(--color-mba-gold)]/10 hover:prose-a:border-transparent transition-colors
                                prose-blockquote:border-l-2 prose-blockquote:border-[var(--color-mba-gold)] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-xl prose-blockquote:font-[family-name:var(--font-playfair)] prose-blockquote:bg-gray-50 prose-blockquote:py-4 prose-blockquote:pr-4"
                        >
                            <div dangerouslySetInnerHTML={{ __html: post.content || "" }} />
                        </motion.div>

                        {/* Footer / Share */}
                        <div className="mt-16 pt-10 border-t border-gray-100 flex flex-col items-center text-center">
                            <div className="mb-8">
                                <LikeButton postId={post.id} initialLikes={post.likesCount || 0} className="scale-125 gap-2" />
                            </div>
                            <span className="text-xs font-bold tracking-[0.2em] text-[var(--color-mba-text-grey)] uppercase mb-6">Share this article</span>
                            <div className="flex gap-6">
                                <button className="group w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:border-[var(--color-mba-gold)] hover:bg-[var(--color-mba-gold)] transition-all duration-300">
                                    <span className="sr-only">Twitter</span>
                                    <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                                </button>
                                <button className="group w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:border-[var(--color-mba-gold)] hover:bg-[var(--color-mba-gold)] transition-all duration-300">
                                    <span className="sr-only">Facebook</span>
                                    <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                                </button>
                                <button className="group w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:border-[var(--color-mba-gold)] hover:bg-[var(--color-mba-gold)] transition-all duration-300">
                                    <span className="sr-only">LinkedIn</span>
                                    <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
        </>
    );
}
