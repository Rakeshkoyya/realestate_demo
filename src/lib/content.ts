export const site = {
  name: "Sahra Estates",
  tagline: "Independent property advisers in Dubai since 2014",
  phone: "+971 4 388 2140",
  phoneHref: "tel:+97143882140",
  whatsappHref: "https://wa.me/97143882140",
  email: "hello@sahraestates.ae",
  address: ["Office 1204, Index Tower", "DIFC, PO Box 507211", "Dubai, United Arab Emirates"],
  orn: "ORN 21847",
  hours: [
    { days: "Monday – Friday", time: "9:00 – 19:00" },
    { days: "Saturday", time: "10:00 – 17:00" },
    { days: "Sunday", time: "Viewings by appointment" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "YouTube", href: "https://youtube.com" },
  ],
};

export const nav = [
  { href: "/properties", label: "Properties" },
  { href: "/communities", label: "Communities" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
];

export type Community = {
  slug: string;
  name: string;
  image: string;
  line: string;
  body: string;
  avgSale: string;
  avgRent: string;
  yield: string;
  commute: string;
};

export const communities: Community[] = [
  {
    slug: "palm-jumeirah",
    name: "Palm Jumeirah",
    image: "/images/palm-aerial.jpg",
    line: "Beach villas and hotel living on the water",
    body: "Frond villas with private beaches, and shoreline apartments with hotel services. The most liquid prime market in the city, and the one international buyers ask about first.",
    avgSale: "AED 5,450 / sq ft",
    avgRent: "AED 710k / yr",
    yield: "4.8%",
    commute: "20 min to DIFC",
  },
  {
    slug: "downtown",
    name: "Downtown Dubai",
    image: "/images/downtown.jpg",
    line: "The city at its most concentrated",
    body: "High-floor apartments around the Burj Khalifa, the fountain and the Opera district. Walkable, lively after dark, and consistently popular for furnished stays.",
    avgSale: "AED 3,180 / sq ft",
    avgRent: "AED 215k / yr",
    yield: "6.1%",
    commute: "8 min to DIFC",
  },
  {
    slug: "dubai-marina",
    name: "Dubai Marina",
    image: "/images/marina-night.jpg",
    line: "Towers, water and a long promenade",
    body: "Seven kilometres of waterfront, the tram, the beach at JBR and more restaurants than anyone could try. Strong rental demand from young professionals.",
    avgSale: "AED 2,240 / sq ft",
    avgRent: "AED 168k / yr",
    yield: "6.9%",
    commute: "25 min to DIFC",
  },
  {
    slug: "emirates-hills",
    name: "Emirates Hills",
    image: "/images/villa-emirates-hills.jpg",
    line: "Large plots on the Montgomerie course",
    body: "The city's most established villa address: gated, green and very private. Plots rarely come to market, and most change hands without a public listing.",
    avgSale: "AED 6,900 / sq ft",
    avgRent: "AED 1.4m / yr",
    yield: "3.6%",
    commute: "25 min to DIFC",
  },
  {
    slug: "jumeirah",
    name: "Jumeirah",
    image: "/images/burj-al-arab.jpg",
    line: "Low-rise, leafy and near the beach",
    body: "Independent villas on quiet streets between the beach road and Al Wasl. Close to the best schools, and ten minutes from the financial district.",
    avgSale: "AED 3,900 / sq ft",
    avgRent: "AED 520k / yr",
    yield: "4.4%",
    commute: "10 min to DIFC",
  },
  {
    slug: "dubai-hills",
    name: "Dubai Hills Estate",
    image: "/images/villa-dubai-hills.jpg",
    line: "A park, a golf course and a short school run",
    body: "Master-planned around an 18-hole course and a central park, with its own mall and hospital. The first choice for most of the relocating families we advise.",
    avgSale: "AED 2,650 / sq ft",
    avgRent: "AED 480k / yr",
    yield: "5.2%",
    commute: "18 min to DIFC",
  },
  {
    slug: "al-barari",
    name: "Al Barari",
    image: "/images/villa-al-barari.jpg",
    line: "Botanical gardens and forest living",
    body: "Sixty per cent of the land is gardens, lakes and streams. A small, quiet community with a devoted following and very few homes for sale.",
    avgSale: "AED 2,400 / sq ft",
    avgRent: "AED 560k / yr",
    yield: "4.1%",
    commute: "22 min to DIFC",
  },
  {
    slug: "tilal-al-ghaf",
    name: "Tilal Al Ghaf",
    image: "/images/villa-tilal.jpg",
    line: "Lagoon houses, new and off-plan",
    body: "A newer community built around a swimmable lagoon. Most of our buyers here purchase off-plan on developer payment plans.",
    avgSale: "AED 2,050 / sq ft",
    avgRent: "AED 390k / yr",
    yield: "5.6%",
    commute: "30 min to DIFC",
  },
  {
    slug: "jumeirah-golf-estates",
    name: "Jumeirah Golf Estates",
    image: "/images/villa-golf.jpg",
    line: "Two championship courses, one community",
    body: "Home of the DP World Tour Championship. Spacious villas on the Earth and Fire courses, with good schools inside the gates.",
    avgSale: "AED 1,980 / sq ft",
    avgRent: "AED 410k / yr",
    yield: "5.4%",
    commute: "30 min to DIFC",
  },
  {
    slug: "arabian-ranches",
    name: "Arabian Ranches",
    image: "/images/villa-arabian-ranches.jpg",
    line: "Settled, friendly, family-first",
    body: "One of Dubai's original villa communities, with mature trees, a polo club and a real neighbourhood feel. Residents are loyal and turnover is low.",
    avgSale: "AED 1,720 / sq ft",
    avgRent: "AED 290k / yr",
    yield: "5.8%",
    commute: "28 min to DIFC",
  },
];

export function getCommunity(slug: string): Community | undefined {
  return communities.find((c) => c.slug === slug);
}

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  image: string;
  languages: string;
  focus: string;
};

export const team: TeamMember[] = [
  { slug: "karim-mansour", name: "Karim Mansour", role: "Founder & Managing Director", image: "/images/team-karim.jpg", languages: "Arabic, English, French", focus: "Prime villas, off-market sales" },
  { slug: "leila-haddad", name: "Leila Haddad", role: "Partner, Prime Sales", image: "/images/team-leila.jpg", languages: "English, Arabic", focus: "Palm Jumeirah, Al Barari" },
  { slug: "rohan-mehta", name: "Rohan Mehta", role: "Head of Leasing", image: "/images/team-rohan.jpg", languages: "English, Hindi, Gujarati", focus: "Dubai Hills, Dubai Marina" },
  { slug: "sofia-marin", name: "Sofia Marín", role: "Senior Adviser", image: "/images/team-sofia.jpg", languages: "Spanish, English, Italian", focus: "Jumeirah, Downtown" },
  { slug: "daniel-okafor", name: "Daniel Okafor", role: "Property Management Lead", image: "/images/team-daniel.jpg", languages: "English, Yoruba", focus: "Landlord portfolios" },
  { slug: "amira-saleh", name: "Amira Saleh", role: "Furnished Stays & Relocation", image: "/images/team-amira.jpg", languages: "Arabic, English, German", focus: "Short lets, family moves" },
];

export function getAgent(slug: string): TeamMember {
  return team.find((t) => t.slug === slug) ?? team[0];
}

export const testimonials = [
  {
    quote:
      "We were buying from London with two children and a start date. Leila shortlisted six villas on video, we flew in for one weekend, and six weeks later we were living in the house on the Palm. Nothing was ever unclear.",
    name: "Hannah Brooke",
    detail: "Bought on Palm Jumeirah, 2025",
    image: "/images/client-hannah.jpg",
  },
  {
    quote:
      "Sahra has managed our four apartments for five years. Occupancy has never dropped below 94%, and I get one clear statement a month. I have never had to think less about property.",
    name: "Marcus Webb",
    detail: "Landlord, Downtown and Marina",
    image: "/images/client-marcus.jpg",
  },
  {
    quote:
      "They talked us out of the first villa we loved, and they were right. The one we bought a month later has already gone up fourteen per cent. Honest advice is rare in this market.",
    name: "Nadia Farouk",
    detail: "Bought in Dubai Hills Estate, 2024",
    image: "/images/team-sofia.jpg",
  },
];

export const stats = [
  { value: 4.2, decimals: 1, prefix: "AED ", suffix: "bn", label: "in property transacted since 2014" },
  { value: 1180, decimals: 0, prefix: "", suffix: "", label: "homes bought, sold and let" },
  { value: 94, decimals: 0, prefix: "", suffix: "%", label: "average occupancy for managed homes" },
  { value: 4.9, decimals: 1, prefix: "", suffix: "", label: "Google rating, from 640 reviews" },
];

export type Service = {
  id: string;
  title: string;
  short: string;
  image: string;
  body: string;
  points: string[];
};

export const services: Service[] = [
  {
    id: "buying",
    title: "Buying",
    short: "Advice from the first shortlist to the transfer at the Land Department.",
    image: "/images/villa-frond.jpg",
    body: "We act for buyers, not developers. We shortlist from the whole market, including homes that are never listed publicly, tell you what a property is really worth, and negotiate hard on your behalf.",
    points: ["Off-market access", "Independent valuations", "Mortgage and Golden Visa guidance", "Snagging and handover"],
  },
  {
    id: "selling",
    title: "Selling",
    short: "Pricing from real transactions, careful presentation and a qualified buyer list.",
    image: "/images/villa-jumeirah-bay.jpg",
    body: "We take on a limited number of homes at a time, so each one gets proper attention: architectural photography, a considered launch to our private buyer list, and weekly reports you can actually read.",
    points: ["Pricing from DLD transaction data", "Architectural photography and film", "Private buyer network", "Weekly written reports"],
  },
  {
    id: "leasing",
    title: "Leasing",
    short: "Long-term rentals for tenants and landlords, done properly.",
    image: "/images/villa-dubai-hills.jpg",
    body: "For tenants, we find the right home and negotiate the terms. For landlords, we find and vet tenants, register the Ejari and handle the paperwork. Most homes we list are let within 21 days.",
    points: ["Tenant vetting and references", "Ejari registration", "Cheque and deposit handling", "Average 21 days to let"],
  },
  {
    id: "furnished-stays",
    title: "Furnished stays",
    short: "Move-in-ready homes by the month, for relocations and long visits.",
    image: "/images/int-living-gallery.jpg",
    body: "A curated collection of apartments and villas, furnished by our interiors team and serviced weekly. Ideal for relocating families, project teams and anyone who needs a proper home for one to twelve months.",
    points: ["Furnished by our interiors team", "Weekly housekeeping", "Utilities and fibre included", "Terms from one month"],
  },
  {
    id: "management",
    title: "Property management",
    short: "Full care of your home or portfolio, with one monthly statement.",
    image: "/images/int-living-wood.jpg",
    body: "Rent collection, maintenance, renewals, inspections and service charge checks, all handled by one named manager. Landlords see everything in a monthly statement and a live online ledger.",
    points: ["One named manager", "24/7 maintenance line", "Quarterly inspections", "Monthly statements"],
  },
];

export const processSteps = [
  { title: "A first conversation", body: "Thirty minutes, in person or on a call, about what you need, your timing and your budget. No obligation and no pressure." },
  { title: "A considered shortlist", body: "Usually five to eight homes, including off-market ones, each with our honest notes on value, condition and the building." },
  { title: "Viewings that fit your week", body: "In person, or on a live video walkthrough if you are abroad. We drive, and we bring the floor plans." },
  { title: "Negotiation to keys", body: "Offer, MOU, NOC, mortgage and transfer, or Ejari and move-in. We handle each step and tell you what happens next." },
];

export const faqs = [
  {
    q: "Can foreigners buy property in Dubai?",
    a: "Yes. Foreign nationals can buy freehold property in designated areas, which include every community we work in. A purchase of AED 2 million or more can qualify you for a ten-year Golden Visa.",
  },
  {
    q: "What fees should I budget for when buying?",
    a: "Allow roughly 7% on top of the price: the 4% Dubai Land Department transfer fee, 2% agency commission plus VAT, and trustee and registration fees. With a mortgage, add about 1% for bank and registration costs.",
  },
  {
    q: "How are rents usually paid?",
    a: "Annual rents are usually paid by post-dated cheques, between one and four a year. We can often negotiate more cheques, or a lower rent for fewer. Furnished stays are paid monthly by card or bank transfer.",
  },
  {
    q: "Do you charge tenants a fee?",
    a: "For long-term rentals, the standard agency fee is 5% of the annual rent plus VAT. Furnished stays carry no agency fee.",
  },
  {
    q: "Can you help me buy if I'm not in Dubai?",
    a: "About a third of our buyers purchase from abroad. We run live video viewings, arrange power of attorney where needed, and handle the transfer on your behalf.",
  },
];

export const timeline = [
  { year: "2014", text: "Karim Mansour opens a two-desk office in Jumeirah Lake Towers, advising a handful of private buyers." },
  { year: "2017", text: "Leasing and property management launch, and the first hundred homes come under management." },
  { year: "2020", text: "Live video viewings let international clients keep buying through the pandemic. Furnished stays begin." },
  { year: "2023", text: "The move to Index Tower in DIFC. The team grows to 24 advisers speaking eleven languages." },
  { year: "2026", text: "AED 4.2 billion transacted, and still independent." },
];
