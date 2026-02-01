import { motion } from "framer-motion";

const problems = [
  {
    title: "Shadow Subscriptions",
    description:
      'That "free trial" from 8 months ago? Still charging you $14.99/month. You signed up drunk at 2 AM. They\'re counting on you forgetting.',
  },
  {
    title: "Cancellation Hell",
    description:
      "Amazon paid $2.5B for making it impossible to cancel. Companies hide cancel buttons, require phone calls, guilt-trip you with \"retention offers.\" It's designed to make you give up.",
  },
  {
    title: "Price Creep",
    description:
      "Netflix started at $7.99. Now it's $22.99. They increase prices gradually, hoping you won't notice. Each service does this. Your $50/month habit is now $180.",
  },
  {
    title: "Subscription Sprawl",
    description:
      "Streaming. Software. Meal kits. Gym. Cloud storage. News. Music. Gaming. Professional tools. You have 17 active subscriptions. You use 4.",
  },
  {
    title: "Dark Patterns",
    description:
      '"Are you SURE you want to lose access to your favorite shows?" Companies use psychological manipulation, fake urgency, and confusing interfaces to keep you subscribed.',
  },
  {
    title: "The Mental Load",
    description:
      "Tracking renewal dates. Remembering which card is linked where. Dealing with customer service. Comparing prices. It's exhausting. So you just... don't.",
  },
];

export const ProblemSection = () => {
  return (
    <section className="py-24 bg-card border-y-4 border-warning-orange">
      <div className="container mx-auto px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-6xl text-center uppercase tracking-tighter mb-16"
        >
          You're Getting <span className="text-primary">ROBBED</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-primary/5 border-2 border-primary/30 p-8 transition-all hover:border-primary hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(255,0,51,0.3)] group"
            >
              <span className="absolute top-4 right-4 text-4xl opacity-30 group-hover:opacity-60 transition-opacity">
                ⚠
              </span>
              <h3 className="font-display text-xl md:text-2xl text-warning-orange mb-4">
                {problem.title}
              </h3>
              <p className="text-foreground/80 leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
