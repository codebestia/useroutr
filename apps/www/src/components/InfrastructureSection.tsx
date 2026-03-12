"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { 
  Cpu,
  ArrowUpRight, 
  Link2,
  Zap,
  Lock,
  ArrowRightLeft,
  Navigation,
  Key
} from "lucide-react";
import { Badge } from "./ui/badge";

const features = [
  {
    t: "Inbound Layer",
    d: "Unified ingestion for Fiat (Visa, ACH, SEPA) and Cross-Chain assets. Assets from 10+ EVM chains and Solana bridged directly into Stellar liquidity pools.",
    i: ArrowRightLeft
  },
  {
    t: "Routing & Conversion",
    d: "Stellar Path Payments find the best multi-hop route across DEX/AMM pools. Quotes are locked for 30 seconds with built-in slippage protection.",
    i: Navigation
  },
  {
    t: "Settlement Layer",
    d: "Funds land in high-liquidity Stellar assets. Automated SEP-24 off-ramps deliver fiat to bank accounts and mobile money wallets across 174 countries.",
    i: Key
  },
  {
    t: "Soroban Automation",
    d: "Custom settlement logic, multi-tenant disbursement, and non-custodial fee handling executed by WASM-native smart contracts.",
    i: Cpu
  }
];

const stats = [
  { n: "~5s", l: "Finality on Stellar" },
  { n: "$0.001", l: "Average fee per tx" },
  { n: "174", l: "Targeted Fiat Rails" },
  { n: "30s", l: "Guaranteed Quotes" },
];

const chains = [
  { n: "Ethereum", b: "CCTP", c: "zinc-400" },
  { n: "Base", b: "CCTP", c: "zinc-400" },
  { n: "Solana", b: "Wormhole", c: "zinc-400" },
  { n: "Avalanche", b: "CCTP", c: "zinc-400" },
  { n: "Arbitrum", b: "CCTP", c: "zinc-400" },
  { n: "Stellar", b: "Native", c: "zinc-200" },
  { n: "SEP-24", b: "Off-Ramp", c: "white" },
  { n: "Card / Bank", b: "Inbound", c: "white" },
];

export function InfrastructureSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const chainSectionRef = useRef<HTMLDivElement>(null);
  const gridLinesRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial State
    gsap.set(".infra-reveal", { y: 60, opacity: 0 });
    gsap.set(".infra-line", { scaleX: 0 });

    // Main Timeline
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "bottom bottom",
        toggleActions: "play none none reverse",
      }
    });

    mainTl
      .to(".infra-line", { scaleX: 1, duration: 1.5, ease: "power4.inOut", stagger: 0.2 })
      .to(".infra-reveal", { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        stagger: 0.1, 
        ease: "power3.out" 
      }, "-=1");

    // Parallax effect on grid lines
    gsap.to(gridLinesRef.current, {
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Magnetic effect on chain badges
    const badges = gsap.utils.toArray<HTMLElement>(".chain-badge");
    badges.forEach((badge) => {
      badge.addEventListener("mousemove", (e) => {
        const rect = badge.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(badge, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      badge.addEventListener("mouseleave", () => {
        gsap.to(badge, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        });
      });
    });

    // Chain coverage staggered entrance
    gsap.from(".chain-badge", {
      opacity: 0,
      scale: 0.8,
      y: 20,
      stagger: {
        each: 0.05,
        grid: "auto",
        from: "center"
      },
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: chainSectionRef.current,
        start: "top 85%"
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-[#050505] text-white overflow-hidden">
      {/* Decorative Grid Background */}
      <div ref={gridLinesRef} className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[4rem_4rem]" />
      </div>

      {/* Infrastructure Section */}
      <section className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left Column: Vision & Stats */}
            <div className="lg:col-span-6 space-y-16">
              <div ref={titleWrapperRef} className="space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/2 infra-reveal">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Platform Infrastructure</span>
                </div>
                
                <h2 className="title-reveal font-display text-[48px] md:text-[64px] font-bold leading-[1.05] tracking-tight infra-reveal">
                  Multi-Layer <br />
                  <span className="text-zinc-600 italic font-light drop-shadow-sm">Settlement.</span>
                </h2>
                
                <p className="font-sans font-light text-xl text-zinc-500 leading-relaxed max-w-xl infra-reveal">
                  Built natively where traditional finance meets the decentralized frontier. 
                  Tavvio operates at the intersection of proven liquidity and instant finality.
                </p>
                
                <div className="h-px w-full bg-white/5 origin-left infra-line" />
              </div>

              <div ref={statsRef} className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden infra-reveal">
                {stats.map((s, i) => (
                  <div key={i} className="bg-[#080808] p-8 group hover:bg-[#0c0c0c] transition-colors duration-500">
                    <div className="font-mono text-4xl font-bold mb-2 tracking-tighter text-white group-hover:translate-x-1 transition-transform">{s.n}</div>
                    <div className="font-display  text-[10px] text-zinc-600 uppercase tracking-widest">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Technical Modules */}
            <div ref={featuresRef} className="lg:col-span-6 flex flex-col justify-center space-y-px">
              {features.map((f, i) => (
                <div 
                  key={i} 
                  className="group relative flex gap-8 py-10 border-b border-white/5 last:border-0 infra-reveal"
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/3 border border-white/10 text-zinc-400 group-hover:text-white group-hover:border-white/20 transition-all duration-500">
                      <f.i size={20} className="transition-transform group-hover:scale-110" />
                    </div>
                    {i < features.length - 1 && (
                      <div className="absolute top-12 left-1/2 w-px h-16 bg-linear-to-b from-white/10 to-transparent pointer-events-none" />
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-display text-lg font-bold text-white group-hover:translate-x-1 transition-transform duration-500 flex items-center gap-2">
                      {f.t}
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="font-sans font-light text-[15px] text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors duration-500">
                      {f.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Network Coverage: Monochrome Grid */}
      <section ref={chainSectionRef} className="py-40 bg-black relative border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-20 relative z-10">
          <div className="space-y-6">
            <h2 className="font-display text-[42px] md:text-[56px] font-bold text-white tracking-tight infra-reveal">
              Unified <span className="text-zinc-700 italic font-light">Connectivity.</span>
            </h2>
            <p className="font-sans font-light text-lg text-zinc-500 max-w-2xl mx-auto infra-reveal">
              One abstraction layer for every major network. 
              The future of money doesn&apos;t care about chain ID.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {chains.map((chain, i) => (
              <Badge
                key={i}
                className="chain-badge group flex items-center gap-3 bg-white/2 border border-white/5 rounded-full px-6 py-3 transition-all hover:bg-white/5 hover:border-white/20 cursor-default"
              >
                <div className={cn("w-1.5 h-1.5 rounded-full", 
                  chain.c === "white" ? "bg-white" : 
                  chain.c === "zinc-200" ? "bg-zinc-200 shadow-[0_0_8px_rgba(255,255,255,0.3)]" : 
                  "bg-zinc-700 group-hover:bg-zinc-400"
                )} />
                <span className="font-display text-sm font-semibold text-zinc-400 group-hover:text-white transition-colors">{chain.n}</span>
                <span className="font-mono text-[9px] text-zinc-700 bg-black/40 px-2 py-0.5 rounded uppercase tracking-tighter group-hover:text-zinc-500">{chain.b}</span>
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-white/5 infra-reveal">
            {[
              { label: "Protocol", val: "L1 / L2 / Fiat", icon: Link2 },
              { label: "Execution", val: "Non-custodial", icon: Zap },
              { label: "Settlement", val: "Atomic Path", icon: Lock },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <item.icon size={16} className="text-zinc-600" />
                <div className="font-mono text-[10px] text-zinc-700 uppercase tracking-widest">{item.label}</div>
                <div className="font-display text-sm font-bold text-zinc-300">{item.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Parallax Background Element */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] aspect-square rounded-full bg-white/1 blur-[120px] pointer-events-none" />
      </section>
    </div>
  );
}
