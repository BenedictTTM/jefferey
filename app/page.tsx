import SplitHero from "@/components/SplitHero";
import BioExcerpt from "@/components/BioExcerpt";
import Footer from "@/components/Footer";
import Blog from "@/components/Blog";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col bg-[var(--color-mba-background)]">
        <SplitHero />
        <section id="about">
          <BioExcerpt />
        </section>
        <Blog />
      </main>
      <Footer />
    </>
  );
}
