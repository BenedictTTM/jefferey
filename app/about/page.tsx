import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Timeline from "@/components/Timeline";
import ContactCTA from "@/components/ContactCTA";
import Image from "next/image";
import { Landmark, Sprout, Briefcase, Palette, Users, Heart, Check } from "lucide-react";

const timelineEntries = [
    {
        year: "2025",
        title: "Deputy Minister of Food and Agriculture",
        description: "Appointed by President John Dramani Mahama and sworn into office on March 13, 2025."
    },
    {
        year: "2024",
        title: "Member of Parliament - Ayawaso West Wuogon",
        description: "Won the parliamentary election convincingly on the ticket of the National Democratic Congress (NDC)."
    },
    {
        year: "2020",
        title: "Contested 2020 General Elections",
        description: "Represented the NDC in the Ayawaso West Wuogon Constituency, narrowly missing the seat in a hard-fought campaign."
    },
    {
        year: "2019",
        title: "NDC Parliamentary Primaries Victory",
        description: "Won the NDC primaries with 758 votes to become the parliamentary candidate for Ayawaso West Wuogon."
    },
    {
        year: "2014",
        title: "Social Media Milestone",
        description: "Became the first Ghanaian to hit 1 million likes on Facebook, cementing status as a digital influencer."
    },
    {
        year: "2013",
        title: "Best Actor - Ghana Movie Awards",
        description: "Won Best Actor in a Lead Role for 'A Northern Affair', adding to a growing list of accolades."
    },
    {
        year: "2012",
        title: "Launched J.Melo & Agriculture Ventures",
        description: "Established the J.Melo clothing line and expanded into commercial crop and animal farming."
    },
    {
        year: "1991",
        title: "Acting Debut",
        description: "Started acting career at age 7 in the movie 'Baby Thief', paving the way for a stellar career in film."
    }
];

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[var(--color-mba-background)] pt-16">
                <div className="section-padding">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-mba-text-primary)] mb-6">
                                About John Dumelo
                            </h1>
                            <div className="w-16 h-0.5 bg-[var(--color-mba-blue)] mx-auto mb-6" />
                        </div>

                        {/* Headshot and Introduction */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                            <div className="relative aspect-[3/4] overflow-hidden">
                                <Image
                                    src="https://i.pinimg.com/736x/ae/82/5a/ae825a138458c91f838280f80cea701a.jpg"
                                    alt="John Dumelo - Professional Portrait"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    priority
                                />
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-mba-text-primary)]">
                                    Biography
                                </h2>
                                <div className="space-y-4 text-lg text-[var(--color-mba-text-grey)] leading-relaxed">
                                    <p>
                                        John Matthew Kofi Setor Dumelo is a distinguished Ghanaian actor, politician, and entrepreneur.
                                        Born on February 3, 1984, in Accra with roots in Likpe Bala, Oti Region, he has grown to become
                                        one of the most influential figures in Ghana.
                                    </p>
                                    <p>
                                        John's journey began at Christ the King School and Achimota School, where he was part of the Drama Club.
                                        He later studied Civil Engineering at KNUST and furthered his education at GIMPA's School of Public Service and Governance.
                                    </p>
                                    <p>
                                        As an actor, John has graced screens for over two decades, winning awards such as the "African Most Outstanding Actor"
                                        at the Afro Australian Movies and Music Awards and Best Actor at the Ghana Movie Awards.
                                    </p>
                                    <p>
                                        Transitioning into public service, John is currently the Member of Parliament for Ayawaso West Wuogon
                                        and serves as the Deputy Minister of Food and Agriculture. He is a passionate advocate for youth development,
                                        agriculture, and job creation.
                                    </p>
                                </div>

                                <a
                                    href="#contact"
                                    className="inline-block px-6 py-3 bg-[var(--color-mba-blue)] text-white text-sm font-medium uppercase tracking-wide hover:bg-[var(--color-mba-blue-hover)] transition-smooth hover-glow mt-6"
                                >
                                    Contact Office
                                </a>
                            </div>
                        </div>

                        {/* Experience Timeline */}
                        <div className="mb-16">
                            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-mba-text-primary)] mb-8">
                                Life & Career Timeline
                            </h2>
                            <Timeline entries={timelineEntries} />
                        </div>

                        {/* Memberships - Replaced with Awards/Recognition for now or kept generic */}
                        {/* We could comment this out if we don't have membership badges content, but let's leave it if it's generic images. 
                            Actually, looking at previous steps, MembershipBadges was imported. I'll keep it but maybe we should check it later. 
                            For now, I'll assume it's okay or generic.
                            Wait, John Dumelo doesn't necesarilly have "MembershipBadges" like Forbes BLK same as Moses. 
                            I will comment it out or remove it to be safe.
                        */}
                        {/* <div className="mb-20">
                            <MembershipBadges />
                        </div> */}

                        {/* Areas of Focus - Redesigned */}
                        <div className="py-8 bg-[var(--color-mba-surface)] -mx-[calc((100vw-100%)/2)] px-[calc((100vw-100%)/2)]">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="text-center mb-12">
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                                        Areas of Focus
                                    </h2>
                                    <div className="w-16 h-0.5 bg-[var(--color-mba-blue)] mx-auto" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto gap-3 grid-flow-dense">
                                    {[
                                        {
                                            icon: Landmark,
                                            title: "Politics & Governance",
                                            description: "Representing the people and driving legislative change for national development. Focusing on policy reform, community engagement, and sustainable development initiatives that directly impact the lives of citizens. Dedicated to transparent leadership and accountable governance to build a stronger future for Ghana.",
                                            checkpoints: [
                                                "Member of Parliament (Ayawaso West Wuogon)",
                                                "Deputy Minister-Designate for Food and Agriculture",
                                                "Deputy Minister for Food and Agriculture (In Office)"
                                            ],
                                            className: "md:col-span-2 md:row-span-2"
                                        },
                                        {
                                            icon: Sprout,
                                            title: "Agriculture",
                                            description: "Advocating for modern farming, food security, and youth involvement in agriculture."
                                        },
                                        {
                                            icon: Briefcase,
                                            title: "Entrepreneurship",
                                            description: "Creating jobs and opportunities through ventures like J.Melo and commercial farming."
                                        },
                                        {
                                            icon: Palette,
                                            title: "Arts & Culture",
                                            description: "Promoting the Ghanaian creative arts industry through film and advocacy."
                                        },
                                        {
                                            icon: Users,
                                            title: "Youth Empowerment",
                                            description: "Mentoring and supporting the youth through education and skills training."
                                        },
                                        {
                                            icon: Heart,
                                            title: "Philanthropy",
                                            description: "Supporting underprivileged communities through the John Dumelo Foundation."
                                        }
                                    ].map((area, index) => (
                                        <div
                                            key={index}
                                            className={`bg-[var(--color-mba-background)] p-5 md:p-6 rounded-xl border border-white/5 hover:border-[var(--color-mba-blue)]/30 transition-all duration-300 group hover:-translate-y-1 h-full flex flex-col justify-start w-full mx-auto ${area.className || ""}`}
                                        >
                                            <div className="w-12 h-12 rounded-lg bg-[var(--color-mba-blue)]/10 flex items-center justify-center mb-3 text-[var(--color-mba-blue)]  group-hover:text-white transition-colors duration-300 shrink-0">
                                                <area.icon className="w-6 h-6" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[var(--color-mba-blue)] transition-colors">
                                                {area.title}
                                            </h3>
                                            <p className="text-white/60 leading-relaxed text-sm">
                                                {area.description}
                                            </p>
                                            {area.checkpoints && (
                                                <div className="mt-6 space-y-3">
                                                    {area.checkpoints.map((point, idx) => (
                                                        <div key={idx} className="flex items-start gap-3">
                                                            <div className="w-5 h-5 rounded border border-[var(--color-mba-blue)]/30 flex items-center justify-center bg-[var(--color-mba-blue)]/10 text-[var(--color-mba-blue)] shrink-0 mt-0.5">
                                                                <Check className="w-3 h-3" />
                                                            </div>
                                                            <span className="text-white/80 text-sm font-medium">{point}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact CTA */}
                        <ContactCTA />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
