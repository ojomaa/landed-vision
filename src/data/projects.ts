import projectResidential from "@/assets/project-residential.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";
import projectMixeduse from "@/assets/project-mixeduse.jpg";
import siteMapCrestview from "@/assets/Site-development-plan-before-forest-conservation-plan.png";
import { Lot, crestviewLots } from "./lots";

export type ProjectStatus = "past" | "current" | "future";

export interface Project {
  id: string;
  slug: string;
  image: string;
  category: string;
  title: string;
  description: string;
  fullDescription: string;
  status: ProjectStatus;
  location: string;
  stats: {
    acres: string;
    units?: string;
    sqft?: string;
    year: string;
  };
  features: string[];
  gallery?: string[];
  siteMap?: string;
  lots?: Lot[];
}

export const projects: Project[] = [
  // Past Projects
  {
    id: "1",
    slug: "oak-ridge-community",
    image: projectResidential,
    category: "Residential",
    title: "Oak Ridge Community",
    description: "Family-focused neighborhood with 280 homesites, featuring award-winning schools and extensive green spaces throughout.",
    fullDescription: "Oak Ridge Community represents our commitment to creating family-centered neighborhoods that stand the test of time. This 180-acre development features 280 thoughtfully designed homesites, each positioned to maximize natural light and privacy. The community includes three neighborhood parks, over 5 miles of walking trails, and direct access to award-winning schools. Sustainable design principles guided every decision, from the preserved oak groves to the community garden spaces that bring neighbors together.",
    status: "past",
    location: "Cedar Park, Texas",
    stats: { acres: "180", units: "280", year: "2021" },
    features: ["5+ miles of trails", "3 community parks", "Preserved oak groves", "Community garden", "Award-winning schools"],
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1448630360428-65456885c650?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
    ],
  },
  {
    id: "2",
    slug: "summit-business-park",
    image: projectCommercial,
    category: "Commercial",
    title: "Summit Business Park",
    description: "Premier office and retail destination spanning 150 acres in the heart of Austin's tech corridor. Home to leading companies and innovative startups.",
    fullDescription: "Summit Business Park has become the premier destination for technology companies and innovative businesses in Central Texas. This 150-acre commercial development offers Class A office space, flexible retail options, and state-of-the-art amenities designed for the modern workforce. The park features LEED-certified buildings, extensive outdoor collaboration spaces, and direct access to major transportation corridors. Today, Summit is home to over 50 companies employing more than 8,000 professionals.",
    status: "past",
    location: "Austin, Texas",
    stats: { acres: "150", sqft: "2.1M", year: "2022" },
    features: ["LEED-certified buildings", "Outdoor collaboration spaces", "On-site dining", "Fitness center", "EV charging stations"],
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=800&fit=crop",
    ],
  },
  {
    id: "3",
    slug: "riverside-commons",
    image: projectMixeduse,
    category: "Mixed-Use",
    title: "Riverside Commons",
    description: "Thoughtfully designed urban village combining residential, retail, and office space along the scenic riverfront.",
    fullDescription: "Riverside Commons redefined mixed-use development in the region by seamlessly integrating residential living, boutique retail, and professional office space along a beautifully restored riverfront. The 65-acre development includes 520 residential units ranging from urban apartments to waterfront townhomes, 150,000 square feet of retail and dining, and two Class A office buildings. The centerpiece is a half-mile riverfront promenade featuring public art, outdoor dining, and event spaces that host community gatherings year-round.",
    status: "past",
    location: "San Antonio, Texas",
    stats: { acres: "65", units: "520", year: "2022" },
    features: ["Riverfront promenade", "Public art installations", "Rooftop amenities", "Underground parking", "Event pavilion"],
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=1200&h=800&fit=crop",
    ],
  },
  // Current Projects
  {
    id: "4",
    slug: "crestview-estates",
    image: projectResidential,
    category: "Residential",
    title: "Crestview Estates",
    description: "A master-planned community featuring 450 homesites across 320 acres of rolling Texas Hill Country terrain. Complete with parks, trails, and community amenities.",
    fullDescription: "Crestview Estates is our most ambitious residential project to date, transforming 320 acres of pristine Hill Country terrain into a master-planned community that honors the natural landscape while providing modern amenities. The development will feature 450 homesites across diverse lot sizes, a 20-acre central park, resort-style pool complex, and an extensive trail system connecting to regional hiking paths. Construction is progressing on schedule with the first phase of homes now available.",
    status: "current",
    location: "Dripping Springs, Texas",
    stats: { acres: "320", units: "450", year: "2024" },
    features: ["20-acre central park", "Resort-style pool", "Hill Country views", "Trail connections", "Community clubhouse"],
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop",
    ],
    siteMap: siteMapCrestview,
    lots: crestviewLots,
  },
  {
    id: "5",
    slug: "gateway-logistics-center",
    image: projectCommercial,
    category: "Commercial",
    title: "Gateway Logistics Center",
    description: "State-of-the-art distribution and logistics hub strategically located near major transportation corridors.",
    fullDescription: "Gateway Logistics Center addresses the growing demand for modern distribution facilities in the Southwest region. This 200-acre development will deliver 1.5 million square feet of Class A industrial space featuring 40-foot clear heights, cross-dock configurations, and advanced automation capabilities. Strategic positioning near I-35 and I-10 provides unmatched access to regional and national markets. The first building is now under construction with tenant occupancy expected in late 2024.",
    status: "current",
    location: "New Braunfels, Texas",
    stats: { acres: "200", sqft: "1.5M", year: "2024" },
    features: ["40-foot clear heights", "Cross-dock capable", "Rail access", "Trailer parking", "Solar-ready roofs"],
    gallery: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1565610222536-ef125c59da2e?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=1200&h=800&fit=crop",
    ],
  },
  // Future Projects
  {
    id: "6",
    slug: "harborwalk-district",
    image: projectMixeduse,
    category: "Mixed-Use",
    title: "Harborwalk District",
    description: "Waterfront living, dining, and entertainment in one vibrant 85-acre destination. A new standard for urban mixed-use development.",
    fullDescription: "Harborwalk District will set a new standard for waterfront mixed-use development in Texas. This visionary 85-acre project will transform an underutilized industrial waterfront into a vibrant destination featuring 800 residential units, a boutique hotel, 200,000 square feet of retail and dining, and a 15-acre public waterfront park. The design emphasizes pedestrian connectivity, sustainable building practices, and year-round activation through carefully programmed public spaces. Currently in the entitlement phase with construction anticipated to begin in 2026.",
    status: "future",
    location: "Corpus Christi, Texas",
    stats: { acres: "85", units: "800", year: "2026" },
    features: ["15-acre waterfront park", "Boutique hotel", "Marina access", "Public event spaces", "Water taxi service"],
    gallery: [
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&h=800&fit=crop",
    ],
  },
  {
    id: "7",
    slug: "willow-creek-ranch",
    image: projectResidential,
    category: "Residential",
    title: "Willow Creek Ranch",
    description: "Expansive ranch-style community with large homesites, equestrian facilities, and preserved natural landscapes.",
    fullDescription: "Willow Creek Ranch will offer a distinctive living experience for those seeking space, privacy, and connection to the land. This 450-acre development will feature 220 estate homesites ranging from 1 to 5 acres, a full-service equestrian center, and over 200 acres of preserved natural areas including wetlands, meadows, and heritage oak groves. The community design prioritizes dark sky compliance, wildlife corridors, and sustainable land management practices. Planning and design are underway with lot sales anticipated to begin in 2026.",
    status: "future",
    location: "Fredericksburg, Texas",
    stats: { acres: "450", units: "220", year: "2027" },
    features: ["1-5 acre homesites", "Equestrian center", "Dark sky compliant", "Wildlife corridors", "Community barn"],
    gallery: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1595877244574-e90ce41ce089?w=1200&h=800&fit=crop",
    ],
  },
  {
    id: "8",
    slug: "innovation-campus",
    image: projectCommercial,
    category: "Commercial",
    title: "Innovation Campus",
    description: "Next-generation technology and research campus designed for Fortune 500 companies and emerging startups.",
    fullDescription: "Innovation Campus represents the future of work—a 120-acre technology and research campus designed to attract world-class talent and foster breakthrough innovations. The development will include 1.8 million square feet of flexible office and lab space, a conference center, on-site hotel, and extensive amenity programming including fitness facilities, childcare, and diverse dining options. The campus design emphasizes biophilic principles, with buildings oriented around courtyards, gardens, and water features. Currently in master planning with construction targeted to begin in 2026.",
    status: "future",
    location: "Round Rock, Texas",
    stats: { acres: "120", sqft: "1.8M", year: "2027" },
    features: ["Lab-ready spaces", "Conference center", "On-site hotel", "Childcare facility", "Biophilic design"],
    gallery: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=800&fit=crop",
    ],
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((p) => p.slug === slug);
};

export const getProjectsByStatus = (status: ProjectStatus): Project[] => {
  return projects.filter((p) => p.status === status);
};
