import Hero from "@/components/Hero";
import PricingCard from "@/components/PricingCard";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-dark comic-bg">
      <div className="relative">
        {/* Comic story background - behind hero, fading into pricing */}
        <img
          src="/images/comic-story.jpg"
          alt=""
          className="absolute right-[-5%] top-[5%] h-[70%] w-auto object-contain opacity-[0.12] pointer-events-none select-none"
          style={{ transform: "rotate(-8deg)" }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background pointer-events-none" />
        
        <Hero />
        <PricingCard />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
