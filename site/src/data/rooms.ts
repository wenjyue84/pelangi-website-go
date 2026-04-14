/**
 * Centralized room inventory data for Pelangi Capsule Hostel.
 * Used by: StructuredData (JSON-LD), ARI endpoint (connectivity partner feed),
 * and booking components.
 */

export interface RoomType {
  id: string;
  name: string;
  description: string;
  /** Nightly rate in MYR */
  nightlyRate: number;
  /** Monthly rate in MYR (if applicable) */
  monthlyRate?: number;
  currency: "MYR";
  maxOccupancy: number;
  totalUnits: number;
  amenities: string[];
}

export const ROOM_TYPES: RoomType[] = [
  {
    id: "standard-capsule",
    name: "Standard Capsule Pod",
    description:
      "Japanese-style capsule pod with personal curtain, LED reading light, USB charging port, and personal locker.",
    nightlyRate: 35,
    monthlyRate: 594,
    currency: "MYR",
    maxOccupancy: 1,
    totalUnits: 18,
    amenities: [
      "Personal curtain",
      "LED reading light",
      "USB charging",
      "Personal locker",
      "Shared bathroom",
    ],
  },
  {
    id: "premium-capsule",
    name: "Premium Capsule Pod",
    description:
      "Larger capsule pod with enhanced privacy, personal power outlet, USB-C fast charging, and premium mattress.",
    nightlyRate: 45,
    currency: "MYR",
    maxOccupancy: 1,
    totalUnits: 6,
    amenities: [
      "Enhanced privacy screen",
      "Personal power outlet",
      "USB-C fast charging",
      "Premium mattress",
      "Personal locker",
      "Shared bathroom",
    ],
  },
];

export const PROPERTY = {
  id: "pelangi-capsule-hostel-jb",
  name: "Pelangi Capsule Hostel",
  currency: "MYR",
  timezone: "Asia/Kuala_Lumpur",
  checkinTime: "15:00",
  checkoutTime: "12:00",
  totalRooms: 24,
} as const;
