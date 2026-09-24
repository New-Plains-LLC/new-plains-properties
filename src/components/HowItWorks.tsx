"use client";

import { motion } from "framer-motion";
import { ClipboardList, HandCoins, KeyRound } from "lucide-react";
import Link from "next/link";

const steps = [
    {
        icon: ClipboardList,
        title: "Tell us about it",
        body: "Fill out our 60-second form or give us a call. An address or parcel number is all we need to get started.",
    },
    {
        icon: HandCoins,
        title: "Get your offer in 24 hours",
        body: "We research the property and call you with a fair, no-obligation cash offer. We'll explain exactly how we got there.",
    },
    {
        icon: KeyRound,
        title: "Close on your date",
        body: "Accept and pick your closing day, as soon as 7 days out. We handle the paperwork with a local title company.",
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-20 md:py-24 bg-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <span className="text-[var(--color-primary)] font-bold tracking-wider text-sm">HOW IT WORKS</span>
                    <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[var(--color-secondary)] mb-4">Three simple steps. No surprises.</h2>
                    <p className="text-lg text-gray-600">You stay in control the whole way. If our offer isn&apos;t right for you, just say so.</p>
                </div>

                <ol className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
                    <motion.div
                        aria-hidden
                        className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-0.5 bg-[var(--color-primary)]/30 origin-left"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                    />
                    {steps.map((step, i) => (
                        <motion.li
                            key={step.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: i * 0.25, ease: "easeOut" }}
                            className="relative flex flex-col items-center text-center"
                        >
                            <div className="relative z-10 w-16 h-16 rounded-2xl bg-[var(--color-primary)] text-white flex items-center justify-center mb-6 ring-8 ring-cream">
                                <step.icon className="w-8 h-8" strokeWidth={1.75} />
                                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[var(--color-secondary)] text-white text-sm font-bold flex items-center justify-center">
                                    {i + 1}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-[var(--color-secondary)] mb-3">{step.title}</h3>
                            <p className="text-gray-600 leading-relaxed max-w-sm">{step.body}</p>
                        </motion.li>
                    ))}
                </ol>

                <div className="mt-14 flex justify-center">
                    <Link
                        href="/sell-property"
                        className="inline-flex items-center justify-center rounded-xl bg-[var(--color-secondary)] px-8 py-4 text-lg font-semibold text-white hover:bg-[var(--color-secondary)]/90 transition-all hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Start Step 1
                    </Link>
                </div>
            </div>
        </section>
    );
}
