import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import BlogSidebar from "@/components/BlogSidebar";
import { blogPosts } from "@/lib/data";

export default function BlogPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[var(--color-mba-background)] pt-20">
                <div className="section-padding">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-16">
                            <h1 className="text-5xl md:text-6xl font-bold text-[var(--color-mba-text-primary)] mb-6">
                                Blog
                            </h1>
                            <div className="w-16 h-0.5 bg-[var(--color-mba-blue)] mx-auto mb-6" />
                            <p className="text-lg md:text-xl text-[var(--color-mba-text-grey)] max-w-3xl mx-auto leading-relaxed">
                                Insights on entrepreneurship, leadership, real estate, and digital transformation
                                from my journey across industries and continents.
                            </p>
                        </div>

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Blog Posts */}
                            <div className="lg:col-span-2 space-y-8">
                                {blogPosts.map((post) => (
                                    <BlogCard key={post.id} post={post} />
                                ))}

                                {/* Pagination */}
                                <div className="flex justify-center items-center gap-2 pt-8">
                                    <button className="px-3 md:px-4 py-2 border border-[var(--color-mba-border)] text-[var(--color-mba-text-grey)] hover:border-[var(--color-mba-blue)] hover:text-[var(--color-mba-blue)] transition-smooth flex items-center gap-1 md:gap-2 whitespace-nowrap text-sm md:text-base">
                                        <span>←</span> Previous
                                    </button>
                                    <button className="px-3 md:px-4 py-2 bg-[var(--color-mba-blue)] text-white font-medium text-sm md:text-base">
                                        1
                                    </button>
                                    <button className="hidden sm:block px-3 md:px-4 py-2 border border-[var(--color-mba-border)] text-[var(--color-mba-text-grey)] hover:border-[var(--color-mba-blue)] hover:text-[var(--color-mba-blue)] transition-smooth text-sm md:text-base">
                                        2
                                    </button>
                                    <button className="hidden sm:block px-3 md:px-4 py-2 border border-[var(--color-mba-border)] text-[var(--color-mba-text-grey)] hover:border-[var(--color-mba-blue)] hover:text-[var(--color-mba-blue)] transition-smooth text-sm md:text-base">
                                        3
                                    </button>
                                    <button className="px-3 md:px-4 py-2 border border-[var(--color-mba-border)] text-[var(--color-mba-text-grey)] hover:border-[var(--color-mba-blue)] hover:text-[var(--color-mba-blue)] transition-smooth flex items-center gap-1 md:gap-2 whitespace-nowrap text-sm md:text-base">
                                        Next <span>→</span>
                                    </button>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-1">
                                <BlogSidebar />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
