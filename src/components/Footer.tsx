import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import { CITIES, SITE } from "@/lib/site";
import { SITUATIONS } from "@/lib/situations";

const linkClass = "text-gray-300 hover:text-[var(--color-primary)] transition-colors";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { street, city, region, postalCode } = SITE.address;
    const hasAddress = Boolean(street && city);

    return (
        <footer className="bg-[var(--color-secondary)] text-white pt-14 pb-10 border-t border-[var(--color-primary)]/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    <div className="flex flex-col items-start">
                        <div className="relative h-16 w-52 mb-4 bg-white rounded-2xl p-4 flex items-center justify-center">
                            <div className="relative w-full h-full p-2">
                                <Image src="/NewPlains2.png" alt={SITE.name} fill className="object-contain" />
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-5">{SITE.tagline}</p>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a href={SITE.phoneHref} className={`inline-flex items-center gap-2 font-semibold ${linkClass}`}>
                                    <PhoneCall className="w-4 h-4 text-[var(--color-primary)]" />
                                    {SITE.phone}
                                </a>
                            </li>
                            {SITE.email && (
                                <li>
                                    <a href={`mailto:${SITE.email}`} className={`inline-flex items-center gap-2 ${linkClass}`}>
                                        <Mail className="w-4 h-4 text-[var(--color-primary)]" />
                                        {SITE.email}
                                    </a>
                                </li>
                            )}
                            <li className="flex items-start gap-2 text-gray-300">
                                <MapPin className="w-4 h-4 mt-0.5 text-[var(--color-primary)] flex-shrink-0" />
                                {hasAddress ? (
                                    <span>
                                        {street}
                                        <br />
                                        {city}, {region} {postalCode}
                                    </span>
                                ) : (
                                    <span>Central Oklahoma</span>
                                )}
                            </li>
                        </ul>
                    </div>

                    <nav aria-label="Sell">
                        <h2 className="text-sm font-bold tracking-wider text-[var(--color-primary)] mb-4">SELL TO US</h2>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/sell-land" className={linkClass}>Sell Your Land</Link>
                            </li>
                            <li>
                                <Link href="/sell-property" className={linkClass}>Sell Your Property</Link>
                            </li>
                            <li>
                                <Link href="/#how-it-works" className={linkClass}>How It Works</Link>
                            </li>
                            <li>
                                <Link href="/#faq" className={linkClass}>FAQ</Link>
                            </li>
                        </ul>
                    </nav>

                    <nav aria-label="Situations">
                        <h2 className="text-sm font-bold tracking-wider text-[var(--color-primary)] mb-4">SITUATIONS</h2>
                        <ul className="space-y-2.5 text-sm">
                            {SITUATIONS.map((s) => (
                                <li key={s.slug}>
                                    <Link href={`/situations/${s.slug}`} className={linkClass}>{s.shortTitle}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <nav aria-label="Areas we serve">
                        <h2 className="text-sm font-bold tracking-wider text-[var(--color-primary)] mb-4">AREAS WE SERVE</h2>
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
                            {CITIES.map((c) => (
                                <li key={c.slug}>
                                    <Link href={`/locations/${c.slug}`} className={linkClass}>{c.name}, OK</Link>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-4 text-sm text-gray-400">Plus land purchases nationwide.</p>
                    </nav>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-700/50 flex flex-col md:flex-row gap-4 justify-between items-center text-sm text-gray-500">
                    <p>
                        &copy; {currentYear} {SITE.legalName || SITE.name}. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className={linkClass}>Privacy Policy</Link>
                        <Link href="/terms" className={linkClass}>Terms & Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
