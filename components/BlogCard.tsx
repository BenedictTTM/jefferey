import Link from "next/link";
import Image from "next/image";

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;

    image: string;
    readTime: string;
}

interface BlogCardProps {
    post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
    return (
        <article className="bg-[var(--color-mba-surface)] border border-[var(--color-mba-border)] hover:border-[var(--color-mba-blue)] transition-smooth group">
            <div className="flex flex-col md:flex-row">
                {/* Featured Image */}
                <div className="relative w-full md:w-1/3 h-64 md:h-auto overflow-hidden">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-all duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        loading="lazy"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 p-8">
                    <div className="flex items-center gap-4 mb-4 text-sm text-[var(--color-mba-text-grey)] flex-wrap">

                        <time dateTime={post.date} className="whitespace-nowrap">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                        <span>•</span>
                        <span className="whitespace-nowrap">{post.readTime} read</span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-mba-text-primary)] mb-4 group-hover:text-[var(--color-mba-blue)] transition-smooth">
                        <Link href={`/blog/${post.id}`}>
                            {post.title}
                        </Link>
                    </h2>

                    <p className="text-base text-[var(--color-mba-text-grey)] leading-relaxed mb-6">
                        {post.excerpt}
                    </p>

                    <Link
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center text-sm font-medium text-[var(--color-mba-blue)] hover:text-[var(--color-mba-blue-hover)] transition-smooth"
                    >
                        Read More →
                    </Link>
                </div>
            </div>
        </article>
    );
}
