import { Suspense } from "react";
import { CircleDollarSign, Clock, PhoneCall, Wrench } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import { SITE } from "@/lib/site";

const promises = [
    { icon: CircleDollarSign, text: "No commissions or closing costs" },
    { icon: Wrench, text: "Sell as-is, no repairs or clean-out" },
    { icon: Clock, text: "Close in as little as 7 days" },
];

export default function SellPageLayout({ type }: { type: "land" | "property" }) {
    return (
        <div className="min-h-screen flex flex-col bg-cream">
            <Header />
            <main className="flex-1 py-12 md:py-16 px-4">
                <Suspense>
                    <LeadForm type={type} />
                </Suspense>

                <div className="max-w-xl mx-auto mt-8 flex flex-col gap-3">
                    {promises.map(({ icon: Icon, text }) => (
                        <div key={text} className="flex items-center gap-3 text-gray-700">
                            <Icon className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0" />
                            <span>{text}</span>
                        </div>
                    ))}
                    <a
                        href={SITE.phoneHref}
                        className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[var(--color-secondary)]/15 px-6 py-3 font-semibold text-[var(--color-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                    >
                        <PhoneCall className="w-4 h-4" />
                        Rather talk? Call {SITE.phone}
                    </a>
                </div>
            </main>
            <Footer />
        </div>
    );
}
