"use client";

import Link from "next/link";

export default function TopBar() {
    const navItems = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/about#contact" },
        { label: "Articles", href: "/blog" },
    ];

    return (
        <nav className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center bg-white/90 backdrop-blur-md rounded-full px-6 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-white/40">
                <ul className="flex items-center gap-3">
                    {navItems.map((item, index) => (
                        <li key={item.label} className="flex items-center">
                            {index > 0 && (
                                <span className="h-4 w-[1px] bg-gray-300 mr-3" aria-hidden="true" />
                            )}
                            <Link
                                href={item.href}
                                className="text-sm font-bold uppercase tracking-widest text-[var(--color-mba-text-primary)] hover:text-[var(--color-mba-gold)] transition-colors duration-300 font-sans whitespace-nowrap"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
