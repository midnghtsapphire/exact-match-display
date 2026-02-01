import { motion } from "framer-motion";

const testimonials = [
  {
    text: "I had a gym membership charging me for 14 months. I moved to another state. SubKill called them, argued for 30 minutes, and got me a $420 refund. Worth every penny.",
    author: "Sarah M., Portland",
    savings: "Saved: $840/year",
  },
  {
    text: "Found 11 subscriptions I completely forgot about. Meal kit from 2023, three streaming services I never use, software trials gone rogue. $247/month reclaimed instantly.",
    author: "Marcus T., Austin",
    savings: "Saved: $2,964/year",
  },
  {
    text: "As a freelancer, I had 23 SaaS tools. SubKill showed me 14 had overlapping features. Consolidated down to 9, negotiated discounts on 5. Game changer for my bottom line.",
    author: "Jenny K., Remote",
    savings: "Saved: $4,320/year",
  },
  {
    text: "The free trial guardian alone is worth it. I'm a serial trial user. This thing saved me from converting 8 trials last month. I just wanted to watch one show on each.",
    author: "David R., Chicago",
    savings: "Saved: $1,524/year",
  },
  {
    text: "Amazon Prime kept rejecting my cancellation. SubKill's AI called them, navigated their retention maze, and got it done in 18 minutes. I'd been trying for 3 weeks.",
    author: "Lisa P., Seattle",
    savings: "Saved: $139/year",
  },
  {
    text: "My family plan covers me, my partner, and both parents. We found $680/month in combined waste. Legitimately changed our household budget.",
    author: "The Johnsons, Miami",
    savings: "Saved: $8,160/year",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-6xl text-center uppercase tracking-tighter mb-16"
        >
          Kill <span className="text-cash-green">Reports</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-background border-2 border-cash-green/20 p-8 hover:border-cash-green/50 transition-colors"
            >
              <span className="absolute top-4 left-4 font-serif text-7xl text-primary opacity-20">
                "
              </span>
              <p className="relative z-10 text-lg leading-relaxed mb-6">
                {testimonial.text}
              </p>
              <div className="font-semibold text-cash-green">
                {testimonial.author}
              </div>
              <div className="text-sm text-warning-orange">
                {testimonial.savings}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
