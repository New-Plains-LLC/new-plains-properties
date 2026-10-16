"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2, Lock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface LeadFormProps {
    type: "land" | "property";
}

type Option = { value: string; label: string; hint?: string };

const CHOICE_STEPS: Record<LeadFormProps["type"], { key: string; question: string; options: Option[] }[]> = {
    property: [
        {
            key: "condition",
            question: "What condition is the property in?",
            options: [
                { value: "move-in-ready", label: "Move-in ready", hint: "Updated, no major issues" },
                { value: "needs-some-work", label: "Needs some work", hint: "Cosmetic updates, minor repairs" },
                { value: "needs-major-work", label: "Needs major work", hint: "Roof, foundation, fire, water damage" },
                { value: "not-sure", label: "Not sure", hint: "We'll take a look together" },
            ],
        },
        {
            key: "timeline",
            question: "When would you like to sell?",
            options: [
                { value: "asap", label: "As soon as possible" },
                { value: "30-days", label: "Within 30 days" },
                { value: "60-90-days", label: "In 2–3 months" },
                { value: "exploring", label: "Just exploring options" },
            ],
        },
    ],
    land: [
        {
            key: "acreage",
            question: "About how many acres?",
            options: [
                { value: "under-5", label: "Under 5 acres" },
                { value: "5-20", label: "5 – 20 acres" },
                { value: "20-100", label: "20 – 100 acres" },
                { value: "100-plus", label: "100+ acres" },
            ],
        },
        {
            key: "timeline",
            question: "When would you like to sell?",
            options: [
                { value: "asap", label: "As soon as possible" },
                { value: "30-days", label: "Within 30 days" },
                { value: "60-90-days", label: "In 2–3 months" },
                { value: "exploring", label: "Just exploring options" },
            ],
        },
    ],
};

const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all";

export default function LeadForm({ type }: LeadFormProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const choiceSteps = CHOICE_STEPS[type];
    const totalSteps = choiceSteps.length + 2;

    const prefilledAddress = searchParams.get("address") ?? "";
    // Visitors who typed an address in the hero skip straight to the first question.
    const [step, setStep] = useState(prefilledAddress ? 1 : 0);
    const [direction, setDirection] = useState(1);
    const [address, setAddress] = useState(prefilledAddress);
    const [choices, setChoices] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // The outgoing step stays clickable while it animates out; this ignores taps on it.
    const currentStep = useRef(step);

    const goTo = (next: number) => {
        setDirection(next > step ? 1 : -1);
        setStep(next);
        currentStep.current = next;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const contact = Object.fromEntries(new FormData(e.currentTarget).entries());

        try {
            const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
            if (!formspreeEndpoint) {
                throw new Error("FormSpree endpoint is not configured");
            }

            const response = await fetch(formspreeEndpoint, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ address, ...choices, ...contact, lead_type: type }),
            });

            if (response.ok) {
                router.push("/next-steps");
            } else {
                setError("Oops! There was a problem submitting your form. Please try again or call us.");
            }
        } catch {
            setError("Network error. Please try again later or call us directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const title = type === "land" ? "Get a Cash Offer for Your Land" : "Get a Cash Offer for Your Property";
    const addressLabel = type === "land" ? "Where is the land?" : "What's the property address?";
    const addressHint = type === "land" ? "Parcel number, address, or GPS coordinates all work." : "Street, city, and state.";
    const addressPlaceholder = type === "land" ? "e.g., 000-00-000, 123 County Rd, or Lat/Long" : "e.g., 123 Main St, Chickasha, OK";

    const progress = ((step + 1) / totalSteps) * 100;
    const choiceStep = step >= 1 && step <= choiceSteps.length ? choiceSteps[step - 1] : null;
    const isContactStep = step === totalSteps - 1;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 max-w-xl mx-auto w-full"
        >
            <div className="text-center mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)] mb-3">{title}</h1>
                <p className="text-gray-600">Takes about 60 seconds. We&apos;ll reach out within 24 hours with a fair cash offer.</p>
            </div>

            <div className="mb-8">
                <div className="flex justify-between text-xs font-semibold text-gray-500 mb-2">
                    <span>
                        Step {step + 1} of {totalSteps}
                    </span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <motion.div
                        className="h-full rounded-full bg-[var(--color-primary)]"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                </div>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm text-center">{error}</div>
            )}

            <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                    key={step}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -40 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                >
                    {step === 0 && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                goTo(1);
                            }}
                            className="space-y-6"
                        >
                            <div>
                                <label htmlFor="address" className="block text-lg font-bold text-[var(--color-secondary)] mb-1">
                                    {addressLabel}
                                </label>
                                <p className="text-sm text-gray-500 mb-3">{addressHint}</p>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    required
                                    autoFocus
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className={inputClass}
                                    placeholder={addressPlaceholder}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-8 py-4 text-lg font-bold text-white shadow-md hover:bg-[var(--color-primary-dark)] transition-all active:translate-y-px"
                            >
                                Continue
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </form>
                    )}

                    {choiceStep && (
                        <div>
                            <p className="text-lg font-bold text-[var(--color-secondary)] mb-4">{choiceStep.question}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {choiceStep.options.map((option) => {
                                    const selected = choices[choiceStep.key] === option.value;
                                    return (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => {
                                                if (currentStep.current !== step) return;
                                                setChoices((prev) => ({ ...prev, [choiceStep.key]: option.value }));
                                                goTo(step + 1);
                                            }}
                                            className={`text-left rounded-xl border-2 px-4 py-4 transition-all hover:-translate-y-0.5 active:translate-y-0 ${
                                                selected
                                                    ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10"
                                                    : "border-gray-200 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5"
                                            }`}
                                        >
                                            <span className="block font-semibold text-[var(--color-secondary)]">{option.label}</span>
                                            {option.hint && <span className="block text-sm text-gray-500 mt-0.5">{option.hint}</span>}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {isContactStep && (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <p className="text-lg font-bold text-[var(--color-secondary)]">Where should we send your offer?</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                                        First Name *
                                    </label>
                                    <input type="text" name="firstName" id="firstName" required autoComplete="given-name" className={inputClass} placeholder="John" />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Last Name *
                                    </label>
                                    <input type="text" name="lastName" id="lastName" required autoComplete="family-name" className={inputClass} placeholder="Doe" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Phone Number *
                                    </label>
                                    <input type="tel" name="phone" id="phone" required autoComplete="tel" className={inputClass} placeholder="(555) 123-4567" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input type="email" name="email" id="email" autoComplete="email" className={inputClass} placeholder="john@example.com" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="details" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Anything else we should know? (Optional)
                                </label>
                                <textarea
                                    name="details"
                                    id="details"
                                    rows={3}
                                    className={`${inputClass} resize-none`}
                                    placeholder="e.g., Inherited the property, behind on taxes, tenants in place..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center rounded-xl bg-[var(--color-primary)] px-8 py-4 text-lg font-bold text-white shadow-md hover:bg-[var(--color-primary-dark)] transition-all active:translate-y-px disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    "Get My Cash Offer"
                                )}
                            </button>

                            <p className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
                                <Lock className="w-3.5 h-3.5" />
                                No obligation. We never sell your information.
                            </p>
                            <p className="text-center text-xs text-gray-500">
                                By submitting this form, you agree to being contacted by New Plains Properties regarding your inquiry.
                            </p>
                        </form>
                    )}
                </motion.div>
            </AnimatePresence>

            {step > 0 && (
                <button
                    type="button"
                    onClick={() => goTo(step - 1)}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[var(--color-primary)] transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>
            )}
        </motion.div>
    );
}
