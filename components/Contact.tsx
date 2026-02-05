"use client";

export default function Contact() {
    return (
        <section id="contact" className="relative min-h-[60vh] md:min-h-[80vh] flex flex-col items-center justify-center bg-[var(--color-mba-surface)] overflow-hidden py-20 md:py-0">
            {/* Decorative Blur - Adjusted for mobile */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[var(--color-mba-blue)]/5 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-4xl px-4 md:px-6 flex flex-col items-center">
                <div className="text-center mb-12 md:mb-16 max-w-2xl">
                    <h2 className="text-3xl md:text-5xl text-[var(--color-mba-text-primary)] mb-3 md:mb-6">Inquiries</h2>
                    <p className="text-[var(--color-mba-text-grey)] font-sans font-light text-base md:text-lg px-2 max-w-sm mx-auto md:max-w-none">
                        Available for academic collaboration and select consultation.
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center space-y-8 w-full">
                    <div className="text-center w-full px-4">
                        <h3 className="text-xs md:text-sm uppercase tracking-[0.2em] text-[var(--color-mba-text-grey)]/60 mb-3 md:mb-4">Office Email</h3>
                        <a
                            href="mailto:pboakye-sekyerehene@ug.edu.gh"
                            className="text-xl sm:text-3xl md:text-4xl text-[var(--color-mba-text-primary)] hover:text-[var(--color-mba-blue)] transition-colors duration-300 border-b border-transparent hover:border-[var(--color-mba-blue)] break-all sm:break-normal py-2 inline-block"
                        >
                            pboakye-sekyerehene@ug.edu.gh
                        </a>
                    </div>
                </div>
            </div>

            <footer className="absolute bottom-6 md:bottom-8 w-full text-center">
                <p className="text-[10px] md:text-xs text-[var(--color-mba-text-grey)]/40 uppercase tracking-widest px-4">
                    © 2025 Prince Boakye-Sekyerehene
                </p>
            </footer>
        </section>
    );
}
