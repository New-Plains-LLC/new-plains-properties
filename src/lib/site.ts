export const SITE = {
    name: "New Plains Properties",
    // Registered entity name (e.g. "New Plains Properties LLC"). Shown in the footer and structured data when set.
    legalName: "",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://newplainsproperties.com",
    tagline: "Improving communities, one property at a time.",
    description:
        "Family-owned real estate company in Oklahoma. We buy land nationwide and houses locally. Fast cash closings, no commissions, bought as-is.",
    phone: "(405) 607-9563",
    phoneHref: "tel:+14056079563",
    // Leave blank to hide from the footer and structured data.
    email: "",
    address: {
        street: "",
        city: "",
        region: "OK",
        postalCode: "",
    },
    // Shown on the owners' note and the Next Steps page.
    owners: {
        signature: "The New Plains Family",
        firstNames: "",
    },
};

export type City = {
    slug: string;
    name: string;
    county: string;
    lat: number;
    lng: number;
};

export const CITIES: City[] = [
    { slug: "chickasha", name: "Chickasha", county: "Grady County", lat: 35.0526, lng: -97.9364 },
    { slug: "tuttle", name: "Tuttle", county: "Grady County", lat: 35.2909, lng: -97.812 },
    { slug: "amber", name: "Amber", county: "Grady County", lat: 35.1609, lng: -97.8834 },
    { slug: "pocasset", name: "Pocasset", county: "Grady County", lat: 35.1876, lng: -97.9559 },
    { slug: "newcastle", name: "Newcastle", county: "McClain County", lat: 35.2473, lng: -97.5998 },
    { slug: "mustang", name: "Mustang", county: "Canadian County", lat: 35.3842, lng: -97.7245 },
    { slug: "minco", name: "Minco", county: "Grady County", lat: 35.3128, lng: -97.9445 },
];

export function getCity(slug: string) {
    return CITIES.find((c) => c.slug === slug);
}
