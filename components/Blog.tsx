"use client";

import { motion } from "framer-motion";
import BlogCard from "./BlogCard";

export default function Blog() {
    const blogPosts = [
        {
            id: "1",
            title: "Advancing 3D Bioprinting in Africa",
            excerpt: "Exploring the potential of low-cost 3D bioprinting technologies to revolutionize healthcare and research across the continent.",
            date: "2024-03-15",
            category: "Research",
            image: "/dry.png", // Using existing image
            readTime: "5 min",
        },
        {
            id: "2",
            title: "Mentoring the Next Generation of Engineers",
            excerpt: "Reflections on leading the Umoja Robotics team and the importance of STEM mentorship for high school students.",
            date: "2024-02-10",
            category: "Mentorship",
            image: "/mba-headshot.jpg", // Using existing image
            readTime: "4 min",
        },
        {
            id: "3",
            title: "The Future of Bacterial Genome Analysis",
            excerpt: "Key takeaways from the Wellcome Connecting Science certification and how data science is shaping bioinformatics.",
            date: "2024-01-20",
            category: "Bioinformatics",
            image: "/citations.jpeg", // Using existing image
            readTime: "6 min",
        },
    ];

    return (
        <section className="py-24 px-6 md:px-12 bg-[var(--color-mba-background)]" id="blog">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Latest Insights</h2>
                    <div className="h-1 w-24 bg-[var(--color-mba-border)]"></div>
                    <p className="mt-6 text-[var(--color-mba-text-grey)] max-w-2xl text-lg">
                        Thoughts on bioengineering, leadership, and the future of STEM education in Africa.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
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
            </div>
        </section>
    );
}
