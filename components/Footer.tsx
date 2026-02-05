import Link from "next/link";
import { Linkedin, Twitter, Instagram, Mail } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[var(--color-mba-background)] border-t border-[var(--color-mba-border)]/10 text-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                    {/* Column 1: Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6">Navigation</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/" className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-3 group text-sm md:text-base">
                                    <span className="w-0 group-hover:w-3 h-[1px] bg-[var(--color-mba-blue)] transition-all duration-300 block"></span>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/gallery" className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-3 group text-sm md:text-base">
                                    <span className="w-0 group-hover:w-3 h-[1px] bg-[var(--color-mba-blue)] transition-all duration-300 block"></span>
                                    Gallery
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-3 group text-sm md:text-base">
                                    <span className="w-0 group-hover:w-3 h-[1px] bg-[var(--color-mba-blue)] transition-all duration-300 block"></span>
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-3 group text-sm md:text-base">
                                    <span className="w-0 group-hover:w-3 h-[1px] bg-[var(--color-mba-blue)] transition-all duration-300 block"></span>
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 2: Connect */}
                    <div className="space-y-6">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6">Social</h3>
                        <div className="flex gap-4 mb-6">
                            {[
                                { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                                { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                                { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                                { Icon: Mail, href: "mailto:info@johndumelo.com", label: "Email" }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <social.Icon size={18} />
                                </a>
                            ))}
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-white/50">For inquiries:</p>
                            <a href="mailto:info@johndumelo.com" className="text-base text-white hover:text-[var(--color-mba-blue)] transition-colors inline-block pb-1 border-b border-transparent hover:border-[var(--color-mba-blue)]">
                                info@johndumelo.com
                            </a>
                        </div>
                    </div>

                    {/* Column 3: About */}
                    <div className="space-y-6 md:col-span-2 lg:col-span-1">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6">John Dumelo</h3>
                        <p className="text-base text-white/70 leading-relaxed mb-6 font-light max-w-md">
                            Member of Parliament for Ayawaso West Wuogon, Deputy Minister of Food and Agriculture, and Award-Winning Actor. Dedicated to serving God and Country.
                        </p>
                        <Link
                            href="/about"
                            className="inline-flex items-center text-sm font-medium text-white hover:text-[var(--color-mba-blue)] transition-colors group"
                        >
                            Read Full Bio
                            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-16 md:mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/30 tracking-wide">
                    <p className="text-center md:text-left">
                        © {currentYear} John Dumelo. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
