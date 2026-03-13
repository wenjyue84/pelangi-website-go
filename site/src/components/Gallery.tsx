"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

function handleActivate(callback: () => void) {
  return {
    onClick: callback,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        callback();
      }
    },
  };
}

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const modalCloseRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openLightbox = (src: string, images: string[]) => {
    triggerRef.current = document.activeElement as HTMLElement;
    setLightboxImages(images);
    setSelectedImage(src);
  };

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
    setLightboxImages([]);
    triggerRef.current?.focus();
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    triggerRef.current?.focus();
  }, []);

  const navigateLightbox = useCallback((direction: 'prev' | 'next') => {
    setSelectedImage((prev) => {
      if (!prev || lightboxImages.length === 0) return prev;
      const currentIndex = lightboxImages.indexOf(prev);
      if (currentIndex === -1) return prev;
      const newIndex = direction === 'prev'
        ? (currentIndex - 1 + lightboxImages.length) % lightboxImages.length
        : (currentIndex + 1) % lightboxImages.length;
      return lightboxImages[newIndex];
    });
  }, [lightboxImages]);

  // Lightbox keyboard: Escape, ArrowLeft, ArrowRight
  useEffect(() => {
    if (!selectedImage) return;
    // Focus close button when lightbox opens
    lightboxCloseRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigateLightbox('prev');
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        navigateLightbox('next');
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, closeLightbox, navigateLightbox]);

  // Modal keyboard: Escape to close
  useEffect(() => {
    if (!activeModal) return;
    modalCloseRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeModal();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeModal, closeModal]);

  // Hostel photos - best shots
  const hostelPhotos = [
    { src: "/images/living-room.jpeg", alt: "Cozy common area and living room at Pelangi Capsule Hostel Johor Bahru" },
    { src: "/images/capsule-1.webp", alt: "Japanese-style capsule pod interior with privacy features at budget hostel JB" },
    { src: "/images/entrance.jpeg", alt: "Welcoming entrance of Pelangi Capsule Hostel in Taman Pelangi" },
    { src: "/images/exterior.JPG", alt: "Pelangi Capsule Hostel building exterior in Johor Bahru Malaysia" },
    { src: "/images/capsule-2.webp", alt: "Comfortable premium mattress in affordable hostel pod near Singapore" },
    { src: "/images/toilet.jpg", alt: "Clean private bathroom with hot shower at Pelangi Hostel JB" },
    { src: "/images/facility-heater.jpg", alt: "24/7 hot water heater facility at budget accommodation Johor Bahru" },
    { src: "/images/sink.jpg", alt: "Washing and sink area at Pelangi Capsule Hostel" },
    { src: "/images/capsule-3.webp", alt: "Capsule pod amenities including USB charging and ventilation" },
    { src: "/images/facility-shoes-rack.jpg", alt: "Organized shoe storage at clean hostel in Taman Pelangi JB" },
  ];

  // Guest photos - social proof
  const guestPhotos = Array.from({ length: 20 }, (_, i) => ({
    src: `/images/guests/guest-${i + 1}.jpg`,
    alt: `Happy guest enjoying their stay at Pelangi Capsule Hostel Johor Bahru - photo ${i + 1}`,
  }));

  // Tourist destinations
  const destinations = [
    { src: "/images/destinations/tioman-island.jpg", name: "Tioman Island", distance: "4 hours" },
    { src: "/images/destinations/singapore.jpg", name: "Singapore", distance: "30 min" },
    { src: "/images/destinations/jewel.jpg", name: "Jewel Changi", distance: "45 min" },
    { src: "/images/destinations/garden-by-the-bay.jpg", name: "Gardens by the Bay", distance: "1 hour" },
    { src: "/images/destinations/melaka.jpg", name: "Melaka", distance: "3 hours" },
    { src: "/images/destinations/tanjung-piai-nationa.jpg", name: "Tanjung Piai", distance: "1.5 hours" },
  ];

  const ScrollSection = ({
    title,
    subtitle,
    children,
    onSeeAll,
    id
  }: {
    title: string;
    subtitle: string;
    children: React.ReactNode;
    onSeeAll?: () => void;
    id?: string;
  }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
      if (scrollRef.current) {
        const scrollAmount = 320;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        scrollRef.current.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      }
    };

    return (
      <div id={id} className="mb-16 scroll-mt-24">
        <div className="flex items-end justify-between mb-6 px-4 md:px-0">
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-medium text-stone-900 dark:text-stone-100">{title}</h3>
            <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">{subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            {onSeeAll && (
              <button
                onClick={onSeeAll}
                className="min-h-6 inline-flex items-center text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 font-medium text-sm mr-4 cursor-pointer"
              >
                See All →
              </button>
            )}
            <button
              onClick={() => scroll('left')}
              className="w-11 h-11 rounded-full bg-white dark:bg-stone-800 shadow-md flex items-center justify-center
                       hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors cursor-pointer"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5 text-stone-600 dark:text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-11 h-11 rounded-full bg-white dark:bg-stone-800 shadow-md flex items-center justify-center
                       hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors cursor-pointer"
              aria-label="Next image"
            >
              <svg className="w-5 h-5 text-stone-600 dark:text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-4 md:px-0 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {children}
        </div>
      </div>
    );
  };

  return (
    <section id="gallery" className="section-padding bg-stone-50 dark:bg-stone-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 px-4">
          <p className="section-label">Gallery</p>
          <h2 className="section-heading mb-6">Photo Gallery</h2>
          <p className="text-stone-600 dark:text-stone-400 text-lg leading-relaxed">
            Browse through our hostel, see happy guests, and discover adventures waiting for you.
          </p>
        </div>

        {/* Section 1: Our Hostel */}
        <ScrollSection
          title="Our Hostel"
          subtitle="Capsules, facilities, and common areas"
        >
          {hostelPhotos.map((photo, index) => (
            <div
              key={index}
              role="button"
              tabIndex={0}
              aria-label={`View photo: ${photo.alt}`}
              className="shrink-0 w-72 h-48 md:w-80 md:h-56 relative rounded-2xl overflow-hidden
                       cursor-pointer group snap-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
              {...handleActivate(() => openLightbox(photo.src, hostelPhotos.map(p => p.src)))}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 288px, 320px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-stone-900/60 via-transparent to-transparent
                            opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-3 text-white opacity-0 group-hover:opacity-100 group-focus-within:opacity-100
                            transition-opacity duration-300">
                <p className="text-sm font-medium">{photo.alt}</p>
              </div>
            </div>
          ))}
        </ScrollSection>

        {/* Section 2: Happy Guests */}
        <ScrollSection
          id="community"
          title="Guest Photos"
          subtitle="Real moments from our community"
          onSeeAll={() => { triggerRef.current = document.activeElement as HTMLElement; setActiveModal('guests'); }}
        >
          {guestPhotos.slice(0, 12).map((photo, index) => (
            <div
              key={index}
              role="button"
              tabIndex={0}
              aria-label={`View guest photo ${index + 1}`}
              className="shrink-0 w-40 h-40 md:w-48 md:h-48 relative rounded-2xl overflow-hidden
                       cursor-pointer group snap-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
              {...handleActivate(() => openLightbox(photo.src, guestPhotos.map(p => p.src)))}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 160px, 192px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-colors" />
            </div>
          ))}
          {/* See more card */}
          <div
            role="button"
            tabIndex={0}
            aria-label={`View all ${guestPhotos.length} guest photos`}
            className="shrink-0 w-40 h-40 md:w-48 md:h-48 relative rounded-2xl overflow-hidden
                     cursor-pointer group snap-start bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
            {...handleActivate(() => { triggerRef.current = document.activeElement as HTMLElement; setActiveModal('guests'); })}
          >
            <div className="text-center">
              <div className="text-3xl font-display font-medium text-amber-700 dark:text-amber-400">+{guestPhotos.length - 12}</div>
              <div className="text-sm text-amber-600 dark:text-amber-400 mt-1">more photos</div>
            </div>
          </div>
        </ScrollSection>

        {/* Section 3: Explore from JB */}
        <ScrollSection
          title="Adventures Await"
          subtitle="Amazing destinations within reach"
        >
          {destinations.map((dest, index) => (
            <div
              key={index}
              role="button"
              tabIndex={0}
              aria-label={`View photo: ${dest.name}`}
              className="shrink-0 w-64 md:w-72 relative rounded-2xl overflow-hidden
                       cursor-pointer group snap-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
              {...handleActivate(() => openLightbox(dest.src, destinations.map(d => d.src)))}
            >
              <div className="relative h-44 md:h-52">
                <Image
                  src={dest.src}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 768px) 256px, 288px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-stone-900/80 via-stone-900/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h4 className="font-semibold text-lg">{dest.name}</h4>
                <p className="text-sm text-stone-300 flex items-center gap-1 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {dest.distance} from hostel
                </p>
              </div>
            </div>
          ))}
        </ScrollSection>

        {/* Video Section */}
        <div className="mt-8 px-4 md:px-0">
          <div className="text-center mb-8">
            <p className="text-xs tracking-widest uppercase text-stone-500 dark:text-stone-400 mb-2">Virtual Tour</p>
            <h3 className="font-display text-2xl font-medium text-stone-900 dark:text-stone-100">
              Watch Our Check-in Guide
            </h3>
          </div>
          <div className="relative max-w-3xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.youtube.com/embed/6Ux11oBZaQQ?cc_load_policy=1&cc_lang_pref=en"
              title="Pelangi Capsule Hostel Check-in Guide"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          role="dialog"
          aria-label="Image lightbox"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-stone-900/95 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => closeLightbox()}
        >
          <button
            ref={lightboxCloseRef}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center
                     text-white hover:bg-white/20 transition-colors cursor-pointer"
            onClick={() => closeLightbox()}
            aria-label="Close lightbox (Escape)"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {lightboxImages.length > 1 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center
                       text-white hover:bg-white/20 transition-colors cursor-pointer z-10"
              onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
              aria-label="Previous image (Left arrow)"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div className="relative w-full max-w-5xl h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage}
              alt="Pelangi Capsule Hostel Johor Bahru - Gallery photo view"
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          {lightboxImages.length > 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center
                       text-white hover:bg-white/20 transition-colors cursor-pointer z-10"
              onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
              aria-label="Next image (Right arrow)"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* All Guests Modal */}
      {activeModal === 'guests' && (
        <div
          role="dialog"
          aria-label="All guest photos"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-stone-900/95 backdrop-blur-xs overflow-y-auto"
          onClick={() => closeModal()}
        >
          <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8 sticky top-0 bg-stone-900/80 backdrop-blur-xs py-4 -mx-4 px-4">
                <div>
                  <h3 className="text-2xl font-display font-medium text-white">Guest Photos</h3>
                  <p className="text-stone-400 text-sm">{guestPhotos.length} photos from our community</p>
                </div>
                <button
                  ref={modalCloseRef}
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center
                           text-white hover:bg-white/20 transition-colors cursor-pointer"
                  onClick={() => closeModal()}
                  aria-label="Close guest photos gallery (Escape)"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3"
                onClick={(e) => e.stopPropagation()}
              >
                {guestPhotos.map((photo, index) => (
                  <div
                    key={index}
                    role="button"
                    tabIndex={0}
                    aria-label={`View guest photo ${index + 1}`}
                    className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group
                             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
                    {...handleActivate(() => {
                      closeModal();
                      openLightbox(photo.src, guestPhotos.map(p => p.src));
                    })}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/30 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
