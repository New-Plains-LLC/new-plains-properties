import type { Metadata } from "next";
import { Caveat, Inter } from "next/font/google";
import MobileCallBar from "@/components/MobileCallBar";
import { CITIES, SITE } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: "600",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "New Plains Properties | Sell Your Land or Property",
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "New Plains Properties | Sell Your Land or Property",
    description: SITE.description,
    url: "/",
    locale: "en_US",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

const { street, city, region, postalCode } = SITE.address;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE.url}/#business`,
  name: SITE.name,
  ...(SITE.legalName && { legalName: SITE.legalName }),
  description: SITE.description,
  url: SITE.url,
  telephone: "+1-405-607-9563",
  ...(SITE.email && { email: SITE.email }),
  image: `${SITE.url}/og.jpg`,
  logo: `${SITE.url}/NewPlains2.png`,
  address: {
    "@type": "PostalAddress",
    ...(street && { streetAddress: street }),
    ...(city && { addressLocality: city }),
    addressRegion: region,
    ...(postalCode && { postalCode }),
    addressCountry: "US",
  },
  areaServed: [
    ...CITIES.map((c) => ({ "@type": "City", name: `${c.name}, OK` })),
    { "@type": "Country", name: "United States" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${caveat.variable}`}>
      <body className="font-sans pb-20 md:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <MobileCallBar />
      </body>
    </html>
  );
}
