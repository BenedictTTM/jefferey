"use client";

import { motion } from "framer-motion";
import { CheckCircle, Trophy, Users, GraduationCap, Mic, Activity, Settings, Award } from "lucide-react";

export default function BioExcerpt() {
    return (
        <section className="px-6 md:px-12 pb-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
            >
                <h2 className="text-4xl md:text-5xl font-light text-white mb-2">Jeffrey Mawusi Drai</h2>
                <div className="h-1 w-24 bg-[var(--color-mba-border)] mt-4"></div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-2 relative z-10 auto-rows-[minmax(110px,auto)] max-w-4xl mx-auto">
                {[
                    {
                        title: "Advanced Research & Academic Honors",
                        desc: (
                            <>
                                A specialized bioengineering researcher and STEM advocate known for his academic record and advanced research.
                                <ul className="mt-4 space-y-2 list-none">
                                    <li className="flex items-center gap-2">
                                        <div className="min-w-1.5 h-1.5 rounded-full bg-[#FFE55C]" />
                                        <span><strong>PhD Researcher:</strong> 3D bioprinting & process engineering at York University.</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="min-w-1.5 h-1.5 rounded-full bg-[#FFE55C]" />
                                        <span><strong>NSERC Fellow:</strong> Awarded prestigious CREATE Research Fellowship (2024).</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="min-w-1.5 h-1.5 rounded-full bg-[#FFE55C]" />
                                        <span><strong>Top Scholar:</strong> 3.81/4.00 FGPA, Biomedical Engineering (Univ. of Ghana).</span>
                                    </li>
                                </ul>
                            </>
                        ),
                        icon: <GraduationCap className="w-6 h-6 text-[var(--color-mba-border)]" />,
                        className: "md:col-span-2 md:row-span-2"
                    },
                    {
                        title: "Bridge QE Africa",
                        desc: "Program Coordinator since 2019, leading initiatives for quality education and youth empowerment through mentorship.",
                        icon: <Users className="w-5 h-5 text-[#FFE55C]" />,
                        className: "md:col-span-1"
                    },
                    {
                        title: "Robotics Mentorship",
                        desc: "Mentors high school students through Umoja Robotics, guiding a team to a world championship qualification.",
                        icon: <Trophy className="w-5 h-5 text-[var(--color-mba-border)]" />,
                        className: "md:col-span-1"
                    },
                    {
                        title: "Public Speaking",
                        desc: "Decorated member of the UG Debate Society, Best Novice Speaker (2018) and national finalist.",
                        icon: <Mic className="w-5 h-5 text-[#FFE55C]" />,
                        className: "md:col-span-1",
                        visual: (
                            <div className="flex items-center -space-x-2 mt-4">
                                <div className="w-6 h-6 rounded-full bg-[#FFE55C]/20 border border-[var(--color-mba-background)]" />
                                <div className="w-6 h-6 rounded-full bg-white/20 border border-[var(--color-mba-background)]" />
                                <div className="w-6 h-6 rounded-full bg-white/10 border border-[var(--color-mba-background)]" />
                            </div>
                        )
                    },
                    {
                        title: "Bioinformatics & Data",
                        desc: "Certified in Bacterial Genomes Analysis and Data Science Math Skills from Duke University.",
                        icon: <Activity className="w-5 h-5 text-[var(--color-mba-border)]" />,
                        className: "md:col-span-1",
                        visual: (
                            <div className="mt-4 flex items-center gap-3">
                                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full w-2/3 bg-[var(--color-mba-border)] rounded-full" />
                                </div>
                            </div>
                        )
                    },
                    {
                        title: "Engineering Expertise",
                        desc: "Technical skill set includes 3D bioprinting, process engineering, and data analytics (MS Excel).",
                        icon: <Settings className="w-5 h-5 text-[#FFE55C]" />,
                        className: "md:col-span-1",
                        visual: (
                            <div className="flex items-end gap-1 mt-4 h-6">
                                <div className="w-1/4 h-1/3 bg-white/10 rounded-sm" />
                                <div className="w-1/4 h-2/3 bg-white/10 rounded-sm" />
                                <div className="w-1/4 h-1/2 bg-white/10 rounded-sm" />
                                <div className="w-1/4 h-full bg-[#FFE55C] rounded-sm" />
                            </div>
                        )
                    }
                ].map((value, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className={`bg-white/5 border border-white/5 p-5 rounded-lg hover:border-[#FFE55C]/30 transition-all duration-300 group flex flex-col justify-between ${value.className || ""}`}
                    >
                        <div>
                            <div className="w-10 h-10 flex items-center justify-center mb-3 transition-colors duration-300">
                                <div className="text-[var(--color-mba-border)] group-hover:text-white transition-colors duration-300">
                                    {value.icon}
                                </div>
                            </div>
                            <h3 className={`font-bold text-white mb-2 group-hover:text-[#FFE55C] transition-colors ${index === 0 ? "text-2xl" : "text-lg"}`}>
                                {value.title}
                            </h3>
                            <div className={`text-white/60 leading-relaxed group-hover:text-white/80 transition-colors ${index === 0 ? "text-sm" : "text-[10px] leading-tight"}`}>
                                {value.desc}
                            </div>
                        </div>

                        {value.visual && (
                            <div className="mt-2 text-white/20">
                                {value.visual}
                            </div>
                        )}

                        {/* Decorative corner for the large card */}
                        {index === 0 && (
                            <div className="hidden md:block absolute bottom-0 right-0 p-16 bg-gradient-to-tl from-[var(--color-mba-border)]/5 to-transparent rounded-tl-[80px] pointer-events-none"></div>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
