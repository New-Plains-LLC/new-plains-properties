"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SITE } from "@/lib/site";

export default function AboutUs() {
    return (
        <section id="about" className="py-24 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
                            <Image
                                src="/Family.jpeg"
                                alt="The family behind New Plains Properties"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Decorative element */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[var(--color-primary)]/10 rounded-full blur-2xl -z-10" />
                        <div className="absolute -top-6 -left-6 w-32 h-32 bg-[var(--color-secondary)]/5 rounded-full blur-2xl -z-10" />

                        <div className="absolute -bottom-8 right-8 bg-white p-6 rounded-xl shadow-xl border border-gray-50 max-w-sm">
                            <p className="font-bold text-[var(--color-secondary)] text-lg mb-1">Local & Family Owned.</p>
                            <p className="text-sm text-gray-500">Working with friends to improve our communities, one property at a time.</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="flex flex-col justify-center"
                    >
                        <span className="text-[var(--color-primary)] font-bold tracking-wider text-sm mb-3">A NOTE FROM OUR FAMILY</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-secondary)] mb-6 leading-tight">
                            We Are Not A Faceless Corporation.
                        </h2>

                        <div className="relative rounded-2xl bg-cream p-6 md:p-8">
                            <div className="space-y-5 text-lg text-gray-700 leading-relaxed">
                                <p>
                                    {SITE.owners.firstNames ? `Hi, we're ${SITE.owners.firstNames}.` : "Hi, neighbor."} New Plains Properties is our family business, and Oklahoma is home. We started it because we saw too many people stuck with property they couldn&apos;t sell the traditional way, and too many good houses sitting empty in the towns we love.
                                </p>
                                <p>
                                    When you call us, you&apos;re talking to the people who make the decisions. No call centers, no high-pressure tactics. Just an honest conversation and a fair offer.
                                </p>
                                <p>
                                    Whether you say yes or not, we&apos;ll treat you the way we&apos;d want our own family treated.
                                </p>
                            </div>

                            <p className="mt-6 font-signature text-4xl md:text-5xl text-[var(--color-secondary)] -rotate-2 origin-left">
                                {SITE.owners.signature}
                            </p>
                        </div>

                        <div className="mt-8">
                            <a
                                href={SITE.phoneHref}
                                className="inline-flex items-center justify-center rounded-xl bg-[var(--color-secondary)] px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-[var(--color-secondary)]/90 transition-all hover:-translate-y-1 active:translate-y-0"
                            >
                                Call Us Directly: {SITE.phone}
                            </a>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
