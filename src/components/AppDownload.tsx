import { motion } from "framer-motion";
import { useState } from "react";

const TESTIMONIALS = [
  {
    text: "I use to pay for Only Fans, but now I have a real purpose!",
    name: "Mike D.",
  },
  {
    text: "Best Investment. I use to pee on my balls until I met my bro Rob.",
    name: "Jake R.",
  },
  {
    text: "Rob is sooo sexy. There are way too many simps out there",
    name: "Some Girl",
  },
];

const AppDownload = () => {
  const [titleHovered, setTitleHovered] = useState(false);
  return (
    <section className="relative px-4 py-20 sm:py-28 comic-halftone overflow-hidden">
      <div className="absolute inset-0 bg-gradient-dark opacity-90" />
      <img
        src="/images/comic-story.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.35] pointer-events-none select-none mix-blend-luminosity [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_70%,transparent_100%)]"
      />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />
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
          <motion.img
            src="/images/phones.png"
            alt="Your Bro Rob App Screenshots"
            className="w-full max-w-md mx-auto mb-5 drop-shadow-[0_0_20px_hsl(213,100%,52%,0.2)] cursor-pointer"
            whileHover={{ scale: 1.05, y: -5, filter: "drop-shadow(0 0 30px hsl(213,100%,52%,0.4))" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />

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

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="https://apps.apple.com/us/app/my-pt-hub/id1473947709"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="transition-all duration-300"
            >
              <img src="/images/app-store-badge.svg" alt="Download on the App Store" className="h-[50px]" />
            </motion.a>
            <motion.a
              href="https://play.google.com/store/apps/details?id=net.mypthub.kilo"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="transition-all duration-300"
            >
              <img src="/images/google-play-badge.png" alt="Get it on Google Play" className="h-[73px] -my-[11px]" />
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
              whileHover={{
                scale: 1.05,
                y: -4,
                rotate: 0,
                transition: { type: "spring", stiffness: 400, damping: 15 },
              }}
              className="relative cursor-default"
            >
              <div className="relative bg-background/85 backdrop-blur-sm border-2 border-foreground/10 rounded-2xl p-5 comic-halftone transition-colors duration-300 hover:border-brand-blue/30 hover:bg-background/95">
                <p className="text-sm text-foreground/90 font-body italic leading-relaxed">
                  "{t.text}"
                </p>
                <p className="mt-3 font-display text-sm text-brand-blue">{t.name}</p>
                <div
                  className="absolute -bottom-2 left-6 w-4 h-4 bg-background/85 border-b-2 border-r-2 border-foreground/10"
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
