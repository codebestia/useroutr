"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { 
  Zap, 
  ShieldCheck, 
  Building2,
  Lock,
  ArrowRight
} from "lucide-react";
import { Button } from "./ui/button";

interface PricingSectionProps {
  onWaitlistClick: () => void;
}

const pricingTiers = [
  {
    name: "Starter",
    price: "0.5%",
    desc: "Pay per transaction. No monthly minimums.",
    features: ["All payment methods", "9 supported chains", "Payment links & invoicing", "Community support"],
    cta: "Start for free",
    icon: Zap,
    popular: false,
  },
  {
    name: "Growth",
    price: "0.35%",
    desc: "Optimized for scaling volumes > $50k/mo.",
    features: ["Everything in Starter", "Global payouts · 174 countries", "Fiat on/off ramp", "Priority support"],
    cta: "Join the Waitlist",
    icon: ShieldCheck,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Tailored infrastructure for institutional flows.",
    features: ["Everything in Growth", "White-label checkout", "Dedicated Stellar node", "Slack + Dedicated CSM"],
    cta: "Talk to Sales",
    icon: Building2,
    popular: false,
  }
];

export function PricingSection({ onWaitlistClick }: PricingSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tiersRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial state: Hidden and offset
    gsap.set(".pricing-card", { 
      opacity: 0,
      y: 60,
      scale: 0.95
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "bottom bottom",
        toggleActions: "play none none reverse",
      }
    });

    tl.to(".pricing-card", {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out"
    });

    // Sub-elements stagger
    gsap.from(".pricing-feature", {
      opacity: 0,
      x: -10,
      duration: 0.6,
      stagger: 0.05,
      scrollTrigger: {
        trigger: tiersRef.current,
        start: "top 80%"
      }
    });

    // Magnetic effect on CTAs
    const ctas = gsap.utils.toArray<HTMLElement>(".pricing-cta");
    ctas.forEach((cta) => {
      cta.addEventListener("mousemove", (e) => {
        const rect = cta.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(cta, {
          x: x * 0.4,
          y: y * 0.4,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      cta.addEventListener("mouseleave", () => {
        gsap.to(cta, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)"
        });
      });
    });

    // Subtle 3D tilt effect on cards
    const cards = gsap.utils.toArray<HTMLElement>(".pricing-card");
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotateY: x * 10,
          rotateX: -y * 10,
          duration: 0.5,
          ease: "back.out(1.7)"
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.8,
          ease: "power4.out"
        });
      });
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative py-48 bg-black overflow-hidden border-t border-white/5 perspective-1000">
      {/* Dynamic Background */}
      <div ref={backgroundRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-32 max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">Institutional Licensing</span>
            <div className="h-px w-12 bg-white/10" />
          </div>
          <h2 className="font-display text-[48px] md:text-[64px] font-bold tracking-tighter leading-none text-white">
            Transparent Tiering. <br />
            <span className="text-zinc-700 italic font-light drop-shadow-sm">Built for High-Scale.</span>
          </h2>
        </div>

        <div ref={tiersRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingTiers.map((tier) => (
            <div 
              key={tier.name}
              className={cn(
                "pricing-card relative flex flex-col p-10 border rounded-[32px] transition-colors duration-700",
                tier.popular 
                  ? "bg-white/3 border-white/20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]" 
                  : "bg-[#050505] border-white/5"
              )}
            >
              <div className="mb-10 flex justify-between items-start">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500",
                  tier.popular ? "bg-white border-white text-black" : "bg-white/5 border-white/10 text-zinc-500"
                )}>
                  <tier.icon size={24} />
                </div>
                {tier.popular && (
                  <span className="font-mono text-[9px] uppercase tracking-widest px-3 py-1 rounded-full bg-white text-black font-extrabold shadow-[0_0_20px_rgba(255,255,255,0.2)]">Recommended</span>
                )}
              </div>

              <div className="mb-12">
                <h3 className="font-display text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="font-sans text-sm text-zinc-600 font-light leading-relaxed">{tier.desc}</p>
              </div>

              <div className="mb-12 flex items-baseline gap-2">
                <span className="font-display text-[56px] font-bold text-white tracking-tighter">{tier.price}</span>
                <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">/ Volume</span>
              </div>

              <div className="flex-1 space-y-8 mb-16">
                <div className="font-mono text-[10px] text-zinc-700 uppercase tracking-[0.2em] border-b border-white/5 pb-4">Core Capabilities</div>
                <ul className="space-y-4">
                  {tier.features.map(f => (
                    <li key={f} className="pricing-feature flex items-center gap-4 font-sans text-sm text-zinc-500 font-light group/item">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover/item:bg-white transition-colors" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                variant={tier.popular ? "primary" : "secondary"}
                className="w-full h-14 rounded-2xl text-[13px] uppercase tracking-widest group/btn"
                onClick={onWaitlistClick}
              >
                {tier.cta}
                <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </div>
          ))}
        </div>

        {/* Institutional Baseline */}
        <div className="mt-32 pt-12 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-1">
            <div className="font-mono text-[10px] text-zinc-700 uppercase tracking-widest">Platform Standard</div>
            <div className="font-display text-lg font-bold text-white">0% Merchant Markup</div>
          </div>
          <div className="space-y-1">
            <div className="font-mono text-[10px] text-zinc-700 uppercase tracking-widest">Disbursement Rail</div>
            <div className="font-display text-lg font-bold text-white">Stellar Native Anchors</div>
          </div>
          <div className="flex items-center gap-4 text-zinc-700 justify-end md:col-span-1">
            <Lock size={16} />
            <span className="font-mono text-[10px] uppercase tracking-widest whitespace-nowrap">Encryption: AES-256-GCM / TLS 1.3</span>
          </div>
        </div>
      </div>
    </div>
  );
}
