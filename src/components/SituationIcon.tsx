import { HeartCrack, KeyRound, Receipt, ScrollText, Trees, type LucideProps } from "lucide-react";
import type { Situation } from "@/lib/situations";

const ICONS = {
    scroll: ScrollText,
    "heart-crack": HeartCrack,
    receipt: Receipt,
    key: KeyRound,
    trees: Trees,
} satisfies Record<Situation["icon"], React.ComponentType<LucideProps>>;

export default function SituationIcon({ icon, ...props }: { icon: Situation["icon"] } & LucideProps) {
    const Icon = ICONS[icon];
    return <Icon {...props} />;
}
