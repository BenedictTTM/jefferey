'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCcw, Home } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
            <div className="space-y-6 max-w-md">
                {/* Animated Icon Container */}
                <div className="relative w-24 h-24 mx-auto mb-8">
                    <div className="absolute inset-0 bg-[var(--color-mba-blue)] opacity-20 rounded-full blur-xl animate-pulse" />
                    <div className="relative flex items-center justify-center w-full h-full border border-[var(--color-mba-border)] rounded-full bg-[var(--color-mba-surface)]">
                        <span className="text-4xl text-[var(--color-mba-blue)]">!</span>
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-4">
                    <h2 className="text-3xl font-display font-bold text-[var(--color-mba-white)]">
                        Something went wrong!
                    </h2>
                    <p className="text-[var(--color-mba-text-grey)] font-sans">
                        We apologize for the inconvenience. An unexpected error has occurred.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                    <button
                        onClick={
                            // Attempt to recover by trying to re-render the segment
                            () => reset()
                        }
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-mba-blue)] text-white font-medium transition-all hover:bg-[var(--color-mba-blue-hover)] hover:shadow-[0_0_20px_var(--color-mba-blue-glow)]"
                    >
                        <RefreshCcw size={18} />
                        <span>Try again</span>
                    </button>

                    <Link
                        href="/"
                        className="flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--color-mba-border)] text-[var(--color-mba-text-primary)] font-medium transition-all hover:bg-[var(--color-mba-surface)] hover:text-white"
                    >
                        <Home size={18} />
                        <span>Return Home</span>
                    </Link>
                </div>

                {/* Error Details (Optional - helpful for dev, maybe hide in prod or styling subtly) */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="mt-8 p-4 rounded bg-[var(--color-mba-background)] border border-red-900/30 text-left overflow-auto max-h-40">
                        <p className="text-red-400 text-xs font-mono">{error.message}</p>
                        {error.digest && <p className="text-gray-600 text-xs font-mono mt-2">Digest: {error.digest}</p>}
                    </div>
                )}
            </div>
        </div>
    );
}
