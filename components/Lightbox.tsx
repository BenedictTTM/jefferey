"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
    src: string;
    alt: string;
    caption: string;
}

interface LightboxProps {
    images: GalleryImage[];
    currentIndex: number;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}

export default function Lightbox({ images, currentIndex, onClose, onNext, onPrev }: LightboxProps) {
    const currentImage = images[currentIndex];

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") onClose();
        if (e.key === "ArrowRight") onNext();
        if (e.key === "ArrowLeft") onPrev();
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={onClose}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 text-white hover:text-[var(--color-mba-blue)] transition-smooth z-10"
                aria-label="Close lightbox"
            >
                <X size={32} />
            </button>

            {/* Previous Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onPrev();
                }}
                className="absolute left-6 p-2 text-white hover:text-[var(--color-mba-blue)] transition-smooth z-10"
                aria-label="Previous image"
            >
                <ChevronLeft size={40} />
            </button>

            {/* Next Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onNext();
                }}
                className="absolute right-6 p-2 text-white hover:text-[var(--color-mba-blue)] transition-smooth z-10"
                aria-label="Next image"
            >
                <ChevronRight size={40} />
            </button>

            {/* Image Container */}
            <div
                className="relative max-w-6xl w-full h-full flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative w-full h-[80vh]">
                    <Image
                        src={currentImage.src}
                        alt={currentImage.alt}
                        fill
                        className="object-contain"
                        sizes="90vw"
                        quality={90}
                    />
                </div>

                {/* Caption */}
                <div className="mt-6 text-center">
                    <p className="text-white text-lg font-medium">{currentImage.caption}</p>
                    <p className="text-white/60 text-sm mt-2">
                        {currentIndex + 1} / {images.length}
                    </p>
                </div>
            </div>
        </div>
    );
}
