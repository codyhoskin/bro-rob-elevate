import { motion } from "framer-motion";
import { Instagram, Mail, MessageCircle } from "lucide-react";

const LINKS = [
  { label: "Programs", href: "#" },
  { label: "Transformations", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Terms", href: "#" },
];

const SOCIALS = [
  { icon: Instagram, href: "https://instagram.com/yourbrorob", label: "Instagram" },
  { icon: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ), href: "https://x.com/yourbrorob", label: "X" },
  { icon: Mail, href: "mailto:robertagarand@yourbrorob.com", label: "Email" },
];

const WHATSAPP_URL = "https://wa.me/1234567890"; // Replace with actual WhatsApp number

const Footer = () => {
  return (
    <footer className="relative border-t-2 border-foreground/10 bg-background/80 backdrop-blur-sm comic-halftone">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-brand opacity-30" />
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Message Me Bro CTA */}
        <div className="max-w-md mx-auto mb-14 text-center">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl sm:text-3xl text-foreground mb-2"
          >
            Message Me Bro
          </motion.h3>
          <p className="text-muted-foreground text-sm mb-6">Got a question? Hit me up on WhatsApp.</p>
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[hsl(142,70%,45%)] text-white font-semibold py-3 px-8 text-sm hover:bg-[hsl(142,70%,40%)] transition-all duration-300 hover:shadow-[0_0_30px_hsl(142,70%,45%,0.3)]"
          >
            <MessageCircle className="w-5 h-5" />
            Chat on WhatsApp
          </motion.a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="text-center sm:text-left flex flex-col items-center sm:items-start gap-2">
            <motion.img
              src="/images/logorob.png"
              alt="Your Bro Rob Fitness"
              className="w-24 cursor-pointer"
              whileHover={{ scale: 1.1, filter: "drop-shadow(0 0 15px rgba(255,255,255,0.3))" }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <p className="text-muted-foreground text-xs italic">"You just might be a simp!"</p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-4">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-9 h-9 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 hover:scale-110"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Your Bro Rob. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
