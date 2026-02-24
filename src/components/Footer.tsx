import { Instagram, Twitter, Youtube, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

const LINKS = [
  { label: "Programs", href: "#" },
  { label: "Transformations", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Terms", href: "#" },
];

const SOCIALS = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Mail, href: "#", label: "Email" },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-border/50 bg-background">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-brand opacity-30" />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="text-center sm:text-left flex flex-col items-center sm:items-start">
            <img src={logo} alt="Your Bro Rob Fitness" className="h-12 object-contain mb-2" />
            <p className="text-muted-foreground text-xs mt-1 italic">"Discipline Builds Champions"</p>
          </div>

          {/* Links */}
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

          {/* Socials */}
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
