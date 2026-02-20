"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import BlogCard from "./BlogCard";
import { BlogPost } from "@/types/blog";

interface BlogProps {
    posts: BlogPost[];
}

export default function Blog({ posts }: BlogProps) {
    const [visibleCount, setVisibleCount] = useState(2);

    const visiblePosts = posts.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 2);
    };

    return (
        <section className="py-24 px-6 md:px-12 bg-[var(--color-mba-background)]" id="blog">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-mba-text-primary)] mb-4 font-[family-name:var(--font-oswald)] uppercase tracking-tight">Explore our Blog & Articles</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-12">
                    {visiblePosts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <BlogCard post={post} />
                        </motion.div>
                    ))}
                </div>

                {visibleCount < posts.length && (
                    <div className="flex justify-center">
                        <button
                            onClick={handleLoadMore}
                            className="px-8 py-3 text-sm font-semibold text-[var(--color-mba-text-primary)] border border-[var(--color-mba-border)] rounded-full hover:bg-[var(--color-mba-gold)] hover:text-white hover:border-transparent transition-all duration-300 uppercase tracking-widest"
                        >
                            Load More Articles
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
