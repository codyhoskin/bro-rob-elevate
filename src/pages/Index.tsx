import Hero from "@/components/Hero";
import PricingCard from "@/components/PricingCard";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-dark comic-bg">
      <Hero />
      
      {/* Comic story image bridge between hero and pricing */}
      <div className="relative w-full overflow-hidden" style={{ height: "clamp(300px, 40vw, 500px)" }}>
        <img
          src="/images/comic-story.jpg"
          alt="From Simp to Stud comic story"
          className="absolute right-[-5%] top-1/2 h-[130%] w-auto object-contain opacity-[0.15] pointer-events-none select-none"
          style={{ transform: "translateY(-50%) rotate(-8deg)" }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <PricingCard />
      <Footer />
    </div>
  );
};

export default Index;
