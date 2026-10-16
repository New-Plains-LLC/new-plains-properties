import SellPageLayout from "@/components/SellPageLayout";

export const metadata = {
    title: "Sell Your Property | New Plains Properties",
    description: "Get a fast cash offer for your property exactly as it is. No realtor commissions, no repairs required. We buy locally in Oklahoma.",
    alternates: { canonical: "/sell-property" },
};

export default function SellPropertyPage() {
    return <SellPageLayout type="property" />;
}
