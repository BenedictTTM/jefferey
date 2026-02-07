"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowRight, Activity, Dna } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import TopBar from "./TopBar";

export default function SplitHero() {
    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
            },
        },
    };


    // 3D Tilt Logic
    const initialX = -0.3; // Corresponds to ~ -15deg rotateY
    const initialY = -0.125; // Corresponds to ~ 5deg rotateX

    const x = useMotionValue(initialX);
    const y = useMotionValue(initialY);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [20, -20]); // Increased range
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-25, 25]); // Increased range

    // Shine effect
    const shineX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const shineY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;

        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    }

    function handleMouseLeave() {
        x.set(initialX);
        y.set(initialY);
    }


    return (
        <div className="relative w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-[var(--color-mba-background)] text-[var(--color-mba-text-primary)]">

            {/* --- Background Image & Effects --- */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                {/* Tech Grid Overlay (Subtle) - Adapted for Light Mode */}
                <div className="absolute inset-0 z-0 opacity-[0.03]">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px)] bg-[size:60px_100%]"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:100%_60px]"></div>
                </div>

                {/* Clean vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/80"></div>
            </div>

            {/* --- Left Content (Info) --- */}
            <motion.div
                className="relative z-10 flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24 lg:py-32 order-2 lg:order-1"
                initial="hidden"
                animate="visible"
                viewport={{ once: true }}
                variants={containerVariants}
            >
                {/* Header / Logo Area */}
                <motion.div variants={itemVariants} className="absolute top-32 left-8 lg:top-12 lg:left-12 flex items-center gap-4 hidden lg:flex">
                    {/* Hidden on mobile to avoid clash with nav */}
                </motion.div>

                {/* Main Text Content */}
                <div className="flex flex-col gap-6 md:gap-8 mt-8 lg:mt-0 text-center lg:text-left items-center lg:items-start">
                    <motion.h1 variants={itemVariants} className="font-serif font-bold leading-[1.1] tracking-tight text-[var(--color-mba-text-primary)]">
                        <span className="block text-5xl md:text-7xl xl:text-8xl">Jeffrey</span>
                        <span className="block text-5xl md:text-7xl xl:text-8xl text-[var(--color-mba-text-primary)]">
                            M. Drai
                        </span>
                    </motion.h1>

                    <motion.div variants={itemVariants} className="flex flex-col gap-2 md:gap-3 font-sans items-center lg:items-start">
                        <h2 className="text-lg md:text-2xl font-semibold text-[var(--color-mba-gold)] flex items-center gap-2 md:gap-3 uppercase tracking-wider">
                            <Dna className="text-[var(--color-mba-gold)]" size={20} />
                            Biomedical Engineer
                        </h2>
                        <h2 className="text-lg md:text-2xl font-semibold text-[var(--color-mba-gold)] flex items-center gap-2 md:gap-3 uppercase tracking-wider">
                            <Activity className="text-[var(--color-mba-gold)]" size={20} />
                            STEM Researcher
                        </h2>
                    </motion.div>

                    <motion.p variants={itemVariants} className="max-w-xl lg:max-w-2xl text-[var(--color-mba-text-grey)] text-base md:text-lg leading-relaxed border-l-0 lg:border-l-[3px] border-[var(--color-mba-gold)] pl-0 lg:pl-6 font-medium font-sans text-center lg:text-left">
                        Bridging the gap between biological systems and engineering solutions.
                        Dedicated to advancing healthcare technology through innovative research.
                    </motion.p>

                    {/* CTA & Socials */}
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-6 mt-4 md:mt-6 w-full justify-center lg:justify-start">
                        <Link href="#contact" className="group relative px-6 md:px-8 py-4 bg-[var(--color-mba-navy)] text-white font-bold rounded-lg overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto text-center">
                            <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
                                Start a Conversation <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                            </span>
                        </Link>

                        <div className="flex gap-4">
                            {[Github, Linkedin, Mail].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="w-12 h-12 border border-[var(--color-mba-gold)] rounded-full flex items-center justify-center text-[var(--color-mba-gold)] hover:bg-[var(--color-mba-gold)] hover:text-white transition-all duration-300"
                                >
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* --- Right Content (Interactive Slanted Card) --- */}
            <div className="relative w-full h-[500px] sm:h-[600px] lg:h-auto flex items-center justify-center perspective-[1200px] order-1 lg:order-2 pt-24 lg:pt-0"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >

                {/* 3D Container - Action Figure Box */}
                <motion.div
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                    }}
                    initial={{ scale: 0.9, rotateY: -15, rotateX: 5 }} // Default slanted position
                    animate={{ scale: 1 }}
                    className="relative w-[300px] h-[460px] md:w-[400px] md:h-[600px] cursor-pointer"
                >
                    {/* --- THE CARD AESTHETIC (Blister Pack - Light Version) --- */}

                    {/* The "Bubble" / Main Card */}
                    <div className="absolute inset-0 rounded-[2rem] md:rounded-[2.5rem] border border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-[0_20px_50px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] z-10 flex items-center justify-center overflow-hidden">

                        {/* Card Label / Branding Top */}
                        <div className="absolute top-4 md:top-6 left-0 w-full flex flex-col items-center z-20">
                            <h3 className="font-sans font-black text-xl md:text-2xl tracking-[0.2em] text-[var(--color-mba-text-primary)] opacity-80 uppercase">STEM PRO</h3>
                            <span className="text-[9px] md:text-[10px] tracking-widest text-[var(--color-mba-gold)] font-bold uppercase mt-1">Action Figure Series</span>
                        </div>


                        {/* Plastic Shine/Reflection (Dynamic) */}
                        <motion.div
                            style={{
                                background: `radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.8) 0%, transparent 60%)`
                            }}
                            className="absolute inset-0 opacity-60 pointer-events-none mix-blend-soft-light z-30"
                        />

                        {/* Checkered Floor/Platform inside bubble (lighter) */}
                        <div className="absolute bottom-0 w-full h-12 md:h-16 bg-gray-100/50 skew-x-12 opacity-80 border-t border-gray-100"></div>

                        {/* The Action Figure (Image) */}
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="relative w-full h-full flex items-end justify-center pb-6 md:pb-8"
                        >
                            <Image
                                src="/dry.png"
                                alt="Jeffrey Mawusi Drai Figure"
                                width={500}
                                height={800}
                                className="object-contain h-[80%] md:h-[85%] w-auto drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)] z-20"
                                priority
                            />
                        </motion.div>
                        {/* Card Label / Branding Bottom */}
                        <div className="absolute bottom-6 md:bottom-8 left-0 w-full flex flex-col items-center z-20">
                            <div className="bg-[var(--color-mba-gold)] text-white px-3 py-1 md:px-4 md:py-1 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase shadow-md">
                                Jeffrey M. Drai
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
