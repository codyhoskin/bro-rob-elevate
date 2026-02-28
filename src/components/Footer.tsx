import { Instagram, Twitter, Youtube, Mail, Send } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

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
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ name: "", email: "", message: "" });
      toast({ title: "Message sent!", description: "We'll get back to you soon." });
    }, 800);
  };

  return (
    <footer className="relative border-t-2 border-foreground/10 bg-background/80 backdrop-blur-sm comic-halftone">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-brand opacity-30" />
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Contact Form */}
        <div className="max-w-md mx-auto mb-14">
          <h3 className="font-display text-2xl sm:text-3xl text-foreground text-center mb-1">Get In Touch</h3>
          <p className="text-muted-foreground text-sm text-center mb-6">Have a question? Drop a message.</p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg bg-muted/50 border border-border/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                maxLength={255}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg bg-muted/50 border border-border/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                maxLength={1000}
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-lg bg-muted/50 border border-border/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none"
              />
              {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground font-semibold py-2.5 text-sm hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              <Send className="w-4 h-4" />
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="text-center sm:text-left flex flex-col items-center sm:items-start gap-2">
            <img src="/images/logo.png" alt="Your Bro Rob Fitness" className="w-24" />
            <p className="text-muted-foreground text-xs italic">"Discipline Builds Champions"</p>
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
