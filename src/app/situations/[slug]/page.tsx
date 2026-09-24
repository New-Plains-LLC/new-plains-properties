import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, PhoneCall } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SituationIcon from "@/components/SituationIcon";
import { SITUATIONS, getSituation } from "@/lib/situations";
import { SITE } from "@/lib/site";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return SITUATIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const situation = getSituation((await params).slug);
    if (!situation) return {};
    return {
        title: `${situation.title} | ${SITE.name}`,
        description: situation.metaDescription,
        alternates: { canonical: `/situations/${situation.slug}` },
    };
}

export default async function SituationPage({ params }: Props) {
    const situation = getSituation((await params).slug);
    if (!situation) notFound();

    const ctaHref = situation.leadType === "land" ? "/sell-land" : "/sell-property";
    const others = SITUATIONS.filter((s) => s.slug !== situation.slug);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-1">
                <section className="bg-[var(--color-secondary)] text-white py-20 md:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary)]/20 flex items-center justify-center mx-auto mb-6">
                            <SituationIcon icon={situation.icon} className="w-8 h-8 text-[var(--color-primary)]" strokeWidth={1.75} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{situation.title}</h1>
                        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10">{situation.intro}</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={ctaHref}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-8 py-4 text-lg font-semibold text-white hover:bg-[var(--color-primary-dark)] transition-all hover:-translate-y-0.5"
                            >
                                Get My Cash Offer
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <a
                                href={SITE.phoneHref}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-all"
                            >
                                <PhoneCall className="w-5 h-5" />
                                {SITE.phone}
                            </a>
                        </div>
                    </div>
                </section>

                <section className="py-16 md:py-20">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-12">
                        <div className="md:col-span-2">
                            <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-5">Sound familiar?</h2>
                            <ul className="space-y-3">
                                {situation.challenges.map((c) => (
                                    <li key={c} className="flex items-start gap-3 text-gray-700">
                                        <CheckCircle2 className="w-5 h-5 mt-0.5 text-[var(--color-primary)] flex-shrink-0" />
                                        {c}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="md:col-span-3">
                            <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-5">How we help</h2>
                            <div className="space-y-4">
                                {situation.howWeHelp.map((h) => (
                                    <div key={h.title} className="rounded-xl bg-cream p-6">
                                        <h3 className="font-bold text-[var(--color-secondary)] mb-1">{h.title}</h3>
                                        <p className="text-gray-600">{h.body}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="pb-20">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-lg font-bold text-[var(--color-secondary)] mb-4">Other situations we help with</h2>
                        <div className="flex flex-wrap gap-3">
                            {others.map((s) => (
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
                </section>
            </main>
            <Footer />
        </div>
    );
}
