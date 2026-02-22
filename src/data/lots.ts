export type LotStatus = "available" | "sold" | "reserved";

export interface Lot {
  id: string;
  lotNumber: string;
  coordinates: string; // SVG polygon points "x1,y1 x2,y2 x3,y3..."
  status: LotStatus;
  acres: string;
  price?: string;
  features: string[];
  description: string;
}

// Coordinates: percentages (0-100) relative to full image dimensions
// Traced from Site-development-plan-before-forest-conservation-plan.png

export const crestviewLots: Lot[] = [
  // === Traced with coordinate picker ===
  {
    id: "lot-3",
    lotNumber: "3",
    coordinates: "73.5,70.1 79,71.6 77.5,78 70.4,78",
    status: "available",
    acres: "4.5",
    price: "$388,000",
    features: ["Near entrance", "Easy commute"],
    description: "Standard lot near the south entrance.",
  },
  {
    id: "lot-4",
    lotNumber: "4",
    coordinates: "70.3,68.8 73.6,70.1 70.3,78 63,78",
    status: "available",
    acres: "4.8",
    price: "$405,000",
    features: ["Wooded lot", "Stream nearby"],
    description: "Beautifully wooded lot with seasonal stream.",
  },
  {
    id: "lot-5",
    lotNumber: "5",
    coordinates: "67.6,67.3 70.3,68.9 62.8,78 58.3,78.1 58.5,73.7",
    status: "reserved",
    acres: "3.8",
    price: "$352,000",
    features: ["Near amenities", "Easy access"],
    description: "Lot near community amenities with easy road access.",
  },
  {
    id: "lot-6",
    lotNumber: "6",
    coordinates: "62.8,70.7 60.2,61 63.9,59.9 66.4,65.2 67.6,67.1",
    status: "available",
    acres: "4.2",
    price: "$375,000",
    features: ["Mature trees", "Stream adjacent"],
    description: "Beautiful lot with mature trees.",
  },
  {
    id: "lot-7",
    lotNumber: "7",
    coordinates: "59.3,61.2 60.1,61 62.6,70.7 58.6,73.4 55.4,72.1",
    status: "available",
    acres: "3.8",
    price: "$348,000",
    features: ["Compact lot", "Low maintenance"],
    description: "Ideal compact lot for less maintenance.",
  },
  {
    id: "lot-8",
    lotNumber: "8",
    coordinates: "58.9,62 57.5,61.9 49,68.5 51.3,70.5 55.4,72.2",
    status: "available",
    acres: "4.0",
    price: "$362,000",
    features: ["Park views", "Family friendly"],
    description: "Family-friendly lot with park views.",
  },
  {
    id: "lot-9",
    lotNumber: "9",
    coordinates: "57.7,61.9 57.3,61.2 46.9,62.5 46.9,66.2 49.1,68.4",
    status: "available",
    acres: "4.1",
    price: "$365,000",
    features: ["Trail access", "Natural setting"],
    description: "Direct trail access with beautiful surroundings.",
  },
  {
    id: "lot-10",
    lotNumber: "10",
    coordinates: "57.5,60 57.4,61.2 46.7,62.5 46.9,60.3 45.8,55.8",
    status: "available",
    acres: "3.9",
    price: "$358,000",
    features: ["Quiet location", "Wooded buffer"],
    description: "Tucked away lot with natural wooded buffer.",
  },
  {
    id: "lot-11",
    lotNumber: "11",
    coordinates: "57.4,60.3 58.6,60 53.7,53.6 45.3,53 45.7,55.6",
    status: "reserved",
    acres: "4.2",
    price: "$382,000",
    features: ["Open meadow", "Easy build"],
    description: "Reserved lot with open meadow.",
  },
  {
    id: "lot-12",
    lotNumber: "12",
    coordinates: "59.3,60.3 63.5,59 62.2,53.6 53.8,53.4",
    status: "available",
    acres: "4.0",
    price: "$368,000",
    features: ["Central access", "Community views"],
    description: "Central lot with views of community green spaces.",
  },
];

export const getLotsByStatus = (lots: Lot[], status: LotStatus): Lot[] => {
  return lots.filter((lot) => lot.status === status);
};

export const getStatusColor = (status: LotStatus): string => {
  switch (status) {
    case "available":
      return "#2563eb"; // blue-600
    case "sold":
      return "#9ca3af"; // gray-400
    case "reserved":
      return "#9b7339"; // accent / earthy gold
    default:
      return "#2563eb";
  }
};

export const getStatusLabel = (status: LotStatus): string => {
  switch (status) {
    case "available":
      return "Available";
    case "sold":
      return "Sold";
    case "reserved":
      return "Reserved";
    default:
      return status;
  }
};
