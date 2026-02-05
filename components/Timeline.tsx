interface TimelineEntry {
    year: string;
    title: string;
    description: string;
}

interface TimelineProps {
    entries: TimelineEntry[];
}

export default function Timeline({ entries }: TimelineProps) {
    return (
        <div className="relative pl-4 md:pl-0">
            {/* Vertical line - Dashed and elegant */}
            <div className="absolute left-4 md:left-[50%] top-0 bottom-0 w-px border-l-2 border-dashed border-[var(--color-mba-blue)]/30 md:-translate-x-[1px]" />

            <div className="space-y-16">
                {entries.map((entry, index) => (
                    <div
                        key={index}
                        className={`relative flex flex-col md:flex-row items-start ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                            }`}
                    >
                        {/* Dot marker with glow */}
                        <div className="absolute left-4 md:left-[50%] top-0 w-8 h-8 rounded-full border-4 border-[var(--color-mba-background)] bg-[var(--color-mba-blue)] shadow-[0_0_0_4px_rgba(115,62,36,0.1)] -translate-x-[17px] md:-translate-x-[16px] z-10 transition-transform duration-300 hover:scale-110" />

                        {/* Spacer for desktop layout */}
                        <div className="hidden md:block md:w-1/2" />

                        {/* Content Card */}
                        <div className={`pl-12 md:pl-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                            }`}>
                            <div className="group relative">
                                <div className={`text-xl font-bold text-[var(--color-mba-blue)] opacity-80 mb-2 font-mono ${index % 2 === 0 ? "md:mr-2" : "md:ml-2"
                                    }`}>
                                    {entry.year}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-mba-text-primary)] mb-4 group-hover:text-[var(--color-mba-blue)] transition-colors duration-300">
                                    {entry.title}
                                </h3>
                                <p className="text-lg text-[var(--color-mba-text-grey)] leading-relaxed">
                                    {entry.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
