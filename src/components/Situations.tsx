"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import SituationIcon from "@/components/SituationIcon";
import { SITUATIONS } from "@/lib/situations";

export default function Situations() {
    return (
        <section id="situations" className="py-20 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="text-[var(--color-primary)] font-bold tracking-wider text-sm">WHATEVER YOUR SITUATION</span>
                    <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[var(--color-secondary)] mb-4">Selling isn&apos;t always simple. We can help.</h2>
                    <p className="text-lg text-gray-600">Life doesn&apos;t always line up with a traditional sale. Here&apos;s how we help in the situations we see most.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                    {SITUATIONS.map((s, i) => (
                        <motion.div
                            key={s.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                        >
                            <Link
                                href={`/situations/${s.slug}`}
                                className="group flex h-full flex-col rounded-xl border border-gray-200 p-4 md:p-6 transition-all hover:-translate-y-1 hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-primary)]/5"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <SituationIcon icon={s.icon} className="w-6 h-6 text-[var(--color-primary)]" strokeWidth={1.75} />
                                </div>
                                <h3 className="font-bold text-[var(--color-secondary)] mb-2">{s.shortTitle}</h3>
                                <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)]">
                                    Learn more
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
