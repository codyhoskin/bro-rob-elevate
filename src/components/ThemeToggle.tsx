import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("light");
    } else {
      root.classList.add("light");
    }
  }, [isDark]);

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4 }}
      onClick={() => setIsDark(!isDark)}
      className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/30 bg-muted/30 backdrop-blur-sm hover:bg-muted/50 transition-all duration-300 group"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-brand-blue" />
        ) : (
          <Sun className="w-4 h-4 text-brand-gold" />
        )}
      </motion.div>
      <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
        {isDark ? "Dark" : "Light"}
      </span>
    </motion.button>
  );
};

export default ThemeToggle;
