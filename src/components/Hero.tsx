import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-animated-gradient pointer-events-none -z-10" />

      <div className="container mx-auto px-8 text-center">
        {/* Main headline */}
        <motion.h1
          initial={{ x: -100, opacity: 0, filter: "blur(20px)" }}
          animate={{ x: 0, opacity: 1, filter: "blur(0)" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-display text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.9] mb-8"
        >
          <span
            className="glitch-text text-primary inline-block"
            data-text="KILL"
          >
            KILL
          </span>{" "}
          YOUR
          <br />
          SUBSCRIPTIONS
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl md:text-2xl font-semibold text-cash-green mb-4"
        >
          Before They Kill Your Wallet
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-12 text-foreground/70 leading-relaxed"
        >
          Americans waste $53 BILLION annually on forgotten subscriptions. Our AI finds them, tracks them, and terminates them. Zero mercy.
        </motion.p>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="stats-glow relative grid grid-cols-2 md:grid-cols-4 gap-6 bg-card border-2 border-primary p-8 mb-12"
        >
          <Stat number="$205" label="Average Wasted/Year" />
          <Stat number="74%" label="Underestimate Spending" />
          <Stat number="70+" label="FTC Complaints Daily" />
          <Stat number="2.5x" label="Hidden Cost Multiplier" />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <a
            href="#cta"
            className="btn-sweep glow-red bg-primary px-10 py-5 font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:-translate-y-0.5 glow-red-hover"
          >
            Find My Hidden Subs (FREE)
          </a>
          <a
            href="#how"
            className="border-2 border-cash-green px-10 py-5 font-semibold uppercase tracking-widest text-foreground transition-all hover:bg-cash-green hover:text-background hover:-translate-y-0.5"
          >
            See How It Works
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const Stat = ({ number, label }: { number: string; label: string }) => (
  <div className="text-center">
    <span className="block font-display text-3xl md:text-4xl text-primary mb-2">
      {number}
    </span>
    <span className="text-xs md:text-sm uppercase tracking-widest text-foreground/60">
      {label}
    </span>
  </div>
);
