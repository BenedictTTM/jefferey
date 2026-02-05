'use client';

import { useEffect } from 'react';
import { RefreshCcw } from 'lucide-react';
import './globals.css'; // Import globals to ensure vars are available if layout fails completely

// Global error must include html and body tags
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html lang="en">
            <body className="bg-[#0F1115] text-[#F2F0EF] font-sans min-h-screen flex items-center justify-center">
                <div className="p-8 text-center max-w-lg mx-auto">
                    <div className="mb-8 relative inline-block">
                        <div className="absolute inset-0 bg-[#733E24] opacity-20 rounded-full blur-xl" />
                        <div className="relative w-20 h-20 flex items-center justify-center rounded-full border border-[#245F73] bg-[#181A1F] mx-auto">
                            <span className="text-3xl text-[#733E24]">!</span>
                        </div>
                    </div>

                    <h2 className="text-4xl font-bold mb-4 text-white">Critical Error</h2>
                    <p className="text-[#BBBDBC] mb-8">
                        A critical system error prevented the application from loading.
                    </p>

                    <button
                        onClick={() => reset()}
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#733E24] text-white font-medium hover:bg-[#245F73] transition-colors"
                    >
                        <RefreshCcw size={18} />
                        <span>Reload Application</span>
                    </button>
                </div>
            </body>
        </html>
    );
}
