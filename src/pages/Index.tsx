import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HowItWorks } from "@/components/HowItWorks";
import { PricingSection } from "@/components/PricingSection";
import { Testimonials } from "@/components/Testimonials";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <FeaturesSection />
        <HowItWorks />
        <PricingSection />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
