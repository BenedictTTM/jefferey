import SplitHero from "@/components/SplitHero";
import BioExcerpt from "@/components/BioExcerpt";
import Footer from "@/components/Footer";
import Blog from "@/components/Blog";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: {
      date: 'desc',
    },
    take: 6,
  });

  // Map Prisma Post to BlogPost
  const blogPosts = posts.map((post) => ({
    ...post,
    category: post.category || "Uncategorized",
    date: post.date.toISOString(),
    image: post.image || "/dry.png", // Fallback image
    excerpt: post.excerpt || "",
    content: post.content || "",
  }));

  return (
    <>
      <main className="flex min-h-screen flex-col bg-[var(--color-mba-background)]">
        <SplitHero />
        <section id="about">
          <BioExcerpt />
        </section>
        <Blog posts={blogPosts} />
      </main>
      <Footer />
    </>
  );
}
