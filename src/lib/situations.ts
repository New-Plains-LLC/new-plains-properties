export type Situation = {
    slug: string;
    title: string;
    shortTitle: string;
    icon: "scroll" | "heart-crack" | "receipt" | "key" | "trees";
    leadType: "land" | "property";
    metaDescription: string;
    intro: string;
    challenges: string[];
    howWeHelp: { title: string; body: string }[];
};

export const SITUATIONS: Situation[] = [
    {
        slug: "inherited-property",
        title: "Selling an Inherited House or Land",
        shortTitle: "Inherited Property",
        icon: "scroll",
        leadType: "property",
        metaDescription:
            "Inherited a house or land in Oklahoma? New Plains Properties buys inherited property as-is for cash. No clean-out, no repairs, no realtor commissions.",
        intro:
            "Losing a loved one is hard enough without also having to manage a house full of belongings, deferred repairs, and a list of relatives who all need to agree. We make the property side simple so you can focus on your family.",
        challenges: [
            "The house is full of a lifetime of belongings",
            "Repairs were put off for years",
            "Several heirs need to agree and split proceeds",
            "You live out of town and can't manage the property",
            "Probate or title questions you're not sure how to handle",
        ],
        howWeHelp: [
            {
                title: "Leave what you don't want",
                body: "Take the keepsakes and leave the rest. We handle the clean-out after closing.",
            },
            {
                title: "One offer, easy to share",
                body: "We put our offer in writing so every heir can see the same numbers and decide together.",
            },
            {
                title: "We work with your attorney",
                body: "If the estate is still in probate, we coordinate with your attorney and title company on timing.",
            },
        ],
    },
    {
        slug: "divorce",
        title: "Selling a House During a Divorce",
        shortTitle: "Divorce",
        icon: "heart-crack",
        leadType: "property",
        metaDescription:
            "Need to sell a house during a divorce in Oklahoma? Get a fair, fast cash offer with no showings or repairs. Close on a date that works for both parties.",
        intro:
            "When a marriage ends, the house is often the biggest shared asset and the hardest thing to untangle. A quick, clean sale with a clear number lets both sides move forward.",
        challenges: [
            "Two people need to agree on price and timing",
            "Months of showings keep the situation dragging on",
            "Neither party wants to pay for repairs",
            "The mortgage still needs to be paid while it sits",
        ],
        howWeHelp: [
            {
                title: "A clear, written number",
                body: "Both parties see the same offer, which makes agreement easier and keeps attorneys focused.",
            },
            {
                title: "No showings, no open houses",
                body: "We walk the property once. No strangers in your home for weeks.",
            },
            {
                title: "Close when the decree allows",
                body: "Pick the closing date that fits your settlement timeline.",
            },
        ],
    },
    {
        slug: "back-taxes",
        title: "Selling Property With Back Taxes or Liens",
        shortTitle: "Back Taxes & Liens",
        icon: "receipt",
        leadType: "land",
        metaDescription:
            "Behind on property taxes or have liens on your land or house? New Plains Properties can buy it and pay off what's owed at closing.",
        intro:
            "Falling behind on property taxes happens, especially on land you don't use or a house you inherited. Before the county takes action, selling can let you walk away with cash instead of nothing.",
        challenges: [
            "Delinquent county property taxes",
            "Contractor, judgment, or utility liens",
            "Worried about a tax sale deadline",
            "Not sure how much equity is left",
        ],
        howWeHelp: [
            {
                title: "Paid off at closing",
                body: "Taxes and liens are paid out of the sale through the title company, so you don't need cash up front.",
            },
            {
                title: "We move quickly",
                body: "When there's a deadline, we prioritize getting you an offer and a closing date fast.",
            },
            {
                title: "Straight answers",
                body: "We'll walk you through what's owed and what you'd walk away with before you commit to anything.",
            },
        ],
    },
    {
        slug: "tired-landlord",
        title: "Selling a Rental Property",
        shortTitle: "Tired Landlords",
        icon: "key",
        leadType: "property",
        metaDescription:
            "Tired of being a landlord in Oklahoma? We buy rental houses with or without tenants, as-is, for cash. No repairs, no commissions.",
        intro:
            "Late rent, midnight repair calls, turnover costs. If owning a rental stopped being worth it, we'll buy it as it sits, tenants and all.",
        challenges: [
            "Problem tenants or tenants behind on rent",
            "Deferred maintenance adding up",
            "A vacant unit costing you every month",
            "You'd rather not do repairs just to list it",
        ],
        howWeHelp: [
            {
                title: "Tenants can stay",
                body: "We can buy with tenants in place. No need to wait for a lease to end.",
            },
            {
                title: "As-is means as-is",
                body: "Skip the make-ready and turnover repairs. We take care of it after closing.",
            },
            {
                title: "No commissions",
                body: "Keep the money you'd normally hand to agents on both sides of the deal.",
            },
        ],
    },
    {
        slug: "rural-land",
        title: "Selling Rural Land & Acreage",
        shortTitle: "Rural Land",
        icon: "trees",
        leadType: "land",
        metaDescription:
            "Sell your vacant land or rural acreage for cash. New Plains Properties buys land nationwide with no commissions, no surveys required up front, and fast closings.",
        intro:
            "Vacant land can be hard to sell through a realtor. Listings sit for months and buyers need financing that's tough to get for raw land. We buy land nationwide with cash and handle the details.",
        challenges: [
            "Land you inherited or bought years ago and never used",
            "Paying taxes on acreage that doesn't earn anything",
            "No road access, utilities, or recent survey",
            "It's in another state and you can't visit",
        ],
        howWeHelp: [
            {
                title: "We buy land anywhere",
                body: "From a few acres in Grady County to land out of state, we buy nationwide.",
            },
            {
                title: "Just send us the parcel number",
                body: "A parcel number, address, or GPS pin is enough for us to research it and make an offer.",
            },
            {
                title: "Close remotely",
                body: "Most land closings can be done by mail or with a mobile notary, so you never have to travel.",
            },
        ],
    },
];

export function getSituation(slug: string) {
    return SITUATIONS.find((s) => s.slug === slug);
}
