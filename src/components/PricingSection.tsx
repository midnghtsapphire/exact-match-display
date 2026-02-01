import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Scout",
    price: "FREE",
    period: "",
    billing: "Forever",
    features: [
      "Unlimited subscription detection",
      "Dashboard & analytics",
      "Price increase alerts",
      "DIY cancellation guides",
      "Free trial reminders",
      "Email support",
    ],
    featured: false,
    buttonText: "Start Free",
    buttonVariant: "secondary" as const,
  },
  {
    name: "Assassin",
    price: "$9",
    period: "/mo",
    billing: "Billed monthly",
    features: [
      "Everything in Scout",
      "We cancel for you (unlimited)",
      "Phone call handling",
      "Bill negotiation service",
      "Priority support (24-hour)",
      "Renewal protection",
      "Annual subscriptions management",
    ],
    featured: true,
    buttonText: "Start Killing",
    buttonVariant: "primary" as const,
  },
  {
    name: "Terminator",
    price: "$79",
    period: "/yr",
    billing: "$6.58/month - Save 27%",
    features: [
      "Everything in Assassin",
      "Dedicated account manager",
      "Proactive optimization",
      "Family plan (5 accounts)",
      "Premium negotiation team",
      "Custom automation rules",
      "White-glove service",
      "Money-back guarantee",
    ],
    featured: false,
    buttonText: "Go Annual",
    buttonVariant: "secondary" as const,
  },
];

export const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 bg-card">
      <div className="container mx-auto px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-6xl text-center uppercase tracking-tighter mb-4"
        >
          Choose Your <span className="text-cash-green">Weapon</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-foreground/60 mb-16"
        >
          All plans include unlimited subscription detection and tracking
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-background border-[3px] p-10 text-center transition-all hover:-translate-y-3 ${
                plan.featured
                  ? "border-primary scale-105 hover:border-cash-green"
                  : "border-foreground/10 hover:border-cash-green"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground">
                  Most Popular
                </span>
              )}

              <h3 className="font-display text-2xl uppercase mb-4">{plan.name}</h3>

              <div className="mb-2">
                <span className="font-display text-5xl text-cash-green">{plan.price}</span>
                <span className="text-xl text-foreground/50">{plan.period}</span>
              </div>
              <p className="text-foreground/50 mb-8">{plan.billing}</p>

              <ul className="text-left mb-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 border-b border-foreground/10 pb-3">
                    <Check className="text-cash-green shrink-0 mt-0.5" size={20} />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                className={`block w-full py-4 font-semibold uppercase tracking-widest transition-all hover:-translate-y-1 ${
                  plan.buttonVariant === "primary"
                    ? "btn-sweep glow-red bg-primary text-primary-foreground glow-red-hover"
                    : "border-2 border-cash-green text-foreground hover:bg-cash-green hover:text-background"
                }`}
              >
                {plan.buttonText}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 text-foreground/60"
        >
          💰 If we don't save you at least $100 in year one, we refund 100% + $20 for your time
        </motion.p>
      </div>
    </section>
  );
};
