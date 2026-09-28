export type Block = { type: "p" | "h2" | "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Market" | "Guides" | "Living";
  image: string;
  author: string; // team slug
  date: string; // ISO YYYY-MM-DD
  minutes: number;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "dubai-prime-market-q3-2026",
    title: "The prime market in Q3: fewer listings, firmer prices",
    excerpt: "Villa listings in the top five communities fell again this quarter. What that means if you're buying, and why sellers should still price carefully.",
    category: "Market",
    image: "/images/palm-aerial.jpg",
    author: "karim-mansour",
    date: "2026-09-18",
    minutes: 6,
    body: [
      { type: "p", text: "Prime villa listings across Palm Jumeirah, Emirates Hills, Jumeirah, Al Barari and Dubai Hills fell 11% between July and September, according to our analysis of portal and Land Department data. Transactions held steady. The result is a market where good homes sell quickly and optimistically priced ones sit still." },
      { type: "h2", text: "What changed this quarter" },
      { type: "p", text: "Three things stand out. Handovers of off-plan villas slowed, so fewer new homes reached the resale market. More owners chose to rent rather than sell, encouraged by rents that are still rising in family communities. And cash buyers, who make up about 60% of prime purchases, moved faster than they did in the first half of the year." },
      { type: "quote", text: "The gap between a well-priced home and an ambitious one has never been wider. The first sells in three weeks; the second waits three months." },
      { type: "h2", text: "If you are buying" },
      { type: "p", text: "Expect less room to negotiate on the best homes, and have proof of funds or a mortgage pre-approval ready before you view. Look again at homes that have been on the market for more than 60 days: that is where most of the discount is." },
      { type: "h2", text: "If you are selling" },
      { type: "p", text: "Price against recent transactions, not asking prices. A home launched within 3% of its true value tends to attract several buyers in the first fortnight, and that competition does more for the final price than any later reduction." },
    ],
  },
  {
    slug: "buying-in-dubai-from-abroad",
    title: "Buying in Dubai from abroad: a practical guide",
    excerpt: "From video viewings to power of attorney: the steps our overseas buyers follow, and the fees to budget for.",
    category: "Guides",
    image: "/images/skyline-dusk.jpg",
    author: "leila-haddad",
    date: "2026-08-27",
    minutes: 8,
    body: [
      { type: "p", text: "About a third of our buyers complete their purchase without being in Dubai for most of the process. It works well, provided you plan the paperwork early and choose people you trust to act for you on the ground." },
      { type: "h2", text: "Viewing without flying in" },
      { type: "p", text: "We run live video viewings on any device, walking every room and opening every cupboard. We also send honest notes on the building, the service charges and any renovations next door: the things photographs never show." },
      { type: "h2", text: "Signing and paying" },
      { type: "p", text: "The Memorandum of Understanding (Form F) can be signed digitally. The deposit, usually 10%, is held by the brokerage or a trustee. For the transfer, you can attend in person or appoint someone under a power of attorney, which can be notarised at a UAE embassy in your country." },
      { type: "quote", text: "Plan for 7% on top of the price. Most surprises in Dubai property are fee surprises." },
      { type: "h2", text: "What it costs" },
      { type: "p", text: "Budget for the 4% Land Department fee, 2% agency commission plus VAT, a trustee fee of about AED 4,200, and a small title deed fee. With a mortgage, add about 1% for registration and bank charges." },
    ],
  },
  {
    slug: "choosing-a-community-for-your-family",
    title: "Choosing a community when you move with children",
    excerpt: "Schools, commutes, parks, and the question every parent asks: where will they actually play?",
    category: "Living",
    image: "/images/villa-dubai-hills.jpg",
    author: "amira-saleh",
    date: "2026-07-30",
    minutes: 5,
    body: [
      { type: "p", text: "Most families we relocate choose their school first and their home second. That's sensible: a 45-minute school run in Dubai traffic will shape your week more than an extra bedroom will." },
      { type: "h2", text: "Start with the school map" },
      { type: "p", text: "The most sought-after schools cluster in a few areas: Al Barsha, Jumeirah, Dubai Hills and the communities along Sheikh Mohammed Bin Zayed Road. Waiting lists matter as much as ratings, so apply before you sign a lease." },
      { type: "h2", text: "Then walk the community" },
      { type: "p", text: "Dubai Hills Estate, Arabian Ranches and Jumeirah Golf Estates all have parks, pools and cycle paths inside the gates. Visit in the late afternoon if you can, when you'll see how the streets are really used." },
      { type: "quote", text: "The best neighbourhood is the one where your children can cycle to a friend's house." },
    ],
  },
  {
    slug: "what-furnished-stays-include",
    title: "What a furnished stay with us actually includes",
    excerpt: "Linen, cutlery, fibre internet, and a phone number that gets answered. A look inside our monthly homes.",
    category: "Living",
    image: "/images/int-living-gallery.jpg",
    author: "amira-saleh",
    date: "2026-06-12",
    minutes: 4,
    body: [
      { type: "p", text: "Every furnished home in our collection is prepared by our own interiors team, to the same list. You should be able to arrive with a suitcase and cook dinner that evening." },
      { type: "h2", text: "The list" },
      { type: "p", text: "Hotel-grade linen and towels, a fully equipped kitchen, a proper desk and chair, blackout curtains in every bedroom, 1 Gbps fibre internet and a smart TV. Housekeeping comes every week, and utilities are included up to a fair-use cap." },
      { type: "h2", text: "When something breaks" },
      { type: "p", text: "Call or message our guest line at any hour. Most problems are fixed the same day, and we'll tell you honestly when something will take longer." },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function formatDate(iso: string): string {
  return dateFmt.format(new Date(`${iso}T00:00:00Z`));
}
