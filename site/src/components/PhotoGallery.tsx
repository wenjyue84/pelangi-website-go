"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import {
  galleryImages,
  galleryCategories,
  type GalleryCategoryId,
  type GalleryImage,
} from "@/data/gallery";

function GalleryThumbnail({
  image,
  index,
  onClick,
}: {
  image: GalleryImage;
  index: number;
  onClick: (index: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(index)}
      className="relative aspect-[4/3] rounded-xl overflow-hidden group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
      aria-label={`View photo: ${image.alt}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-colors duration-300" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg
          className="w-8 h-8 text-white drop-shadow-lg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
          />
        </svg>
      </div>
    </button>
  );
}

export default function PhotoGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<GalleryCategoryId>("all");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for lazy initialization
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const lightboxSlides = filteredImages.map((img) => ({
    src: img.src,
    alt: img.alt,
    width: img.width,
    height: img.height,
  }));

  const handleThumbnailClick = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-stone-50 dark:bg-stone-950"
      aria-labelledby="gallery-heading"
    >
      <div className="container-custom">
        <div className="text-center mb-10">
          <p className="section-label">Gallery</p>
          <h2
            id="gallery-heading"
            className="section-heading mb-4"
          >
            Explore Our Space
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl mx-auto">
            Take a closer look at our capsule pods, shared facilities, and
            everything that makes Pelangi Capsule Hostel feel like home.
          </p>
        </div>

        {/* Category filter */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-10"
          role="tablist"
          aria-label="Filter gallery by category"
        >
          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                activeCategory === cat.id
                  ? "bg-amber-600 text-white"
                  : "bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        {isVisible && (
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            role="tabpanel"
            aria-label={`${galleryCategories.find((c) => c.id === activeCategory)?.label} photos`}
          >
            {filteredImages.map((image, index) => (
              <GalleryThumbnail
                key={image.src}
                image={image}
                index={index}
                onClick={handleThumbnailClick}
              />
            ))}
          </div>
        )}

        {!isVisible && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-xl bg-stone-200 dark:bg-stone-800 animate-pulse"
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
        plugins={[Zoom, Counter]}
        animation={{ fade: 300 }}
        carousel={{ finite: true }}
        controller={{ closeOnBackdropClick: true }}
        labels={{
          Next: "Next photo",
          Previous: "Previous photo",
          Close: "Close gallery",
        }}
      />
    </section>
  );
}
