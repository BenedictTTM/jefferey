"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/gallery", label: "Gallery" },
        { href: "/blog", label: "Blog" },
  
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${mobileMenuOpen ? 'bg-transparent' : 'bg-[var(--color-mba-background)]/80 backdrop-blur-md border-b border-[var(--color-mba-border)]/20 shadow-sm supports-[backdrop-filter]:bg-[var(--color-mba-background)]/60'}`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex md:grid md:grid-cols-[1fr_auto_1fr] items-center justify-between h-16 sm:h-20">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-2xl md:text-3xl text-[var(--color-mba-text-primary)] hover:text-[var(--color-mba-blue)] transition-smooth font-[family-name:var(--font-mrs-saint-delafield)] font-bold tracking-tight justify-self-start z-50 relative inline-block"
                        style={{ lineHeight: 0.8, wordSpacing: '-0.1em', transform: 'skewX(-1deg)' }}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        John <span className="text-[0.65em] ml-2">M.</span> Dumelo
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8 lg:gap-16 justify-self-center">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-xs font-bold transition-smooth uppercase tracking-widest relative group ${isActive ? '' : 'text-[var(--color-mba-text-primary)]/80 text-[var(--color-mba-blue)]'}`}
                                >
                                    {link.label}
                                    <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${isActive ? 'w-full bg-[var(--color-mba-border)]' : 'w-0 group-hover:w-full bg-[var(--color-mba-blue)]'}`} />
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center justify-end gap-4 justify-self-end z-50">
                        <a
                            href="#contact"
                            className="hidden md:block px-5 py-2 lg:px-6 lg:py-2.5 text-[var(--color-mba-blue)] text-[10px] lg:text-xs font-bold uppercase tracking-widest transition-smooth shadow-md hover:shadow-lg rounded-sm border border-[var(--color-mba-blue)]/20 hover:border-transparent"
                        >
                            Contact Office
                        </a>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-[var(--color-mba-text-primary)] hover:text-[var(--color-mba-blue)] transition-smooth relative z-50"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={36} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-[var(--color-mba-background)]/90 backdrop-blur-3xl transition-all duration-500 md:hidden flex flex-col items-center justify-start pt-32 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-10'
                    }`}
            >
                {/* Decorative background element */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--color-mba-blue-glow)_0%,transparent_70%)] opacity-20" />
                </div>

                <div className="flex flex-col items-center gap-8 relative z-50 w-full px-6">
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-3xl font-light text-[var(--color-mba-text-primary)] hover:text-[var(--color-mba-blue)] transition-all duration-300 tracking-widest uppercase hover:tracking-[0.15em]"
                            style={{
                                transitionDelay: mobileMenuOpen ? `${index * 50 + 100}ms` : '0ms',
                                opacity: mobileMenuOpen ? 1 : 0,
                                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)'
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className="w-12 h-[1px] bg-[var(--color-mba-border)] my-4 opacity-50" />

                    <a
                        href="#contact"
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-8 py-3 bg-[var(--color-mba-blue)] text-white text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:shadow-[0_0_20px_var(--color-mba-blue-glow)]"
                        style={{
                            transitionDelay: mobileMenuOpen ? '300ms' : '0ms',
                            opacity: mobileMenuOpen ? 1 : 0,
                            transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)'
                        }}
                    >
                        Contact Office
                    </a>
                </div>
            </div>
        </nav>
    );
}
