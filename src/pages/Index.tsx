import { useEffect, useRef } from "react";
import Hero from "@/components/Hero";
import PricingCard from "@/components/PricingCard";
import AppDownload from "@/components/AppDownload";
import Footer from "@/components/Footer";
import Biography from "@/components/Biography";

const Index = () => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imgRef.current) {
        const speed = 0.35;
        imgRef.current.style.transform = `rotate(-8deg) translateY(${-window.scrollY * speed}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-dark comic-bg">
      <div className="relative overflow-x-clip">
        {/* Comic story background - parallax */}
        <img
          ref={imgRef}
          src="/images/comic-story.jpg"
          alt=""
          className="absolute right-[-5%] top-[5%] h-[70%] w-auto object-contain opacity-[0.35] pointer-events-none select-none will-change-transform"
          style={{ transform: "rotate(-8deg)" }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background pointer-events-none" />
        
        <Hero />
        <Biography />
        <PricingCard />
      </div>
      <AppDownload />
      <Footer />
    </div>
  );
};

export default Index;
