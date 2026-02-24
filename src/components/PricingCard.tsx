import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronUp, ChevronDown, X } from "lucide-react";

type PayStyle = "monthly" | "upfront";

const MONTHS_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const getMonthlyRate = (months: number, payStyle: PayStyle) => {
  // Base rate decreases with commitment
  let base: number;
  if (months <= 1) base = 199;
  else if (months <= 3) base = 189;
  else if (months <= 6) base = 169;
  else base = 149;
  
  return payStyle === "upfront" ? Math.round(base * 0.9) : base;
};

const getCommitLevel = (months: number) => Math.round((months / 12) * 100);

const getCardTheme = (months: number) => {
  if (months <= 1) return "card-theme-monthly";
  if (months <= 3) return "card-theme-3month";
  if (months <= 6) return "card-theme-6month";
  return "card-theme-1year";
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

// Gauge-style month selector
const MonthGauge = ({ months, onChange }: { months: number; onChange: (m: number) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    const m = Math.max(1, Math.min(12, Math.round(pct * 11 + 1)));
    onChange(m);
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    const m = Math.max(1, Math.min(12, Math.round(pct * 11 + 1)));
    onChange(m);
  };

  const increment = () => onChange(Math.min(12, months + 1));
  const decrement = () => onChange(Math.max(1, months - 1));

  const pct = ((months - 1) / 11) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Commitment</p>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={decrement}
            className="w-7 h-7 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.button>
          <motion.span
            key={months}
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-foreground font-display text-2xl w-20 text-center"
          >
            {months} {months === 1 ? "Month" : "Months"}
          </motion.span>
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={increment}
            className="w-7 h-7 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
          >
            <ChevronUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Gauge track */}
      <div
        ref={containerRef}
        className="relative h-10 cursor-pointer select-none"
        onClick={handleClick}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMove}
      >
        {/* Background track */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 rounded-full bg-muted/60" />
        
        {/* Filled track */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 left-0 h-2 rounded-full bg-gradient-brand"
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

        {/* Tick marks */}
        {MONTHS_OPTIONS.map((m) => {
          const tickPct = ((m - 1) / 11) * 100;
          const isActive = m <= months;
          const isCurrent = m === months;
          return (
            <div
              key={m}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center"
              style={{ left: `${tickPct}%` }}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isCurrent ? "w-2.5 h-2.5 bg-foreground scale-125" : isActive ? "bg-foreground/60" : "bg-muted-foreground/30"
                }`}
              />
            </div>
          );
        })}

        {/* Knob */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-foreground shadow-[0_0_12px_hsl(var(--brand-blue)/0.5)] border-2 border-background"
          animate={{ left: `${pct}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

        {/* Month labels */}
        <div className="absolute -bottom-5 left-0 right-0 flex justify-between px-0">
          {[1, 3, 6, 12].map((m) => {
            const lPct = ((m - 1) / 11) * 100;
            return (
              <span
                key={m}
                className={`absolute text-[10px] -translate-x-1/2 transition-colors ${
                  m <= months ? "text-foreground/70" : "text-muted-foreground/40"
                }`}
                style={{ left: `${lPct}%` }}
              >
                {m}mo
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Feature detail popup
const FeatureItem = ({ feature, index }: { feature: typeof FEATURES[0]; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ x: 4 }}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 w-full text-left group py-1"
      >
        <div className="w-5 h-5 rounded-full bg-brand-blue/20 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue/30 transition-colors">
          <Check className="w-3 h-3 text-brand-blue" />
        </div>
        <span className="text-sm text-foreground/90 group-hover:text-foreground transition-colors">
          {feature.title}
        </span>
        <span className="ml-auto text-muted-foreground/40 text-xs group-hover:text-muted-foreground transition-colors">
          {open ? "−" : "+"}
        </span>
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
            <div className="ml-8 mr-2 py-2 px-3 mb-2 rounded-lg bg-muted/30 border border-border/30">
              <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PricingCard = () => {
  const [months, setMonths] = useState(1);
  const [payStyle, setPayStyle] = useState<PayStyle>("monthly");

  const monthlyRate = getMonthlyRate(months, payStyle);
  const total = monthlyRate * months;
  const originalTotal = getMonthlyRate(months, "monthly") * months;
  const isUpfront = payStyle === "upfront";
  const commitLevel = getCommitLevel(months);
  const isMaxCommit = months === 12;

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
        <div className={`glass-card rounded-2xl p-6 sm:p-8 transition-all duration-700 ${getCardTheme(months)} shimmer`}>
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl sm:text-4xl text-foreground tracking-wide">
              Train With <span className="text-gradient-brand">Your Bro Rob</span>
            </h2>
            <p className="text-muted-foreground font-body text-sm mt-2 tracking-wide">
              Elite Coaching. Real Results. Full Accountability.
            </p>
          </div>

          {/* Month Gauge Selector */}
          <div className="mb-10">
            <MonthGauge months={months} onChange={setMonths} />
          </div>

          {/* Commitment Progress Bar */}
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
                initial={{ width: "8%" }}
                animate={{
                  width: `${Math.max(8, commitLevel)}%`,
                  boxShadow: isMaxCommit
                    ? "0 0 20px hsl(var(--brand-blue) / 0.6), 0 0 40px hsl(var(--brand-blue) / 0.3)"
                    : commitLevel > 50
                    ? "0 0 10px hsl(var(--brand-blue) / 0.3)"
                    : "none",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              />
              {/* Glow overlay at high commitment */}
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
                    width: `${Math.max(8, commitLevel)}%`,
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
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
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
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
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
                key={`${months}-${payStyle}`}
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

                {months > 1 && (
                  <div className="mt-1 space-y-0.5">
                    {isUpfront ? (
                      <p className="text-muted-foreground text-sm">
                        <span className="line-through opacity-60">${originalTotal}</span>
                        <span className="text-brand-blue font-semibold ml-2">${total} total</span>
                      </p>
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        ${total} billed over {months} months
                      </p>
                    )}
                  </div>
                )}

                {isUpfront && months === 1 && (
                  <p className="text-muted-foreground text-sm mt-1">
                    <span className="line-through opacity-60">${getMonthlyRate(1, "monthly")}</span>
                    <span className="text-brand-blue font-semibold ml-2">Save ${getMonthlyRate(1, "monthly") - monthlyRate}</span>
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CTA - Now directly under price */}
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 rounded-xl bg-gradient-brand text-primary-foreground font-bold text-lg tracking-wide transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--brand-blue)/0.4),0_0_80px_hsl(var(--brand-blue)/0.2)] mb-2"
          >
            Start Training Now
          </motion.button>

          <p className="text-center text-xs text-muted-foreground mb-8">
            Cancel anytime · No contracts · 100% money-back guarantee
          </p>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />

          {/* Features - Expandable */}
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4 font-semibold">What's Included</p>
            <div className="space-y-1">
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
