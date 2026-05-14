import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { BookOpen, Download, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  age: z.coerce.number().int().min(13, "Must be at least 13").max(120, "Invalid age"),
  email: z.string().trim().email("Invalid email").max(255, "Email too long"),
});

const PDF_PATH = "/ebooks/From-Simp-To-Stud.pdf";

const LeadMagnet = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = leadSchema.safeParse({ name, age, email });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0]?.message ?? "Invalid input");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("ebook_leads").insert({
        name: parsed.data.name,
        age: parsed.data.age,
        email: parsed.data.email,
      });
      if (error) throw error;

      // Trigger immediate download as a fallback
      const link = document.createElement("a");
      link.href = PDF_PATH;
      link.download = "From-Simp-To-Stud.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setSubmitted(true);
      toast.success("Your ebook is on its way! Check your inbox.");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="free-ebook"
      className="relative py-20 px-4 overflow-hidden"
      aria-labelledby="ebook-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-brand-blue/5 to-background" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 -translate-y-1/2 rounded-full bg-brand-red/10 blur-[140px]" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 -translate-y-1/2 rounded-full bg-brand-blue/10 blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-5xl mx-auto"
      >
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center bg-card/60 backdrop-blur border-2 border-primary/20 rounded-3xl p-6 md:p-10 shadow-2xl">
          {/* Cover / Visual */}
          <div className="relative flex justify-center">
            <motion.img
              src="/images/simpto.png"
              alt="From Simp To Stud ebook cover by Your Bro Rob"
              initial={{ rotate: -6 }}
              whileHover={{ rotate: 0, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative w-full max-w-xs aspect-[3/4] object-cover rounded-2xl shadow-[0_25px_60px_-15px_hsl(var(--brand-red)/0.6)] ring-2 ring-primary-foreground/20"
              loading="lazy"
            />
          </div>

          {/* Form */}
          <div>
            <p className="text-brand-red font-display tracking-[0.25em] uppercase text-xs mb-3">
              Free Download
            </p>
            <h2
              id="ebook-heading"
              className="font-display text-3xl md:text-4xl uppercase leading-tight mb-3 text-foreground"
            >
              Get the <span className="text-brand-blue">Free Ebook</span>
            </h2>
            <p className="text-muted-foreground font-body text-sm md:text-base mb-6">
              Drop your details below and the PDF lands in your inbox instantly. No fluff — just the playbook.
            </p>

            {submitted ? (
              <div className="rounded-xl border-2 border-brand-blue/40 bg-brand-blue/10 p-6 text-center">
                <Download className="w-8 h-8 mx-auto mb-3 text-brand-blue" />
                <p className="font-display text-lg uppercase text-foreground mb-1">
                  You're In!
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Your download just started. We also sent it to your email.
                </p>
                <a
                  href={PDF_PATH}
                  download="From-Simp-To-Stud.pdf"
                  className="inline-flex items-center gap-2 text-brand-red font-bold underline underline-offset-4"
                >
                  <Download className="w-4 h-4" /> Download again
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  maxLength={100}
                  autoComplete="name"
                  className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-brand-blue focus:outline-none text-foreground placeholder:text-muted-foreground transition-colors"
                />
                <input
                  type="number"
                  name="age"
                  placeholder="Your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                  min={13}
                  max={120}
                  className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-brand-blue focus:outline-none text-foreground placeholder:text-muted-foreground transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  maxLength={255}
                  autoComplete="email"
                  className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-brand-blue focus:outline-none text-foreground placeholder:text-muted-foreground transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="paywall-cta-button relative z-10 block w-full rounded-xl py-4 text-center font-bold text-lg tracking-wide uppercase ring-2 ring-primary-foreground/30 transition-transform duration-300 text-secondary bg-[#2499ff] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="inline-flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" /> Sending…
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center gap-2">
                      <Download className="w-5 h-5" /> Send Me The Ebook
                    </span>
                  )}
                </button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default LeadMagnet;
