"use client";

import { useState } from "react";
import Image from "next/image";

interface YouTubeFacadeProps {
    videoId: string;
    title: string;
}

export default function YouTubeFacade({ videoId, title }: YouTubeFacadeProps) {
    const [playing, setPlaying] = useState(false);

    if (playing) {
        return (
            <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
            />
        );
    }

    return (
        <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
            className="absolute inset-0 w-full h-full cursor-pointer group"
        >
            <Image
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                loading="eager"
                className="object-cover"
            />
            {/* Play button overlay */}
            <span
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center"
            >
                <span className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:bg-red-700 group-focus-visible:ring-4 group-focus-visible:ring-white transition-colors">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="white"
                        className="w-8 h-8 md:w-10 md:h-10 ml-1"
                    >
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </span>
            </span>
        </button>
    );
}
