"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Globe2, MapPin } from "lucide-react";
import Link from "next/link";
import { CITIES } from "@/lib/site";

// Map bounds (degrees) and viewBox size. Width is scaled by cos(35°) so distances look right.
const BOUNDS = { west: -98.1, east: -97.4, north: 35.55, south: 34.95 };
const W = 573;
const H = 600;

function project(lat: number, lng: number) {
    return {
        x: ((lng - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * W,
        y: ((BOUNDS.north - lat) / (BOUNDS.north - BOUNDS.south)) * H,
    };
}

const OKC = project(35.4676, -97.5164);
const I44 = [project(35.4676, -97.5164), project(35.2473, -97.6198), project(35.0526, -97.9164)];
const I40 = [project(35.4676, -97.5164), project(35.4776, -97.75), project(35.5, -98.1)];
const toPath = (pts: { x: number; y: number }[]) => pts.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

export default function ServiceMap() {
    const [active, setActive] = useState<string | null>(null);

    return (
        <section id="areas" className="py-20 md:py-24 bg-cream overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12 items-center">
                <div className="w-full lg:w-5/12">
                    <span className="text-[var(--color-primary)] font-bold tracking-wider text-sm">AREAS WE SERVE</span>
                    <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[var(--color-secondary)] mb-4">Your neighbors in central Oklahoma</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        We buy houses and commercial property in these communities, and we know them well. Pick your town to see how we can help.
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                        {CITIES.map((city) => (
                            <Link
                                key={city.slug}
                                href={`/locations/${city.slug}`}
                                onMouseEnter={() => setActive(city.slug)}
                                onMouseLeave={() => setActive(null)}
                                onFocus={() => setActive(city.slug)}
                                onBlur={() => setActive(null)}
                                className={`group flex items-center gap-2 rounded-xl border px-4 py-3 font-semibold transition-all hover:-translate-y-0.5 ${
                                    active === city.slug
                                        ? "border-[var(--color-primary)] bg-white text-[var(--color-primary)]"
                                        : "border-gray-200 bg-white text-[var(--color-secondary)]"
                                }`}
                            >
                                <MapPin className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0" />
                                {city.name}
                                <ArrowRight className="w-4 h-4 ml-auto opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </Link>
                        ))}
                    </div>

                    <div className="mt-6 flex items-start gap-3 rounded-xl bg-[var(--color-secondary)] p-5 text-white">
                        <Globe2 className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0" />
                        <p>
                            <span className="font-bold">Selling land elsewhere?</span>{" "}
                            <span className="text-gray-300">We buy land nationwide. </span>
                            <Link href="/sell-land" className="font-semibold text-[var(--color-primary)] hover:underline">
                                Get a land offer
                            </Link>
                        </p>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full lg:w-7/12 max-w-xl mx-auto"
                >
                    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto rounded-2xl bg-white border border-gray-200" role="img" aria-labelledby="map-title">
                        <title id="map-title">Map of central Oklahoma towns served by New Plains Properties</title>
                        <defs>
                            <pattern id="section-grid" width="41" height="43" patternUnits="userSpaceOnUse">
                                <path d="M41 0H0V43" fill="none" stroke="#2d2001" strokeOpacity="0.06" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width={W} height={H} fill="url(#section-grid)" />

                        <motion.path
                            d={toPath(I44)}
                            fill="none"
                            stroke="#2d2001"
                            strokeOpacity="0.18"
                            strokeWidth="5"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.6, ease: "easeInOut", delay: 0.3 }}
                        />
                        <motion.path
                            d={toPath(I40)}
                            fill="none"
                            stroke="#2d2001"
                            strokeOpacity="0.18"
                            strokeWidth="5"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.6, ease: "easeInOut", delay: 0.3 }}
                        />
                        <text x={I40[2].x + 20} y={I40[2].y - 12} fontSize="13" fontWeight="700" fill="#2d2001" fillOpacity="0.35">
                            I-40
                        </text>
                        <text x={I44[1].x - 44} y={I44[1].y + 44} fontSize="13" fontWeight="700" fill="#2d2001" fillOpacity="0.35">
                            I-44
                        </text>

                        <g>
                            <rect x={OKC.x - 7} y={OKC.y - 7} width="14" height="14" rx="3" fill="#2d2001" />
                            <text x={OKC.x - 14} y={OKC.y - 16} textAnchor="end" fontSize="15" fontWeight="700" fill="#2d2001" fillOpacity="0.7">
                                Oklahoma City
                            </text>
                        </g>

                        {CITIES.map((city, i) => {
                            const { x, y } = project(city.lat, city.lng);
                            const isActive = active === city.slug;
                            const labelLeft = x > W * 0.6;
                            return (
                                <a
                                    key={city.slug}
                                    href={`/locations/${city.slug}`}
                                    onMouseEnter={() => setActive(city.slug)}
                                    onMouseLeave={() => setActive(null)}
                                    aria-label={`Sell your property in ${city.name}`}
                                    className="cursor-pointer outline-none"
                                >
                                    <motion.g
                                        initial={{ opacity: 0, y: -12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.8 + i * 0.12, ease: "easeOut" }}
                                    >
                                        <circle cx={x} cy={y} r="11" fill="#ea8c08" fillOpacity="0.35" className="animate-ping-slow" style={{ animationDelay: `${i * 0.3}s` }} />
                                        <circle
                                            cx={x}
                                            cy={y}
                                            r={isActive ? 13 : 9}
                                            fill={isActive ? "#2d2001" : "#ea8c08"}
                                            stroke="white"
                                            strokeWidth="3"
                                            style={{ transition: "r 200ms, fill 200ms" }}
                                        />
                                        <text
                                            x={labelLeft ? x - 18 : x + 18}
                                            y={y + 5}
                                            textAnchor={labelLeft ? "end" : "start"}
                                            fontSize={isActive ? 18 : 16}
                                            fontWeight="700"
                                            fill="#2d2001"
                                            style={{ transition: "font-size 200ms", paintOrder: "stroke" }}
                                            stroke="white"
                                            strokeWidth="4"
                                        >
                                            {city.name}
                                        </text>
                                    </motion.g>
                                </a>
                            );
                        })}
                    </svg>
                </motion.div>
            </div>
        </section>
    );
}
