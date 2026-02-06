
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import BlogRow from "@/components/BlogRow";
import { blogPosts } from "@/lib/blog-data";

export default function BlogPage() {
    return (
        <>
            <main className="min-h-screen bg-[var(--color-mba-background)] pt-32 pb-24">
                <div className="section-padding">
                    <div className="max-w-5xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-mba-text-primary)] mb-6 font-[family-name:var(--font-oswald)] uppercase tracking-tight">
                                Blog & Articles
                            </h1>
                            <div className="w-16 h-0.5 bg-[var(--color-mba-gold)] mx-auto mb-6" />
                            <p className="text-lg md:text-xl text-[var(--color-mba-text-grey)] max-w-3xl mx-auto leading-relaxed font-light">
                                Insights on entrepreneurship, leadership, real estate, and digital transformation
                                from my journey across industries and continents.
                            </p>
                        </div>

                        {/* Content Grid */}
                        <div className="flex flex-col gap-12 sm:gap-16">

                            {/* Hero Section: Featured + Sidebar */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                                {/* Featured Post (Left) - Takes 7/12 columns */}
                                <div className="lg:col-span-7">
                                    {blogPosts.length > 0 && (
                                        <div className="h-full">
                                            <BlogCard post={blogPosts[0]} />
                                        </div>
                                    )}
                                </div>

                                {/* Sidebar Posts (Right) - Takes 5/12 columns */}
                                <div className="lg:col-span-5 flex flex-col justify-between">
                                    <div className="mb-4">
                                        <h3 className="text-lg font-bold text-[var(--color-mba-text-primary)] mb-6 font-[family-name:var(--font-oswald)] uppercase tracking-wide">
                                            Recent Stories
                                        </h3>
                                        <div className="flex flex-col gap-6">
                                            {blogPosts.slice(1, 4).map((post) => (
                                                <BlogRow key={post.id} post={post} />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Optional decorations or CTA for sidebar */}
                                    <div className="hidden lg:block w-full h-px bg-[var(--color-mba-border)] mt-auto" />
                                </div>
                            </div>

                            {/* Separator */}
                            <div className="w-full h-px bg-[var(--color-mba-border)]" />

                            {/* Remaining Posts Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                                {blogPosts.slice(4).map((post) => (
                                    <div key={post.id} className="h-full">
                                        <BlogCard post={post} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
