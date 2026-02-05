"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail, Code, Terminal, Hexagon } from "lucide-react";

export default function SplitHero() {
    return (
        <div className="relative w-full min-h-screen bg-[#E5E5E5] flex flex-col lg:block overflow-hidden">

            {/* --- Left Content (Gray Area) --- */}
            <div className="relative z-10 w-full lg:w-[50%] min-h-screen flex flex-col p-8 lg:p-16">

                {/* Logo */}
                <div className="flex-none mb-12 lg:mb-0">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 border-2 border-black flex items-center justify-center font-bold text-xl relative overflow-hidden transition-all duration-300 group-hover:bg-black group-hover:text-white">
                            <span className="relative z-10">TS</span>
                        </div>
                    </Link>
                </div>

                {/* Main Text */}
                <div className="flex-1 flex flex-col justify-center gap-4 max-w-lg">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-600 uppercase tracking-wider">
                        Hi, I am
                    </h2>
                    <h1 className="text-5xl md:text-7xl font-bold text-black tracking-tight leading-none">
                        Tomasz Gajda
                    </h1>
                    <p className="text-base md:text-lg text-gray-500 font-medium">
                        Front-end Developer / UI Designer
                    </p>

                    {/* Social Icons */}
                    <div className="flex gap-4 mt-8">
                        <a href="#" className="w-12 h-12 bg-[#C4C4C4] hover:bg-black hover:text-white transition-all duration-300 rounded flex items-center justify-center shadow-lg text-gray-700">
                            <Mail size={24} />
                        </a>
                        <a href="#" className="w-12 h-12 bg-[#C4C4C4] hover:bg-black hover:text-white transition-all duration-300 rounded flex items-center justify-center shadow-lg text-gray-700">
                            <Github size={24} />
                        </a>
                        <a href="#" className="w-12 h-12 bg-[#C4C4C4] hover:bg-black hover:text-white transition-all duration-300 rounded flex items-center justify-center shadow-lg text-gray-700">
                            <Linkedin size={24} />
                        </a>
                    </div>
                </div>
            </div>

            {/* --- Right Content (Black Area) --- */}
            <div
                className="relative lg:absolute top-0 right-0 w-full lg:w-[60%] h-[80vh] lg:h-full bg-black text-white flex flex-col"
                style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 15% 100%)", // Mobile fallback if needed, usually simplistic
                }}
            // Override clip-path for larger screens via className or style check
            >
                <style jsx>{`
            @media (min-width: 1024px) {
                div.relative.lg\\:absolute {
                    clip-path: polygon(0% 0, 100% 0, 100% 100%, 15% 100%) !important;
                }
            }
            @media (max-width: 1023px) {
                 div.relative.lg\\:absolute {
                    clip-path: none !important;
                }
            }
        `}</style>

                {/* Navigation - Absolute Top */}
                <nav className="absolute top-0 right-0 w-full p-8 lg:p-12 flex justify-end items-center gap-8 md:gap-12 z-50">
                    <div className="hidden md:flex gap-8 text-sm font-medium tracking-widest uppercase text-gray-300">
                        <Link href="#about" className="hover:text-white transition-colors">About me</Link>
                        <Link href="#skills" className="hover:text-white transition-colors">Skills</Link>
                        <Link href="/gallery" className="hover:text-white transition-colors">Portfolio</Link>
                    </div>

                    <Link href="#contact" className="px-6 py-2 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-gray-200 transition-colors">
                        Contact Me
                    </Link>
                </nav>

                {/* Content/Image Area */}
                <div className="flex-1 flex items-end justify-center pb-0 relative">
                    {/* Person Image */}
                    <div className="relative w-[300px] md:w-[450px] lg:w-[500px] h-[350px] md:h-[600px] lg:h-[75%] lg:absolute lg:bottom-0 lg:right-[5%]">
                        <Image
                            src="/dry.png"
                            alt="Profile"
                            fill
                            className="object-cover object-top  "
                            priority
                        />
                    </div>
                </div>
            </div>

        </div>
    );
}
