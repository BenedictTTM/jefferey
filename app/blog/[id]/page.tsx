
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogSidebar from "@/components/BlogSidebar";
import { blogPosts } from "@/lib/data";

interface Props {
    params: {
        id: string;
    };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        id: post.id,
    }));
}

export default function BlogPostPage({ params }: Props) {
    const post = blogPosts.find((p) => p.id === params.id);

    if (!post) {
        notFound();
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[var(--color-mba-background)] pt-24 pb-16">
                <div className="section-padding">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Main Content */}
                            <article className="lg:col-span-2">
                                {/* Breadcrumb */}
                                <div className="flex items-center gap-2 text-sm text-[var(--color-mba-text-grey)] mb-6">
                                    <Link
                                        href="/blog"
                                        className="hover:text-[var(--color-mba-blue)] transition-smooth"
                                    >
                                        Blog
                                    </Link>
                                    <span>/</span>
                                    <span className="text-[var(--color-mba-blue)]">{post.category}</span>
                                </div>

                                {/* Header */}
                                <header className="mb-8">
                                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-mba-text-primary)] mb-6 leading-tight">
                                        {post.title}
                                    </h1>

                                    <div className="flex items-center gap-4 text-sm md:text-base text-[var(--color-mba-text-grey)] border-b border-[var(--color-mba-border)] pb-8 flex-wrap">
                                        <time dateTime={post.date} className="whitespace-nowrap">
                                            {new Date(post.date).toLocaleDateString("en-US", {
                                                month: "long",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </time>
                                        <span>•</span>
                                        <span className="whitespace-nowrap">{post.readTime} read</span>
                                    </div>
                                </header>

                                {/* Featured Image */}
                                <div className="relative w-full aspect-video mb-8 overflow-hidden rounded-lg bg-[var(--color-mba-surface)]">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        priority
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 66vw"
                                    />
                                </div>

                                {/* Content */}
                                <div
                                    className="prose prose-lg max-w-none 
                    prose-headings:text-[var(--color-mba-text-primary)] 
                    prose-p:text-[var(--color-mba-text-grey)] 
                    prose-strong:text-[var(--color-mba-text-primary)]
                    prose-a:text-[var(--color-mba-blue)] hover:prose-a:text-[var(--color-mba-blue-hover)]
                    mb-12"
                                    dangerouslySetInnerHTML={{ __html: post.content || '' }}
                                />

                                {/* Tags/Share (Placeholder) */}
                                <div className="border-t border-[var(--color-mba-border)] pt-8 mt-8">
                                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                        <div className="flex gap-2">
                                            <span className="px-3 py-1 bg-[var(--color-mba-surface)] text-[var(--color-mba-text-grey)] text-sm rounded-full">
                                                {post.category}
                                            </span>
                                        </div>
                                        <div className="flex gap-4">
                                            <span className="text-[var(--color-mba-text-grey)] text-sm font-medium">Share:</span>
                                            {/* Add Social Share Icons Here if needed */}
                                            <button className="text-[var(--color-mba-text-primary)] hover:text-[var(--color-mba-blue)] transition-smooth">
                                                LinkedIn
                                            </button>
                                            <button className="text-[var(--color-mba-text-primary)] hover:text-[var(--color-mba-blue)] transition-smooth">
                                                Twitter
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            {/* Sidebar */}
                            <aside className="lg:col-span-1">
                                <div className="sticky top-24">
                                    <BlogSidebar />
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
