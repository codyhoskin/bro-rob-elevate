import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

type Duration = "monthly" | "3month" | "6month" | "1year";
type PayStyle = "monthly" | "upfront";

const PRICING: Record<
  Duration,
  { monthly: number; upfront: number; months: number; label: string; tier: string; tierColor: string }
> = {
  monthly: {
    monthly: 299,
    upfront: 299,
    months: 1,
    label: "1 Month",
    tier: "Starter",
    tierColor: "text-brand-red",
  },
  "3month": {
    monthly: 229,
    upfront: 200,
    months: 3,
    label: "3 Months",
    tier: "Committed",
    tierColor: "text-brand-gold",
  },
  "6month": {
    monthly: 209,
    upfront: 183.33,
    months: 6,
    label: "6 Months",
    tier: "Dedicated",
    tierColor: "text-brand-blue",
  },
  "1year": { monthly: 179, upfront: 158.33, months: 12, label: "1 Year", tier: "Elite", tierColor: "text-purple-400" },
};

const CARD_THEMES: Record<Duration, string> = {
  monthly: "card-tier-starter",
  "3month": "card-tier-intermediate",
  "6month": "card-tier-advanced",
  "1year": "card-tier-pro card-tier-pro-glow",
};

const TIER_BTN_ACTIVE: Record<Duration, string> = {
  monthly: "bg-brand-red text-primary-foreground shadow-lg shadow-brand-red/20",
  "3month": "bg-brand-gold text-primary-foreground shadow-lg shadow-brand-gold/20",
  "6month": "bg-brand-blue text-primary-foreground shadow-lg shadow-brand-blue/20",
  "1year": "bg-purple-500 text-primary-foreground shadow-lg shadow-purple-500/20",
};

const STRIPE_LINKS: Record<Duration, Record<PayStyle, string>> = {
  monthly: {
    monthly: "https://buy.stripe.com/aFaeVcgr11bE8uL6Ut0Ny07",
    upfront: "https://buy.stripe.com/aFaeVcgr11bE8uL6Ut0Ny07",
  },
  "3month": {
    monthly: "https://buy.stripe.com/5kQ8wOb6HbQi6mD7Yx0Ny08",
    upfront: "https://buy.stripe.com/14A7sK7UvdYqbGX92B0Ny03",
  },
  "6month": {
    monthly: "https://buy.stripe.com/28EbJ03EfcUm3ar92B0Ny04",
    upfront: "https://buy.stripe.com/5kQ8wOb6HbQi6mD7Yx0Ny08",
  },
  "1year": {
    monthly: "https://buy.stripe.com/14A7sK7UvdYqbGX92B0Ny03",
    upfront: "https://buy.stripe.com/aFaeVcgr11bE8uL6Ut0Ny07",
  },
};

const FEATURES = [
  {
    title: "1-on-1 Custom Training Program",
    description:
      "A fully personalized training program designed exclusively for you — built around your goals, experience level, schedule, and available equipment. Updated monthly as you progress.",
  },
  {
    title: "Weekly Check-Ins",
    description:
      "Dedicated weekly video or voice check-ins to review your progress, adjust your plan, and keep you accountable every single week.",
  },
  {
    title: "Direct Message Support",
    description:
      "Unlimited direct messaging access to Rob. Get answers to your questions about training, nutrition, or mindset within 24 hours.",
  },
  {
    title: "Nutrition Guidance",
    description:
      "Personalized macro targets, meal timing strategies, and flexible food recommendations tailored to your lifestyle and preferences.",
  },
  {
    title: "Form Reviews",
    description:
      "Submit videos of your lifts and get detailed form analysis and corrections to maximize results and prevent injury.",
  },
  {
    title: "Progress Tracking Dashboard",
    description:
      "Access your personal dashboard to track lifts, body measurements, photos, and milestones — see your transformation unfold in real time.",
  },
];

const AnimatedPrice = React.forwardRef<HTMLSpanElement, { value: number }>(({ value }, ref) => {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const start = display;
    const diff = value - start;
    const duration = 400;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(parseFloat((start + diff * eased).toFixed(2)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);

  return <span ref={ref}>${display % 1 === 0 ? display : display.toFixed(2)}</span>;
});
AnimatedPrice.displayName = "AnimatedPrice";

const FeatureItem = ({ feature, index }: { feature: (typeof FEATURES)[0]; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border/20 last:border-b-0">
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ backgroundColor: "hsl(222 30% 14% / 0.5)" }}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 w-full text-left py-3.5 px-4 rounded-lg transition-colors group"
      >
        <div className="w-5 h-5 rounded-full bg-brand-blue/20 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue/30 transition-colors">
          <Check className="w-3 h-3 text-brand-blue" />
        </div>
        <span className="text-sm text-foreground/90 group-hover:text-foreground transition-colors flex-1">
          {feature.title}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-muted-foreground/50 group-hover:text-muted-foreground transition-colors"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="ml-8 mr-3 pb-4 px-4">
              <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PricingCard = () => {
  const [duration, setDuration] = useState<Duration>("1year");
  const [payStyle, setPayStyle] = useState<PayStyle>("monthly");
  const isMonthly = duration === "monthly";

  // Reset to monthly pay style when 1-month is selected
  useEffect(() => {
    if (isMonthly) setPayStyle("monthly");
  }, [isMonthly]);

  const pricing = PRICING[duration];
  const monthlyRate = payStyle === "upfront" ? pricing.upfront : pricing.monthly;
  const total = monthlyRate * pricing.months;
  const originalTotal = pricing.monthly * pricing.months;
  const isUpfront = payStyle === "upfront";
  const isMaxCommit = duration === "1year";

  const durations: Duration[] = ["monthly", "3month", "6month", "1year"];

  return (
    <section className="relative px-4 py-20 sm:py-28 comic-halftone">
      <div className="absolute inset-0 bg-gradient-dark opacity-80" />
      <motion.div
        key={duration}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] ${
          duration === "monthly"
            ? "bg-[hsl(var(--tier-starter)/0.15)]"
            : duration === "3month"
              ? "bg-[hsl(var(--tier-intermediate)/0.15)]"
              : duration === "6month"
                ? "bg-[hsl(var(--tier-advanced)/0.18)]"
                : "bg-[hsl(var(--tier-pro)/0.22)]"
        }`}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-lg mx-auto"
      >
        <div
          className={`glass-card comic-panel rounded-2xl p-8 sm:p-10 transition-all duration-700 ${CARD_THEMES[duration]} shimmer`}
        >
          {/* Logo + Header */}
          <div className="text-center mb-10">
            <img src="/images/robwithweights.png" alt="Your Bro Rob" className="w-40 sm:w-48 mx-auto mb-5 drop-shadow-[0_0_30px_hsl(213,100%,52%,0.3)]" />
            <h2 className="font-display tracking-wide leading-tight">
              <span className="text-foreground block text-3xl sm:text-4xl">Train With</span>
              <span className="text-brand-blue block text-5xl sm:text-6xl font-black comic-text-stroke drop-shadow-[0_0_15px_hsl(213,100%,52%,0.4)]" style={{ WebkitTextStroke: '1px hsl(213 100% 52% / 0.3)' }}>
                {"Your Bro Rob".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block cursor-default"
                    whileHover={{ scale: 1.3, y: -4 }}
                    transition={{ type: "spring", stiffness: 500, damping: 12 }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>
            </h2>
            <p className="text-muted-foreground font-body text-sm mt-3 tracking-wide">
              <span className={`font-bold ${pricing.tierColor}`}>{pricing.tier}</span> — Elite Coaching. Real Results.
            </p>
          </div>

          {/* Duration Toggle */}
          <div className="mb-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {durations.map((d) => (
                <div key={d} className="relative">
                  {d === "1year" && (
                    <motion.span
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-brand-blue text-primary-foreground text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md whitespace-nowrap pointer-events-none"
                    >
                      Best Value
                    </motion.span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDuration(d);
                    }}
                    className={`w-full py-3.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 ${
                      duration === d
                        ? TIER_BTN_ACTIVE[d]
                        : "bg-muted/40 text-muted-foreground hover:bg-muted/70 hover:text-foreground border border-border/20"
                    }`}
                  >
                    <span className="block text-[10px] opacity-70 font-bold uppercase tracking-wider leading-tight">
                      {PRICING[d].tier}
                    </span>
                    {PRICING[d].label}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Pay Style Toggle - Integrated labels */}
          <div className={`mb-10 transition-opacity duration-300 ${isMonthly ? "opacity-40 pointer-events-none" : ""}`}>
            <div className="flex items-center justify-center gap-3">
              <span
                className={`text-sm font-semibold transition-colors duration-300 cursor-pointer ${
                  payStyle === "monthly" ? "text-foreground" : "text-muted-foreground/50"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isMonthly) setPayStyle("monthly");
                }}
              >
                Pay Monthly
              </span>
              <button
                disabled={isMonthly}
                onClick={(e) => {
                  e.stopPropagation();
                  setPayStyle(payStyle === "monthly" ? "upfront" : "monthly");
                }}
                className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border-2 border-transparent transition-colors duration-300 focus-visible:outline-none ${
                  isMonthly ? "cursor-not-allowed" : "cursor-pointer"
                } ${payStyle === "upfront" ? "bg-brand-blue" : "bg-muted/60"}`}
              >
                <motion.span
                  className="block h-5 w-5 rounded-full bg-foreground shadow-lg pointer-events-none"
                  animate={{ x: payStyle === "upfront" ? 22 : 2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                />
              </button>
              <span
                className={`text-sm font-semibold transition-colors duration-300 cursor-pointer ${
                  payStyle === "upfront" ? "text-brand-blue" : "text-muted-foreground/50"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isMonthly) setPayStyle("upfront");
                }}
              >
                Pay Annually
                <span
                  className={`ml-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full transition-colors duration-300 ${
                    payStyle === "upfront"
                      ? "bg-brand-blue text-primary-foreground"
                      : "bg-muted/40 text-muted-foreground/50"
                  }`}
                >
                  -10%
                </span>
              </span>
            </div>
          </div>

          {/* Pricing Display */}
          <div className="text-center mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${duration}-${payStyle}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-baseline justify-center gap-1">
                  <span
                    className="font-display text-6xl sm:text-7xl text-foreground"
                    style={{ textShadow: "0 0 12px hsl(210 40% 98% / 0.3), 0 0 30px hsl(210 40% 98% / 0.12)" }}
                  >
                    <AnimatedPrice value={monthlyRate} />
                  </span>
                  <span className="text-muted-foreground text-lg font-body">/mo</span>
                </div>

                {pricing.months > 1 && (
                  <div className="mt-2">
                    {isUpfront ? (
                      <>
                        <p className="text-muted-foreground text-sm font-body">
                          <span className="line-through opacity-50">${originalTotal}</span>
                          <span className="text-brand-blue font-semibold ml-2">${parseFloat(total.toFixed(2))} total</span>
                        </p>
                        <p className="text-sm font-bold text-brand-blue mt-1">You save ${parseFloat((originalTotal - total).toFixed(2))}!</p>
                      </>
                    ) : (
                      <p className="text-muted-foreground text-sm font-body">
                        ${parseFloat(total.toFixed(2))} billed over {pricing.months} months
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CTA - dual color gradient (only this button) */}
          <motion.a
            href={STRIPE_LINKS[duration][payStyle]}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="block text-center w-full py-4 rounded-xl bg-gradient-brand text-primary-foreground font-bold text-lg tracking-wide transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--brand-blue)/0.4),0_0_80px_hsl(var(--brand-blue)/0.2)] mb-5"
          >
            Train with your Bro
          </motion.a>

          {/* Checkout trust badges */}
          <div className="text-center text-xs text-muted-foreground mb-10 space-y-3">
            <p className="flex items-center justify-center gap-1.5 text-muted-foreground/70">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              </svg>
              Secure checkout ·{" "}
              <span className="underline cursor-pointer hover:text-foreground transition-colors">
                Terms & Conditions
              </span>
            </p>
            <div className="flex items-center justify-center gap-2.5">
              {/* Stripe */}
              <div className="flex items-center gap-1 bg-muted/30 rounded-md px-2.5 py-1.5 opacity-50 hover:opacity-80 transition-opacity">
                <svg viewBox="0 0 28 28" className="w-4 h-4" fill="none">
                  <path
                    d="M13.976 9.15c-2.172-.765-3.222-1.3-3.222-2.15 0-.72.606-1.15 1.636-1.15 1.472 0 3.07.69 4.076 1.2l.588-3.69C15.976 2.67 14.476 2 12.39 2 9.236 2 7.012 3.8 7.012 6.56c0 2.79 2.402 3.98 4.45 4.72 2.388.86 3.18 1.47 3.18 2.33 0 .87-.752 1.39-1.92 1.39-1.55 0-3.73-.79-5.13-1.71l-.6 3.76c1.36.82 3.6 1.45 5.53 1.45 3.41 0 5.58-1.68 5.58-4.63 0-2.97-2.346-4.14-4.126-4.87z"
                    fill="hsl(var(--foreground))"
                    opacity="0.7"
                  />
                </svg>
                <span className="text-[10px] font-semibold tracking-wide">Stripe</span>
              </div>
              {/* Visa */}
              <div className="flex items-center bg-muted/30 rounded-md px-2.5 py-1.5 opacity-50 hover:opacity-80 transition-opacity">
                <svg viewBox="0 0 750 471" className="h-4" fill="none">
                  <path
                    d="M278.198 334.228l33.36-195.763h53.358l-33.384 195.763H278.198zm246.11-191.54c-10.57-3.966-27.135-8.222-47.822-8.222-52.725 0-89.863 26.55-90.18 64.604-.316 28.13 26.508 43.822 46.754 53.185 20.77 9.597 27.75 15.716 27.66 24.27-.14 13.12-16.586 19.106-31.924 19.106-21.35 0-32.7-2.96-50.225-10.274l-6.876-3.112-7.49 43.823c12.474 5.467 35.53 10.198 59.476 10.448 56.07 0 92.5-26.246 92.918-66.882.21-22.296-14.04-39.26-44.862-53.254-18.68-9.072-30.13-15.12-30.01-24.314 0-8.148 9.682-16.856 30.612-16.856 17.476-.27 30.15 3.534 40.01 7.5l4.8 2.268 7.158-41.69zm137.61-4.222h-41.232c-12.774 0-22.332 3.486-27.942 16.234l-79.245 179.53h56.018s9.16-24.13 11.232-29.418c6.124 0 60.554.084 68.336.084 1.596 6.854 6.49 29.334 6.49 29.334h49.512l-43.17-195.764zm-65.518 126.408c4.414-11.28 21.26-54.723 21.26-54.723-.316.525 4.38-11.33 7.074-18.684l3.606 16.878s10.218 46.738 12.352 56.53h-44.292zM209.394 138.465l-52.24 133.496-5.565-27.13c-9.726-31.273-40.025-65.155-73.898-82.118l47.767 171.204 56.456-.064 84.004-195.388h-56.524z"
                    fill="hsl(var(--foreground))"
                    opacity="0.7"
                  />
                  <path
                    d="M131.92 138.465H49.468l-.682 4.07c66.938 16.204 111.232 55.363 129.618 102.404l-18.71-89.96c-3.23-12.395-12.597-16.094-27.774-16.514z"
                    fill="hsl(var(--foreground))"
                    opacity="0.4"
                  />
                </svg>
              </div>
              {/* Mastercard */}
              <div className="flex items-center bg-muted/30 rounded-md px-2.5 py-1.5 opacity-50 hover:opacity-80 transition-opacity">
                <svg viewBox="0 0 24 15" className="h-3.5" fill="none">
                  <circle cx="8.5" cy="7.5" r="5.5" fill="#EB001B" opacity="0.8" />
                  <circle cx="15.5" cy="7.5" r="5.5" fill="#F79E1B" opacity="0.8" />
                  <path
                    d="M12 3.3a5.46 5.46 0 012 4.2 5.46 5.46 0 01-2 4.2 5.46 5.46 0 01-2-4.2 5.46 5.46 0 012-4.2z"
                    fill="#FF5F00"
                    opacity="0.9"
                  />
                </svg>
              </div>
              {/* Apple Pay */}
              <div className="flex items-center gap-0.5 bg-muted/30 rounded-md px-2.5 py-1.5 opacity-50 hover:opacity-80 transition-opacity">
                <svg viewBox="0 0 18 18" className="w-3.5 h-3.5" fill="hsl(var(--foreground))" opacity="0.7">
                  <path d="M14.1 9.6c0-1.7.9-2.5 1.8-3.3-.6-.9-1.6-1.4-2.6-1.4-1.1 0-2 .7-2.5.7-.5 0-1.3-.7-2.2-.7C7.4 5 6 5.9 5.3 7.3c-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7 1.3 0 1.6.7 2.7.7 1.2 0 2-1 2.7-2.1.5-.7.8-1.4 1-1.5-1.1-.4-1.9-1.6-1.9-3.1-.3-1.7.6-1.7 0 0zM11.9 3.8c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.6.7-1.1 1.7-.9 2.6.9.1 1.9-.5 2.5-1.2z" />
                </svg>
                <span className="text-[10px] font-semibold">Pay</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent mb-8" />

          {/* Features - Dropdown style */}
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4 font-semibold">What's Included</p>
            <div className="rounded-xl border border-border/30 bg-muted/10 overflow-hidden divide-y divide-border/20">
              {FEATURES.map((feature, i) => (
                <FeatureItem key={feature.title} feature={feature} index={i} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PricingCard;
