import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Connect",
    description:
      "Link your bank accounts and cards (bank-level 256-bit encryption). Our AI scans for all recurring charges.",
  },
  {
    number: "02",
    title: "Review",
    description:
      "See every subscription in one dashboard. We show you what you're paying, when it renews, and if you're actually using it.",
  },
  {
    number: "03",
    title: "Terminate",
    description:
      'Tap "Kill" on unwanted subs. We handle calls, emails, forms—whatever it takes. You get confirmation within 24 hours.',
  },
  {
    number: "04",
    title: "Protect",
    description:
      "We monitor ongoing. New subscription detected? You get alerted. Price increase? We negotiate or help you cancel.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how" className="py-24">
      <div className="container mx-auto px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-6xl text-center uppercase tracking-tighter mb-16"
        >
          How The <span className="text-primary">Kill</span> Happens
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="text-center"
            >
              <span className="font-display text-7xl md:text-8xl text-primary opacity-30 leading-none block mb-4">
                {step.number}
              </span>
              <h3 className="font-display text-2xl text-cash-green mb-4">
                {step.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
