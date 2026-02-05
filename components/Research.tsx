"use client";

import { ArrowUpRight, Network, Car, Users, Brain, Activity } from "lucide-react";

interface ResearchInterest {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
}

const interests: ResearchInterest[] = [
    {
        id: "hci",
        title: "Human-Computer Interaction (HCI)",
        description: "Exploring the interfaces between people and computers. Understanding user behavior, usability testing, and creating intuitive, efficient user interfaces.",
        icon: <Users className="w-6 h-6" />,
    },
    {
        id: "swarm",
        title: "Swarm Intelligence (SI)",
        description: "Investigating algorithms inspired by social insects (ants, bees) to solve complex optimization problems, including vehicle platooning.",
        icon: <Brain className="w-6 h-6" />,
    },
    {
        id: "vanets",
        title: "Vehicular Ad-Hoc Networks",
        description: "Researching wireless networks to improve traffic management and safety by enabling V2V and V2I communication.",
        icon: <Network className="w-6 h-6" />,
    },
    {
        id: "av-tech",
        title: "Autonomous Vehicle Technology",
        description: "Developing algorithms and systems to improve the efficiency, safety, and reliability of autonomous vehicles.",
        icon: <Car className="w-6 h-6" />,
    },
    {
        id: "ai-traffic",
        title: "AI in Traffic Management",
        description: "Applying artificial intelligence to optimize traffic flow, reduce congestion, and enhance road safety through intelligent systems.",
        icon: <Activity className="w-6 h-6" />,
    },
];

export default function Research() {
    return (
        <section id="research" className="min-h-screen py-12 md:py-24 px-6 md:px-24 bg-pbs-background">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-pbs-border pb-6">
                <h2 className="text-3xl md:text-5xl text-pbs-text-primary">Research Interests</h2>
                <span className="font-sans text-sm text-pbs-text-muted mt-4 md:mt-0 font-light">Core Areas of Investigation</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {interests.map((item) => (
                    <div
                        key={item.id}
                        className="group p-8 border border-pbs-border bg-pbs-surface hover:border-pbs-accent transition-all duration-500 hover:shadow-lg hover:shadow-pbs-accent-light flex flex-col h-full"
                    >
                        <div className="mb-6 text-pbs-accent opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                            {item.icon}
                        </div>

                        <h3 className="text-2xl text-pbs-text-primary mb-4 group-hover:text-pbs-accent transition-colors duration-300">
                            {item.title}
                        </h3>

                        <p className="font-sans text-base text-pbs-text-muted leading-relaxed flex-grow">
                            {item.description}
                        </p>

                        <div className="mt-8 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            <span className="text-xs uppercase tracking-widest text-pbs-accent flex items-center gap-2">
                                Explore Area <ArrowUpRight className="w-3 h-3" />
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-24 pt-12 border-t border-pbs-border">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <h4 className="text-2xl text-pbs-text-primary mb-2">Recent Publications</h4>
                        <p className="text-pbs-text-muted text-sm max-w-md">Selected works from 2024-2025 focusing on Swarm Intelligence and VANETs.</p>
                    </div>
                    <a href="https://scholar.google.com/citations?user=d9dE5RMAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 px-8 py-4 border border-pbs-accent text-pbs-accent hover:bg-pbs-accent hover:text-white transition-all duration-300 text-sm tracking-widest uppercase">
                        <span>Publication List</span>
                        <ArrowUpRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </section>
    );
}
