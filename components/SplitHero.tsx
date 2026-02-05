"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowRight, Activity, Dna, FlaskConical } from "lucide-react"; // Added biomed icons
import { motion } from "framer-motion";

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

    return (
        <div className="relative w-full min-h-screen flex flex-col lg:flex-row overflow-hidden bg-[#F0F2F5]">

            {/* --- Left Content (Info) --- */}
            <motion.div
                className="w-full lg:w-[45%] xl:w-[50%] relative z-20 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 lg:py-0"
                initial="hidden"
                animate="visible"
                viewport={{ once: true }}
                variants={containerVariants}
            >
                {/* Decorative Background Elements on Left */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                    <div className="absolute top-10 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-32 left-20 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
                </div>

                {/* Header / Logo Area */}
                <motion.div variants={itemVariants} className="absolute top-8 left-8 lg:top-12 lg:left-12 flex items-center gap-2">
                    <span className="font-bold text-xl tracking-tighter text-gray-900 border-2 border-gray-900 w-12 h-12 flex items-center justify-center">JD</span>
                </motion.div>

                {/* Main Text Content */}
                <div className="relative z-10 flex flex-col gap-6">
                    <motion.div variants={itemVariants} className="flex items-center gap-3">

                        <span className="h-px w-10 bg-gray-400"></span>
                        <span className="text-gray-500 font-medium uppercase text-xs tracking-widest">
                            Est. 2026
                        </span>
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl xl:text-8xl font-black text-gray-900 leading-[0.9] tracking-tighter">
                        Jeffrey <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                            M. Drai
                        </span>
                    </motion.h1>

                    <motion.div variants={itemVariants} className="flex flex-col gap-2 mt-2">
                        <h2 className="text-xl md:text-2xl font-medium text-gray-600 flex items-center gap-3">
                            <Dna className="text-blue-600" size={24} />
                            Biomedical Engineer
                        </h2>
                        <h2 className="text-xl md:text-2xl font-medium text-gray-600 flex items-center gap-3">
                            <Activity className="text-emerald-600" size={24} />
                            STEM Researcher
                        </h2>
                    </motion.div>

                    <motion.p variants={itemVariants} className="max-w-md text-gray-600 text-base md:text-base leading-relaxed mt-4 border-l-2 border-gray-300 pl-4">
                        Bridging the gap between biological systems and engineering solutions.
                        Dedicated to advancing healthcare technology through innovative research.
                    </motion.p>

                    {/* CTA & Socials */}
                    <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6 mt-8">
                        <Link href="#contact" className="group relative px-8 py-3 bg-gray-900 text-white font-semibold rounded-none overflow-hidden hover:pr-10 transition-all duration-300">
                            <span className="relative z-10 flex items-center gap-2">
                                Start a Conversation <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                            </span>
                            <div className="absolute inset-0 bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                        </Link>

                        <div className="flex gap-4">
                            {[
                                { Icon: Github, href: "#" },
                                { Icon: Linkedin, href: "#" },
                                { Icon: Mail, href: "#" }
                            ].map(({ Icon, href }, index) => (
                                <a
                                    key={index}
                                    href={href}
                                    className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* --- Right Content (Image & Visuals) --- */}
            <div className="relative w-full lg:w-[55%] xl:w-[50%] overflow-hidden min-h-[500px] lg:min-h-screen">




                {/* Navigation (Desktop) */}
                <nav className="absolute top-0 right-0 w-full p-8 lg:p-12 hidden lg:flex justify-center gap-8 z-30">
                    {["About Me", "Skills", "Research", "Portfolio"].map((item) => (
                        <Link key={item} href={`#${item.toLowerCase().replace(" ", "")}`} className="text-gray-500 hover:text-gray-900 text-xs font-bold uppercase tracking-widest transition-colors relative group">
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                </nav>

                {/* Image Container with Diagonal Slice Effect */}
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: [0, -20, 0] // Floating animation
                        }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut",
                            y: {
                                duration: 10,
                                repeat: Infinity,
                                ease: "easeInOut",
                                repeatType: "mirror"
                            }
                        }}
                        className="relative w-[260px] h-[350px] md:w-[300px] md:h-[400px] lg:w-[340px] lg:h-[440px] flex items-center justify-center mt-20"
                    >
                        {/* Glowing backdrop behind image */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-amber-500/20 blur-[60px] rounded-full"></div>

                        <Image
                            src="/dry.png"
                            alt="Jeffrey Mawusi Drai - Biomedical Engineer"
                            fill
                            className="object-cover rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.3)] border border-white/10"
                            priority
                            sizes="(max-width: 768px) 100vw, 400px"
                        />


                    </motion.div>
                </div>
            </div>
        </div>
    );
}
