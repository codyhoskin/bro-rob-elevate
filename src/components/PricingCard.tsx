import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

type Duration = "monthly" | "3month" | "6month" | "1year";
type PayStyle = "monthly" | "upfront";

const PRICING: Record<Duration, { monthly: number; upfront: number; months: number; label: string }> = {
  monthly: { monthly: 199, upfront: 179, months: 1, label: "Monthly" },
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
  "Custom Training Program",
  "Weekly Check-Ins",
  "Direct Message Support",
  "Nutrition Guidance",
  "Form Reviews",
  "Progress Tracking Dashboard",
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

const PricingCard = () => {
  const [duration, setDuration] = useState<Duration>("monthly");
  const [payStyle, setPayStyle] = useState<PayStyle>("monthly");

  const pricing = PRICING[duration];
  const monthlyRate = payStyle === "upfront" ? pricing.upfront : pricing.monthly;
  const total = monthlyRate * pricing.months;
  const originalTotal = pricing.monthly * pricing.months;
  const isUpfront = payStyle === "upfront";
  const commitLevel = COMMITMENT_LEVELS[duration];

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
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    duration === d
                      ? "bg-gradient-brand text-primary-foreground shadow-lg"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {PRICING[d].label}
                </button>
              ))}
            </div>
          </div>

          {/* Commitment Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>Commitment Level</span>
              <span className="font-semibold text-foreground">{commitLevel}%</span>
            </div>
            <div className="h-2.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-brand"
                initial={{ width: "25%" }}
                animate={{ width: `${commitLevel}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Pay Style Toggle */}
          <div className="mb-8">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-semibold">Payment</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setPayStyle("monthly")}
                className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  payStyle === "monthly"
                    ? "bg-gradient-brand text-primary-foreground shadow-lg"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
              >
                Pay Monthly
              </button>
              <button
                onClick={() => setPayStyle("upfront")}
                className={`relative py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  payStyle === "upfront"
                    ? "bg-gradient-brand text-primary-foreground shadow-lg"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
              >
                Pay In Full
                <span className="absolute -top-2 -right-2 bg-brand-blue text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  -10%
                </span>
              </button>
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
                  <span className="font-display text-6xl sm:text-7xl text-foreground">
                    <AnimatedPrice value={monthlyRate} />
                  </span>
                  <span className="text-muted-foreground text-lg">/mo</span>
                </div>

                {pricing.months > 1 && (
                  <div className="mt-2 space-y-1">
                    {isUpfront && (
                      <p className="text-muted-foreground text-sm">
                        <span className="line-through">${originalTotal}</span>
                        <span className="text-brand-blue font-semibold ml-2">${total} total</span>
                      </p>
                    )}
                    {!isUpfront && (
                      <p className="text-muted-foreground text-sm">
                        ${total} billed over {pricing.months} months
                      </p>
                    )}
                  </div>
                )}

                {isUpfront && pricing.months === 1 && (
                  <p className="text-muted-foreground text-sm mt-2">
                    <span className="line-through">${pricing.monthly}</span>
                    <span className="text-brand-blue font-semibold ml-2">Save $20</span>
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Features */}
          <div className="mb-8">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4 font-semibold">What's Included</p>
            <ul className="space-y-3">
              {FEATURES.map((feature, i) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-brand-blue/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-brand-blue" />
                  </div>
                  <span className="text-sm text-foreground/90">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl bg-gradient-brand text-primary-foreground font-bold text-lg tracking-wide transition-shadow duration-300 hover:shadow-[0_0_40px_hsl(var(--brand-blue)/0.4)]"
          >
            Start Training Now
          </motion.button>

          <p className="text-center text-xs text-muted-foreground mt-4">
            Cancel anytime · No contracts · 100% money-back guarantee
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default PricingCard;
