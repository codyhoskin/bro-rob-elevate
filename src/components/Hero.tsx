import { useState } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const Hero = () => {
  const [simpHover, setSimpHover] = useState(false);
  const [studHover, setStudHover] = useState(false);

  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-x-clip comic-speed-lines comic-halftone">
      {/* Theme toggle - top right */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-dark opacity-80" />
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-brand-red/8 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-brand-blue/8 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center"
      >
        {/* Logo */}
        <motion.img
          src="/images/logorob.png"
          alt="Your Bro Rob"
          className="w-28 sm:w-32 md:w-36 mx-auto mb-6 drop-shadow-[0_0_25px_hsl(213,100%,52%,0.3)] cursor-pointer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.1, filter: "drop-shadow(0 0 20px rgba(255,255,255,0.4))" }}
        />

        {/* Brand name */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground font-body text-sm sm:text-base tracking-[0.3em] uppercase mb-6"
        >
          <span className="text-white font-display text-lg sm:text-xl tracking-wider drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">Your Bro Rob</span>
          <span className="mx-2">presents</span>
        </motion.p>

        {/* Main headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-none mb-6 comic-text-stroke overflow-visible">
          <span className="block text-muted-foreground font-display text-3xl sm:text-4xl md:text-5xl mb-2 tracking-wider">
            Go From
          </span>

          <span className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 flex-wrap overflow-visible">
            {/* SIMP + sad face */}
            <span className="flex items-center overflow-visible">
              <span className="text-3xl sm:text-4xl md:text-5xl self-center" role="img" aria-label="thumbs down">👎</span>
              <motion.span
                onHoverStart={() => setSimpHover(true)}
                onHoverEnd={() => setSimpHover(false)}
                animate={simpHover ? {
                  rotate: [-2, 2, -2, 0],
                  scale: [1, 0.97, 1],
                } : {}}
                transition={{ duration: 0.5 }}
                className="text-gradient-rainbow font-fun inline-block cursor-default"
                style={{ transform: "rotate(-3deg)", padding: "1rem", margin: "-1rem", marginLeft: "-0.5rem", marginRight: "-0.5rem" }}
              >
              Simp
              </motion.span>
            </span>

            <span className="text-muted-foreground font-display text-3xl sm:text-4xl md:text-5xl self-center">
              to
            </span>

            {/* STUD - Diamond Plate Metal */}
            <motion.span
              onHoverStart={() => setStudHover(true)}
              onHoverEnd={() => setStudHover(false)}
              animate={{
                scale: studHover ? 1.08 : 1,
              }}
              transition={{
                scale: { type: "spring", stiffness: 300 },
              }}
              className="font-display inline-block cursor-default relative"
              style={{
                background: `
                  repeating-linear-gradient(
                    45deg,
                    hsl(220 10% 75%) 0px,
                    hsl(220 5% 85%) 2px,
                    hsl(220 10% 65%) 4px,
                    hsl(220 5% 80%) 6px,
                    hsl(220 10% 70%) 8px
                  ),
                  linear-gradient(
                    180deg,
                    hsl(220 10% 90%) 0%,
                    hsl(220 8% 60%) 30%,
                    hsl(220 10% 85%) 50%,
                    hsl(220 8% 55%) 70%,
                    hsl(220 10% 80%) 100%
                  )
                `,
                backgroundBlendMode: 'overlay',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: `drop-shadow(0 2px 4px hsl(220 10% 20% / 0.6)) drop-shadow(0 0 20px rgba(255,255,255,0.35))`,
                transition: 'filter 0.3s ease',
                ...(studHover ? { filter: `drop-shadow(0 2px 4px hsl(220 10% 20% / 0.6)) drop-shadow(0 0 35px rgba(255,255,255,0.7)) drop-shadow(0 0 60px rgba(255,255,255,0.3))` } : {}),
                WebkitTextStroke: '0.5px hsl(220 10% 60% / 0.3)',
              }}
            >
              STUD <span className="inline-block text-4xl sm:text-5xl md:text-6xl" role="img" aria-label="thumbs up" style={{ WebkitTextFillColor: 'initial', WebkitTextStroke: 'initial', filter: 'none' }}>👍</span>
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-muted-foreground font-body text-base sm:text-lg max-w-md mx-auto mt-4"
        >
          Online Coaching for Busy Men 35–45. No bro-science, no starvation, no 2-hour gym sessions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
        >
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 rounded-xl bg-gradient-brand text-primary-foreground font-bold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--brand-blue)/0.4)]"
          >
            View Packages
          </motion.a>
          <motion.a
            href="mailto:robertagarand@yourbrorob.com"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 rounded-xl border-2 border-foreground/20 text-foreground font-bold text-sm tracking-wide transition-all duration-300 hover:border-brand-blue/50 hover:shadow-[0_0_20px_hsl(var(--brand-blue)/0.2)]"
          >
            Claim Your Spot
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 mx-auto flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
