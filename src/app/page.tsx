import fs from "node:fs";
import path from "node:path";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Comparison from "@/components/Comparison";
import BeforeAfter from "@/components/BeforeAfter";
import Situations from "@/components/Situations";
import ServiceMap from "@/components/ServiceMap";
import AboutUs from "@/components/AboutUs";
import FAQ from "@/components/FAQ";
import { FAQS } from "@/lib/faq";

export const dynamic = "force-static";

// Any photo dropped into public/drone/ is picked up at build time for the hero slideshow.
function getDronePhotos() {
  const dir = path.join(process.cwd(), "public", "drone");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
    .sort()
    .map((f) => `/drone/${f}`);
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />
      <main className="flex-1">
        <Hero images={getDronePhotos()} />
        <HowItWorks />
        <Features />
        <Comparison />
        <BeforeAfter />
        <Situations />
        <ServiceMap />
        <AboutUs />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
