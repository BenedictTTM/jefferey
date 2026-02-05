import Link from "next/link";
import { recentPosts } from "@/lib/data";

export default function BlogSidebar() {
    return (
        <aside className="space-y-8">
            {/* Search */}
            <div className="bg-[var(--color-mba-surface)] p-6 border border-[var(--color-mba-border)]">
                <h3 className="text-lg font-bold text-[var(--color-mba-text-primary)] mb-4">Search</h3>
                <input
                    type="search"
                    placeholder="Search articles..."
                    className="w-full px-4 py-2.5 bg-[var(--color-mba-background)] text-[var(--color-mba-text-primary)] border border-[var(--color-mba-border)] focus:border-[var(--color-mba-blue)] focus:outline-none transition-smooth"
                />
            </div>



            {/* Recent Posts */}
            <div className="bg-[var(--color-mba-surface)] p-6 border border-[var(--color-mba-border)]">
                <h3 className="text-lg font-bold text-[var(--color-mba-text-primary)] mb-4">Recent Posts</h3>
                <ul className="space-y-4">
                    {recentPosts.map((post, index) => (
                        <li key={index} className="pb-4 border-b border-[var(--color-mba-border)] last:border-b-0 last:pb-0">
                            <Link
                                href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}
                                className="text-sm text-[var(--color-mba-text-primary)] hover:text-[var(--color-mba-blue)] transition-smooth font-medium block mb-1"
                            >
                                {post.title}
                            </Link>
                            <time className="text-xs text-[var(--color-mba-text-grey)]">
                                {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </time>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Newsletter */}
            <div className=" text-white p-6">
                <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
                <p className="text-sm mb-4 opacity-90">
                    Subscribe to receive the latest insights and updates.
                </p>
                <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-2.5 mb-3 bg-white text-black focus:outline-none"
                />
                <button className="w-full px-4 py-2.5 bg-white text-[var(--color-mba-blue)] font-medium hover:bg-[var(--color-mba-surface)] transition-smooth">
                    Subscribe
                </button>
            </div>
        </aside>
    );
}
