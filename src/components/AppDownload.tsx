import { motion } from "framer-motion";
import { Download, Smartphone } from "lucide-react";

const TESTIMONIALS = [
  {
    text: "Rob changed my life. Down 40lbs and stronger than ever.",
    name: "Mike D.",
  },
  {
    text: "Best investment I ever made. The accountability is next level.",
    name: "Jake R.",
  },
  {
    text: "From couch potato to competing. This app is a game changer.",
    name: "Chris T.",
  },
];

const AppDownload = () => {
  return (
    <section className="relative px-4 py-20 sm:py-28 comic-halftone overflow-hidden">
      <div className="absolute inset-0 bg-gradient-dark opacity-90" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-brand opacity-20" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* App download card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card comic-panel rounded-2xl p-8 sm:p-12 max-w-xl mx-auto text-center mb-14"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
            className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-lg"
          >
            <Smartphone className="w-7 h-7 text-primary-foreground" />
          </motion.div>

          <img src="/images/phones.png" alt="Your Bro Rob App Screenshots" className="w-full max-w-md mx-auto mb-5 drop-shadow-[0_0_20px_hsl(213,100%,52%,0.2)]" />

          <h2 className="font-display tracking-wide leading-tight mb-2">
            <span className="text-foreground block text-2xl sm:text-3xl">Get The</span>
            <span className="text-brand-blue block text-4xl sm:text-5xl comic-text-stroke drop-shadow-[0_0_15px_hsl(213,100%,52%,0.4)]">
              Your Bro Rob App
            </span>
          </h2>
          <p className="text-muted-foreground font-body text-sm mt-3 mb-7 max-w-sm mx-auto">
            Track your workouts, chat with Rob, and watch your transformation unfold.
          </p>

          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-gradient-brand text-primary-foreground font-bold text-lg tracking-wide transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--brand-blue)/0.4),0_0_80px_hsl(var(--brand-blue)/0.2)]"
          >
            <Download className="w-5 h-5" />
            Download Now
          </motion.button>
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
              <div className="relative bg-muted/30 border-2 border-foreground/10 rounded-2xl p-5 comic-halftone">
                <p className="text-sm text-foreground/90 font-body italic leading-relaxed">
                  "{t.text}"
                </p>
                <p className="mt-3 font-display text-sm text-brand-blue">{t.name}</p>
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
