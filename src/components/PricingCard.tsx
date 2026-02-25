import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

type Duration = "monthly" | "3month" | "6month" | "1year";
type PayStyle = "monthly" | "upfront";

const PRICING: Record<Duration, { monthly: number; upfront: number; months: number; label: string }> = {
  monthly: { monthly: 199, upfront: 179, months: 1, label: "1 Month" },
  "3month": { monthly: 189, upfront: 170, months: 3, label: "3 Months" },
  "6month": { monthly: 169, upfront: 152, months: 6, label: "6 Months" },
  "1year": { monthly: 149, upfront: 134, months: 12, label: "1 Year" },
};

const CARD_THEMES: Record<Duration, string> = {
  monthly: "card-theme-monthly",
  "3month": "card-theme-3month",
  "6month": "card-theme-6month",
  "1year": "card-theme-1year",
};

const FEATURES = [
  {
    title: "1-on-1 Custom Training Program",
    description: "A fully personalized training program designed exclusively for you — built around your goals, experience level, schedule, and available equipment. Updated monthly as you progress."
  },
  {
    title: "Weekly Check-Ins",
    description: "Dedicated weekly video or voice check-ins to review your progress, adjust your plan, and keep you accountable every single week."
  },
  {
    title: "Direct Message Support",
    description: "Unlimited direct messaging access to Rob. Get answers to your questions about training, nutrition, or mindset within 24 hours."
  },
  {
    title: "Nutrition Guidance",
    description: "Personalized macro targets, meal timing strategies, and flexible food recommendations tailored to your lifestyle and preferences."
  },
  {
    title: "Form Reviews",
    description: "Submit videos of your lifts and get detailed form analysis and corrections to maximize results and prevent injury."
  },
  {
    title: "Progress Tracking Dashboard",
    description: "Access your personal dashboard to track lifts, body measurements, photos, and milestones — see your transformation unfold in real time."
  },
];

const AnimatedPrice = ({ value }: { value: number }) => {
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
      setDisplay(Math.round(start + diff * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);

  return <span>${display}</span>;
};

const FeatureItem = ({ feature, index }: { feature: typeof FEATURES[0]; index: number }) => {
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
  const [duration, setDuration] = useState<Duration>("monthly");
  const [payStyle, setPayStyle] = useState<PayStyle>("monthly");

  const pricing = PRICING[duration];
  const monthlyRate = payStyle === "upfront" ? pricing.upfront : pricing.monthly;
  const total = monthlyRate * pricing.months;
  const originalTotal = pricing.monthly * pricing.months;
  const isUpfront = payStyle === "upfront";
  const isMaxCommit = duration === "1year";

  const durations: Duration[] = ["monthly", "3month", "6month", "1year"];

  return (
    <section className="relative px-4 py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-blue/3 blur-[150px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-lg mx-auto"
      >
        <motion.div
          animate={isMaxCommit ? {
            scale: [1, 1.005, 1],
            rotate: [0, 0.15, -0.15, 0],
          } : {}}
          transition={isMaxCommit ? { repeat: Infinity, duration: 2.5, ease: "easeInOut" } : {}}
          className={`glass-card rounded-2xl p-8 sm:p-10 transition-all duration-700 ${CARD_THEMES[duration]} shimmer`}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl sm:text-4xl text-foreground tracking-wide">
              Train With <span className="text-gradient-brand">Your Bro Rob</span>
            </h2>
            <p className="text-muted-foreground font-body text-sm mt-3 tracking-wide">
              Elite Coaching. Real Results. Full Accountability.
            </p>
          </div>

          {/* Duration Toggle */}
          <div className="mb-8">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-semibold">Commitment</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {durations.map((d) => (
                <motion.button
                  key={d}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setDuration(d)}
                  className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    duration === d
                      ? "bg-gradient-brand text-primary-foreground shadow-lg shadow-brand-blue/20"
                      : "bg-muted/40 text-muted-foreground hover:bg-muted/70 hover:text-foreground border border-border/20"
                  }`}
                >
                  {PRICING[d].label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Power-up indicator */}
          {isMaxCommit && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 text-center"
            >
              <motion.p
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-xs text-brand-blue font-semibold tracking-wider uppercase"
              >
                ⚡ Maximum Commitment — Best Value ⚡
              </motion.p>
            </motion.div>
          )}

          {/* Pay Style Toggle */}
          <div className="mb-10">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-semibold">Payment</p>
            <div className="grid grid-cols-2 gap-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setPayStyle("monthly")}
                className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  payStyle === "monthly"
                    ? "bg-gradient-brand text-primary-foreground shadow-lg shadow-brand-blue/20"
                    : "bg-muted/40 text-muted-foreground hover:bg-muted/70 hover:text-foreground border border-border/20"
                }`}
              >
                Pay Monthly
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setPayStyle("upfront")}
                className={`relative py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  payStyle === "upfront"
                    ? "bg-gradient-brand text-primary-foreground shadow-lg shadow-brand-blue/20"
                    : "bg-muted/40 text-muted-foreground hover:bg-muted/70 hover:text-foreground border border-border/20"
                }`}
              >
                Pay In Full
                <span className="absolute -top-2.5 -right-2 bg-brand-blue text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                  -10%
                </span>
              </motion.button>
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
                  <motion.span
                    className="font-display text-6xl sm:text-7xl text-foreground"
                    animate={{
                      textShadow: [
                        "0 0 10px hsl(var(--brand-blue) / 0.15)",
                        "0 0 30px hsl(var(--brand-blue) / 0.4)",
                        "0 0 10px hsl(var(--brand-blue) / 0.15)",
                      ],
                    }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  >
                    <AnimatedPrice value={monthlyRate} />
                  </motion.span>
                  <span className="text-muted-foreground text-lg font-body">/mo</span>
                </div>

                {pricing.months > 1 && (
                  <div className="mt-2">
                    {isUpfront ? (
                      <p className="text-muted-foreground text-sm font-body">
                        <span className="line-through opacity-50">${originalTotal}</span>
                        <span className="text-brand-blue font-semibold ml-2">${total} total</span>
                      </p>
                    ) : (
                      <p className="text-muted-foreground text-sm font-body">
                        ${total} billed over {pricing.months} months
                      </p>
                    )}
                  </div>
                )}

                {isUpfront && pricing.months === 1 && (
                  <p className="text-muted-foreground text-sm mt-2 font-body">
                    <span className="line-through opacity-50">${pricing.monthly}</span>
                    <span className="text-brand-blue font-semibold ml-2">Save ${pricing.monthly - monthlyRate}</span>
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 rounded-xl bg-gradient-brand text-primary-foreground font-bold text-lg tracking-wide transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--brand-blue)/0.4),0_0_80px_hsl(var(--brand-blue)/0.2)] mb-5"
          >
            Train with your Bro
          </motion.button>

          {/* Checkout trust badges */}
          <div className="text-center text-xs text-muted-foreground mb-10 space-y-3">
            <p className="flex items-center justify-center gap-1.5 text-muted-foreground/70">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
              Secure checkout · <span className="underline cursor-pointer hover:text-foreground transition-colors">Terms & Conditions</span>
            </p>
            <div className="flex items-center justify-center gap-2.5">
              {/* Stripe */}
              <div className="flex items-center gap-1 bg-muted/30 rounded-md px-2.5 py-1.5 opacity-50 hover:opacity-80 transition-opacity">
                <svg viewBox="0 0 28 28" className="w-4 h-4" fill="none">
                  <path d="M13.976 9.15c-2.172-.765-3.222-1.3-3.222-2.15 0-.72.606-1.15 1.636-1.15 1.472 0 3.07.69 4.076 1.2l.588-3.69C15.976 2.67 14.476 2 12.39 2 9.236 2 7.012 3.8 7.012 6.56c0 2.79 2.402 3.98 4.45 4.72 2.388.86 3.18 1.47 3.18 2.33 0 .87-.752 1.39-1.92 1.39-1.55 0-3.73-.79-5.13-1.71l-.6 3.76c1.36.82 3.6 1.45 5.53 1.45 3.41 0 5.58-1.68 5.58-4.63 0-2.97-2.346-4.14-4.126-4.87z" fill="hsl(var(--foreground))" opacity="0.7"/>
                </svg>
                <span className="text-[10px] font-semibold tracking-wide">Stripe</span>
              </div>
              {/* Visa */}
              <div className="flex items-center bg-muted/30 rounded-md px-2.5 py-1.5 opacity-50 hover:opacity-80 transition-opacity">
                <svg viewBox="0 0 32 10" className="h-3" fill="none">
                  <path d="M12.8 0.5l-2.5 9h-2.2l-1.2-7.2c-.07-.28-.13-.38-.35-.5C6.02 1.5 5 1.1 4.1 0.85l.05-.35h3.55c.45 0 .86.3.96.83l.88 4.67L11.9.5h.9zm3.52 6.07c0-2.38-3.3-2.51-3.27-3.58.01-.32.31-.67 1-.75.33-.04 1.25-.08 2.3.42l.4-1.9C16.18.5 15.35.2 14.35.2c-2.17 0-3.7 1.15-3.71 2.8-.01 1.22 1.09 1.9 1.92 2.31.86.41 1.14.68 1.14 1.05-.01.57-.68.82-1.32.83-.6.01-1.52-.16-2.2-.57l-.39 1.82c.5.23 1.42.43 2.38.44 2.3 0 3.81-1.14 3.82-2.9l-.67-.01zm5.72 2.93l1.6-9h-1.72l-1.6 9h1.72zm6.47-9l-2.34 9h-2l-2.34-9h2.16l1.14 6.22L26.3.5h2.21z" fill="hsl(var(--foreground))" opacity="0.7"/>
                </svg>
              </div>
              {/* Mastercard */}
              <div className="flex items-center bg-muted/30 rounded-md px-2.5 py-1.5 opacity-50 hover:opacity-80 transition-opacity">
                <svg viewBox="0 0 24 15" className="h-3.5" fill="none">
                  <circle cx="8.5" cy="7.5" r="5.5" fill="#EB001B" opacity="0.8"/>
                  <circle cx="15.5" cy="7.5" r="5.5" fill="#F79E1B" opacity="0.8"/>
                  <path d="M12 3.3a5.46 5.46 0 012 4.2 5.46 5.46 0 01-2 4.2 5.46 5.46 0 01-2-4.2 5.46 5.46 0 012-4.2z" fill="#FF5F00" opacity="0.9"/>
                </svg>
              </div>
              {/* Apple Pay */}
              <div className="flex items-center gap-0.5 bg-muted/30 rounded-md px-2.5 py-1.5 opacity-50 hover:opacity-80 transition-opacity">
                <svg viewBox="0 0 18 18" className="w-3.5 h-3.5" fill="hsl(var(--foreground))" opacity="0.7">
                  <path d="M14.1 9.6c0-1.7.9-2.5 1.8-3.3-.6-.9-1.6-1.4-2.6-1.4-1.1 0-2 .7-2.5.7-.5 0-1.3-.7-2.2-.7C7.4 5 6 5.9 5.3 7.3c-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7 1.3 0 1.6.7 2.7.7 1.2 0 2-1 2.7-2.1.5-.7.8-1.4 1-1.5-1.1-.4-1.9-1.6-1.9-3.1-.3-1.7.6-1.7 0 0zM11.9 3.8c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.6.7-1.1 1.7-.9 2.6.9.1 1.9-.5 2.5-1.2z"/>
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
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PricingCard;
