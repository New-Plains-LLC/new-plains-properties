import Header from "@/components/Header";
import Link from "next/link";
import Footer from "@/components/Footer";
import { ArrowRight, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES, getCity } from "@/lib/site";
import { SITUATIONS } from "@/lib/situations";

export const dynamicParams = false;

type Props = { params: Promise<{ city: string }> };

export async function generateStaticParams() {
    return CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { city } = await params;
    const capitalizedCity = getCity(city)?.name ?? city;

    return {
        title: `Sell Your Property Fast in ${capitalizedCity}, OK | New Plains Properties`,
        description: `Looking to sell land or property in ${capitalizedCity}, OK? New Plains Properties buys as-is for cash. No realtor fees, fast closings. Local family buyers.`,
        alternates: { canonical: `/locations/${city}` },
    };
}

export default async function LocationPage({ params }: Props) {
    const { city } = await params;
    const cityData = getCity(city);
    if (!cityData) notFound();
    const capitalizedCity = cityData.name;
    const nearby = CITIES.filter((c) => c.slug !== city);

    return (
        <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
            <Header />
            <main className="flex-1">
                {/* SEO Location Hero */}
                <section className="bg-[var(--color-secondary)] text-white py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Sell Your Property Fast in <span className="text-[var(--color-primary)]">{capitalizedCity}, OK</span>
                        </h1>
                        <p className="text-xl max-w-2xl mx-auto text-gray-200 mb-10">
                            We are local cash buyers actively purchasing land, commercial buildings, and houses in {capitalizedCity} and surrounding areas. Skip the realtor commissions and repairs.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/sell-property"
                                className="inline-flex items-center justify-center rounded-xl bg-[var(--color-primary)] px-8 py-4 text-lg font-semibold text-white shadow-md hover:bg-[var(--color-primary-dark)] transition-all"
                            >
                                Get a Cash Offer
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Content Section for SEO */}
                <section className="py-20 bg-white">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="prose prose-lg prose-[var(--color-secondary)] mx-auto">
                            <h2 className="text-3xl font-bold text-[var(--color-secondary)] mb-6">Why We Buy in {capitalizedCity}</h2>
                            <p className="text-gray-600 mb-6">
                                As a family-owned business rooted in Oklahoma, {capitalizedCity} is an area we know well and deeply care about. Our goal isn&apos;t just to buy off-market properties; it&apos;s to improve our local communities. Whether you&apos;ve inherited a house that needs too much work, or you have vacant land in {capitalizedCity} you&apos;d like to turn into cash, we can help.
                            </p>

                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start">
                                    <MapPin className="w-6 h-6 text-[var(--color-primary)] mr-3 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700"><strong>Zero Closing Costs:</strong> We cover all traditional fees.</span>
                                </li>
                                <li className="flex items-start">
                                    <MapPin className="w-6 h-6 text-[var(--color-primary)] mr-3 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700"><strong>Buy As-Is:</strong> No repairs or cleaning needed in your {capitalizedCity} property.</span>
                                </li>
                                <li className="flex items-start">
                                    <MapPin className="w-6 h-6 text-[var(--color-primary)] mr-3 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700"><strong>Local Experts:</strong> We understand the true value of real estate in {capitalizedCity}.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="pb-20 bg-white">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                        <div>
                            <h2 className="text-lg font-bold text-[var(--color-secondary)] mb-4">Selling in {capitalizedCity} because of...</h2>
                            <div className="flex flex-wrap gap-3">
                                {SITUATIONS.map((s) => (
                                    <Link
                                        key={s.slug}
                                        href={`/situations/${s.slug}`}
                                        className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                                    >
                                        {s.shortTitle}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-[var(--color-secondary)] mb-4">Nearby areas we also serve</h2>
                            <div className="flex flex-wrap gap-3">
                                {nearby.map((c) => (
                                    <Link
                                        key={c.slug}
                                        href={`/locations/${c.slug}`}
                                        className="inline-flex items-center gap-1.5 rounded-full bg-cream px-4 py-2 text-sm font-medium text-[var(--color-secondary)] hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] transition-colors"
                                    >
                                        <MapPin className="w-3.5 h-3.5" />
                                        {c.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
