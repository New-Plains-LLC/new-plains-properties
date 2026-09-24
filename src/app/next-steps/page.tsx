import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import { ArrowLeft, CheckCircle2, PhoneCall } from "lucide-react";
import { SITE } from "@/lib/site";

export const metadata = {
    title: "Next Steps | New Plains Properties",
    description: "Thank you for reaching out. Here is what to expect next.",
    robots: { index: false },
};

const steps = [
    "We research your property: recent sales nearby, county records, and condition.",
    `We call you from ${SITE.phone} within 24 hours to ask a few questions.`,
    "We present a written, no-obligation cash offer and explain how we got there.",
    "If it works for you, you pick the closing date. That's it.",
];

export default function NextStepsPage() {
    const caller = SITE.owners.firstNames || "Our family";

    return (
        <div className="min-h-screen flex flex-col bg-cream">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-16">
                <div className="bg-white p-6 sm:p-10 rounded-2xl border border-gray-100 max-w-xl w-full">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-[var(--color-secondary)] mb-4">We&apos;ve Received Your Info!</h1>
                        <p className="text-gray-600 text-lg">
                            Thank you for reaching out. We&apos;ll be in touch within <strong>24 hours</strong>.
                        </p>
                    </div>

                    <div className="mt-8 flex items-center gap-4 rounded-xl bg-cream p-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-white">
                            <Image src="/Family.jpeg" alt="The New Plains Properties family" fill sizes="64px" className="object-cover" />
                        </div>
                        <p className="text-[var(--color-secondary)]">
                            <span className="font-bold">{caller} will call you personally</span>{" "}
                            <span className="text-gray-600">
                                from <span className="font-semibold whitespace-nowrap">{SITE.phone}</span>. Save it so you know it&apos;s us.
                            </span>
                        </p>
                    </div>

                    <h2 className="mt-8 mb-4 font-bold text-[var(--color-secondary)]">What happens next</h2>
                    <ol className="space-y-4">
                        {steps.map((step, i) => (
                            <li key={step} className="flex gap-3">
                                <span className="w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                                    {i + 1}
                                </span>
                                <span className="text-gray-700 pt-0.5">{step}</span>
                            </li>
                        ))}
                    </ol>

                    <div className="mt-10 space-y-3">
                        <a
                            href={SITE.phoneHref}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-secondary)] px-6 py-3 text-white font-semibold hover:bg-[var(--color-secondary)]/90 transition-all hover:-translate-y-0.5 w-full"
                        >
                            <PhoneCall className="w-4 h-4" />
                            Need us sooner? Call {SITE.phone}
                        </a>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center w-full py-3 text-[var(--color-primary)] font-medium hover:text-[var(--color-primary-dark)] transition-colors gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Return Home
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
