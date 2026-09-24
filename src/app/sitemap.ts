import type { MetadataRoute } from "next";
import { CITIES, SITE } from "@/lib/site";
import { SITUATIONS } from "@/lib/situations";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();
    const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
        url: `${SITE.url}${path}`,
        lastModified,
        priority,
    });

    return [
        page("/", 1),
        page("/sell-land", 0.9),
        page("/sell-property", 0.9),
        ...CITIES.map((c) => page(`/locations/${c.slug}`, 0.8)),
        ...SITUATIONS.map((s) => page(`/situations/${s.slug}`, 0.7)),
        page("/privacy", 0.2),
        page("/terms", 0.2),
    ];
}
