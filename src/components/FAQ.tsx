"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQS } from "@/lib/faq";
import { SITE } from "@/lib/site";

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <section id="faq" className="py-20 md:py-24 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="text-[var(--color-primary)] font-bold tracking-wider text-sm">FAQ</span>
                    <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[var(--color-secondary)] mb-4">Questions sellers ask us</h2>
                    <p className="text-lg text-gray-600">
                        Don&apos;t see yours? Call us at{" "}
                        <a href={SITE.phoneHref} className="font-semibold text-[var(--color-primary)] hover:underline">
                            {SITE.phone}
                        </a>
                        .
                    </p>
                </div>

                <div className="space-y-3">
                    {FAQS.map((faq, i) => {
                        const isOpen = open === i;
                        return (
                            <div
                                key={faq.q}
                                className={`rounded-xl border transition-colors ${isOpen ? "border-[var(--color-primary)]/40 bg-cream" : "border-gray-200 hover:border-gray-300"}`}
                            >
                                <h3>
                                    <button
                                        type="button"
                                        onClick={() => setOpen(isOpen ? null : i)}
                                        aria-expanded={isOpen}
                                        aria-controls={`faq-panel-${i}`}
                                        id={`faq-button-${i}`}
                                        className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 md:px-6 md:py-5 font-semibold text-[var(--color-secondary)] md:text-lg"
                                    >
                                        {faq.q}
                                        <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
                                            <Plus className="w-5 h-5 text-[var(--color-primary)]" />
                                        </motion.span>
                                    </button>
                                </h3>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            id={`faq-panel-${i}`}
                                            role="region"
                                            aria-labelledby={`faq-button-${i}`}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25, ease: "easeOut" }}
                                            className="overflow-hidden"
                                        >
                                            <p className="px-5 pb-5 md:px-6 text-gray-600 leading-relaxed">{faq.a}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
