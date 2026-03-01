import { motion } from "framer-motion";

const Biography = () => {
  return (
    <section className="relative py-20 sm:py-28 bg-card/60 backdrop-blur-sm border-t border-b border-border/30">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight text-foreground mb-2"
        >
          Robert Agarand
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-sm sm:text-base uppercase tracking-[0.25em] text-primary font-semibold mb-8"
        >
          Personal Trainer · Physique Coach · Your Bro
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-base sm:text-lg leading-relaxed space-y-4"
        >
          <p>
            With over 20 years of hands-on training experience and four regional Men's Physique titles under his belt, Rob has built his career on one principle: <span className="text-foreground font-medium">results without the nonsense</span>. He's not here for the bro-science, the starvation diets, or the two-hour marathon gym sessions that drain your life.
          </p>
          <p>
            Rob specializes in coaching middle-aged men who are ready to build muscle, shed fat, and actually look good again — real guys with real jobs, real families, and real schedules. Whether you've been out of the game for years or just never had the right guidance, Rob meets you where you are and gets you where you want to be.
          </p>
          <p className="text-foreground/80 italic">
            No gimmicks. No gatekeeping. Just proven methods from someone who's lived it.
          </p>
        </motion.div>

        <motion.img
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          src="/images/bioImage.png"
          alt="Robert Agarand - Competition & Training Photos"
          className="mt-10 w-full rounded-2xl shadow-lg cursor-pointer transition-shadow duration-300 hover:shadow-[0_0_40px_hsl(213,100%,52%,0.15)]"
        />
      </div>
    </section>
  );
};

export default Biography;
