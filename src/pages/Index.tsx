import Hero from "@/components/Hero";
import PricingCard from "@/components/PricingCard";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-dark comic-bg">
      <div className="relative">
        <Hero />
        
        {/* Comic story background - bridges hero into pricing */}
        <img
          src="/images/comic-story.jpg"
          alt=""
          className="absolute right-[-5%] top-[30%] h-[80%] w-auto object-contain opacity-[0.12] pointer-events-none select-none"
          style={{ transform: "rotate(-8deg)" }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/80 pointer-events-none" />
        
        <PricingCard />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
