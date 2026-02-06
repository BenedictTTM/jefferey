import Footer from "@/components/Footer";

const galleryImages = [
    {
        src: "/gallery/tedx-speaking.jpg",
        alt: "Moses B. Arthur speaking at TEDx event",
        caption: "TEDx Speaking Event - Inspiring Innovation"
    },
    {
        src: "/gallery/real-estate-project.jpg",
        alt: "Award-winning real estate development",
        caption: "Award-Winning Real Estate Development"
    },
    {
        src: "/gallery/forbes-blk-event.jpg",
        alt: "Forbes BLK Global Community event",
        caption: "Forbes BLK Global Community Gathering"
    },
    {
        src: "/gallery/keynote-presentation.jpg",
        alt: "Keynote presentation at global conference",
        caption: "Global Keynote - Digital Transformation"
    },
    {
        src: "/gallery/book-signing.jpg",
        alt: "Book signing event",
        caption: "Book Signing - Transformational Leadership"
    },
    {
        src: "/gallery/community-impact.jpg",
        alt: "Community development initiative",
        caption: "Community Impact Project Launch"
    },
    {
        src: "/gallery/panel-discussion.jpg",
        alt: "Panel discussion on entrepreneurship",
        caption: "Entrepreneurship Panel Discussion"
    },
    {
        src: "/gallery/awards-ceremony.jpg",
        alt: "Awards ceremony recognition",
        caption: "Industry Recognition & Awards"
    },
    {
        src: "/gallery/mentorship-program.jpg",
        alt: "Youth mentorship program",
        caption: "Youth Mentorship & Development"
    }
];

export default function GalleryPage() {
    return (
        <>
            <main className="min-h-screen bg-[var(--color-mba-background)] pt-20">
                <div className="section-padding">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-16">
                            <h1 className="text-5xl md:text-6xl font-bold text-[var(--color-mba-text-primary)] mb-6">
                                Gallery
                            </h1>
                            <div className="w-16 h-0.5 bg-[var(--color-mba-blue)] mx-auto mb-6" />
                            <p className="text-lg md:text-xl text-[var(--color-mba-text-grey)] max-w-3xl mx-auto leading-relaxed">
                                Moments from speaking engagements, real estate developments, community initiatives,
                                and transformational projects around the world.
                            </p>
                        </div>

                        {/* Gallery Grid */}
                        <GalleryGrid images={galleryImages} />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
