import { motion } from "framer-motion";

const features = [
  {
    icon: "🎯",
    title: "AI Hunter-Killer",
    description:
      'Our AI scans your bank accounts, credit cards, PayPal, Venmo, and app stores. It finds EVERY recurring charge—even the ones buried in "miscellaneous" or masked under weird company names.',
    benefit: "Avg. 8.3 forgotten subscriptions found",
  },
  {
    icon: "📞",
    title: "Terminator Calls",
    description:
      'We call the companies for you. No hold music. No guilt trips. No "are you sure?" Our AI handles the entire cancellation process—even the ones that require jumping through hoops.',
    benefit: "97% success rate on difficult cancellations",
  },
  {
    icon: "🛡️",
    title: "Price Watch Shield",
    description:
      "We monitor for price increases and auto-negotiate better deals. When Netflix raises prices, we automatically request retention offers or cancel and suggest alternatives.",
    benefit: "$43/month average savings from negotiations",
  },
  {
    icon: "📊",
    title: "Spending X-Ray",
    description:
      "See exactly where your money goes. Interactive dashboard shows you total monthly/yearly costs, usage patterns, and ROI analysis for each subscription.",
    benefit: "Most users shocked by actual total spend",
  },
  {
    icon: "⚡",
    title: "1-Click Annihilation",
    description:
      'Browse your subscriptions. Tap "Kill." We handle everything else. Confirmation emails forwarded to you. Dead subscriptions archived for your records.',
    benefit: "23 seconds average kill time",
  },
  {
    icon: "🔔",
    title: "Free Trial Guardian",
    description:
      "Sign up for free trials safely. We remind you 48 hours before conversion. Option to auto-cancel. Never pay for a \"free\" trial again.",
    benefit: "$127/year saved from trial traps",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-6xl text-center uppercase tracking-tighter mb-4"
        >
          The <span className="text-cash-green">Arsenal</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-xl text-cash-green mb-16"
        >
          Military-grade subscription termination technology
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="feature-border-animated relative bg-gradient-to-br from-card to-card/50 border-2 border-cash-green p-8 transition-all hover:translate-x-3 hover:border-primary"
            >
              <span className="text-5xl mb-4 block">{feature.icon}</span>
              <h3 className="font-display text-2xl md:text-3xl text-cash-green mb-4">
                {feature.title}
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-6">
                {feature.description}
              </p>
              <div className="flex items-center gap-2 text-warning-orange font-semibold">
                <span>→</span>
                <span>{feature.benefit}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
