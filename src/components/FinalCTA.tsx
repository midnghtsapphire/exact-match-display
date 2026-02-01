import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export const FinalCTA = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      toast.success("🎯 Scan initiated! Check your email for results in 60 seconds.", {
        description: "We're finding your hidden subscriptions...",
      });
      setEmail("");
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  return (
    <section id="cta" className="relative py-32 final-cta-bg">
      <div className="container mx-auto px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-5xl md:text-7xl uppercase tracking-tighter leading-none mb-8"
        >
          Stop The
          <br />
          <span className="text-primary">Bleeding</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl md:text-2xl text-foreground/70 mb-10"
        >
          Every day you wait is another day you're paying for services you don't use.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto mb-8"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email to start scanning"
            className="flex-1 px-6 py-4 bg-card border-2 border-cash-green/30 text-foreground font-mono focus:outline-none focus:border-cash-green placeholder:text-foreground/40"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-primary text-primary-foreground font-semibold uppercase tracking-widest transition-all hover:bg-warning-orange hover:-translate-y-1"
          >
            Start Free Scan
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm text-foreground/50 space-y-1"
        >
          <p>✓ No credit card required</p>
          <p>✓ Bank-level security (SOC 2 Type II certified)</p>
          <p>✓ Results in under 60 seconds</p>
        </motion.div>
      </div>
    </section>
  );
};
