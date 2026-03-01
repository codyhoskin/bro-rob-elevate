import { motion } from "framer-motion";
import { Apple } from "lucide-react";
import { useState } from "react";

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
  const [titleHovered, setTitleHovered] = useState(false);
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
          <img src="/images/phones.png" alt="Your Bro Rob App Screenshots" className="w-full max-w-md mx-auto mb-5 drop-shadow-[0_0_20px_hsl(213,100%,52%,0.2)]" />

          <motion.div
            onHoverStart={() => setTitleHovered(true)}
            onHoverEnd={() => setTitleHovered(false)}
            whileHover={{ scale: 1.03 }}
            className="cursor-default"
          >
            <h2 className="font-display tracking-wide leading-tight mb-2">
              <span className="text-foreground block text-2xl sm:text-3xl">Get The</span>
              <motion.span
                animate={{
                  filter: titleHovered
                    ? "drop-shadow(0 0 15px rgba(255,255,255,0.5)) drop-shadow(0 0 30px hsl(213,100%,52%,0.4))"
                    : "drop-shadow(0 0 8px hsl(213,100%,52%,0.3))",
                }}
                transition={{ duration: 0.3 }}
                className="text-brand-blue block text-4xl sm:text-5xl comic-text-stroke"
              >
                Your Bro Rob App
              </motion.span>
            </h2>
          </motion.div>
          <p className="text-muted-foreground font-body text-xs mt-2 mb-5 max-w-sm mx-auto">
            Powered by <span className="font-semibold text-foreground/80">My PT Hub</span>
          </p>
          <p className="text-muted-foreground font-body text-sm mb-7 max-w-sm mx-auto">
            Track your workouts, chat with Rob, and watch your transformation unfold.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.a
              href="https://apps.apple.com/us/app/my-pt-hub/id1473947709"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-foreground text-background font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            >
              <Apple className="w-5 h-5" />
              <div className="text-left">
                <div className="text-[10px] opacity-70 leading-none">Download on the</div>
                <div className="text-sm font-bold leading-tight">App Store</div>
              </div>
            </motion.a>
            <motion.a
              href="https://play.google.com/store/apps/details?id=net.mypthub.kilo"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-foreground text-background font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 010 1.38l-2.302 2.302L15.396 12l2.302-3.492zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" />
              </svg>
              <div className="text-left">
                <div className="text-[10px] opacity-70 leading-none">Get it on</div>
                <div className="text-sm font-bold leading-tight">Google Play</div>
              </div>
            </motion.a>
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
