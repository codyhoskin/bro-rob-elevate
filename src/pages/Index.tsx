import Hero from "@/components/Hero";
import PricingCard from "@/components/PricingCard";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-dark comic-bg">
      <Hero />
      <PricingCard />
      <Footer />
    </div>
  );
};

export default Index;
