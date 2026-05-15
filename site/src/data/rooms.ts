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
    id: "lower-deck-pod",
    name: "Lower Deck Pod",
    description:
      "Ground-level capsule pod — easy access, no ladder required. Japanese-style with LED reading light, USB charging port, and personal locker.",
    nightlyRate: 45,
    monthlyRate: 594,
    currency: "MYR",
    maxOccupancy: 1,
    totalUnits: 18,
    amenities: [
      "Ground-level access",
      "LED reading light",
      "USB charging",
      "Personal locker",
      "Shared bathroom",
    ],
  },
  {
    id: "upper-deck-pod",
    name: "Upper Deck Pod",
    description:
      "Elevated capsule pod on the upper bunk — more privacy and less foot traffic. Same Japanese-style comfort with LED reading light, USB charging port, and personal locker.",
    nightlyRate: 35,
    currency: "MYR",
    maxOccupancy: 1,
    totalUnits: 6,
    amenities: [
      "Elevated upper bunk position",
      "LED reading light",
      "USB charging",
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
