package data

// GalleryImage mirrors site/src/data/gallery.ts GalleryImage.
type GalleryImage struct {
	Src      string
	Alt      string
	Category string // pod | bathroom | common-area | exterior | amenity
	Width    int
	Height   int
}

// GalleryCategory is a filter tab in the gallery UI.
type GalleryCategory struct {
	ID    string
	Label string
}

// GalleryCategories are the gallery filter tabs, ported from gallery.ts.
var GalleryCategories = []GalleryCategory{
	{"all", "All Photos"},
	{"pod", "Capsule Pods"},
	{"bathroom", "Bathroom"},
	{"common-area", "Common Areas"},
	{"amenity", "Amenities"},
	{"exterior", "Exterior"},
}

// GalleryImages is the photo set, ported verbatim from gallery.ts galleryImages.
var GalleryImages = []GalleryImage{
	{"/images/capsule-4.webp", "Standard capsule pod interior with personal LED lighting and privacy sliding door at Pelangi Capsule Hostel", "pod", 1200, 800},
	{"/images/capsule-2.webp", "Premium capsule pod with comfortable mattress and adjustable lighting at Pelangi Hostel JB", "pod", 1200, 800},
	{"/images/capsule-3.webp", "Capsule pod amenities including USB charging ports and personal ventilation controls", "pod", 1200, 800},
	{"/images/capsule-1.webp", "Row of Japanese-style capsule pods with individual privacy doors at Pelangi Capsule Hostel", "pod", 1200, 800},
	{"/images/capsule-photo1.jpg", "Guest relaxing inside a capsule pod with personal climate control at Pelangi Hostel", "pod", 1200, 800},
	{"/images/toilet.jpg", "Clean shared bathroom with hot shower facilities at Pelangi Capsule Hostel", "bathroom", 1200, 800},
	{"/images/sink.jpg", "Shared washbasin area with mirror and amenities at Pelangi Capsule Hostel", "bathroom", 1200, 800},
	{"/images/living-room.jpeg", "Shared common area and lounge space for guests to socialise at Pelangi Capsule Hostel", "common-area", 1200, 800},
	{"/images/facility-1.webp", "Fully equipped shared kitchen with cooking facilities for guests at Pelangi Hostel", "common-area", 1200, 800},
	{"/images/facility-2.webp", "Shared facility area with seating for guests at Pelangi Capsule Hostel", "common-area", 1200, 800},
	{"/images/facility-3.webp", "Additional shared amenities and common spaces at Pelangi Capsule Hostel", "common-area", 1200, 800},
	{"/images/facility-heater.jpg", "Water heater for hot showers available 24/7 at Pelangi Capsule Hostel", "amenity", 1200, 800},
	{"/images/facility-shoes-rack.jpg", "Shoe storage rack at the entrance of Pelangi Capsule Hostel", "amenity", 1200, 800},
	{"/images/facilty-hair-dryer.jpg", "Hair dryer available for guest use at Pelangi Capsule Hostel", "amenity", 1200, 800},
	{"/images/exterior-1.webp", "Exterior view of Pelangi Capsule Hostel building in Taman Pelangi, Johor Bahru", "exterior", 1200, 800},
	{"/images/entrance.jpeg", "Main entrance of Pelangi Capsule Hostel with signage in Taman Pelangi JB", "exterior", 1200, 800},
}
