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

// Coordinates traced from Gemini color-coded lot map
// Percentages (0-100) relative to full image dimensions

export const crestviewLots: Lot[] = [
  // === ROW 1 - TOP ===
  {
    id: "lot-19",
    lotNumber: "19",
    coordinates: "14.5,13.8 33.5,14.5 34.5,27.5 26.0,27.5 24.5,33.5 13.0,31.0",
    status: "sold",
    acres: "5.2",
    price: "$425,000",
    features: ["Corner lot", "Mature oak trees", "Creek frontage"],
    description: "Large irregular lot containing a forest cluster and specimen tree.",
  },
  {
    id: "lot-35",
    lotNumber: "35",
    coordinates: "64,4 72,3 73,9 65,10",
    status: "available",
    acres: "4.1",
    price: "$375,000",
    features: ["Hill country views", "Minimal clearing needed"],
    description: "Gently sloped lot with panoramic Hill Country views.",
  },
  {
    id: "lot-34",
    lotNumber: "34",
    coordinates: "72,3 80,2 81,8 73,9",
    status: "available",
    acres: "3.8",
    price: "$355,000",
    features: ["Level building site", "Road frontage"],
    description: "Well-positioned lot with easy access and level terrain.",
  },
  {
    id: "lot-33",
    lotNumber: "33",
    coordinates: "80,6 88,5 90,14 82,15",
    status: "reserved",
    acres: "4.5",
    price: "$395,000",
    features: ["Premium location", "Open meadow"],
    description: "Reserved lot featuring open meadow perfect for estate home.",
  },
  {
    id: "lot-32",
    lotNumber: "32",
    coordinates: "88,14 96,12 97,24 90,25",
    status: "available",
    acres: "5.8",
    price: "$445,000",
    features: ["Largest lot available", "Wildlife corridor adjacent"],
    description: "Exceptional 5.8-acre lot bordering protected wildlife corridor.",
  },

  // === ROW 2 ===
  {
    id: "lot-17",
    lotNumber: "17",
    coordinates: "36,18 44,16 47,24 40,27 35,25",
    status: "sold",
    acres: "4.0",
    price: "$368,000",
    features: ["Wooded lot", "Privacy"],
    description: "Private wooded lot with natural buffer from neighbors.",
  },
  {
    id: "lot-20",
    lotNumber: "20",
    coordinates: "56,12 65,10 68,18 60,21",
    status: "sold",
    acres: "4.2",
    price: "$380,000",
    features: ["Central location", "Community trail access"],
    description: "Centrally located with direct access to the community trail system.",
  },
  {
    id: "lot-21",
    lotNumber: "21",
    coordinates: "65,18 75,15 78,24 70,27",
    status: "available",
    acres: "3.9",
    price: "$365,000",
    features: ["Wooded privacy", "Gentle slope"],
    description: "Wooded lot offering natural privacy with gentle slope.",
  },
  {
    id: "lot-23",
    lotNumber: "23",
    coordinates: "82,15 90,14 92,24 84,26",
    status: "reserved",
    acres: "4.8",
    price: "$410,000",
    features: ["Road frontage", "Easy utilities access"],
    description: "Convenient lot with excellent road frontage.",
  },
  {
    id: "lot-24",
    lotNumber: "24",
    coordinates: "90,24 97,22 98,34 92,35",
    status: "sold",
    acres: "5.1",
    price: "$430,000",
    features: ["Premium corner", "Views"],
    description: "Premium corner lot with stunning views.",
  },

  // === ROW 3 ===
  {
    id: "lot-14",
    lotNumber: "14",
    coordinates: "40,27 50,24 53,32 45,35",
    status: "available",
    acres: "4.3",
    price: "$378,000",
    features: ["Central location", "Easy access"],
    description: "Well-positioned central lot with convenient access.",
  },
  {
    id: "lot-15",
    lotNumber: "15",
    coordinates: "42.8,48.5 52.0,48.5 51.8,54.0 42.5,54.5",
    status: "available",
    acres: "4.4",
    price: "$385,000",
    features: ["Park adjacent", "Level terrain"],
    description: "Central rectangular lot bordering the western stream buffer.",
  },
  {
    id: "lot-22",
    lotNumber: "22",
    coordinates: "59.2,33.5 66.5,39.5 61.5,43.5 55.0,39.0",
    status: "available",
    acres: "4.0",
    price: "$370,000",
    features: ["Established trees", "Quiet location"],
    description: "Angled wedge lot in the upper eastern cul-de-sac.",
  },
  {
    id: "lot-25",
    lotNumber: "25",
    coordinates: "83,33 92,30 94,40 86,42",
    status: "available",
    acres: "4.5",
    price: "$392,000",
    features: ["Corner lot", "Double frontage"],
    description: "Corner lot with double road frontage.",
  },

  // === ROW 4 ===
  {
    id: "lot-16",
    lotNumber: "16",
    coordinates: "45,35 55,32 58,42 50,45",
    status: "available",
    acres: "3.7",
    price: "$345,000",
    features: ["Affordable option", "Good sun exposure"],
    description: "Well-priced lot with excellent southern exposure.",
  },
  {
    id: "lot-26",
    lotNumber: "26",
    coordinates: "75,36 84,33 87,42 79,45",
    status: "available",
    acres: "4.3",
    price: "$378,000",
    features: ["Scenic views", "Natural landscaping"],
    description: "Scenic lot with preserved native vegetation.",
  },
  {
    id: "lot-27",
    lotNumber: "27",
    coordinates: "70,42 79,39 82,48 74,51",
    status: "sold",
    acres: "4.6",
    price: "$398,000",
    features: ["Creek views", "Wildlife watching"],
    description: "Sold lot overlooking seasonal creek.",
  },
  {
    id: "lot-28",
    lotNumber: "28",
    coordinates: "82,42 91,38 93,48 85,51",
    status: "available",
    acres: "4.1",
    price: "$372,000",
    features: ["Central community", "Trail network"],
    description: "Heart of the community with trail access.",
  },

  // === ROW 5 ===
  {
    id: "lot-11",
    lotNumber: "11",
    coordinates: "55,40 65,36 68,45 60,49",
    status: "reserved",
    acres: "4.2",
    price: "$382,000",
    features: ["Open meadow", "Easy build"],
    description: "Reserved lot with open meadow.",
  },
  {
    id: "lot-29",
    lotNumber: "29",
    coordinates: "85,48 93,45 95,55 88,57",
    status: "available",
    acres: "4.4",
    price: "$385,000",
    features: ["Wooded buffer", "Quiet setting"],
    description: "Secluded lot with natural wooded buffer.",
  },
  {
    id: "lot-30",
    lotNumber: "30",
    coordinates: "80,55 88,52 91,62 84,64",
    status: "available",
    acres: "5.0",
    price: "$415,000",
    features: ["Open space adjacent", "Premium location"],
    description: "Premium lot adjacent to designated open space.",
  },

  // === ROW 6 ===
  {
    id: "lot-10",
    lotNumber: "10",
    coordinates: "52,48 62,44 65,53 57,56",
    status: "available",
    acres: "3.9",
    price: "$358,000",
    features: ["Quiet location", "Wooded buffer"],
    description: "Tucked away lot with natural wooded buffer.",
  },
  {
    id: "lot-12",
    lotNumber: "12",
    coordinates: "62,49 72,45 75,54 67,57",
    status: "available",
    acres: "4.0",
    price: "$368,000",
    features: ["Central access", "Community views"],
    description: "Central lot with views of community green spaces.",
  },
  {
    id: "lot-13",
    lotNumber: "13",
    coordinates: "72,54 80,50 83,58 76,61",
    status: "reserved",
    acres: "4.3",
    price: "$375,000",
    features: ["Central location", "Level lot"],
    description: "Reserved central lot with level terrain.",
  },
  {
    id: "lot-31",
    lotNumber: "31",
    coordinates: "84,62 92,58 95,68 88,71",
    status: "sold",
    acres: "4.7",
    price: "$402,000",
    features: ["Cul-de-sac", "Private setting"],
    description: "Sold cul-de-sac lot with exceptional privacy.",
  },

  // === ROW 7 ===
  {
    id: "lot-9",
    lotNumber: "9",
    coordinates: "48,54 57,50 60,59 52,62",
    status: "available",
    acres: "4.1",
    price: "$365,000",
    features: ["Trail access", "Natural setting"],
    description: "Direct trail access with beautiful surroundings.",
  },
  {
    id: "lot-5",
    lotNumber: "5",
    coordinates: "57.5,73.5 63.2,63.8 71.6,68.0 77.4,75.5 72.5,74.2 63.5,71.5",
    status: "reserved",
    acres: "3.8",
    price: "$352,000",
    features: ["Near amenities", "Easy access"],
    description: "Longer lot stretching from the cul-de-sac to the eastern road.",
  },
  {
    id: "lot-6",
    lotNumber: "6",
    coordinates: "67,63 76,58 79,67 71,70",
    status: "available",
    acres: "4.2",
    price: "$375,000",
    features: ["Mature trees", "Stream adjacent"],
    description: "Beautiful lot with mature trees.",
  },

  // === ROW 8 - BOTTOM ===
  {
    id: "lot-7",
    lotNumber: "7",
    coordinates: "45,60 54,56 57,64 49,68",
    status: "available",
    acres: "3.8",
    price: "$348,000",
    features: ["Compact lot", "Low maintenance"],
    description: "Ideal compact lot for less maintenance.",
  },
  {
    id: "lot-8",
    lotNumber: "8",
    coordinates: "52,66 61,62 64,70 56,74",
    status: "available",
    acres: "4.0",
    price: "$362,000",
    features: ["Park views", "Family friendly"],
    description: "Family-friendly lot with park views.",
  },
  {
    id: "lot-4",
    lotNumber: "4",
    coordinates: "61,70 70,66 73,74 65,78",
    status: "available",
    acres: "4.8",
    price: "$405,000",
    features: ["Wooded lot", "Stream nearby"],
    description: "Beautifully wooded lot with seasonal stream.",
  },
  {
    id: "lot-3",
    lotNumber: "3",
    coordinates: "72.5,74.2 77.4,75.5 76.5,81.0 71.5,79.2",
    status: "available",
    acres: "4.5",
    price: "$388,000",
    features: ["Near entrance", "Easy commute"],
    description: "Standard rectangular lot near the south entrance.",
  },
  {
    id: "lot-2",
    lotNumber: "2",
    coordinates: "50,80 58,76 62,84 54,88",
    status: "sold",
    acres: "4.2",
    price: "$372,000",
    features: ["Entry lot", "High visibility"],
    description: "Sold entry lot with prominent positioning.",
  },
  {
    id: "lot-1",
    lotNumber: "1",
    coordinates: "54,86 62,82 66,90 58,94",
    status: "available",
    acres: "5.0",
    price: "$410,000",
    features: ["Large lot", "Private"],
    description: "Large private lot at community entrance.",
  },
];

export const getLotsByStatus = (lots: Lot[], status: LotStatus): Lot[] => {
  return lots.filter((lot) => lot.status === status);
};

export const getStatusColor = (status: LotStatus): string => {
  switch (status) {
    case "available":
      return "#22c55e"; // green-500
    case "sold":
      return "#9ca3af"; // gray-400
    case "reserved":
      return "#eab308"; // yellow-500
    default:
      return "#22c55e";
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
