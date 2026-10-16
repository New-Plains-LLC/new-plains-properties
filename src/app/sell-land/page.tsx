import SellPageLayout from "@/components/SellPageLayout";

export const metadata = {
    title: "Sell Your Land | New Plains Properties",
    description: "Get a fast, fair cash offer for your land. No commissions, no hassle. We buy land nationwide.",
    alternates: { canonical: "/sell-land" },
};

export default function SellLandPage() {
    return <SellPageLayout type="land" />;
}
