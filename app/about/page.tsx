
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    return (
        <>
            <main className="min-h-screen bg-[var(--color-mba-background)] pt-32 pb-24">
                <div className="section-padding">
                    <div className="max-w-[1400px] mx-auto">

                        {/* 1. Header Section */}
                        <div className="mb-16 md:mb-24">
                            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-bold text-[var(--color-mba-text-primary)] mb-12 font-[family-name:var(--font-oswald)] uppercase leading-[0.9] tracking-tighter">
                                MEET <br /> JEFFREY MAWUSI DRAI
                            </h1>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end border-t border-gray-200 pt-8">
                                <div className="max-w-xl">
                                    <p className="text-lg text-[var(--color-mba-text-grey)] leading-relaxed font-light">
                                        Jeffrey Mawusi Drai is a Ghanaian bioengineering researcher and scholar currently based at the Lassonde School of Engineering at York University in Canada.
                                        Recognized for his academic excellence, he is actively involved in STEM advocacy and student leadership.
                                    </p>
                                </div>
                                <div className="flex flex-col lg:items-end justify-between h-full gap-6">
                                    <p className="text-sm md:text-base text-[var(--color-mba-text-grey)] max-w-md lg:text-right font-light">
                                        Currently an NSERC CREATE Research Fellow focusing on bioengineering, 3D bioprinting, and data analysis to drive medical innovation.
                                    </p>
                                    <Link
                                        href="#contact"
                                        className="inline-flex items-center text-sm font-bold tracking-[0.2em] text-[var(--color-mba-text-primary)] hover:text-[var(--color-mba-gold)] transition-colors uppercase group"
                                    >
                                        LEARN MORE
                                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* 2. Hero Image Section - Wide */}
                        <div className="w-full aspect-[4/3] md:aspect-[21/9] relative mb-24 md:mb-32 overflow-hidden bg-gray-100">
                            <Image
                                src="https://media.licdn.com/dms/image/v2/C4E22AQHYH1Y5DvHjAQ/feedshare-shrink_800/feedshare-shrink_800/0/1654290870119?e=2147483647&v=beta&t=iq7RzeIzADwwvxFtodoTI9Sh23O2nBfkziea2CHxpvo"
                                alt="Jeffrey Mawusi Drai Team / Vision"
                                fill
                                className="object-cover object-[50%_13%]"
                                sizes="100vw"
                                priority
                                quality={100}
                                unoptimized
                            />
                        </div>

                        {/* 3. Inside Mawusi Drai Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-24">
                            {/* Left Sticky Label */}
                            <div className="lg:col-span-4">
                                <div className="sticky top-32">
                                    <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-oswald)] uppercase text-[var(--color-mba-text-primary)] mb-2">
                                        INSIDE
                                    </h2>
                                    <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] italic text-[var(--color-mba-text-grey)]">
                                        JEFFREY MAWUSI DRAI
                                    </h2>
                                </div>
                            </div>

                            {/* Right Content */}
                            <div className="lg:col-span-8 space-y-20">
                                {/* Intro Paragraph */}
                                <div>
                                    <p className="text-xl md:text-2xl leading-relaxed text-[var(--color-mba-text-primary)] font-light max-w-3xl">
                                        Bridging the gap between engineering and medicine.
                                        With a First Class Honours foundation from the University of Ghana and advanced research at York University,
                                        Jeffrey combines technical expertise in 3D bioprinting with a passion for educational empowerment.
                                    </p>
                                </div>

                                {/* List Items */}
                                <div className="space-y-16 border-t border-gray-100 pt-16">
                                    {/* Item 01 */}
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                                        <div className="md:col-span-2 text-xs font-bold text-[var(--color-mba-text-grey)] mt-1">01</div>
                                        <div className="md:col-span-3">
                                            <h3 className="text-2xl font-[family-name:var(--font-oswald)] text-[var(--color-mba-text-primary)]">Research & Innovation</h3>
                                        </div>
                                        <div className="md:col-span-7">
                                            <p className="text-[var(--color-mba-text-grey)] leading-relaxed">
                                                As an NSERC CREATE Research Fellow, Jeffrey focuses on cutting-edge bioengineering and 3D bioprinting.
                                                His work leverages data analysis to push the boundaries of medical research, aiming to develop sustainable and impactful healthcare solutions.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Item 02 */}
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-gray-100 pt-16">
                                        <div className="md:col-span-2 text-xs font-bold text-[var(--color-mba-text-grey)] mt-1">02</div>
                                        <div className="md:col-span-3">
                                            <h3 className="text-2xl font-[family-name:var(--font-oswald)] text-[var(--color-mba-text-primary)]">Academic Excellence</h3>
                                        </div>
                                        <div className="md:col-span-7">
                                            <p className="text-[var(--color-mba-text-grey)] leading-relaxed">
                                                Jeffrey graduated top of his class from the University of Ghana with a 3.81/4.00 FGPA in Biomedical Engineering.
                                                His commitment to excellence has been recognized with the GNPC Foundation Scholarship and the Dean’s Honour Award.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Item 03 */}
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-gray-100 pt-16">
                                        <div className="md:col-span-2 text-xs font-bold text-[var(--color-mba-text-grey)] mt-1">03</div>
                                        <div className="md:col-span-3">
                                            <h3 className="text-2xl font-[family-name:var(--font-oswald)] text-[var(--color-mba-text-primary)]">Leadership & Advocacy</h3>
                                        </div>
                                        <div className="md:col-span-7">
                                            <p className="text-[var(--color-mba-text-grey)] leading-relaxed">
                                                Beyond the lab, Jeffrey is a relentless advocate for STEM. From mentoring high schoolers in robotics with Umoja Robotics
                                                to coordinating quality education initiatives for Bridge QE Africa, he is dedicated to empowering the next generation of African innovators.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact CTA */}
                        <div className="border-t border-gray-200 pt-16">
                            <Contact />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
