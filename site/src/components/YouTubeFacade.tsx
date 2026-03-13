"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface YouTubeFacadeProps {
    videoId: string;
    title: string;
}

const CAPTIONS_KEY = "pelangi_captions_enabled";

function getCaptionsPreference(): boolean {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem(CAPTIONS_KEY);
    return stored === null ? true : stored === "1";
}

export default function YouTubeFacade({ videoId, title }: YouTubeFacadeProps) {
    const [playing, setPlaying] = useState(false);
    const [captionsEnabled, setCaptionsEnabled] = useState(true);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- reading localStorage on mount (SSR-safe)
        setCaptionsEnabled(getCaptionsPreference());
    }, []);

    const toggleCaptions = () => {
        const next = !captionsEnabled;
        setCaptionsEnabled(next);
        localStorage.setItem(CAPTIONS_KEY, next ? "1" : "0");
    };

    if (playing) {
        const params = new URLSearchParams({
            autoplay: "1",
            cc_lang_pref: "en",
            ...(captionsEnabled ? { cc_load_policy: "1" } : {}),
        });
        return (
            <iframe
                src={`https://www.youtube.com/embed/${videoId}?${params.toString()}`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
            />
        );
    }

    return (
        <div className="absolute inset-0 w-full h-full">
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
            {/* Captions toggle */}
            <button
                type="button"
                onClick={toggleCaptions}
                aria-label={captionsEnabled ? "Disable captions" : "Enable captions"}
                aria-pressed={captionsEnabled}
                className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-stone-900/80 text-white text-xs font-medium hover:bg-stone-900 focus-visible:ring-2 focus-visible:ring-white transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M2.25 5.25a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v13.5a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V5.25Zm3 0a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V6a.75.75 0 0 0-.75-.75H5.25Zm2.25.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1-.75-.75ZM5.25 9a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V9.75A.75.75 0 0 0 5.26 9H5.25Zm2.25.75A.75.75 0 0 1 8.25 9h7.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1-.75-.75ZM5.25 12.75a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75v-.01a.75.75 0 0 0-.75-.75H5.25Zm2.25.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                </svg>
                {captionsEnabled ? "CC ON" : "CC OFF"}
            </button>
        </div>
    );
}
