export type Listing = "sale" | "rent" | "stay";

export type Property = {
  slug: string;
  ref: string;
  title: string;
  community: string; // community slug
  listing: Listing;
  price: number; // AED — total for sale, yearly for rent, monthly for stays
  type: "Villa" | "Apartment" | "Penthouse" | "Townhouse";
  beds: number;
  baths: number;
  sqft: number;
  plotSqft?: number;
  cover: string;
  gallery: string[];
  summary: string;
  description: string[];
  features: string[];
  agent: string; // team slug
  completion: "Ready" | "Off-plan";
  furnished: boolean;
};

export const LISTING_LABEL: Record<Listing, string> = {
  sale: "For sale",
  rent: "For rent",
  stay: "Furnished stay",
};

const PRICE_SUFFIX: Record<Listing, string> = {
  sale: "",
  rent: " / year",
  stay: " / month",
};

const aed = new Intl.NumberFormat("en-AE", { maximumFractionDigits: 0 });

export function formatPrice(p: Pick<Property, "price" | "listing">): string {
  return `AED ${aed.format(p.price)}${PRICE_SUFFIX[p.listing]}`;
}

export function formatNumber(n: number): string {
  return aed.format(n);
}

export const properties: Property[] = [
  {
    slug: "frond-g-signature-villa",
    ref: "SE-PJ-2041",
    title: "Frond G Signature Villa",
    community: "palm-jumeirah",
    listing: "sale",
    price: 42_500_000,
    type: "Villa",
    beds: 5,
    baths: 6,
    sqft: 7_450,
    plotSqft: 10_200,
    cover: "/images/villa-frond.jpg",
    gallery: ["/images/int-living-wood.jpg", "/images/int-bedroom-grey.jpg", "/images/int-bath.jpg", "/images/int-dining-stair.jpg"],
    summary: "A rebuilt villa at the tip of the frond, with 60 metres of private beach and open views to the Burj Al Arab.",
    description: [
      "Set on the quieter, wider tip of Frond G, this villa was stripped back to its frame in 2024 and rebuilt by a London studio around one idea: every principal room should see the water. The ground floor opens fully onto a 25-metre infinity pool, with the Gulf and the Dubai Marina skyline beyond.",
      "Five bedroom suites sit on the upper floor, each with its own terrace. The principal suite has a dressing room, a stone bath facing west, and a private study. Downstairs, a double-height living room, formal dining for twelve and a show kitchen are joined by a separate catering kitchen, staff quarters and a four-car garage.",
      "Vacant on transfer. Full building documentation, the 2024 renovation drawings and service records are available to qualified buyers.",
    ],
    features: ["Private beach, 60 m frontage", "25 m infinity pool", "Home cinema", "Staff quarters for three", "Crestron smart home", "Four-car garage", "Solar-assisted cooling", "Separate catering kitchen"],
    agent: "leila-haddad",
    completion: "Ready",
    furnished: false,
  },
  {
    slug: "emirates-hills-garden-residence",
    ref: "SE-EH-1187",
    title: "Emirates Hills Garden Residence",
    community: "emirates-hills",
    listing: "sale",
    price: 58_000_000,
    type: "Villa",
    beds: 6,
    baths: 8,
    sqft: 12_900,
    plotSqft: 26_400,
    cover: "/images/villa-emirates-hills.jpg",
    gallery: ["/images/int-dining-stair.jpg", "/images/int-living-long.jpg", "/images/int-kitchen.jpg", "/images/int-glass-stair.jpg"],
    summary: "A low, walled garden house in Sector E, overlooking the 11th fairway of the Montgomerie.",
    description: [
      "Most houses in Emirates Hills are built to be seen. This one was built to be lived in. Behind a limestone wall, a mature garden of ghaf and olive trees shelters a single-storey living wing and a two-storey sleeping wing, joined by a glass gallery.",
      "The living wing faces the golf course across a 30-metre lawn. Six bedroom suites, a gym with a steam room, a wine cellar for 900 bottles and a separate guest house complete the plot.",
      "Offered with vacant possession. Viewings by appointment with two days' notice.",
    ],
    features: ["Golf course frontage", "Guest house", "Wine cellar, 900 bottles", "Gym and steam room", "Mature landscaped garden", "Six-car garage", "Staff wing", "Lift to all floors"],
    agent: "karim-mansour",
    completion: "Ready",
    furnished: false,
  },
  {
    slug: "jumeirah-bay-courtyard-house",
    ref: "SE-JB-0932",
    title: "Jumeirah Courtyard House",
    community: "jumeirah",
    listing: "sale",
    price: 27_900_000,
    type: "Villa",
    beds: 4,
    baths: 5,
    sqft: 6_100,
    plotSqft: 8_800,
    cover: "/images/villa-jumeirah-bay.jpg",
    gallery: ["/images/int-living-gallery.jpg", "/images/int-bedroom-hotel.jpg", "/images/int-bath.jpg", "/images/int-living-soft.jpg"],
    summary: "Pale, calm and close to the sea: a courtyard villa two streets back from Jumeirah Beach Road.",
    description: [
      "Arranged around a shaded central courtyard with a reflecting pool, this house keeps the heat out and the light in. Every room opens onto either the courtyard or the rear garden, and the roof terrace looks out to the sea.",
      "Four bedroom suites, a family room, a formal living room and an open kitchen with a breakfast terrace. The villa is a five-minute walk from Sunset Beach and ten minutes by car from DIFC.",
    ],
    features: ["Central courtyard", "Roof terrace with sea view", "Pool and garden", "Maid's room", "Walk to the beach", "Two covered parking bays"],
    agent: "sofia-marin",
    completion: "Ready",
    furnished: false,
  },
  {
    slug: "dubai-hills-park-villa",
    ref: "SE-DH-4410",
    title: "Dubai Hills Park Villa",
    community: "dubai-hills",
    listing: "rent",
    price: 650_000,
    type: "Villa",
    beds: 4,
    baths: 5,
    sqft: 5_300,
    plotSqft: 7_600,
    cover: "/images/villa-dubai-hills.jpg",
    gallery: ["/images/int-living-soft.jpg", "/images/int-bedroom-art.jpg", "/images/int-kitchen.jpg", "/images/int-bath.jpg"],
    summary: "A contemporary four-bedroom villa facing the central park, with a private pool and a landscaped garden.",
    description: [
      "Directly across from Dubai Hills Park, this villa puts the running track, playgrounds and cafés at the end of the front path. Inside, a double-height living room opens onto a heated pool and a garden whose upkeep is included in the rent.",
      "Four bedrooms upstairs, with a study and a guest room downstairs. Available from 1 November on a twelve-month lease, payable in up to four cheques.",
    ],
    features: ["Park-facing plot", "Heated private pool", "Garden maintenance included", "Study and guest room", "Pets considered", "Four cheques accepted"],
    agent: "rohan-mehta",
    completion: "Ready",
    furnished: false,
  },
  {
    slug: "al-barari-pavilion",
    ref: "SE-AB-0718",
    title: "Al Barari Pavilion",
    community: "al-barari",
    listing: "sale",
    price: 19_750_000,
    type: "Villa",
    beds: 5,
    baths: 6,
    sqft: 8_200,
    plotSqft: 15_000,
    cover: "/images/villa-al-barari.jpg",
    gallery: ["/images/int-glass-stair.jpg", "/images/int-living-wood.jpg", "/images/int-bedroom-grey.jpg", "/images/int-dining-stair.jpg"],
    summary: "Timber, stone and glass among the botanical gardens of Al Barari, the greenest address in the city.",
    description: [
      "Al Barari was planned around its gardens, and this pavilion was planned around its trees. A timber-screened entrance leads to a glass living hall that opens on three sides to lawns, a lap pool and a stream that runs through the plot.",
      "Five bedrooms, a yoga room, a library, and a garage converted into a studio. The house runs on solar panels and grey-water irrigation.",
    ],
    features: ["Lap pool", "Stream through the plot", "Library and yoga room", "Solar and grey-water systems", "Converted studio", "Botanical garden views"],
    agent: "leila-haddad",
    completion: "Ready",
    furnished: false,
  },
  {
    slug: "burj-vista-two-bedroom",
    ref: "SE-DT-2276",
    title: "Burj Vista Two-Bedroom",
    community: "downtown",
    listing: "stay",
    price: 32_000,
    type: "Apartment",
    beds: 2,
    baths: 2,
    sqft: 1_420,
    cover: "/images/int-living-gallery.jpg",
    gallery: ["/images/int-apartment-bright.jpg", "/images/int-bedroom-hotel.jpg", "/images/int-kitchen.jpg", "/images/downtown.jpg"],
    summary: "A fully furnished high-floor apartment looking straight at the Burj Khalifa and the fountain.",
    description: [
      "A light, quiet apartment on the 41st floor of Burj Vista, furnished by our in-house interiors team and ready to move into with a suitcase. Linen, kitchenware, fibre internet and weekly cleaning are included.",
      "Available for stays of one month or longer. Utilities are included up to AED 1,200 a month and billed at cost above that.",
    ],
    features: ["Burj Khalifa view", "Weekly housekeeping", "Fibre internet, 1 Gbps", "Utilities included up to cap", "Pool and gym", "Covered parking"],
    agent: "amira-saleh",
    completion: "Ready",
    furnished: true,
  },
  {
    slug: "marina-gate-sky-apartment",
    ref: "SE-DM-3391",
    title: "Marina Gate Sky Apartment",
    community: "dubai-marina",
    listing: "rent",
    price: 245_000,
    type: "Apartment",
    beds: 3,
    baths: 4,
    sqft: 2_150,
    cover: "/images/int-living-long.jpg",
    gallery: ["/images/marina-night.jpg", "/images/int-bedroom-art.jpg", "/images/int-bath.jpg", "/images/int-apartment-studio.jpg"],
    summary: "Three bedrooms on the 52nd floor, with views wrapping around the marina and the sea.",
    description: [
      "A corner apartment in Marina Gate 2 with floor-to-ceiling glass on two sides. The living room faces the sea, the bedrooms face the marina, and the balcony catches the evening breeze.",
      "Unfurnished, with built-in wardrobes, a fitted kitchen with Miele appliances, and two parking spaces. Available now on a twelve-month lease.",
    ],
    features: ["Sea and marina views", "Two parking spaces", "Miele kitchen", "Infinity pool and gym", "Walk to the tram", "Available now"],
    agent: "rohan-mehta",
    completion: "Ready",
    furnished: false,
  },
  {
    slug: "jumeirah-golf-estates-villa",
    ref: "SE-JG-1504",
    title: "Jumeirah Golf Estates Villa",
    community: "jumeirah-golf-estates",
    listing: "rent",
    price: 420_000,
    type: "Villa",
    beds: 4,
    baths: 5,
    sqft: 4_900,
    plotSqft: 7_100,
    cover: "/images/villa-golf.jpg",
    gallery: ["/images/int-living-soft.jpg", "/images/int-bedroom-boho.jpg", "/images/int-dining-stair.jpg", "/images/int-kitchen.jpg"],
    summary: "A bright, upgraded family villa on the Earth course, with a pool and a view across the fairway.",
    description: [
      "Upgraded throughout in 2025, with a new kitchen, oak floors and a pool deck that looks straight onto the 14th hole of the Earth course. The community has its own schools, a clubhouse and nine kilometres of shaded paths.",
      "Four bedrooms and a maid's room. Twelve-month lease, available from 15 October.",
    ],
    features: ["Golf course view", "Private pool", "Upgraded 2025", "Maid's room", "Near schools", "Clubhouse access"],
    agent: "daniel-okafor",
    completion: "Ready",
    furnished: false,
  },
  {
    slug: "tilal-al-ghaf-lagoon-house",
    ref: "SE-TG-0266",
    title: "Tilal Al Ghaf Lagoon House",
    community: "tilal-al-ghaf",
    listing: "sale",
    price: 12_400_000,
    type: "Villa",
    beds: 5,
    baths: 6,
    sqft: 6_700,
    plotSqft: 9_300,
    cover: "/images/villa-tilal.jpg",
    gallery: ["/images/int-apartment-plants.jpg", "/images/int-bedroom-art.jpg", "/images/int-glass-stair.jpg", "/images/int-living-wood.jpg"],
    summary: "An off-plan villa on the lagoon, handing over in the second quarter of 2027.",
    description: [
      "One of twelve lagoon-front plots in the Elysian cluster, with a private sandy shoreline on Lagoon Al Ghaf. The layout puts a double-height family room and pool terrace on the water side, with five bedroom suites above.",
      "Payment plan: 20% on booking, 50% during construction and 30% on handover. We can arrange a site visit and a walkthrough of the show villa.",
    ],
    features: ["Lagoon frontage", "Private pool", "70/30 payment plan", "Handover Q2 2027", "Show villa to view", "Golden Visa eligible"],
    agent: "karim-mansour",
    completion: "Off-plan",
    furnished: false,
  },
  {
    slug: "arabian-ranches-townhouse",
    ref: "SE-AR-5128",
    title: "Arabian Ranches Corner Townhouse",
    community: "arabian-ranches",
    listing: "stay",
    price: 24_500,
    type: "Townhouse",
    beds: 3,
    baths: 4,
    sqft: 2_600,
    plotSqft: 3_400,
    cover: "/images/villa-arabian-ranches.jpg",
    gallery: ["/images/int-bedroom-boho.jpg", "/images/int-apartment-bright.jpg", "/images/int-kitchen.jpg", "/images/int-living-soft.jpg"],
    summary: "A furnished corner townhouse for families moving to Dubai, on flexible terms from one month.",
    description: [
      "Made for families who have just arrived: three furnished bedrooms, a garden, school runs of under ten minutes and a community pool at the end of the street. Our relocation team can arrange school tours and car hire before you land.",
      "The monthly rent includes housekeeping twice a week, internet and garden care.",
    ],
    features: ["Corner plot with garden", "Housekeeping twice weekly", "Near top-rated schools", "Community pool", "Flexible monthly terms", "Relocation support"],
    agent: "amira-saleh",
    completion: "Ready",
    furnished: true,
  },
];

export function getProperty(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getSimilar(p: Property, count = 3): Property[] {
  const sameListing = properties.filter((x) => x.slug !== p.slug && x.listing === p.listing);
  const rest = properties.filter((x) => x.slug !== p.slug && x.listing !== p.listing);
  return [...sameListing, ...rest].slice(0, count);
}

export const FEATURED_SLUGS = ["frond-g-signature-villa", "burj-vista-two-bedroom", "dubai-hills-park-villa"] as const;
