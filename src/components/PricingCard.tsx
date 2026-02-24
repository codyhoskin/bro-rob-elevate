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

const COMMITMENT_LEVELS: Record<Duration, number> = {
  monthly: 25,
  "3month": 50,
  "6month": 75,
  "1year": 100,
};

const CARD_THEMES: Record<Duration, string> = {
  monthly: "card-theme-monthly",
  "3month": "card-theme-3month",
  "6month": "card-theme-6month",
  "1year": "card-theme-1year",
};

const FEATURES = [
  {
    title: "Custom Training Program",
    description: "A fully personalized training program built around your goals, experience level, schedule, and available equipment. Updated monthly as you progress."
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
        className="flex items-center gap-3 w-full text-left py-3 px-3 rounded-lg transition-colors group"
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
            <div className="ml-8 mr-3 pb-3 px-3">
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
  const commitLevel = COMMITMENT_LEVELS[duration];
  const isMaxCommit = duration === "1year";

  const durations: Duration[] = ["monthly", "3month", "6month", "1year"];

  return (
    <section className="relative px-4 py-16 sm:py-24">
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-blue/3 blur-[150px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-lg mx-auto"
      >
        <div className={`glass-card rounded-2xl p-6 sm:p-8 transition-all duration-700 ${CARD_THEMES[duration]} shimmer`}>
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl sm:text-4xl text-foreground tracking-wide">
              Train With <span className="text-gradient-brand">Your Bro Rob</span>
            </h2>
            <p className="text-muted-foreground font-body text-sm mt-2 tracking-wide">
              Elite Coaching. Real Results. Full Accountability.
            </p>
          </div>

          {/* Duration Toggle */}
          <div className="mb-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-semibold">Commitment</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {durations.map((d) => (
                <motion.button
                  key={d}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setDuration(d)}
                  className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    duration === d
                      ? "bg-gradient-brand text-primary-foreground shadow-lg"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {PRICING[d].label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Commitment Progress Bar with power-up effect */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>Commitment Level</span>
              <motion.span
                className="font-semibold text-foreground"
                key={commitLevel}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
              >
                {commitLevel}%
              </motion.span>
            </div>
            <div className="h-3 bg-muted/40 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full rounded-full bg-gradient-brand relative"
                initial={{ width: "25%" }}
                animate={{
                  width: `${commitLevel}%`,
                  boxShadow: isMaxCommit
                    ? "0 0 20px hsl(var(--brand-blue) / 0.6), 0 0 40px hsl(var(--brand-blue) / 0.3)"
                    : commitLevel > 50
                    ? "0 0 10px hsl(var(--brand-blue) / 0.3)"
                    : "none",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              />
              {commitLevel >= 75 && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    ...(isMaxCommit ? { x: [-1, 1, -1, 0] } : {}),
                  }}
                  transition={{ repeat: Infinity, duration: isMaxCommit ? 0.3 : 1.5 }}
                  style={{
                    background: "linear-gradient(90deg, transparent, hsl(var(--brand-blue) / 0.2), transparent)",
                    width: `${commitLevel}%`,
                  }}
                />
              )}
            </div>
            {isMaxCommit && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] text-brand-blue mt-1 text-center font-semibold tracking-wider uppercase"
              >
                ⚡ Maximum Commitment Unlocked
              </motion.p>
            )}
          </div>

          {/* Pay Style Toggle */}
          <div className="mb-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-semibold">Payment</p>
            <div className="grid grid-cols-2 gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPayStyle("monthly")}
                className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  payStyle === "monthly"
                    ? "bg-gradient-brand text-primary-foreground shadow-lg"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                Pay Monthly
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPayStyle("upfront")}
                className={`relative py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  payStyle === "upfront"
                    ? "bg-gradient-brand text-primary-foreground shadow-lg"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                Pay In Full
                <span className="absolute -top-2 -right-2 bg-brand-blue text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md">
                  -10%
                </span>
              </motion.button>
            </div>
          </div>

          {/* Pricing Display */}
          <div className="text-center mb-4">
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
                        "0 0 10px hsl(var(--brand-blue) / 0.2)",
                        "0 0 20px hsl(var(--brand-blue) / 0.4)",
                        "0 0 10px hsl(var(--brand-blue) / 0.2)",
                      ],
                    }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  >
                    <AnimatedPrice value={monthlyRate} />
                  </motion.span>
                  <span className="text-muted-foreground text-lg">/mo</span>
                </div>

                {pricing.months > 1 && (
                  <div className="mt-1 space-y-0.5">
                    {isUpfront ? (
                      <p className="text-muted-foreground text-sm">
                        <span className="line-through opacity-60">${originalTotal}</span>
                        <span className="text-brand-blue font-semibold ml-2">${total} total</span>
                      </p>
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        ${total} billed over {pricing.months} months
                      </p>
                    )}
                  </div>
                )}

                {isUpfront && pricing.months === 1 && (
                  <p className="text-muted-foreground text-sm mt-1">
                    <span className="line-through opacity-60">${pricing.monthly}</span>
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
            className="w-full py-4 rounded-xl bg-gradient-brand text-primary-foreground font-bold text-lg tracking-wide transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--brand-blue)/0.4),0_0_80px_hsl(var(--brand-blue)/0.2)] mb-3"
          >
            Start Training Now
          </motion.button>

          <div className="text-center text-xs text-muted-foreground mb-8 space-y-0.5">
            <p>🔒 Secure checkout · 100% money-back guarantee</p>
            <p>Commitment-based pricing · See terms for details</p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />

          {/* Features - Dropdown style */}
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-semibold">What's Included</p>
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
