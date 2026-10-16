"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Home, MapPin } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2832&q=80";
const SLIDE_MS = 7000;

// Alternate pan directions so consecutive slides don't drift the same way.
const PANS = [
    { from: { scale: 1, x: "0%", y: "0%" }, to: { scale: 1.12, x: "-2%", y: "-1%" } },
    { from: { scale: 1.12, x: "2%", y: "0%" }, to: { scale: 1, x: "0%", y: "1%" } },
    { from: { scale: 1, x: "0%", y: "1%" }, to: { scale: 1.12, x: "2%", y: "-1%" } },
];

export default function Hero({ images }: { images: string[] }) {
    const router = useRouter();
    const reduceMotion = useReducedMotion();
    const slides = images.length > 0 ? images : [FALLBACK_IMAGE];
    const [index, setIndex] = useState(0);
    const [address, setAddress] = useState("");

    useEffect(() => {
        if (slides.length < 2 || reduceMotion) return;
        const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS);
        return () => clearInterval(id);
    }, [slides.length, reduceMotion]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
        const path = submitter?.value === "land" ? "/sell-land" : "/sell-property";
        const trimmed = address.trim();
        router.push(trimmed ? `${path}?address=${encodeURIComponent(trimmed)}` : path);
    };

    const pan = PANS[index % PANS.length];

    return (
        <section className="relative min-h-[92vh] w-full overflow-hidden flex items-center justify-center py-20">
            <div className="absolute inset-0 z-0">
                <AnimatePresence initial={false}>
                    <motion.div
                        key={slides[index]}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    >
                        <motion.div
                            className="absolute inset-0"
                            initial={reduceMotion ? false : pan.from}
                            animate={reduceMotion ? undefined : pan.to}
                            transition={{ duration: (SLIDE_MS + 1500) / 1000, ease: "linear" }}
                        >
                            <Image
                                src={slides[index]}
                                alt="Aerial drone photo of land purchased by New Plains Properties"
                                fill
                                priority={index === 0}
                                sizes="100vw"
                                className="object-cover"
                            />
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/70" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white flex flex-col items-center w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-3xl"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary)] backdrop-blur-md mb-6 font-semibold tracking-wider text-sm border border-[var(--color-primary)]/30">
                        FAMILY-OWNED & OPERATED
                    </span>

                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
                        We buy land and property. <br className="hidden md:block" />
                        <span className="text-[var(--color-primary)]">Fair cash offers, zero hassle.</span>
                    </h1>

                    <p className="mt-4 text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
                        Skip the realtors and the repairs. We are your neighbors working to improve our communities with fast, off-market purchases tailored to your timeline.
                    </p>
                </motion.div>

                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="w-full max-w-4xl rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-3 md:p-4"
                >
                    <label htmlFor="hero-address" className="sr-only">
                        Property address or parcel number
                    </label>
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="relative flex-1">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            <input
                                id="hero-address"
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Property address or parcel #"
                                autoComplete="street-address"
                                className="w-full h-full min-h-14 rounded-xl bg-white pl-12 pr-4 text-base md:text-lg text-[var(--color-secondary)] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                type="submit"
                                value="land"
                                className="group flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-4 text-base md:text-lg font-semibold text-white hover:bg-[var(--color-primary-dark)] transition-all hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
                            >
                                Sell Your Land
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                type="submit"
                                value="property"
                                className="group flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-base md:text-lg font-semibold text-[var(--color-secondary)] hover:bg-gray-100 transition-all hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
                            >
                                <Home className="w-5 h-5 text-[var(--color-primary)]" />
                                Sell Your Property
                            </button>
                        </div>
                    </div>
                </motion.form>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-gray-200"
                >
                    <span className="inline-flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)]" />
                        Offer within 24 hours
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)]" />
                        No obligation
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)]" />
                        No fees or commissions
                    </span>
                </motion.p>
            </div>
        </section>
    );
}
