import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Instrument_Serif } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RevealObserver, revealBootScript } from "@/components/motion/RevealObserver";
import "./globals.css";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument",
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sahraestates.ae"),
  title: {
    default: "Sahra Estates — Independent property advisers in Dubai",
    template: "%s — Sahra Estates",
  },
  description:
    "Buying, selling, leasing and furnished stays across Dubai's most sought-after communities. Independent advice since 2014.",
  openGraph: {
    type: "website",
    siteName: "Sahra Estates",
    images: ["/images/skyline-dusk.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f3f2ee",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        {/* Static, first-party boot script (no user input): gates reveal-hidden states behind JS. */}
        <script dangerouslySetInnerHTML={{ __html: revealBootScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
