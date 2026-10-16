"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const rows = [
    { label: "Commissions", realtor: "5–6% of sale price", us: "None" },
    { label: "Closing costs", realtor: "Typically 1–3% paid by seller", us: "We cover them" },
    { label: "Repairs & clean-out", realtor: "Often required to sell", us: "None, we buy as-is" },
    { label: "Showings & open houses", realtor: "Weeks of strangers in your home", us: "One walkthrough" },
    { label: "Time to close", realtor: "Often 60–120 days incl. listing", us: "As few as 7 days" },
    { label: "Deal falls through", realtor: "Possible if buyer financing fails", us: "Cash, no lender" },
    { label: "Closing date", realtor: "Set by the buyer's lender", us: "You choose" },
];

export default function Comparison() {
    return (
        <section id="compare" className="py-20 md:py-24 bg-cream">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="text-[var(--color-primary)] font-bold tracking-wider text-sm">THE HONEST COMPARISON</span>
                    <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[var(--color-secondary)] mb-4">Listing with a realtor vs. selling to us</h2>
                    <p className="text-lg text-gray-600">
                        A listing can sometimes bring a higher sticker price. Here&apos;s what it costs to get there, so you can compare what you actually walk away with.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="rounded-2xl overflow-hidden border border-gray-200 bg-white"
                >
                    <div className="grid grid-cols-[1fr_1fr_1fr] text-sm md:text-base">
                        <div className="p-4 md:p-5" />
                        <div className="p-4 md:p-5 font-bold text-gray-500 text-center">Traditional Listing</div>
                        <div className="p-4 md:p-5 font-bold text-white text-center bg-[var(--color-primary)]">New Plains</div>

                        {rows.map((row, i) => (
                            <div key={row.label} className="contents group">
                                <div className={`p-4 md:p-5 font-semibold text-[var(--color-secondary)] ${i % 2 === 0 ? "bg-gray-50" : ""}`}>{row.label}</div>
                                <div className={`p-4 md:p-5 text-gray-600 flex items-start gap-2 ${i % 2 === 0 ? "bg-gray-50" : ""}`}>
                                    <X className="w-4 h-4 mt-1 text-red-400 flex-shrink-0 hidden sm:block" />
                                    <span>{row.realtor}</span>
                                </div>
                                <div className={`p-4 md:p-5 font-semibold text-[var(--color-secondary)] flex items-start gap-2 ${i % 2 === 0 ? "bg-[var(--color-primary)]/10" : "bg-[var(--color-primary)]/5"}`}>
                                    <Check className="w-4 h-4 mt-1 text-[var(--color-primary)] flex-shrink-0 hidden sm:block" />
                                    <span>{row.us}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <p className="mt-4 text-xs text-gray-500 text-center">
                    Listing costs are typical ranges and vary by property and agent.
                </p>
            </div>
        </section>
    );
}
