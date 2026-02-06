
import { prisma } from '@/lib/prisma';
import Link from "next/link";
import Footer from "@/components/Footer";
import BlogPostContent from './BlogPostContent';

export const dynamic = 'force-dynamic';

export default async function SingleBlogPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    try {
        const post = await prisma.post.findUnique({
            where: {
                id,
            },
        });

        if (!post) {
            return (
                <>
                    <main className="min-h-screen bg-[var(--color-mba-background)] pt-32 pb-24 flex items-center justify-center">
                        <div className="text-center section-padding">
                            <h1 className="text-4xl font-bold font-[family-name:var(--font-oswald)] mb-4">Post Not Found</h1>
                            <Link href="/blog" className="text-[var(--color-mba-gold)] hover:underline">
                                Return to Blog
                            </Link>
                        </div>
                    </main>
                    <Footer />
                </>
            );
        }

        // Serialize date (just in case, though BlogPostContent handles Date object if server->client passing works, 
        // but Next.js usually warns about passing Date objects to client components. 
        // We will pass it as a serialized object just to be safe / explicit.)
        const serializedPost = {
            ...post,
            date: post.date.toISOString(),
        };

        return <BlogPostContent post={serializedPost} />;
    } catch (error) {
        console.error("Error fetching post:", error);
        return (
            <>
                <main className="min-h-screen bg-[var(--color-mba-background)] pt-32 pb-24 flex items-center justify-center">
                    <div className="text-center section-padding">
                        <h1 className="text-4xl font-bold font-[family-name:var(--font-oswald)] mb-4">Error loading post</h1>
                        <Link href="/blog" className="text-[var(--color-mba-gold)] hover:underline">
                            Return to Blog
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }
}
