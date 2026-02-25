import { useState } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const [simpHover, setSimpHover] = useState(false);
  const [studHover, setStudHover] = useState(false);

  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden comic-speed-lines comic-halftone">
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
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-none mb-6 comic-text-stroke">
          <span className="block text-muted-foreground font-display text-3xl sm:text-4xl md:text-5xl mb-2 tracking-wider">
            Go From
          </span>

          <span className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 flex-wrap">
            {/* SIMP + sad face */}
            <span className="flex items-center gap-1 sm:gap-2 overflow-visible">
              <motion.span
                onHoverStart={() => setSimpHover(true)}
                onHoverEnd={() => setSimpHover(false)}
                animate={simpHover ? {
                  rotate: [-2, 2, -2, 0],
                  scale: [1, 0.97, 1],
                } : {}}
                transition={{ duration: 0.5 }}
                className="text-gradient-rainbow font-fun inline-block cursor-default pr-3"
                style={{ transform: "rotate(-3deg)" }}
              >
              Simp
              </motion.span>
              <span className="text-3xl sm:text-4xl md:text-5xl self-center ml-2 sm:ml-3" role="img" aria-label="sad face">😢</span>
            </span>

            <span className="text-muted-foreground font-display text-3xl sm:text-4xl md:text-5xl self-center">
              to
            </span>

            {/* STUD */}
            <motion.span
              onHoverStart={() => setStudHover(true)}
              onHoverEnd={() => setStudHover(false)}
              animate={{
                scale: studHover ? 1.08 : 1,
                textShadow: [
                  "0 0 10px hsl(213 100% 52% / 0.4), 0 0 30px hsl(213 100% 52% / 0.2)",
                  "0 0 20px hsl(213 100% 52% / 0.6), 0 0 50px hsl(213 100% 52% / 0.3), 0 0 80px hsl(213 100% 52% / 0.15)",
                  "0 0 10px hsl(213 100% 52% / 0.4), 0 0 30px hsl(213 100% 52% / 0.2)",
                ],
              }}
              transition={{
                scale: { type: "spring", stiffness: 300 },
                textShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" },
              }}
              className="text-brand-blue font-display inline-block cursor-default"
            >
              STUD <span className="inline-block text-4xl sm:text-5xl md:text-6xl" role="img" aria-label="cool face">💪</span>
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-muted-foreground font-body text-base sm:text-lg max-w-md mx-auto mt-4"
        >
          Elite coaching that transforms your physique, your confidence, and your life.
        </motion.p>

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
