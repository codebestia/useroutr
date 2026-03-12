"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { EqualApproximatelyIcon, Play, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);

interface HeroProps {
  onWaitlistClick: () => void;
}

const Hero = ({ onWaitlistClick }: HeroProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!headingRef.current || !paraRef.current) return;

    // Split the h1 into individual lines for reveal animation
    SplitText.create(headingRef.current, {
      type: "lines",
      autoSplit: true,
      onSplit: (self) => {
        return gsap.from(self.lines, {
          y: 60,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out"
        });
      }
    });

    // Reveal container elements
    gsap.from(".hero-reveal", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 1,
      ease: "power2.out",
      delay: 0.4
    });
    
  }, { scope: mainRef });

  return (
    <header
      className="z-1 relative bg-no-repeat font-mono"
      style={{
        backgroundImage: `linear-gradient(180deg, #000000, #1110 34%, #1110 81%, #000000), url('https://cdn.prod.website-files.com/697b2f7b5c6c6bd8ea41646d/697b9f53307ab54faa7c9276_backdrop_pattern_dark-01.svg'), url('https://cdn.prod.website-files.com/697b2f7b5c6c6bd8ea41646d/697b3469ac2d8c7bd97b5f77_697a3a6862e0e83e13e59998_ss.webp')`,
        backgroundPosition: "0 0, 0 0, 100%",
        backgroundSize: "auto, cover, contain",
      }}
    >
      <div className="container mx-auto px-6 md:px-10 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-end">
          {/* Main Heading */}
          <h1 ref={headingRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono font-bold leading-[0.9] tracking-tighter text-white">
            Pay <br />
            Anything <br />
            Settle <br />
            Everywhere
          </h1>

          {/* Intro Text & CTAs */}
          <div className="flex flex-col gap-8 hero-reveal">
            <p ref={paraRef} className="text-lg md:text-xl font-display text-zinc-400 max-w-xl leading-relaxed">
              The payment infrastructure built for{" "}
              <strong className="text-white font-normal">
                both sides of finance.
              </strong>{" "}
              Accept any currency from any chain. Settle globally in seconds.
              One API. Zero custody risk.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Button 
                variant="primary" 
                size="lg" 
                magnetic 
                className="rounded-full w-full sm:w-auto"
                onClick={onWaitlistClick}
              >
                Join Waitlist
                <ArrowRight size={18} />
              </Button>
              
              <Button 
                variant="secondary" 
                size="lg" 
                className="rounded-full group w-full sm:w-auto"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mr-2 transition-colors group-hover:bg-white/10">
                  <Play size={14} fill="currentColor" />
                </div>
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative mt-auto border-t border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 md:px-10 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-0">
            {[
              { label: "Settlement Time", value: "5s", icon: <EqualApproximatelyIcon size={24} /> },
              { label: "Avg TX FEE", value: "$0.001", icon: null },
              { label: "Countries . Fiat Rails", value: "174", icon: null },
            ].map((stat, i) => (
              <div 
                key={stat.label} 
                className={`flex flex-col gap-1 justify-center items-start md:pl-8 hero-reveal ${
                  i === 0 ? "border-l-2 border-green-500 pl-6" : "md:border-l border-white/10"
                }`}
              >
                <div className="flex items-center gap-2 font-display text-3xl md:text-4xl text-white font-bold tracking-tighter">
                  {stat.icon}{stat.value}
                </div>
                <div className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-zinc-500 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
