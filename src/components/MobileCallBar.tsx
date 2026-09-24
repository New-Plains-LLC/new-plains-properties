"use client";

import { FileText, PhoneCall } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";

const FORM_PATHS = ["/sell-land", "/sell-property", "/next-steps"];

export default function MobileCallBar() {
    const pathname = usePathname();
    const onFormPage = FORM_PATHS.some((p) => pathname.startsWith(p));

    return (
        <div className="md:hidden fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur-md px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <div className="flex gap-3">
                <a
                    href={SITE.phoneHref}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-secondary)] py-3 font-semibold text-white active:scale-[0.98] transition-transform"
                >
                    <PhoneCall className="w-5 h-5" />
                    Call Now
                </a>
                {!onFormPage && (
                    <Link
                        href="/sell-property"
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] py-3 font-semibold text-white active:scale-[0.98] transition-transform"
                    >
                        <FileText className="w-5 h-5" />
                        Get My Offer
                    </Link>
                )}
            </div>
        </div>
    );
}
