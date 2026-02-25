import { motion } from "framer-motion";
import { Download, Star, Users, TrendingUp, Smartphone } from "lucide-react";

const STATS = [
  { icon: Users, value: "10K+", label: "Active Users" },
  { icon: Star, value: "4.9", label: "App Rating" },
  { icon: TrendingUp, value: "95%", label: "See Results" },
];

const TESTIMONIALS = [
  {
    text: "Rob changed my life. Down 40lbs and stronger than ever.",
    name: "Mike D.",
    result: "Lost 40lbs in 6 months",
  },
  {
    text: "Best investment I ever made. The accountability is next level.",
    name: "Jake R.",
    result: "Gained 15lbs muscle",
  },
  {
    text: "From couch potato to competing. This app is a game changer.",
    name: "Chris T.",
    result: "First competition at 35",
  },
];

const AppDownload = () => {
  return (
    <section className="relative px-4 py-20 sm:py-28 comic-halftone overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-dark opacity-90" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-brand opacity-20" />
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-red/5 blur-[150px]" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-blue/5 blur-[150px]" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Social proof stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-3 gap-4 sm:gap-8 max-w-md mx-auto mb-14"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="text-center"
            >
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-brand-blue/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-brand-blue" />
              </div>
              <p className="font-display text-2xl sm:text-3xl text-foreground">{stat.value}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* App download card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card comic-panel rounded-2xl p-8 sm:p-12 max-w-2xl mx-auto text-center mb-14"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
            className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-lg"
          >
            <Smartphone className="w-8 h-8 text-primary-foreground" />
          </motion.div>

          <h2 className="font-display tracking-wide leading-tight mb-2">
            <span className="text-foreground block text-3xl sm:text-4xl">Get The</span>
            <span className="text-brand-blue block text-5xl sm:text-6xl comic-text-stroke drop-shadow-[0_0_15px_hsl(213,100%,52%,0.4)]">
              Bro Rob App
            </span>
          </h2>
          <p className="text-muted-foreground font-body text-sm sm:text-base mt-4 mb-8 max-w-md mx-auto">
            Track your workouts, chat with Rob, and watch your transformation unfold — all in one place.
          </p>

          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-gradient-brand text-primary-foreground font-bold text-lg tracking-wide transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--brand-blue)/0.4),0_0_80px_hsl(var(--brand-blue)/0.2)]"
          >
            <Download className="w-5 h-5" />
            Download Now
          </motion.button>

          <div className="flex items-center justify-center gap-1 mt-5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
            ))}
            <span className="text-xs text-muted-foreground ml-2">4.9 on App Store</span>
          </div>
        </motion.div>

        {/* Testimonials - comic speech bubbles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20, rotate: i === 1 ? 1 : i === 0 ? -1 : 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: i === 1 ? 1 : i === 0 ? -1 : 2 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative"
            >
              {/* Speech bubble */}
              <div className="relative bg-muted/30 border-2 border-foreground/10 rounded-2xl p-5 comic-halftone">
                <p className="text-sm text-foreground/90 font-body italic leading-relaxed">
                  "{t.text}"
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-display text-sm text-brand-blue">{t.name}</span>
                  <span className="text-[10px] text-brand-red font-semibold uppercase tracking-wide">
                    {t.result}
                  </span>
                </div>
                {/* Speech bubble tail */}
                <div
                  className="absolute -bottom-2 left-6 w-4 h-4 bg-muted/30 border-b-2 border-r-2 border-foreground/10"
                  style={{ transform: "rotate(45deg)" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
