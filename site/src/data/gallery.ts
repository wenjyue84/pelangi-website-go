export interface GalleryImage {
  src: string;
  alt: string;
  category: "pod" | "bathroom" | "common-area" | "exterior" | "amenity";
  width: number;
  height: number;
}

export const galleryCategories = [
  { id: "all", label: "All Photos" },
  { id: "pod", label: "Capsule Pods" },
  { id: "bathroom", label: "Bathroom" },
  { id: "common-area", label: "Common Areas" },
  { id: "amenity", label: "Amenities" },
  { id: "exterior", label: "Exterior" },
] as const;

export type GalleryCategoryId = (typeof galleryCategories)[number]["id"];

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/capsule-4.webp",
    alt: "Standard capsule pod interior with personal LED lighting and privacy sliding door at Pelangi Capsule Hostel",
    category: "pod",
    width: 1200,
    height: 800,
  },
  {
    src: "/images/capsule-2.webp",
    alt: "Premium capsule pod with comfortable mattress and adjustable lighting at Pelangi Hostel JB",
    category: "pod",
    width: 1200,
    height: 800,
  },
  {
    src: "/images/capsule-3.webp",
    alt: "Capsule pod amenities including USB charging ports and personal ventilation controls",
    category: "pod",
    width: 1200,
    height: 800,
  },
  {
    src: "/images/capsule-1.webp",
    alt: "Row of Japanese-style capsule pods with individual privacy doors at Pelangi Capsule Hostel",
    category: "pod",
    width: 1200,
    height: 800,
  },
  {
    src: "/images/capsule-photo1.jpg",
    alt: "Guest relaxing inside a capsule pod with personal climate control at Pelangi Hostel",
    category: "pod",
    width: 1200,
    height: 800,
  },
  {
    src: "/images/toilet.jpg",
    alt: "Clean shared bathroom with hot shower facilities at Pelangi Capsule Hostel",
    category: "bathroom",
    width: 1200,
    height: 800,
  },
  {
    src: "/images/sink.jpg",
    alt: "Shared washbasin area with mirror and amenities at Pelangi Capsule Hostel",
    category: "bathroom",
    width: 1200,
    height: 800,
  },
  {
    src: "/images/living-room.jpeg",
    alt: "Shared common area and lounge space for guests to socialise at Pelangi Capsule Hostel",
    category: "common-area",
    width: 1200,
    height: 800,
  },
  {
    src: "/images/facility-1.webp",
    alt: "Fully equipped shared kitchen with cooking facilities for guests at Pelangi Hostel",
    category: "common-area",
    width: 1200,
    height: 800,
  },
  {
    src: "/images/facility-2.webp",
    alt: "Shared facility area with seating for guests at Pelangi Capsule Hostel",
    category: "common-area",
    width: 1200,
    height: 800,
  },
  {
    src: "/images/facility-3.webp",
    alt: "Additional shared amenities and common spaces at Pelangi Capsule Hostel",
    category: "common-area",
    width: 1200,
    height: 800,
  },
  {
    src: "/images/facility-heater.jpg",
    alt: "Water heater for hot showers available 24/7 at Pelangi Capsule Hostel",
    category: "amenity",
    width: 1200,
    height: 800,
  },
  {
    src: "/images/facility-shoes-rack.jpg",
    alt: "Shoe storage rack at the entrance of Pelangi Capsule Hostel",
    category: "amenity",
    width: 1200,
    height: 800,
  },
  {
    src: "/images/facilty-hair-dryer.jpg",
    alt: "Hair dryer available for guest use at Pelangi Capsule Hostel",
    category: "amenity",
    width: 1200,
    height: 800,
  },
  {
    src: "/images/exterior-1.webp",
    alt: "Exterior view of Pelangi Capsule Hostel building in Taman Pelangi, Johor Bahru",
    category: "exterior",
    width: 1200,
    height: 800,
  },
  {
    src: "/images/entrance.jpeg",
    alt: "Main entrance of Pelangi Capsule Hostel with signage in Taman Pelangi JB",
    category: "exterior",
    width: 1200,
    height: 800,
  },
];
